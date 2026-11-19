(() => {
function mwPlotColour(name,fallback){return getComputedStyle(document.documentElement).getPropertyValue(name).trim()||fallback;}

  const canvas = document.getElementById('lab');
  const ctx = canvas.getContext('2d');
  const vEl = document.getElementById('vCount');
  const eEl = document.getElementById('eCount');
  const rankEl = document.getElementById('rankCount');
  const dofEl = document.getElementById('dofCount');
  const errEl = document.getElementById('errorCount');
  const statusBig = document.getElementById('statusBig');
  const statusText = document.getElementById('statusText');
  const maxwellText = document.getElementById('maxwellText');
  const pinBtn = document.getElementById('pinBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const selectionTitle = document.getElementById('selectionTitle');
  const xInput = document.getElementById('xCoord');
  const yInput = document.getElementById('yCoord');
  const zInput = document.getElementById('zCoord');
  const applyCoords = document.getElementById('applyCoords');
  const zMinus = document.getElementById('zMinus');
  const zPlus = document.getElementById('zPlus');

  let nodes = [], bars = [];
  let mode = 'drag';
  let selected = null, barFirst = null, dragging = null;
  let lastPointer = null, orbiting = false;
  let initial = null;
  let yaw = -0.65, pitch = 0.42, zoom = 130;
  let renderNodes = [];

  const presets = {
    tetra: {
      n:[[-1,-.8,-.7],[1,-.8,-.7],[0,-.8,1],[0,1,0]],
      b:[[0,1],[1,2],[2,0],[0,3],[1,3],[2,3]], p:[0,1,2]
    },
    cube: {
      n:[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],
      b:[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]], p:[0,1,3]
    },
    bracedcube: {
      n:[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],
      b:[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],
         [0,2],[4,6],[0,5],[1,6],[2,7],[3,4]], p:[0,1,3]
    },
    octa: {
      n:[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],
      b:[[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[4,3],[3,5],[5,2]], p:[1,3,5]
    },
    tower: {
      n:[[-1.4,-1.6,-1], [1.4,-1.6,-1], [1.4,-1.6,1], [-1.4,-1.6,1],
         [-.9,-.2,-.7], [.9,-.2,-.7], [.9,-.2,.7], [-.9,-.2,.7],
         [-.45,1.1,-.35],[.45,1.1,-.35],[.45,1.1,.35],[-.45,1.1,.35],
         [0,2.0,0]],
      b:[[0,1],[1,2],[2,3],[3,0],[0,4],[1,5],[2,6],[3,7],
         [4,5],[5,6],[6,7],[7,4],[0,5],[1,6],[2,7],[3,4],
         [4,8],[5,9],[6,10],[7,11],[8,9],[9,10],[10,11],[11,8],
         [4,9],[5,10],[6,11],[7,8],[8,12],[9,12],[10,12],[11,12]], p:[0,1,2,3]
    }
  };

  const dist3=(a,b)=>Math.hypot(b.x-a.x,b.y-a.y,b.z-a.z);
  function makeBar(a,b){ return {a,b,len:dist3(nodes[a],nodes[b])}; }

  function snapshot(){
    return {nodes:nodes.map(n=>({...n})),bars:bars.map(b=>({...b})),yaw,pitch,zoom};
  }

  function restore(s){
    nodes=s.nodes.map(n=>({...n}));
    bars=s.bars.map(b=>({...b}));
    yaw=s.yaw; pitch=s.pitch; zoom=s.zoom;
    selected=null; barFirst=null; dragging=null; orbiting=false;
    render();
  }

  function loadPreset(name){
    const p=presets[name];
    nodes=p.n.map((q,i)=>({x:q[0],y:q[1],z:q[2],pinned:p.p.includes(i)}));
    bars=p.b.map(([a,b])=>makeBar(a,b));
    yaw=-0.65; pitch=0.42; zoom=130;
    selected=null; barFirst=null; dragging=null;
    initial=snapshot();
    setMode('drag');
    render();
  }

  function setMode(m){
    mode=m; barFirst=null; dragging=null; orbiting=false;
    document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===m));
    canvas.style.cursor = m==='orbit'?'grab':m==='joint'?'crosshair':'default';
    render();
  }

  function rotatePoint(p){
    const cy=Math.cos(yaw), sy=Math.sin(yaw);
    const cp=Math.cos(pitch), sp=Math.sin(pitch);
    const x1=cy*p.x + sy*p.z;
    const z1=-sy*p.x + cy*p.z;
    const y1=p.y;
    const y2=cp*y1 - sp*z1;
    const z2=sp*y1 + cp*z1;
    return {x:x1,y:y2,z:z2};
  }

  function invRotateVector(v){
    const cp=Math.cos(pitch), sp=Math.sin(pitch);
    const cy=Math.cos(yaw), sy=Math.sin(yaw);
    const x1=v.x;
    const y1=cp*v.y + sp*v.z;
    const z1=-sp*v.y + cp*v.z;
    return {
      x:cy*x1 - sy*z1,
      y:y1,
      z:sy*x1 + cy*z1
    };
  }

  function fittedZoom(){const radius=Math.max(1.2,...nodes.map(n=>Math.hypot(n.x,n.y,n.z)));return Math.min(zoom,(Math.min(canvas.width,canvas.height)-90)/(2*radius));}

  function project(p){
    const r=rotatePoint(p);
    const cx=canvas.width/2, cy=canvas.height/2;
    return {sx:cx+r.x*fittedZoom(), sy:cy-r.y*fittedZoom(), depth:r.z, r};
  }

  function screenToWorldPlane(sx,sy,depth=0){
    const rx=(sx-canvas.width/2)/fittedZoom();
    const ry=-(sy-canvas.height/2)/fittedZoom();
    return invRotateVector({x:rx,y:ry,z:depth});
  }

  function pointerPos(e){
    const rect=canvas.getBoundingClientRect();
    return {
      x:(e.clientX-rect.left)*canvas.width/rect.width,
      y:(e.clientY-rect.top)*canvas.height/rect.height
    };
  }

  function hitNode(x,y){
    let best=null, bestD=18*18;
    for(const q of renderNodes){
      const d=(q.sx-x)**2+(q.sy-y)**2;
      if(d<bestD){best=q.i;bestD=d;}
    }
    return best;
  }

  function solve(iter=320){
    for(let it=0;it<iter;it++){
      let worst=0;
      for(const b of bars){
        const A=nodes[b.a], B=nodes[b.b];
        const dx=B.x-A.x, dy=B.y-A.y, dz=B.z-A.z;
        const d=Math.hypot(dx,dy,dz);
        if(d<1e-12) continue;
        const diff=d-b.len;
        worst=Math.max(worst,Math.abs(diff));
        const ux=dx/d, uy=dy/d, uz=dz/d;
        if(A.pinned&&B.pinned) continue;
        if(A.pinned){
          B.x-=ux*diff; B.y-=uy*diff; B.z-=uz*diff;
        }else if(B.pinned){
          A.x+=ux*diff; A.y+=uy*diff; A.z+=uz*diff;
        }else{
          A.x+=ux*diff*.5; A.y+=uy*diff*.5; A.z+=uz*diff*.5;
          B.x-=ux*diff*.5; B.y-=uy*diff*.5; B.z-=uz*diff*.5;
        }
      }
      if(worst<1e-9) break;
    }
  }

  function maxError(){
    let m=0;
    for(const b of bars) m=Math.max(m,Math.abs(dist3(nodes[b.a],nodes[b.b])-b.len));
    return m;
  }

  function rigidityRank(){
    const V=nodes.length,E=bars.length;
    if(!V||!E) return 0;
    const A=Array.from({length:E},()=>Array(3*V).fill(0));
    bars.forEach((b,r)=>{
      const p=nodes[b.a],q=nodes[b.b];
      const dx=p.x-q.x,dy=p.y-q.y,dz=p.z-q.z;
      A[r][3*b.a]=dx; A[r][3*b.a+1]=dy; A[r][3*b.a+2]=dz;
      A[r][3*b.b]=-dx; A[r][3*b.b+1]=-dy; A[r][3*b.b+2]=-dz;
    });
    let rank=0,col=0;
    const eps=1e-9;
    while(rank<E && col<3*V){
      let piv=rank;
      for(let r=rank+1;r<E;r++) if(Math.abs(A[r][col])>Math.abs(A[piv][col])) piv=r;
      if(Math.abs(A[piv][col])<eps){col++;continue;}
      [A[rank],A[piv]]=[A[piv],A[rank]];
      const pv=A[rank][col];
      for(let c=col;c<3*V;c++) A[rank][c]/=pv;
      for(let r=0;r<E;r++){
        if(r===rank) continue;
        const f=A[r][col];
        if(Math.abs(f)>eps) for(let c=col;c<3*V;c++) A[r][c]-=f*A[rank][c];
      }
      rank++;col++;
    }
    return rank;
  }

  function componentSizes(){
    const adj=Array.from({length:nodes.length},()=>[]);
    bars.forEach(b=>{adj[b.a].push(b.b);adj[b.b].push(b.a);});
    const seen=Array(nodes.length).fill(false), sizes=[];
    for(let i=0;i<nodes.length;i++){
      if(seen[i]) continue;
      let n=0,stack=[i]; seen[i]=true;
      while(stack.length){
        const u=stack.pop();n++;
        for(const v of adj[u]) if(!seen[v]){seen[v]=true;stack.push(v);}
      }
      sizes.push(n);
    }
    return sizes;
  }

  function trivialDOFForSize(n){
    if(n<=0) return 0;
    if(n===1) return 3;
    if(n===2) return 5;
    return 6;
  }

  function internalDOF(rank){
    const trivial=componentSizes().reduce((s,n)=>s+trivialDOFForSize(n),0);
    return Math.max(0,3*nodes.length-rank-trivial);
  }

  function updateStats(){
    const V=nodes.length,E=bars.length,r=rigidityRank(),d=internalDOF(r),err=maxError();
    vEl.textContent=V;eEl.textContent=E;rankEl.textContent=r;dofEl.textContent=d;
    errEl.textContent=err<1e-8?'< 0.00000001':err.toExponential(2);

    if(V===0){
      statusBig.textContent='Empty board';
      statusText.textContent='Add joints and connect them with bars.';
    }else if(d===0){
      statusBig.textContent='No internal flex detected';
      statusText.textContent='The rigidity matrix detects no generic infinitesimal internal motion in the connected pieces.';
    }else{
      statusBig.textContent=d===1?'1 internal degree of freedom':d+' internal degrees of freedom';
      statusText.textContent='The framework still has a mechanism: it can deform while preserving all bar lengths.';
    }

    const cs=componentSizes();
    if(cs.length>1){
      maxwellText.textContent='There are '+cs.length+' disconnected components. The usual 3V−6 count refers to one connected generic framework.';
    }else if(V>=3){
      const m=3*V-6;
      if(E<m) maxwellText.textContent=`At least ${m} independent bars are necessary generically; this has ${E}.`;
      else if(E===m) maxwellText.textContent=`This has the Maxwell minimum ${m} bars. In 3D that count alone does not guarantee rigidity.`;
      else maxwellText.textContent=`This has ${E-m} bar(s) beyond the Maxwell minimum ${m}.`;
    }else{
      maxwellText.textContent='For a 3D framework with at least three generic joints, the Maxwell count is E ≥ 3V − 6.';
    }

    const ok=selected!==null && nodes[selected];
    pinBtn.disabled=!ok; deleteBtn.disabled=!ok;
    applyCoords.disabled=!ok; xInput.disabled=!ok;yInput.disabled=!ok;zInput.disabled=!ok;
    zMinus.disabled=!ok||nodes[selected].pinned; zPlus.disabled=!ok||nodes[selected].pinned;
    if(ok){
      selectionTitle.textContent='Joint '+String.fromCharCode(65+(selected%26))+(nodes[selected].pinned?' (pinned)':'');
      xInput.value=nodes[selected].x.toFixed(3);
      yInput.value=nodes[selected].y.toFixed(3);
      zInput.value=nodes[selected].z.toFixed(3);
    }else{
      selectionTitle.textContent='No joint selected';
      xInput.value='';yInput.value='';zInput.value='';
    }
  }

  function drawAxes(){
    const origin=project({x:0,y:0,z:0});
    const axes=[
      [{x:1.2,y:0,z:0},getComputedStyle(document.documentElement).getPropertyValue('--x').trim(),'x'],
      [{x:0,y:1.2,z:0},getComputedStyle(document.documentElement).getPropertyValue('--y').trim(),'y'],
      [{x:0,y:0,z:1.2},getComputedStyle(document.documentElement).getPropertyValue('--z').trim(),'z']
    ];
    ctx.lineWidth=2;
    ctx.font='15px system-ui';
    for(const [p,color,label] of axes){
      const q=project(p);
      ctx.strokeStyle=color;ctx.fillStyle=color;
      ctx.beginPath();ctx.moveTo(origin.sx,origin.sy);ctx.lineTo(q.sx,q.sy);ctx.stroke();
      ctx.fillText(label,q.sx+5,q.sy-5);
    }
  }

  function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=mwPlotColour('--mw-canvas-bg','#fafbf8');ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle=mwPlotColour('--mw-plot-grid','#dce3dd');ctx.lineWidth=1;
    for(let x=0;x<canvas.width;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}
    for(let y=0;y<canvas.height;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}

    drawAxes();

    renderNodes=nodes.map((n,i)=>({...project(n),i})).sort((a,b)=>a.depth-b.depth);

    const barDraw=bars.map((b,idx)=>{
      const A=project(nodes[b.a]),B=project(nodes[b.b]);
      return {b,idx,A,B,depth:(A.depth+B.depth)/2};
    }).sort((a,b)=>a.depth-b.depth);

    ctx.lineCap='round';
    for(const x of barDraw){
      ctx.strokeStyle=mwPlotColour('--mw-shape-primary','#435be8');ctx.lineWidth=7;
      ctx.beginPath();ctx.moveTo(x.A.sx,x.A.sy);ctx.lineTo(x.B.sx,x.B.sy);ctx.stroke();
    }

    for(const q of renderNodes){
      const n=nodes[q.i];
      if(selected===q.i||barFirst===q.i){
        ctx.strokeStyle=mwPlotColour('--mw-shape-dark','#26339a');ctx.lineWidth=4;
        ctx.beginPath();ctx.arc(q.sx,q.sy,19,0,Math.PI*2);ctx.stroke();
      }
      ctx.fillStyle=n.pinned?mwPlotColour('--mw-shape-dark','#26339a'):mwPlotColour('--mw-shape-yellow','#e7a523');
      ctx.strokeStyle='#fff';ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(q.sx,q.sy,13,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle=n.pinned?'#ffffff':mwPlotColour('--mw-shape-dark','#26339a');ctx.font='bold 11px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(String.fromCharCode(65+(q.i%26)),q.sx,q.sy+1);
    }

    ctx.textAlign='left';ctx.textBaseline='alphabetic';
    ctx.fillStyle=mwPlotColour('--mw-text','#202722');ctx.font='14px system-ui';
    const msg=mode==='orbit'?'Drag to rotate the view; wheel to zoom.':
      mode==='joint'?'Click empty space to add a joint in the current view plane.':
      mode==='bar'?'Click two joints to add or remove a bar.':
      'Drag a free joint. All bars are restored to their original lengths.';
    ctx.fillText(msg,18,canvas.height-18);
    updateStats();
  }

  function toggleBar(a,b){
    if(a===b) return;
    const hit=bars.findIndex(x=>(x.a===a&&x.b===b)||(x.a===b&&x.b===a));
    if(hit>=0) bars.splice(hit,1); else bars.push(makeBar(a,b));
  }

  function deleteJoint(i){
    bars=bars.filter(b=>b.a!==i&&b.b!==i).map(b=>({...b,a:b.a>i?b.a-1:b.a,b:b.b>i?b.b-1:b.b}));
    nodes.splice(i,1);selected=null;barFirst=null;
  }

  function moveSelectedScreen(dx,dy){
    if(selected===null||!nodes[selected]||nodes[selected].pinned) return;
    const v=invRotateVector({x:dx/fittedZoom(),y:-dy/fittedZoom(),z:0});
    nodes[selected].x+=v.x;nodes[selected].y+=v.y;nodes[selected].z+=v.z;
    solve();render();
  }

  canvas.addEventListener('pointerdown',e=>{
    const p=pointerPos(e),i=hitNode(p.x,p.y);

    if(mode==='orbit'){
      orbiting=true;lastPointer=p;canvas.setPointerCapture(e.pointerId);e.preventDefault();return;
    }
    if(mode==='joint'){
      if(i!==null) return;
      const w=screenToWorldPlane(p.x,p.y,0);
      nodes.push({x:w.x,y:w.y,z:w.z,pinned:false});
      selected=nodes.length-1;render();return;
    }
    if(mode==='bar'){
      if(i===null) return;
      selected=i;
      if(barFirst===null) barFirst=i;
      else if(barFirst===i) barFirst=null;
      else{toggleBar(barFirst,i);barFirst=null;}
      render();return;
    }
    if(i!==null){
      selected=i;
      if(!nodes[i].pinned){
        dragging=i;lastPointer=p;canvas.setPointerCapture(e.pointerId);e.preventDefault();
      }
      render();
    }else{
      selected=null;render();
    }
  });

  canvas.addEventListener('pointermove',e=>{
    const p=pointerPos(e);
    if(orbiting&&lastPointer){
      yaw+=(p.x-lastPointer.x)*0.008;
      pitch+=(p.y-lastPointer.y)*0.008;
      pitch=Math.max(-1.45,Math.min(1.45,pitch));
      lastPointer=p;render();return;
    }
    if(dragging!==null&&lastPointer){
      const dx=p.x-lastPointer.x,dy=p.y-lastPointer.y;lastPointer=p;
      moveSelectedScreen(dx,dy);
    }
  });

  function endPointer(){
    if(dragging!==null) solve(600);
    dragging=null;orbiting=false;lastPointer=null;render();
  }
  canvas.addEventListener('pointerup',endPointer);
  canvas.addEventListener('pointercancel',endPointer);

  canvas.addEventListener('wheel',e=>{
    e.preventDefault();
    zoom*=Math.exp(-e.deltaY*0.001);
    zoom=Math.max(45,Math.min(280,zoom));
    render();
  },{passive:false});

  document.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>loadPreset(b.dataset.preset)));
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));

  document.getElementById('resetBtn').addEventListener('click',()=>{if(initial)restore(initial);});
  document.getElementById('clearBtn').addEventListener('click',()=>{
    nodes=[];bars=[];selected=null;barFirst=null;initial=snapshot();render();
  });

  pinBtn.addEventListener('click',()=>{
    if(selected===null)return;
    nodes[selected].pinned=!nodes[selected].pinned;solve();render();
  });
  deleteBtn.addEventListener('click',()=>{
    if(selected===null)return;
    deleteJoint(selected);render();
  });

  applyCoords.addEventListener('click',()=>{
    if(selected===null||nodes[selected].pinned)return;
    const x=Number(xInput.value),y=Number(yInput.value),z=Number(zInput.value);
    if(!Number.isFinite(x)||!Number.isFinite(y)||!Number.isFinite(z))return;
    nodes[selected].x=x;nodes[selected].y=y;nodes[selected].z=z;solve(700);render();
  });
  zMinus.addEventListener('click',()=>{
    if(selected===null||nodes[selected].pinned)return;
    nodes[selected].z-=0.12;solve();render();
  });
  zPlus.addEventListener('click',()=>{
    if(selected===null||nodes[selected].pinned)return;
    nodes[selected].z+=0.12;solve();render();
  });

  canvas.tabIndex=0;
  canvas.addEventListener('keydown',e=>{
    if(selected===null||!nodes[selected]||nodes[selected].pinned)return;
    if(e.key==='ArrowLeft'){moveSelectedScreen(-8,0);e.preventDefault();}
    if(e.key==='ArrowRight'){moveSelectedScreen(8,0);e.preventDefault();}
    if(e.key==='ArrowUp'){moveSelectedScreen(0,-8);e.preventDefault();}
    if(e.key==='ArrowDown'){moveSelectedScreen(0,8);e.preventDefault();}
  });

  loadPreset('tetra');
})();
