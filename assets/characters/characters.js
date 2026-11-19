/* Shared pupil-facing character names, portraits and per-device guide choice. */
(() => {
  "use strict";
  const profiles = window.MW_CHARACTER_CATALOGUE.characters;
  const available = profiles.filter(profile => profile.enabled);
  const names = new Map(available.map(profile => [profile.id, profile.name]));
  const storageKey = "mw-helper";
  // Earlier workshops stored fixed sprite positions.
  const legacyIds = ["alice", "bob", "nova", "finn"];

  function readChoice() {
    try {
      const value = localStorage.getItem(storageKey);
      return /^[0-3]$/.test(value) ? legacyIds[Number(value)] : value;
    } catch {
      return null;
    }
  }

  function setChoice(guide, preferred) {
    const select = guide.querySelector("[data-guide-choice]");
    const chosen = available.find(profile => profile.id === preferred);
    const profile = preferred === "none" ? null : chosen || available[0];
    select.value = profile ? profile.id : "none";
    guide.querySelectorAll("[data-guide-content]").forEach(item => { item.hidden = !profile; });
    if (profile) {
      const portrait = guide.querySelector("[data-guide-portrait]");
      guide.dataset.character = profile.id;
      guide.dataset.palette = profile.palette;
      portrait.dataset.character = profile.id;
      portrait.setAttribute("aria-label", profile.name);
    }
    guide.hidden = !available.length;
  }

  function initialiseGuide(guide) {
    const select = guide.querySelector("[data-guide-choice]");
    available.forEach(profile => select.add(new Option(profile.name, profile.id)));
    select.add(new Option("No helper", "none"));
    if (guide.querySelector(".guide-prop")) {
      const pause = document.createElement("button");
      pause.type = "button";
      pause.className = "smallbtn";
      pause.textContent = "Pause helper";
      pause.setAttribute("data-guide-content", "");
      pause.setAttribute("aria-pressed", "false");
      pause.addEventListener("click", () => {
        const paused = guide.classList.toggle("paused");
        pause.textContent = paused ? "Animate helper" : "Pause helper";
        pause.setAttribute("aria-pressed", String(paused));
      });
      guide.append(pause);
    }
    select.addEventListener("change", () => {
      const preferred = select.value;
      try { localStorage.setItem(storageKey, preferred); } catch { /* Choice applies on this page. */ }
      document.querySelectorAll("[data-mw-guide]").forEach(node => setChoice(node, preferred));
    });
    setChoice(guide, readChoice());
  }

  function initialise() {
    document.querySelectorAll("[data-guide-pair]").forEach(node => {
      const pair = ["alice", "bob"].filter(id => names.has(id)).map(id => names.get(id));
      const text = pair.length ? node.dataset.guidePair + " with " + pair.join(" & ") : node.dataset.guideFallback;
      node.textContent = text + (node.dataset.guideSuffix || "");
    });
    document.querySelectorAll("[data-guide-name]").forEach(node => {
      node.textContent = names.get(node.dataset.guideName) || node.dataset.guideFallback || "Guide";
    });
    document.querySelectorAll("[data-guide-card]").forEach(card => {
      const profile = available.find(profile => profile.id === card.dataset.guideCard);
      card.hidden = !profile;
      if (profile) card.dataset.palette = profile.palette;
    });
    document.querySelectorAll("[data-guide-group]").forEach(group => {
      group.hidden = !group.querySelector("[data-guide-card]:not([hidden])");
    });
    document.querySelectorAll("[data-mw-guide]").forEach(initialiseGuide);
    window.addEventListener("storage", event => {
      if (event.key !== storageKey && event.key !== null) return;
      document.querySelectorAll("[data-mw-guide]").forEach(guide => setChoice(guide, readChoice()));
    });
  }
  if (document.readyState === "loading" || document.readyState === "interactive") {
    document.addEventListener("DOMContentLoaded", initialise, {once: true});
  } else {
    initialise();
  }
})();
