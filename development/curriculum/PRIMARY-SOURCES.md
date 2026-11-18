# Years 1–6: source and coverage notes

Prepared 18 November 2026 for Maths Wednesdays. This is a curriculum planning map, not a declaration that six complete courses have been built.

## Scope and source authority

The map follows **England’s statutory mathematics programme for Years 1–6**. The Department for Education publishes content year by year for key stages 1 and 2. Schools have flexibility about when material is introduced within a key stage; the statutory end-of-key-stage requirements should not be interpreted as a rigid ability or age gate for an individual learner. Home-education pathways can revisit prerequisites, change pace and use interests as entry points while keeping essential content visible.

| ID | Official source | Use in this map |
|---|---|---|
| `dfe-primary-programme` | [National curriculum in England: mathematics programmes of study](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study) | Authoritative statutory scope, with a year/domain reference on every objective. The page was last updated 28 September 2021 and was checked on 18 November 2026. |
| `dfe-primary-pdf` | [Mathematics programmes of study: key stages 1 and 2](https://assets.publishing.service.gov.uk/media/5a7da548ed915d2ac884cb07/PRIMARY_national_curriculum_-_Mathematics_220714.pdf) | Official printable companion, including the written-method appendix. |
| `dfe-primary-guidance` | [Teaching mathematics in primary schools](https://www.gov.uk/government/publications/teaching-mathematics-in-primary-schools) | Non-statutory core-concept and prerequisite context. It supplements the complete programme and does not replace it. This map does not claim to reproduce the guidance’s numbered ready-to-progress criteria. |

The statutory statements have been paraphrased and grouped into original planning objectives. The small steps, proposed investigations, access requirements and evidence prompts are original design proposals. They are not quoted White Rose small steps, an official White Rose product, a validated sequence or a substitute for mathematical and teaching review. Non-statutory examples inform the design without being relabelled as extra statutory requirements.

Contains information from the Department for Education licensed under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/). Crown copyright applies to the underlying official publication. Third-party material, where separately identified, has its own terms. The linked government documents are not bundled into this project.

## Coverage cross-check

All statutory primary domains are represented. Related statutory statements are grouped, so the number of objectives is not the number of statutory bullets or finished lessons. Fluency, reasoning and problem-solving run through every domain.

| Stage | Grouped objectives | Partial starter support | Planned | Domain coverage |
|---|---:|---:|---:|---|
| Year 1 | 16 | 0 | 16 | Counting/place value; addition/subtraction; equal groups/sharing; halves/quarters; practical measure, money, dates and clocks; 2-D/3-D shapes; position/turns. |
| Year 2 | 22 | 0 | 22 | Place value/counting; all four operations; fractions; standard measures, temperature, money and time; shape properties, symmetry, patterns and turns; introductory data displays/questions. |
| Year 3 | 23 | 1 | 22 | Numbers to 1,000; column calculations; 3/4/8 facts, written methods, scaling/correspondence; tenths, fractions, equivalence and common-denominator operations; measures, perimeter, money, clocks and calendar durations; models, angles and lines; scaled data. |
| Year 4 | 29 | 8 | 21 | Four-digit place value, counting, negatives, rounding and Roman numerals; column calculation; tables to 12 × 12, factors, mental/formal multiplication; fractions and decimals; measurement conversions, perimeter/area, money/time; classification, angles, symmetry, coordinates, translation and data. |
| Year 5 | 32 | 21 | 11 | Numbers to at least one million; calculation, factors/primes/powers, short division and long multiplication; fractions/decimals/percentages; metric/imperial measures, area, volume/capacity and time; 3-D views, angles, polygons, transformations, line graphs and timetables. |
| Year 6 | 33 | 0 | 33 | Numbers to ten million; all formal operations and estimation; fraction/decimal operations and equivalents; ratio, percentages and similar shapes; early algebra; measurement, area/volume; constructions, nets, angle reasoning and circles; four-quadrant transformations; pie/line graphs and mean. |
| **Total** | **155** | **30** | **125** | **No objective or course is marked complete.** |

Specific easily missed requirements are included: Year 1 notes as well as coins; Year 2 temperature and vertical symmetry; Year 3 Roman clock numerals, calendar/leap-year facts and correspondence; Year 4 history of zero/place value and time-unit conversions; Year 5 imperial approximations, simple rates and hundredths/thousandths; Year 6 remainders in context, miles/kilometres, unequal sharing, two-variable enumeration, nets, circle parts and mean.

## What the resource labels mean

`partial` means a directly relevant **starter workshop was inspected in source**. It does not certify its browser behaviour, device accessibility, teaching effectiveness, complete statutory coverage or a learner’s understanding. `planned` means no complete objective-aligned teaching sequence has been verified. An existing investigation may still provide a useful entry point.

`activity_ids` refer to homepage investigations and remain separate from `resource_paths`, which point to curriculum workshop files. Investigation links are proposed contextual or prerequisite support. For example, Painted Cubes can make hidden cubes and layers accessible without covering the whole Year 6 volume programme; Mastermind’s score summaries may motivate mean without teaching it. None of these links makes a topic complete.

The following local sources were inspected:

- `development/year4/curriculum.json` and the seven workshop modes in `development/year4/index.html`.
- `development/year4/multiplication.html` and `development/year4/block-workshop.html`, including array, equal-group and exchange controls.
- `development/year5/curriculum.json` and the seven modes in `development/year5/place-value.html`.
- The 14 Year 5 unit pages and `development/year5/units/units.js`, including the five task definitions per unit.
- `development/curriculum/pathways.json` and the existing course-build plan.

The current Year 5 statistics unit contains **bar-chart** tasks. These are useful prerequisites, but the statutory Year 5 targets are **line graphs and tables/timetables**; both remain explicitly planned. The Year 5 volume unit supports exact cuboid counts, while estimation and practical capacity work remain gaps. Written methods, imperial measures and several independent practice sequences also remain incomplete despite the presence of a named unit page.

## Progression, accessibility and evidence

Every objective has stable prerequisite IDs, a practical or visual entry, a formal goal and a gap description. The earliest prerequisites are explicitly labelled `entry:` skills. These are suggested planning links; a learner need not pass every linked task before being offered an interesting investigation.

Separate accessible participation from full analysis. A younger learner can arrange cubes, sort shapes or move a robot; a later learner may analyse variables, prove completeness or justify a formula in the same environment. Measure what the learner actually demonstrates.

Each eventual lesson should connect physical materials, an interactive model, language and notation. It needs touch, keyboard and button alternatives; clear labels beyond colour; optional reduced motion; readable adjacent prompts; and no compulsory timer. In formal calculation, separate understanding of the structure from speed of fact recall.

Evidence should include an unprompted changed example, an explanation or demonstration, and a later revisit. Record support used, first response, retries and representation. An automatically checked numerical answer is not a substitute for explaining a method or transferring it to another context. Visits, activity completion, XP and hints do not by themselves establish mastery or identify a learning need.

## Remaining uncertainty and checks

- The curriculum mapping is a structured desk review. A primary mathematics specialist should check the grouping, prerequisite edges and future lesson sequences before a course is advertised as comprehensive.
- Suggested investigation links require the separate activity-behaviour audit, including mathematical correctness, input accessibility and real-device checks. Source inspection is not runtime verification.
- The map covers statutory mathematics for England. It is not a claim of alignment to Wales, Scotland, Northern Ireland or any other national programme.
- Year 4/5 workshop manifests state earlier development and test results. Those reports were read as project metadata, not re-run or independently certified here.
- No new learner data, secure accounts, assessment scores or diagnoses are created by this map.
- Curriculum and guidance URLs should be reviewed before each course release; the retrieval date is recorded in the JSON.

## File and validation

`primary-map.json` is the deliverable. `build-primary-map.py` holds the same original planning text in a reproducible data builder. Validation checks unique objective IDs, resolving prerequisite references and the existence of every mapped workshop path. The map contains 155 objectives and no completed-course claims.
