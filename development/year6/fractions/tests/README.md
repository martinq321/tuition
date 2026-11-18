# Year 6 fractions verification

Run from this directory with Node.js and Python 3. No third-party packages are required.

```bash
node math.test.cjs
node content.test.cjs
node models.test.cjs
node progress.test.cjs
node player-contract.test.cjs
python3 scope-audit.py
```

The model test uses a small DOM stand-in and checks state/conservation. It does not claim browser, real touch hardware or screen-reader coverage. `player-contract.test.cjs` checks data → exact checker → records, not DOM events.

See `../QA-REPORT.md` for the separately performed browser checks. A real learner pilot remains pending; use `../educator.html` and `../TEACHING-NOTES.md`.
