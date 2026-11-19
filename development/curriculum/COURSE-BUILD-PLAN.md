# Maths Wednesdays — course development commands

Updated 18 November 2026. Scope: a comprehensive interactive mathematics pathway from Year 1 through Year 9, GCSE Foundation/Higher and standard A-level Mathematics. Existing Year 4/5 workshops and investigations are starting resources, not evidence that a whole course is complete. The curriculum map is a build specification; most teaching blocks remain to be built.

## Mathematics curriculum by year

[Browse Years 1–13, units and learning objectives](../../curriculum/index.html). Each year has a suggested term order and unit pages linked to the England curriculum or qualification specification. The activity audit and build records track which units have teaching materials on this site.

To update a unit, edit the [year data](../../curriculum/data/), then run `python3 scripts/build-curriculum-map.py` and `python3 scripts/check-curriculum-map.py` from the repository root. Keep existing unit slugs stable so saved links continue to work.

## Working agreement for every command

Read this plan and the current repository before editing. Work on one bounded task, preserve functioning activities and pupil records, and use the common theme assets in `mw-design/`. Do not rebuild unrelated pages. Finish and validate the selected task before starting another. Publish authorised changes to `martinq321/tuition` and update `course-build-state.json` with evidence, limitations, commit and next task. Never label a block complete because its topic names or a handful of sample questions exist.

Curriculum framing: England. Use current DfE subject content and exam-board specifications when building a block. Years 7–9 are a suggested KS3 sequence, not nationally prescribed year-by-year requirements. GCSE has Foundation and Higher routes; A-level means standard Mathematics, not Further Mathematics. Begin board-neutral; keep board-specific differences explicit. White Rose inspires small steps and multiple representations; all teaching text, questions, characters and assets must be original or appropriately licensed.

## Task 1 — one shared appearance

Command: **Do course task 1: verify the homepage appearance across every investigation.**

Use the light Focus appearance throughout, with no theme chooser. `mw-design/main.css` owns colours, spacing, type and control shapes. Homepage category palettes carry into diagrams: gold/yellow logic (including Hanoi), blue/yellow shapes, purple/yellow number patterns, teal creation. Keep mathematical meaning, error states and deliberate user artwork colours. Buttons, tabs, selects and answer fields use the same lozenge silhouette; tiles, cards, peg holes and coding pieces retain their necessary geometry. Check touch targets, focus, contrast, reduced motion and phone layouts. Change the shared CSS instead of restyling each page separately.

## Task 2 — existing-activity audit and Year 1–A-level maps

Command: **Do course task 2: audit existing activities and map the complete Year 1–A-level curriculum.**

Deliver eleven stage maps (Years 1–9, GCSE, A-level), prerequisites, original small steps, official references, relevant activities, accessibility requirements, evidence of learning and explicit gaps. Separate accessible exploration from formal analysis. Include a machine-readable graph and [searchable map and audit](map.html). Years 7–9 are a proposed allocation of statutory KS3 content, not prescribed year-specific requirements. GCSE scope follows the DfE subject content with tier distinctions; verify the chosen board before producing exam preparation. Standard A-level includes pure, statistics and mechanics, not Further Mathematics.

Use precise states: `source-reviewed` means inspected source/interaction code; `runtime-checked` requires a recorded browser check; `needs-repair` names a confirmed defect; `planned` means not built. `partial` curriculum coverage means an investigation or workshop supports part of the objective, not that it teaches or assesses it fully. Never promote a map link or completed click to mastery. Record runtime limits openly and retain a repair queue.

Task 2 outputs: `curriculum-map.json`, `curriculum-graph.json`, `activity-audit.json`, `map.html` and `AUDIT-SUMMARY.md`. The map describes statutory coverage in grouped objectives; the lesson build must break these into sufficiently small teaching steps and independently verify the official scope. Keep inspection evidence and source dates in the data.

## Task 3 — reusable interactive lesson template

Command: **Do course task 3: build one reusable lesson template and demonstrate it with a Year 6 fractions lesson.**

Deliver a learner-facing model with dragging/tapping AND keyboard/button alternatives; a short prompt beside the model; optional stepped animated example; model-linked notation; hints that do not immediately reveal the answer; varied practice; an explain/justify question; a hands-on alternative; reset/undo where appropriate. Use the shared Focus style, large text, reduced-motion support and responsive layout. Do not move to mass production until this example has been reviewed in tutoring.

## Task 4 — question and feedback engine

Command: **Do course task 4: add validated question generation and step-specific feedback to the lesson template.**

Support exact numerical and fractional answers, accepted equivalent forms, units, reasonable numerical tolerances, intentionally wrong examples, bounded random generation and a fixed seed for reproducible checks. Explicitly distinguish automatically checked answers from open reasoning requiring discussion. Add progressive sequences that vary representation and reasoning, not just number size. Test correct and incorrect cases and avoid inaccurate labels of mastery.

## Task 5 — learning records and teacher review

Command: **Do course task 5: implement useful local learning records, teacher review and export.**

Record topic, task, first response, retries, hints, completion/abandonment and optional learner explanation. Keep untimed learning as default. Provide a clear progress view and JSON export/import with schema versioning and deletion controls. Existing records must survive. Browser-local profiles are not secure accounts. Reports describe evidence and suggest next activities; do not diagnose SEND or claim mastery from one answer. Secure accounts and access control remain a separate platform project.

## Task 6 — Year 6 pilot block

Command: **Do course task 6: build and test the complete Year 6 fractions block using the approved template.**

Work from the small-step map. Include equivalent fractions, simplifying, comparison, operations and relevant problem solving with appropriate Year 6 scope; multiple representations and practical models. Link relevant earlier learning. Provide sufficient varied independent practice and reasoning for every mapped objective. Trial with a learner, record friction and misconceptions, revise before reusing the design.

**Implementation update — 18 November 2026:** [Year 6 fractions](../year6/fractions/index.html) now contains 12 original lessons, 102 varied practice tasks and a 20-question fresh mixed review. It supplies manipulable models, stepped examples, two-stage hints, open reasoning, practical alternatives and local evidence/export. FR01–04 are the core block; FR05 is the fraction/division and familiar-equivalents bridge. General decimal calculations FR06–07 remain a future block. See [coverage](../year6/fractions/coverage.json) and [teaching/pilot notes](../year6/fractions/TEACHING-NOTES.md).

Status: `implemented-tested-awaiting-learner-pilot`. Exact-engine tests, independent mathematical/content review, model-state tests and local-record tests have passed. Representative browser checks passed: all 12 Explore screens, 48 worked-example steps, 102 practice and 20 mixed-review question renders; selected model/answer/record interactions; readable 390px and 320px CSS iframe viewports with no horizontal page overflow. The 122 question/checker/storage/reload/import API contract cases also passed. This is not exhaustive action testing or physical-device/assistive-technology validation. Reduced-motion media styles were inspected, but the OS setting was not emulated. A real learner trial has not happened and must not be marked complete from software checks. Tasks 3–5 now have foundations within this block; they remain globally planned until the template is learner-reviewed and the wider generation/records requirements are delivered.

Next command: **Run the Year 6 fractions learner pilot, record control/reading friction and transfer to a fresh off-screen problem, then revise only the issues observed.**

## Task 7 — complete Year 6, one block per command

Command: **Build the next unfinished Year 6 block from the approved map; finish, check and publish only that block.**

Suggested blocks: place value; four operations; fractions; decimals; percentages; ratio; algebra; converting units; perimeter/area/volume; statistics; shape; position and direction. Final sequencing and coverage come from task 2. After all blocks, run a Year 6 coverage and usability audit rather than claiming completeness from a lesson count.

## Task 7A — Years 1–3, one block per command

Command: **Build the next unfinished Year 1, 2 or 3 block from the curriculum map; state the year and finish only that block.**

Start with counting, cardinality, subitising and number composition; progress through place value, additive and multiplicative reasoning, fractions, measures, shape and applicable statistics. Use manipulatives, gestures, audio as an option, short reading demands and accessible tap/button alternatives. Do not assume a learner's age determines their entry point. Include practical materials and adult notes. Extend to formal explanations without making an easy entry visually babyish.

## Task 7B — Years 4–5, complete and repair existing work

Command: **Complete the next unfinished Year 4 or Year 5 block, retaining and improving its existing useful workshop.**

Audit the current five challenges and generated questions against every objective. Make representations manipulable, keep instructions beside the model, distinguish supported practice from independent transfer, add missing units and reasoning. Fix specific model/marking flaws before adding question volume. Trial with tutoring and home-education families, then update coverage evidence. Do not replace existing work with superficial duplicate pages.


### Year 5 — 17 bounded work packages

Added 18 November 2026. All tasks below are **planned**, not newly completed lessons. These expand Task 7B without renumbering the wider course/platform plan. The existing Year 5 provision is one seven-mode place-value workshop and fourteen five-challenge workshops. Use the 32 grouped Year 5 objectives in `curriculum-map.json` as the initial coverage ledger, then verify the detailed official requirements; the older workshop manifest's short gap descriptions are not exhaustive.

Use **Do Y5-01**, **Do Y5-02**, etc. to select a package. Preserve the Autumn/Spring/Summer order below for navigation; learners may revisit prerequisites or enter at a suitable point. Start with Y5-01. Platform accounts, subscriptions and multiplayer are separate workstreams.

**Keep each command manageable.** Each teaching package has three recorded passes:
- **A — scope and model:** inspect the existing workshop and prerequisites; write its objective/small-step checklist; fix or build the manipulable models and one end-to-end example.
- **B — teaching and practice:** finish the mapped small-step lessons, stepped examples, progressive hints, independent practice, reasoning, practical activities and a fresh review.
- **C — verify and release:** independently check mathematics/marking and representative interactions; preserve records and links; publish only this block and update coverage/build-state evidence.

A request such as **Do Y5-05A** selects just that pass. **Do Y5-05** selects all three. These are 17 work packages, not a promise that every package fits one short chat. Save the completed pass and exact next step if a package must continue.

**Common completion checks for Y5-01–15:** use the shared light Focus assets and category colours in `mw-design/`, readable type, lozenge controls and short instructions beside the model; support dragging plus tap/button/keyboard alternatives. Pair meaningful manipulation with notation, reduce scaffolding progressively and include an off-screen alternative using inexpensive materials. Check examples, valid equivalent answers, incorrect-answer feedback, numerical boundaries and the model/checker connection. Record first responses, support, retries and unfinished work accurately; open reasoning requires discussion. Verify representative phone layouts and preservation of existing local records. Include parent/tutor notes and an objective-to-lesson/practice/review checklist. Content quantities follow the objectives, not a fixed five-challenge or 102-question quota.

The Year 6 fractions implementation is a useful reference, but still awaits learner validation. Start the Y5-16 pilot after the first upgraded block and feed its findings into the template before broad reuse. Mark software-ready blocks `implemented-tested-awaiting-learner-pilot` when appropriate; do not describe an unobserved learner trial as complete.

#### Y5-01 — Place value (Autumn)

Command: **Do Y5-01: complete and test the Year 5 place-value block, preserving the existing workshop.**

Build a sequence for composing/repartitioning large numbers, reading/writing, comparing/ordering, counting in powers-of-ten steps, rounding and Roman numerals. Cover numbers to at least one million, the required rounding places and Roman numerals to 1,000 with years. Use movable counters/digit cards, number lines and numeral tiles; avoid rendering a million individual blocks. Introduce signed contexts briefly and link their full treatment to Y5-13. Check boundary crossings, internal zeros, rounding midpoints and invalid numeral feedback. Begin the learner-pilot strand on this block.

#### Y5-02 — Addition and subtraction (Autumn)

Command: **Do Y5-02: complete and test the Year 5 addition-and-subtraction block.**

Link counters and exchanges to formal columns, including calculations beyond four digits and subtraction through zeros. Add mental strategies, compensation, estimation, inverse checks, missing numbers and multi-step contexts in which the learner chooses the operation and method. Allow a learner to compare two methods. Check that each visual exchange preserves value and that feedback distinguishes an exchange error from an arithmetic error. Depends on Y5-01 foundations.

#### Y5-03 — Multiplication and division A (Autumn)

Command: **Do Y5-03: complete and test Year 5 multiplication and division A, with number-pattern investigations.**

Develop equal groups, known-fact strategies, arrays, systematic factor pairs, multiples/common factors, prime factors and prime/composite reasoning. Include primes through 100 with recall to 19, the special case of 1, square/cube numbers and power notation, plus whole-number multiplication/division by powers of ten. Link useful number-pattern, factor-shape and factor-tree activities with a specific investigation prompt. Check duplicate/missing factor pairs, square factors and prime classification. Decimal powers-of-ten applications continue in Y5-12.

#### Y5-04 — Fractions A (Autumn)

Command: **Do Y5-04: complete and test Year 5 fractions A, adapting the fractions models to Year 5 scope.**

Build equivalence, comparison/order, mixed/improper conversion and addition/subtraction with same and related denominators, including results beyond one whole and exchanges. Use strips, number lines and area models with a consistent whole. Add explanation and contextual tasks, not just calculations. Check equivalent answer forms, whole-size consistency and denominator reasoning. Do not substitute the harder Year 6 sequence for this progression. Connect to factor knowledge from Y5-03.

#### Y5-05 — Multiplication and division B (Spring)

Command: **Do Y5-05: complete and test Year 5 multiplication and division B, connecting models to written methods.**

Connect movable partitions/partial products to multiplication up to four digits by one or two digits, then sharing/exchange models to short division by one digit. Include mental methods and contextual decisions about remainders, fractional/decimal answers and rounding. Add mixed-operation problems, equality/missing numbers, simple scaling and rates. Within passes A/B, finish multiplication, then division, then mixed applications as separate saved checkpoints. Check zero partial products, exchanged remainders and the reasonableness of answers. Depends on Y5-02/03.

#### Y5-06 — Fractions B (Spring)

Command: **Do Y5-06: complete and test Year 5 fractions B, including fractions of quantities.**

Explore multiplying proper fractions and mixed numbers by whole numbers, repeated groups, fractions of sets/quantities and simple inverse problems that recover a whole. Connect strips to movable counters and contextual scaling. Distinguish accessible core work from optional harder inverse problems. Check answers exceeding one, grouping and units. Keep fraction-by-fraction multiplication and division by whole numbers as clearly labelled later extensions rather than mandatory Year 5 coverage. Depends on Y5-04, with relevant multiplication facts.

#### Y5-07 — Decimals and percentages (Spring)

Command: **Do Y5-07: complete and test the Year 5 decimals-and-percentages block.**

Make this block the owner of decimal place value, tenths/hundredths/thousandths, decimal-as-fraction notation, comparison/order and rounding, together with percentages as hundredths and familiar fraction/decimal/percentage equivalents. Use rescalable place-value models, number lines and hundred grids, retaining a clear definition of one whole. Include equivalents such as 40% and 80% and simple applications; keep general percentage calculation as a later extension. Check 0.5 versus 0.05, trailing zeros and rounding boundaries. Explicitly link arithmetic and powers-of-ten follow-up to Y5-12, avoiding duplicate coverage claims.

#### Y5-08 — Perimeter and area (Spring)

Command: **Do Y5-08: complete and test the Year 5 perimeter-and-area block.**

Use a draggable shape builder, boundary tracing and square tiling to distinguish perimeter from area. Develop composite rectilinear boundaries, missing lengths, rectangle areas, standard square units and irregular-area estimates. Add same-area/different-perimeter investigations and practical measuring. Check shared/internal edges, units, missing-length solutions and transparent tolerances for estimates. Retain relevant existing square/Euclid investigations as optional enrichment with a purpose.

#### Y5-09 — Statistics (Spring)

Command: **Do Y5-09: complete and test the Year 5 statistics block, adding line graphs and tables.**

Keep current bar-chart work as an optional prerequisite. Build draggable plots with meaningful scales, reading/interpreting line graphs, comparison/sum/difference questions, completing tables and interpreting timetables. Include a brief clock/time-arithmetic route before timetable problems; full conversions belong to Y5-14. Let pupils collect a small real dataset and discuss a suitable display. Check scales, plotted coordinates, elapsed times and that joining points is appropriate for the represented data.

#### Y5-10 — Shape (Summer)

Command: **Do Y5-10: complete and test the Year 5 shape block with manipulable geometry.**

Provide angle dragging and an alignable protractor; teach estimating/measuring/drawing acute, obtuse and reflex angles, straight/full turns and missing angles. Develop rectangle properties, regular versus irregular polygons, and recognising 3D objects from 2D views, with rotatable models. Give shorter saved checkpoints for angles, polygons and 3D views. Check scale choice, protractor placement, orientation-independent answers, and that regularity requires both equal sides and equal angles.

#### Y5-11 — Position and direction (Summer)

Command: **Do Y5-11: complete and test the Year 5 position-and-direction block.**

Use touch-plottable points and draggable whole shapes for coordinates, translation, reflection in horizontal/vertical mirror lines, predicting missing vertices and describing transformations. Keep core coordinates in the first quadrant, with later material explicitly labelled. Show equal perpendicular mirror distances and preserve the shape's dimensions. Check every transformed vertex, reversibility, fixed points and grid snapping. Include paper-grid and mirror alternatives.

#### Y5-12 — Decimals (Summer)

Command: **Do Y5-12: complete and test the Year 5 decimal-calculation block.**

Build on Y5-07 with decimal addition/subtraction, complements of one, sequences and multiplication/division by 10, 100 and 1,000. Link exchanges and digit movement to place value; include mixed whole/decimal values, money/measurement and non-money puzzles. Revisit ordering/rounding as prerequisites instead of rebuilding that block. Check unequal decimal lengths, zero placeholders and exact marking without floating-point artefacts. Make it clear that the decimal point stays fixed in the place-value chart.

#### Y5-13 — Negative numbers (Summer)

Command: **Do Y5-13: complete and test the Year 5 negative-numbers block.**

Develop interpreting, ordering and counting through zero with temperature, floors and depth, using movable markers and horizontal/vertical number lines. Add supported distance/difference investigations as a bridge to later work, with clear starting/ending points and units. Check direction, zero crossings, distance versus signed change and transfer to an unfamiliar context. Do not turn this into rules for multiplying negative numbers.

#### Y5-14 — Converting units (Summer)

Command: **Do Y5-14: complete and test the Year 5 unit-conversion block.**

Connect matched scales and movable measures to the required metric pairs for length, mass and capacity. Include common approximate imperial equivalents, time conversions and practical problems using decimal measures and the four operations. Display any approximate conversion supplied and explain its accuracy. Keep time separate from base-ten conversion rules. Check conversion direction, mixed units, 60-based time arithmetic and explicitly bounded numerical tolerances. Depends on Y5-12; reuse Y5-09's timetable links.

#### Y5-15 — Volume (Summer)

Command: **Do Y5-15: complete and test the Year 5 volume-and-capacity block with rotatable 3D models.**

Extend the current cube workshop with adding/removing cubes, inspecting hidden cubes, building layers, comparing arrangements, estimating volume and investigating container capacity. Let the learner rotate without changing the camera scale unexpectedly. Pair the digital model with sugar cubes/blocks and measuring jugs. Connect layers to multiplication, while keeping formal cuboid-volume formula work optional enrichment here. Check hidden counts, rotation-invariant totals, units and meaningful volume/capacity distinctions.

#### Y5-16 — Learner pilot and revisions (runs alongside the build)

Command: **Do Y5-16: prepare or continue the Year 5 learner pilot, use observed feedback and revise the affected blocks.**

Begin after Y5-01; revisit after each term's set and consolidate at the end. Prepare short tutor/parent observation sheets and fresh off-screen transfer tasks. Observe instruction length, reading load, controls, hints, misconceptions, persistence and independence; include later revisits rather than relying on immediate success. Trial with actual learners and physical devices when available. The assistant can prepare materials and act on supplied observations, but cannot invent sessions or validation. If observations are missing, record `awaiting-learner-feedback` and the exact checks still needed. Revise specific evidenced issues and record before/after results. This is a usability/teaching pilot, not proof of learning effectiveness.

#### Y5-17 — Whole-Year-5 audit and release

Command: **Do Y5-17: audit the whole Year 5 course, fix verified gaps and publish an accurate readiness report.**

Check every grouped objective and its detailed small steps against lessons, varied practice, reasoning and fresh review. Check shared objectives across blocks, missing prerequisites, links/navigation, consistent appearance, representative phone/tablet/desktop and keyboard/touch use, exact marking, records/export and practical adult guidance. Summarise learner-pilot findings and unresolved issues separately from software checks. Include a term overview and useful next-step guidance; completion badges must not imply mastery. Fix bounded defects, create explicit follow-up tasks for larger gaps, and mark readiness only at the level the evidence supports. Secure accounts remain separate platform work.

Planning reference: [DfE Year 5 programme of study](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study#year-5-programme-of-study), checked 18 November 2026; use the existing original small-step map and verify again during each build. White Rose informs progression and multiple representations; do not copy its proprietary lesson text or questions.


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

## Platform workstream — secure commercial service

These are **planned implementation tasks**, not features made operational by this document. Retain the current public site while a separate production service is developed. Lesson work and architecture can proceed in parallel; private learner records, subscriptions and live communication must wait for their backend controls. Use synthetic test learners until privacy and access tests pass.

### P1 — architecture, data and realistic content protection

Command: **Do platform task P1: design the production architecture and threat model, then scaffold a separate deployment without migrating live learners.**

Choose a frontend, backend/database, managed identity, storage, payment provider and realtime service. A candidate is the existing HTML/JavaScript frontend plus a server API, PostgreSQL with row-level security, managed authentication and hosted payment checkout; select providers after checking current capabilities and costs. Define users, household/learner relationships, roles, activities, assignments, entitlements, attempts, sessions, messages and audit records. Keep secret keys and privileged operations server-side. Use environment-specific configuration and migrations.

**Copy protection has limits:** code, images and text sent to a browser can be saved, and the existing public GitHub repository can already be copied. A private production repository and server-side access can protect future source, records, question banks, answer keys and paid lesson delivery; they cannot make visible material uncopyable. Hiding links, disabling right-click, obfuscation or a JavaScript password are not protection. Keep an intentional free public catalogue and licensed/owned assets; serve restricted content only after an entitlement check. Decide which assets must remain public before migration.

Acceptance: documented data flow and role/permission matrix, schema migrations, no secrets in the repository, separation of public and private material, backup/restore proposal, deployment/rollback instructions and a small tested protected endpoint. Do not expose answer banks in a frontend bundle.

### P2 — usernames and genuine accounts

Command: **Do platform task P2: implement learner, parent and tutor sign-in with secure account recovery and session handling.**

Depends on P1. Offer learner usernames; avoid requiring children to provide their own email. Use a managed authentication system with an adult-controlled account/recovery relationship and unique non-public learner identities. Check username enumeration, login throttling, password reset, logout, session expiry and cross-device behaviour. Privileged accounts require stronger protection such as MFA. Roles must be assigned server-side, never taken from editable profile metadata or local storage. Define deletion, data export, retention, age-appropriate notices and the adult's role in account creation before accepting real children’s records.

Acceptance: learner A cannot read or alter learner B's records, expired/revoked sessions fail, account recovery cannot change another account, admin role cannot be self-assigned, accessibility and touch use checked. A local profile is labelled local and is not presented as a secure login.

### P3 — admin desk and individual access

Command: **Do platform task P3: build the tutor/admin desk for assigning activities and controlling each learner’s access.**

Depends on P2. Search learners, assign groups and lessons, schedule unlocks, override subscription access with a reason, pause access, preview the learner view, and see an audit trail. Model free access, subscription entitlement and tutor assignment separately. Lock status must be enforced on API/content requests, not just by hiding a card. Support bulk operations with review/undo where appropriate; prevent accidental self-lockout. Do not put passwords on the admin screen.

Acceptance: tests for each role and group, direct-URL and API bypass attempts denied, grant/revoke effective on refresh/session boundaries as specified, tutor sees only assigned learners, change log records actor/time/reason. Lock messages explain the next step without pressuring children to buy.

### P4 — learning evidence and reviewed reports

Command: **Do platform task P4: connect lesson evidence to secure learner records and an educator review/reporting workflow.**

Depends on P2/P3 and course task 5. Migrate local records only with a deliberate learner/account match and a reversible import. Track first response, hints, retries, settings, solved/unfinished/timed-out states and optional explanations. Separate completion, practice accuracy and independently demonstrated understanding. Keep settings-specific game statistics separate. Reports link each claim to evidence, state uncertainty and offer teaching adjustments. Suggested SEND support must be reviewed by an educator; the product must not diagnose or label a child from gameplay.

Acceptance: deterministic totals, duplicate/offline event handling, export/delete/recovery checks, explainable reports, role isolation, retention enforcement. Provide parent notes and printable practical consolidation where appropriate.

### P5 — live multiplayer games

Command: **Do platform task P5: build one invitation-only two-player Mastermind pilot with authoritative game state.**

Depends on P2/P3. Use private room codes with membership checks and expiry; server owns turn order, timing, scoring and secret codes. The opponent's code must not be sent to the client early. Add reconnect/resume, duplicate action handling, stale-action rejection, opponent departure and accessible status. Later adapt the same room system to other suitable games. Separate timed statistics and record timeouts/abandoned games honestly.

Acceptance: two real browser sessions on different accounts, unauthorised join denied, race/concurrent move tests, disconnect/reconnect tests, no hidden-answer leak, bounded room cleanup. Realtime transport alone does not enforce game rules.

### P6 — supervised tuition and chat

Command: **Do platform task P6: implement supervised lesson rooms with tutor-led communication and shared activity state.**

Depends on P2/P3/P5. Start with authorised tutor/learner rooms, not public chat or unsolicited child-to-child messaging. Define membership, moderation, reporting, retention, file-sharing restrictions and adult visibility. Consider an established video provider for calls; provide separate consent/notice and room access. Support tutor annotation, pause and shared task position without remote control of unrelated pages. Provide mute/leave and connection indicators.

Acceptance: only invited authorised members can subscribe/post/read, revoked members lose access, message limits and injection controls, reporting reaches the responsible adult, safe retention/deletion and incident procedure. Test poor connections and assistive technology.

### P7 — free tier, subscriptions and payments

Command: **Do platform task P7: add a clearly defined free tier and adult-managed subscriptions with server-enforced entitlements.**

Depends on P2/P3. Define the actual free activities, paid collections, trial/cancellation rules and household/learner limits before pricing. Use hosted checkout; never store card data in this app. Signed verified webhook events update entitlements idempotently; do not unlock solely from a success redirect or client flag. Include manage-subscription portal, payment failure, cancellation, renewal, refund and grace-period behaviour. Tutor overrides remain explicit and auditable.

Acceptance: sandbox purchase-to-access, duplicate/out-of-order webhook handling, cancelled/expired access, no payment flow aimed at a child, receipts and tax/legal setup reviewed for the chosen market. No live charges during development.

### P8 — domain migration and launch

Command: **Do platform task P8: prepare a staged move to the chosen domain, preserving all working links and rollback.**

Depends on P1 and whichever protected features launch. Inventory existing GitHub Pages URLs, choose domain and DNS host, use staging first, verify TLS and ownership, configure redirects/canonical links, update relative asset paths, auth callback URLs, email links, payment return URLs and realtime allowed origins. Preserve useful public pages. A domain change alone does not add a backend or secure content. Do not cut over or purchase a domain until the specific domain and live cutover are authorised.

Acceptance: full link/asset crawl, mobile/touch/keyboard checks, auth/payment sandbox smoke test on staging, DNS/TLS verified, backups tested, monitored rollback rehearsed, clear update instructions for families. Do not claim offline exports include live account features.

### P9 — commercial readiness and maintenance

Command: **Do platform task P9: run the release review and fix the blockers before inviting paying families.**

Depends on the launched feature set. Independent security review of auth/data boundaries and billing; child-appropriate privacy review; accessibility and actual-device testing; mathematical review; backups with restore practice; dependency monitoring; uptime/error monitoring with minimal personal data; support and incident process; owned/licensed content record; transparent terms and pricing. Gather tutoring/home-education pilot feedback and evidence before making learning-effectiveness claims. Recheck coverage for the exam board and current assessment rules.

Acceptance: named release owner, tested recovery, no unresolved high-severity access flaws, documented known limitations, support route, and a rollback plan. A polished interface does not imply the service is production-ready.

### Platform references (checked 18 November 2026)

These inform the proposed architecture; final provider configuration needs verification at implementation time.

- [GitHub Pages: static hosting](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) and [custom domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
- [Supabase: row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security) and [private realtime authorisation](https://supabase.com/docs/guides/realtime/authorization). Provider choice is a proposal, not a commitment.
- [Stripe: subscription webhooks](https://docs.stripe.com/billing/subscriptions/webhooks) and [entitlements](https://docs.stripe.com/billing/entitlements).
- [ICO: Children’s Code and education technology](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/the-children-s-code-and-education-technologies-edtech/). Direct-to-family and school arrangements need their own data-role assessment.

## Definition of a finished teaching block

1. Every approved small-step objective is covered and linked to prerequisites.
2. Learners manipulate a meaningful model and connect it to mathematical notation.
3. Guided examples, varied independent practice, reasoning and application are present.
4. Feedback, accepted answers, numerical limits and examples are checked.
5. Practical alternatives, adult guidance and accessible controls are provided.
6. Progress evidence accurately records what happened; open reasoning is not silently auto-marked.
7. The shared appearance works and task, model and controls remain usable on small screens.
8. The block is reviewed, published, and its status and evidence are updated.
