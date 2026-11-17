/* One preference shared by the hub and all standalone activities. */
(function(){
'use strict';
const base=new URL('./',document.currentScript.src),key='maths-wednesdays-theme-v1';
function mount(){
 if(document.querySelector('.mw-theme-bar'))return;
 const bar=document.createElement('div');bar.className='mw-theme-bar';bar.setAttribute('role','region');bar.setAttribute('aria-label','Site appearance');
 const home=document.createElement('a');home.href=new URL('../development/index.html',base);home.textContent='Maths Wednesdays · Activities';
 const label=document.createElement('label');label.textContent='Theme ';const select=document.createElement('select');select.setAttribute('aria-label','Colour theme');
 [['graph','Graph paper'],['ghost','Ghosted backdrop'],['dark','Original colours']].forEach(([value,text])=>{const option=document.createElement('option');option.value=value;option.textContent=text;select.append(option)});
 select.value=document.documentElement.dataset.theme||'graph';label.append(select);bar.append(home,label);document.body.prepend(bar);
 select.addEventListener('change',()=>{document.documentElement.dataset.theme=select.value;try{localStorage.setItem(key,select.value)}catch(e){}});
 window.addEventListener('storage',e=>{if(e.key===key){let value=e.newValue;if(value==='quiet'||value==='sketch')value='ghost';if(!['graph','ghost','dark'].includes(value))value='graph';document.documentElement.dataset.theme=value;select.value=value}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
