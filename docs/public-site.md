# Maintaining the public site

The [homepage](../index.html) opens the curriculum, site map and collections. The [student collection](../students/index.html) provides a smaller set of activities. Existing links and browser-local learning records use stable paths and activity IDs.

## Change the shared appearance

Start with [the shared reading scale](../assets/css/reading.css) for text size, [the site styles](../mw-design/main.css) for the established palette and controls, and [layout styles](../assets/css/page-layout.css) for the page frame. Page-specific behaviour goes under `assets/js/pages/` and `assets/css/pages/`. Reused activity modules go under `assets/js/features/` and `assets/css/features/`. Keep new HTML free of embedded executable scripts, event attributes and stylesheets.

Some older pages also load compatibility copies at their historic paths. Edit the canonical file named in [the alias list](../assets/legacy-asset-aliases.json) and run `python3 scripts/check-site-assets.py --sync-legacy`. Review the changed copies together with the canonical change.

## Change a teaching character

Edit [the character registry](../assets/characters/registry.js) to change a guide’s display name, visibility or accent. Keep the stable IDs `alice`, `bob`, `nova` and `finn`; these identify artwork and saved preferences. Supported accents are blue, gold, purple and teal. The four portraits, the block-workshop drawings and their animation styles live under `assets/characters/`. Lesson-specific mathematics belongs with its activity. Open a Year 5 workshop to check its selector, the no-helper option and the saved choice on a second workshop.

## Update the site map

Edit [theme paths](../data/theme-paths.json) to reorder a pathway or give it a different description. Each investigation has one primary pathway and retains its legacy category. Activity destinations and review findings come from [the source audit](../development/curriculum/activity-audit.json). Record dated, scoped evidence when marking a feature browser-checked. Distinguish a desktop run, an emulated screen size and a physical-device observation.

Run `python3 scripts/build-site-map.py` to regenerate the [public directory](../site-map/index.html) and its [machine-readable routes](../site-map/routes.json). To change the curriculum itself, edit the year records in `curriculum/data/`, run `python3 scripts/build-curriculum-map.py`, then `python3 scripts/check-curriculum-map.py`. Run the site-map builder again if a year’s unit count changes.

## Check a release

Run `python3 scripts/check-site-assets.py` and `python3 scripts/check-curriculum-map.py` from the project root. Open the root and student menus, then exercise each changed activity through its normal controls. Local source checks, mathematical checks and a browser walkthrough answer different questions; record what each check actually covered.
