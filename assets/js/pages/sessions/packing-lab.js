/* Manual play uses the solver's bottom-left coordinates when recording placements. */
(() => {
  'use strict';
  const el=id=>document.getElementById(id), board=el('board');
  const ns='http://www.w3.org/2000/svg';
  let game, moves=[], pieces=[], selected=0, turned=false, cursor=[0,0], keyboard=false;
  const searchLimit=2000000;
  let result=null, search=null, running=false, runId=0, showing=false, shown=0, replayTimer=0;
  const readRows=()=>el('pieces').value.trim().split(/\n+/).map(l=>l.trim().split(/[ ,]+/).map(Number));
  function say(message) { if(el('status').textContent!==message) el('status').textContent=message; }
  function node(tag,attrs={},text) {
    const n=document.createElementNS(ns,tag);
    for(const [k,v] of Object.entries(attrs)) n.setAttribute(k,v);
    if(text!==undefined) n.textContent=text;
    return n;
  }
  function colours() {
    const s=getComputedStyle(document.documentElement);
    return [['light','#a8b8ff'],['yellow','#e7a523'],['primary','#435be8'],['yellow-light','#ffe194'],['dark','#26339a'],['yellow-dark','#98630c']].map(([key,colour])=>s.getPropertyValue('--mw-shape-'+key).trim()||colour);
  }
  function stopReplay() { clearTimeout(replayTimer); replayTimer=0; }
  function endSearch() { running=false; runId++; search=null; el('pause').hidden=true; el('solve').disabled=false; }
  function config() {
    const [w,h]=[Number(el('width').value),Number(el('height').value)], squares=el('mode').value==='Squares';
    if (![w,h].every(n=>Number.isInteger(n)&&n>=1&&n<=30)) throw Error('Choose whole board sides between 1 and 30.');
    const rows=squares?Array.from({length:Math.min(w,h)},(_,i)=>[i+1,i+1,w*h]):readRows();
    if(!rows.length||rows.length>30||(!squares&&rows.length>20)||rows.some(p=>p.length!==3||!p.every(Number.isInteger)||p[0]<1||p[1]<1||p[0]>30||p[1]>30||p[2]<0||p[2]>900)) throw Error('For each piece, enter its width, height and quantity. Use sizes 1–30 and quantities 0–900.');
    return {w,h,squares,rows,rotation:el('rotate').checked};
  }
  function countType(type) { return pieces.filter(p=>p.Type===type+1).length; }
  function dimensions() {
    const [w,h]=game.rows[selected];
    return turned?[h,w]:[w,h];
  }
  function updateTools() {
    el('piece').replaceChildren(...game.rows.map(([w,h,total],i)=>{
      const remaining=total-countType(i);
      const dims=(i===selected&&turned?[h,w]:[w,h]).join(' × ');
      const opt=new Option(dims+(game.squares?'':' · '+remaining+' left'),i);
      opt.disabled=!game.squares&&remaining===0; return opt;
    }));
    el('piece').value=String(selected);
    el('turn').disabled=!game.rotation||game.squares||dimensions()[0]===dimensions()[1];
    el('undo').disabled=!moves.length;
    el('playTools').hidden=showing; el('replayTools').hidden=!showing;
    el('save').disabled=!result; el('svgSave').disabled=!result||!showing;
  }
  function stateMessage() {
    if(game.squares) {
      const left=game.w*game.h-pieces.reduce((s,p)=>s+p.Width*p.Height,0);
      return left ? left+' empty cells.' : 'Covered with '+pieces.length+' squares. Can you use fewer?';
    }
    const total=game.rows.reduce((s,p)=>s+p[2],0);
    return pieces.length===total?'All '+total+' pieces fit! Try a new board.':pieces.length+' of '+total+' pieces placed.';
  }
  function view() {
    return showing&&result?{w:result.Sheet[0],h:result.Sheet[1],items:result.Placements.slice(0,shown)}:{...game,items:pieces};
  }
  function render(animateIndex=-1) {
    const {w,h,items}=view(), pad=Math.max(w,h)*.035, palette=colours();
    board.setAttribute('viewBox',[-pad,-pad,w+pad*2,h+pad*2].join(' '));
    board.setAttribute('aria-label',(showing?'Packing diagram':'Packing board')+', '+w+' columns and '+h+' rows.');
    board.replaceChildren(node('rect',{x:0,y:0,width:w,height:h,fill:'#fff',stroke:'#82938b','stroke-width':pad*.14}));
    if(Math.max(w,h)<=30) {
      const lines=[];
      for(let x=1;x<w;x++)lines.push('M'+x+' 0V'+h);
      for(let y=1;y<h;y++)lines.push('M0 '+y+'H'+w);
      board.append(node('path',{d:lines.join(' '),stroke:'#cbd5d0',fill:'none','stroke-width':.025}));
    }
    items.forEach((p,index)=>{
      const colour=((p.Type||1)-1)%palette.length;
      const g=node('g'),y=h-p.Y-p.Height;
      g.append(node('rect',{x:p.X,y,width:p.Width,height:p.Height,fill:palette[colour],stroke:'#fff','stroke-width':Math.min(p.Width,p.Height)*.025}),
        node('title',{},p.Width+' by '+p.Height+' piece'),
        node('text',{x:p.X+p.Width/2,y:y+p.Height/2,'text-anchor':'middle','dominant-baseline':'middle','font-size':Math.min(p.Width*.26,p.Height*.36),'font-family':'system-ui',fill:[2,4,5].includes(colour)?'#fff':'#192b38'},p.Width+'×'+p.Height));
      board.append(g); if(index===animateIndex) window.MWLearnerPlay.animatePiece(g);
    });
    if(showing&&el('cuts').checked&&Array.isArray(result.Cuts)) for(const c of result.Cuts) {
      const [x,y,cw,ch]=c.Region,k=(result.Kerf||0)/2,v=c.Axis==='V';
      board.append(node('line',{x1:v?x+c.Offset+k:x,y1:v?h-y:h-y-c.Offset-k,x2:v?x+c.Offset+k:x+cw,y2:v?h-y-ch:h-y-c.Offset-k,stroke:'#b43b30','stroke-width':Math.max(w,h)*.002,'stroke-dasharray':Math.max(w,h)*.008}));
    }
    if(!showing&&keyboard&&document.activeElement===board) board.append(node('rect',{x:cursor[0]+.04,y:cursor[1]+.04,width:.92,height:.92,fill:'none',stroke:'#17283a','stroke-width':.08}));
    if(showing) {
      el('reveal').max=result.Placements.length; el('reveal').value=shown;
      el('revealText').textContent=shown+' / '+result.Placements.length;
      el('step').disabled=shown>=result.Placements.length; el('replay').disabled=!result.Placements.length;
    }
  }
  function fresh(next) {
    endSearch(); stopReplay(); game=next; pieces=[]; moves=[]; selected=0; turned=false; cursor=[0,0]; showing=false; result=null;
    el('instruction').textContent='Choose a piece. Tap a cell to place its top-left corner.';
    updateTools(); render(); say(stateMessage());
  }
  function chooseNew() { try { fresh(config()); } catch(e) { say(e.message); } }
  function overlaps(a,b) { return a.X<b.X+b.Width&&b.X<a.X+a.Width&&a.Y<b.Y+b.Height&&b.Y<a.Y+a.Height; }
  function atCell(x,row) { const y=game.h-row-1; return pieces.findIndex(p=>x>=p.X&&x<p.X+p.Width&&y>=p.Y&&y<p.Y+p.Height); }
  function act(x,row) {
    if(showing||x<0||x>=game.w||row<0||row>=game.h) return;
    const i=atCell(x,row);
    if(i>=0) {
      moves.push(pieces.slice()); selected=pieces[i].Type-1; turned=false; pieces.splice(i,1);
    } else {
      const [width,height]=dimensions(), p={X:x,Y:game.h-row-height,Width:width,Height:height,Type:selected+1};
      if(!game.squares&&countType(selected)>=game.rows[selected][2]) {say('Choose a piece with some left.'); return;}
      if(p.Y<0||p.X+width>game.w||pieces.some(other=>overlaps(p,other))) {say('That piece does not fit here. Try moving or turning it.'); return;}
      moves.push(pieces.slice()); pieces.push(p);
      if(!game.squares&&countType(selected)>=game.rows[selected][2]) {
        const next=game.rows.findIndex((type,i)=>countType(i)<type[2]);
        if(next>=0) {selected=next;turned=false;}
      }
    }
    if(moves.length>150)moves.shift();updateTools();render(i<0?pieces.length-1:-1);say(stateMessage());
  }
  board.addEventListener('click',e=>{
    if(showing||!board.getScreenCTM())return;
    const point=board.createSVGPoint();point.x=e.clientX;point.y=e.clientY;
    const p=point.matrixTransform(board.getScreenCTM().inverse());keyboard=false;act(Math.floor(p.x),Math.floor(p.y));
  });
  board.addEventListener('keydown',e=>{
    if(showing)return;keyboard=true;
    const dir={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];
    if(dir) {
      e.preventDefault(); cursor=[Math.min(game.w-1,Math.max(0,cursor[0]+dir[0])),Math.min(game.h-1,Math.max(0,cursor[1]+dir[1]))];
      const i=atCell(...cursor);say('Row '+(cursor[1]+1)+', column '+(cursor[0]+1)+'. '+(i<0?'Empty.':pieces[i].Width+' by '+pieces[i].Height+' piece.'));render();
    } else if(e.key==='Enter'||e.key===' ') {e.preventDefault();act(...cursor);}
    else if(e.key.toLowerCase()==='r') {e.preventDefault();el('turn').click();}
  });
  board.addEventListener('focus',()=>{keyboard=board.matches(':focus-visible'); render();}); board.addEventListener('blur',()=>render());
  el('piece').onchange=()=>{selected=Number(el('piece').value);turned=false;updateTools();};
  el('turn').onclick=()=>{turned=!turned;updateTools();say('Turned to '+dimensions().join(' by ')+'.');};
  el('undo').onclick=()=>{if(!moves.length)return;pieces=moves.pop();updateTools();render();say(stateMessage());};
  function showResult(r, sourced=false) {
    result=r;showing=true; stopReplay();shown=Math.min(1,r.Placements.length);
    el('instruction').textContent='Reveal the pieces one at a time. Compare this layout with yours.';
    const optimal=r.PrimaryOptimal===true&&!sourced;
    const label=optimal?(r.Mode==='Squares'?'Fewest possible':'Most that fit'):(sourced?'Imported layout':'A layout found');
    say(label+': '+r.Placements.length+' '+(r.Placements.length===1?'piece.':'pieces.'));
    updateTools();render(shown-1);
  }
  function tick(id) {
    if(!running||id!==runId)return;
    if(search.step(4000)) {const r=search.result();endSearch();showResult(r);return;}
    setTimeout(()=>tick(id),0);
  }
  el('solve').onclick=()=>{
    try {
      const next=config();if(JSON.stringify(next)!==JSON.stringify(game)) fresh(next);
      endSearch();stopReplay();search=createSearch(game.w,game.h,game.rows,game.squares?'Squares':'Rectangles',game.rotation,searchLimit);
      running=true;el('solve').disabled=true;el('pause').hidden=false;el('pause').textContent='Pause search';say('Looking for a packing…');tick(++runId);
    } catch(e) {endSearch();say(e.message);}
  };
  el('pause').onclick=()=>{
    if(!search)return;
    if(running) {running=false;runId++;showResult(search.result());el('pause').textContent='Resume search';}
    else {running=true;el('pause').textContent='Pause search';say('Looking for another packing…');tick(++runId);}
  };
  el('step').onclick=()=>{stopReplay();shown=Math.min(shown+1,result.Placements.length);render(shown-1);};
  el('reveal').oninput=()=>{stopReplay();shown=Number(el('reveal').value);render();};
  el('replay').onclick=()=>{
    stopReplay();shown=0;render();
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced) {shown=result.Placements.length;render();return;}
    function next() {if(!showing)return;shown++;render(shown-1);if(shown<result.Placements.length)replayTimer=setTimeout(next,520);}
    if(result.Placements.length)next();
  };
  el('back').onclick=()=>{endSearch();stopReplay();showing=false;el('instruction').textContent='Choose a piece. Tap a cell to place its top-left corner.';updateTools();render();say(stateMessage());};
  el('new').onclick=chooseNew;
  el('mode').onchange=()=>{el('rectControls').hidden=el('mode').value==='Squares';};
  document.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{
    el('mode').value='Squares';el('mode').onchange();[el('width').value,el('height').value]=b.dataset.size.split(',');chooseNew();
  });
  el('cuts').onchange=()=>render();
  function download(name,text,type) {const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  el('save').onclick=()=>download('packing-result.json',JSON.stringify(result,null,2),'application/json');
  el('svgSave').onclick=()=>download('packing.svg',new XMLSerializer().serializeToString(board),'image/svg+xml');
  el('load').onchange=async()=>{
    const f=el('load').files[0];if(!f)return;endSearch();stopReplay();const id=runId;
    try {if(f.size>5000000)throw Error('Please use a file under 5 MB.');const data=validate(JSON.parse(await f.text()));if(id===runId)showResult(data,true);}
    catch(e) {if(id===runId)say(e.message);}
  };
  window.MWLearnerPlay.mount('packing-lab');chooseNew();
  document.addEventListener('mw:themechange',()=>render());
})();
