/* Grid-based integer squares. Saved tiles retain the original x, y, n and color fields. */
(() => {
  'use strict';
  const el = id => document.getElementById(id);
  const canvas = el('canvas'), ctx = canvas.getContext('2d');
  const key = 'fewest-squares', title = 'Fewest Squares';
  const prompts = ['Can you fill every cell?', 'Change your first square. Can you use fewer pieces?', 'How could you rule out a tiling with one fewer square?'];
  const hints = ['Try a square that fills the short side.', 'Try starting in two different corners.', 'Look for a lower bound. Which pieces must cover each edge?'];
  let rows = 3, cols = 5, tiles = [], saved = [], history = [], stage = 0;
  let width = 1, height = 1, cursor = [0, 0], drag = null, preview = null, animation = null;
  let keyboard = false;
  let palette = [], ink = '', paper = '', grid = '';

  function colours() {
    const css = getComputedStyle(document.documentElement);
    const value = (name, fallback) => css.getPropertyValue(name).trim() || fallback;
    const shades = [['light','#a8b8ff'],['yellow','#e7a523'],['primary','#435be8'],['yellow-light','#ffe194'],['dark','#26339a'],['yellow-dark','#98630c']];
    palette = shades.map(([name, fallback]) => value('--mw-shape-' + name, fallback));
    ink = value('--mw-text', '#202923'); paper = value('--mw-canvas-bg', '#f7f9f7'); grid = value('--mw-plot-grid', '#b8c5be');
  }

  function gridBox() {
    const size = Math.min((width - 24) / cols, (height - 24) / rows);
    return { size, x: (width - size * cols) / 2, y: (height - size * rows) / 2 };
  }
  function fits({x,y,n}) {
    return x >= 0 && y >= 0 && x + n <= cols && y + n <= rows &&
      tiles.every(t => x >= t.x+t.n || x+n <= t.x || y >= t.y+t.n || y+n <= t.y);
  }
  function occupancy() { return tiles.reduce((a,t) => a+t.n*t.n,0); }
  function tileAt(x,y) { return tiles.findIndex(t => x>=t.x && x<t.x+t.n && y>=t.y && y<t.y+t.n); }

  function draw() {
    const g = gridBox(), s = g.size;
    ctx.fillStyle = paper; ctx.fillRect(0,0,width,height);
    ctx.beginPath();
    for (let i=0; i<=cols; i++) { ctx.moveTo(g.x+i*s,g.y); ctx.lineTo(g.x+i*s,g.y+rows*s); }
    for (let j=0; j<=rows; j++) { ctx.moveTo(g.x,g.y+j*s); ctx.lineTo(g.x+cols*s,g.y+j*s); }
    ctx.strokeStyle=grid; ctx.lineWidth=1; ctx.stroke();
    for (const t of tiles) {
      const index=t.color % palette.length;
      const progress=animation?.tile===t ? animation.progress : 1;
      const inset=(1-progress)*Math.min(5,s*.18);
      ctx.fillStyle=palette[index]; ctx.globalAlpha=.4+.6*progress;
      ctx.fillRect(g.x+t.x*s+1+inset,g.y+t.y*s+1+inset,t.n*s-2-2*inset,t.n*s-2-2*inset);
      ctx.globalAlpha=1; ctx.fillStyle=[2,4,5].includes(index)?'#fff':ink;
      ctx.textBaseline='middle'; ctx.textAlign='center'; ctx.font='650 '+Math.max(10,Math.min(20,s*.45))+'px system-ui';
      ctx.fillText(el('areas').checked?t.n*t.n:t.n+'×'+t.n,g.x+(t.x+t.n/2)*s,g.y+(t.y+t.n/2)*s);
    }
    if (preview) {
      ctx.fillStyle=fits(preview)?'#3367b4':'#a13a28'; ctx.globalAlpha=.36;
      ctx.fillRect(g.x+preview.x*s,g.y+preview.y*s,preview.n*s,preview.n*s); ctx.globalAlpha=1;
    }
    if (keyboard && document.activeElement===canvas) {
      ctx.strokeStyle=ink; ctx.lineWidth=3; ctx.strokeRect(g.x+cursor[0]*s+2,g.y+cursor[1]*s+2,s-4,s-4);
    }
  }
  function resize() {
    const box=canvas.getBoundingClientRect(), ratio=window.devicePixelRatio||1;
    width=box.width; height=box.height;
    canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0); draw();
  }

  function report(text, warn=false) {
    el('status').textContent=text; el('status').classList.toggle('warn',warn);
  }
  function refresh(text) {
    const left=cols*rows-occupancy();
    el('keep').disabled=left!==0; el('undo').disabled=!history.length; el('clear').disabled=!tiles.length;
    report(text || (left ? (tiles.length ? left+' empty cells.' : 'Your board is ready.') :
      'Covered with '+tiles.length+' squares. Keep this tiling or try using fewer.'));
    draw();
  }
  function checkpoint() {
    history.push(tiles.map(t=>({...t})));
    if (history.length>100) history.shift();
  }
  function place(t) {
    if (!fits(t)) { report('Try a smaller square or move to an empty space.',true); draw(); return; }
    checkpoint();
    const piece={...t,color:tiles.length%palette.length};
    tiles.push(piece); refresh();
    const current={tile:piece,progress:0}; animation=current;
    window.MWLearnerPlay.animateDraw(progress=>{
      if (animation!==current) return;
      current.progress=progress; draw(); if (progress===1) animation=null;
    });
  }
  function act(x,y) {
    const old=tileAt(x,y);
    if (old<0) { place({x,y,n:Number(el('piece').value)}); return; }
    checkpoint(); tiles.splice(old,1); refresh();
  }
  function locate(e) {
    const box=canvas.getBoundingClientRect(), g=gridBox();
    return [Math.floor((e.clientX-box.left-g.x)/g.size),Math.floor((e.clientY-box.top-g.y)/g.size)];
  }
  canvas.addEventListener('pointerdown',e=>{
    const [x,y]=locate(e);
    if (x<0 || x>=cols || y<0 || y>=rows) return;
    keyboard=false; canvas.setPointerCapture(e.pointerId); cursor=[x,y]; drag={x,y,id:e.pointerId}; preview=null;
  });
  canvas.addEventListener('pointermove',e=>{
    if (drag?.id!==e.pointerId) return;
    const [x,y]=locate(e), dx=x-drag.x, dy=y-drag.y;
    if (!dx && !dy) { preview=null; draw(); return; }
    const n=Math.min(rows,cols,1+Math.max(Math.abs(dx),Math.abs(dy)));
    preview={x:dx<0?drag.x-n+1:drag.x,y:dy<0?drag.y-n+1:drag.y,n}; draw();
  });
  canvas.addEventListener('pointerup',e=>{
    if (drag?.id!==e.pointerId) return;
    const {x,y}=drag, t=preview; drag=preview=null;
    if (t) place(t); else act(x,y);
  });
  canvas.addEventListener('pointercancel',()=>{drag=preview=null; draw();});
  canvas.addEventListener('focus',()=>{keyboard=canvas.matches(':focus-visible'); draw();});
  canvas.addEventListener('blur',draw);
  canvas.addEventListener('keydown',e=>{
    keyboard=true;
    const directions={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
    if (directions[e.key]) {
      e.preventDefault(); const [dx,dy]=directions[e.key];
      cursor=[Math.max(0,Math.min(cols-1,cursor[0]+dx)),Math.max(0,Math.min(rows-1,cursor[1]+dy))];
      const i=tileAt(...cursor);
      report('Row '+(cursor[1]+1)+', column '+(cursor[0]+1)+'. '+(i<0?'Empty.':tiles[i].n+' by '+tiles[i].n+' square.'));
      draw();
    } else if (e.key==='Enter' || e.key===' ') {
      e.preventDefault(); act(...cursor);
    } else if (/^[1-9]$/.test(e.key) && Number(e.key)<=Math.min(cols,rows)) {
      e.preventDefault(); el('piece').value=e.key; report('Selected a '+e.key+' by '+e.key+' square.');
    }
  });
  function options() {
    el('piece').replaceChildren(...Array.from({length:Math.min(cols,rows)},(_,i)=>new Option((i+1)+' × '+(i+1),i+1)));
    el('piece').value=Math.min(2,cols,rows);
    el('size').value=rows+','+cols; cursor=[0,0]; drag=preview=animation=null;
  }
  el('size').onchange=()=>{[rows,cols]=el('size').value.split(',').map(Number); tiles=[]; history=[]; options(); refresh();};
  el('clear').onclick=()=>{checkpoint(); tiles=[]; refresh();};
  el('undo').onclick=()=>{if(history.length) tiles=history.pop(); refresh();};
  el('areas').onchange=draw;
  function showPrompt() {
    document.querySelectorAll('[data-stage]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.stage)===stage)));
    el('prompt').textContent=prompts[stage]; el('hint').textContent=hints[stage];
    el('hint').hidden=true; el('hintButton').setAttribute('aria-expanded','false');
  }
  document.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>{stage=Number(b.dataset.stage); showPrompt();});
  el('hintButton').onclick=()=>{el('hint').hidden=!el('hint').hidden; el('hintButton').setAttribute('aria-expanded',String(!el('hint').hidden));};

  function persist() {
    try {
      localStorage.setItem(key+'-saved',JSON.stringify(saved)); localStorage.setItem(key+'-notes',el('notes').value);
      el('storage').textContent='Saved on this device.';
    } catch { el('storage').textContent='Storage is unavailable. Download your record to keep it.'; }
  }
  function gallery() {
    const box=el('saved'); box.replaceChildren(); el('empty').hidden=!!saved.length;
    for (const [index,record] of saved.entries()) {
      const card=document.createElement('div'); card.className='saved';
      const img=document.createElement('img'); img.src=record.image; img.alt=record.title;
      const label=document.createElement('p'); label.textContent=record.title;
      const inspect=document.createElement('button'); inspect.textContent='Inspect';
      inspect.onclick=()=>{
        cols=record.data.cols; rows=record.data.rows; tiles=record.data.tiles.map(t=>({...t})); history=[];
        options(); refresh(); canvas.focus();
      };
      const remove=document.createElement('button'); remove.textContent='Remove'; remove.setAttribute('aria-label','Remove '+record.title);
      remove.onclick=()=>{saved.splice(index,1); persist(); gallery();};
      card.append(img,label,inspect,remove); box.append(card);
    }
  }
  el('keep').onclick=()=>{
    if (occupancy()!==rows*cols) return;
    const id=rows+','+cols+':'+tiles.map(t=>[t.x,t.y,t.n].join(',')).sort().join(';');
    if (saved.some(r=>r.key===id)) {report('You have already kept this tiling.');return;}
    if (saved.length>=30) {report('Your collection is full. Download your record or remove a tiling.',true);return;}
    animation=null; keyboard=false; draw();
    const thumb=document.createElement('canvas'); thumb.width=260; thumb.height=Math.round(260*height/width);
    thumb.getContext('2d').drawImage(canvas,0,0,thumb.width,thumb.height);
    saved.push({data:{cols,rows,tiles:tiles.map(t=>({...t}))},title:rows+' × '+cols+' board · '+tiles.length+' squares',key:id,image:thumb.toDataURL('image/png')});
    persist(); gallery(); report('Tiling kept. Can you use fewer squares?');
  };
  el('download').onclick=()=>{
    const data={activity:title,notes:el('notes').value,designs:saved.map(r=>({title:r.title,...r.data}))};
    const a=document.createElement('a'), url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
    a.href=url; a.download=key+'-record.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  try {
    const records=JSON.parse(localStorage.getItem(key+'-saved')||'[]'); saved=Array.isArray(records)?records:[];
    el('notes').value=localStorage.getItem(key+'-notes')||'';
  } catch {}
  el('notes').oninput=persist;
  window.MWLearnerPlay.mount(key); colours(); options(); showPrompt(); gallery(); resize(); refresh();
  new ResizeObserver(resize).observe(canvas);
  document.addEventListener('mw:themechange',()=>{colours(); draw();});
})();
