# Maths Wednesdays — course development commands

Updated 18 November 2026. Scope: a comprehensive interactive mathematics pathway from Year 1 through Year 9, GCSE Foundation/Higher and standard A-level Mathematics. Existing Year 4/5 workshops and investigations are starting resources, not evidence that a whole course is complete. The curriculum map is a build specification; most teaching blocks remain to be built.

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

## Task 7 — complete Year 6, one block per command

Command: **Build the next unfinished Year 6 block from the approved map; finish, check and publish only that block.**

Suggested blocks: place value; four operations; fractions; decimals; percentages; ratio; algebra; converting units; perimeter/area/volume; statistics; shape; position and direction. Final sequencing and coverage come from task 2. After all blocks, run a Year 6 coverage and usability audit rather than claiming completeness from a lesson count.

## Task 7A — Years 1–3, one block per command

Command: **Build the next unfinished Year 1, 2 or 3 block from the curriculum map; state the year and finish only that block.**

Start with counting, cardinality, subitising and number composition; progress through place value, additive and multiplicative reasoning, fractions, measures, shape and applicable statistics. Use manipulatives, gestures, audio as an option, short reading demands and accessible tap/button alternatives. Do not assume a learner's age determines their entry point. Include practical materials and adult notes. Extend to formal explanations without making an easy entry visually babyish.

## Task 7B — Years 4–5, complete and repair existing work

Command: **Complete the next unfinished Year 4 or Year 5 block, retaining and improving its existing useful workshop.**

Audit the current five challenges and generated questions against every objective. Make representations manipulable, keep instructions beside the model, distinguish supported practice from independent transfer, add missing units and reasoning. Fix specific model/marking flaws before adding question volume. Trial with tutoring and home-education families, then update coverage evidence. Do not replace existing work with superficial duplicate pages.

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
