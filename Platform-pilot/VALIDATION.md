# Validation record

Automated integration tests passed against a fresh, temporary SQLite database:

- Tutor and learner sign-in; password stored as a salted hash.
- Tutor-created learner; duplicate username and short-password rejection.
- Learner cannot change access or access other learner records.
- CSRF and cross-origin rejection.
- Hidden and locked pages reject direct URL access.
- Lock revocation also blocks further marking requests.
- Private source and database paths are not served.
- Answer keys absent from question payloads.
- Incorrect and correct responses preserved; hint use recorded.
- Assignment opens an activity and appears in the learner task list.
- Logout invalidates access.

Both JavaScript files passed `node --check`.

Browser visual, real touchscreen and assistive-technology testing have not been performed in this environment. Perform these before pupil use, alongside production security review. Automated tests are meaningful checks, not a claim that the software is production-secure.

Additional v0.2 tests pass: protected admin page, learner rejection at account-management endpoints, bulk permission change, suspension blocking new and existing sessions, password reset invalidation, self-password-change verification, and curriculum data restricted to tutor responses.
