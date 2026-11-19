'use strict';
const $=id=>document.getElementById(id),faceNames=['Right','Left','Top','Bottom','Front','Back'];
const F=[{n:[1,0,0],v:[[1,-1,-1],[1,1,-1],[1,1,1],[1,-1,1]]},{n:[-1,0,0],v:[[-1,-1,1],[-1,1,1],[-1,1,-1],[-1,-1,-1]]},{n:[0,1,0],v:[[-1,1,-1],[-1,1,1],[1,1,1],[1,1,-1]]},{n:[0,-1,0],v:[[-1,-1,1],[-1,-1,-1],[1,-1,-1],[1,-1,1]]},{n:[0,0,1],v:[[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]]},{n:[0,0,-1],v:[[1,-1,-1],[-1,-1,-1],[-1,1,-1],[1,1,-1]]}];
let autoPreview=null, releaseGroup=null;
let n=3,paints=Array(6).fill(null),color='var(--mw-shape-primary)',broken=false,cubes=[],selected=null,moves=[],checked=false;
const views={world:{yaw:-.55,pitch:.45},inspect:{yaw:-.55,pitch:.45}};
const say=t=>$('status').textContent=t;
function rotate([x,y,z],v){const a=Math.cos(v.yaw)*x+Math.sin(v.yaw)*z,b=-Math.sin(v.yaw)*x+Math.cos(v.yaw)*z;return [a,Math.cos(v.pitch)*y-Math.sin(v.pitch)*b,Math.sin(v.pitch)*y+Math.cos(v.pitch)*b];}
function flags(x,y,z){return [x===n-1,x===0,y===n-1,y===0,z===n-1,z===0].map((on,i)=>on?paints[i]:null);}
function build(){cubes=[];for(let z=0;z<n;z++)for(let y=0;y<n;y++)for(let x=0;x<n;x++)cubes.push({id:cubes.length+1,x,y,z,paint:flags(x,y,z),box:null});}
function count(c){return c.paint.filter(Boolean).length;}
const typeColours=['#f6f2e9','#e34d43','#f4ce3d','#347fc4'];
function faceInk(c,fi){return c.paint[fi]?($('type-colours').value==='groups'?typeColours[count(c)]:'var(--mw-shape-primary)'):'#f6f2e9';}
$('type-colours').onchange=()=>{render();};
function cubeCentre(c,gap){return [c.x,c.y,c.z].map(v=>(v-(n-1)/2)*gap);}
function fittedCubeScale(gap){const span=(n-1)*gap+.96;return Math.min(76,160/(n*.87),(430-48)/(Math.sqrt(3)*span));}
function render3D(id,items){const v=views[id],w=id==='world'?600:400,h=id==='world'?430:280,gap=broken&&id==='world'?1+Number($('spread').value):1,scale=id==='world'?fittedCubeScale(gap):81,faces=[];
 for(const c of items){const centre=id==='inspect'?[0,0,0]:cubeCentre(c,gap);F.forEach((f,fi)=>{const norm=rotate(f.n,v);if(norm[2]<=.001)return;const points=f.v.map(p=>rotate(p.map((a,i)=>a*.48+centre[i]),v));const pts=points.map(p=>[w/2+p[0]*scale,h/2-p[1]*scale]);const dep=points.reduce((a,p)=>a+p[2],0)/4;const ink=faceInk(c,fi),light=.12+.18*(1-norm[2]);faces.push({dep,html:`<g data-cube="${c.id}" data-face="${fi}"><polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="${ink}" stroke="${selected===c.id&&broken?'var(--mw-shape-yellow-dark)':'var(--mw-shape-dark)'}" stroke-width="${selected===c.id&&broken?2.3:1}" stroke-linejoin="round"/><polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="var(--mw-shape-dark)" opacity="${light}" pointer-events="none"/></g>`});});}
 $(id).innerHTML=faces.sort((a,b)=>a.dep-b.dep).map(f=>f.html).join('');
}
function draw(){if(!broken)build();render3D('world',cubes.filter(c=>c.box===null));}
function render(){
 $('colour-key').hidden=$('type-colours').value!=='groups';
 $('paint-tools').hidden=broken;$('spread-label').hidden=!broken;
 $('phase').textContent=broken?'2 · Inspect & sort':'1 · Paint the outside';
 $('world-title').textContent=broken?'Cubes still to sort':'Your big cube';
 $('world-note').textContent=broken?'Drag to rotate the cube. Send each group to its bucket when ready.':'White faces are unpainted. Red = 1, yellow = 2 and blue = 3 painted faces when colour coding is on.';
 $('auto').disabled=broken&&!cubes.some(c=>c.box===null);draw();lockAutoControls();
 if(!$('auto-buckets').hidden)for(const b of [3,2,1,0]){const label=$('auto-buckets').querySelector(`[data-auto-box="${b}"] b`);if(label)label.textContent=cubes.filter(c=>c.box===b).length+' sorted';}
}
function fresh(){$('spread').value='0';$('auto-buckets').hidden=true;n=+$('size').value;paints=Array(6).fill(null);broken=false;selected=null;moves=[];checked=false;views.world={yaw:-.55,pitch:.45};render();say('Drag to turn the cube. Tap a face to paint that whole side.');}
$('size').onchange=()=>{if((broken||paints.some(Boolean))&&!confirm('Start a new cube and clear this investigation?')){$('size').value=n;return;}fresh();};$('new').onclick=()=>{if(confirm('Start again with an unpainted cube?'))fresh();};$('all').onclick=()=>{paints.fill(color);render();say('All six outside faces are painted. Turn the cube to check.');};$('erase').onclick=()=>{paints.fill(null);render();say('Paint cleared.');};
$('spread').oninput=draw;
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;if(d.paint!==undefined&&!broken){const i=+d.paint;paints[i]=paints[i]?null:color;render();}else if(d.color){color=d.color;document.querySelectorAll('[data-color]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.color===color));}});
for(const id of ['world']){const svg=$(id);let drag=null;svg.onpointerdown=e=>{drag={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,moved:false,face:e.target.closest('[data-face]')?.dataset.face,cube:e.target.closest('[data-cube]')?.dataset.cube};svg.setPointerCapture(e.pointerId);};svg.onpointermove=e=>{if(!drag)return;if(Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)>5)drag.moved=true;if(drag.moved){views[id].yaw+=(e.clientX-drag.x)*.012;views[id].pitch+=(e.clientY-drag.y)*.012;draw();}drag.x=e.clientX;drag.y=e.clientY;};svg.onpointerup=e=>{if(!drag)return;const d=drag;drag=null;if(!d.moved&&id==='world'){if(!broken&&d.face!==undefined){const i=+d.face;paints[i]=paints[i]?null:color;render();}}};svg.onpointercancel=()=>drag=null;svg.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();views[id].yaw+=e.key==='ArrowLeft'?-.25:e.key==='ArrowRight'?.25:0;views[id].pitch+=e.key==='ArrowUp'?.25:e.key==='ArrowDown'?-.25:0;draw();};}
let autoRunning=false, stopRequested=false;
function lockAutoControls(){
 if(!autoRunning)return;
 document.querySelectorAll('main button,main select,main input').forEach(el=>{
  el.disabled=!(el.id==='send-group'||el.id==='spread'||(autoPreview&&el.dataset.select&&autoPreview.includes(+el.dataset.select)));
 });
}
$('send-group').onclick=()=>releaseGroup?.();

async function automaticSort(){
 if(autoRunning)return;
 const guided=true;
 autoRunning=true;stopRequested=false;
 if(!broken){build();broken=true;}
 selected=null;checked=false;render();
 const buckets=$('auto-buckets');
 buckets.hidden=false;
 buckets.innerHTML=[3,2,1,0].map(b=>`<div class="auto-bucket" data-auto-box="${b}"><strong>${b}</strong><span>painted ${b===1?'face':'faces'}</span><b>0 arriving</b></div>`).join('');
 const main=document.querySelector('main');
 const stop=document.createElement('button');stop.id='stop-auto';stop.textContent='Stop auto sort';
 stop.onclick=()=>{stopRequested=true;releaseGroup?.();stop.textContent='Stopping…';stop.disabled=true;};
 document.body.append(stop);main.inert=!guided;
 $('world').scrollIntoView({block:'start',behavior:'instant'});
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let layer;
 try{
  for(const b of [3,2,1,0]){
   if(stopRequested)break;
   const group=cubes.filter(c=>c.box===null&&count(c)===b);
   const bucket=buckets.querySelector(`[data-auto-box="${b}"]`);
   bucket.classList.add('active');
   say(group.length?`Selecting ${group.length} cubes with ${b} painted ${b===1?'face':'faces'}…`:`No unsorted cubes with ${b} painted faces.`);
   if(!group.length){await new Promise(r=>setTimeout(r,reduced?40:450));bucket.classList.remove('active');continue;}
   autoPreview=group.map(c=>c.id);selected=null;main.inert=true;render();
   if(guided){
    $('send-group').hidden=false;main.inert=false;render();
    $('world-title').textContent=`Explore the ${b}-face group`;
    $('world-note').textContent='The selected group stays in place. Drag to rotate and count. Press Send to bucket when ready.';
    say(`These cubes have ${b} painted ${b===1?'face':'faces'}. Take your time to inspect and count them. Send them to the bucket when ready.`);
    await new Promise(resolve=>{releaseGroup=resolve;});
    releaseGroup=null;$('send-group').hidden=true;
    if(stopRequested)break;
    selected=null;render();main.inert=true;
   }
   layer=document.createElementNS('http://www.w3.org/2000/svg','svg');
   layer.classList.add('flight-layer');layer.setAttribute('aria-hidden','true');
   document.body.append(layer);
   const matrix=$('world').getScreenCTM();
   const flights=group.map(c=>{
    const outer=document.createElementNS(layer.namespaceURI,'g');
    const inner=document.createElementNS(layer.namespaceURI,'g');
    inner.setAttribute('transform',`matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})`);
    const original=[...$('world').querySelectorAll(`[data-cube="${c.id}"]`)];
    original.forEach(face=>{inner.append(face.cloneNode(true));face.style.visibility='hidden';});
    outer.append(inner);layer.append(outer);
    const gap=1+Number($('spread').value),scale=fittedCubeScale(gap);
    const pos=rotate(cubeCentre(c,gap),views.world);
    const point=new DOMPoint(300+pos[0]*scale,215-pos[1]*scale).matrixTransform(matrix);
    return {outer,point};
   });
   say(`Moving ${group.length} cubes into the ${b}-face box…`);
   const rect=bucket.getBoundingClientRect();
   await Promise.all(flights.map(({outer,point},i)=>{
    const dx=rect.left+rect.width/2-point.x+((i%3)-1)*5;
    const dy=rect.top+rect.height*.5-point.y;
    return outer.animate([
     {transform:'translate(0,0)',opacity:1},
     {transform:`translate(${dx}px,${dy-30}px)`,opacity:1,offset:.8},
     {transform:`translate(${dx}px,${dy}px)`,opacity:0}
    ],{duration:reduced?80:1100,easing:'ease-in-out',fill:'forwards'}).finished;
   }));
   moves.push({batch:group.map(c=>({id:c.id,box:c.box}))});
   group.forEach(c=>c.box=b);
   layer.remove();layer=null;autoPreview=null;render();
   bucket.querySelector('b').textContent=group.length+' sorted';
   bucket.classList.remove('active');
   await new Promise(r=>setTimeout(r,reduced?40:350));
  }
 }finally{
  layer?.remove();autoPreview=null;releaseGroup=null;selected=null;$('send-group').hidden=true;main.inert=false;stop.remove();autoRunning=false;document.querySelectorAll('main button,main select,main input').forEach(el=>el.disabled=false);render();
 }
 const remaining=cubes.filter(c=>c.box===null).length;
 const wrong=cubes.filter(c=>c.box!==null&&c.box!==count(c)).length;
 say(stopRequested?`Auto sort stopped. ${remaining} cubes still unsorted.`:wrong?'Unsorted cubes sorted. Some earlier placements still need checking.':'All cubes sorted — 3 painted faces, then 2, 1 and 0.');
}
$('auto').onclick=automaticSort;

fresh();
