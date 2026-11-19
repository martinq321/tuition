/* One teaching sequence can appear on several activity pages. Routes use the site root. */
(() => {
  'use strict';
  const siteRoot = new URL('../../', document.currentScript.src);
  const pathways = [{
    title: 'Tiling and packing',
    activities: [
      { id: 'fewest-squares', title: 'Tile a rectangle', path: 'puzzles/sessions/fewest-squares.html' },
      { id: 'packing-lab', title: 'Pack the pieces', path: 'puzzles/sessions/packing-lab.html' },
      { id: 'fewest-squares-extension', title: 'Try larger boards', path: 'puzzles/sessions/fewest-squares-extension.html' }
    ]
  }];

  function mount(id) {
    const nav = document.querySelector('[data-learning-path]');
    const topic = pathways.find(path => path.activities.some(item => item.id === id));
    if (!nav || !topic) return;
    nav.setAttribute('aria-label', topic.title + ' progression');
    const title = document.createElement('span');
    title.className = 'play-topic';
    title.textContent = topic.title;
    const list = document.createElement('ol');
    for (const item of topic.activities) {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = new URL(item.path, siteRoot).href;
      link.textContent = item.title;
      if (item.id === id) link.setAttribute('aria-current', 'page');
      li.append(link);
      list.append(li);
    }
    nav.replaceChildren(title, list);
  }

  function animatePiece(element) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !element?.animate) return;
    element.animate([{ opacity: 0.25 }, { opacity: 1 }], { duration: 230, easing: 'ease-out' });
  }

  // Canvas activities can draw the added piece themselves while using the same motion preference.
  function animateDraw(draw) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { draw(1); return; }
    const start = performance.now();
    function frame(now) {
      const progress = Math.min(1, (now - start) / 180);
      draw(progress);
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  window.MWLearnerPlay = Object.freeze({ mount, animatePiece, animateDraw, pathways });
})();
