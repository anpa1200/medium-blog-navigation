## 3. Mapping Anomalies to ATT&CK Tactics {#3-mapping-anomalies-to-the-attck-lifecycle}

ATT&CK organizes adversary objectives and behavior; it is not a required chronological lifecycle. An intrusion may repeat, skip or combine tactics. A statistical feature is not an ATT&CK technique, and neither establishes actor attribution.

**Version boundary:** this revision uses Enterprise ATT&CK v19.2. The April 2026 v19 release split the former Defense Evasion grouping into Stealth and Defense Impairment. The original article predates that release. Historical vendor strings such as `DefenseEvasion:IAMUser/AnomalousBehavior` remain vendor identifiers; they must not be silently renamed to match ATT&CK. [MITRE release notes](https://attack.mitre.org/resources/updates/updates-april-2026/).

The following are **author-proposed analytical opportunities**, not measured coverage rankings. Original section anchors are retained for existing links.

| Tactic | Candidate observation | Context needed / important blind spot |
|---|---|---|
| <span id="reconnaissance"></span>Reconnaissance | Request rate, target spread, unusual URI access | Target-side requests can expose active reconnaissance; external/passive activity may require third-party visibility. Background scanning is common. |
| <span id="resource-development"></span>Resource Development | New lookalike domains or infrastructure relationships | Often outside enterprise logs; external monitoring can still support anomaly analysis. Acquisition alone does not prove malicious intent. |
| <span id="initial-access"></span>Initial Access | Authentication failures, new identity/device relationships | Distributed sources and valid credentials weaken per-IP rules. Tenant-local correlation may still help. |
| <span id="execution"></span>Execution | Unexpected process ancestry or application behavior | In-process execution may not create a child process; application maintenance can create unusual children. |
| <span id="persistence"></span>Persistence | New credentials, application permissions, scheduled tasks | Check actual persistence semantics. VM creation or an MFA reset alone is not proof of persistence. |
| <span id="privilege-escalation"></span>Privilege Escalation | Unexpected role assignment or privilege transition | Review actor, approved change and effective permissions. Kerberoasting itself belongs under Credential Access. |
| <span id="defense-evasion"></span>Stealth | Unusual execution location, masquerading or concealed relationships | This anchor preserves the old grouping's URL; it does not imply that the old grouping and Stealth are identical. |
| <span id="defense-impairment"></span>Defense Impairment | Audit-policy changes, security-service interruption, log clearing | Independent collector health distinguishes disabled collection from an ordinary outage. |
| <span id="credential-access"></span>Credential Access | Unusual service-ticket requests, replication access, LSASS access | Validate audit coverage, encryption types and approved replication sources. |
| <span id="discovery"></span>Discovery | New enumeration tools, directory-query shape | Administrative inventory and troubleshooting can look similar. |
| <span id="lateral-movement"></span>Lateral Movement | New identity/source/destination edges | Requires asset roles, remote logon context and approved administration paths. |
| <span id="collection"></span>Collection | New data sources, object-access breadth | A newly assigned project can legitimately expand access. |
| <span id="command-and-control"></span>Command and Control | Destination novelty, periodicity, DNS structure | Legitimate agents beacon; jitter, encrypted resolvers and sensor placement limit visibility. |
| <span id="collection--exfiltration"></span>Exfiltration | Unusual exports, downloads or outbound destinations | Distinguish bytes, records, unique objects and audit-event counts. Provider-side transfers may bypass endpoint sensors. |
| <span id="impact"></span>Impact | File-change bursts, availability loss, destructive commands | Backups, migration and recovery operations can resemble components of the pattern. |

Map the observed behavior first, then identify the possible statistic. Do not infer a group from an anomaly tag or infer detector success from a valid technique ID. The [case register](#anomaly-evidence-index) records those boundaries separately.
