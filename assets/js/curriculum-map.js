(() => {
  "use strict";
  const expand = document.querySelector("[data-toggle-objectives]");
  if (expand) {
    const sections = Array.from(document.querySelectorAll(".year-objectives"));
    const allOpen = () => sections.every(section => section.open);
    const updateLabel = () => {
      expand.textContent = allOpen() ? "Hide all objectives" : "Show all objectives";
      expand.setAttribute("aria-expanded", String(allOpen()));
    };
    let previouslyOpen;
    const setOpen = open => { for (const section of sections) section.open = open; };
    expand.addEventListener("click", () => {
      setOpen(!allOpen());
      updateLabel();
    });
    for (const section of sections) section.addEventListener("toggle", updateLabel);
    window.addEventListener("beforeprint", () => {
      previouslyOpen = sections.map(section => section.open);
      setOpen(true);
    });
    window.addEventListener("afterprint", () => {
      if (previouslyOpen) sections.forEach((section, index) => { section.open = previouslyOpen[index]; });
      previouslyOpen = undefined;
    });
    expand.hidden = false;
    updateLabel();
  }

  const searchUi = document.querySelector("[data-search-ui]");
  if (!searchUi) return;

  const field = document.getElementById("query");
  const results = document.getElementById("results");
  const status = document.getElementById("search-status");
  const normalize = value => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  const index = Array.from(results.children, item => ({
    item, words: normalize(item.dataset.search).split(/\s+/)
  }));

  function showMatches() {
    const query = normalize(field.value);
    const year = query.match(/\byear\s+(1[0-3]|[1-9])\b/);
    const topic = year ? query.replace(year[0], "").trim() : query;
    const words = topic ? topic.split(/\s+/) : [];
    results.hidden = !query;
    if (!query) {
      status.textContent = "";
      return;
    }

    let count = 0;
    for (const entry of index) {
      const match = (!year || entry.item.dataset.year === year[1]) && words.every(word => entry.words.some(candidate =>
        /^\d+$/.test(word) ? candidate === word : candidate.startsWith(word)
      ));
      entry.item.hidden = !match;
      if (match) count += 1;
    }
    status.textContent = count
      ? count + (count === 1 ? " unit found." : " units found.")
      : "No units found. Try a shorter topic or a different word.";
  }

  searchUi.hidden = false;
  field.addEventListener("input", showMatches);
  showMatches();
})();
