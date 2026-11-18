'use strict';
// Exercises the real data, exact checker and progress store together. This is an
// API integration check, not a claim of browser or assistive-technology testing.
const assert = require('node:assert/strict');
const MathAPI = require('../fraction-math.js');
const Data = require('../content.js');
const Progress = require('../progress.js');
const all = [...Data.lessons, {id:'review', tasks:Data.review, review:true}];
const mem = new Map();
const storage = {getItem:key=>mem.has(key)?mem.get(key):null, setItem:(key,value)=>mem.set(key,value)};
let serial=0, tick=0;
const options = {makeId:kind=>kind+'-contract-'+(++serial), now:()=>new Date(Date.UTC(2026,10,18,10,0,tick++)).toISOString()};
let store = Progress.createStore(storage, options);
const jane = store.createProfile('Learner A');
const answerFor = spec => {
  if (spec.kind==='order') return spec.value.slice();
  if (spec.format==='mixed') return MathAPI.format(spec.value,{mixed:true});
  if (spec.format==='decimal') {const q=MathAPI.parse(spec.value);return String(q.n/q.d);}
  return String(spec.value);
};
const submit = (lesson, task, response) => {
  const checked=MathAPI.check(task.answer,response);
  store.submit(lesson.id,task.id,{response,correct:checked.correct,valid:checked.valid,message:checked.message});
  return checked;
};
let count=0;
for (const lesson of all) {
  store.visit(lesson.id);
  for (const task of lesson.tasks) {
    const begun=store.beginTask(lesson.id,task.id,task.prompt);
    assert.deepEqual(begun.attempts,[]);
    assert.equal(begun.completedAt,null);
    const config=task.model || lesson.model || Data.lessons.find(l=>l.objectiveIds.some(id=>task.objectiveIds.includes(id)))?.model;
    assert.ok(config?.type,'Every practice question must be able to open a model: '+task.id);
    // An empty answer is recorded, but should not consume the first valid try.
    const empty=task.answer.kind==='order'?[]:'';
    assert.equal(submit(lesson,task,empty).valid,false);
    if (count%4===0) store.updateTask(lesson.id,task.id,{hints:1});
    if (count%4===1) store.updateTask(lesson.id,task.id,{exampleViewed:true});
    if (count%4===2) store.updateTask(lesson.id,task.id,{modelUsed:true});
    if (task.answer.kind==='choice') {
      assert.ok(task.choices.some(c=>String(c.value)===String(task.answer.value)));
    }
    assert.equal(submit(lesson,task,answerFor(task.answer)).correct,true,task.id);
    const record=store.getProfile().records[lesson.id+'/'+task.id];
    assert.equal(record.attempts.length,2);
    assert.equal(record.completedAt,record.attempts[1].time);
    assert.equal(record.attempts[1].hintsAtAttempt,count%4===0?1:0);
    assert.equal(record.attempts[1].exampleAtAttempt,count%4===1);
    assert.equal(record.attempts[1].modelAtAttempt,count%4===2);
    ++count;
  }
}
assert.equal(count,122);
assert.equal(store.summary().solved,122);
assert.equal(store.summary().attempts,244);
assert.equal(store.summary().unfinished,0);
assert.equal(store.summary().firstTryIndependent,60);
assert.equal(store.summary().supported,62);
const beforeReload=store.getState();
store=Progress.createStore(storage,options);
assert.deepEqual(store.getState(),beforeReload,'A fresh page sees persisted records');

const kai=store.createProfile('Learner B');
assert.equal(store.summary().solved,0,'New profile starts separately');
const firstLesson=Data.lessons[0], firstTask=firstLesson.tasks[0];
store.beginTask(firstLesson.id,firstTask.id,firstTask.prompt);
assert.equal(store.summary().unfinished,1);
assert.equal(store.summary().attempts,0);
store.selectProfile(jane.id);
assert.equal(store.summary().solved,122);
store.selectProfile(kai.id);
assert.equal(store.summary().solved,0);
assert.equal(store.summary().unfinished,1);

const saved=store.exportJSON();
const transferred=Progress.createStore(null,options);
transferred.importJSON(saved,{mode:'merge'});
transferred.importJSON(saved,{mode:'merge'});
transferred.selectProfile(jane.id);
assert.equal(transferred.summary().solved,122,'Reimport does not double count');
assert.equal(transferred.summary().attempts,244);
transferred.selectProfile(kai.id);
assert.equal(transferred.summary().unfinished,1);
assert.equal(transferred.storageStatus().persistent,false);
const recovered=Progress.createStore(null,options);
recovered.importJSON(transferred.exportJSON(),{mode:'replace'});
assert.deepEqual(recovered.getState(),transferred.getState(),'Temporary records can be downloaded on the same page and restored');

// Input is a string in the player. A percent suffix is removed only for a
// question whose visible unit is %, leaving plain numbers and fractions exact.
const percentage=all.flatMap(l=>l.tasks).find(t=>t.unit==='%');
assert.ok(percentage);
const entered=answerFor(percentage.answer)+' %';
assert.equal(MathAPI.check(percentage.answer,entered.replace(/%\s*$/,'').trim()).correct,true);
console.log('Player contracts: all 122 tasks check, record, reload and merge; two profiles remain isolated; temporary records export intact.');
