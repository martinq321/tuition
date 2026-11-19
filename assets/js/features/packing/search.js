/* Integer-grid exhaustive search. Same state transitions as PackingLab.wl. */
function createSearch(W,H,rows,mode,rotation,limit){
 if(!Number.isInteger(W)||!Number.isInteger(H)||W<1||H<1||W>30||H>30)throw Error('Sides must be whole numbers from 1 to 30.');
 if(!Number.isInteger(limit)||limit<1||limit>1e9)throw Error('Invalid search budget.');
 if(mode==='Squares') rows=Array.from({length:Math.min(W,H)},(_,i)=>{let s=Math.min(W,H)-i;return[s,s,W*H]});
 if(!Array.isArray(rows)||!rows.length||rows.length>(mode==='Squares'?30:20)||rows.some(r=>r.length!==3||r.some(v=>!Number.isInteger(v))||r[0]<1||r[1]<1||r[0]>30||r[1]>30||r[2]<0||r[2]>900))throw Error('Use up to 20 rows: width height quantity; sizes 1–30, quantities 0–900.');
 const square=mode==='Squares', n=W*H, remain=rows.map(r=>r[2]), candidates=[];
 rows.forEach((r,i)=>{candidates.push([r[0],r[1],i]);if(rotation&&!square&&r[0]!==r[1])candidates.push([r[1],r[0],i])});
 const maxArea=Math.max(...candidates.map(r=>r[0]*r[1])),minArea=Math.min(...candidates.map(r=>r[0]*r[1]));
 const board=new Uint8Array(n),choice=new Int32Array(n+2).fill(-1),rec=Array.from({length:n+2},()=>[0,0,0,0,-1]);
 let depth=0,count=0,free=n,best=square?n:0,nodes=0,bestRows=square?Array.from({length:n},(_,i)=>[i%W,Math.floor(i/W),1,1,rows.length-1]):[],start=Date.now();
 function step(amount=10000){let end=Math.min(nodes+amount,limit);
 while(depth>=0&&nodes<end){nodes++;let pop=false;
 if(choice[depth]===-1){
 if((square&&free===0&&count<best)||(!square&&count>best)){best=count;bestRows=rec.slice(0,depth).filter(r=>r[4]>=0).map(r=>r.slice())}
 let bound=square?count+Math.ceil(free/maxArea):count+Math.min(remain.reduce((a,b)=>a+b,0),Math.floor(free/minArea));
 if(free===0||(square?bound>=best:bound<=best))pop=true;
 else {let a=board.indexOf(0);rec[depth][0]=a%W;rec[depth][1]=Math.floor(a/W);choice[depth]=0}
 }
 if(!pop){let q=choice[depth]++;
 if(q>=candidates.length+(square?0:1))pop=true;
 else{let [x,y]=rec[depth],[w,h,t]=q>=candidates.length?[1,1,-1]:candidates[q];
 let fits=x+w<=W&&y+h<=H&&(t<0||remain[t]>0);
 if(fits)for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)if(board[j*W+i])fits=false;
 if(fits){rec[depth]=[x,y,w,h,t];for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)board[j*W+i]=1;
 free-=w*h;if(t>=0){remain[t]--;count++}depth++;choice[depth]=-1}
 }}
 if(pop){depth--;if(depth>=0){let[x,y,w,h,t]=rec[depth];for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)board[j*W+i]=0;free+=w*h;if(t>=0){remain[t]++;count--}}}
 }
 return depth<0||nodes>=limit;
 }
 function result(){let done=depth<0;return {Mode:mode,Model:'Integer grid; zero kerf; unrestricted axis-aligned packing',Sheet:[W,H],Status:done?'OPTIMAL':'BEST_FOUND',PrimaryOptimal:done,ExactSearchCompleted:done,PieceCount:best,Nodes:nodes,StopReason:done?'completed':nodes>=limit?'node_limit':'paused',ElapsedSeconds:(Date.now()-start)/1000,Placements:bestRows.map(([X,Y,Width,Height,t])=>({X,Y,Width,Height,Type:t+1,Name:'Part'+(t+1)}))}}
 return {step,result};
}
if(typeof module!=='undefined') module.exports={createSearch};


function validate(r){if(!r||!Array.isArray(r.Sheet)||r.Sheet.length!==2||r.Sheet.some(v=>!Number.isFinite(v)||v<=0||v>1e6)||!Array.isArray(r.Placements)||r.Placements.length>10000)throw Error('Not a supported packing result.');for(let p of r.Placements){if(!['X','Y','Width','Height'].every(k=>Number.isFinite(p[k]))||p.X<0||p.Y<0||p.Width<=0||p.Height<=0||p.X+p.Width>r.Sheet[0]||p.Y+p.Height>r.Sheet[1])throw Error('A piece is outside the sheet.')}for(let i=0;i<r.Placements.length;i++)for(let j=0;j<i;j++){let a=r.Placements[i],b=r.Placements[j];if(a.X<b.X+b.Width&&b.X<a.X+a.Width&&a.Y<b.Y+b.Height&&b.Y<a.Y+a.Height)throw Error('The result contains overlapping pieces.')}if(r.Cuts&&(!Array.isArray(r.Cuts)||r.Cuts.some(c=>!Array.isArray(c.Region)||c.Region.length!==4||!c.Region.every(Number.isFinite)||!Number.isFinite(c.Offset)||!['V','H'].includes(c.Axis))))throw Error('Invalid cut data.');r.PieceCount=r.Placements.length;return r}
