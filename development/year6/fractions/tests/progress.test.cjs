'use strict';
const assert = require('node:assert/strict');
const Progress = require('../progress.js');
function storage(seed={}) {const data=new Map(Object.entries(seed));return {getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,v),data};}
function options() {let i=0,id=0;return {now:()=>new Date(Date.UTC(2026,10,18,12,0,i++)).toISOString(),makeId:kind=>kind+'-'+(++id)};}
const key='mw-y6-fractions-v1';
let testCount=0;
function test(name,fn){fn();testCount++;console.log('PASS '+name);}
test('records first mathematical response and unfinished work without penalising format correction',()=>{
 const mem=storage({'unrelated-site':'keep'}),p=Progress.createStore(mem,options());
 p.beginTask('equivalence','q1','Find an equivalent fraction.');
 p.submit('equivalence','q1',{response:'?',correct:false,valid:false,message:'Use a fraction.'});
 p.updateTask('equivalence','q1',{modelUsed:true});
 p.submit('equivalence','q1',{response:'2/4',correct:true,valid:true,message:'Correct.'});
 p.updateTask('equivalence','q1',{hints:1,solutionViewed:true});
 p.beginTask('add','q2','Add two fractions.');
 assert.deepEqual(p.summary(),{started:2,solved:1,unfinished:1,firstTryIndependent:1,supported:0,attempts:2,reflections:0});
 assert.equal(p.getProfile().records['equivalence/q1'].attempts[1].modelAtAttempt,true);
 assert.equal(p.getProfile().records['equivalence/q1'].attempts[1].solutionAtAttempt,false);
 assert.equal(mem.getItem('unrelated-site'),'keep');
 const restored=Progress.createStore(mem,options());assert.deepEqual(restored.summary(),p.summary());
});
test('hints, an example or a mathematical retry distinguish supported success',()=>{
 const p=Progress.createStore(storage(),options());
 [['hint',{hints:1}],['example',{exampleViewed:true}],['solution',{solutionViewed:true}]].forEach(([id,support])=>{
  p.updateTask('test',id,support);p.submit('test',id,{response:'1/2',correct:true,valid:true,message:'Correct.'});
 });
 p.submit('test','retry',{response:'1/3',correct:false,valid:true,message:'Not yet.'});
 p.submit('test','retry',{response:'1/2',correct:true,valid:true,message:'Correct.'});
 assert.equal(p.summary().supported,4);assert.equal(p.summary().firstTryIndependent,0);
 p.updateTask('test','hint',{hints:0,exampleViewed:false});assert.equal(p.getProfile().records['test/hint'].hints,1);
});
test('beginTask reuses history and returned data cannot mutate storage',()=>{
 const p=Progress.createStore(storage(),options());p.beginTask('divide','q1','A prompt');p.submit('divide','q1',{response:'1/6',correct:true,valid:true,message:'Correct.'});
 const r=p.beginTask('divide','q1','Different prompt');assert.equal(r.attempts.length,1);r.attempts=[];
 const state=p.getState();state.profiles[0].name='changed';assert.equal(p.getProfile().name,'My learning');assert.equal(p.summary().attempts,1);
});
test('imports merge idempotently, preserve local profiles and reject contradictory attempt IDs atomically',()=>{
 const p=Progress.createStore(storage(),options());p.submit('add','q1',{response:'3/4',correct:true,valid:true,message:'Correct.'});const snapshot=p.exportJSON();
 const other=p.createProfile('Another learner');p.beginTask('add','q2','Unfinished');const before=p.getState();
 p.importJSON(snapshot);p.importJSON(snapshot);assert.equal(p.getState().profiles.length,2);assert.equal(p.getState().activeProfileId,other.id);
 assert.equal(p.getState().profiles[0].records['add/q1'].attempts.length,1);assert.deepEqual(p.getProfile().records,before.profiles[1].records);
 const corrupt=JSON.parse(snapshot);corrupt.profiles[0].records['add/q1'].attempts[0].response='9/10';const current=p.exportJSON();
 assert.throws(()=>p.importJSON(JSON.stringify(corrupt)),/conflicting/);assert.equal(p.exportJSON(),current);
});
test('later exports restore updates without double-counting visits or earlier attempts',()=>{
 const mem=storage(),p=Progress.createStore(mem,options());p.visit('add');p.beginTask('add','q1','Add');const early=p.exportJSON();p.visit('add');p.submit('add','q1',{response:'1/2',correct:true,valid:true,message:'Correct.'});p.saveReflection('add','I made equal parts.');const late=p.exportJSON();
 const q=Progress.createStore(storage(),options());q.importJSON(early,{mode:'replace'});q.importJSON(late);q.importJSON(late);
 assert.equal(q.summary().attempts,1);assert.equal(q.getProfile().visits.add.count,2);assert.equal(q.summary().reflections,1);assert.equal(q.summary().solved,1);
});
test('rejects bad schema, unsafe keys and impossible evidence without changing current state',()=>{
 const p=Progress.createStore(storage(),options()),original=p.exportJSON();
 const bad=JSON.parse(original);bad.schemaVersion=99;assert.throws(()=>p.importJSON(JSON.stringify(bad)),/version/);
 assert.throws(()=>p.importJSON('{"schemaVersion":1,"contentVersion":1,"activeProfileId":"default","profiles":[],"__proto__":{"polluted":true}}'),/Unsupported/);
 assert.equal({}.polluted,undefined);
 assert.throws(()=>p.importJSON('x'.repeat(2*1024*1024+1)),/2 MB/);
 assert.throws(()=>p.importJSON(original,{mode:'append'}),/merge or replace/);
 assert.throws(()=>p.submit('test','q1',{response:'1',correct:true,valid:false,message:''}),/invalid answer/);
 assert.throws(()=>p.beginTask('__proto__','q1','Bad'),/identifier/);
 assert.equal(p.exportJSON(),original);
});
test('broken saved data remains untouched while temporary work can be exported',()=>{
 const mem=storage({[key]:'{broken','another-record':'safe'}),p=Progress.createStore(mem,options());
 assert.equal(p.storageStatus().persistent,false);p.beginTask('multiply','q1','Try');assert.equal(mem.getItem(key),'{broken');
 assert.equal(JSON.parse(p.exportJSON()).profiles[0].records['multiply/q1'].prompt,'Try');assert.equal(mem.getItem('another-record'),'safe');
});
test('quota failure keeps current work in memory and reports loss of persistence',()=>{
 const p=Progress.createStore({getItem:()=>null,setItem:()=>{throw new Error('quota');}},options());
 p.beginTask('quantity','q1','Try');assert.equal(p.storageStatus().persistent,false);assert.match(p.storageStatus().message,/export/i);assert.equal(p.summary().unfinished,1);
});
test('reset clears only the requested profile and preserves other application storage',()=>{
 const mem=storage({'mastermind-stats':'do not change'}),p=Progress.createStore(mem,options());p.beginTask('add','q1','Try');const original=p.getProfile().id;
 const second=p.createProfile('Guest');p.beginTask('divide','q2','Try');p.resetProfile(original);
 assert.equal(p.summary().unfinished,1);assert.equal(p.getState().profiles[0].records['add/q1'],undefined);assert.equal(p.getState().activeProfileId,second.id);assert.equal(mem.getItem('mastermind-stats'),'do not change');
});
console.log(testCount+' meaningful storage/evidence tests passed.');
