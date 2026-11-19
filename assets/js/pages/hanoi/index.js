(() => {
'use strict';
const svg=document.querySelector('#board'), count=document.querySelector('#count'), message=document.querySelector('#message');
// Every disc belongs to the homepage's golden logic palette. Width and number identify its size.
const colors=Array.from({length:8},(_,i)=>`color-mix(in srgb,var(--mw-logic-light,#ffe194) ${100-i*12}%,var(--mw-logic-primary,#e7a523))`);
let n=3,state=[],history=[],selected=null,drag=null;
let mode=null, saved=null, token=0, demoStep=0;
const xs=[160,480,800],base=432,dh=40;
function topDisc(peg){let d=state.indexOf(peg);return d<0?Infinity:d;}
function centre(d){let below=state.reduce((a,p,i)=>a+(i>d&&p===state[d]?1:0),0);return {x:xs[state[d]],y:base-(below+.5)*dh};}
function discWidth(d){return 76+180*(d+1)/n;}
function elem(tag,attrs,parent=svg){let e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(let [k,v]of Object.entries(attrs))e.setAttribute(k,v);parent.appendChild(e);return e;}
function say(s){message.textContent=s;}
function render(){svg.replaceChildren();
 for(let p=0;p<3;p++){
  elem('rect',{x:xs[p]-148,y:40,width:296,height:408,rx:18,fill:p===selected?'var(--mw-logic-soft,#fff7e3)':'var(--mw-canvas-bg,#fafbf8)'});
  elem('rect',{x:xs[p]-7,y:68,width:14,height:base-68,rx:7,fill:'var(--mw-logic-light,#ffe194)'});
  elem('rect',{x:xs[p]-136,y:base,width:272,height:12,rx:6,fill:'var(--mw-logic-dark,#98630c)'});
  elem('text',{x:xs[p],y:490,'text-anchor':'middle','font-size':26,fill:'var(--mw-logic-dark,#98630c)'}).textContent='ABC'[p];
 }
 for(let d=n-1;d>=0;d--){let c=centre(d),w=discWidth(d);let g=elem('g',{'data-disc':d,class:'disc',transform:`translate(${c.x} ${c.y})`});
  elem('rect',{x:-w/2,y:-18,width:w,height:36,rx:10,fill:colors[Math.round(d*7/Math.max(1,n-1))],stroke:'var(--mw-logic-dark,#98630c)','stroke-width':1.4},g);
  elem('text',{x:0,y:7,'text-anchor':'middle','font-size':22,'font-weight':650,fill:'var(--mw-text,#202722)'},g).textContent=d+1;
 }
 document.querySelector('#moves').textContent=mode==='demo'?demoStep:history.length;document.querySelector('#minimum').textContent=2**n-1;
 document.querySelector('#undo').disabled=!!mode||!history.length;
 for(const id of ['count','restart','hint','demo'])document.querySelector('#'+id).disabled=!!mode;
 document.querySelector('#stop').hidden=!mode;
 document.querySelectorAll('[data-peg]').forEach(b=>b.disabled=!!mode);
 document.querySelectorAll('[data-peg]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.peg===selected?'true':'false'));
 svg.setAttribute('aria-label','Tower of Hanoi. '+state.map((p,d)=>`Disc ${d+1} on ${'ABC'[p]}`).join(', '));
}
function reset(){drag=null;selected=null;n=+count.value;state=Array(n).fill(0);history=[];render();say('Drag a disc, or tap a source peg and then a destination.');}
function move(d,to){if(d!==topDisc(state[d])){say('Only the top disc can move.');return false;}if(to===state[d])return false;
 if(d>topDisc(to)){say('That disc is too large to go there. Try another peg.');return false;}
 history.push(state.slice());state[d]=to;selected=null;
 if(state.every(p=>p===2))say(`Solved in ${history.length} moves!${history.length===2**n-1?' A shortest solution.':''}`);
 else say(`Disc ${d+1} moved to ${'ABC'[to]}.`);return true;
}
function point(e){return new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());}
svg.addEventListener('pointerdown',e=>{if(mode||drag||!e.isPrimary||(e.pointerType==='mouse'&&e.button!==0))return;
 let g=e.target.closest('[data-disc]');if(!g)return;let d=+g.dataset.disc;
 if(d!==topDisc(state[d])){say('Move the top disc first.');return;}
 e.preventDefault();selected=null;document.querySelectorAll('[data-peg]').forEach(b=>b.setAttribute('aria-pressed','false'));
 let p=point(e),c=centre(d);drag={id:e.pointerId,d,g,dx:c.x-p.x,dy:c.y-p.y};svg.setPointerCapture(e.pointerId);svg.appendChild(g);g.classList.add('active');say(`Moving disc ${d+1}. Drop it on a peg.`);
});
svg.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;e.preventDefault();let p=point(e);drag.g.setAttribute('transform',`translate(${p.x+drag.dx} ${p.y+drag.dy})`);});
svg.addEventListener('pointerup',e=>{if(!drag||drag.id!==e.pointerId)return;let p=point(e),d=drag.d;drag=null;
 if(svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId);
 if(p.x>=0&&p.x<=960&&p.y>=0&&p.y<=520){let to=Math.min(2,Math.floor(p.x/320));if(to===state[d])say('Disc returned to its peg.');else move(d,to);}else say('Disc returned to its peg.');render();
});
function cancel(e){if(drag&&drag.id===e.pointerId){drag=null;render();say('Move cancelled.');}}
svg.addEventListener('pointercancel',cancel);svg.addEventListener('lostpointercapture',cancel);
document.querySelectorAll('[data-peg]').forEach(b=>b.addEventListener('click',()=>{if(mode||drag)return;let p=+b.dataset.peg;
 if(selected===null){if(topDisc(p)===Infinity){say('That peg is empty.');return;}selected=p;say(`Peg ${'ABC'[p]} selected. Choose a destination.`);}
 else if(selected===p){selected=null;say('Selection cancelled.');}
 else move(topDisc(selected),p);render();
}));
document.querySelector('#undo').addEventListener('click',()=>{if(mode||drag)return;if(history.length){state=history.pop();selected=null;render();say('Last move undone.');}});

// The next step of an optimal route from any legal state to a corner tower.
function nextHint(s,k,target){
 if(k===0)return null;
 const d=k-1,from=s[d];
 if(from===target)return nextHint(s,k-1,target);
 const spare=3-from-target;
 const prep=nextHint(s,k-1,spare);
 return prep||{d,to:target};
}
function solution(k,from,to,spare,out=[]){
 if(k){solution(k-1,from,spare,to,out);out.push({d:k-1,to});solution(k-1,spare,to,from,out);}return out;
}
function begin(which){
 if(mode||drag)return null;
 saved={state:state.slice(),history:history.map(s=>s.slice()),selected,message:message.textContent};
 mode=which;selected=null;demoStep=0;const t=++token;render();return t;
}
function restore(text){
 ++token;if(!saved)return;
 state=saved.state;history=saved.history;selected=saved.selected;
 const oldMessage=saved.message;saved=null;mode=null;render();say(text||oldMessage);
}
function wait(ms,t){return new Promise(resolve=>setTimeout(()=>resolve(t===token),ms));}
function glide(g,a,b,ms,t){
 return new Promise(resolve=>{
  let previous=null,elapsed=0;
  function frame(now){
   if(t!==token){resolve(false);return;}
   if(previous!==null)elapsed+=(now-previous)*Number(document.querySelector('#speed').value);
   previous=now;const u=Math.min(1,elapsed/ms),ease=u*u*(3-2*u);
   g.setAttribute('transform',`translate(${a.x+(b.x-a.x)*ease} ${a.y+(b.y-a.y)*ease})`);
   if(u<1)requestAnimationFrame(frame);else resolve(true);
  }requestAnimationFrame(frame);
 });
}
async function animateMove(d,to,t){
 const from=state[d];
 if(d!==topDisc(from)||d>topDisc(to)||from===to)throw Error('Invalid animation move');
 const a=centre(d);state[d]=to;const b=centre(d);state[d]=from;
 const g=svg.querySelector(`[data-disc="${d}"]`);svg.appendChild(g);g.classList.add('active');
 // Disc bottom clears the peg tip (68) before horizontal movement begins.
 const highA={x:a.x,y:36},highB={x:b.x,y:36};
 if(!await glide(g,a,highA,420,t))return false;
 if(!await glide(g,highA,highB,520,t))return false;
 if(!await glide(g,highB,b,420,t))return false;
 state[d]=to;render();return true;
}
async function hint(){
 if(mode||drag)return;
 const next=nextHint(state,n,2);
 if(!next){say('Already solved! Restart to try again.');return;}
 const from=state[next.d],text=`Hint: move disc ${next.d+1} from ${'ABC'[from]} to ${'ABC'[next.to]}.`;
 const t=begin('hint');if(t===null)return;
 try{
  say(text+' Watch it lift, cross and lower.');
  if(!await animateMove(next.d,next.to,t))return;
  say(text+' Returning to your position...');
  if(!await wait(650,t))return;
  if(!await animateMove(next.d,from,t))return;
  restore(text+' Your position and move count are unchanged.');
 }catch(e){if(t===token)restore('The demonstration stopped; your game has been restored.');console.error(e);}
}
async function demo(){
 const t=begin('demo');if(t===null)return;
 state=Array(n).fill(0);render();const route=solution(n,0,2,1);
 try{
  say('Solution from the start. Your game is saved.');
  if(!await wait(500,t))return;
  for(let i=0;i<route.length;i++){
   const {d,to}=route[i],from=state[d];
   say(`Solution ${i+1} / ${route.length}: disc ${d+1}, ${'ABC'[from]} to ${'ABC'[to]}.`);
   if(!await animateMove(d,to,t))return;
   demoStep=i+1;render();
   if(!await wait(180,t))return;
  }
  say(`Solved in ${route.length} moves. Returning to your game...`);
  if(!await wait(1600,t))return;
  restore('Demonstration finished. Your game has been restored.');
 }catch(e){if(t===token)restore('The demonstration stopped; your game has been restored.');console.error(e);}
}
document.querySelector('#hint').addEventListener('click',hint);
document.querySelector('#demo').addEventListener('click',demo);
document.querySelector('#stop').addEventListener('click',()=>restore('Your game has been restored.'));
document.querySelector('#restart').addEventListener('click',reset);count.addEventListener('change',reset);reset();document.querySelector('#startup').hidden=true;
})();
