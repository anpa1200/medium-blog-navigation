# Anomaly research: technical revision and validation report

Pre-release validation snapshot: 21 September 2026. Author: Andrey Pautov. Prepared with AI-assisted source review, implementation and testing.

## Outcome and publication state

The existing article was revised in an isolated worktree on branch `research/anomaly-validated-revision-20260921`, based on `3656ca970ae839081af078f486cf542e9105044b`. This report records the **pre-release validation**, not a production-detection certification. At the time this snapshot was prepared, no commit, push, deployment or Medium edit had been performed. The previous research checkout and separate main-site repository were not modified during that revision. Subsequent release status must be established from GitHub Actions and fresh production checks, not inferred from this snapshot.

- [Revised manuscript](../../docs/articles/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12.md)
- [Reconciled claim ledger](../../static/research/anomaly-fact-audit.md)
- [Reproduction instructions](../../research/anomaly-validation/README.md)
- [Machine-readable functional results](../../research/anomaly-validation/results/functional-results.json)
- [Synthetic study specification and results](../../research/anomaly-validation/results/synthetic-study.json)
- [Exact changed-file inventory with SHA-256](changed-files.json)

The writer skill informed the revision's evidence-first structure: source-reported observations, inferred detection opportunities, functional execution, public-recording observations and synthetic statistics are kept distinct. The original author, article URL, topic links and historical material remain identifiable.

## What the review got right—and where it needed qualification

The central criticism was valid: the old technical sections made stronger claims than their evidence supported, and query examples needed actual execution. A warning banner did not repair those sections. They have now been rewritten rather than left behind the warning.

However, the review partly described an older edition. The base-rate arithmetic, Midnight Blizzard permission scope, Storm-0558 acquired-key wording, Storm-1283 source, and MOVEit application-account distinction had already received corrections. The ledger records that history instead of claiming all these as new fixes. The review's numerical quality score is a subjective assessment, not a reproducible accuracy metric.

Two important qualifications survive this revision:

1. AWS's GuardDuty and RDS documentation disagree about the observability of `GenerateDbAuthToken`. Both sources are retained; no fictional CloudTrail-dependent detector is supplied.
2. ATT&CK's current tactic structure is used, but the review's wording about retirement must not be read as saying that TA0005 ceased to exist. The v19 split and current Stealth/Defense Impairment concepts are described using MITRE's own release material.

## Substantive changes

| Area | Implemented change |
|---|---|
| Hypothesis and conclusion | Replaced universal/near-certain detectability claims with conditional, testable statements; separated anomalies from malicious verdicts. |
| Taxonomy | Added explicit entity/feature/comparison requirements and benign explanations across 14 anomaly families plus multi-event correlation. Corrected mismatched units, windows, peers and examples. |
| Incident narratives | Reworked the 12 legacy campaign sections using source-scoped facts. Corrected Volt Typhoon host context, log-clearing events, Conti conflation, 3CX chronology, MESSAGETAP mechanics, APT41 sourcing and unsupported SUNBURST entropy claims. |
| Positive detection example | Added the CSRB-described State Department Big Yellow Taxi discovery, without inventing its private query or performance. |
| ATT&CK | Updated to the Enterprise v19.2 boundary; stopped presenting tactics as a compulsory chronological lifecycle or evidence of attribution. |
| Telemetry | Added schema/collection contracts; corrected audit-policy assumptions, SACL meaning, native Defender events, Zeek fields, identity/cloud caveats and JA3/JA4 limitations. |
| Implementation | Replaced broken operational snippets with eight maintained KQL files. Preserved old snippets separately and labeled them unsafe to deploy. No claim of Splunk execution is made. |
| Query logic | Corrected join identity/time scope, success/error interpretation, AES-inclusive Kerberos coverage, replication masks and source correlation, DNS entropy calculation, missing data, zero MAD and cold starts. |
| Statistics | Added a reproducible chronological train/validation/test sensitivity study and reported both precision and recall costs. Removed unmeasured High/Medium/Low performance rankings. |
| Response policy | Distinguished investigation priority, incident declaration and containment; removed contradictory single-event rules. |
| Reproducibility | Pinned public recordings and engine identity; included output rows, input-record hashes, schemas, query hashes, implementation hashes, licenses and executable tests. |
| Reader safety | Retained the cover and moved 43 older illustrations into a labeled, collapsed historical appendix. Prepared a Medium correction notice, without claiming it was published. |

The ledger has 59 entries: 36 original findings, 16 overlapping review rows, four additional corrections/limits, and three validation/publication boundaries. **These are not 59 independent errors.** Fifty-four entries have corrected dispositions, including overlapping and previously corrected items. Five remain explicitly qualified: the AWS conflict, historical-image revalidation, production validation, Medium synchronization and independent certification.

## Actual execution results

### Functional tests

The eight KQL files executed in an isolated Microsoft Kusto emulator. This is language/logic validation over declared normalized tables—not Sentinel ingestion, a Splunk integration test, an engine benchmark, or production validation.

- **34/34 KQL regression cases passed.** Cases cover positive matches, unrelated identities/tenants, reverse time order, stale joins, duplicates, missing data, ambiguous source addresses, encryption types, zero-MAD baselines and declared blind spots.
- **8/8 offline counterexample checks passed.**
- **16/16 Python unit tests passed.** These cover parsing, normalization, literal safety, XML entity rejection, chronology, determinism and metric arithmetic.
- **9/9 article/evidence regression tests passed.** These bind rendered queries to tested files and preserve source anchors, negative results and historical material.
- The repository's four existing local-original tests also passed.

One real implementation defect was found during engine execution: splitting a DNS label on an empty string did not produce the intended character sequence. The query now uses explicit character positions and substring extraction; the entropy counterexamples pass in the actual engine.

Engine build identity: `1.0.9757.17386`; image digest and full version response are in the functional report. Seven task-created temporary containers, including failed startup attempts, were removed after testing. No production containers or bind-mounted data were removed. The pinned image remains cached; the test containers can be recreated from the documented command. See [cleanup evidence](test-container-cleanup.json).

### Public-recording replay

Source: Splunk Attack Data, pinned commit `6bc794b7f65562148c872fde1e7412ab3c173f4c`, Apache-2.0. The three original XML inputs total 82,661 bytes. Their paths, hashes and byte lengths are recorded in the [dataset manifest](../../research/anomaly-validation/datasets.json). No attack commands were executed.

| Recording | Input records | Query output rows | What the result means |
|---|---:|---:|---|
| DCSync | 11 | 4 | Four replication-access candidates. All four source addresses correlate to `10.0.1.15` using logon evidence from the same recording. |
| LSASS access | 32 | 24 | Twenty-four process-access candidates. Background activity may be present; these are not 24 established true positives. |
| Kerberoasting | 1 | 0 | The single service-ticket event is below the five-service breadth threshold. This is a documented low-volume miss, not silently changed input. |

The 28 output rows are **not** a detection-accuracy score. These small lab recordings do not supply a representative labeled benign population, incident denominator or production false-positive rate.

### Synthetic statistical experiment

Seed `20260921`; 48 generated entities over 56 days, totaling 2,688 entity-days. Training: days 0–27; validation: 28–41; frozen test: 42–55. The test contains 26 generated malicious and 646 generated benign entity-days. Thresholds are selected on validation, not the held-out test.

| Model | TP | FP | FN | TN | Precision | Recall |
|---|---:|---:|---:|---:|---:|---:|
| Global z-score | 8 | 12 | 18 | 634 | 40.0% | 30.8% |
| Entity z-score | 14 | 45 | 12 | 601 | 23.7% | 53.8% |
| Entity MAD | 18 | 85 | 8 | 561 | 17.5% | 69.2% |
| Entity MAD + corroboration gate | 11 | 8 | 15 | 638 | 57.9% | 42.3% |

The gate removes 77 generated false positives **and seven generated true positives**. Robust statistics are not automatically superior. The generator intentionally makes corroboration more likely for attacks; the apparent benefit of that signal is an assumption of the toy world, not a finding about real environments. One seed is a transparent illustration, not a population-level evaluation. Exact predictions, calibration candidates and [CSV data](../../research/anomaly-validation/results/synthetic-study.csv) are included.

## Build, navigation and source verification

- Both `npm run build:legacy` and `npm run build:embedded` completed successfully. See [legacy output](legacy-build.log), [embedded output](embedded-build.log) and [validation summary](validation-summary.json).
- The embedded build validates 192 articles and 195 HTML documents.
- All 192 catalog article routes/canonical identities match the baseline. The [before/after URL evidence](url-preservation.json) does not claim to cover the separate main site's entire URL inventory.
- All 44 original image references remain, and all 11 old code blocks are preserved in the historical artifact. Eight maintained KQL examples plus two reproduction commands now appear in the article.
- The existing 15 topic tags, 30 incident mappings, 17 incident cases, 17 registered primary sources, 17 mapped techniques and four reciprocal article links are retained.
- All 393 rendered self-fragment links pass. Browser validation also checks all 153 original heading fragments; it exposed Docusaurus stripping the H1 ID, which was fixed with an explicit anchor.
- Local-media validation checked 2,782 references with zero missing local files. This does **not** mean every remote historical image was re-downloaded or fact-checked.
- `git diff --check` passes.
- Final desktop/mobile browser results and screenshots are recorded in [browser-validation.json](browser-validation.json). The preview uses read-only CSS/scripts/logo from the existing main-site checkout, with their hashes recorded. This is local-build evidence, not a production-site screenshot. The mobile test verifies that the wide statistics table can scroll to its recall column.

The final full external-link sweep returned **96/99 passes**. One bounded [recheck](source-access-recheck.json) recovered the Microsoft Midnight Blizzard source with HTTP 200 and the expected title. Two automated access restrictions remain: ACM serves a challenge/403; DOJ's press release serves an HTTP-200 verification interstitial. These failures are preserved in the report, not converted into false passes. The DOJ text was readable through the web research tool, and its related indictment PDF was reachable. An accessible University of Minnesota technical-report version supplements the ACM citation. The incorrect CSRB PDF URL was replaced with the working official March-path PDF. See [full link evidence](link-check.json).

Screenshots: [desktop article](article-desktop.png), [functional-test and public-replay evidence](validation-evidence-desktop.png), [mobile statistical table](statistical-study-mobile.png), and [mobile table scrolled to recall](statistical-study-mobile-recall.png).

## Files and reproducibility

The exact deliverable inventory, including SHA-256 hashes, is in [changed-files.json](changed-files.json); this report directory is excluded to avoid a self-referential hash manifest. Narrow Git attributes preserve the hash-bound CSV line endings and verbatim historical-code whitespace; maintained source files retain the normal whitespace checks.

| File group | Purpose |
|---|---|
| `docs/articles/2026/2026-04-20-…90df8b6dea12.md` | Revised existing article; same route and canonical identity. |
| `docs/articles/index.md`, `src/data/article-catalog.json` | Correct article/code metadata; fixed the previously stale archive header using actual catalog counts. |
| `research/anomaly-revision/` | Maintained prose sections, taxonomy contracts, original inventory, issue ledger and draft Medium correction. |
| `research/anomaly-validation/` | Eight queries, schemas, pinned dataset manifest, safe runner, synthetic study, unit tests, recorded results and licensing. Download cache is ignored. |
| `static/research/anomaly-validation/` | Downloadable query, schema, manifest, result and licensing artifacts. |
| `static/research/anomaly-fact-audit.md`, `static/research/anomaly-historical-code.md` | Reconciled audit and explicitly superseded original snippets. |
| `scripts/build_anomaly_*.mjs`, research render/check/verify scripts | Single-source rendering, stale-result detection, preservation checks and captured verification. |
| `scripts/check_anomaly_revision_browser.mjs`, `scripts/report_anomaly_revision.mjs` | Local browser proof and exact URL/file inventory. |
| `tests/anomaly-revision.test.mjs`, `package.json` | Regression checks and reproducible entry points. |
| `reports/anomaly-technical-revision-20260921/` | Raw build/test/link logs, screenshots, URL comparison, manifests and this report. |

To reproduce, follow the research README for the pinned engine startup and public recording download, then run:

```bash
npm run research:study
npm run research:validation:engine
npm run research:revision:render
node scripts/verify_anomaly_research.mjs --revision
node scripts/check_anomaly_revision_browser.mjs --playwright /path/to/playwright/index.mjs --site-root /path/to/main-site-checkout
node scripts/report_anomaly_revision.mjs
```

With a running emulator, `node scripts/verify_anomaly_research.mjs --revision --engine` also captures engine execution and refreshes derived evidence before the remaining checks. Build/check wall times are recorded in the verification JSON; they are not measures of analyst productivity or detection-engine performance. No token count or independently calibrated quality score was measured.

## What is not finished—and must not be claimed

1. **Publication:** the local changes still need an explicitly requested Git/release workflow and fresh live checks. The main-site integration build and production deployment were not performed here.
2. **Medium:** apply the prepared [correction notice](../../research/anomaly-revision/MEDIUM-CORRECTION.md) through authorized publication access; the existing Medium copy remains outside this local revision.
3. **Production validation:** test native adapters, collection gaps, enrichment, scheduling and analyst workflow in the actual deployment. Collect a representative labeled background corpus before estimating operational precision or recall.
4. **Historical illustrations:** their content is not certified. They are clearly superseded, not silently reused as corrected guidance. Replacing them with newly verified diagrams is separate publication work.
5. **Independent review:** this author/assistant revision is not independent peer-review certification. No honest evidence here supports a claim of “100% accurate” or universal detection coverage.

The practical improvement is a research article whose claims and examples can be inspected, executed and challenged, with its misses and unresolved evidence visible to the reader.
