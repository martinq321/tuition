/* Model-logic smoke checks with a small DOM stand-in. Browser layout/drag QA is separate. */
const assert=require('node:assert/strict');
const FMath=require('../fraction-math.js');global.FMath=FMath;
class Element {
 constructor(tag){this.tagName=tag;this.children=[];this.attributes={};this.events={};this.dataset={};this._text='';this.value='';this.disabled=false;this.className='';this.classList={add:(c)=>{this.className+=' '+c},remove:(c)=>{this.className=this.className.split(' ').filter(x=>x!==c).join(' ')}};}
 set textContent(v){this._text=String(v);this.children=[];}get textContent(){return this._text+this.children.map(c=>c.textContent).join('');}
 append(...values){this.children.push(...values);values.forEach(v=>v.parentElement=this);}replaceChildren(...values){this.children=[];this._text='';this.append(...values);}
 setAttribute(k,v){this.attributes[k]=String(v);if(k==='class')this.className=String(v);}
 addEventListener(type,fn,{signal}={}){(this.events[type]||=[]).push({fn,signal});}
 send(type,extra={}){if(this.disabled)return;for(const {fn,signal} of this.events[type]||[])if(!signal?.aborted)fn({target:this,button:0,clientX:0,clientY:0,pointerId:1,...extra});}
 all(){return[this,...this.children.flatMap(c=>c.all())];}
 querySelector(sel){return this.all().find(e=>sel==='.fm-order-card[aria-pressed="true"]'&&e.className.includes('fm-order-card')&&e.attributes['aria-pressed']==='true')||null;}
 focus(){}setPointerCapture(){}getBoundingClientRect(){return{left:0,right:100,top:0,bottom:60};}
}
global.document={createElement:t=>new Element(t),createElementNS:(_,t)=>new Element(t)};
const Models=require('../models.js');
let checks=0;
const check=(v,m)=>{assert.ok(v,m);checks++};
function run(config){const c=new Element('div'),changes=[];const m=Models.mount(c,config,{onChange:e=>changes.push(e)});check(changes.length===0,config.type+' initial mount must not record an action');return{c,m,changes,find:(text)=>c.all().find(e=>e.tagName==='button'&&e.textContent===text),field:(label)=>c.all().find(e=>e.attributes['aria-label']===label),read:()=>c.all().find(e=>e.className==='fm-readout').textContent,status:()=>c.all().find(e=>e.className==='fm-status').textContent};}
let t=run({type:'equivalence',n:2,d:3,targetD:12});t.field('Pieces inside each original part').value=4;t.field('Pieces inside each original part').send('input');check(t.read().startsWith('2/3 = 8/12'),'equivalence exact scaling');t.m.reset();check(t.changes.length===1&&t.m.getState().multiplier===1,'reset is not recorded as learner manipulation');t.m.destroy();check(t.c.children.length===0,'destroy removes model');
t=run({type:'simplify',n:6,d:8});t.field('Pieces in each bundle').value=3;t.field('Pieces in each bundle').send('change');check(t.read().includes('incomplete'),'non-common factor rejected');t.field('Pieces in each bundle').value=2;t.field('Pieces in each bundle').send('change');check(t.read().startsWith('6/8 = 3/4'),'simplifying factor');check(t.status().includes('simplest'),'simplest form status');
t=run({type:'mixed',n:11,d:4});t.find('Make one whole').send('click');t.find('Make one whole').send('click');check(t.read()==='11/4 = 2 wholes + 3/4.','mixed grouping');check(t.find('Make one whole').disabled,'no incorrect extra whole');t.find('Undo one bundle').send('click');check(t.m.getState().wholes===1,'undo whole grouping');
t=run({type:'compare',values:['3/4','2/3','5/6']});t.find('Check this order').send('click');check(t.status().includes('wrong order'),'incorrect fraction ordering');t.find('Move selected right').send('click');t.find('Check this order').send('click');check(t.status().includes('increasing order'),'comparison uses rational amounts');t=run({type:'compare',values:['1/2','2/4','1 1/4']});t.find('Check this order').send('click');check(t.status().includes('increasing order'),'equal values allowed and mixed numbers parsed');
for(const kind of ['add','subtract']){t=run({type:kind,a:'1 1/2',b:'2/3'});check(t.status().includes('common multiple'),'unlike denominator cue');t.field('Equal parts per whole').value=6;t.field('Equal parts per whole').send('change');check(t.status().includes('size 1/6'),'common-unit cue');for(let i=0;i<5;i++)t.find('Add a piece').send('click');check(t.read().includes('Your result: 5/6'),'result is learner-built, not automatically calculated');t.find('Clear result strip').send('click');check(t.m.getState().selected===0,'clear result');}
t=run({type:'multiply',a:'2/3',b:'3/4'});t.field('Purple columns').value=2;t.field('Purple columns').send('input');t.field('Yellow rows').value=3;t.field('Yellow rows').send('input');check(t.read().includes('Overlap: 6/12'),'proper fraction area product');check(t.status().includes('requested fractions'),'target model recognised without grading task');
t=run({type:'divide',a:'3/4',by:3});check(t.find('Share one equal round').disabled,'split before sharing');t.find('Split each piece').send('click');for(let i=0;i<3;i++)t.find('Share one equal round').send('click');check(t.status().includes('3/12 = 1/4'),'sharing original whole exact');check(t.find('Share one equal round').disabled,'no extra sharing');t.find('Undo a sharing round').send('click');check(t.m.getState().rounds===2,'undo sharing');
t=run({type:'quantity',a:'3/4',whole:24});t.field('Selected groups').value=3;t.field('Selected groups').send('input');check(t.read()==='3 groups of 6 = 18 counters.','fraction of a quantity');
t=run({type:'connections',a:'1/8'});t.field('Selected fraction parts').value=1;t.field('Selected fraction parts').send('input');check(t.read()==='1/8 = 0.125; exactly 12.5%.','fraction decimal percentage exact');
t=run({type:'connections',a:'2/3'});t.field('Selected fraction parts').value=2;t.field('Selected fraction parts').send('input');check(t.read().includes('≈ 0.666666666666'),'repeating decimal truncated, not false exact or rounded-prefix ellipsis');check(t.read().includes('approximately 66.666666666666%'),'repeating percent labelled approximate');
t=run({type:'connections',a:'1/128'});t.field('Selected fraction parts').value=1;t.field('Selected fraction parts').send('input');check(t.read().includes('= 0.0078125'),'terminating decimal beyond six places exact');
t=run({type:'equivalence',n:2,d:3,preset:{multiplier:4}});check(t.read().startsWith('2/3 = 8/12'),'worked preset repartition');t.m.reset();check(t.m.getState().multiplier===4&&t.changes.length===0,'reset retains example preset without learner evidence');
t=run({type:'multiply',a:'2/3',b:'3/4',preset:{columns:2,rows:3}});check(t.read().includes('Overlap: 6/12'),'worked overlap preset');
t=run({type:'divide',a:'3/4',by:3,preset:{cut:true,rounds:3}});check(t.c.textContent.includes('Still to share: 0 pieces'),'worked sharing conserves stock');
t=run({type:'add',a:'2/3',b:'1/4',preset:{commonD:12,selected:11}});check(t.read().includes('Your result: 11/12'),'worked sum preset');
t=run({type:'mixed',n:11,d:4,preset:{wholes:2}});check(t.read().includes('2 wholes + 3/4'),'worked mixed preset');
console.log(`${checks} model checks passed; browser layout, actual touch and drag remain separate checks.`);
