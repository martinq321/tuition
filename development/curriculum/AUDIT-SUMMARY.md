# Existing activity audit

**Baseline:** repository commit `a64bc8bf8dcd227aa8a7ebf52588d3406dce8740`, reviewed 18 November 2026.

The site already has a substantial investigation library. It does **not yet have a complete Year 1–A-level teaching course**. The audit separates a learner's accessible starting activity from the much more demanding mathematics that could grow from it. Game completion, visits, XP and a correct multiple-choice answer are not treated as mastery.

## What was inventoried

| Resource | Count | Evidence reviewed |
|---|---:|---|
| Main library activities | 53 | Controls, handlers, model/checking logic and relevant helper pages |
| Logic activities | 14 | Constraint games, comparisons, game trees and state changes |
| Shape activities | 14 | Geometry, manipulation, numerical models and packing/dissection checks |
| Number activities | 10 | Arithmetic predicates, representations, strategies and counting |
| Creative/coding activities | 13 | Command interpreters, transforms, ciphers and scene construction |
| Word activities | 2 | Working word-game logic; not mapped as core mathematics |
| Corresponding student-menu activities | 24 | Destination files, inline logic and linked-script paths |
| Student HTML files, including helpers/indexes | 43 | Repository inventory; not 43 distinct main activities |
| Year 4 starter workshops | 3 | Place value, multiplication representations, blocks/sweets |
| Year 5 place-value workshop | 1 | Seven generated modes |
| Other Year 5 unit investigations | 14 | Five distinct challenges each: 70 tasks total |
| Learning-shell lessons | 12 | Four choice questions each: 48 questions total |
| Additional pathway hubs | 7 | Year 5–9, GCSE and A-level navigation |

All 53 main library destinations exist. All 24 corresponding student pages have matching inline game scripts at the baseline commit. Some pages use external scripts, so matching empty inline scripts does not establish complete equivalence; their external paths are recorded separately. The audit JSON has **53 activity records and 37 course-resource records**.

## Findings that matter first

1. **Repair shared asset paths.** The baseline has 52 missing stylesheet/script references on 26 root activity/helper pages: `../site-ux.css` and `../site-ux.js` resolve to nonexistent repository-root files. The parent implementation has repaired all 52 in the pending patch; the release source-link crawl checks the repaired references. Keep this distinction from the audited baseline in the release record.
2. **Build teaching sequences around the strongest existing representations.** Year 5 has starter coverage in every block, with five challenges per unit and shared model checking. Those five tasks are not comprehensive block coverage. The source explicitly lists remaining content, captured per unit in the JSON. Year 4 has three developed starter workshops, not a whole year's teaching.
3. **Check requested evidence, not only one successful example.** The final Year 5 volume prompt asks learners to find every cuboid of volume 60 with sides at most 6; its checker accepts a single valid cuboid. Keep enumeration as a separately assessed explanation until collection/completeness checking is added. More generally, many investigations intentionally support conjecture without proving it.
4. **Prioritise mathematical and interaction regression tests.** Highest-value cases include repeated colours and timed-out Mastermind records; crossing/reset animation states; all ramp path cases and off-focus ellipse shots; reflection degeneracies; packing best-found versus proven status; truss singular supports; dissection animation routes; and touch loops/rotation. These are test priorities, not assertions that every listed case is currently broken.
5. **Make limits explicit in specialised tools.** Sprouts describes its geometric checks as a prototype and has no complete legal-move existence solver. Bridge Lab offers editable Warren/Pratt/Howe templates but no direct blank-design preset. The packing lab must retain its distinction between a best found result and an exhaustive proof. The cube-through-cube and truss pages illustrate particular models rather than certifying optimal constructions or real engineering designs.
6. **Unify evidence and access infrastructure.** Existing local profiles, local notebooks and per-page records are useful prototypes. They are not authenticated accounts, secure per-user restrictions or cross-device assessment. Build this infrastructure separately from lesson-completion displays; retain first response, retries, help used, unfinished work and teacher interpretation.

## Useful teaching distinctions

| Accessible investigation | More demanding analysis | What the current page establishes |
|---|---|---|
| Paint, rotate and count small cubes | Boundary-count formulas and algebraic generalisation | Manipulable examples and classifications; not a proof that a learner can derive the formulas |
| Move discs in Hanoi | Recurrence, closed form and induction | Legal play and demonstrations; not a scored proof |
| Make and test small Dobble decks | Finite projective planes and prime-power constructions | Pairwise card checks and helper constructions; not a full finite-geometry course |
| Race ramps drawn from points | Cycloid/brachistochrone and variational calculus | A numerical experiment under a model, not a universal optimum proof |
| Follow a route with an emoji | Nested loops, conditionals and program correctness | A JavaScript command simulator with Python export, not an embedded Python interpreter |
| Build robots, sharks or dinosaurs | Size, symmetry, classification and constrained design | An open creator; mathematical objectives require explicit prompts and discussion |

Use prerequisite skills to select an entry, with school year as a curriculum reference rather than a fixed ceiling. Several activities are accessible long before their formal extension. Some extensions—finite geometry, topology, complex analysis or advanced graph games—are enrichment beyond the ordinary GCSE/A-level specification.

## Verification boundary

This is a **source-based audit**. No browser activity session was executed by this audit agent. Every record therefore says `runtime: "not tested this audit"`. Existing repository statements about earlier tests are not counted as new verification. Source review alone does not prove responsive behaviour, accessibility conformance, numerical accuracy or security.

The JSON records input alternatives and known accessibility affordances, but real-device touch, keyboard/focus, screen-reader, reduced-motion and small-screen checks remain necessary. Later release checks performed by the parent agent should be recorded separately with their actual scope and outcomes.

Files: `activity-audit.json` contains the records; `broken-local-links.json` preserves the baseline missing-reference list. `audit-extraction.json` is an intermediate source inventory, not the final audit.

## Curriculum build map

316 grouped objectives across 11 stages. These are curriculum planning records, not 316 completed lessons.

| Stage | Grouped objectives | Partial support | Planned |
|---|---:|---:|---:|
| Year 1 | 16 | 0 | 16 |
| Year 2 | 22 | 0 | 22 |
| Year 3 | 23 | 1 | 22 |
| Year 4 | 29 | 8 | 21 |
| Year 5 | 32 | 21 | 11 |
| Year 6 | 33 | 0 | 33 |
| Year 7 — foundations, structure and representation | 19 | 13 | 6 |
| Year 8 — proportional reasoning and connected models | 18 | 11 | 7 |
| Year 9 — complete KS3 and prepare for GCSE | 15 | 13 | 2 |
| GCSE Mathematics — Foundation and Higher | 61 | 41 | 20 |
| A-level Mathematics — pure, statistics and mechanics | 48 | 30 | 18 |

See [searchable curriculum and audit](map.html), [machine-readable map](curriculum-map.json), [prerequisite graph](curriculum-graph.json) and [development commands](COURSE-BUILD-PLAN.md). Every grouped objective includes original teaching steps, accessible entry, formal goal, prerequisites, evidence, source and gaps. Year allocation in KS3 is proposed; exam-board detail and course-level independent review remain build/release tasks.

## Release browser checks

The parent implementation checked representative pages separately from this source audit. These limited checks are recorded in `activity-audit.json` and `release-checks.json`; they do not certify every activity or every device.
