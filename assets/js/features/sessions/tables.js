let selected=new Set([2,5,10]),questions=[],index=0,correct=0,supported=[],attempted=false,helped=false,solved=false,active=false,timer=null,advanceTimer=null,started=0,showClock=false,length=10,timed=0,automatic=true,completed=0,streak=0,bestStreak=0,roundTables=[2,5,10],roundOperation='multiply';
function renderTables(){ $('tables').innerHTML=Array.from({length:12},(_,i)=>`<button data-table="${i+1}" class="${selected.has(i+1)?'selected':''}" aria-pressed="${selected.has(i+1)}">${i+1}×</button>`).join('');}
function makeQuestions(tables,n,operation){const pool=[];for(const a of tables)for(let b=1;b<=12;b++){if(operation!=='divide')pool.push({a,b,type:'multiply',answer:a*b});if(operation!=='multiply')pool.push({a,b,type:'divide',answer:b});}let bag=shuffle(pool),out=[];while(out.length<n){if(!bag.length)bag=shuffle(pool);out.push(bag.pop());}return out;}
function expression(q){return q.type==='multiply'?`${q.a} × ${q.b}`:`${q.a*q.b} ÷ ${q.a}`;}
function stopTimers(){if(timer!==null)clearInterval(timer);if(advanceTimer!==null)clearTimeout(advanceTimer);timer=null;advanceTimer=null;}
function stats() {
  const elapsed=Math.floor((Date.now()-started)/1000);
  const left=Math.max(0,timed-elapsed);
  $('stats').innerHTML=`<span>★ ${correct} first try</span><span>Run: ${streak}</span><span>${timed?completed+' completed':completed+' / '+length}</span>`;
  const clock=$('round-clock');
  clock.hidden=!showClock;
  if(showClock)clock.textContent=timed?left+' seconds left':elapsed+' seconds';
  $('progress').style.width=`${timed?Math.min(100,elapsed/timed*100):completed/length*100}%`;
  if(active&&timed&&left===0)finish();
}
function display(moveFocus) {
  attempted=false; helped=false; solved=false;
  const input=$('answer');
  $('status').classList.remove('celebrate');
  input.value=''; input.disabled=false;
  $('visual').innerHTML='';
  $('question').textContent=expression(questions[index])+' = ?';
  $('check').disabled=false;
  $('next').disabled=true;
  $('next').classList.toggle('hidden',automatic);
  $('array').disabled=false;
  $('reveal').disabled=false;
  $('next').textContent=!timed&&index===length-1?'Finish session':'Next question';
  say('');
  stats();
  if(window.MWNumericKeypad)window.MWNumericKeypad.reset(input);
  if(active&&moveFocus) {
    input.focus({preventScroll:true});
    $('question').scrollIntoView({block:moveFocus==='start'?'start':'nearest'});
  }
}
function start(custom,moveFocus='start') {
  if(!selected.size)return;
  stopTimers();
  $('round-settings').open=false;
  timed=custom?0:Number($('clock').value)||0;
  showClock=!!timed||$('clock').value==='on';
  automatic=$('advance').value!=='manual';
  length=custom?custom.length:Number($('length').value);
  roundTables=[...selected];
  roundOperation=$('operation').value;
  questions=custom||makeQuestions(roundTables,timed?100:length,roundOperation);
  index=0; correct=0; completed=0; streak=0; bestStreak=0;
  supported=[]; active=true; started=Date.now();
  $('summary').innerHTML='';
  if(showClock)timer=setInterval(stats,200);
  display(moveFocus);
}
function nextQuestion(){if(!solved||!active)return;if(advanceTimer!==null)clearTimeout(advanceTimer);advanceTimer=null;if(!timed&&index===length-1){finish();return;}index++;if(index>=questions.length)questions.push(...makeQuestions(roundTables,100,roundOperation));display(document.activeElement===document.body || $('answerform').contains(document.activeElement));}
function markDone(independent){solved=true;completed++;if(independent){correct++;streak++;bestStreak=Math.max(bestStreak,streak);}else{streak=0;supported.push(questions[index]);}$('check').disabled=true;$('next').disabled=false;$('array').disabled=true;$('reveal').disabled=true;$('answer').disabled=true;stats();if(automatic&&active)advanceTimer=setTimeout(()=>{advanceTimer=null;nextQuestion();},independent?650:1800);}
function check(){if(!active||solved)return;if(timed&&Date.now()-started>=timed*1000){finish();return;}const text=$('answer').value.trim();if(!/^\d+$/.test(text)){say('Enter a whole-number answer.');return;}if(Number(text)===questions[index].answer){say('✓ Correct! '+expression(questions[index])+' = '+questions[index].answer+'.');$('status').classList.add('celebrate');markDone(!attempted&&!helped);}else{attempted=true;streak=0;say('Not yet. Try again or use the array.');if(window.MWNumericKeypad)window.MWNumericKeypad.retry($('answer'));stats();}}
function finish(){if(!active)return;active=false;stopTimers();$('question').textContent=timed?'Time — well played!':'Session complete';say(`${correct} of ${completed} completed questions answered independently first time. Best run: ${bestStreak}.`);$('check').disabled=true;$('next').disabled=true;$('array').disabled=true;$('reveal').disabled=true;$('answer').disabled=true;$('summary').innerHTML=`<div class="round-result">★ ${correct}<small>first-try independent answers</small></div>`+(supported.length?`<h2>Facts to revisit</h2><p>${supported.map(q=>`${expression(q)} = ${q.answer}`).join(' · ')}</p><button id="retry" class="primary">Practise these again — untimed</button>`:'<p>Try another round, or explain a fact with counters.</p>');if(supported.length)$('retry').onclick=()=>start([...supported]);}
$('tables').onclick=e=>{const b=e.target.closest('[data-table]');if(!b)return;const n=Number(b.dataset.table);if(selected.has(n)){if(selected.size===1){$('selection-note').textContent='Keep at least one table selected.';return;}selected.delete(n);}else selected.add(n);$('selection-note').textContent='';renderTables();$('tables').querySelector('[data-table="'+n+'"]').focus({preventScroll:true});};$('answerform').onsubmit=e=>{e.preventDefault();check();};$('start').onclick=()=>start();$('next').onclick=nextQuestion;$('array').onclick=()=>{if(!active||solved)return;helped=true;const q=questions[index];$('visual').innerHTML=`<p>${q.type==='multiply'?`${q.a} rows of ${q.b} counters. Count in groups.`:`${q.a*q.b} counters, arranged in rows of ${q.a}. How many rows?`}</p><div class="array" style="grid-template-columns:repeat(${q.type==='multiply'?q.b:q.a},15px)">${Array.from({length:q.a*q.b},(_,i)=>`<i aria-hidden="true" data-group="${Math.floor(i/(q.type==='multiply'?q.b:q.a))%2}"></i>`).join('')}</div>`;};$('reveal').onclick=()=>{if(!active||solved)return;helped=true;const q=questions[index];$('answer').value=q.answer;say(`${expression(q)} = ${q.answer}. This fact will be available to practise again.`);markDone(false);};renderTables();start(undefined,false);
