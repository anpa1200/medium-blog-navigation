# Local research-extension validation

Date: 2026-10-01. The reviewed changes were applied to public `main` at `f2d27a21cfd340808910572ccf0458c11679122d` in an isolated clone. Checks below distinguish local editorial evidence from broader application and release validation.

- `node scripts/build_anomaly_revision.mjs --check`: passed; original query bodies remain unchanged.
- `node tests/anomaly-revision.test.mjs`: 9 passed, including historical anchor preservation and the retained zero-match/gate-recall results.
- `python3 -m unittest discover -s research/anomaly-validation -p 'test_*.py'`: 16 passed. These are local contract/parser/arithmetic tests, not KQL engine execution.
- `npm run build:embedded`: passed. Built archive validator checked 193 articles and 196 HTML documents; one large-code preservation test passed across three historical articles. Dependency-cache writes were denied without preventing the build.
- Rendered article contains exactly one source-owned status banner and all three new entry links. Applying the site overlay preserves the hydrated article subtree and does not duplicate the banner.

All supplemental diffs pass `git diff --check`. The initial editorial checks did not run public external URLs, browser hydration on a live site, full site release/search/deployment gates, fresh dependency installation, query-engine execution or public recording replay. Publication CI and deployment checks are recorded separately in the pull request. Eight KQL examples and 34 engine fixtures remain historical reported research results; neither is independently replicated by this editorial pass. The 2688-entity-day study remains synthetic, with FP 85→8 and TP 18→11 preserved.
