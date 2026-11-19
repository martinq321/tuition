/* Browse the same static directory with or without JavaScript. */
(() => {
  "use strict";
  const search = document.getElementById("search");
  const category = document.getElementById("category");
  const status = document.getElementById("status");
  const paths = [...document.querySelectorAll("[data-path]")];
  let originalOpen = null;

  function apply() {
    const query = search.value.trim().toLocaleLowerCase("en-GB");
    const filtered = Boolean(query || category.value || status.value);
    if (filtered && !originalOpen) originalOpen = paths.map(path => path.open);
    let total = 0;
    paths.forEach((path, index) => {
      const theme = path.querySelector("summary").textContent.toLocaleLowerCase("en-GB");
      let inPath = 0;
      path.querySelectorAll("[data-map-item]").forEach(item => {
        const content = (theme + " " + item.textContent).toLocaleLowerCase("en-GB");
        const visible = content.includes(query) && (!category.value || item.dataset.category === category.value)
          && (!status.value || item.dataset.status === status.value);
        item.hidden = !visible;
        if (visible) inPath++;
      });
      total += inPath;
      path.hidden = inPath === 0;
      if (filtered) path.open = inPath > 0;
      else if (originalOpen) path.open = originalOpen[index];
    });
    if (!filtered) originalOpen = null;
    document.getElementById("matches").textContent = filtered
      ? (total ? total + (total === 1 ? " activity" : " activities") + " found." : "No matching activities.") : "";
  }

  search.addEventListener("input", apply);
  category.addEventListener("change", apply);
  status.addEventListener("change", apply);
  document.getElementById("clear").addEventListener("click", () => {
    search.value = category.value = status.value = "";
    apply();
    search.focus();
  });
  const initial = document.getElementById(location.hash.slice(1));
  if (initial && initial.matches("[data-path]")) initial.open = true;
  document.getElementById("filters").hidden = false;
})();
