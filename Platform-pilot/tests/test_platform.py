import unittest, tempfile, threading, json, sys
from pathlib import Path
from urllib.request import Request, urlopen, build_opener, HTTPCookieProcessor
from urllib.error import HTTPError
from http.cookiejar import CookieJar
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import server
class PlatformTest(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.tmp=tempfile.TemporaryDirectory();server.DB=Path(cls.tmp.name)/'test.sqlite';server.initialise()
  server.add_user('teacher','Teacher','tutor','long-test-password')
  cls.uid=server.add_user('learner','Learner','learner','long-test-password')
  cls.other=server.add_user('other','Other','learner','long-test-password')
  cls.http=server.ThreadingHTTPServer(('127.0.0.1',0),server.Handler);cls.base='http://127.0.0.1:'+str(cls.http.server_port)
  cls.thread=threading.Thread(target=cls.http.serve_forever,daemon=True);cls.thread.start()
 @classmethod
 def tearDownClass(cls):cls.http.shutdown();cls.http.server_close();cls.tmp.cleanup()
 def client(self,user):
  op=build_opener(HTTPCookieProcessor(CookieJar()));self.req(op,'/api/login',{'username':user,'password':'long-test-password'});_,s=self.req(op,'/api/state');return op,s['user']['csrf']
 def req(self,op,path,data=None,csrf=None,origin=None):
  headers={}
  if data is not None:headers['Content-Type']='application/json'
  if csrf:headers['X-CSRF-Token']=csrf
  if origin:headers['Origin']=origin
  r=Request(self.base+path,data=json.dumps(data).encode() if data is not None else None,headers=headers)
  try:
   with op.open(r) as response:
    body=response.read();return response.status,json.loads(body) if 'application/json' in response.headers.get('Content-Type','') else body.decode()
  except HTTPError as e:return e.code,json.loads(e.read())
 def test_access_and_marking(self):
  t,tc=self.client('teacher');l,lc=self.client('learner')
  self.assertEqual(self.req(l,'/activity/arrays')[0],403)
  self.assertEqual(self.req(l,'/api/questions/arrays')[0],403)
  self.assertEqual(self.req(l,'/api/access',{'user_id':self.uid,'activity':'arrays','state':'open'},lc)[0],403)
  self.assertEqual(self.req(t,'/api/access',{'user_id':self.uid,'activity':'arrays','state':'open'})[0],403)
  self.assertEqual(self.req(t,'/api/access',{'user_id':self.uid,'activity':'arrays','state':'open'},tc)[0],200)
  self.assertEqual(self.req(l,'/activity/arrays')[0],200)
  _,q=self.req(l,'/api/questions/arrays');self.assertEqual(set(q['questions'][0]),{'id','text'})
  self.assertFalse(self.req(l,'/api/answer',{'activity':'arrays','question':0,'answer':'23'},lc)[1]['correct'])
  self.req(l,'/api/hint',{'activity':'arrays','question':0},lc)
  self.assertTrue(self.req(l,'/api/answer',{'activity':'arrays','question':0,'answer':'24'},lc)[1]['correct'])
  _,s=self.req(l,'/api/state');attempts=[a for a in s['attempts'] if a['answer'] is not None];self.assertEqual(len(attempts),2);self.assertEqual(attempts[-1]['hinted'],1)
  other,_=self.client('other');self.assertEqual(self.req(other,'/api/state')[1]['attempts'],[])
  self.req(t,'/api/access',{'user_id':self.uid,'activity':'arrays','state':'locked'},tc)
  self.assertEqual(self.req(l,'/activity/arrays')[0],403)
  self.assertEqual(self.req(l,'/api/answer',{'activity':'arrays','question':0,'answer':'24'},lc)[0],403)
 def test_assignment_and_boundaries(self):
  t,tc=self.client('teacher');l,lc=self.client('learner')
  self.assertEqual(self.req(t,'/api/assign',{'user_id':self.uid,'activity':'curves','goal':'Plot three points','due':'2026-12-01'},tc)[0],200)
  _,s=self.req(l,'/api/state');self.assertEqual(s['assignments'][0]['goal'],'Plot three points')
  self.assertEqual(self.req(l,'/activity/curves')[0],200)
  self.assertEqual(self.req(l,'/api/answer',{'activity':'curves','question':-1,'answer':0},lc)[0],403)
  self.assertEqual(self.req(l,'/api/answer',{'activity':'curves','question':0,'answer':'bad'},lc)[0],400)
  self.assertEqual(self.req(l,'/api/answer',{'activity':'curves','question':0,'answer':9},lc,'https://untrusted.example')[0],403)
  for path in ['/server.py','/catalogue.json','/data/platform.sqlite','/private/activity.html','/../server.py']:
   self.assertEqual(self.req(l,path)[0],404)
  self.req(l,'/api/logout',{},lc);self.assertIsNone(self.req(l,'/api/state')[1]['user']);self.assertEqual(self.req(l,'/activity/curves')[0],401)
 def test_account_creation(self):
  t,tc=self.client('teacher')
  self.assertEqual(self.req(t,'/api/learners',{'username':'new-pupil','name':'New pupil','password':'a-safe-long-password'},tc)[0],201)
  self.assertEqual(self.req(t,'/api/learners',{'username':'new-pupil','name':'New pupil','password':'a-safe-long-password'},tc)[0],409)
  self.assertEqual(self.req(t,'/api/learners',{'username':'tiny','name':'New pupil','password':'short'},tc)[0],400)
  with server.connect() as c:
   h=c.execute("SELECT password FROM users WHERE username='new-pupil'").fetchone()[0];self.assertNotIn('a-safe-long-password',h)
 def test_admin_controls(self):
  t,tc=self.client('teacher');l,lc=self.client('learner')
  self.assertEqual(self.req(t,'/admin')[0],200)
  self.assertEqual(self.req(l,'/admin')[0],403)
  self.assertNotIn('curriculum',self.req(l,'/api/state')[1])
  self.assertEqual(len(self.req(t,'/api/state')[1]['curriculum']['units']),14)
  self.assertEqual(self.req(l,'/api/account',{'user_id':self.uid,'action':'status','active':False},lc)[0],403)
  self.assertEqual(self.req(t,'/api/account',{'user_id':self.uid,'action':'rename','name':'Updated learner'},tc)[0],200)
  self.assertEqual(self.req(t,'/api/bulk-access',{'user_id':self.uid,'activities':['arrays','curves'],'state':'open'},tc)[0],200)
  self.assertEqual(self.req(l,'/activity/curves')[0],200)
  self.req(t,'/api/account',{'user_id':self.uid,'action':'status','active':False},tc)
  self.assertIsNone(self.req(l,'/api/state')[1]['user'])
  self.assertEqual(self.req(l,'/api/login',{'username':'learner','password':'long-test-password'})[0],401)
  self.req(t,'/api/account',{'user_id':self.uid,'action':'status','active':True},tc)
  l,lc=self.client('learner')
  self.req(t,'/api/account',{'user_id':self.uid,'action':'password','password':'replacement-password'},tc)
  self.assertIsNone(self.req(l,'/api/state')[1]['user'])
  self.assertEqual(self.req(l,'/api/login',{'username':'learner','password':'replacement-password'})[0],200)
  _,u=self.req(l,'/api/state')
  self.assertEqual(self.req(l,'/api/password',{'current':'wrong','password':'long-test-password'},u['user']['csrf'])[0],403)
  self.assertEqual(self.req(l,'/api/password',{'current':'replacement-password','password':'long-test-password'},u['user']['csrf'])[0],200)
  self.assertIsNone(self.req(l,'/api/state')[1]['user'])
if __name__=='__main__':unittest.main()
