# Shared site themes

All public teaching pages load `tokens.css`, `activity.css` and `themes.js` from `mw-design/`.

- **tokens.css**: the only site palette definitions. Edit background, panel, text, accent, border, radius, focus and font tokens here. Four themes: graph, ghost, dark and orbit. Dark is the default for new visitors; saved selections are preserved. Orbit Lab uses the existing Jamie-site navy/turquoise palette and monospace typography.
- **activity.css**: shared interface surfaces and compatibility rules for older activities. Do not recolour mathematical objects here.
- **themes.js**: one saved preference (`maths-wednesdays-theme-v1`), picker, cross-tab and back-navigation sync. Existing legacy preferences migrate to a supported theme. No notebook or score storage is changed.
- **graph-paper.css / geometric.css / ghosted-backdrop.css**: decorative homepage layouts, not independent palettes.
- Page CSS should contain layout and mathematical visualisations, using shared variables for UI colours. Do not add independent `:root` theme palettes or local theme handlers.

New page head (adjust relative paths):
```html
<link rel="stylesheet" href="../../mw-design/themes/tokens.css?v=4">
<link rel="stylesheet" href="../../mw-design/themes/activity.css?v=4">
<script src="../../mw-design/themes.js?v=4"></script>
```
Place these after page-specific styles. The controller supplies a theme bar unless the page already contains `#theme-choice`.

All 155 public HTML pages in the tuition repository are connected. Platform-pilot and Handoff are separate prototypes/documentation and are excluded. Existing hardcoded drawing colours are intentionally retained: they encode mathematical or creative content. Older local styles remain as layout fallbacks but shared theme rules control the interface.
