'use strict';
const root='../../', NS='http://www.w3.org/2000/svg';
const palette={blue:['#435be8','#a8b8ff','#26339a'],purple:['#9253dd','#d2b3fa','#542891'],gold:['#e7a523','#ffe194','#98630c'],teal:['#159e99','#88ded2','#10605e']};
const rect=(x,y,w,h,c,r=6)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}"/>`,circ=(x,y,r,c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`,path=(d,c,stroke='',width=3)=>`<path d="${d}" fill="${c}" ${stroke?`stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"`:''}/>`;
function icon(kind,tone='blue'){
 const [a,b,c]=palette[tone];let s='';
 if(kind==='pegs') {s=rect(32,24,96,116,b,13);for(let y=45;y<125;y+=30)for(let x=52;x<120;x+=27)s+=circ(x,y,9,[a,'#f4bd38',c][Math.round((x-52)/27+(y-45)/30)%3]);}
 if(kind==='hanoi'){s=rect(20,125,120,12,c);[45,80,115].forEach(x=>s+=rect(x-3,35,6,90,b,3));[0,1,2,3].forEach(i=>s+=rect(25+i*5,109-i*18,40-i*10,14,[a,b,a,c][i],7));s+=rect(94,109,42,14,a,7);}
 if(kind==='cards'){s=`<g transform="rotate(-12 70 80)">${rect(25,30,73,100,c,12)}${circ(60,62,14,'#fff')}${path('M48 94L66 76L84 94L66 112Z',b)}</g><g class="wiggle">${rect(68,42,67,95,a,12)}${circ(100,70,13,'#ffdf64')}${path('M89 102L101 88L113 102L101 116Z','#fff')}</g>`;}
 if(kind==='boat'){s=path('M22 122Q40 112 58 122T94 122T138 122','none',b,6)+`<g class="wiggle">`+path('M26 91H137L119 115H44Z',a)+path('M70 88V40L100 84Z',b)+rect(39,58,38,27,'#fff1c6',10)+path('M44 61L39 43L51 52M67 59L76 44L76 66','none',c,5)+circ(64,66,3,c)+path('M47 80V93M65 80V93','none',c,5)+'</g>';}
 if(kind==='cube'){s=`<g class="wiggle">`+path('M32 54L80 27L130 54L80 82Z',b)+path('M32 54L80 82V137L32 108Z',a)+path('M80 82L130 54V108L80 137Z',c);for(let i=1;i<3;i++)s+=path(`M${32+16*i} ${54+9.3*i}V${108+9.3*i}M${80+16.7*i} ${82-9.3*i}V${137-9.7*i}M32 ${54+18*i}L80 ${82+18*i}L130 ${54+18*i}`,'none','#fff9',2);s+='</g>';}
 if(kind==='ramp'){s=path('M22 37V127H139Z',b)+path('M22 37Q40 119 139 127','none',a,7)+path('M22 37L139 127','none',c,3)+`<g class="roll">${circ(28,42,12,'#f3bd39')}${circ(24,38,4,'#fff4bf')}</g>`;}
 if(kind==='tower'){s=`<g class="wiggle">`;for(let i=0;i<11;i++){let x=30+i*10; s+=path(`M${x} 34L${160-x} 126`,'none',i%2?a:b,2.5)}s+=`<ellipse cx="80" cy="34" rx="50" ry="12" fill="none" stroke="${c}" stroke-width="5"/><ellipse cx="80" cy="126" rx="50" ry="12" fill="none" stroke="${c}" stroke-width="5"/>`+'</g>';}
 if(kind==='squares'){s=rect(25,30,110,100,c,4)+rect(29,34,70,70,a,2)+rect(103,34,28,28,b,2)+rect(103,66,28,38,'#f9c746',2);for(let x=29;x<130;x+=20)s+=rect(x,108,16,18,b,2);}
 if(kind==='grid'){s=rect(26,26,108,108,c,10);for(let y=0;y<4;y++)for(let x=0;x<4;x++)s+=rect(33+x*24,33+y*24,20,20,x===y?'#ffdc66':(x+y)%2?b:a,3);}
 if(kind==='tree'){s=path('M80 37L45 80L25 124M45 80L65 124M80 37L117 80L135 124','none',c,6)+circ(80,35,18,a)+circ(45,80,16,b)+circ(117,80,16,b)+circ(25,124,13,a)+circ(65,124,13,a)+circ(135,124,13,a);}
 if(kind==='blocks'){s=rect(22,57,70,70,a,5)+rect(100,57,17,70,b,3)+rect(124,110,16,17,'#f7c746',3);for(let i=1;i<5;i++)s+=path(`M${22+14*i} 57V127M22 ${57+14*i}H92`,'none','#fff8',1.5);s+=path('M34 39H104M46 29V49M93 29V49','none',c,5);}
 if(kind==='factor'){s=rect(23,42,114,78,c,5);for(let y=0;y<3;y++)for(let x=0;x<5;x++)s+=rect(28+x*22,47+y*23,18,19,(x+y)%2?a:b,3);}
 if(kind==='robot'){s=`<g class="wiggle">`+rect(44,30,72,55,a,15)+rect(53,89,54,42,b,12)+rect(30,91,17,35,c,8)+rect(113,91,17,35,c,8)+rect(48,130,26,12,c,5)+rect(88,130,26,12,c,5)+rect(55,45,50,24,'#fff',9)+circ(66,57,5,c)+circ(94,57,5,c)+path('M80 30V17','none',c,5)+circ(80,15,6,'#ffc83d')+'</g>';}
 if(kind==='code'){s=rect(22,28,116,92,c,12)+rect(31,38,98,70,b,5)+path('M63 55L45 72L63 88M98 55L116 72L98 88','none',a,7)+path('M87 52L74 92','none','#fff',5)+rect(65,120,30,12,a,3)+rect(46,132,68,7,c,3);}
 if(kind==='pixel'){for(let y=0;y<6;y++)for(let x=0;x<6;x++){let z=['001100','011110','111111','101101','111111','010010'][y][x];if(z==='1')s+=rect(25+x*19,25+y*19,18,18,y<2?b:y<4?a:c,1)}s+=rect(3,71,17,17,'#fac43c',2)+rect(140,52,14,14,'#fac43c',2);}
 if(kind==='cipher'){s=rect(25,38,110,88,b,10)+path('M27 42L80 83L133 42','none',c,5)+rect(65,75,32,37,a,6)+path('M71 76V68A10 10 0 0 1 20 0V76','none',c,5)+circ(81,88,4,'#fff')+rect(79,90,4,10,'#fff',2);}
 return `<svg viewBox="0 0 160 160" aria-hidden="true" focusable="false">${s}</svg>`;
}
const groups=[
 {id:'logic',title:'Think it through',tone:'gold',symbol:'pegs',items:[['mastermind','Mastermind','mastermind/Mastermind_Maths_Wednesdays.html','pegs'],['river','Goat & boat','river-crossing/index.html','boat'],['hanoi','Tower of Hanoi','hanoi/index.html','hanoi'],['dobble','Dobble','dobble/index.html','cards']]},
 {id:'shape',title:'Shapes that surprise',tone:'blue',symbol:'cube',items:[['cube','Painted cubes','puzzles/sessions/painted-cube.html','cube'],['ramps','Ramp race','puzzles/sessions/curve-lab.html','ramp'],['tower','String tower','puzzles/string-lab/tower.html','tower'],['euclid','Square it up','puzzles/sessions/squares-to-euclid.html','squares']]},
 {id:'number',title:'Spot a pattern',tone:'purple',symbol:'grid',items:[['patterns','Number patterns','development/number-patterns/index.html','grid'],['factors','Factor shapes','puzzles/sessions/factor-shapes.html','factor'],['tree','Factor trees','puzzles/sessions/factor-tree.html','tree'],['year5','Number workshop','development/year5/index.html','blocks']]},
 {id:'create',title:'Make something yours',tone:'teal',symbol:'robot',items:[['coding','Code grid','puzzles/sessions/code-grid.html','code'],['robot','Build a robot','games/robot.html','robot'],['pixel','Pixel art','games/pixel.html','pixel'],['secret','Secret messages','games/cipher.html','cipher']]}
];
const items=groups.flatMap(g=>g.items),valid=new Set(items.map(i=>i[0]));
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
let saved=read('mw-explore-saved',[]),recent=read('mw-explore-recent',[]);saved=Array.isArray(saved)?saved.filter(x=>valid.has(x)):[];recent=Array.isArray(recent)?recent.filter(x=>valid.has(x)):[];
let tab='all',topic='all',query='';const $=s=>document.querySelector(s);
function persist(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{$('#announcement').textContent='This browser could not save your choices.'}}
function render(){let count=0;$('#savedCount').textContent=saved.length;
 $('#library').innerHTML=groups.map(g=>{let found=g.items.filter(i=>(topic==='all'||topic===g.id)&&(tab==='all'||(tab==='saved'?saved:recent).includes(i[0]))&&(i[1]+' '+g.title).toLowerCase().includes(query));if(tab==='recent')found.sort((a,b)=>recent.indexOf(a[0])-recent.indexOf(b[0]));if(!found.length)return '';count+=found.length;return `<section class="topic" style="--topic:${palette[g.tone][0]}" aria-labelledby="heading-${g.id}"><div class="topic-head">${icon(g.symbol,g.tone)}<div><h2 id="heading-${g.id}">${g.title}</h2><small>${found.length} ${found.length===1?'activity':'activities'}</small></div></div><div class="shelf">${found.map(i=>`<article class="tile"><a href="${root+i[2]}" data-activity="${i[0]}"><div class="picture">${icon(i[3],g.tone)}</div><span class="tile-name">${i[1]}</span></a><button class="save" data-save="${i[0]}" aria-label="Save ${i[1]}" aria-pressed="${saved.includes(i[0])}" title="Save ${i[1]}">${saved.includes(i[0])?'★':'☆'}</button></article>`).join('')}</div></section>`}).join('');$('#empty').hidden=count>0;
}
$('.filters').innerHTML=[['all','All topics'],...groups.map(g=>[g.id,g.title])].map(([id,t])=>`<button data-topic="${id}" aria-pressed="${id==='all'}">${t}</button>`).join('');
document.addEventListener('click',e=>{let b=e.target.closest('[data-save]');if(b){let id=b.dataset.save,active=!saved.includes(id);saved=active?[...saved,id]:saved.filter(x=>x!==id);persist('mw-explore-saved',saved);let title=items.find(i=>i[0]===id)[1];$('#announcement').textContent=title+(active?' saved.':' removed from saved.');if(tab==='saved'){render();$('#library [data-save]')?.focus()}else{b.setAttribute('aria-pressed',active);b.textContent=active?'★':'☆';$('#savedCount').textContent=saved.length}return}
 let a=e.target.closest('[data-activity]');if(a){recent=[a.dataset.activity,...recent.filter(x=>x!==a.dataset.activity)].slice(0,30);persist('mw-explore-recent',recent)}
 b=e.target.closest('[data-tab]');if(b){tab=b.dataset.tab;document.querySelectorAll('[data-tab]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});render()}
 b=e.target.closest('[data-topic]');if(b){topic=b.dataset.topic;document.querySelectorAll('[data-topic]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()}
});
$('#search').addEventListener('input',e=>{query=e.target.value.toLowerCase().trim();render()});
let motion=read('mw-explore-motion',!matchMedia('(prefers-reduced-motion: reduce)').matches);$('#motion').checked=!!motion;document.body.dataset.motion=motion?'on':'off';$('#motion').addEventListener('change',e=>{document.body.dataset.motion=e.target.checked?'on':'off';persist('mw-explore-motion',e.target.checked)});render();
