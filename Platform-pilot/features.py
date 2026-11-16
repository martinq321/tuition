"""Parent links, constrained practice generation and private shared rooms."""
import json,secrets,time
from collections import Counter
from urllib.parse import urlparse,parse_qs
from practice_engine import TEMPLATES,BY_ID,generate,mark,public_set

def initialise(c):
 c.executescript('''
 CREATE TABLE IF NOT EXISTS families(parent_id INTEGER REFERENCES users(id),learner_id INTEGER REFERENCES users(id),PRIMARY KEY(parent_id,learner_id));
 CREATE TABLE IF NOT EXISTS topics(user_id INTEGER REFERENCES users(id),topic TEXT,PRIMARY KEY(user_id,topic));
 CREATE TABLE IF NOT EXISTS practice_sets(id TEXT PRIMARY KEY,user_id INTEGER REFERENCES users(id),creator INTEGER REFERENCES users(id),title TEXT,payload TEXT,created REAL);
 CREATE TABLE IF NOT EXISTS practice_answers(id INTEGER PRIMARY KEY,set_id TEXT REFERENCES practice_sets(id),user_id INTEGER REFERENCES users(id),question INTEGER,answer TEXT,correct INTEGER,support INTEGER,created REAL);
 CREATE TABLE IF NOT EXISTS rooms(id TEXT PRIMARY KEY,owner INTEGER REFERENCES users(id),learner INTEGER REFERENCES users(id),title TEXT,chat INTEGER DEFAULT 1,paused INTEGER DEFAULT 0,closed INTEGER DEFAULT 0,revision INTEGER DEFAULT 0,setter INTEGER,secret TEXT,guesses TEXT DEFAULT '[]',created REAL);
 CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY,room_id TEXT REFERENCES rooms(id),user_id INTEGER REFERENCES users(id),text TEXT,created REAL);
 CREATE TABLE IF NOT EXISTS preferences(user_id INTEGER PRIMARY KEY REFERENCES users(id),chat INTEGER DEFAULT 1,gameplay INTEGER DEFAULT 1);
 ''')
def linked(c,u,uid):return u['role']=='tutor' or (u['role']=='parent' and c.execute('SELECT 1 FROM families WHERE parent_id=? AND learner_id=?',(u['id'],uid)).fetchone())
def child(c,uid):return c.execute("SELECT 1 FROM users WHERE id=? AND role='learner' AND active=1",(uid,)).fetchone()
def topic_open(c,uid,topic):return c.execute('SELECT 1 FROM topics WHERE user_id=? AND topic=?',(uid,topic)).fetchone()
def access_set(c,u,s):return s and (s['user_id']==u['id'] or linked(c,u,s['user_id']))
def room_access(u,r):return r and u['id'] in (r['owner'],r['learner'])
def pref(c,uid,key):
 r=c.execute('SELECT * FROM preferences WHERE user_id=?',(uid,)).fetchone();return True if not r else bool(r[key])
def scored(code,guess):
 exact=sum(a==b for a,b in zip(code,guess));both=sum((Counter(code)&Counter(guess)).values());return exact,both-exact

def state(c,u):
 if u['role']=='tutor':people=[dict(r) for r in c.execute("SELECT id,name,username,active,role FROM users WHERE role IN ('learner','parent')")]
 elif u['role']=='parent':people=[dict(r) for r in c.execute("SELECT u.id,u.name,u.username,u.active,u.role FROM users u JOIN families f ON f.learner_id=u.id WHERE f.parent_id=?",(u['id'],))]
 else:people=[dict((k,u[k]) for k in ('id','name','username','active','role'))]
 ids=[p['id'] for p in people if p['role']=='learner'];sets=[];topics=[]
 for uid in ids:
  topics.extend(dict(r) for r in c.execute('SELECT * FROM topics WHERE user_id=?',(uid,)))
  for r in c.execute('SELECT id,user_id,title,created FROM practice_sets WHERE user_id=? ORDER BY created DESC',(uid,)):
   s=dict(r);s['responses']=[dict(x) for x in c.execute('SELECT question,answer,correct,support,created FROM practice_answers WHERE set_id=? ORDER BY id',(r['id'],))];sets.append(s)
 result={'user':{k:u[k] for k in ('id','name','role','csrf')},'people':people,'templates':TEMPLATES,'topics':topics,'sets':sets,'rooms':[dict(r) for r in c.execute('SELECT id,title,closed,paused,created FROM rooms WHERE owner=? OR learner=? ORDER BY created DESC',(u['id'],u['id']))]}
 if u['role']=='tutor':
  result['families']=[dict(r) for r in c.execute('SELECT * FROM families')];result['preferences']=[dict(r) for r in c.execute('SELECT * FROM preferences')]
 return result

def get(h,c,u,path):
 if path not in ('/practice','/rooms','/family') and not path.startswith('/api/features'):return False
 if not u:h.reply(401,{'error':'Sign in on the homepage first.'});return True
 if path in ('/practice','/rooms','/family'):
  h.reply(200,(h.root/'private/hub.html').read_bytes(),'text/html; charset=utf-8');return True
 if path=='/api/features':h.reply(200,state(c,u));return True
 query=parse_qs(urlparse(h.path).query)
 if path=='/api/features/set':
  s=c.execute('SELECT * FROM practice_sets WHERE id=?',(query.get('id',[''])[0],)).fetchone()
  if not access_set(c,u,s):h.reply(403,{'error':'Practice set unavailable.'});return True
  payload=json.loads(s['payload']);solutions=linked(c,u,s['user_id'])
  if u['role']=='learner' and not topic_open(c,u['id'],payload['topic']):h.reply(403,{'error':'Your tutor has paused this topic.'});return True
  h.reply(200,{'id':s['id'],'title':s['title'],'user_id':s['user_id'],'can_answer':s['user_id']==u['id'],'solutions':bool(solutions),'template':BY_ID[payload['topic']],'payload':public_set(payload,solutions),'responses':[dict(r) for r in c.execute('SELECT question,answer,correct,support,created FROM practice_answers WHERE set_id=? ORDER BY id',(s['id'],))]});return True
 if path=='/api/features/room':
  r=c.execute('SELECT * FROM rooms WHERE id=?',(query.get('id',[''])[0],)).fetchone()
  if not room_access(u,r):h.reply(403,{'error':'Room unavailable.'});return True
  result={k:r[k] for k in ('id','title','owner','learner','paused','closed','revision','setter')};guesses=json.loads(r['guesses']);won=bool(guesses and guesses[-1]['exact']==4);finished=won or len(guesses)>=10
  result.update(guesses=guesses,won=won,finished=finished,ready=bool(r['secret']),chat=bool(r['chat'] and pref(c,r['learner'],'chat')),gameplay=pref(c,r['learner'],'gameplay'),secret=json.loads(r['secret']) if r['secret'] and (finished or u['id']==r['setter']) else None)
  result['messages']=[dict(m) for m in c.execute('SELECT m.id,m.user_id,u.name,m.text,m.created FROM messages m JOIN users u ON u.id=m.user_id WHERE room_id=? ORDER BY m.id DESC LIMIT 100',(r['id'],))][::-1]
  result['names']={str(x['id']):x['name'] for x in c.execute('SELECT id,name FROM users WHERE id IN (?,?)',(r['owner'],r['learner']))}
  h.reply(200,result);return True
 h.reply(404,{'error':'Not found.'});return True

def post(h,c,u,path,d):
 if not path.startswith('/api/features/'):return False
 # Server authenticates and checks CSRF before reaching here.
 action=path.rsplit('/',1)[-1]
 def deny(msg='You do not have access to this action.'):h.reply(403,{'error':msg});return True
 if action=='parent':
  if u['role']!='tutor':return deny()
  uid=int(d['learner_id'])
  if not child(c,uid):raise ValueError()
  # Use same connection so account creation and family link are atomic.
  username=str(d['username']).lower();name=str(d['name']).strip();password=str(d['password'])
  if not 3<=len(username)<=40 or not username.replace('-','').replace('_','').isalnum() or not 1<=len(name)<=60 or not 12<=len(password)<=256:raise ValueError()
  pid=c.execute("INSERT INTO users(username,name,role,password,active) VALUES(?,?,'parent',?,1)",(username,name,h.hash_password(password))).lastrowid
  c.execute('INSERT INTO families VALUES(?,?)',(pid,uid));h.reply(201,{'id':pid});return True
 if action=='family-link':
  if u['role']!='tutor':return deny()
  pid=int(d['parent_id']);uid=int(d['learner_id'])
  if not child(c,uid) or not c.execute("SELECT 1 FROM users WHERE id=? AND role='parent'",(pid,)).fetchone():raise ValueError()
  if d.get('remove'):c.execute('DELETE FROM families WHERE parent_id=? AND learner_id=?',(pid,uid))
  else:c.execute('INSERT OR IGNORE INTO families VALUES(?,?)',(pid,uid))
  h.reply(200,{'ok':True});return True
 if action in ('topic','preferences'):
  if u['role']!='tutor':return deny()
  uid=int(d['user_id'])
  if not child(c,uid):raise ValueError()
  if action=='topic':
   topic=d['topic']
   if topic not in BY_ID or type(d['open']) is not bool:raise ValueError()
   if d['open']:c.execute('INSERT OR IGNORE INTO topics VALUES(?,?)',(uid,topic))
   else:c.execute('DELETE FROM topics WHERE user_id=? AND topic=?',(uid,topic))
  else:
   if type(d['chat']) is not bool or type(d['gameplay']) is not bool:raise ValueError()
   c.execute('INSERT OR REPLACE INTO preferences VALUES(?,?,?)',(uid,int(d['chat']),int(d['gameplay'])))
  h.reply(200,{'ok':True});return True
 if action=='generate':
  uid=int(d.get('user_id',u['id']));topic=d['topic']
  if not child(c,uid) or not (u['id']==uid or linked(c,u,uid)):return deny()
  if u['role']!='tutor' and not topic_open(c,uid,topic):return deny('This topic has not been released.')
  payload=generate(topic,secrets.randbits(48),int(d.get('count',6)),int(d.get('digits',3)),d.get('mode','one'),d.get('level','intro'))
  sid=secrets.token_urlsafe(18);title=BY_ID[topic]['title']
  c.execute('INSERT INTO practice_sets VALUES(?,?,?,?,?,?)',(sid,uid,u['id'],title,json.dumps(payload),time.time()))
  if u['role']=='tutor':c.execute('INSERT OR IGNORE INTO topics VALUES(?,?)',(uid,topic))
  h.reply(201,{'id':sid});return True
 if action in ('answer','hint'):
  s=c.execute('SELECT * FROM practice_sets WHERE id=?',(d['set_id'],)).fetchone()
  if not s or s['user_id']!=u['id']:return deny('Only the assigned learner can submit this work.')
  payload=json.loads(s['payload']);i=int(d['question'])
  if not 0<=i<len(payload['questions']) or not topic_open(c,u['id'],payload['topic']):return deny()
  q=payload['questions'][i]
  if action=='hint':
   c.execute('INSERT INTO practice_answers(set_id,user_id,question,answer,correct,support,created) VALUES(?,?,?,NULL,NULL,1,?)',(s['id'],u['id'],i,time.time()));h.reply(200,{'hint':q['hint']});return True
  answer=str(d['answer']);correct=mark(answer,q['answer']);support=bool(d.get('used_example')) or bool(c.execute('SELECT 1 FROM practice_answers WHERE set_id=? AND question=? AND support=1',(s['id'],i)).fetchone())
  c.execute('INSERT INTO practice_answers(set_id,user_id,question,answer,correct,support,created) VALUES(?,?,?,?,?,?,?)',(s['id'],u['id'],i,answer,int(correct),int(support),time.time()))
  h.reply(200,{'correct':correct,'message':'Correct. Explain how you know.' if correct else 'Not yet. Try a diagram or ask for a hint.','method':q['method'] if correct else []});return True
 if action=='create-room':
  if u['role']!='tutor':return deny()
  uid=int(d['learner_id']);title=str(d.get('title','Maths together')).strip()[:80];setter=int(d.get('setter',u['id']))
  if not child(c,uid) or setter not in (u['id'],uid) or not title:raise ValueError()
  rid=secrets.token_urlsafe(18);c.execute('INSERT INTO rooms(id,owner,learner,title,setter,created) VALUES(?,?,?,?,?,?)',(rid,u['id'],uid,title,setter,time.time()));h.reply(201,{'id':rid});return True
 if action in ('message','room-control','secret','guess'):
  # Serialize changes before reading revision, including concurrent guesses.
  c.execute('BEGIN IMMEDIATE')
  r=c.execute('SELECT * FROM rooms WHERE id=?',(d['room_id'],)).fetchone()
  if not room_access(u,r):return deny('You are not invited to this room.')
  if action=='room-control':
   if u['id']!=r['owner']:return deny()
   op=d['action']
   if op=='pause':c.execute('UPDATE rooms SET paused=1-paused,revision=revision+1 WHERE id=?',(r['id'],))
   elif op=='chat':c.execute('UPDATE rooms SET chat=1-chat,revision=revision+1 WHERE id=?',(r['id'],))
   elif op=='close':c.execute('UPDATE rooms SET closed=1,revision=revision+1 WHERE id=?',(r['id'],))
   elif op=='new-round':
    if r['closed']:return deny('This session has ended.')
    setter=r['learner'] if r['setter']==r['owner'] else r['owner']
    c.execute("UPDATE rooms SET setter=?,secret=NULL,guesses='[]',paused=0,revision=revision+1 WHERE id=?",(setter,r['id']))
   else:raise ValueError()
   h.reply(200,{'ok':True});return True
  if r['closed']:return deny('This session has ended.')
  if action=='message':
   if not r['chat'] or not pref(c,r['learner'],'chat'):return deny('Chat is switched off.')
   txt=str(d['text']).strip()
   if not 1<=len(txt)<=1000:raise ValueError()
   prev=c.execute('SELECT created FROM messages WHERE room_id=? AND user_id=? ORDER BY id DESC LIMIT 1',(r['id'],u['id'])).fetchone()
   if prev and time.time()-prev['created']<0.5:h.reply(429,{'error':'Please wait a moment before sending another message.'});return True
   c.execute('INSERT INTO messages(room_id,user_id,text,created) VALUES(?,?,?,?)',(r['id'],u['id'],txt,time.time()));h.reply(201,{'ok':True});return True
  if r['paused'] or not pref(c,r['learner'],'gameplay'):return deny('Gameplay is paused.')
  if int(d['revision'])!=r['revision']:h.reply(409,{'error':'The game changed. Check the latest board and try again.'});return True
  code=d.get('code')
  if not isinstance(code,list) or len(code)!=4 or any(type(v) is not int or not 0<=v<6 for v in code):raise ValueError()
  if action=='secret':
   if u['id']!=r['setter'] or r['secret']:return deny('Only the code setter can set the code, once per round.')
   c.execute('UPDATE rooms SET secret=?,revision=revision+1 WHERE id=?',(json.dumps(code),r['id']));h.reply(200,{'ok':True});return True
  guesses=json.loads(r['guesses'])
  if u['id']==r['setter'] or not r['secret'] or len(guesses)>=10 or (guesses and guesses[-1]['exact']==4):return deny('It is not your turn to guess.')
  exact,colour=scored(json.loads(r['secret']),code);guesses.append({'code':code,'exact':exact,'colour':colour,'time':time.time()})
  c.execute('UPDATE rooms SET guesses=?,revision=revision+1 WHERE id=?',(json.dumps(guesses),r['id']));h.reply(200,{'ok':True});return True
 h.reply(404,{'error':'Not found.'});return True
