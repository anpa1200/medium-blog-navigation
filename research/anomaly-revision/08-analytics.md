## 8. Detection Engineering Patterns and Logic Examples

### 8.1 Four Core Design Patterns

**Rarity in role:** compare equivalent entities and tasks rather than the entire estate. Role membership itself must be trustworthy and updated after legitimate changes.

**Rate plus shape:** combine count, distinct targets, distinct sources and ordering. A fixed time bin has boundary effects; longer or overlapping windows introduce additional cost and deduplication requirements.

**State change:** inspect a new permission, identity relationship or configuration state against policy and approved change. A deterministic condition is not the same as a deterministic malicious verdict.

**Corroboration:** combine independent evidence while measuring what each extra gate removes. If a gate intersects a candidate set, it can remove true positives as well as false positives. Do not promise improved precision without a recall trade-off.

### 8.2 Detection Logic Examples

The canonical implementations are eight KQL files under `research/anomaly-validation/queries/` in the companion repository. This section is generated from those files; edits belong in the files, not in duplicated snippets. The old broken SPL/KQL exports remain in an explicitly historical download, not as deployment recipes.

**Contract:** these queries use the named normalized tables in the [telemetry contract](https://1200km.com/articles/research/anomaly-validation/contracts.json). They are not drop-in queries for an unspecified Sentinel connector. Fixture execution establishes syntax and selected logic behavior; live ingestion, identity enrichment, scheduling, production thresholds and analyst outcomes require separate validation. No Splunk execution is claimed by converting an SPL example to KQL.

#### Distributed Password Spray — Rate and Shape {#distributed-password-spray--rate-and-shape}

The example selects result `50126` as one invalid-credential class, not every nonzero status. It joins only attempted identities within the same tenant, requires success after that identity's last failure, and uses a bounded follow-up period. `50140` is an interaction interruption, not generic completed success. [Microsoft error-code reference](https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes), [Kusto time-window joins](https://learn.microsoft.com/en-us/kusto/query/join-time-window).

The numeric thresholds are fixture parameters. Shared proxies and identity outages can create similar patterns; success afterward does not prove compromise. This analytic deliberately requires a burst and subsequent success, so failure-only spraying, unresolved identities and sufficiently low-volume activity fall outside its scope. Its fixed-bin boundary blind spot is an explicit regression test, not hidden by reporting only positive cases.

<!-- validated-query:password-spray -->

#### Kerberoasting — Service-Request Breadth {#kerberoasting--rc4-tgs-volume}

This version reports encryption types and includes AES instead of asserting that RC4 alone covers Kerberoasting. It excludes `krbtgt` from this service-breadth view without excluding all computer principals. The threshold of five distinct service identifiers is illustrative. The public single-ticket recording is deliberately not modified or repeated to make this rule fire: a volume detector can miss a real low-volume technique example.

<!-- validated-query:kerberoasting -->

#### DCSync — Replication-Right Access {#dcsync--replication-guids-from-non-dc-account}

Return each candidate access, including computer principals and separate-right events. Source enrichment is a bounded same-DC/logon-ID join; unresolved and ambiguous addresses remain visible. An approved-source review belongs after this evidence-preserving stage. The 24-hour correlation bound is a test configuration, not proof that logon IDs cannot be reused. Validate session uniqueness and stale-address handling in the actual environment.

<!-- validated-query:dcsync -->

#### Pass-the-Hash — Authentication Hunting Views {#pass-the-hash--ntlm-network-logon-heuristic}

These are broad hunting outputs: source-side alternate-credential context and target-side NTLM network authentication. They intentionally include legitimate activity and do not assign a malicious verdict. Correlate them with process and identity evidence; missing one view does not exclude PtH.

<!-- validated-query:pass-the-hash -->

#### LSASS Credential Access — Sysmon Event 10

The query identifies VM-read access to LSASS. It does not equate every matching process with a credential dumper or every nonmatching access mode with safety. Familiar paths are deliberately retained for review rather than silently allowlisted.

<!-- validated-query:lsass-access -->

#### Web-Server Process Spawning Shell Interpreter

This tests a direct parent-child relationship on inventory-confirmed web servers. It does not detect every webshell, indirect descendant, module or in-process action. A legitimate application can match. Do not substitute an ancestor for a direct parent without changing and testing the analytic.

<!-- validated-query:web-shell-lineage -->

#### DNS Tunneling — Shannon Entropy on Subdomain

The implementation extracts entropy from a specified ASCII label; it does not classify tunneling. Keep the raw QNAME and extraction provenance upstream. Short labels, valid encoded services, alphabet choices and internationalized names need deliberate handling. A high score on `abcdefghijklmnop` demonstrates why character entropy is not the same as unpredictable or malicious content.

<!-- validated-query:dns-entropy -->

#### SaaS Bulk Download Anomaly (M365 SharePoint / OneDrive)

`DailyDownloads` contains one row per tenant, immutable user and complete UTC calendar day. Independent collection health determines `Complete`. Missing collection must not become an invented zero. Count deduplicated audit events; do not label the result bytes or unique files. Reject duplicate entity/day rows before scoring.

The caller supplies `EvaluationDay`; training excludes that day and the future. The example exposes cold starts and incomplete data instead of silently losing users in an inner join. The zero-MAD fallback and minimum excess are explicit policy parameters, not a universal improvement over z-scores. A seasonal or role-specific model may be more appropriate.

<!-- validated-query:bulk-download -->

### 8.3 Reproduction and evidence levels

Run the offline checks with Python 3.13 or a compatible Python 3 standard library. Public inputs are small XML log recordings, not executable samples. The downloader pins the repository commit, verifies Git LFS SHA-256 digests and file sizes, and does not execute recorded commands.

```bash
python3 research/anomaly-validation/run_validation.py
python3 research/anomaly-validation/run_validation.py --download
```

For real query-language execution, start the pinned local engine using the instructions in the research README, then run:

```bash
python3 research/anomaly-validation/run_validation.py \
  --endpoint http://127.0.0.1:18921 --public-recordings
```

The Kusto emulator is used only for development and functional tests, not throughput/latency comparisons or product benchmarking. It is not a production Sentinel environment and has no production authentication or ingestion pipeline. [Microsoft emulator limitations](https://learn.microsoft.com/en-us/azure/data-explorer/kusto-emulator-overview).

<!-- validated-results -->

The public recordings are provided by Splunk's Attack Data repository under Apache-2.0, pinned in `datasets.json`. They are lab activity, not a representative mix of labeled enterprise events. Query output rows are not a true-positive denominator. A recording can contain legitimate background behavior. Zero matches may expose an analytic's scope limitation rather than an ingestion or execution failure. [Dataset repository](https://github.com/splunk/attack_data).
