# From local pilot to working online platform

## Next: import and catalogue

Audit the latest full Puzzles collection before copying pages. Assign stable activity IDs, theme tags, curriculum objectives, prerequisites, entry points, extension depth, practical companions and source/licensing notes. Do not infer a full curriculum mapping from an activity title. Start with the uploaded Year 3/4 schemes when available. Maintain one activity source with filtered menus rather than separate J/K copies.

Protected activity imports require a deliberate file-serving route that checks each request, including associated private assets. Do not add public links and describe them as locked. Existing public copies cannot be made private by changing this app. Prefer shared UI tokens and adapt each imported activity gradually.

## Next: production identity and hosting

Choose a production application host, private repository and database with backups. Replace the development HTTP adapter with a maintained production framework/server. Retain and expand access tests. Use HTTPS, Secure cookies (MW_HTTPS=1 is supported), verified password recovery, email-based recovery, tutor MFA and durable operational logging. Use managed identity where appropriate; never build payment-card handling.

Add a parent/guardian relationship model and restrict data by owner/organisation before introducing multiple tutors. Review child-data collection, retention, consent/appropriate lawful basis, deletion/export processes, accessibility and incident handling with qualified support. This document is a development checklist, not a legal compliance certification.

## Homework and evidence

Add question-bank authoring, immutable question versions, assignment instances, first-attempt summaries, question-specific retests, spaced revisits, unsubmitted/in-progress records and tutor observations. Current homework is one assignment per learner/activity: reassigning updates its goal and does not reset historical attempts. Current hint status is cumulative per learner/question. Do not interpret a game score as a diagnosis or mastery score. Proof and explanation tasks should initially be reviewed by a tutor.

## Subscriptions — not implemented

Use a hosted checkout and customer portal from a payment provider. Verify webhook signatures on the server, store unique event IDs for idempotency and reconcile subscription state. Keep subscription entitlement separate from tutor release. Define trial, grace-period, cancelled, unpaid and active access rules explicitly. Test expired subscriptions, failed renewals, duplicate/out-of-order events, refunds and parent account changes before taking money. Never trust a browser redirect as proof of payment.

## Personalised curriculum

Theme browsing and curriculum browsing share a catalogue. Add age-range, prerequisite, time, practical/screen and accessibility filters after verifying metadata. Create learner goals with adult override, essentials and optional depth, review points and portfolios. KS1–5 is a staged content programme; Years 3/4 are the first mapping pilot, not the entire curriculum.

## First live pilot acceptance criteria

A tutor can create/recover an account, enrol a learner with appropriate parent involvement, assign and revoke an activity, see exactly the learner view, set homework and inspect first attempts and support used. A learner cannot access another learner's records or bypass a lock through a URL/API. Backups restore correctly. Mobile and keyboard flows are checked. No paid plan is advertised until real checkout and renewal/revocation tests pass.
