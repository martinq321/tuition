(function(){'use strict';
const script=document.currentScript,base=new URL('../',script.src);
const bar=document.querySelector('.mw-theme-bar');
if(bar){const a=document.createElement('a');a.className='mw-journey-nav';a.href=new URL('development/explore/journey.html',base);a.textContent='My journey';bar.append(a)}
const search=document.querySelector('#activity-search');
if(search){const cards=[...document.querySelectorAll('a.card')],count=document.querySelector('#filter-count');
function filter(){const q=search.value.trim().toLowerCase();let n=0;cards.forEach(c=>{c.hidden=!c.textContent.toLowerCase().includes(q);if(!c.hidden)n++});document.querySelectorAll('main>section').forEach(s=>{const own=[...s.querySelectorAll('a.card')];if(own.length)s.hidden=own.every(c=>c.hidden)});count.textContent=q?(n?n+' activities found':'No matches. Try a different word.') :cards.length+' activities to explore';}
search.addEventListener('input',filter);filter();
document.querySelector('#show-descriptions').addEventListener('click',function(){const on=document.body.classList.toggle('show-descriptions');this.setAttribute('aria-pressed',String(on));this.textContent=on?'Hide descriptions':'Show descriptions'});
}
})();
