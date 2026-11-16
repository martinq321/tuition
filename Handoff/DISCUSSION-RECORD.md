# Maths Wednesdays — reconstructed discussion record

Date: 16 November 2026.

## Export scope and limitation

This is a topic-complete handoff reconstruction of the supplied conversation context, not a verbatim export of the entire original ChatGPT thread. The supplied history contains many user messages but not all intervening assistant answers, file versions or deleted material. Those cannot be truthfully reconstructed as exact messages. Use ChatGPT's own conversation/account export if a verbatim archive is required. The task plan and JSON describe the current deliverables and explicit remaining work; do not infer that every historical request is implemented.

## Project purpose and teaching model

Maths Wednesdays began as a collection of interactive puzzles supporting individual tutoring. The full experimental site is martinq321.github.io/puzzles; student sites are maths-wednesdays, then maths-wednesdays-j and maths-wednesdays-k. The intended destination is a coherent UK-specific learning service for tutoring, home education and potentially schools, with personalisable curriculum, goals, assessment, parent support, training, subscriptions and selective activity access.

The user wants to build continually, select or reject ideas, and develop the best ones. The model combines aesthetically appealing digital investigation with inexpensive physical materials, then appropriate consolidation. Tutors may skip consolidation during contact time and set it as homework with parent notes, or offer a parent session every two months. Children should look forward to using the site rather than experience excessive screen-based drill. Accessibility to a task and the depth of its full mathematical analysis must be distinguished throughout.

## Learners and session context

Jamie had criticised early Lego activities as babyish; working in the kitchen for two sessions reduced distraction and improved engagement. Marshmallow-and-spaghetti construction, the website with a physical Hanoi game, and a bear game to finish were successful approaches. Cassie reported increased interest in mathematical activities. The proposed discussion with her emphasised choice, confidence, curiosity, adjusted pace and manageable challenge; helping Jamie tolerate uncertainty, checking an answer and revising an approach without treating avoidance as a diagnosis. Cassie mentioned Jo Boaler's MOOC and Youcubed. Kai was described as keen, enthusiastic and strong in logic. Both learners' times tables and mental arithmetic need support. These are informal teaching observations, not assessments.

Activities should look mature enough for hard-to-reach teens where appropriate, with separate appealing options for younger children. Possible narratives include a working magic village, world-building and an influencer/social-media business simulation. Gold/points were considered but not established as a compulsory reward system. Art-therapy, attachment and ACE-related educator context was discussed; it must not become diagnostic labelling from game behaviour.

## Site and menu preferences

The student homepage should have one main link per activity, with helper pages linked from the activity rather than cluttering the index. Historical groups: Mastermind, 15 game, Dobble, Josephus, Hanoi, Bridge Lab; Times Tables and Memory; multiply/strategy/cipher activities; Pixel Art, Build a Robot and Enigma Explorer. Secret Messages is the A→D activity. Sprouts and Robot Trails were added. River Crossing was initially excluded until introduced, then later explicitly requested on student menus. Painted Cubes, Curve Lab, Code Grid and String Lab were subsequently requested. Rejected cube challenges should be removed from menus; retain Explore 30 Cubes and Euclid take-away. In future provide full Puzzles and shared J/K indexes together. All three themes should be available, with Orbital the default. Preserve filenames such as robot-trails.html where actually used; verify rather than guessing a rename.

## Mastermind

Requests: one play-page homepage link; helpers from that page; optional remaining combination counts per guess; local profiles; session and overall averages; settings-specific records; unfinished games visible; clear controls. Optional timed play should support countdown and count-up, with timed statistics separate and located at the bottom. Timer controls must be compact. Remove undo. Reveal the solution on timeout. Separate solved-only average guesses/time, timeouts and unfinished games; do not allow abandoning games to silently improve the record. User sample: 16 solved, 72 guesses, 4.50 solved average, five timeouts, average solve time 25 seconds, one-minute limit. The handling of failures requires an explicit score definition rather than invented average solve times for failures.

Educational extensions: logical starter activity, deduction versus rote strategy, probability and expected guesses, exhaustive colour-testing, Knuth and alternative algorithms, Mathematica simulations. Claims that a starter improves general cognition need evidence rather than assumption. Two-player online play, persistence, SQL/database options, running costs and authentication were raised.

## Dobble

The current task is investigation-led creation and stabilisation: custom cards, stickers/blank cards, a clear challenge, systematic pair testing, and finite-plane/grid extensions without handing over the Fano-plane answer at the outset. New supplied pages implement small decks, all-pair checking, labels, import/export, printable cards, optional Fano builder and finite-grid construction for prime orders 2, 3, 5. Existing solo and multiplayer page behaviour still needs a real-browser audit.

## Curves, string constructions and geometry

A BMX ramp motivated Jamie's curves session: the fastest descent problem is brachistochrone, not parabola. Requested linked interactives: ramp races, touch-plotted coordinates with optional left-to-right joined segments and ball release, ellipse pool with pull-back cue, and parabolic reflection/radar. Accuracy concern: ellipse pool sometimes pots shots outside the focus condition. Later extensions: strings/nails at integer coordinates, curves from straight lines, ruled surfaces and twisted towers inspired by videos, hyperbolas, conic sections, straight-sided pool reflection and projectiles under gravity. Real craft materials should accompany digital inspection.

String Lab was uploaded at repository-root string-lab/. Homepages pointed incorrectly to sessions/string-lab/index.html. Both student repositories were checked; complete folders exist at the root. This package corrects all three homepages to string-lab/index.html and includes the folders. J and K differed only in Curve Lab's default theme; the shared package keeps J's Orbital default.

## Painted cubes, factor investigations and Euclid

Youcubed Painted Cube prompted a digital/physical sugar-cube session: rotate the large cube, inspect smaller cubes, classify by painted faces, use red/yellow/blue or blue-only, increase to 6×6×6 and 7×7×7. User rejected confusing explosion effects; move selected groups into buckets, retain buckets and final frame, keep other groups visible, and permit slow/paused inspection. Remove redundant break-apart, extra auto-sort and choose-small-cube panels. Blue-only default; spread slider starts at zero but remains enabled.

Physical planning included 250 sugar cubes, acrylic paints/pens, brushes, table protection, joining cubes and managing mess; no current procurement/adhesive recommendation is verified in this package. Other Youcubed developments: 30 Cubes, factor shapes for arbitrary targets such as 30/48, unconstrained exploration before visible constraints, square packing and Euclidean take-away. Slider exactness, too-wide ranges, unwanted zooming and shaking were recurring issues. Grid should shrink to fit instead of causing scrollbars. Factor tree: brighter harmonious colours, primes on the bottom same colour, branches should not emerge awkwardly from the word Split.

## Packing and computational work

Minimum square tilings of rectangles, coprime extensions, consecutive n by n+1 cases, algorithms/proofs versus general closed forms, and example guesses for 11×13, 7×8, 5×8, 5×6, 13×17 and 16×17 were discussed. Requested Mathematica-callable and Bash-callable C++ algorithms, compilable Mathematica versions and website visualisation. Historical guesses are not accepted as verified records. Any solver task must state objective, allowed rotations/sizes and proof of optimality separately from a found packing.

## Construction, coding and manipulation

Bridge Lab should permit designing from scratch, blank/simple starting bridges and examples; prior problems included tests failing and drawing continuing after release. Sprouts needs intuitive legal drawing and investigations. Robot Trails: small jigsaw commands that lock precisely, loop wrappers manipulated by touch/drag, coherent controls, additional up/down and level challenges, standing robot with visible facing direction, no unwanted forward arrow, slab numbers in isometric perspective, and a fixed camera. Code Grid: Python-style commands without typing, helper functions, visible loop extent, emoji/robot on a square grid. Polyominoes/pentominoes should support touch rotation and flipping without pieces disappearing; buttons should be usable.

Cut-and-rearrange: shapes into squares/rectangles, cut hints, precut examples, 4/5-cut extensions, slide pieces by centre and rotate via corners; automated pieces must remain visible instead of sliding underneath each other.

## River, plants and coding stories

River Crossing should become a richer cargo/constraint investigation, with extensions including solvable route/TSP problems and power sums for stronger learners. Keep clear task goals. Animation requests: boat wave motion, cargo visible, natural child-friendly wolf/goat/lettuce consequences, fat wolf/licking lips, no 'munch munch', no wholesale redesign.

Magic Money Plant: initial a mother plants, b regular plants and c coins, each at most nine; mother yields one coin and two seeds/day, regular yields one coin/day, seed grows next day. Explore end days 2/3/X and 427 coins after day 10. Automation should be stepwise for small days, without tempting solve-all. Larger plants/coins, stacks and explicit phase/day advancement; prevent repeat-click growth within a day. Extensions: offspring become mothers, delayed growth, random mother/non-mother offspring totalling two; analysis and Mathematica requested.

Scytale: cylinder text must align physically, visible animated wrapping/unwrapping without hiding transition, flat strip typing/inspection, optional colour coding, zoom/scroll and reliable initial display. Practical materials included non-sticky thin paper rolls and dowels. Story ideas: shaved-head messenger, Roman codes, Mary Queen of Scots, Enigma, one-time pads and simple RSA; Usborne detective/spy handbook inspiration. Distinguish scytale transposition from Caesar substitution.

## Creative scene builders

Robot customisation: Robosapien as rough inspiration, appealing face, proportion/body/shoulder/tummy/foot controls, hand/pincer options and balanced whole-body colour schemes including rainbow limbs. Related shark-family underwater scenes with seaweed/coral, sizes, colours, glasses/beards/expressions; dragons and dinosaurs inspired by favourite picture books. Include deselect-all. Use original assets/designs and review commercial rights rather than assuming inspiration licenses copying.

## Creature Studio and Escher: latest work

Requested creature page from Mathematica StackExchange formula-millipede discussion, developed into full sessions for J/K. Both worm1.nb and worm2.nb were found and their input cells inspected. They contain a golden-ratio-scaled sin(3t), sin(2t) route, local rotations, body-width/taper controls and phased legs. The browser implementation is original and simplified, using approximate arc-length spacing, not an exact notebook execution. Includes presets/touch drawing, 3:2 notebook route, width/taper/legs/phase/speed, pause/step, save/load and optional leg-total reveal. Companion printable session separates practical entry, multiplicative reasoning and advanced moving-frame mathematics.

Escher source: 3Blue1Brown's Print Gallery article/video, involving complex logarithms and conformal maps. Supplied page has original nested illustration, scale/turn experiments, logarithmic unwrap and complex-power grid; seam/origin behaviour is explicit. It is not a calibrated reproduction of Escher's artwork. Touch drag was added to unwrap inspection.

## Curriculum, infrastructure and commercial strategy

Requests: organise by themes and narrow by age/key stage; align original work to government curriculum and White Rose sequence; create original consolidating questions from uploaded examples; personalisable homeschooling KS1–5 routes, aims/goals, assessments and monitoring. Educator notes should be off child-facing main menus or via a discreet activity link; later separated by login.

Security/admin: accounts, parent/learner/tutor roles, selected activity access, locking not-yet-taught work, secure hosting, payments/subscriptions, administrator toggles, private tuition chat, shared games and eventual app. Hiding links alone is not security; a static delivered website cannot prevent copying its client assets. The Python/SQLite pilot supplies part of this and is included separately, not represented as commercially ready.

Assessment/reporting: track strengths/difficulties with meaningful evidence; automate draft report writing and support suggestions, with educator review. Do not diagnose SEND from gameplay. Include exploratory reasoning and transfer, not only scores, hints or speed.

Business hierarchy: tutoring aide → homeschool aide/workshops → small paid puzzle/learning service → schools/training/INSET → larger contracts where evidence and capacity justify them. Government procurement, local contacts (including Kate/Telscombe as mentioned), business training, hiring good educators, design outsourcing and YouTuber collaborations were raised. Educational psychology after psychology conversion may complement evidence-building but is not a substitute for validation. Test materials across different educators so success does not depend solely on exceptional teaching.

Evidence/pilots: start feasibility/usability with tutoring, then homeschool and school settings; distinguish service evaluation from research requiring approvals. Measure engagement, independent explanation, transfer, teacher/parent workload and adverse/disengagement experiences. Clinical and diagnostic claims require stronger justification. The supplied development plan specifies future work, not an achieved evidence base.

Further content: White Rose-inspired primary partitioning and operations; GCSE circle theorems/trig/algebra via scales; A-level calculus/statistics/mechanics; junior/higher Olympiad geometry and animated worked steps; proof-writing investigations; practical numbers, weights and scales; 3D/4D minesweeper and complexity/probability; Alex Bellos, Martin Gardner, Cut the Knot, NRICH, Numberphile and mathematical games sources. AI's implications for mathematical education and the user's own proof practice were also raised.

## Administrative requests carried in the historical thread

Invoice request: locate prior CHB invoice for Jamie, same format, dates 16/09/2026; 4, 11, 18, 25 November; 2, 9, 16 December, plus email text to Sam Barber. This is outside the present website package and is not marked complete. Earlier requests to export chats/update JSON and provide catch-up ZIPs should not be mistaken for evidence that all earlier files were recovered here.

## Exact latest instructions (available in this turn)

- “make v3 zip self contained (include whole puzzles site) so I can open offline and look at it from my desktop”
- “also make a j/k version (currently same) so I can see working before I upload to git”
- “then continue wioth other tasks”
- “then write plan hierarchy and export entire thread and json so I can ask another instance to complete task 1, etx. should be entire development strategy - eg - stabilise and check page X might be a task. passowrds mioght be a task, graphic design UX; lockability / admin / etc. all from discussion above. should lead to fully developed site I can use commercially”

## Current handoff boundaries

See project-state.json and DEVELOPMENT-PLAN.html for numbered tasks and acceptance criteria. New interaction logic and local links were tested. No full browser/phone visual pass was possible because the managed preview service was already occupied. No GitHub repository was pushed and no production server was deployed. The ZIP is for local review and controlled upload.
