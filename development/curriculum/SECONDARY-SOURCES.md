# Secondary curriculum map: sources and scope

Checked 18 November 2026 against the repository source used for the activity audit. This is the secondary portion of the Year 1–A-level planning map. It maps curriculum requirements, proposed teaching steps and candidate existing investigations. It does **not** certify that the corresponding courses have been built, tested or mastered.

## Official sources

| ID | Official source | Use in this map |
|---|---|---|
| `dfe-maths-nc-ks3-ks4` | [DfE mathematics programmes of study: England](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study) | KS3 content and working mathematically; KS4 braces cross-check the GCSE Higher-only distinctions. Official page last updated 28 September 2021. |
| `dfe-gcse-maths` | [DfE GCSE mathematics subject content and assessment objectives](https://assets.publishing.service.gov.uk/media/5a7cb5b040f0b6629523b52c/GCSE_mathematics_subject_content_and_assessment_objectives.pdf) | All numbered content statements in Number 1–16, Algebra 1–25, Ratio 1–16, Geometry 1–25, Probability 1–9 and Statistics 1–6; subject aims and AO1–AO3. Published November 2013. [Publication record](https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives). |
| `dfe-alevel-maths` | [DfE GCE AS and A-level mathematics content, with appendices](https://assets.publishing.service.gov.uk/media/5a7f273a40f0b62305b85670/GCE_AS_and_A_level_subject_content_for_mathematics_with_appendices.pdf) | Standard A-level Mathematics content A–S, OT1–OT3, technology, statistics and large-data-set requirements. Updated April 2016. [Publication record](https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics). |

The published DfE documents are the national subject-content baseline. The map uses original teaching-step descriptions rather than copying an examination board's course or commercial worksheets. Crown copyright material is acknowledged; the national curriculum page is published under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

## What “comprehensive” means here

The **scope of the map** covers the published requirements. Completion of a lesson, teaching block or course must be assessed separately against those requirements. Each objective has prerequisites, small steps, an accessible entry, a formal goal, evidence to collect, an explicit gap and a status. The JSON's coverage ledger records the official source ranges so that later work can audit omissions.

| Stage | Objectives | Candidate investigation link (`partial`) | No matched main-catalogue activity (`planned`) |
|---|---:|---:|---:|
| Year 7 | 19 | 13 | 6 |
| Year 8 | 18 | 11 | 7 |
| Year 9 | 15 | 13 | 2 |
| GCSE | 61 | 41 | 20 |
| A-level | 48 | 30 | 18 |
| **Total** | **161** | **108** | **53** |

There are no `complete` objectives. A `partial` status means that a source-inspected activity offers a plausible conceptual entry. It is **not** a claim that the activity already teaches or assesses the objective in full, or that its browser behaviour has passed an end-to-end check. Use the separate activity audit for functional readiness. A successful puzzle, visit, speed score or single answer does not establish mastery.

## KS3 sequence

DfE specifies **one KS3 programme**, not separate statutory Year 7, Year 8 and Year 9 syllabuses. The three stages here are an explicit proposed sequence:

- Year 7: establish notation, number structure, representations, geometric measures, simple data and probability.
- Year 8: develop signed rational calculation, proportions, equations, linear graphs, constructions, similarity and data interpretation.
- Year 9: complete the KS3 connections, including non-linear graph interpretation, Pythagoras, right-triangle trigonometry, deduction and critical enquiry.

All three years include reasoning and problem solving. Readiness and prior understanding take precedence over age placement. The route should allow revisiting earlier learning and deeper investigations without treating either as a diagnosis or a fixed ability label. Named entry skills connect to primary learning; secondary prerequisites use stable map IDs.

## GCSE tier verification

The DfE GCSE PDF explicitly distinguishes standard, underlined and bold content. The original PDF's bold text was inspected programmatically by font spans and cross-checked against the official KS4 HTML braces. **Standard and underlined content are shared by Foundation and Higher; bold content is Higher-only.** The map separates mixed statements accordingly: 38 shared objectives and 23 Higher objectives.

Examples where this matters:

- Systematic lists are shared; the product rule for counting is Higher.
- Integer index calculations are shared; fractional indices, surd calculation and recurring-decimal conversion are Higher.
- Simple error intervals are shared; derived upper/lower-bound calculations are Higher.
- Two-bracket expansion and monic quadratic factorisation are shared; more binomials, general non-monic quadratic factorisation and algebraic fractions are Higher.
- Parallel lines are shared; perpendicular gradients, circle equations/tangents, inverse/composite functions, iteration and transformed functions are Higher.
- Factorisable shared-tier quadratic equations and simultaneous linear equations are shared; general quadratic methods, linear–quadratic systems and quadratic inequalities are Higher.
- Recognising quadratic sequences is shared; deriving their nth terms is Higher.
- Interpreting direct/inverse proportional relationships is shared; constructing proportional equations is Higher.
- Positive fractional enlargement and right-triangle trigonometry in 2D are shared; negative enlargement, combined transformations, general/3D trigonometry and circle theorems are Higher.
- Vector arithmetic is shared; vector proof is Higher.
- Dependent combined-event tree diagrams are shared; conditional probability is Higher.
- Histograms, cumulative frequency, quartiles, interquartile range and box plots are Higher.

Numbered references such as “Algebra 18” are the **DfE section numbers**. No awarding-body topic codes or grade predictions have been invented. Once the board and exam year are chosen, crosswalk these objectives to that specification and confirm current assessment and formula-sheet arrangements. Historic statements about formula memorisation in the 2013 appendix are not treated as current exam-year policy.

## A-level coverage and boundaries

The map includes all standard Mathematics pure content (proof, algebra/functions, coordinate geometry, sequences/series, trigonometry, exponentials/logarithms, differentiation, integration, numerical methods and vectors), statistics and mechanics. It also includes:

- OT1: language, argument and proof; OT2: extended problem solving; OT3: mathematical modelling.
- Mathematical/statistical technology throughout the course, not just a final calculator lesson.
- Real large-data-set analysis, contextual familiarity, data cleaning and reproducibility. **Exam board and applicable large data set remain to be chosen.**
- Appropriate known-variance Normal-mean tests, binomial-proportion tests and interpretation of supplied correlation significance.
- 2D/3D vectors; 1D/2D kinematics, variable acceleration, projectiles, forces, connected particles, friction and moments.

Bold text in square brackets in the A-level document identifies the **AS subset**, not GCSE Higher content. This map covers the full A-level and does not prescribe a Year 12/13 division or a separate AS qualification route.

Full complex analysis of Spiral Gallery, finite projective-plane theory for Dobble, stiffness-method truss analysis in Bridge Lab and a calculus-of-variations derivation of the brachistochrone are enrichment beyond standard A-level Mathematics. Those activities can offer accessible questions about scaling, proof, forces or rates without implying their deeper mathematics is required. Scalar/vector products, general discrete random-variable mean/variance derivations, correlation-coefficient calculation, reduction formulae and mathematical induction should not be silently added as compulsory standard-content requirements.

The logarithm objectives use the mathematically correct real restrictions **x > 0, a > 0, a ≠ 1**. The extracted PDF wording for F3 is not used to infer that log(0) is defined.

## Activity matching and learning evidence

The activity IDs match the main catalogue in `puzzles/index.html`, rather than the older aliases in `pathways.json`. For example, `cube`, `ramps`, `tower`, `circles`, `coding` and `polyomino` are the catalogue IDs. The map points to the catalogue and does not duplicate or relocate those activities.

Useful entrances include factor trees and Euclid for number structure; painted cubes for counting, surface area and algebra; money plants and Hanoi for sequences; fixed-area factor shapes for inverse proportion; circle investigations for conjecture; and ramps for graphs and modelling. Probability work using Mastermind must state a random-secret or sampling assumption; strategic choice alone does not make a probability model valid. Mean guesses or speed should not be interpreted as a measure of general mathematical ability.

Every objective separates:

1. **Accessible entry:** an empirical, visual, tactile or short-strategy way to begin.
2. **Formal goal:** the exact mathematical reasoning or technique expected later.
3. **Evidence:** independent calculations, explanations, proof, contextual interpretation or practical observations.
4. **Gap:** what still needs building and validating.

Open explanations, proofs and modelling choices need human review. Automatic checking should be introduced only for validated bounded responses; require varied independent evidence and delayed revisiting before claiming secure understanding.

## Validation performed

- All 161 objective IDs are unique.
- All explicitly referenced secondary prerequisite IDs resolve within the map.
- Every activity ID exists in the audited main catalogue.
- Each objective has three or more small steps, an accessible entry, a formal goal, a source reference, evidence, accessibility requirements and an explicit gap.
- Every GCSE objective has a tier label; no stage or objective is marked complete.

This is source and structure validation of a curriculum planning artifact. It does not substitute for mathematical peer review of future lessons, browser testing, learner pilots or an exam-board crosswalk.
