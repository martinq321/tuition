const scenes={
'addition-subtraction':['Exchange ten little counters for one bigger counter.','● ● ● ● ●','10 → 1'],
'multiplication-division-a':['Can you help me arrange the tiles with none left over?','▦','Rows × columns'],
'fractions-a':['Let’s cut the strips into equal-sized pieces.','▰ ▰ ▱ ▱','Same-sized pieces'],
'multiplication-division-b':['I’m splitting a big rectangle into smaller ones.','▦','Split · multiply · add'],
'fractions-b':['Let’s collect equal groups of fraction pieces.','▰ + ▰ + ▰','Equal groups'],
'decimals-percentages':['I’m painting parts of a hundred square.','▦','Out of 100'],
'perimeter-area':['I’ll walk around the edge. You count the squares inside!','□','Around / inside'],
'statistics':['Help me build bars that match the table.','▂ ▆ ▃ ▅','Compare the heights'],
'shape':['Watch me turn. How much of a full turn is that?','↗','A full turn is 360°'],
'position-direction':['Let’s move every corner the same way.','△ → △','Keep the shape'],
'decimals':['Help me move the digits. The decimal point stays put!','2.6 → 26','Example: one place left × 10'],
'negative-numbers':['I’m travelling along the number line. Which way next?','−3  −2  −1  0  1','Below and above zero'],
'converting-units':['Same amount, different units. Let’s measure it!','┃ ┃ ┃ ┃ ┃','Check the unit'],
'volume':['I’m stacking cubes. Turn yours and count its layers!','▱ ▱ ▱','Build one layer at a time']
};
const guide=document.querySelector('[data-mw-guide]');
const portrait=guide.querySelector('[data-guide-portrait]');
const scene=scenes[document.body.dataset.unit]||['Try an idea. You can always change it!','✦','Explore'];
document.querySelector('.guide-message').textContent=scene[0];
const prop=document.createElement('div');prop.className='guide-prop';prop.setAttribute('data-guide-content','');prop.setAttribute('aria-hidden','true');prop.textContent=scene[1];portrait.after(prop);
const caption=document.createElement('p');caption.className='guide-caption';caption.setAttribute('data-guide-content','');caption.textContent=scene[2];prop.after(caption);
const feedback=document.getElementById('feedback');new MutationObserver(()=>{guide.classList.toggle('celebrate',feedback.textContent.startsWith('That works!'))}).observe(feedback,{childList:true,characterData:true,subtree:true});
