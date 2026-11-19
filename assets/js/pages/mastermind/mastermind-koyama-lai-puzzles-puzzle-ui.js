(()=>{'use strict';
const $=id=>document.getElementById(id),names=['Brown','Black','Blue','Green','Red','Yellow'],short=['Br','Bl','Bu','G','R','Y'],colors=['#87512d','#24313b','#246ac8','#248456','#cc4245','#edc345'];
let hintLevel=0;
let m=6,n=4,puzzle=null,guess=[],active=0,revealed=false,worker=null,localService=null,job=0,busy=false;
const peg=(c)=>`<span class="peg ${c===null?'empty':c===5?'yellow':''}" ${c===null?'':`style="--c:${colors[c]}"`} role="img" aria-label="${c===null?'Empty':names[c]}">${c===null?'?':''}</span>`;
const pegs=a=>'<div class="pegs">'+a.map(peg).join('')+'</div>';
function feedback(b,w){return `<div class="feedback" role="img" aria-label="${b} black, ${w} white">`+'<i class="fb black" aria-hidden="true"></i>'.repeat(b)+'<i class="fb" aria-hidden="true"></i>'.repeat(w)+(b+w===0?'<span class="zero">0 black · 0 white</span>':'')+'</div>'}
function score(a,b){let black=0,total=0,ac=Array(m).fill(0),bc=Array(m).fill(0);for(let i=0;i<n;i++){black+=a[i]===b[i]?1:0;ac[a[i]]++;bc[b[i]]++}for(let c=0;c<m;c++)total+=Math.min(ac[c],bc[c]);return [black,total-black]}
function setBusy(v){busy=v;for(const id of ['colours','holes','length','generate'])$(id).disabled=v;$('cancel').hidden=!v}
function links(){for(const [id,file] of [['gameLink','Mastermind_Maths_Wednesdays.html'],['treeLink','Mastermind_Strategy_Tree.html']])$(id).href=`${file}?colours=${m}&holes=${n}`;$('swatches').innerHTML=names.slice(0,m).map((s,c)=>`<span>${peg(c)}</span>`).join('')}
function clearPuzzle(){hintLevel=0;$('reasoning').hidden=true;$('reasoning').innerHTML='';puzzle=null;revealed=false;guess=[];$('answer').hidden=true;$('solution').hidden=true;$('solution').innerHTML='';$('answerMessage').textContent='';$('puzzleMeta').textContent='YOUR CLUE BOARD';$('clues').innerHTML='<div class="placeholder">Your clues will appear here.<br>The answer stays hidden.</div>'}
function settings(){job++;if(worker){worker.terminate();worker=null}localService=null;setBusy(false);m=+$('colours').value;n=+$('holes').value;clearPuzzle();links();$('status').textContent='Settings changed. Generate a new puzzle.';const v=VERIFIED[m+','+n];$('length').min=m===6&&n===4?3:1;$('length').max=v?v.worst:m**n;if(+$('length').value<+$('length').min)$('length').value=$('length').min;if(+$('length').value>+$('length').max)$('length').value=$('length').max}
function renderAnswer(){if(!puzzle)return;$('slots').innerHTML=guess.map((c,i)=>`<button class="slot ${i===active?'active':''}" data-slot="${i}" aria-pressed="${i===active}" aria-label="Hole ${i+1}: ${c===null?'empty':names[c]}">${peg(c)}</button>`).join('');$('palette').innerHTML=names.slice(0,m).map((s,c)=>`<button class="paint" data-colour="${c}" aria-label="Choose ${s}">${peg(c)}</button>`).join('');$('reveal').textContent=revealed?'Hide solution':'Show solution';$('reveal').setAttribute('aria-expanded',String(revealed));$('solution').hidden=!revealed;$('solution').innerHTML=revealed?`<p class="small">The solution:</p>${pegs(puzzle.secret)}${feedback(n,0)}`:''}
function show(p){hintLevel=0;$('reasoning').hidden=true;puzzle=p;guess=Array(n).fill(null);active=0;revealed=false;$('answerMessage').textContent='';$('puzzleMeta').textContent=`${m} COLOURS · ${n} HOLES · ${p.k}-GUESS GAME`;$('clues').innerHTML=p.rows.length?p.rows.map((r,i)=>`<div class="clue"><span class="number">${i+1}</span><div>${pegs(r.guess)}${feedback(r.b,r.w)}</div></div>`).join(''):'<p class="note">No preceding guesses: this game was solved on its first move. There are no clues to deduce a code from.</p>';$('answer').hidden=false;renderAnswer();$('status').textContent='Exactly one code fits all the clues.'+(p.methods.includes('sampled')?' This game used sampled suggestions on larger states.':'')}
function finish(result,stamp){if(stamp!==job)return;setBusy(false);if(result.found)show(result.puzzle);else $('status').textContent=result.message}
function fail(error,stamp){if(stamp!==job)return;setBusy(false);if(worker){worker.terminate();worker=null}$('status').textContent=error.message||String(error)}
function generate(){const k=+$('length').value;if(!Number.isInteger(k)||k<1||k>m**n){$('status').textContent='Enter a positive whole number no greater than the number of possible codes.';return}const stamp=++job;clearPuzzle();setBusy(true);$('status').textContent='Finding a matching game… You can cancel at any time.';const options={m,n,k};
 try{
  if(typeof Worker!=='undefined'){
   if(!worker){const source=`${createEngine.toString()}\n${createPuzzleService.toString()}\nconst service=createPuzzleService(createEngine,${JSON.stringify(OPTIMAL_POLICIES)},${JSON.stringify(VERIFIED)});onmessage=({data})=>{try{const result=service.generate(data.options,p=>postMessage({stamp:data.stamp,progress:p}));postMessage({stamp:data.stamp,result})}catch(e){postMessage({stamp:data.stamp,error:e.message})}};`;const url=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));try{worker=new Worker(url)}finally{URL.revokeObjectURL(url)}}
   worker.onmessage=({data})=>{if(data.stamp!==job)return;if(data.progress){$('status').textContent=`Searching games… ${data.progress.searched} checked. You can cancel.`}else if(data.error)fail(Error(data.error),data.stamp);else finish(data.result,data.stamp)};worker.onerror=e=>fail(Error(e.message||'The background search could not start. Try opening the downloaded page in Chrome or Edge.'),stamp);worker.postMessage({options,stamp});
  }else if(m**n<=1296){setTimeout(()=>{if(stamp!==job)return;try{if(!localService)localService=createPuzzleService(createEngine,OPTIMAL_POLICIES,VERIFIED);finish(localService.generate({...options,attempts:40,timeLimit:4000}),stamp)}catch(e){fail(e,stamp)}},30)}else throw Error('This board needs background workers. Open the downloaded page in Chrome or Edge.');
 }catch(e){fail(e,stamp)}
}
$('generate').onclick=generate;
$('cancel').onclick=()=>{job++;if(worker){worker.terminate();worker=null}setBusy(false);$('status').textContent='Search cancelled. Change the settings or try again.'};
for(const id of ['colours','holes'])$(id).onchange=settings;
for(const id of ['length'])$(id).onchange=()=>{clearPuzzle();$('status').textContent='Options changed. Generate a new puzzle.'};
$('slots').onclick=e=>{const b=e.target.closest('[data-slot]');if(b){active=+b.dataset.slot;renderAnswer()}};
function paint(c){if(!puzzle)return;guess[active]=c;const next=guess.findIndex((x,i)=>i>active&&x===null);if(next>=0)active=next;else{const empty=guess.indexOf(null);if(empty>=0)active=empty}$('answerMessage').textContent='';renderAnswer()}
$('palette').onclick=e=>{const b=e.target.closest('[data-colour]');if(b)paint(+b.dataset.colour)};
$('check').onclick=()=>{if(!puzzle)return;if(guess.includes(null)){$('answerMessage').textContent='Fill every hole first.';return}const bad=puzzle.rows.findIndex(r=>{const [b,w]=score(r.guess,guess);return b!==r.b||w!==r.w});if(bad<0){$('answerMessage').textContent='You found it! Your code fits every clue.'}else{const r=puzzle.rows[bad],[b,w]=score(r.guess,guess);$('answerMessage').innerHTML=`<strong>Compare with clue ${bad+1}.</strong><br>Your answer would produce ${b} black and ${w} white:${feedback(b,w)}<br>The displayed clue requires ${r.b} black and ${r.w} white:${feedback(r.b,r.w)}<br>Try changing your answer so both counts match.`}};

$('puzzleHint').onclick=()=>{if(!puzzle)return;const box=$('reasoning');box.hidden=false;hintLevel++;
 if(!puzzle.rows.length){box.textContent='There is only one available colour. Fill every hole with it.';return}
 const e=createEngine(m,n,{});let ids=e.all();for(const r of puzzle.rows.slice(0,-1))ids=e.filter(ids,e.index(r.guess),r.b*e.base+r.w);
 const last=puzzle.rows[puzzle.rows.length-1];
 if(hintLevel===1){box.textContent=`Before the last clue, ${ids.length} codes fit the earlier rows. The last clue leaves exactly one. Compare each candidate with that last guess: count exact matches first, then misplaced colours without counting any peg twice. Tap “A hint” again for a checklist.`;return}
 if(ids.length>100){box.textContent=`There are ${ids.length} candidates before the last clue—too many for a short checklist. Use the last clue as well to restrict the colours and positions. “Show solution” reveals the unique answer.`;return}
 box.innerHTML='<strong>Possible codes before the last clue</strong><p>These fit every earlier row. Tick a code after checking it against the last clue; a tick does not mark it correct.</p>'+ids.map(id=>`<label class="check" style="margin:12px 0"><input type="checkbox" aria-label="Candidate checked">${pegs(e.codes[id])}</label>`).join('');
};
$('clear').onclick=()=>{if(!puzzle)return;guess=Array(n).fill(null);active=0;$('answerMessage').textContent='';renderAnswer()};
$('reveal').onclick=()=>{if(!puzzle)return;revealed=!revealed;renderAnswer()};

$('slots').onkeydown=e=>{if(!puzzle)return;if(/^[1-6]$/.test(e.key)&&+e.key<=m){e.preventDefault();paint(+e.key-1)}else if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();active=(active+(e.key==='ArrowRight'?1:n-1))%n;renderAnswer();document.querySelector(`[data-slot="${active}"]`)?.focus()}else if(e.key==='Enter'){e.preventDefault();$('check').onclick()}};
for(const id of ['colours','holes'])$(id).innerHTML=Array.from({length:6},(_,i)=>`<option value="${i+1}">${i+1}</option>`).join('');
const q=new URLSearchParams(location.search);for(const [id,fallback] of [['colours',6],['holes',4]]){const v=Number(q.get(id));$(id).value=Number.isInteger(v)&&v>=1&&v<=6?v:fallback}settings();generate();
})();
