# Activity checks on 19 November 2026

A desktop Chromium walkthrough in the teaching preview used the public Times Tables, Fewest Squares and Packing Lab pages and their shared controllers.

| Activity | Actions and observed result |
| --- | --- |
| Times Tables | The first question and Check button were visible with Round settings closed. Start showed 5 × 3. Pressing 1, 5 and Check gave “Correct! 5 × 3 = 15” and increased the run to 1. |
| Fewest Squares | Enter placed the selected 2 × 2 square on a 3 × 5 board. Eleven cells remained and Undo became available. Undo reversed the placement. The next activity link opened Packing Lab. |
| Packing Lab | Rotate and Enter placed a 2 × 3 piece on a 5 × 4 board. The page reported one of four pieces placed. See a packing showed a four-piece solution and opened its first diagram with step controls. |

Separate Chromium checks covered Times Tables in the hosted preview at 820 × 1180, 1180 × 820 and 390 × 844 CSS pixels. After pressing Start at each size, the question and the full on-screen keypad fitted in the viewport. The answer field remained read-only and the page had no horizontal overflow.

The [tiling and packing controller test](../tests/learner-play.cjs) also covers completing a tiling, saving and undoing it, filling the packing board, stepping through the comparison and returning to the pupil’s board. The [numeric entry test](../tests/numeric-keypad-dom.cjs) exercises both Times Tables entry points, the round settings and keyboard or on-screen answers. These tests use simulated documents. Checks on physical tablets and observation of pupils remain outstanding.
