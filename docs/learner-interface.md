# Learner presentation

The [reading stylesheet](../assets/css/reading.css) sets the text scale across the public curriculum, activities and site map. Change interface type there. Keep labels drawn inside mathematical figures scaled to the figure, and give the board a readable description. Test tablet-width layouts, zoom, keyboard input and the reduced-motion preference.

The shared [learner controller](../assets/js/learner-play.js) defines related activities in teaching order. Fewest Squares and Packing Lab use this sequence. Initialise an activity with its stable ID and a `data-learning-path` navigation element. Use the shared animation helpers for visual feedback on moves. Keep the goal, the board and the next action visible. Put optional guidance in disclosures. Show learners progress in the puzzle, such as remaining pieces or a completed tiling. Search costs used by a solver belong in diagnostic data.

Page-specific scripts and styles live under `assets/js/pages/` and `assets/css/pages/`. Shared feature implementations live under the corresponding `features/` folders. The legacy design system remains in `mw-design/`. Author HTML with external assets; static layout helpers and common page actions have shared files. Model-specific runtime styles and non-executable WebGL shader data may remain in their rendering components.

Existing standalone asset URLs are retained for saved copies. Edit the canonical file listed in [legacy-asset-aliases.json](../assets/legacy-asset-aliases.json) and run `python3 scripts/check-site-assets.py --sync-legacy` to update its byte-identical compatibility copies. Run the same command without the flag to audit public pages, asset paths, readable type and source drift.

Mark numeric response fields with `data-mw-keypad="whole"`, `"integer"`, `"decimal"` or `"fraction"`. Set `data-mw-submit="button-id"` when Enter should check the answer. A fixed keypad can use `data-mw-keypad-host="element-id"`. Set `data-mw-native` on a field or its container when it deliberately uses native input.

Run `python3 scripts/check-numeric-entry.py` to audit response fields and `node tests/numeric-keypad-dom.cjs` with jsdom 26 or later available to check keyboard, touch and round settings. Run `node tests/learner-play.cjs` for the two placement activities.
