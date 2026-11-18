/* One site preference and one controller. Load at the end of <head>. */
(function(){
'use strict';
if(window.MWTheme)return;
var base=new URL('./',document.currentScript.src),key='maths-wednesdays-theme-v1';
var choices=[['graph','Graph paper'],['ghost','Ghosted backdrop'],['dark','Dark'],['orbit','Orbit Lab'],['focus','Focus (test)']];
function normalise(value){if(value==='quiet'||value==='sketch')return 'ghost';if(value==='field'||value==='press')return 'graph';return choices.some(function(c){return c[0]===value})?value:'dark';}
function apply(value,save){value=normalise(value);document.documentElement.dataset.theme=value;
 document.querySelectorAll('[data-mw-theme-picker],#theme-choice').forEach(function(p){p.value=value});
 var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=value==='dark'?'#12191b':value==='orbit'?'#121a30':'#ffffff';
 if(save)try{localStorage.setItem(key,value)}catch(e){}
 document.dispatchEvent(new CustomEvent('mw:themechange',{detail:{theme:value}}));
}
function read(){try{return localStorage.getItem(key)||localStorage.getItem('mw.theme.v2')||localStorage.getItem('maths-wednesdays.curve-lab.theme')}catch(e){return null}}
window.MWTheme={set:function(v){apply(v,true)},get:function(){return document.documentElement.dataset.theme},choices:choices};
apply(new URLSearchParams(location.search).get('theme')||read(),false);
function mount(){
 var existing=document.querySelector('#theme-choice');
 // Remove obsolete controls; these are appearance UI, never activity controls.
 document.querySelectorAll('#mw-sitebar,.mw-theme-bar').forEach(function(b){b.remove()});
 var picker=existing;
 if(!picker){var bar=document.createElement('div');bar.className='mw-theme-bar';bar.setAttribute('role','region');bar.setAttribute('aria-label','Site appearance');
 var home=document.createElement('a');var student=location.pathname.indexOf('/students/')!==-1;home.href=new URL(student?'../students/index.html':'../development/index.html',base).href;home.textContent='Maths Wednesdays';
 var label=document.createElement('label');label.textContent='Theme ';picker=document.createElement('select');picker.setAttribute('aria-label','Colour theme');label.append(picker);bar.append(home,label);document.body.prepend(bar);}
 picker.setAttribute('data-mw-theme-picker','');picker.replaceChildren();choices.forEach(function(c){var o=document.createElement('option');o.value=c[0];o.textContent=c[1];picker.append(o)});
 picker.addEventListener('change',function(){apply(picker.value,true)});apply(document.documentElement.dataset.theme,false);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
window.addEventListener('storage',function(e){if(e.key===key||e.key===null)apply(read(),false)});
window.addEventListener('pageshow',function(e){if(e.persisted)apply(new URLSearchParams(location.search).get('theme')||read(),false)});
})();
