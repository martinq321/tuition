import unittest,json
from fractions import Fraction
import test_platform
from practice_engine import generate,exchanges,BY_ID,mark,public_set
class GeneratorTest(unittest.TestCase):
 def test_families_and_answers(self):
  for topic in BY_ID:
   for seed in range(40):
    p=generate(topic,seed,count=6)
    self.assertEqual(len({q['prompt'] for q in p['questions']}),6)
    self.assertEqual(p,generate(topic,seed,count=6))
    for q in p['questions']:
     self.assertTrue(mark(q['answer'],q['answer']))
     self.assertFalse(mark(str(Fraction(q['answer'])+1),q['answer']))
    self.assertTrue(all('answer' not in q and 'method' not in q for q in public_set(p)['questions']))
 def test_exchange_patterns(self):
  for topic in ('addition','subtraction'):
   for digits in (2,3,4):
    for mode in ('none','one','multiple'):
     if topic=='subtraction' and digits==2 and mode=='multiple':continue
     for seed in range(30):
      p=generate(topic,seed,4,digits,mode)
      for q in p['questions']:
       events=exchanges(q['a'],q['b'],topic,digits)
       self.assertTrue(len(events)==0 if mode=='none' else len(events)==1 if mode=='one' else len(events)>=2)
       self.assertEqual(Fraction(q['answer']),q['a']+q['b'] if topic=='addition' else q['a']-q['b'])
class FeaturesTest(test_platform.PlatformTest):
 def test_parent_practice_and_room(self):
  t,tc=self.client('teacher');l,lc=self.client('learner');o,oc=self.client('other')
  code,r=self.req(t,'/api/features/parent',{'username':'guardian','name':'Guardian','password':'long-test-password','learner_id':self.uid},tc);self.assertEqual(code,201)
  p,pc=self.client('guardian')
  self.assertEqual(self.req(p,'/api/features/generate',{'user_id':self.other,'topic':'addition'},pc)[0],403)
  self.assertEqual(self.req(p,'/api/features/generate',{'user_id':self.uid,'topic':'addition'},pc)[0],403)
  self.req(t,'/api/features/topic',{'user_id':self.uid,'topic':'addition','open':True},tc)
  code,s=self.req(p,'/api/features/generate',{'user_id':self.uid,'topic':'addition','count':4},pc);self.assertEqual(code,201);sid=s['id']
  code,sp=self.req(p,'/api/features/set?id='+sid);expected=sp['payload']['questions'][0]['answer']
  self.assertNotIn('answer',self.req(l,'/api/features/set?id='+sid)[1]['payload']['questions'][0])
  self.assertEqual(self.req(o,'/api/features/set?id='+sid)[0],403)
  self.assertEqual(self.req(p,'/api/features/answer',{'set_id':sid,'question':0,'answer':expected},pc)[0],403)
  self.req(l,'/api/features/hint',{'set_id':sid,'question':0},lc)
  self.assertTrue(self.req(l,'/api/features/answer',{'set_id':sid,'question':0,'answer':expected},lc)[1]['correct'])
  self.req(t,'/api/features/topic',{'user_id':self.uid,'topic':'addition','open':False},tc)
  self.assertEqual(self.req(l,'/api/features/set?id='+sid)[0],403)
  _,room=self.req(t,'/api/features/create-room',{'learner_id':self.uid,'title':'Test room'},tc);rid=room['id']
  self.assertEqual(self.req(o,'/api/features/room?id='+rid)[0],403)
  self.assertEqual(self.req(t,'/api/features/secret',{'room_id':rid,'code':[0,0,1,1],'revision':0},tc)[0],200)
  self.assertIsNone(self.req(l,'/api/features/room?id='+rid)[1]['secret'])
  self.assertEqual(self.req(l,'/api/features/guess',{'room_id':rid,'code':[0,1,0,1],'revision':1},lc)[0],200)
  g=self.req(l,'/api/features/room?id='+rid)[1]['guesses'][0];self.assertEqual((g['exact'],g['colour']),(2,2))
  self.assertEqual(self.req(l,'/api/features/guess',{'room_id':rid,'code':[0,0,1,1],'revision':1},lc)[0],409)
  self.assertEqual(self.req(l,'/api/features/message',{'room_id':rid,'text':'Hello!'},lc)[0],201)
  self.req(t,'/api/features/preferences',{'user_id':self.uid,'chat':False,'gameplay':False},tc)
  self.assertEqual(self.req(l,'/api/features/message',{'room_id':rid,'text':'Blocked'},lc)[0],403)
  self.assertEqual(self.req(l,'/api/features/guess',{'room_id':rid,'code':[0,0,1,1],'revision':2},lc)[0],403)
  self.req(t,'/api/features/preferences',{'user_id':self.uid,'chat':True,'gameplay':True},tc)
  self.req(l,'/api/features/guess',{'room_id':rid,'code':[0,0,1,1],'revision':2},lc)
  final=self.req(l,'/api/features/room?id='+rid)[1];self.assertTrue(final['won']);self.assertEqual(final['secret'],[0,0,1,1])
  self.req(t,'/api/features/room-control',{'room_id':rid,'action':'close'},tc)
  self.assertEqual(self.req(l,'/api/features/message',{'room_id':rid,'text':'Closed'},lc)[0],403)
