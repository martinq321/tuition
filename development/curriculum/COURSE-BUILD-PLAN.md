# Maths Wednesdays — course development commands

Updated 18 November 2026. Scope: comprehensive interactive Year 6, Year 7, Year 8, Year 9, GCSE and A-level mathematics, connected to existing Year 4/5 and investigations. The present secondary collections are not complete courses.

## Working agreement for every command

Read this plan and the current repository before editing. Work on one bounded task, preserve functioning activities and pupil records, and use the common theme assets in `mw-design/`. Do not rebuild unrelated pages. Finish and validate the selected task before starting another. Publish authorised changes to `martinq321/tuition` and update `course-build-state.json` with evidence, limitations, commit and next task. Never label a block complete because its topic names or a handful of sample questions exist.

Curriculum framing: England. Use current DfE subject content and exam-board specifications when building a block. Years 7–9 are a suggested KS3 sequence, not nationally prescribed year-by-year requirements. GCSE has Foundation and Higher routes; A-level means standard Mathematics, not Further Mathematics. Begin board-neutral; keep board-specific differences explicit. White Rose inspires small steps and multiple representations; all teaching text, questions, characters and assets must be original or appropriately licensed.

## Task 1 — shared appearance (implemented; validate deployment)

Command: **Do course task 1: finish and verify the shared theme system.**

One preference across public pages; one palette file; shared interface styles; retain mathematical colours. Graph paper, Ghosted backdrop, Dark (default) and Orbit Lab from Jamie’s site. No duplicate local pickers. Verify navigation persistence, readable contrast, keyboard operation and phone layout. Separate Platform-pilot and Handoff are excluded from this migration.

## Task 2 — audit and curriculum maps

Command: **Do course task 2: audit existing activities and map the complete Year 6–A-level curriculum.**

Deliver six topic maps with prerequisites, small steps, official references, existing relevant activities, accessibility requirements, evidence of learning and missing content. Separate accessible exploration from formal analysis. Include a machine-readable curriculum graph and readable overview. Classify resources as verified, needs repair, available but unmapped, planned or complete. Inspect behaviour, not just filenames. Keep Year 4/5 links in the prerequisite graph.

## Task 3 — reusable interactive lesson template

Command: **Do course task 3: build one reusable lesson template and demonstrate it with a Year 6 fractions lesson.**

Deliver a learner-facing model with dragging/tapping AND keyboard/button alternatives; a short prompt beside the model; optional stepped animated example; model-linked notation; hints that do not immediately reveal the answer; varied practice; an explain/justify question; a hands-on alternative; reset/undo where appropriate. Use the shared themes, large text, reduced-motion support and responsive layout. Do not move to mass production until this example has been reviewed in tutoring.

## Task 4 — question and feedback engine

Command: **Do course task 4: add validated question generation and step-specific feedback to the lesson template.**

Support exact numerical and fractional answers, accepted equivalent forms, units, reasonable numerical tolerances, intentionally wrong examples, bounded random generation and a fixed seed for reproducible checks. Explicitly distinguish automatically checked answers from open reasoning requiring discussion. Add progressive sequences that vary representation and reasoning, not just number size. Test correct and incorrect cases and avoid inaccurate labels of mastery.

## Task 5 — learning records and teacher review

Command: **Do course task 5: implement useful local learning records, teacher review and export.**

Record topic, task, first response, retries, hints, completion/abandonment and optional learner explanation. Keep untimed learning as default. Provide a clear progress view and JSON export/import with schema versioning and deletion controls. Existing records must survive. Browser-local profiles are not secure accounts. Reports describe evidence and suggest next activities; do not diagnose SEND or claim mastery from one answer. Secure accounts and access control remain a separate platform project.

## Task 6 — Year 6 pilot block

Command: **Do course task 6: build and test the complete Year 6 fractions block using the approved template.**

Work from the small-step map. Include equivalent fractions, simplifying, comparison, operations and relevant problem solving with appropriate Year 6 scope; multiple representations and practical models. Link relevant earlier learning. Provide sufficient varied independent practice and reasoning for every mapped objective. Trial with a learner, record friction and misconceptions, revise before reusing the design.

## Task 7 — complete Year 6, one block per command

Command: **Build the next unfinished Year 6 block from the approved map; finish, check and publish only that block.**

Suggested blocks: place value; four operations; fractions; decimals; percentages; ratio; algebra; converting units; perimeter/area/volume; statistics; shape; position and direction. Final sequencing and coverage come from task 2. After all blocks, run a Year 6 coverage and usability audit rather than claiming completeness from a lesson count.

## Task 8 — Year 7, one block per command

Command: **Build the next unfinished Year 7 block from the approved KS3 map; finish, check and publish only that block.**

Suggested domains: number and calculation; fractions/decimals/percentages; ratio; algebraic notation and expressions; sequences; equations; coordinates; angles and shapes; area/perimeter/volume; statistics; probability. Revisit prerequisites when necessary and connect investigations to the taught objectives.

## Task 9 — Year 8, one block per command

Command: **Build the next unfinished Year 8 block from the approved KS3 map; finish, check and publish only that block.**

Develop proportional reasoning, equations, graphs, transformations, number representations, geometry, probability and statistics according to the map. Do not mechanically duplicate Year 7 with larger numbers.

## Task 10 — Year 9, one block per command

Command: **Build the next unfinished Year 9 block from the approved KS3 map; finish, check and publish only that block.**

Complete KS3 coverage and explicitly identify GCSE bridge topics. Include connected algebra/graphs, geometric reasoning, Pythagoras and trigonometry where sequenced, probability and statistical interpretation. Preserve routes for revisiting earlier concepts.

## Task 11 — GCSE, one block and tier per command

Command: **Build the next unfinished GCSE block from the approved map, with Foundation and Higher pathways where appropriate. Finish and verify only that block.**

Cover all six content domains: number; algebra; ratio/proportion/rates of change; geometry/measures; probability; statistics. Include prerequisite models, progressively reduced scaffolding, multi-step applications and original exam-style practice. Identify tier-specific objectives. Formula provision and exam-board details must be checked against current requirements. No copied commercial questions or unverifiable grade predictions.

## Task 12 — A-level pure, one block per command

Command: **Build the next unfinished A-level Pure Mathematics block from the approved map; finish, mathematically check and publish only that block.**

Cover proof; algebra/functions; coordinate geometry; sequences/series; trigonometry; exponentials/logarithms; differentiation; integration; numerical methods; vectors. Use manipulable graphs and geometric explanations alongside exact symbolic reasoning, assumptions, domains and counterexamples. Distinguish A-level content from enrichment such as the brachistochrone derivation.

## Task 13 — A-level statistics, one block per command

Command: **Build the next unfinished A-level Statistics block from the approved map; finish, check and publish only that block.**

Cover sampling and data, probability, distributions and hypothesis testing. Use interactive simulations with stated assumptions and reproducible seeds. Separate empirical frequency from theoretical probability. Include the applicable large-data-set work once an exam board is selected.

## Task 14 — A-level mechanics, one block per command

Command: **Build the next unfinished A-level Mechanics block from the approved map; finish, check and publish only that block.**

Cover quantities/units, kinematics, forces/Newton’s laws and moments. Connect animations to vector diagrams, equations, units and modelling assumptions. Validate simulation results against exact cases; an attractive animation is not evidence that the mechanics is correct.

## Task 15 — course-wide review and release

Command: **Do course task 15: audit curriculum completeness, mathematical correctness, accessibility and real-device usability; fix the highest-priority issues and report what remains.**

Audit every objective against lessons, practice and assessment evidence; broken links; theme consistency; touch/keyboard; smaller screens; reduced motion; saved records; numerical correctness and content licensing. Use a learner pilot plus educator review. Only mark a course complete once the coverage audit passes. Maintain a visible gap list.

## Separate platform workstream — after lesson and evidence design stabilise

Secure learner/parent/tutor accounts; per-learner activity access; server-side authorisation; privacy/consent and retention; backup/recovery; payments; subscription entitlements; supervised communication; safeguarding; monitoring. These are independent bounded tasks requiring actual backend implementation and security review. GitHub Pages and hidden links alone do not secure private content.

## Definition of a finished teaching block

1. Every approved small-step objective is covered and linked to prerequisites.
2. Learners manipulate a meaningful model and connect it to mathematical notation.
3. Guided examples, varied independent practice, reasoning and application are present.
4. Feedback, accepted answers, numerical limits and examples are checked.
5. Practical alternatives, adult guidance and accessible controls are provided.
6. Progress evidence accurately records what happened; open reasoning is not silently auto-marked.
7. Shared themes work and task, model and controls remain usable on small screens.
8. The block is reviewed, published, and its status and evidence are updated.
