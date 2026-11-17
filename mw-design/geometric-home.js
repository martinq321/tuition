/* Optional theme presentation; activity, lesson and notebook logic stays in site.js. */
(function(){
'use strict';
const artwork='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 570 496.314" class="geo-art" aria-hidden="true"><!-- Penrose tribar: exact 60-degree lattice; shared vertices. Geometry adapted from the public-domain Bromskloss Penrose triangle, Wikimedia Commons. --><path d="M85.0000,399.7114 L135.0000,399.7114 L310.0000,96.6025 L535.0000,486.3140 L560.0000,443.0127 L310.0000,10.0000Z" style="fill:#f7f8f9;stroke:#cbd0d5;stroke-width:3;stroke-linejoin:round;vector-effect:none"/><path d="M10.0000,443.0127 L35.0000,486.3140 L535.0000,486.3140 L310.0000,96.6025 L285.0000,139.9038 L460.0000,443.0127Z" style="fill:#e5e8eb;stroke:#cbd0d5;stroke-width:3;stroke-linejoin:round;vector-effect:none"/><path d="M260.0000,10.0000 L10.0000,443.0127 L460.0000,443.0127 L435.0000,399.7114 L85.0000,399.7114 L310.0000,10.0000Z" style="fill:#ffffff;stroke:#cbd0d5;stroke-width:3;stroke-linejoin:round;vector-effect:none"/><path d="M85.0000,399.7114 L435.0000,399.7114" style="fill:none;stroke:#d71920;stroke-width:1.4;stroke-linecap:round;vector-effect:none"/></svg>';
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
