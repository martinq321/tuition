/* Optional theme presentation; activity, lesson and notebook logic stays in site.js. */
(function(){
'use strict';
const artwork='<svg class="geo-art" viewBox="0 0 1000 700" aria-hidden="true"><path d="M0 280 850 0 1000 82 150 362Z"/><path d="M0 280 150 362 150 650 0 568Z"/><path d="M150 362 1000 82 1000 370 150 650 150 584 925 329 925 172 150 428Z"/><path d="M150 584 925 329 1000 370 150 650Z"/><path class="accent" d="M150 584 925 329"/></svg>';
const icons=[
'<path d="M40 8 74 28 40 48 6 28Z M6 28V67L40 87 74 67V28 M40 48V87 M23 18 57 38V77 M57 18 23 38V77 M6 47 40 67 74 47"/>',
'<path d="M8 39 37 22 66 39 37 56Z M8 39V50L37 67 66 50V39 M37 56V67 M22 15 32 9 32 34 61 51 51 57 22 40Z M22 40V15 M51 57V74L61 80V51"/>',
'<path d="M8 29 60 8 71 14 19 35Z M8 29V39L19 45V35 M19 45 71 24V14 M8 58 60 37 71 43 19 64Z M8 58V68L19 74V64 M19 74 71 53V43 M8 68 35 84 45 80 19 64"/>'
];
function decorate(){
const main=document.querySelector('main'),hero=main&&main.querySelector('.hero');
if(!hero||main.querySelector('.geo-home'))return;
const items=[['Painted Cube','puzzles-sessions-painted-cube','Colour the faces, then reason about what you can see.'],['String Lab','puzzles-string-lab-index','Make curves from straight lines. Find what stays the same.'],['Mastermind','mastermind-Mastermind_Maths_Wednesdays','Use clues and logical reasoning to crack the code.']];
const section=document.createElement('div');section.className='geo-home';
section.innerHTML='<section class="geo-stage" aria-label="Maths made visible"><div class="geo-copy"><p class="eyebrow">Mathematics investigations</p><h1>Maths.<br>Made visible.</h1><p class="geo-subtitle">Play with an idea. Find the pattern.</p><div class="actions"><a class="button" href="#library">Start exploring <span aria-hidden="true">→</span></a><a class="geo-secondary" href="#courses">Guided lessons</a></div></div>'+artwork+'</section><nav class="geo-featured" aria-label="Featured investigations">'+items.map((a,i)=>'<a href="#activity/'+a[1]+'"><div><span class="geo-number">0'+(i+1)+'</span><h3>'+a[0]+'</h3><p>'+a[2]+'</p><span class="geo-open">Explore activity →</span></div><svg viewBox="0 0 82 96" aria-hidden="true">'+icons[i]+'</svg></a>').join('')+'</nav>';
hero.before(section);
}
document.addEventListener('DOMContentLoaded',function(){
const brand=document.querySelector('header .brand > span:last-child');
if(brand)brand.innerHTML='Maths <span class="brand-second">Wednesdays</span>';
decorate();new MutationObserver(decorate).observe(document.querySelector('main'),{childList:true});
});
})();
