/* Shared appearance. Focus is the one live design; previous theme preferences stay untouched. */
(function(){
'use strict';
if(window.MWTheme)return;
var base=new URL('./',document.currentScript.src);
// Share answer-entry behaviour across the full and student sites, including offline copies.
var keypad=document.createElement('script');
keypad.src=new URL('../assets/js/numeric-keypad.js',base).href;
document.head.append(keypad);
// Category identity is shared by the full and student copies of each activity.
var path=location.pathname.toLowerCase(), topic='';
if(/\/(string-lab|engineering)\//.test(path)||/\/(painted-cube|curve-lab|circle-investigations|squares-to-euclid|fewest-squares(?:-extension)?|36-fences|polyominoes|packing-lab|cut-and-rearrange|rupert-cube|paper|spiral-gallery)\.html$/.test(path))topic='shape';
else if(/\/(mastermind|hanoi|dobble|josephus|river-crossing|sprouts)\//.test(path)||/\/(fifteen[^/]*|set|nim|memory|sorting|poker|pursuit|cube)\.html$/.test(path))topic='logic';
else if(/\/(number-patterns|year[4-9]|gcse|a-level)\//.test(path)||/\/(30-cubes(?:-challenges)?|factor-shapes|factor-tree|(?:magic-)?money-plant[^/]*|tables|multiply|divisors|neighbours|grid)\.html$/.test(path))topic='number';
else if(/\/(creature-(?:lab|session)|code-grid|codebot|robot-trails|robot|pixel|cipher|scytale|enigma|turing|shark-family|dragon-world|dinosaur-world)\.html$/.test(path)||/\/workshop\//.test(path))topic='create';
else if(/\/(bee|wordle)\.html$/.test(path))topic='words';
// Curriculum models inherit the mathematical topic, not an arbitrary school-year colour.
if(/\/units\/(shape|position-direction|perimeter-area|volume|perimeter-and-area)\.html$/.test(path))topic='shape';
if(/\/year[1-3]\//.test(path))topic=topic||'number';
if(topic)document.documentElement.dataset.mwTopic=topic;
// Stable page identity permits narrowly scoped compatibility rules without recolouring other games.
var stem=path.split('/').pop().replace(/\.html$/,'');
if(stem&&stem!=='index')document.documentElement.dataset.mwActivity=stem;
var choices=[['graph','Graph paper'],['ghost','Ghosted backdrop'],['dark','Dark'],['orbit','Orbit Lab'],['focus','Focus']];
function apply(){
 document.documentElement.dataset.theme='focus';
 document.querySelectorAll('[data-mw-theme-picker],#theme-choice').forEach(function(p){p.value='focus'});
 var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content='#f5f5f2';
 document.dispatchEvent(new CustomEvent('mw:themechange',{detail:{theme:'focus'}}));
}
window.MWTheme={set:apply,get:function(){return 'focus'},choices:choices};
apply();
// Load the single palette directly too, so legacy pages cannot bypass it.
var palette=document.createElement('link');palette.rel='stylesheet';palette.addEventListener('load',apply);palette.href=new URL('main.css?v=palette2',base);document.head.append(palette);
// Loaded immediately so the same presentation applies to old and new activity pages.
var css=document.createElement('link');css.rel='stylesheet';css.href=new URL('themes/clean-ui.css?v=3',base);document.head.append(css);
function mount(){
 document.querySelectorAll('#mw-sitebar,.mw-theme-bar').forEach(function(b){b.remove()});
 document.querySelectorAll('#theme-choice,[data-mw-theme-picker]').forEach(function(p){
  var wrapper=p.closest('label');
  if(wrapper)wrapper.hidden=true;else p.hidden=true;
  var details=p.closest('details');
  // Keep settings containing unrelated controls (for example the library's motion switch).
  if(details&&!Array.from(details.querySelectorAll('input,button,select')).some(function(c){return c!==p&&!c.hidden&&!c.closest('[hidden]')}))details.hidden=true;
 });
 document.querySelectorAll('.theme-picker').forEach(function(p){p.hidden=true});
 var visual=document.body.classList.contains('mw-focus-library')||!!document.querySelector('.top .brand');
 if(!visual){
  document.body.classList.add('mw-activity');
  var bar=document.createElement('div');bar.className='mw-theme-bar';bar.setAttribute('role','navigation');bar.setAttribute('aria-label','Maths Wednesdays');
  var student=location.pathname.indexOf('/students/')!==-1;
  var home=document.createElement('a');home.className='mw-home';home.href=new URL(student?'../students/index.html':'../puzzles/index.html',base).href;
  var mark=document.createElement('span');mark.className='mw-brand-mark';mark.textContent='m';mark.setAttribute('aria-hidden','true');
  var name=document.createElement('span');name.textContent='Maths Wednesdays';home.append(mark,name);
  var explore=document.createElement('a');explore.href=home.href;explore.textContent='Explore';
  var journey=document.createElement('a');journey.href=new URL('../development/explore/journey.html',base).href;journey.textContent='My journey';
  var nav=document.createElement('div');nav.className='mw-header-links';nav.append(explore,journey);bar.append(home,nav);document.body.prepend(bar);
 }
 apply();
 var ux=document.createElement('script');ux.src=new URL('clean-ui.js?v=3',base);document.head.append(ux);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
// Older pages may set an obsolete theme themselves. Keep the approved design consistent.
new MutationObserver(function(){if(document.documentElement.dataset.theme!=='focus')apply()}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
window.addEventListener('pageshow',apply);
})();

