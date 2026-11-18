# Shared site colours

Edit `mw-design/main.css` for the full and student sites.

- The first section controls the page, panels, text and drawing background.
- The four labelled category sections control the collection icons and activity accents.
- Shapes use blue and yellow, logic uses gold, number uses purple, and creation uses teal.
- Compatibility aliases connect older activities to these shared values.
- Canvas renderers read the same CSS variables before drawing, including saved canvas pictures.

Painted faces, Mastermind pegs, puzzle pieces and other colours carrying mathematical information remain separate. Creature/robot colour choices still work.

There is no theme chooser. Reload after changing colours; use a hard refresh if the browser has cached an older stylesheet. The legacy `themes/tokens.css` imports this main file, and `themes.js` also loads it for older pages. Category matching lives in `themes.js`.

Rollback details and the previous commit are recorded in `palette-rollout.json`. Restore only those files if later changes have been made elsewhere.
