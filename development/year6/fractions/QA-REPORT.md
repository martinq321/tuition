# Year 6 fractions — release checks

Date: 18 November 2026. Baseline: `4b9bc1c4e80294b4eada28af7f254afc95008acd` in `martinq321/tuition`.

## Mathematical and data checks

- Exact arithmetic engine: 51,125 assertions passed (normalisation, comparisons, operations, parsing, format requirements and rejected input).
- 122 authored answers accepted; 71 independent exact checks against calculation metadata.
- Separate Python Fraction audit recomputed all 122 answers from their wording/context, without importing the builder or site checker.
- 55 model-state checks passed, including the conservation of the whole and shared amounts, ordering and worked-step presets.
- Nine record-store scenarios passed: unfinished work, attempts, support, profile isolation, idempotent merge, corruption, rejected imports and failed browser storage.
- All 122 question specifications passed through the checker and record store, persisted/reloaded and merged; profiles remained separate.

The runnable tests are in `tests/`; they need only Node.js and Python 3. Model tests use a small DOM stand-in and do not establish browser accessibility.

## Browser checks

Chrome desktop preview was checked separately from the unit tests. All twelve Explore screens, 48 stepped-example screens, 102 practice screens and twenty review screens rendered. Representative interaction checks included:

- Slider-controlled equivalent fractions with the whole remaining fixed; successive worked steps changed the partition from fifths to tenths.
- Multiplication area shading (two thirds by three quarters gave six twelfths of the original whole).
- Incorrect answer → hint → corrected answer, with support and retries retained.
- A mathematically equivalent improper fraction was rejected when a mixed number was requested, and the correct mixed form accepted.
- Selecting and moving ordering cards; the resulting order was marked correctly. Keyboard alternatives and native range inputs are present.
- Opening matching models and explicitly labelled related models.
- Leaving a question unfinished, reopening the work record, switching to a blank profile and back, and saving an explanation.
- Twelve tutor-guide entries, pilot-note saving and the Year 6 entry link.
- 390px and 320px CSS viewport simulations using an iframe: readable task controls and no horizontal document overflow in the inspected views. A multiplication answer was submitted successfully in the narrow view.

This is screen-render coverage plus representative interaction testing, not exhaustive testing of every model state or all browsers. The drag-and-drop path, physical touchscreen hardware, screen readers and OS-level reduced-motion setting still need direct testing. Reduced-motion CSS has been inspected. No real learner trial has been claimed. Browser-extension diagnostic messages were excluded from application errors.

## Learning evidence boundary

This release is implemented and software-tested; the learner pilot is pending. Correct responses and local progress totals are practice evidence, not proof of mastery or a diagnostic assessment. Spoken explanations, off-screen transfer and delayed retention need an adult's judgement. Follow the pilot in `educator.html` and `TEACHING-NOTES.md`.

Records stay in this browser; profiles are not online accounts. Export/import is available. If persistent storage fails, a direct download is offered on the current page before navigation. The published files contain no learner records.
