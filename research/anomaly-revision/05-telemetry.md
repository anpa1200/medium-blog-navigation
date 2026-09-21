## 5. Detection by Log Source and Security Device

A telemetry contract states what must actually be collected: provider/channel, event version, fields, entity keys, clock, parser, retention, collection health and enrichment. A vendor feature list is not a measurement of coverage. Verify prerequisites with generated test activity and raw records before writing analytics against normalized fields.

### 5.1 Windows Security Event Log

Do not infer effective audit settings from a universal default. OS version, machine role, policy inheritance and forwarding filters matter. Event 4648 belongs to Logon auditing; the earlier blanket statement that it is disabled by default was wrong. Inspect effective policy with the read-only `auditpol /get /category:*`, then test generation and forwarding. [Microsoft audit recommendations](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/audit-policy-recommendations).

| Event / channel | Required collection or meaning | Interpretation boundary |
|---|---|---|
| 4624, 4625, 4648 / Security | Audit Logon, with relevant success/failure policy | Successful/failed logon and explicit credentials are different events; none alone identifies credential theft. |
| 4672 / Security | Audit Special Logon | Privileges assigned to a session are not proof of an exploit or unexpected escalation. |
| 4688 / Security | Audit Process Creation; separate command-line inclusion policy | Native process creation and Sysmon are independent pipelines. Command lines may contain sensitive information. |
| 4662 / Security, on DC | Directory Service Access auditing and an applicable object SACL | Missing events can mean missing auditing. A SACL selects audited actions; it does not grant replication permission. |
| 4720, 4728, 4732, 4756 / Security | Appropriate account/group-management auditing | Windows objects only; not arbitrary application-database accounts. |
| 4769 / Security, on DC | Audit Kerberos Service Ticket Operations | Successful service-ticket requests are normal. Capture encryption type, requester and target fields available in that event version. |
| 4776 / Security | Audit Credential Validation | Appears on the authority validating credentials: a DC for domain accounts or the relevant computer for local accounts. |
| 4697, 4698, 5140 / Security | Security System Extension, Other Object Access Events, File Share respectively | Confirm effective policy; service/task/share activity has legitimate uses. |
| 7045 / System | Service Control Manager | New service installation; a separate provider/channel from Security 4697. |
| 1102 / Security; 104 / System | Security-log clearing versus Eventlog-provider log-clear records | Inspect the actual cleared channel. A cleared log and a forwarding interruption are different observations. |
| 5001, 5007 / Defender Operational | Real-time protection disabled; configuration changed | Preserve old/new settings and actor context where available; maintenance can be legitimate. |

Field definitions: [4688](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4688), [4662](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4662), [4776](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4776). Verify fields against raw XML rather than assuming that an indexer's aliases are universal.

### 5.2 Sysmon

Use the [Sysmon event reference](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon) and record the installed version and configuration hash. Useful event families include process creation (1), network connections (3), driver/image loads (6/7), remote threads (8), process access (10), file creation (11), registry changes (12–14), pipes (17/18), DNS (22) and supported process-tampering observations (25).

Collection and filtering determine availability. Image-load events do not guarantee coverage of manual mapping. Event 8's inferred start-module/function fields can be empty; an empty field or parser-generated `Unknown` is not proof of shellcode. Likewise an unresolved event-10 call trace is not proof of injected code. Named pipes associated with tooling are leads, not immutable tool identities.

### 5.3 EDR Platforms

<span id="crowdstrike-falcon"></span><span id="microsoft-defender-for-endpoint-mde"></span>

EDR can supply process, file, memory, identity and network evidence that raw audit logs lack. Preserve raw event IDs, sensor health, event times, host identity and detection provenance. Vendor-reported capabilities and detections must remain labeled as such; this research does not rank products, reproduce proprietary models, or guarantee built-in alert names and licensing.

For example, Microsoft documents `DeviceProcessEvents` as an advanced-hunting table. Confirm the available columns and ingestion before porting a process-lineage analytic. Exact sensor-event counts, proprietary model inventories and unsupported release-year claims have been removed from the operational guidance. [Microsoft table reference](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-deviceprocessevents-table).

### 5.4 Network Detection and Response

<span id="zeek--corelight"></span><span id="vectra-ai"></span>

For Zeek, record sensor placement, packet loss, version, loaded scripts and packages. `dns.log` uses `TTLs`, not `TTL`; `conn.log` provides directional connection metadata. TLS, certificate, file-hash and fingerprint fields depend on analyzers and configuration. JA3/JA3S are not guaranteed stock fields in every `ssl.log`. [Zeek DNS schema](https://docs.zeek.org/en/v8.2.1/reference/logs/dns.html), [Zeek TLS logging](https://docs.zeek.org/en/lts/reference/logs/ssl.html).

TLS-extension randomization weakens order-sensitive JA3 stability for affected browsers. JA4 addresses extension-order sensitivity, but neither fingerprint is an actor identity or proof of malware; libraries are shared and fingerprints can be imitated. Record the implementation and normalize consistently before comparing sensors. [Cloudflare's JA4 explanation](https://blog.cloudflare.com/ja4-signals/).

### 5.5 Identity and Access Management Platforms

Entra risk detections mix behavioral analytics, threat intelligence, leaked credentials and user reporting. Do not describe every detection as an anomaly model or every denied MFA challenge as a user fraud report. Verify the actual detection type, licensing, configuration and retained events. [Entra risk catalog](https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks).

Okta's catalog includes `user.mfa.factor.update`, `user.session.impersonation.initiate` and `user.account.privilege.grant`. Their identifiers are not invented. Interpret outcome, reason, factor, actor and target together; a generic failure does not establish MFA fatigue. [Okta event catalog](https://developer.okta.com/docs/reference/api/event-types/).

### 5.6 Cloud Security Services

Cloud analytics require the relevant accounts, regions, event categories and resource-level logging. A control-plane log does not automatically contain every data access. Provider-native detections may use context unavailable in exported logs; a local reproduction must declare that difference.

**AWS documentation inconsistency:** GuardDuty lists `GenerateDbAuthToken` among credential-access anomalous APIs, while RDS states that CloudTrail does not track token generation. Preserve both statements rather than calling the article's vendor citation invented or assuming an observable CloudTrail event. This revision does not implement a detector dependent on that event. [GuardDuty IAM findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-iam.html), [RDS IAM authentication limitations](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html).

<span id="microsoft-sentinel--anomaly-analytics"></span>

Sentinel anomaly rules provide deviations for investigation and correlation. Use the selected template's documented requirements rather than asserting a universal learning period or assuming that an anomaly is an incident. [Sentinel anomaly-rule guidance](https://learn.microsoft.com/en-us/azure/sentinel/work-with-anomaly-rules).

### 5.7 DNS Security

Full DNS labels allow lexical analysis. Resolver logs, endpoint DNS events and network sensors observe different parts of the path; caches, encryption and collection gaps affect coverage. Specify whether the metric concerns a leftmost label, all labels below a registrable domain, or the entire name. A public-suffix-aware parser is required if the analytic groups by registrable domain.

#### Shannon Entropy for DNS Anomaly Detection {#shannon-entropy-for-dns-anomaly-detection}

Empirical character entropy is `H = -sum(p(c) * log2(p(c)))`, in bits per character. It measures the symbol-frequency distribution, not semantic randomness or maliciousness. For a label of length n over alphabet A, its upper bound is `log2(min(n, |A|))`. A short word's low maximum entropy does not calibrate a cutoff for a long encoded label; a structured sequence with distinct characters can have high empirical entropy.

Normalize casing and label selection, handle internationalized names explicitly, and test legitimate encoded names. Section 8's implementation is an ASCII-label feature extractor, not a tunneling verdict. No SUNBURST-specific entropy range or universal alert threshold is claimed.

### 5.8 SaaS Audit Logs

Separate event counts, distinct objects, records and bytes. The example below counts download audit events; it does not infer bytes from `OfficeObjectId`. If authoritative object sizes or transfer counters are available, document that separate enrichment and its limitations.

For Microsoft 365, verify workload auditing and retention for operations such as `MailItemsAccessed`, `FileDownloaded` and `FileSyncDownloadedFull`. Current mailbox auditing must not inherit historical licensing assumptions. Application grants and service-principal activity may require Entra audit data in addition to workload logs. [Mailbox investigation guidance](https://learn.microsoft.com/en-us/purview/audit-log-investigate-accounts), [OfficeActivity schema](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/officeactivity).

### 5.9 Detection Source Prioritization Matrix

Unmeasured fidelity ratings have been replaced with a planning matrix. No universal deployment order is implied.

| Decision | Evidence to collect before choosing |
|---|---|
| Which source closes an important visibility gap? | Threat model, important assets and currently missing behaviors |
| Can the proposed fields actually be collected? | Raw samples, policy, sensor health, schema and license verification |
| Can operations sustain the source? | Measured volume, storage/retention, privacy needs and ownership |
| Does the analytic add value? | Held-out alerts, legitimate workload controls, missed cases and analyst workload |
| Is prioritization justified? | Local benefit and cost, not a vendor name or an unsupported High/Medium/Low score |
