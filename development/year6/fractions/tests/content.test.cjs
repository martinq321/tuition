'use strict';
const assert=require('node:assert/strict');
const M=require('../fraction-math.js');
const C=require('../content.js');
const tasks=C.lessons.flatMap(l=>l.tasks).concat(C.review);
const ids=new Set();let verified=0,checked=0;
// Separate exact arithmetic oracle for the author's verification metadata.
// It deliberately uses unreduced pairs and cross-products, rather than FMath.
function r(value){
 const s=String(value);let m;
 if((m=s.match(/^(\d+) (\d+)\/(\d+)$/)))return [BigInt(m[1])*BigInt(m[3])+BigInt(m[2]),BigInt(m[3])];
 if((m=s.match(/^(-?\d+)\/(\d+)$/)))return [BigInt(m[1]),BigInt(m[2])];
 if((m=s.match(/^(-?\d+)\.(\d+)$/)))return [BigInt(m[1]+m[2]),10n**BigInt(m[2].length)];
 return [BigInt(s),1n];
}
function eq(a,b){return a[0]*b[1]===b[0]*a[1];}
function sign(a,b){const v=a[0]*b[1]-b[0]*a[1];return v<0n?-1:v>0n?1:0;}
for(const t of tasks){
 assert(!ids.has(t.id),'duplicate task '+t.id);ids.add(t.id);
 assert(t.prompt&&t.solution&&t.hints.length===2,t.id+' needs teaching content');
 const spec=t.answer;
 let expected=spec.value;
 if(spec.format==='mixed')expected=M.format(spec.value,{mixed:true});
 if(spec.format==='decimal'&&String(expected).includes('/')){
  const q=M.parse(expected);expected=String(q.n/q.d);
 }
 assert.equal(M.check(spec,expected).correct,true,t.id+' must accept its correct answer in the requested form');
 if(spec.kind==='choice'){
  assert(t.choices.some(c=>c.value===String(spec.value)),t.id+' correct choice is missing');
  assert.equal(new Set(t.choices.map(c=>c.value)).size,t.choices.length,t.id+' duplicate choice');
  const wrong=t.choices.find(c=>c.value!==String(spec.value));
  assert(wrong,t.id+' needs a contrasting choice');assert.equal(M.check(spec,wrong.value).correct,false,t.id);
 } else if(spec.kind==='order'){
  assert(Array.isArray(t.choices)&&t.choices.length===spec.value.length,t.id+' order cards missing');
  assert.equal(M.check(spec,t.choices.map(c=>c.value)).valid,true,t.id+' order cards must be exact permutation');
  assert.equal(M.check(spec,[]).valid,false,t.id+' empty ordering rejected');
 } else {
  const q=M.parse(spec.value);const wrong=M.format(M.add(q,1));
  assert.equal(M.check(spec,wrong).correct,false,t.id+' wrong amount rejected');
  assert.equal(M.check(spec,'1/0').valid,false,t.id+' zero denominator rejected');
 }
 if(t.verification){
  const v=t.verification;
  if(v.op==='order'){
   const a=spec.value.map(r);assert(a.every((x,i)=>i===0||sign(a[i-1],x)<=0),t.id+' order not increasing');
   assert.equal(M.check(spec,v.values).valid,true,t.id+' input values mismatch');
  }else{
   const a=r(v.a),b=r(v.b);let e;
   if(v.op==='compare'){assert.equal(spec.value,sign(a,b)<0?'<':sign(a,b)>0?'>':'=',t.id);}
   else{
    if(v.op==='+')e=[a[0]*b[1]+b[0]*a[1],a[1]*b[1]];
    else if(v.op==='−')e=[a[0]*b[1]-b[0]*a[1],a[1]*b[1]];
    else if(v.op==='×')e=[a[0]*b[0],a[1]*b[1]];
    else if(v.op==='÷')e=[a[0]*b[1],a[1]*b[0]];
    else throw new Error('Unknown verification '+v.op+' at '+t.id);
    assert(eq(r(spec.value),e),t.id+' arithmetic disagrees with independent exact oracle');
   }
  }
  verified++;
 }
 checked++;
}
const lessonIds=new Set(C.lessons.map(l=>l.id));
assert.equal(lessonIds.size,12);
for(const l of C.lessons){
 assert(l.tasks.length>=8,l.id+' insufficient varied practice');
 assert(l.worked.length>=3&&l.reasoning.prompt&&l.reasoning.notes,l.id+' missing worked/reasoning support');
 assert(l.practical.materials.length&&l.practical.steps.length,l.id+' missing hands-on alternative');
 assert(l.tasks.some(t=>t.difficulty==='start'),l.id+' needs accessible starting task');
 assert(l.tasks.some(t=>t.difficulty==='stretch'),l.id+' needs extension');
}
for(const id of ['Y6-FR-01','Y6-FR-02','Y6-FR-03','Y6-FR-04','Y6-FR-05']){
 assert(C.lessons.some(l=>l.objectiveIds.includes(id)),id+' absent');
 assert(C.review.some(t=>(t.objectiveIds||[]).includes(id)),id+' absent from review');
}
console.log(`Content: ${checked} answer checks passed; ${verified} independent exact metadata checks; all 12 lessons and 5 objectives structurally covered.`);
