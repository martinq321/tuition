/* Compatibility behaviour for older menus; new visual libraries own their search UI. */
(function(){'use strict';
const search=document.querySelector('#activity-search'),toggle=document.querySelector('#show-descriptions');
if(search&&toggle){const cards=[...document.querySelectorAll('a.card')],count=document.querySelector('#filter-count');
function filter(){const q=search.value.trim().toLowerCase();let n=0;cards.forEach(c=>{c.hidden=!c.textContent.toLowerCase().includes(q);if(!c.hidden)n++});document.querySelectorAll('main>section').forEach(s=>{const own=[...s.querySelectorAll('a.card')];if(own.length)s.hidden=own.every(c=>c.hidden)});if(count)count.textContent=q?(n?n+(n===1?' activity found':' activities found'):'No matches. Try a different word.') :cards.length+' activities to explore';}
search.addEventListener('input',filter);filter();
toggle.addEventListener('click',function(){const on=document.body.classList.toggle('show-descriptions');this.setAttribute('aria-pressed',String(on));this.textContent=on?'Hide descriptions':'Show descriptions'});
}
})();
