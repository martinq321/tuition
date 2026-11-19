# Maintaining Maths Wednesdays

## When a pupil reports a problem

Start with the pupil’s route, device, input method and the action they were trying to complete. Reproduce the issue through the normal navigation. Trace it to the component, renderer, CSS rule, input handler or content record responsible. Search for other activities using that mechanism, including the full collection, pupil collection, curriculum units and offline copy where supported. Record which routes are affected.

Fix the shared source where the behaviour belongs. Typical owners include the character catalogue and guide renderer, shared reading styles, numeric-entry controller, curriculum generator and game engine. Regenerate derived pages. Preserve published routes, stable unit/activity IDs, saved attempts and intentional pupil variants. Document any local exception alongside the code, with the mathematical or interaction reason and its affected routes.

## Learner-facing pages

- Put one short instruction beside the relevant model and controls. Make the starting action, undo/reset behaviour and progression between steps clear.
- Use the shared readable type scale. Give diagrams, axes and board cells labels that remain legible on a smaller screen. Keep native zoom, visible focus and reflow available.
- Pair drag or gesture input with taps, buttons or keyboard actions where the interaction permits. Use the shared keypad for numeric answers, offering the symbols needed for the accepted answer format and a device-keyboard choice. Names, codes and written explanations need text entry.
- Use short animations when they explain a mathematical change or acknowledge a player action. Respect reduced motion and provide an equivalent static result.
- Show progress pupils can act on, such as a completed step or whose turn it is. Keep solver work counts, timings, build diagnostics and account/audit data in the educator or development view. Mathematical counts that a pupil is investigating belong beside the problem.
- Source character names, artwork and enabled state from the central catalogue. The guide component receives a dedicated container so changing a character cannot replace the surrounding problem.

## Verification and handoff

Exercise one normal learner journey and each affected variant. Include keyboard-only input, a narrow phone viewport, tablet portrait and landscape, desktop, larger text and reduced motion when relevant. Check touch control spacing, visibility of the question and keypad, and horizontal overflow.

Record the routes, actions, expected results and observed results. Distinguish source inspection, mathematical/automated tests, browser checks with simulated viewports, physical-device checks and observed learner use. A browser viewport gives layout evidence; a classroom trial gives evidence about how learners use the design. Describe which checks took place and which still need observation.
