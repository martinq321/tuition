"""Maths Wednesdays pilot. Python 3.10+, standard library only. Loopback by default."""
import features
import argparse, getpass, hashlib, hmac, json, math, mimetypes, os, secrets, sqlite3, time
from pathlib import Path
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from http.cookies import SimpleCookie
from urllib.parse import urlparse
from contextlib import contextmanager
ROOT=Path(__file__).resolve().parent
DB=Path(os.environ.get('MW_DATABASE',ROOT/'data/platform.sqlite'))
CAT=json.loads((ROOT/'catalogue.json').read_text())
CURRICULUM=json.loads((ROOT/'curriculum.json').read_text())
QUESTIONS={
 'arrays': [('How many counters in 4 rows of 6?',24,'Try adding four groups of six.'),('30 counters in 5 equal rows. How many in each row?',6,'Find the number which multiplied by five makes thirty.'),('A rectangle has 8 rows of 6 squares. How many squares?',48,'Break eight groups into two groups of four.')],
 'painted': [('A 3 × 3 × 3 cube is painted on the outside. How many little cubes have three painted faces?',8,'Look at the corners.'),('How many little cubes are completely unpainted?',1,'Think about the cube hidden in the centre.'),('How many little cubes have exactly two painted faces?',12,'Look along the edges, leaving out the corners.')],
 'curves': [('On the curve y = x × x, what is y when x = 3?',9,'Multiply three by itself.'),('What is y when x = 5?',25,'Multiply five by itself.'),('What is y when x = 0?',0,'Zero multiplied by zero.')]
}
@contextmanager
def connect():
 c=sqlite3.connect(DB,timeout=10); c.row_factory=sqlite3.Row; c.execute('PRAGMA foreign_keys=ON')
 try:
  yield c
  c.commit()
 except Exception:
  c.rollback();raise
 finally:c.close()

def initialise():
 DB.parent.mkdir(parents=True,exist_ok=True)
 with connect() as c:
  c.executescript('''CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT UNIQUE, name TEXT, role TEXT, password TEXT);
CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id INTEGER REFERENCES users(id),csrf TEXT,expires REAL);
CREATE TABLE IF NOT EXISTS access(user_id INTEGER REFERENCES users(id),activity TEXT,state TEXT,PRIMARY KEY(user_id,activity));
CREATE TABLE IF NOT EXISTS assignments(user_id INTEGER REFERENCES users(id),activity TEXT,goal TEXT,due TEXT,PRIMARY KEY(user_id,activity));
CREATE TABLE IF NOT EXISTS attempts(id INTEGER PRIMARY KEY,user_id INTEGER REFERENCES users(id),activity TEXT,question INTEGER,answer TEXT,correct INTEGER,hinted INTEGER,created REAL);
CREATE TABLE IF NOT EXISTS throttle(key TEXT PRIMARY KEY, count INTEGER, until REAL);''')
  columns={r[1] for r in c.execute('PRAGMA table_info(users)')}
  if 'active' not in columns:c.execute('ALTER TABLE users ADD COLUMN active INTEGER NOT NULL DEFAULT 1')
  c.execute('CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY, actor INTEGER, action TEXT, target INTEGER, created REAL)')
  features.initialise(c)
def password_hash(p,salt=None):
 salt=salt or secrets.token_hex(16)
 return salt+':'+hashlib.scrypt(p.encode(),salt=salt.encode(),n=16384,r=8,p=1).hex()
def add_user(username,name,role,password):
 if role not in ('tutor','learner') or not 3<=len(username)<=40 or not username.replace('-','').replace('_','').isalnum() or not 12<=len(password)<=256 or not 1<=len(name)<=60: raise ValueError('Use a 3–40 character username, name up to 60 characters and password of 12–256 characters.')
 with connect() as c:
  cur=c.execute('INSERT INTO users(username,name,role,password) VALUES(?,?,?,?)',(username.lower(),name,role,password_hash(password))); return cur.lastrowid

def allowed(c,u,a):
 if u['role']=='tutor': return True
 r=c.execute('SELECT state FROM access WHERE user_id=? AND activity=?',(u['id'],a)).fetchone(); return bool(r and r['state']=='open')
class Handler(BaseHTTPRequestHandler):
 root=ROOT
 hash_password=staticmethod(password_hash)
 def log_message(self,*args): pass
 def reply(self,status,data,kind='application/json',cookie=None):
  if getattr(self,'db',None):
   try:self.db.commit()
   except sqlite3.ProgrammingError:pass
  b=(json.dumps(data).encode() if kind=='application/json' else data.encode() if isinstance(data,str) else data)
  self.send_response(status); self.send_header('Content-Type',kind); self.send_header('Content-Length',str(len(b)))
  self.send_header('Cache-Control','no-store'); self.send_header('X-Content-Type-Options','nosniff'); self.send_header('Referrer-Policy','same-origin')
  self.send_header('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'")
  if cookie:self.send_header('Set-Cookie',cookie)
  self.end_headers(); self.wfile.write(b)
 def user(self,c):
  ck=SimpleCookie(); ck.load(self.headers.get('Cookie','')); token=ck.get('mw_session'); token=token.value if token else ''
  return c.execute('SELECT u.*,s.csrf FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires>? AND u.active=1',(hashlib.sha256(token.encode()).hexdigest(),time.time())).fetchone()
 def do_GET(self):
  try:self.get()
  except (ValueError,KeyError):self.reply(400,{'error':'Invalid request.'})
 def get(self):
  path=urlparse(self.path).path
  with connect() as c:
   u=self.user(c)
   if features.get(self,c,u,path):return
   if path=='/api/state':
    if not u:return self.reply(200,{'user':None})
    cat=[]
    for item in CAT:
     a=dict(item); row=c.execute('SELECT state FROM access WHERE user_id=? AND activity=?',(u['id'],a['id'])).fetchone(); a['state']='open' if u['role']=='tutor' else row['state'] if row else 'hidden'
     if a['state']!='hidden':cat.append(a)
    result={'user':dict((k,u[k]) for k in ('id','name','role','csrf')),'catalogue':cat}
    if u['role']=='tutor':
     result['learners']=[dict(r) for r in c.execute("SELECT id,name,username,active FROM users WHERE role='learner'")]
     result['curriculum']=CURRICULUM
     result['audit']=[dict(r) for r in c.execute('SELECT * FROM audit ORDER BY id DESC LIMIT 50')]
     result['access']=[dict(r) for r in c.execute('SELECT * FROM access')]
     result['assignments']=[dict(r) for r in c.execute('SELECT * FROM assignments')]
     result['attempts']=[dict(r) for r in c.execute('SELECT * FROM attempts ORDER BY id DESC LIMIT 1000')]
    else:
     for key in ('assignments','attempts'):result[key]=[dict(r) for r in c.execute('SELECT * FROM '+key+' WHERE user_id=?',(u['id'],))]
    return self.reply(200,result)
   if path.startswith('/activity/'):
    a=path.split('/')[-1]
    if not u:return self.reply(401,{'error':'Please sign in.'})
    if a not in QUESTIONS or not allowed(c,u,a):return self.reply(403,{'error':'This activity has not been released.'})
    return self.reply(200,(ROOT/'private/activity.html').read_bytes(),'text/html; charset=utf-8')
   if path.startswith('/api/questions/'):
    a=path.split('/')[-1]
    if not u or a not in QUESTIONS or not allowed(c,u,a):return self.reply(403,{'error':'Activity unavailable.'})
    return self.reply(200,{'questions':[{'id':i,'text':q[0]} for i,q in enumerate(QUESTIONS[a])]})
   if path=='/admin':
    if not u:return self.reply(401,{'error':'Sign in on the homepage first.'})
    if u['role']!='tutor':return self.reply(403,{'error':'Administrator access required.'})
    return self.reply(200,(ROOT/'public/index.html').read_bytes(),'text/html; charset=utf-8')
   files={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/style.css':'style.css','/activity.js':'activity.js','/hub.js':'hub.js','/hub.css':'hub.css'}
   if path not in files:return self.reply(404,{'error':'Not found.'})
   p=ROOT/'public'/files[path]; return self.reply(200,p.read_bytes(),mimetypes.guess_type(p)[0] or 'text/plain')
 def do_POST(self):
  try:self.post()
  except (ValueError,KeyError,TypeError,json.JSONDecodeError):self.reply(400,{'error':'Check the supplied details.'})
  except sqlite3.IntegrityError:self.reply(409,{'error':'That username already exists or the record is invalid.'})
 def post(self):
  if self.headers.get('Content-Type','').split(';')[0]!='application/json':return self.reply(415,{'error':'JSON required.'})
  origin=self.headers.get('Origin')
  if origin and urlparse(origin).netloc!=self.headers.get('Host'):return self.reply(403,{'error':'Origin rejected.'})
  n=int(self.headers.get('Content-Length','0'))
  if not 0<n<=16000:return self.reply(413,{'error':'Invalid request size.'})
  d=json.loads(self.rfile.read(n)); path=urlparse(self.path).path
  with connect() as c:
   self.db=c
   u=self.user(c)
   if path=='/api/login':
    key=self.client_address[0]; r=c.execute('SELECT * FROM throttle WHERE key=?',(key,)).fetchone()
    if r and r['until']>time.time() and r['count']>=10:return self.reply(429,{'error':'Too many attempts. Try again in 15 minutes.'})
    r=c.execute('SELECT * FROM users WHERE username=?',(str(d['username']).lower(),)).fetchone(); p=str(d['password'])
    if len(p)>256:return self.reply(400,{'error':'Invalid credentials.'})
    candidate=password_hash(p,r['password'].split(':')[0] if r else '0'*32)
    if not r or not r['active'] or not hmac.compare_digest(candidate,r['password']):
     c.execute('INSERT INTO throttle VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN until<? THEN 1 ELSE count+1 END,until=CASE WHEN until<? THEN excluded.until ELSE until END',(key,time.time()+900,time.time(),time.time())); return self.reply(401,{'error':'Username or password not recognised.'})
    c.execute('DELETE FROM throttle WHERE key=?',(key,)); token=secrets.token_urlsafe(32); csrf=secrets.token_urlsafe(32)
    c.execute('DELETE FROM sessions WHERE expires<?',(time.time(),)); c.execute('INSERT INTO sessions VALUES(?,?,?,?)',(hashlib.sha256(token.encode()).hexdigest(),r['id'],csrf,time.time()+28800))
    secure='; Secure' if os.getenv('MW_HTTPS')=='1' else ''
    return self.reply(200,{'ok':True},cookie='mw_session='+token+'; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800'+secure)
   if not u:return self.reply(401,{'error':'Please sign in.'})
   if not hmac.compare_digest(self.headers.get('X-CSRF-Token',''),u['csrf']):return self.reply(403,{'error':'Refresh the page and try again.'})
   if features.post(self,c,u,path,d):return
   if path=='/api/logout':
    c.execute('DELETE FROM sessions WHERE user_id=?',(u['id'],));return self.reply(200,{'ok':True},cookie='mw_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0')
   if path in ('/api/hint','/api/answer'):
    a=d['activity']; i=int(d['question'])
    if a not in QUESTIONS or not allowed(c,u,a) or not 0<=i<len(QUESTIONS[a]):return self.reply(403,{'error':'Activity unavailable.'})
    q=QUESTIONS[a][i]
    if path=='/api/hint':
     c.execute('INSERT INTO attempts(user_id,activity,question,answer,correct,hinted,created) VALUES(?,?,?,NULL,NULL,1,?)',(u['id'],a,i,time.time()));return self.reply(200,{'hint':q[2]})
    answer=str(d['answer']).strip()
    if len(answer)>50:raise ValueError()
    try:v=float(answer); correct=math.isfinite(v) and v==q[1]
    except ValueError:return self.reply(400,{'error':'Enter a number.'})
    hinted=bool(c.execute('SELECT 1 FROM attempts WHERE user_id=? AND activity=? AND question=? AND hinted=1',(u['id'],a,i)).fetchone())
    c.execute('INSERT INTO attempts(user_id,activity,question,answer,correct,hinted,created) VALUES(?,?,?,?,?,?,?)',(u['id'],a,i,answer,int(correct),int(hinted),time.time()))
    return self.reply(200,{'correct':correct,'feedback':'That works. Can you explain why?' if correct else 'Not yet. Try the investigation or ask for a hint.'})
   if path=='/api/password':
    old=str(d['current']);new=str(d['password'])
    if not 12<=len(new)<=256 or len(old)>256:raise ValueError()
    if not hmac.compare_digest(password_hash(old,u['password'].split(':')[0]),u['password']):return self.reply(403,{'error':'Current password is incorrect.'})
    c.execute('UPDATE users SET password=? WHERE id=?',(password_hash(new),u['id']))
    c.execute('DELETE FROM sessions WHERE user_id=?',(u['id'],))
    return self.reply(200,{'ok':True})
   if u['role']!='tutor':return self.reply(403,{'error':'Tutor access required.'})
   if path=='/api/account':
    uid=int(d['user_id'])
    if not c.execute("SELECT 1 FROM users WHERE id=? AND role IN ('learner','parent')",(uid,)).fetchone():raise ValueError()
    action=d['action']
    if action=='rename':
     name=str(d['name']).strip()
     if not 1<=len(name)<=60:raise ValueError()
     c.execute('UPDATE users SET name=? WHERE id=?',(name,uid))
    elif action=='status':
     if type(d['active']) is not bool:raise ValueError()
     c.execute('UPDATE users SET active=? WHERE id=?',(int(d['active']),uid))
     c.execute('DELETE FROM sessions WHERE user_id=?',(uid,))
    elif action=='password':
     password=str(d['password'])
     if not 12<=len(password)<=256:raise ValueError()
     c.execute('UPDATE users SET password=? WHERE id=?',(password_hash(password),uid));c.execute('DELETE FROM sessions WHERE user_id=?',(uid,))
    else:raise ValueError()
    c.execute('INSERT INTO audit(actor,action,target,created) VALUES(?,?,?,?)',(u['id'],action,uid,time.time()))
    return self.reply(200,{'ok':True})
   if path=='/api/bulk-access':
    uid=int(d['user_id']);value=d['state'];ids=d['activities']
    if value not in ('open','hidden','locked') or not isinstance(ids,list) or not ids or len(ids)>len(CAT) or any(a not in QUESTIONS for a in ids):raise ValueError()
    if not c.execute("SELECT 1 FROM users WHERE id=? AND role='learner'",(uid,)).fetchone():raise ValueError()
    for a in ids:c.execute('INSERT OR REPLACE INTO access VALUES(?,?,?)',(uid,a,value))
    c.execute('INSERT INTO audit(actor,action,target,created) VALUES(?,?,?,?)',(u['id'],'bulk access: '+value,uid,time.time()))
    return self.reply(200,{'ok':True})
   if path=='/api/learners':
    uid=add_user(d['username'],d['name'],'learner',d['password']);return self.reply(201,{'id':uid})
   if path in ('/api/access','/api/assign'):
    uid=int(d['user_id']); a=d['activity']
    if a not in QUESTIONS or not c.execute("SELECT 1 FROM users WHERE id=? AND role='learner'",(uid,)).fetchone():raise ValueError()
    if path=='/api/access':
     if d['state'] not in ('open','locked','hidden'):raise ValueError()
     c.execute('INSERT OR REPLACE INTO access VALUES(?,?,?)',(uid,a,d['state']))
    else:
     goal=str(d['goal'])[:300];due=str(d.get('due',''))[:10]
     c.execute('INSERT OR REPLACE INTO assignments VALUES(?,?,?,?)',(uid,a,goal,due));c.execute("INSERT OR REPLACE INTO access VALUES(?,?,'open')",(uid,a))
    return self.reply(200,{'ok':True})
   return self.reply(404,{'error':'Not found.'})
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--port',type=int,default=8000);p.add_argument('--create-tutor',action='store_true');args=p.parse_args();initialise()
 if args.create_tutor:
  add_user(input('Username: '),input('Display name: '),'tutor',getpass.getpass('Password (12+ characters): '));print('Tutor created.')
 else:
  with connect() as c:exists=c.execute("SELECT 1 FROM users WHERE role='tutor'").fetchone()
  if not exists:raise SystemExit('First run: python server.py --create-tutor')
  print(f'Open http://127.0.0.1:{args.port} — local pilot only',flush=True);ThreadingHTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
