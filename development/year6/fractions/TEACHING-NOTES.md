# Year 6 fractions — teaching and pilot notes

Status: implemented, exact-tested and representatively browser-checked; actual learner and physical-device pilots pending. Twelve lessons, 102 practice tasks, 20 fresh review tasks.

[Open the block](index.html) · [Educator view](educator.html) · [Coverage data](coverage.json)

# Year 6 fractions — scope and coverage specification

Reviewed 18 November 2026. Jurisdiction: England. This is an original Maths Wednesdays teaching block, informed by the statutory programme and the public small-step approach; it is not an official White Rose product.

## Boundary of this block

The fractions block addresses mapped objectives **Y6-FR-01 to Y6-FR-05**. It includes equivalence, simplifying, comparison/order, unlike-denominator and mixed-number addition/subtraction, multiplication of proper fractions, division by positive whole numbers, and fraction/division/decimal/percentage connections. Fractions of quantities and finding the whole consolidate earlier learning and support application.

**Y6-FR-06 and Y6-FR-07 remain for the decimal-calculation block.** General decimal place value, scaling by powers of ten, decimal multiplication, written decimal division and specified rounding are not made complete by a few conversion examples. The site map groups fractions, decimals and percentages together, so its domain title must not imply that all seven objectives are finished here.

Division by a fraction, reciprocal algorithms for arbitrary divisors, algebraic fractions and recurring-decimal proofs are beyond this block. Optional enrichment must be visibly distinguished from core Year 6 work.

## Recommended twelve-part sequence

The sequence below is a proposed organisation. Names may change to match the learner interface; the content requirements should remain.

| Part | Mathematical goal | Manipulable representation | Independent evidence and reasoning |
|---|---|---|---|
| Same amount | Recognise and create equivalent fractions; keep the whole fixed | Equal-length strips; partition one strip more finely; aligned number-line positions | Complete missing numerators or denominators; reject a non-equivalent example; explain why both counts change together |
| Simplify | Use common factors; distinguish simpler from simplest | Join equal adjacent parts; grouped counters or a factor relationship | Simplify with more than one possible first factor; explain why the result cannot simplify further |
| More than one | Connect improper fractions and mixed numbers as prerequisite repair | Several identical wholes plus a number line extending beyond 1 | Convert both ways; identify a fraction between 1 and 2; explain what the remainder means |
| Compare and order | Choose an efficient comparison, including values greater than 1 | Same-whole strips and a number line; common-numerator and common-denominator comparisons | Compare with different denominators; order at least three mixed/improper values; justify rather than rely on appearance |
| Add parts | Use a shared unit for addition; move from related denominators to different factors | Join two labelled lengths while retaining original whole and common partition | Solve sums with and without a result above 1; recognise the error in adding denominators; simplify |
| Take parts away | Subtract using equal-size units | Remove marked cells or show a difference on an aligned line | Solve differences with related and unrelated denominators; explain the denominator; keep non-negative core examples |
| Mixed calculations | Add mixed numbers and subtract by exchanging a whole when needed | Whole tiles and fractional tiles; exchange one whole for denominator-many parts | Include a genuine exchange case and multi-step context; choose a method; give an estimate before calculating |
| A fraction of a fraction | Multiply simple proper fractions and simplify | Partition a rectangle horizontally and vertically; label each original whole | Connect overlap count to the product; include a product needing simplification; explain why the result is smaller than either positive factor below 1 |
| Share a fraction | Divide a proper fraction by a positive integer | Split a fractional strip fairly among recipients; subdivide original units | Include a numerator divisible by the divisor and one that is not; explain why the denominator may grow and why the whole does not change |
| Amounts and missing wholes | Find a non-unit fraction of a quantity, then invert the relationship | Sets with equal groups; bar models with one part identified | Find an amount, then find a whole from a known fractional part; use units and contextual interpretation |
| Three ways to write it | Relate fraction to division; use common decimal and percentage equivalents | Hundred grid, strips and division recording; distinguish 1 whole from 100% | Calculate a decimal such as an eighth-based fraction, match familiar equivalents, and compare mixed forms in a context |
| Choose your method | Select and combine operations across a problem | Learner-selected bar/set/area model; practical measuring alternative | Multi-step applications, missing values and an error-analysis question; explain the chosen operation and check reasonableness |

## Curriculum evidence mapping

| Mapped objective | Core content in this block | Evidence to collect |
|---|---|---|
| Y6-FR-01 | Same amount; simplify; more than one; compare/order | Correct equivalent forms, fully simplified answers, an ordered mixed set, and explanation of a comparison strategy |
| Y6-FR-02 | Add; subtract; mixed calculations; method choice | A non-related-denominator sum, an exchange subtraction, a contextual problem and explanation of the shared unit |
| Y6-FR-03 | A fraction of a fraction | Product from area partitioning and symbolic calculation, simplest form, reasoning about magnitude |
| Y6-FR-04 | Share a fraction | Fair-share model and independent calculation in both numerator-divisible and numerator-not-divisible cases |
| Y6-FR-05 | Three ways to write it; relevant applications | Fraction interpreted as a quotient, calculated terminating decimal, recalled equivalent forms and contextual comparison |
| Y6-FR-06 | Outside this block | Keep planned for decimal calculation |
| Y6-FR-07 | Outside this block | Keep planned for decimal calculation |

“Covered” means teaching material and assessment opportunities are supplied. It does not mean a learner has mastered the objective or that the block has passed a real learner trial.

## Minimum question variation

Each part needs more than one numerical variant. The independent set should vary representation or reasoning as well as number size. Across the block include direct calculations, missing-number equations, comparison/order, contextual problems, plausible misconceptions and an explain/justify prompt. Use selected-response tasks sparingly and require a fresh constructed answer after feedback.

For the mixed review, sample every mapped objective and include a new transfer context. Record first response, hints/examples opened, retries and unfinished tasks. Distinguish an equivalent correct value from a requested simplest form. Do not silently treat an open explanation as machine-marked. A learner may discuss, draw, manipulate physical materials or type; written fluency should not become an unintended entry requirement.

## Mathematical and interaction safeguards to check

- Keep the reference whole identical when comparing or combining fractions; explicitly label multiple wholes.
- Fractions count equal parts. A convincing diagram must not show unequal-sized pieces under the same denominator.
- Compare exact rational values. Avoid floating-point tolerance accepting the wrong fraction.
- Treat equivalent unsimplified answers as the right value but unfinished when simplest form is explicitly requested.
- A mixed number is a whole plus a fraction; avoid parsing a space as multiplication.
- Author diagrams with positive denominators and positive whole-number sharing counts. Reject denominator zero and malformed input. The answer parser may normalise a negative denominator to an equivalent rational value; that is separate from the visual teaching convention.
- Give numerator-divisible and non-divisible examples for fraction divided by an integer. Dividing the numerator is optional when exact, not a universal rule.
- For non-zero proper-fraction multiplication, show why the product is smaller; do not teach that multiplication always enlarges.
- A percentage input represents a fraction of 100. Put the percent unit visibly beside the numeric entry and check the expected percentage number; never silently reinterpret 0.25 as 25%. An optional typed percent sign is a player convenience, not a change to generic fraction parsing.
- Number-line positions, area overlaps and set partitions must agree with the calculation. Preserve answers and model state when moving between panels.
- Every drag action needs a tap/button or keyboard route. Labels, pattern and position must carry meaning alongside colour.
- Animations must pause or advance in steps, preserve a readable final frame and honour reduced-motion preferences.

## Sources and licensing

1. Department for Education, *National curriculum in England: mathematics programmes of study*, updated 28 September 2021, Year 6 fractions section and non-statutory guidance. Checked 18 November 2026. The statutory scope is paraphrased; Crown copyright content is available under the Open Government Licence v3.0. https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study
2. White Rose Education, *Year 6 Scheme of Learning: Small Steps, Autumn*, ©2022 public overview, Fractions A/B. Checked 18 November 2026. Used as a sequencing reference only; no proprietary teaching prose, diagrams or questions reproduced. The publicly accessible PDF is dated 2022, so it is not described as a newly issued 2026 scheme. https://assets.whiteroseeducation.com/new-schemes/Y6%20Scheme%20of%20Learning%20Small%20Steps%20Autumn.pdf
3. White Rose Education, Year 6 resources catalogue, checked 18 November 2026. Current resource availability may change; the catalogue is not the statutory authority. https://whiteroseeducation.com/resources?subject=maths&year=year-6


# Year 6 fractions — tutor and home-education pilot

**Status: learner trial outstanding.** Software checks and mathematical review do not establish that the experience works well for a child. Do not mark the pilot complete until an actual learner has used it and the resulting changes are recorded.

## Before starting

Use a short conversation and a model, not a timed placement test. Ask the learner to show half, make three quarters, and explain why two quarters equal a half. Offer a mixed-number example if these are secure. Check the meaning of the whole and equal parts before asking for procedures. Weak times-table recall can be supported with a multiplication grid so that fraction reasoning remains accessible; note the support separately.

Have plain paper, scissors if appropriate, a pencil, a ruler and 24 counters or dried beans. Folded equal-length strips are enough for equivalence and operations. A small sheet of squared paper supports multiplication; inexpensive measuring cups or a marked jug support quantity contexts. No special equipment or food is required.

Choose one main idea per session. A lesson card is not a prescribed lesson duration. The learner can revisit earlier work, skip routine consolidation during tutoring, or practise later with a parent. Keep the screen as a useful model alongside discussion and practical work.

## A first 40–60 minute session

| Approximate time | Activity | What to notice |
|---|---|---|
| 5 minutes | Learner makes and explains a familiar fraction with folded strips | Do they identify the whole? Are pieces equal? Is numerator/denominator vocabulary understood? |
| 10–15 minutes | Explore one interactive model with a choice of starting values | Can the learner predict before moving? Do controls make sense without repeated adult direction? |
| 10 minutes | Switch to the physical equivalent and compare representations | Can they connect the same amount across paper, diagram and notation? |
| 10–15 minutes | Attempt a few varied independent tasks, with hints available | Record first response and strategy; distinguish a calculation slip from a conceptual error |
| 5–10 minutes | Discuss a misconception or new context; choose next activity | Can they explain, draw or demonstrate the idea? Which representation helped? |

These timings are flexible. Stop or change representation when the interface is consuming attention. It is better to develop one idea than rush through the route.

## Questions that invite investigation

- “What changed, and what stayed the same?”
- “Can you make a different fraction that lands in the same place?”
- “Can you compare those without doing the whole calculation?”
- “What would convince someone who chose a different answer?”
- “Will the answer be above or below one? Why?”
- “Can you make an example where that rule fails?”
- “Which model would you choose for this problem?”

Accept a demonstration or spoken explanation. Do not repeatedly demand written justification from a learner whose reasoning is clearer through movement or talk. Record the form of evidence rather than treating different forms as different standards of mathematical validity.

## Misconceptions and useful next moves

| What the learner does or says | A possible mathematical issue to investigate | Next prompt or model |
|---|---|---|
| Says an eighth is greater than a sixth because 8 is larger | Treating denominator as a whole-number magnitude | Fold two equal strips into sixths and eighths; compare one piece |
| Changes only the numerator when making an equivalent fraction | Not preserving the value of each part | Split every original part in two; count both selected and total parts |
| Stops at 6/8 when asked to simplify 12/16 fully | Understands equivalence but has not checked remaining common factors | Ask whether numerator and denominator still share a factor |
| Adds denominators | Combining different units as though they were the same | Align half and third strips over a shared sixths grid |
| Cannot subtract a larger fractional part from a mixed number | Whole-to-part exchange is not established | Replace one whole by denominator-many pieces before removing |
| Expects multiplication to give a larger result | Whole-number rule overgeneralised | Show half of three quarters as an overlap inside the original three quarters |
| Divides the numerator and gets a decimal numerator | Incomplete fair-sharing model | Subdivide every existing piece among the recipients and count one share |
| Finds the fraction amount when asked for the whole | Has not distinguished the known part from the reference whole | Mark known groups on a bar and reconstruct one group, then all groups |
| Matches 1/4 with 0.4 or 4% | Denominator read as decimal/percentage digit | Use a fixed hundred grid and compare a quarter with 25 out of 100 |

These are prompts for teaching, not diagnostic labels. Similar responses can have different causes; ask the learner to show their thinking.

## Evidence record

Use a learner code rather than a full name in exported records. Record the date, objective, task, chosen representation, first response, hints/examples opened, retries, unfinished work and a short observation. Distinguish a correct numerical answer from a convincing explanation and from transfer to a new problem. Do not infer confidence, anxiety, SEND or attainment from click counts or speed alone.

For each chosen objective, collect at least one fresh unaided task and a separate explanation or demonstration. Revisit a related but different task later. A local progress display is a practice record; it should not describe mastery merely because every task has been opened or completed.

## Learner usability observations to collect

| Observation | Record |
|---|---|
| Device, browser and input used | Desktop mouse, physical touchscreen, keyboard, or assistive input; record actual use |
| Starting point | Which prerequisite was secure and which needed a model? |
| First independent action | What did the learner try without an explanation of the interface? |
| Friction | Missed target, unclear label, lost state, excessive reading, unwanted scrolling or animation |
| Mathematical surprise | What did the learner notice or challenge? |
| Support | Which hints, adult prompts or physical materials were used? |
| Transfer | Can they solve or explain a new example away from the model? |
| Next revision | One concrete interface/content change, with reason |

## Release decision after the trial

1. Correct any mathematical or answer-checking error immediately.
2. Fix controls that obscure the model, lose a response or prevent touch/keyboard access.
3. Shorten instructions where the learner needed adult translation; preserve mathematical precision.
4. Add or change a representation where correct clicks did not produce an explanation.
5. Re-test the changed task before reusing the template for another complete block.

Keep the trial date and observed outcomes with the build record. Until this happens, describe the release as **implemented and software-tested; learner pilot pending**.

# Year 6 fractions — independent content audit

Reviewed 18 November 2026 against the generated `content.js` and the current scope document.

**Result:** all 102 practice answers and 20 mixed-review answers agree with independent recomputation. The twelve worked examples, contextual questions, explanations and reasoning notes were read separately. No wrong arithmetic was found. This is mathematical/content review, not a learner trial.

## Method and evidence

the independent Python content-audit script loads the published content object and uses Python's exact `Fraction` arithmetic. It does not import the question-generation script, its verification metadata or the site's answer checker. It recomputes 34 direct calculations from the written expressions, six comparisons and four ordering tasks. A further 78 contextual or representation questions have explicit expectations recomputed from their wording. Choice explanations were also checked manually.

The audit checks unique IDs, at least six practice tasks per lesson, two hints per task, worked solutions, objective IDs, a practical alternative, an explain prompt, and explicit simplest-form wording wherever the answer checker requires it. All twenty review tasks use fresh numbers or contexts; the standard ordering instruction is reused with a new set of values. Machine-readable results are in the build’s audit-results record.

## Coverage in the delivered sequence

| Objective | Lesson IDs | Review evidence |
|---|---|---|
| Y6-FR-01: equivalence, simplify, compare/order including above 1 | `equivalence`, `simplify`, `mixed`, `compare` | 1–4 |
| Y6-FR-02: unlike-denominator and mixed-number addition/subtraction | `add`, `subtract`, `mixed-operations`, `problems` | 5–8, 18 |
| Y6-FR-03: products of simple proper fractions, simplified | `multiply`, `problems` | 9–10, 19 |
| Y6-FR-04: proper fraction divided by positive whole number | `divide`, `problems` | 11–12, 20 |
| Y6-FR-05: fraction as division and familiar decimal/percentage connections | `connections`, `problems` | 15–17 |
| Earlier-learning consolidation: fraction of quantity and inverse whole | `quantity`, `problems` | 13–14 |

The multiplication tasks include area interpretations and products that need simplifying. Division contains both directly divisible numerators and examples that require subdivision. Mixed subtraction genuinely requires exchanging a whole. Ordering includes three values greater than one. Applied tasks distinguish a fraction of an amount from a known fractional part used to reconstruct the whole.

`connections` supplies a bridge into fraction–decimal–percentage work. It covers the mapped FR05 opportunities without claiming that the wider decimal domain is finished. FR06 and FR07 remain for the separate decimal-calculation block.

## Issues resolved during review

- Contextual questions whose checks required simplest form now explicitly request it.
- The two-day library problem specifies different books and no returns, removing an avoidable ambiguity.
- Conversion tasks specify the required answer format, so reproducing the starting representation does not pass a conversion objective.
- Comparison model readout uses neutral ordering punctuation rather than presenting every unverified order as a true strict inequality; equal values can sit together.
- Sharing model stock decreases as recipient shares increase, making conservation of the starting amount visible.

## Remaining limits

The separate engine, model and browser tests establish technical properties; this audit does not replace them. Spoken or written explanations and physical demonstrations require tutor judgement. Correct responses or completed cards are practice evidence, not a diagnosis or an automatic claim of mastery. A real learner pilot, physical-device observations and transfer to a fresh off-screen task are still outstanding; use the pilot guidance above to record them.

## Technical check record

Exact engine: 51,125 Node checks passed. Content: 122 expected answers and 71 independent arithmetic metadata checks passed. Separate Python Fraction audit: all 122 answers passed. Model state/maths: 55 checks passed. Learning records: 9 tests passed. The 122 question/checker/storage/reload/import API contract cases also passed. Browser review covered all 12 Explore screens, 48 worked-example steps, 102 practice and 20 mixed-review question renders. Representative actions included fraction splitting, multiplication shading, mixed-number input validation, selected-card ordering, wrong answer → hint → correct answer, unfinished records, explanation saving and profile isolation. The 390px and 320px CSS iframe viewports had no horizontal page overflow and retained readable task/controls. These checks are not exhaustive action testing. Physical mobile hardware and assistive technology were not tested. Reduced-motion media styles were inspected; the OS setting was not emulated. Actual learner, physical-device and off-screen transfer observations remain pending.
