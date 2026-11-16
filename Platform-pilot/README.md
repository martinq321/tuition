# Maths Wednesdays — platform pilot v0.2

This is a separate, runnable starting point for the tutoring and homeschooling platform. It does not replace, copy or modify your current GitHub websites. It contains all source files for this pilot, not the entire existing puzzles collection.

## Start on Windows

1. Install Python 3.10 or later if needed. No Python packages are required.
2. Extract the ZIP completely.
3. Double-click CREATE-TUTOR-WINDOWS.bat. Choose a username, display name and password of at least 12 characters. Password typing is deliberately invisible in the terminal.
4. Double-click START-WINDOWS.bat and leave its window open.
5. Open http://127.0.0.1:8000 in your browser. Sign in with your tutor account.
6. In Learners & access, create a fictional practice learner. Set activities to hidden, locked or open.
7. In Set homework, choose an activity and a goal. Assigning opens that activity.
8. Sign out, then sign in as the learner to do the questions. Sign back in as tutor to review Progress.

On macOS/Linux, run `python3 server.py --create-tutor` once, then `python3 server.py` from this folder. On Windows the equivalent command is `py -3 server.py`.

The browser address works only on the computer running the server. This is not yet an online service. Double-clicking index.html or uploading this folder to GitHub Pages will NOT provide functioning accounts. To stop, press Ctrl+C in the server window.

## Working now

- Tutor and learner logins, salted scrypt password hashes, expiring HttpOnly sessions, CSRF checks and login throttling.
- SQLite persistence on the server, outside public assets.
- Per-learner hidden / locked-preview / open access, checked by the server both for protected pages and marking endpoints.
- Tutor-created learners, assigned learning goals and review dates.
- Three original sample investigations: factor arrays, painted-cube layers, touch plotting of square-number curves.
- Nine server-marked numeric questions with recorded answers, timestamps, correctness and hint usage. Answer keys never sent with the question response.
- Responsive navigation, theme filters, key-stage filter, three colour themes with Orbital default.
- Tutor progress view and learner personal tasks. All attempts retained, including unsuccessful ones.

## Important limits

This is a local pilot, not audited production software. Keep test accounts fictional until a hosted release has been reviewed. The built-in Python HTTP server is intended for development. There is no email-based self-service account recovery, parent role, subscription checkout, email, multi-tutor ownership isolation, scheduled release, portfolio upload or automated report generation yet. All tutors in this pilot can see all learners. Do not offer it as a multi-tutor service.

Payments are NOT connected, and no payment details are collected. There is no subscription enforcement yet. Learner permissions are real but govern only these three sample investigations. Publicly available files on the existing GitHub sites remain public. Protected front-end code can still be copied by an authorised visitor; no web product can promise copy-proof browser content.

The curriculum framework now spans early years through post-16, with a draft Year 4 topic crosswalk. It is not a complete official curriculum alignment. Uploaded White Rose documents are used as planning references; their worksheets are not redistributed. The catalogue has three KS2 entries; filters for other stages currently return an honest empty state. Age is guidance, distinct from depth. The points explorer is a new small sample, not the full existing Curve Lab. The cube sample is a layer view, not the full 3D painted cube.

## Files and maintenance

- `server.py`: authentication, database, access controls, assignment endpoints and private answer bank.
- `catalogue.json`: canonical activity records used by all accounts.
- `public/`: interface and interaction code. Never place database files or answer keys here.
- `private/activity.html`: authenticated activity shell.
- `data/platform.sqlite`: generated after setup; private user records and learning history. Never commit or share it.
- `PROJECT-STATE.json`: implemented versus planned features.
- `ROADMAP.md`: integration and deployment plan.
- `tests/test_platform.py`: integration tests for role boundaries, marking and locks.

Back up the database only while the server is stopped. Keep backups private. To make a clean demonstration, move the data folder somewhere secure and create a new tutor; this starts an empty database. Do not delete a real pupil's data casually.

## Tests

Run `python -m unittest discover -s tests -v` (or `py -3 -m unittest discover -s tests -v`). Tests use a temporary database and an ephemeral loopback port, and never modify your working records.

## New in v0.2: Admin and curriculum

After tutor sign-in choose **Admin**, or open http://127.0.0.1:8000/admin. Learners cannot open this route or use its management endpoints.

- Create accounts through Add learner.
- Rename, suspend/reactivate, or reset a learner password. Suspension/reset immediately revokes existing sessions.
- Open, lock or hide a theme in one operation; individual overrides remain in Learners & access.
- Preview the learner menu without impersonating them or submitting work.
- Everyone can change their own password in My account (requires their current password).
- Curriculum provides all-age planning routes and Year 4 detail, with honest content-gap labels and official source links.

The tutor role is the administrator in this single-tutor pilot; separate administrator/staff roles and organisation ownership are not yet implemented. Audit events are recorded for account changes and bulk access updates. Live chat/video/game rooms remain planned, not implemented.

For an upgrade: stop v0.1; back up its data folder; extract this release to a new folder; copy the data folder into it; launch normally. The database migration adds account status and audit fields automatically. Do not recreate a tutor if you have copied your existing database.

See CURRICULUM-FRAMEWORK.md for the evidence, scope and remaining mapping work.

## v0.3 additions

Practice studio: 14 rule-based question families. Tutors can release topics and create sets; linked parents and learners can generate further sets only in released topics. Arithmetic exchange settings support exact no/one/multiple exchange constraints. Two-digit positive subtraction cannot have two exchanges; choose 3 or 4 digits. Print using the browser's Print / Save PDF command. Parent answer keys are served only to linked parents and tutors; a worked example is available to learners as deliberate support. Numeric/fraction answers are marked exactly. Reasoning prompts are for discussion, not machine grading.

Family: create parent accounts, link/unlink learners, and set chat/gameplay permissions. Parent views are restricted to explicitly linked learners. Teacher accounts still share one organisation; this remains a single-tutor pilot.

Tuition rooms: private tutor-and-learner rooms, persisted text chat and server-validated Mastermind. One participant sets a secret; the other guesses. Repeated colours are allowed. Start a new round to swap roles. Tutor can pause, disable chat or end the room. Secret codes are not sent to the guesser until the round ends. Updates are polled every two seconds, not WebSocket streaming. Membership and learner settings are checked server-side.

To try rooms locally, use two different browser profiles (or a normal and private window), one signed in as tutor and one as learner. This does not make the service available online. Online tuition still requires hosting, HTTPS and a production review.

No payment processing, video calling, public messaging, automated SEND diagnosis, complete national-curriculum course or migration of your full existing site is included. New-round replaces the current game's board; session messages remain. A full historical per-round score ledger is future work.
