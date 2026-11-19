const fs = require('node:fs'), vm=require('node:vm'), assert=require('node:assert/strict'), path=require('node:path');
const root=path.resolve(__dirname,'..');
function fixture(activity) {
 const html=fs.readFileSync(path.join(root,'puzzles/sessions/'+activity+'.html'),'utf8'), els={}, storage={}, queue=[], motion=[];
 class Element {
   constructor(tag='div'){this.tag=tag;this.listeners={};this.attrs={};this.childNodes=[];this.hidden=false;this.disabled=false;this.value='';this.style={};this.classList={toggle(){}};}
   addEventListener(k,fn){(this.listeners[k]??=[]).push(fn);}
   fire(k,e={}){e.preventDefault??=()=>{};this['on'+k]?.(e);for(const fn of this.listeners[k]||[])fn(e);}
   click(){if(!this.disabled)this.fire('click');}
   focus(){doc.activeElement=this;this.fire('focus');}
   matches(){return true;}
   setAttribute(k,v){this.attrs[k]=String(v);}
   append(...v){this.childNodes.push(...v);}
   replaceChildren(...v){this.childNodes=[...v];}
   getBoundingClientRect(){return {width:500,height:320,left:0,top:0};}
   getContext(){return new Proxy({},{get:()=>()=>{}});}
   toDataURL(){return 'data:image/png;base64,';}
   animate(){motion.push('piece');}
 }
 const mk=t=>new Element(t);
 for(const m of html.matchAll(/<(\w+)\b[^>]*\sid="([^"]+)"[^>]*>/g)){const n=mk(m[1]),s=m[0],v=s.match(/value="([^"]+)"/);n.value=v?v[1]:'';n.checked=/\bchecked\b/.test(s);els[m[2]]=n;}
 const nav=mk('nav'), doc={currentScript:{src:'http://unit.test/tuition/assets/js/learner-play.js'},documentElement:mk('html'),getElementById:id=>els[id],createElement:mk,createElementNS:(_,t)=>mk(t),addEventListener(){},querySelector:s=>s==='[data-learning-path]'?nav:null,querySelectorAll:()=>[]};
 if(els.mode) {els.mode.value='Rectangles';els.pieces.value='3 2 2\n2 2 2';}
 const w={matchMedia:()=>({matches:true}),devicePixelRatio:1};
 const ctx={document:doc,window:w,console,URL,Blob,Option:class{constructor(label,value){this.label=label;this.value=String(value);}},localStorage:{getItem:k=>storage[k]??null,setItem:(k,v)=>storage[k]=v},ResizeObserver:class{observe(){}},performance,requestAnimationFrame:fn=>fn(performance.now()+200),setTimeout:fn=>(queue.push(fn),queue.length),clearTimeout(){},getComputedStyle:()=>({getPropertyValue:()=>''})};
 vm.createContext(ctx);
 for (const m of html.matchAll(/<script src="([^"]+)"/g)) {
   if(!/assets\/js/.test(m[1])) continue;
   const js=path.resolve(root,'puzzles/sessions',m[1]);
   vm.runInContext(fs.readFileSync(js,'utf8'),ctx,{filename:js});
 }
 function key(k){const board=els.canvas||els.board;board.fire('keydown',{key:k,preventDefault(){}});}
 return {els,ctx,storage,key,queue,nav};
}
{
 const {els,key,storage,nav}=fixture('fewest-squares');assert.ok(nav.childNodes.length);
 els.canvas.focus();key('3');key('Enter');assert.match(els.status.textContent,/6 empty/);
 key('ArrowRight');key('ArrowRight');key('ArrowRight');key('2');key('Enter');assert.match(els.status.textContent,/2 empty/);
 key('ArrowDown');key('ArrowDown');key('1');key('Enter');key('ArrowRight');key('Enter');
 assert.match(els.status.textContent,/Covered with 4/);els.keep.click();assert.equal(JSON.parse(storage['fewest-squares-saved']).length,1);
 els.undo.click();assert.match(els.status.textContent,/1 empty/);assert.equal(els.keep.disabled,true);
}
{
 const {els,key,queue}=fixture('packing-lab');
 els.board.focus();key('Enter');assert.match(els.status.textContent,/1 of 4/);
 for(let i=0;i<2;i++)key('ArrowDown');key('Enter');
 key('ArrowUp');key('ArrowUp');for(let i=0;i<3;i++)key('ArrowRight');key('Enter');key('ArrowDown');key('ArrowDown');key('Enter');
 assert.match(els.status.textContent,/All 4 pieces fit/);
 els.undo.click();assert.match(els.status.textContent,/3 of 4/);
 els.solve.click();for(let i=0;queue.length&&i<1000;i++)queue.shift()();
 assert.match(els.status.textContent,/Most that fit: 4/);assert.equal(els.revealText.textContent,'1 / 4');
 els.step.click();assert.equal(els.revealText.textContent,'2 / 4');
 els.replay.click();assert.equal(els.revealText.textContent,'4 / 4');
 els.back.click();assert.match(els.status.textContent,/3 of 4/);
}
console.log('Passed manual tiling keyboard coverage/undo/save, rectangle placement, exact comparison, replay, reduced motion and return-to-work.');
