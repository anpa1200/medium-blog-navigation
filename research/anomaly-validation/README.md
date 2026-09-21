# Anomaly research: reproducible validation package

This package supports the existing **Malicious Activity as a Statistical Signal** article. It is defensive research: the scripts parse recorded events and execute analytical queries, never attack commands from those events.

## What the evidence establishes

- Eight canonical KQL examples use the explicit normalized tables in `contracts.json`.
- `run_validation.py` executes synthetic functional fixtures and, optionally, three pinned public XML recordings in a real Kusto engine.
- `statistical_study.py` runs a separate seeded Python sensitivity experiment. It is deliberately synthetic, not an enterprise accuracy study or a benchmark of the Kusto emulator.
- `test_validation.py` tests input contracts, parser safety, deterministic generation, leakage boundaries and result arithmetic.
- The article's examples are rendered from the actual query files. Query, runner, schema and recording-manifest hashes are checked against the functional report; the synthetic study is also bound to its implementation hash. Changed inputs require a fresh run.

No native Sentinel connector, Splunk instance, production negative corpus, automated containment system, or original victim environment was tested. A green test suite is not a detection-accuracy percentage.

## Reproduce without a query engine

Requirements: Python 3.13 was used; the scripts use the standard library. Node 22 and the repository's locked dependencies are used to render and validate the article.

```bash
python3 research/anomaly-validation/statistical_study.py
python3 research/anomaly-validation/run_validation.py
python3 -m unittest discover -s research/anomaly-validation -p 'test_*.py'
```

The default runner writes `results/offline-results.json`. It explicitly records that engine execution was not run and does not overwrite the engine report.

## Public recordings

```bash
python3 research/anomaly-validation/run_validation.py --download
```

`datasets.json` pins Splunk Attack Data commit `6bc794b7f65562148c872fde1e7412ab3c173f4c`, three Git LFS hashes and exact byte lengths. The recordings total 82,661 bytes. Downloads go to the ignored `cache/` directory. SHA-256 and size mismatches stop processing. The original XML is neither executed nor silently rewritten. The normalizer records per-record hashes and preserves source record/time identifiers.

The recordings were selected by relevant technique path and small XML size, before running the analytics. They contain lab activity, potentially including ordinary background events. Do not label every row malicious or derive false-positive rates from them. In particular, the single 4769 recording is below the request-breadth threshold; zero results are an informative scope limitation.

See `THIRD_PARTY_NOTICES.md` for attribution and licensing.

## Real KQL functional execution

Microsoft's emulator is free under its software license terms and is **not** a production service. Review the [license and limitations](https://learn.microsoft.com/en-us/azure/data-explorer/kusto-emulator-overview) before starting it. The command below explicitly accepts that license. No emulator benchmark tests are performed.

The test host had exhausted the root UID's file-watcher limit. An isolated non-root UID avoided changing host limits. The image also crashed in optional row-store initialization on this configuration. The successful setup disables that unused feature and runs in-memory `datatable` queries; it is not a storage/ingestion test. Startup required writable temporary directories and the image's existing application-directory group permissions. No host directories are mounted.

```bash
docker run --name anomaly-research-kusto-query-20260921 \
  --label purpose=anomaly-research-functional-tests \
  --user 39921:0 \
  --tmpfs /kustodata:rw,uid=39921,gid=0,size=256m \
  --tmpfs /kusto/tmp:rw,uid=39921,gid=0,size=256m \
  --tmpfs /Kusto:rw,uid=39921,gid=0,size=256m \
  --cpus=2 --memory=4g --memory-swap=4g \
  -e ACCEPT_EULA=Y -e TMPDIR=/kusto/tmp -e TMP=/kusto/tmp -e TEMP=/kusto/tmp \
  --workdir /kusto/Kusto.Personal \
  --entrypoint /kusto/Kusto.Personal/Kusto.Personal \
  -dit -p 127.0.0.1:18921:8080 \
  mcr.microsoft.com/azuredataexplorer/kustainer-linux@sha256:21516f47b7877707cd603ad7dbc372d4cf0ac0d2b758f2c192f5266c4214d363 \
  -gw -https:false -AutomaticallyDetachCorruptDatabases:true -enableRowStore:false

python3 research/anomaly-validation/run_validation.py \
  --endpoint http://127.0.0.1:18921 --public-recordings

docker stop anomaly-research-kusto-query-20260921
```

Use a different task-specific name/port if this name already exists; do not remove an unrelated container. The endpoint is unauthenticated and intentionally bound to loopback only. The runner refuses non-local endpoints. The original mutable `stable` tag was unavailable; the successfully tested image is pinned by digest instead of relying on `latest` in reproduction instructions.

## Inputs and coverage

The normalized schemas are **contracts**, not claims about vendor-native table names. A deployment adapter must be checked against raw source records. `DailyDownloads` must have unique tenant/user/UTC-midnight rows and independent completeness information. Undefined counts are not observed zeros. Windows source-IP enrichment must use real logon evidence; unmatched or ambiguous joins remain visible.

The fixture suite includes cross-tenant and unrelated-account rejection, reversed/expired event order, result-code classification, duplicate events, fixed-bin boundary misses, AES and computer-account service requests, low-volume misses, `krbtgt` exclusion, separate replication rights, access-mask semantics, missing/wrong-DC/future/stale/ambiguous logon enrichment, broad PtH hunting views, LSASS read masks, direct web-worker lineage, entropy math, cold starts, missing telemetry and zero-MAD baselines.

The fixed-bin spray query is one investigation hypothesis, not a complete detector for distributed spraying. The DCSync query preserves approved-looking principals for explicit inventory review rather than claiming an untested allowlist. The DNS query produces features, not a malware verdict. Missing role inventory makes the web-role rule inapplicable, not automatically safe.

## Synthetic study

The Python generator creates 48 entities over 56 days with declared role, calendar, sparse-count and legitimate-drift behavior. Days 0–27 train baselines; days 28–41 select thresholds; days 42–55 are held out. The grid and tie-break rule are fixed in source. Gated MAD uses the same threshold as ungated MAD, so their comparison isolates the added gate.

The corroborating signal is deliberately more likely for generated attacks: its usefulness is assumed, not discovered in real data. Positive labels also come from the generator. Results are specific to one scenario/seed; no population confidence interval, model superiority or production precision is claimed. Output includes the full generated CSV, per-model predictions, confusion counts and denominators. False alerts per entity-day is not the same denominator as false-positive rate.

## Refresh the article

```bash
npm run research:revision:render
npm run research:anomalies:check
npm run validate:archive
npm run build:legacy
npm run build:embedded
node scripts/validate_anomaly_incidents.mjs --built
```

Do not regenerate a success claim after changing queries without rerunning the engine: the renderer rejects stale query hashes. Public JSON assets copy the exact result files and contracts. Historical query exports are separately labeled unsafe to deploy; original media are preserved in a superseded appendix rather than presented as corrected diagrams.
