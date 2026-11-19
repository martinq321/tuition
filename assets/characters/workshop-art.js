/* Original vector portraits for the block workshop. */
(() => {
  const portraits = {
    alice: "<svg viewBox=\"0 0 72 100\" aria-hidden=\"true\"><path d=\"M17 31Q10 0 37 5Q65 2 58 43L48 50H18Z\" fill=\"#533252\"/><circle cx=\"36\" cy=\"29\" r=\"20\" fill=\"#d69b73\"/><g class=\"eyes\" fill=\"#302936\"><circle cx=\"29\" cy=\"29\" r=\"2\"/><circle cx=\"43\" cy=\"29\" r=\"2\"/></g><path d=\"M29 39Q36 45 43 38\" fill=\"none\" stroke=\"#633f43\" stroke-width=\"2\"/><path d=\"M23 51Q36 45 49 51L55 87H17Z\" fill=\"#4c91c4\"/><path class=\"wave\" d=\"M49 57L62 65L65 45\" fill=\"none\" stroke=\"#d69b73\" stroke-width=\"8\" stroke-linecap=\"round\"/><path d=\"M23 88V98M47 88V98\" stroke=\"#34475c\" stroke-width=\"8\"/></svg>",
    bob: "<svg viewBox=\"0 0 72 100\" aria-hidden=\"true\"><circle cx=\"36\" cy=\"29\" r=\"21\" fill=\"#885635\"/><path d=\"M15 25Q10 1 35 5Q61 0 57 25L45 17L35 21L25 17Z\" fill=\"#292b36\"/><g class=\"eyes\" fill=\"#211e26\"><circle cx=\"29\" cy=\"29\" r=\"2\"/><circle cx=\"43\" cy=\"29\" r=\"2\"/></g><path d=\"M29 39Q36 44 43 39\" fill=\"none\" stroke=\"#422a26\" stroke-width=\"2\"/><path d=\"M22 52Q36 45 50 52L54 88H18Z\" fill=\"#d99a44\"/><path d=\"M23 88V98M47 88V98\" stroke=\"#34475c\" stroke-width=\"8\"/><path d=\"M22 57L12 77\" stroke=\"#885635\" stroke-width=\"8\" stroke-linecap=\"round\"/></svg>"
  };
  document.querySelectorAll("[data-guide-art]").forEach(node => {
    const svg = portraits[node.dataset.guideArt];
    if (svg) node.innerHTML = svg;
  });
})();
