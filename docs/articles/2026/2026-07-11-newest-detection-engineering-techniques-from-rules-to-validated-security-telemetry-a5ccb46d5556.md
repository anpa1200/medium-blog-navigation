---
title: "Newest Detection Engineering Techniques: From Rules to Validated Security Telemetry"
description: ""
image: "https://cdn-images-1.medium.com/max/1024/1*PtjHgt5EKpMEspEmntakBw.png"
---

# Newest Detection Engineering Techniques: From Rules to Validated Security Telemetry


![Cover image](https://cdn-images-1.medium.com/max/1024/1*PtjHgt5EKpMEspEmntakBw.png)

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://infosecwriteups.com/newest-detection-engineering-techniques-from-rules-to-validated-security-telemetry-a5ccb46d5556](https://infosecwriteups.com/newest-detection-engineering-techniques-from-rules-to-validated-security-telemetry-a5ccb46d5556)
- **Published:** 2026-07-11
- **Preserved media:** 25 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 13 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium RSS article into the 1200km.com Docusaurus ecosystem. The article flow, images, screenshots, infographics, and technical blocks are preserved from the Medium feed.

### Practical methods for identity, cloud, CI/CD, runtime, and AI-era threat detection

![Article image](https://cdn-images-1.medium.com/max/1024/1*PtjHgt5EKpMEspEmntakBw.png)

## Table of Contents

1. **Introduction**
2. **What Actually Changed in Detection Engineering**
3. **The Modern Detection Engineering Loop**
4. **Technique 1: Telemetry-First Detection Engineering**
5. **Technique 2: Detection-as-Code With Real Validation**
6. **Technique 3: Stateful and Sequence-Based Detection**
7. **Technique 4: Weak-Signal Aggregation and Risk-Based Alerting**
8. **Technique 5: Identity, Token, and Session Abuse Detection**
9. **Technique 6: Cloud Data-Plane and SaaS Activity Detection**
10. **Technique 7: CI/CD and Software Supply Chain Detection**
11. **Technique 8: Runtime Detection With eBPF**
12. **Technique 9: Peer-Group, Rare-Event, and First-Seen Analytics**
13. **Technique 10: Statistical Change Detection Without Magic**
14. **Technique 11: Security Data Lakes, OCSF, and Portable Content**
15. **Technique 12: Detection for LLM, Agent, and MCP Workflows**
16. **Technique 13: AI-Assisted Detection Engineering**
17. **A Practical 90-Day Implementation Plan**
18. **Validation Metrics That Matter**
19. **Common Failure Modes**
20. **References**
21. **Follow my works**

## Introduction

Detection engineering has changed because the environment changed.

For many years, a detection engineer could live mostly inside a SIEM. The job was to write rules, tune noisy alerts, map content to MITRE ATT&CK, and occasionally convert one query language into another. That work still matters, but it is no longer enough.

In 2026, the important attacks often do not begin with a malware hash or a noisy exploit. They begin with valid credentials, stolen session material, OAuth abuse, a trusted CI/CD workflow, a cloud service account, a SaaS data export, a container escape, or an AI agent connected to tools it should not be allowed to use.

That means the center of detection engineering moved.

**Modern detection engineering is no longer only the engineering of rules. It is the engineering of a full defensive loop:**

![Article image](https://cdn-images-1.medium.com/max/1024/1*5qpv5canCaUVxBe8_8qyeQ.png)

- What telemetry must exist?
- Is the telemetry normalized and reliable?
- Which attacker behavior can be observed?
- Which detection logic expresses that behavior?
- How do we test that the detection actually fires?
- How do we measure false positives, false negatives, drift, and investigation value?
- How do analyst findings improve the next version of the detection?

MITRE ATT&CK is still the best common language for adversary behavior. MITRE CAR has not been meaningfully updated in recent years, but its lasting value is methodological: analytics as testable hypotheses with data models, sensors, pseudocode, and tests. OCSF is becoming important because it gives security teams a shared schema vocabulary. OpenTelemetry matters because applications, CI/CD systems, and GenAI workflows are now detection sources, not only observability sources.

**The practical conclusion is simple:**

&gt; The newest detection engineering technique is not one algorithm. It is the combination of threat-informed logic, reliable telemetry, stateful correlation, continuous validation, and operational feedback.

![Article image](https://cdn-images-1.medium.com/max/1024/1*VxAr_qsi58JKZZ4wQ06Lgg.png)

This article explains the techniques that matter most now, how they work, where they fail, and how to implement them with realistic examples.

## What Actually Changed in Detection Engineering

Many ideas in this field are not new. Behavioral detection is not new. Correlation is not new. Statistical anomaly detection is not new. Detection-as-code is not new.

What changed is adoption pressure.

**The modern enterprise has more attack surfaces that cannot be defended well with old single-event SIEM logic**:

- Identity providers and session tokens.
- SaaS platforms such as Microsoft 365, Google Workspace, Salesforce, Snowflake, GitHub, and Slack.
- Cloud control-plane and data-plane APIs.
- CI/CD systems with privileged tokens and secrets.
- Kubernetes workloads that appear and disappear quickly.
- Application telemetry and business events.
- LLM applications, AI agents, tool calls, and MCP servers.

The Snowflake-related UNC5537 campaign is a useful real-world example. Mandiant reported that attackers targeted Snowflake customer instances for data theft and extortion, using stolen credentials and environments where MFA and access restrictions were weak. This was not a problem a malware rule could solve. SaaS authentication, data access, user-agent, source location, session context, and bulk export behavior must be detection inputs.

Microsoft’s Midnight Blizzard guidance gives another example. The activity included password spray and OAuth-related investigation logic. Again, the useful telemetry is identity and application access telemetry, not only endpoint telemetry.

GitHub Actions is another strong example. GitHub’s own documentation and security guidance warn about dangerous workflow patterns such as misuse of pull_request_target, where untrusted pull request code can interact with privileged repository context if a workflow is built incorrectly. That makes CI/CD workflow configuration and runtime behavior a detection surface.

On July 1, 2026, Sysdig reported JADEPUFFER, which it assessed as a documented agentic ransomware operation using an LLM agent against a Langflow exposure. Even in Sysdig’s own account, a human operator set up the operation, provisioned the C2 and staging infrastructure, and selected the victim; the agent drove tactical execution, not strategy. Even if defenders treat the “first agentic ransomware” label cautiously, the operational lesson is valuable: AI-adjacent infrastructure contains credentials, agent workflows produce distinctive telemetry, and autonomous retry loops may become a useful detection signal.

**So the modern detection question is not:**

&gt; What rule catches this IOC?

**The better question is:**

&gt; What chain of observable decisions must the attacker make, and which telemetry proves those decisions happened?

## The Modern Detection Engineering Loop

A mature detection program should look like this:

![Article image](https://cdn-images-1.medium.com/max/1024/1*7Ph_r23SP89sL-oI5TNukA.png)

**Each stage has a concrete output.**

![Article image](https://cdn-images-1.medium.com/max/795/1*sI0MQgl61dIgDu8TBD_lRw.png)

This loop is the foundation for the rest of the article.

## Technique 1: Telemetry-First Detection Engineering

The most practical modern technique is also the least glamorous: start with telemetry requirements.

**Relevant MITRE ATT&CK tags:**

- [T1078 — Valid Accounts](https://1200km.com/threat-matrix/#/techniques/T1078)
- [T1078.004 — Cloud Accounts](https://1200km.com/threat-matrix/#/techniques/T1078.004)
- [T1530 — Data from Cloud Storage Object](https://1200km.com/threat-matrix/#/techniques/T1530)
- [T1580 — Cloud Infrastructure Discovery](https://1200km.com/threat-matrix/#/techniques/T1580)

**Real-world reports:**

- Mandiant’s[UNC5537 Snowflake investigation](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion)shows why SaaS authentication, data access, source infrastructure, and bulk export telemetry must exist before detection logic can work.
- Microsoft’s[Midnight Blizzard responder guidance](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/)shows the same lesson for Entra ID, OAuth, and password-spray telemetry.

**Traditional detection often started with a rule idea:**

&gt; Detect suspicious PowerShell.

Modern detection should start with a data question:

&gt; Which log source proves process creation, parent process, command line, user, host, timestamp, integrity level, script block content, and network follow-on activity?

**If the data does not exist, the rule is not a detection. It is a wish.**

### Why this matters now

Cloud and SaaS logs are often split into control-plane and data-plane events.

AWS CloudTrail logs management events by default, but data events are not logged by default and can be high-volume and chargeable. Google Cloud Admin Activity audit logs are always written, but most Data Access audit logs are disabled by default because they can be large and may incur additional charges.

**That creates a common failure:**

The detection team writes rules for data exfiltration, but the organization only collects admin logs. The attacker reads or exports data. The SIEM sees configuration changes, not the data access itself.

### Practical example: S3 data access coverage

Bad detection plan:

&gt; Alert when a user downloads many S3 objects.

**Better detection plan:**

![Article image](https://cdn-images-1.medium.com/max/771/1*F7-01plyzGBNPVWYZ38OcA.png)

**Detection logic:**

![Article image](https://cdn-images-1.medium.com/max/1024/1*J19kbDnDtLtpuye_cg4Rcw.png)

1. Count object reads by principal and bucket.
2. Compare against the same principal’s baseline.
3. Compare against the principal’s peer group.
4. Increase severity if the bucket contains sensitive data.
5. Increase severity if source IP, ASN, country, or user agent is new.
6. Alert only when the behavior is both unusual and important.

**Illustrative SQL:**

```text
WITH daily_reads AS (
    SELECT
        principal_arn,
        bucket_name,
        DATE_TRUNC('day', event_time) AS day,
        COUNT(*) AS object_reads,
        COUNT(DISTINCT source_ip) AS source_ips,
        COUNT(DISTINCT user_agent) AS user_agents
    FROM cloudtrail_s3_data_events
    WHERE event_name IN ('GetObject', 'SelectObjectContent')
    GROUP BY principal_arn, bucket_name, DATE_TRUNC('day', event_time)
),
baseline AS (
    SELECT
        principal_arn,
        bucket_name,
        AVG(object_reads) AS avg_reads,
        STDDEV(object_reads) AS std_reads,
        COUNT(*) AS baseline_days
    FROM daily_reads
    WHERE day BETWEEN CURRENT_DATE - INTERVAL '31' DAY
                  AND CURRENT_DATE - INTERVAL '1' DAY
    GROUP BY principal_arn, bucket_name
)
SELECT
    d.principal_arn,
    d.bucket_name,
    d.object_reads,
    b.avg_reads,
    b.std_reads,
    b.baseline_days,
    (d.object_reads - b.avg_reads) / NULLIF(b.std_reads, 0) AS z_score
FROM daily_reads d
JOIN baseline b
  ON d.principal_arn = b.principal_arn
 AND d.bucket_name = b.bucket_name
WHERE d.day = CURRENT_DATE
  AND b.baseline_days >= 10
  AND b.std_reads > 0
  AND (d.object_reads - b.avg_reads) / NULLIF(b.std_reads, 0) > 4;
```

This INNER JOIN intentionally excludes principal/bucket pairs with no baseline history; first-seen access should be handled by the first-seen analytics in Technique 9, and the two detections should be deployed together. This is not production-ready as written. It is a logic skeleton. In production, add bucket sensitivity, known batch jobs, service account ownership, object prefixes, and cost controls. The std_reads &gt; 0 and minimum-baseline-days guards avoid firing on perfectly regular principals after one extra read.

## Technique 2: Detection-as-Code With Real Validation

Detection-as-code is now table stakes. But there is a trap.

**Relevant MITRE ATT&CK tags:**

- [T1059 — Command and Scripting Interpreter](https://1200km.com/threat-matrix/#/techniques/T1059)
- [T1078 — Valid Accounts](https://1200km.com/threat-matrix/#/techniques/T1078)
- [T1110.003 — Password Spraying](https://1200km.com/threat-matrix/#/techniques/T1110.003)
- [T1190 — Exploit Public-Facing Application](https://1200km.com/threat-matrix/#/techniques/T1190)

**Real-world reports:**

- Microsoft’s[Midnight Blizzard guidance](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/)is a good validation target because it includes password-spray and OAuth-oriented investigation logic.
- Sysdig’s[JADEPUFFER report](https://www.sysdig.com/blog/jadepuffer-agentic-ransomware-for-automated-database-extortion)is a good validation target for exploit-to-credential-access-to-impact chains.

Many teams call something detection-as-code because rules live in Git and CI checks YAML syntax. That is only static validation. It proves the rule parses. It does not prove the rule detects.

A mature detection-as-code pipeline should test behavior.

### Minimal detection-as-code structure

Each detection should have:

![Article image](https://cdn-images-1.medium.com/max/1024/1*suP6l-GQMmaNpoC2M5PRdg.png)

- Rule ID.
- Name.
- Hypothesis.
- Required telemetry.
- Required fields.
- ATT&CK mapping.
- Data source mapping.
- Logic.
- Known false positives.
- Severity or risk score.
- Response guidance.
- Test data.
- Validation method.
- Owner.
- Last reviewed date.

**Example detection metadata:**

```text
id: identity-possible-session-hijack-001
name: Successful SaaS session from new infrastructure after recent login
hypothesis: >
  An attacker using stolen session material may access SaaS resources from
  infrastructure that differs from the user's normal session context.
required_sources:
  - idp_signin_logs
  - saas_audit_logs
required_fields:
  - user_id
  - session_id
  - source_ip
  - user_agent
  - device_id
  - operation
  - event_time
attack_mapping:
  - T1550.004
  - T1078
validation:
  method: replay
  malicious_fixture: fixtures/session_replay_external_ip.json
  benign_fixture: fixtures/vpn_roaming_user.json
deployment:
  mode: shadow
  owner: detection-engineering
```

### Real validation logic

A good validation pipeline has four gates:

1. Static checks: YAML, schema, rule ID uniqueness, ATT&CK tags, required fields.
2. Unit tests: known malicious and benign events.
3. Replay tests: historical or synthetic event sequences.
4. Emulation tests: Atomic Red Team, Caldera, Attack Range, Stratus Red Team, or internal purple-team actions.

Atomic Red Team is useful because it provides ATT&CK-mapped tests that can be run quickly and reproducibly. Caldera, now Apache Caldera (Incubating), is useful when you need chained adversary emulation instead of isolated atomic actions.

The key logic:

&gt; A detection is not production-ready until the team can name the event sequence that should make it fire and demonstrate that it does fire.

## Technique 3: Stateful and Sequence-Based Detection

Single-event detections still matter. LSASS dump access, suspicious child process from a web server, impossible OAuth grant, or disabling EDR can be high fidelity as single events.

**Relevant MITRE ATT&CK tags:**

- [T1110.003 — Password Spraying](https://1200km.com/threat-matrix/#/techniques/T1110.003)
- [T1078 — Valid Accounts](https://1200km.com/threat-matrix/#/techniques/T1078)
- [T1550.004 — Web Session Cookie](https://1200km.com/threat-matrix/#/techniques/T1550.004)
- [T1213 — Data from Information Repositories](https://1200km.com/threat-matrix/#/techniques/T1213)

**Real-world reports:**

- Microsoft’s[Midnight Blizzard guidance](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/)gives a concrete password-spray-to-access example.
- Microsoft’s[multi-stage AiTM phishing and BEC report](https://www.microsoft.com/en-us/security/blog/2023/06/08/detecting-and-mitigating-a-multi-stage-aitm-phishing-and-bec-campaign/)shows why ordered correlation across identity, session, email, and cloud activity matters.

But many modern attacks are not visible in one event.

Stateful detection links events across time by entity:

- User.
- Host.
- Process entity ID.
- Session ID.
- IP address.
- Service principal.
- Repository.
- Workflow run.
- Cloud role.
- Kubernetes pod or service account.

Elastic EQL supports ordered sequences. Google SecOps YARA-L supports multi-event correlation. Microsoft Sentinel Fusion correlated multiple lower-fidelity alerts and activities into multistage incidents. Fusion is now a legacy engine: it is disabled as part of Sentinel’s migration into the Microsoft Defender portal, where multistage correlation is handled by the Defender XDR correlation engine under a shared incident model. The Sentinel Azure portal experience retires on March 31, 2027, so the architectural point remains, but the product name is transitioning.

### Real-world scenario: password spray followed by successful login

![Article image](https://cdn-images-1.medium.com/max/1024/1*Iz3iW0wqaqGfOjE96CnK0g.png)

**Atomic rule:**

&gt; More than 20 failed logins from one IP.

**Better sequence:**

&gt; One IP fails across many users, then succeeds for one user, then that user performs unusual SaaS or cloud activity.

**Logic:**

1. Count failed logins by source IP across distinct users.
2. Detect a later success from the same IP.
3. Join the success to post-authentication activity.
4. Raise severity if activity includes mailbox access, OAuth consent, data export, role assumption, or admin action.

**Illustrative EQL-style logic:**

```text
sequence by source.ip with maxspan=30m
  [ authentication where event.outcome == "failure" ] with runs=20
  [ authentication where event.outcome == "success" ]
  [ any where event.category in ("email", "cloud", "saas")
        and event.action in ("mailbox_access", "file_download", "role_assume", "oauth_consent") ]
```

The runs=20 line is illustrative volume logic. "Many distinct users" usually cannot be expressed inside a plain EQL sequence. In practice, the spray condition, such as N failures across M distinct users, is usually computed by a separate threshold or aggregation rule. The output of that rule then feeds the sequence or a higher-level correlation layer, because sequence languages express ordering better than distinct-cardinality thresholds.

**The important part is not the exact syntax. The important part is the state:**

- Same source IP.
- Many failures.
- Later success.
- Sensitive follow-on action.
- Time window.

### Why attackers evade it

Attackers can evade short windows by slowing down. They can rotate IPs. They can use residential proxies. They can perform only one post-login action.

**Defensive improvement:**

- Track source ASN and hosting provider.
- Track first-seen source for user.
- Track session and device changes.
- Add entity risk scoring instead of binary alerting.
- Use longer windows for low-frequency but high-impact actions.

## Technique 4: Weak-Signal Aggregation and Risk-Based Alerting

Alert fatigue often comes from treating every rule match as an incident.

**Relevant MITRE ATT&CK tags:**

- [T1078 — Valid Accounts](https://1200km.com/threat-matrix/#/techniques/T1078)
- [T1098 — Account Manipulation](https://1200km.com/threat-matrix/#/techniques/T1098)
- [T1550 — Use Alternate Authentication Material](https://1200km.com/threat-matrix/#/techniques/T1550)
- [T1567 — Exfiltration Over Web Service](https://1200km.com/threat-matrix/#/techniques/T1567)

**Real-world reports:**

- CISA’s[AA20–352A advisory on the SolarWinds-related compromise](https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a)shows why many weak identity, cloud, and lateral-movement signals need to be correlated into an incident.
- Microsoft’s[AiTM phishing and BEC report](https://www.microsoft.com/en-us/security/blog/2023/06/08/detecting-and-mitigating-a-multi-stage-aitm-phishing-and-bec-campaign/)shows how session theft, sign-in anomalies, and follow-on mailbox activity become stronger together than alone.

Modern programs separate signal generation from analyst escalation.

**Weak signals should often become risk events, not alerts:**

- Encoded PowerShell.
- Login from a new ASN.
- New OAuth app consent.
- First use of an access key from a new country.
- Rare process on a workstation.
- New GitHub Actions workflow permission.
- Container spawning a shell.
- AI agent calling an unusual tool.

**One weak signal may be normal. Five weak signals on the same entity in one hour may be an incident.**

### Risk scoring pattern

![Article image](https://cdn-images-1.medium.com/max/659/1*AcQswl4c9EEgIFxyzlEn8g.png)

**Illustrative SQL:**

```text
WITH recent_signals AS (
    SELECT
        entity_id,
        signal_name,
        risk_score,
        event_time
    FROM entity_risk_events
    WHERE event_time >= CURRENT_TIMESTAMP - INTERVAL '24' HOUR
),
deduped_signals AS (
    -- Deduplicate repeated weak signals before summing entity risk.
    SELECT
        entity_id,
        signal_name,
        MAX(risk_score) AS risk_score,
        MIN(event_time) AS first_seen,
        MAX(event_time) AS last_seen
    FROM recent_signals
    GROUP BY entity_id, signal_name
)
SELECT
    entity_id,
    SUM(risk_score) AS total_risk,
    ARRAY_AGG(signal_name) AS evidence,
    MIN(first_seen) AS first_seen,
    MAX(last_seen) AS last_seen
FROM deduped_signals
GROUP BY entity_id
HAVING SUM(risk_score) >= 100;
```

![Article image](https://cdn-images-1.medium.com/max/1024/1*Ccmkv1wAfaYag8ov-qhTzg.png)

Production scoring needs per-signal deduplication or caps and time decay; a flat sum over a window is only the starting skeleton.

### Logic explanation

Risk-based alerting changes the SOC queue from:

&gt; Here are 70 low-confidence alerts.

**To:**

&gt; This user accumulated 120 risk points from identity, SaaS, and endpoint evidence. Here is the chain.

The detection engineer’s job becomes score design:

- Which weak signals are useful?
- Which signals should decay quickly?
- Which combinations should create severity escalation?
- Which entity types need separate thresholds?
- Which high-fidelity signals bypass scoring and alert immediately?

### Do not copy risk scores blindly from another organization. Risk weights depend on local business context.

## Technique 5: Identity, Token, and Session Abuse Detection

MFA is important, but modern identity attacks often target the session after authentication.

**Relevant MITRE ATT&CK tags:**

- [T1078 — Valid Accounts](https://1200km.com/threat-matrix/#/techniques/T1078)
- [T1110.003 — Password Spraying](https://1200km.com/threat-matrix/#/techniques/T1110.003)
- [T1528 — Steal Application Access Token](https://1200km.com/threat-matrix/#/techniques/T1528)
- [T1550.004 — Web Session Cookie](https://1200km.com/threat-matrix/#/techniques/T1550.004)

**Real-world reports:**

- Microsoft’s[cookie theft to BEC report](https://www.microsoft.com/en-us/security/blog/2022/07/12/from-cookie-theft-to-bec-attackers-use-aitm-phishing-sites-as-entry-point-to-further-financial-fraud/)documents AiTM phishing, session cookie theft, and follow-on Exchange Online access.
- Microsoft’s[2026 multi-stage AiTM phishing and BEC report](https://www.microsoft.com/en-us/security/blog/2026/01/21/multistage-aitm-phishing-bec-campaign-abusing-sharepoint/)shows the continued need for cross-domain identity and session telemetry.

**Attackers abuse:**

- Stolen passwords.
- Stolen session cookies.
- Refresh tokens.
- OAuth device code flow.
- Malicious OAuth applications.
- Service principal credentials.
- Managed identities.
- Long-lived API keys.
- Personal access tokens.

Microsoft Entra sign-in logs now include interactive user sign-ins, non-interactive user sign-ins, service principal sign-ins, and managed identity sign-ins. That matters because non-human identity activity is now part of the attack surface.

### Detection pattern: session context shift

![Article image](https://cdn-images-1.medium.com/max/1024/1*dcMIm3IcdI0zXdCz8wmhew.png)

**Hypothesis:**

&gt; A stolen session or token may be reused from infrastructure that does not match the original authentication context.

**Required fields:**

- User.
- Session ID or correlation ID.
- Source IP.
- ASN.
- Country.
- User agent.
- Device ID.
- Authentication strength.
- Conditional access result.
- SaaS operation.
- Timestamp.

**Logic:**

1. Record normal login context.
2. Track session or user activity after login.
3. Alert when session activity moves to a new ASN, unmanaged device, new user agent family, or impossible geography.
4. Increase severity if the operation is sensitive.

**Illustrative KQL-style logic:**

```text
let recent_signins =
    SigninLogs
    | where TimeGenerated > ago(24h)
    | where ResultType == 0
    | project UserPrincipalName=tolower(UserPrincipalName), SessionId, LoginTime=TimeGenerated,
              LoginIP=IPAddress, LoginUserAgent=UserAgent,
              LoginDevice=tostring(DeviceDetail.deviceId),
              LoginCountry=tostring(LocationDetails.countryOrRegion);
let saas_activity =
    OfficeActivity
    | where TimeGenerated > ago(24h)
    | where Operation in ("FileDownloaded", "MailItemsAccessed", "Add-MailboxPermission")
    | project UserPrincipalName=tolower(UserId), ActivityTime=TimeGenerated,
              Operation, ActivityIP=ClientIP, ObjectId=OfficeObjectId;
recent_signins
| join kind=inner saas_activity on UserPrincipalName
| where ActivityTime between (LoginTime .. LoginTime + 12h)
| where ActivityIP != LoginIP
| summarize Operations=make_set(Operation), Objects=make_set(ObjectId),
            LoginIPs=make_set(LoginIP), ActivityIPs=make_set(ActivityIP)
  by UserPrincipalName, SessionId
```

This is intentionally incomplete because many tenants do not expose a clean session ID across all sources. If session ID is unavailable, use time, user, device, and IP context. That is weaker, but still useful.

The join key is normalized because OfficeActivity.UserId and SigninLogs.UserPrincipalName frequently differ in letter casing; without tolower(), joins can silently drop rows.

### OAuth device code abuse

Device code phishing is difficult because the user authenticates through a legitimate provider page. Detection should focus on:

- Device code flow usage by user population.
- New client app IDs.
- OAuth grants from unusual locations.
- Token issuance followed by mail/file access.
- Login without normal managed device context.
- Users who rarely use device code flow.

This is a perfect weak-signal candidate. Device code flow alone may be legitimate. Device code flow plus new client app plus mailbox access plus new country is much stronger.

## Technique 6: Cloud Data-Plane and SaaS Activity Detection

**Cloud attacks often become visible in data-plane events:**

- Reading objects.
- Querying databases.
- Exporting snapshots.
- Listing secrets.
- Pulling container images.
- Accessing KMS keys.
- Downloading SaaS files.
- Reading email.
- Exporting CRM records.

**Relevant MITRE ATT&CK tags:**

- [T1078.004 — Cloud Accounts](https://1200km.com/threat-matrix/#/techniques/T1078.004)
- [T1213 — Data from Information Repositories](https://1200km.com/threat-matrix/#/techniques/T1213)
- [T1530 — Data from Cloud Storage Object](https://1200km.com/threat-matrix/#/techniques/T1530)
- [T1567.002 — Exfiltration to Cloud Storage](https://1200km.com/threat-matrix/#/techniques/T1567.002)

**Real-world reports:**

- Mandiant’s[UNC5537 Snowflake report](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion)is the direct example: valid credentials, SaaS data access, data theft, and extortion.
- Unit 42’s[TeamTNT cloud environment report](https://unit42.paloaltonetworks.com/teamtnt-operations-cloud-environments/)shows cloud API enumeration and abuse after credential compromise.

The problem is cost and volume.**Data-plane logs can be expensive and noisy.**That does not make them optional. It means detection engineers must design logging policy..

### Practical cloud logging strategy

![Article image](https://cdn-images-1.medium.com/max/659/1*sB6CKYaRU3VmKEMavE3XCw.png)

### Real-world pattern: Snowflake-style data theft

![Article image](https://cdn-images-1.medium.com/max/1024/1*d25JbVYrseAz176JTpx4qw.png)

**Detection hypothesis:**

&gt; A valid user or service account accesses a data warehouse from unusual infrastructure and performs abnormal query/export volume.

**Useful signals:**

- Login from new IP/ASN/country.
- Login without MFA or weaker authentication context.
- New user agent or driver.
- High query count.
- Large result sets.
- COPY INTO external location.
- New network policy exception.
- Access to tables not previously used by that user.
- Activity outside normal schedule.

**Detection logic:**

1. Build a per-user baseline for warehouse access.
2. Track authentication context separately from query behavior.
3. Treat large exports as high-risk when paired with new infrastructure.
4. Alert faster for privileged roles and sensitive schemas.

**Illustrative SQL:**

```text
WITH user_query_today AS (
    SELECT
        user_name,
        COUNT(*) AS query_count,
        COUNT_IF(query_text ILIKE '%COPY INTO%') AS export_count,
        COUNT(DISTINCT client_ip) AS distinct_ips,
        COUNT(DISTINCT warehouse_name) AS warehouses
    FROM warehouse_query_history
    WHERE start_time >= CURRENT_DATE
    GROUP BY user_name
),
baseline AS (
    SELECT
        user_name,
        AVG(daily_query_count) AS avg_queries,
        STDDEV(daily_query_count) AS std_queries
    FROM user_daily_query_baseline
    WHERE day >= CURRENT_DATE - INTERVAL '30' DAY
    GROUP BY user_name
)
SELECT
    q.user_name,
    q.query_count,
    q.export_count,
    q.distinct_ips,
    b.avg_queries,
    b.std_queries
FROM user_query_today q
JOIN baseline b ON q.user_name = b.user_name
WHERE q.export_count > 0
   OR q.query_count > b.avg_queries + 4 * b.std_queries
   OR q.distinct_ips >= 3;
```

Again, this is a skeleton. In production, include role, table sensitivity, known ETL jobs, identity provider context, and query result size where available.

Snowflake-specific footnote: per-query client IP is not available in QUERY_HISTORY; network context must be joined from LOGIN_HISTORY or session views, which is one reason this section separates authentication context from query behavior. The generic table name above is illustrative.

## Technique 7: CI/CD and Software Supply Chain Detection

CI/CD is now production infrastructure.

**Relevant MITRE ATT&CK tags:**

- [T1195 — Supply Chain Compromise](https://1200km.com/threat-matrix/#/techniques/T1195)
- [T1195.001 — Compromise Software Dependencies and Development Tools](https://1200km.com/threat-matrix/#/techniques/T1195.001)
- [T1059 — Command and Scripting Interpreter](https://1200km.com/threat-matrix/#/techniques/T1059)
- [T1552 — Unsecured Credentials](https://1200km.com/threat-matrix/#/techniques/T1552)

**Real-world reports:**

- GitHub Security Lab’s[pwn request writeup](https://securitylab.github.com/resources/github-actions-preventing-pwn-requests/)explains how unsafe pull_request_target workflows expose secrets and repository write context.
- CISA’s[SolarWinds supply-chain advisory](https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a)is the broader reference case for software supply-chain compromise and downstream detection needs.

**It has:**

- Secrets.
- Cloud deployment roles.
- Package publishing rights.
- Build artifacts.
- OIDC trust relationships.
- Release signing authority.
- Repository write access.

GitHub warns that pull_request_target can be risky because workflows run in the context of the base repository. On June 18, 2026, GitHub released actions/checkout v7 as generally available; it refuses fork pull request head or merge checkouts in pull_request_target and qualifying workflow_run workflows by default. GitHub will backport that enforcement to all supported major versions on July 16, 2026, and opt-out requires an explicit allow-unsafe-pr-checkout input. This follows the December 2025 change that made pull_request_target always take the workflow file and checkout commit from the repository's default branch.

### Detection pattern: privileged workflow touched by untrusted input

![Article image](https://cdn-images-1.medium.com/max/1024/1*7Fm7TH18espcH5nE4l2otQ.png)

**Hypothesis**:

&gt; A workflow with secrets or write permissions is triggered by untrusted pull request content.

**Static detection:**

- Workflow uses pull_request_target.
- Workflow checks out PR head SHA.
- Workflow runs scripts from the PR.
- Workflow has contents: write, id-token: write, packages: write, or broad permissions.
- Workflow interpolates PR title/body/branch into shell commands.

**Runtime detection:**

- OIDC token minted from unusual workflow.
- Secret accessed by a workflow triggered from a fork.
- Package publish from unusual runner context.
- Workflow modified shortly before release.
- New GitHub App or deploy key added before workflow run.

**Illustrative static query concept:**

```text
detection:
  event:
    workflow_trigger: pull_request_target
  risky_patterns:
    - uses: actions/checkout
      with_ref_from: github.event.pull_request.head
    - permissions:
        contents: write
    - permissions:
        id-token: write
    - run_contains:
        - github.event.pull_request.title
        - github.event.pull_request.body
severity: high
```

### Logic explanation

This is a supply-chain detection, not a malware detection.

The attacker does not need to compromise a developer laptop if a repository workflow will execute attacker-controlled code with repository secrets. The observable behavior is a dangerous trust transition:

&gt; Untrusted contribution context enters privileged automation context.

That is the detection logic.

## Technique 8: Runtime Detection With eBPF

Kubernetes changed detection because workloads are ephemeral. A compromised pod may exist for minutes. Traditional forensic collection may arrive too late.

Relevant MITRE ATT&CK tags:

- [T1059 — Command and Scripting Interpreter](https://1200km.com/threat-matrix/#/techniques/T1059)
- [T1552.007 — Container and Cloud Credentials](https://1200km.com/threat-matrix/#/techniques/T1552.007)
- [T1610 — Deploy Container](https://1200km.com/threat-matrix/#/techniques/T1610)
- [T1611 — Escape to Host](https://1200km.com/threat-matrix/#/techniques/T1611)

Real-world reports:

- Sysdig’s[TeamTNT kubelet campaign report](https://www.sysdig.com/blog/teamtnt-kubelet-credentials)shows why runtime visibility matters for Kubernetes compromise, credential access, and workload abuse.
- Aqua’s[TeamTNT cloud campaign report](https://www.aquasec.com/blog/teamtnt-reemerged-with-new-aggressive-cloud-campaign/)shows container, Kubernetes, Redis, database, and server targeting in a real cloud-native campaign.

eBPF-based tools such as Falco and Tetragon observe runtime behavior from the kernel level with Kubernetes context.

Falco describes itself as a cloud-native runtime security tool for hosts, containers, Kubernetes, and cloud environments. Tetragon provides eBPF-based security observability and runtime enforcement.

### What eBPF runtime detection is good at

- Shell spawned inside a container.
- Sensitive file read.
- Package manager execution in a running container.
- Unexpected outbound connection.
- Privilege escalation syscall pattern.
- Container escape indicators.
- Kubernetes service account token access.
- Process execution inside a supposedly immutable workload.

### Example: shell in production container

![Article image](https://cdn-images-1.medium.com/max/1024/1*ls0QMECYg_TPG5nVroQscQ.png)

Detection hypothesis:

&gt; A production web container should not spawn an interactive shell.

**Logic:**

1. Observe process execution.
2. Check if process name is sh, bash, dash, zsh, ash, busybox, or python -c.
3. Check Kubernetes namespace, workload, container image.
4. Suppress known admin/debug namespaces.
5. Increase severity if the parent is a web server process.

**Falco-style concept:**

```text
- rule: Shell Spawned In Production Container
  desc: Detect shell execution inside production containers
  condition: >
    spawned_process and container
    and k8s.ns.name in (production_namespaces)
    and proc.name in (shell_binaries)
    and k8s.pod.label[debug] != "true"
  output: >
    Shell spawned in production container
    (user=%user.name command=%proc.cmdline pod=%k8s.pod.name
    namespace=%k8s.ns.name image=%container.image.repository)
  priority: WARNING
```

### Practical caution

Runtime detection produces noise when teams use containers like pets instead of immutable workloads. Start in audit mode. Build allowlists for:

- Debug containers.
- CI runners.
- Maintenance jobs.
- Security scanners.
- Backup jobs.

The value is high, but only after tuning.

## Technique 9: Peer-Group, Rare-Event, and First-Seen Analytics

Anomaly detection works best when it is narrow.

Relevant MITRE ATT&CK tags:

- [T1078 — Valid Accounts](https://1200km.com/threat-matrix/#/techniques/T1078)
- [T1078.004 — Cloud Accounts](https://1200km.com/threat-matrix/#/techniques/T1078.004)
- [T1098 — Account Manipulation](https://1200km.com/threat-matrix/#/techniques/T1098)
- [T1530 — Data from Cloud Storage Object](https://1200km.com/threat-matrix/#/techniques/T1530)

Real-world reports:

- Mandiant’s[UNC5537 Snowflake investigation](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion)is a strong example for first-seen source infrastructure, unusual client behavior, and abnormal data access.
- Unit 42’s[TeamTNT cloud enumeration report](https://unit42.paloaltonetworks.com/teamtnt-operations-cloud-environments/)shows why first-seen credential use and new cloud API behavior are useful signals.

Bad:

&gt; Detect anomalous user behavior.

Better:

&gt; Detect a service principal accessing a new high-sensitivity resource from a new ASN for the first time in 90 days.

### Peer-group analytics

![Article image](https://cdn-images-1.medium.com/max/1024/1*wbAx1x-nuXlN1BGns1LduA.png)

**Peer groups compare an entity to similar entities:**

- Developers to developers.
- Finance users to finance users.
- Production service accounts to production service accounts.
- Kubernetes service accounts in the same namespace.
- GitHub repositories in the same organization.

**Example:**

```text
WITH peer_stats AS (
    SELECT
        peer_group,
        AVG(daily_download_count) AS peer_avg,
        STDDEV(daily_download_count) AS peer_std
    FROM user_daily_activity
    WHERE day >= CURRENT_DATE - INTERVAL '30' DAY
    GROUP BY peer_group
)
SELECT
    u.user_id,
    u.peer_group,
    u.daily_download_count,
    p.peer_avg,
    p.peer_std
FROM current_user_activity u
JOIN peer_stats p ON u.peer_group = p.peer_group
WHERE u.daily_download_count > p.peer_avg + 4 * p.peer_std;
```

### First-seen analytics

**First-seen analytics are practical because they are explainable:**

- First time this user used this SaaS app.
- First time this service principal accessed this subscription.
- First time this access key appeared from this ASN.
- First time this repository published a package.
- First time this container image spawned a shell.

**Illustrative detection:**

```text
SELECT
    event_time,
    principal_id,
    source_asn,
    resource_id,
    action
FROM cloud_activity e
WHERE action = 'AssumeRole'
  AND NOT EXISTS (
      SELECT 1
      FROM historical_principal_asn h
      WHERE h.principal_id = e.principal_id
        AND h.source_asn = e.source_asn
        AND h.first_seen < CURRENT_DATE - INTERVAL '1' DAY
  );
```

### Logic explanation

First-seen does not mean malicious. It means “requires context.”

It becomes strong when combined with:

- Sensitive target.
- Privileged identity.
- New device.
- New source infrastructure.
- High-volume data action.
- Recent credential exposure.
- Impossible travel.

## Technique 10: Statistical Change Detection Without Magic

Statistical detection is useful, but broad unsupervised anomaly detection is often disappointing in SOC operations.

Relevant MITRE ATT&CK tags:

- [T1030 — Data Transfer Size Limits](https://1200km.com/threat-matrix/#/techniques/T1030)
- [T1041 — Exfiltration Over C2 Channel](https://1200km.com/threat-matrix/#/techniques/T1041)
- [T1530 — Data from Cloud Storage Object](https://1200km.com/threat-matrix/#/techniques/T1530)
- [T1567 — Exfiltration Over Web Service](https://1200km.com/threat-matrix/#/techniques/T1567)

Real-world reports:

- Mandiant’s[UNC5537 Snowflake report](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion)is a practical source case for abnormal query, export, and SaaS data-access volume.
- Microsoft’s[AiTM phishing and BEC report](https://www.microsoft.com/en-us/security/blog/2023/06/08/detecting-and-mitigating-a-multi-stage-aitm-phishing-and-bec-campaign/)shows why count and volume changes become useful when paired with identity and mailbox context.

**The practical approach is scoped statistical detection:**

- One metric.
- One entity type.
- One meaningful baseline.
- One clear response.

**Good targets:**

- Bytes egressed per workload.
- File downloads per SaaS user.
- Queries per data warehouse role.
- Failed logins per source.
- Token grants per app.
- DNS query entropy per host.
- Process execution rarity per server role.

### Example: SaaS bulk download anomaly

![Article image](https://cdn-images-1.medium.com/max/1024/1*S5HYG8GYB-HT1bLh8VJH5g.png)

I used this pattern in a previous article: a count-based M365 download anomaly with baseline and z-score, with the explicit warning that OfficeObjectId is not a byte-count field.

That warning is important. A detection engineer must know what the field actually means.

**Logic:**

1. Build daily download count per user.
2. Calculate baseline average and standard deviation.
3. Compare today’s value to baseline.
4. Require minimum baseline days.
5. Suppress users with zero or unstable baseline.
6. Add sensitivity and device context.

**Illustrative KQL:**

```text
let min_baseline_days = 10;
let z_threshold = 4.0;
let baseline =
    OfficeActivity
    | where TimeGenerated between (ago(31d) .. ago(1d))
    | where Operation in ("FileDownloaded", "FileSyncDownloadedFull")
    | summarize DailyCount=count() by UserId, bin(TimeGenerated, 1d)
    | summarize BaselineAvg=avg(DailyCount),
                BaselineStd=stdev(DailyCount),
                Days=count()
      by UserId
    | where Days >= min_baseline_days and BaselineStd > 0;
OfficeActivity
| where TimeGenerated > ago(1d)
| where Operation in ("FileDownloaded", "FileSyncDownloadedFull")
| summarize TodayCount=count(), Objects=make_set(OfficeObjectId, 20) by UserId
| join kind=inner baseline on UserId
| extend ZScore = (TodayCount - BaselineAvg) / BaselineStd
| where ZScore >= z_threshold
| project UserId, TodayCount, BaselineAvg, BaselineStd, ZScore, Objects
```

The minimum activity-day floor must be high enough to produce a stable standard deviation but low enough that normal users qualify; requiring 30 active download days in a 30-day window excludes most real tenants.

### Common mistake

Do not deploy a statistical detector without backtesting.

**Before production:**

- Run it on 30–90 days of history.
- Count daily alert volume.
- Review top 20 historical hits.
- Label known business events.
- Add peer groups.
- Decide whether it should alert or only add risk.

## Technique 11: Security Data Lakes, OCSF, and Portable Content

Security data lakes are not magic. They are useful when they solve concrete problems:

- SIEM ingestion cost.
- Long-term retention.
- Historical hunting.
- Cross-platform analytics.
- Data science and ML workloads.
- Schema normalization.
- Vendor portability.

Relevant MITRE ATT&CK tags:

- [T1078 — Valid Accounts](https://1200km.com/threat-matrix/#/techniques/T1078)
- [T1110.003 — Password Spraying](https://1200km.com/threat-matrix/#/techniques/T1110.003)
- [T1195 — Supply Chain Compromise](https://1200km.com/threat-matrix/#/techniques/T1195)
- [T1530 — Data from Cloud Storage Object](https://1200km.com/threat-matrix/#/techniques/T1530)

Real-world reports:

- Microsoft’s[Midnight Blizzard guidance](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/)shows why identity, OAuth, audit, and workload telemetry need to be queryable together.
- CISA’s[SolarWinds advisory](https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a)shows why long-retention, cross-domain telemetry matters for complex supply-chain investigations.

OCSF is important because it gives a vendor-agnostic security schema. AWS Security Lake uses OCSF and stores data in Parquet. That matters because analysts and engineers can work against a common model instead of rewriting every rule for every source.

### Practical architecture

![Article image](https://cdn-images-1.medium.com/max/1024/1*tOdMhRVCBbnGvHkwskHvKQ.png)

### Practical rule portability strategy

**Use three layers:**

1. Sigma for portable logic where possible.
2. Native platform languages for stateful, sequence, and high-performance detections.
3. OCSF or a local canonical schema as the field contract.

Sigma is excellent for sharing and versioning log detection ideas. Sigma v2 adds correlation meta-rules, but backend support for correlations is still limited compared to single-event rules, so complex stateful logic usually still lands in EQL, YARA-L, SPL, KQL, SQL, or a streaming engine.

The realistic rule is:

&gt; Portability is valuable, but fidelity is more valuable for high-risk detections.

## Technique 12: Detection for LLM, Agent, and MCP Workflows

LLM applications are now part of enterprise infrastructure.

Relevant MITRE ATT&CK tags:

- [T1190 — Exploit Public-Facing Application](https://1200km.com/threat-matrix/#/techniques/T1190)
- [T1059 — Command and Scripting Interpreter](https://1200km.com/threat-matrix/#/techniques/T1059)
- [T1552 — Unsecured Credentials](https://1200km.com/threat-matrix/#/techniques/T1552)
- [T1486 — Data Encrypted for Impact](https://1200km.com/threat-matrix/#/techniques/T1486)

Real-world reports:

- Sysdig’s[JADEPUFFER report](https://www.sysdig.com/blog/jadepuffer-agentic-ransomware-for-automated-database-extortion)is the core case study for agent-driven exploitation, credential access, database targeting, and impact.
- OWASP’s[Practical Guide for Secure MCP Server Development](https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/)is not an incident report, but it maps the MCP-specific tool and trust-boundary risks defenders should instrument.

**They can:**

- Read documents.
- Query databases.
- Call tools.
- Write code.
- Modify tickets.
- Send messages.
- Trigger workflows.
- Use MCP servers.

OWASP’s 2025 Top 10 for LLMs includes prompt injection, sensitive information disclosure, supply-chain vulnerabilities, excessive agency, and other risks. NIST’s Generative AI Profile emphasizes that GenAI introduces or exacerbates risks and that measurement is still immature. MCP’s security guidance highlights risks and best practices specific to tool-connected agent systems.

The detection engineering problem is clear:

&gt; If an agent can act, the agent must produce security telemetry.

### Required telemetry for agent detection

![Article image](https://cdn-images-1.medium.com/max/495/1*x8RuN7eQrd4yebT14V45iQ.png)

OpenTelemetry GenAI semantic conventions are relevant because they define common attributes for model requests, responses, tokens, tools, and system instructions, but they are still in development and not yet stable, so teams should expect attribute names to change and pin versions.

### Detection pattern: prompt injection leading to tool misuse

![Article image](https://cdn-images-1.medium.com/max/1024/1*7Gn1qCZOy0Qogi9kTWB4mg.png)

**Hypothesis**:

&gt; External content attempts to override system intent and causes an agent to call a sensitive tool outside the user’s normal task.

**Logic:**

1. Identify external retrieved content.
2. Detect instruction-like text in retrieved content.
3. Observe later sensitive tool call.
4. Check whether the tool call matches the user’s original intent.
5. Alert if there is no approval gate.

Illustrative event model:

```text
{
  "event_type": "genai.tool_call",
  "user_id": "u123",
  "agent_id": "research-agent-prod",
  "conversation_id": "c456",
  "input_source": "retrieved_document",
  "retrieved_domain": "external.example",
  "tool_name": "send_email",
  "tool_risk": "high",
  "approval_required": true,
  "approval_obtained": false,
  "arguments_classification": ["external_recipient", "attachment"],
  "timestamp": "2026-07-10T12:00:00Z"
}
```

Illustrative detection:

```text
SELECT
    conversation_id,
    user_id,
    agent_id,
    tool_name,
    retrieved_domain,
    approval_required,
    approval_obtained
FROM genai_agent_events
WHERE event_type = 'genai.tool_call'
  AND tool_risk = 'high'
  AND input_source = 'retrieved_document'
  AND approval_required = TRUE
  AND approval_obtained = FALSE;
```

### MCP-specific detection ideas

For MCP servers and clients, monitor:

- New MCP server registration.
- Tool definition changes.
- Tool descriptions containing hidden or instruction-like text.
- Tool schema changes.
- Tool calls that access secrets, files, shell, network, email, or tickets.
- Tool calls from untrusted context.
- High-frequency retry loops.
- Tool output that contains instructions for the model.
- Agent actions that cross tenant, repository, or workspace boundaries.

Tool poisoning is a supply-chain and trust-boundary problem. The model trusts tool metadata. Detection must therefore inspect metadata changes, not only user prompts.

## Technique 13: AI-Assisted Detection Engineering

AI can help detection engineering. It should not own detection engineering.

Relevant MITRE ATT&CK tags:

- [T1078 — Valid Accounts](https://1200km.com/threat-matrix/#/techniques/T1078)
- [T1110.003 — Password Spraying](https://1200km.com/threat-matrix/#/techniques/T1110.003)
- [T1190 — Exploit Public-Facing Application](https://1200km.com/threat-matrix/#/techniques/T1190)
- [T1550.004 — Web Session Cookie](https://1200km.com/threat-matrix/#/techniques/T1550.004)

Real-world reports:

- Mandiant’s[UNC5537 Snowflake report](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion), Microsoft’s[Midnight Blizzard guidance](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/), and Sysdig’s[JADEPUFFER report](https://www.sysdig.com/blog/jadepuffer-agentic-ransomware-for-automated-database-extortion)are useful source documents for testing AI-assisted extraction of hypotheses, telemetry requirements, ATT&CK mappings, and draft detection logic.

**Good uses:**

- Translate CTI reports into detection hypotheses.
- Extract ATT&CK candidates.
- Draft Sigma/KQL/SPL/EQL/YARA-L.
- Explain unfamiliar logs.
- Generate test fixtures.
- Summarize alert evidence.
- Suggest false-positive questions.
- Convert one query dialect into another.
- Review detection metadata completeness.

**Risky uses:**

- Deploying generated rules without tests.
- Letting an LLM decide severity without evidence.
- Autonomous response actions.
- Schema guessing.
- Ignoring local field names.
- Treating benchmark success as production proof.

Recent research such as RulePilot suggests LLM-based agents can assist rule creation and conversion. CORTEX-style research suggests multi-agent LLM systems can improve alert triage when they work over real evidence and produce auditable reasoning. But NIST’s GenAI risk work and security-specific evaluations still support a conservative operating model:**AI-assisted, human-approved.**

### Practical AI-assisted workflow

![Article image](https://cdn-images-1.medium.com/max/1024/1*cvMvdl9g2v5Z90FVyvEbnQ.png)

Useful guardrail:

### The LLM may draft. The pipeline must verify. The human must approve.

## A Practical 90-Day Implementation Plan

![Article image](https://cdn-images-1.medium.com/max/1024/1*k8s6QUucor2h7eabqg9ecw.png)

### Days 1–15: Inventory reality

- Export all active detections.
- Identify owners.
- Identify required data sources.
- Mark detections that cannot be tested.
- Map top detections to ATT&CK and telemetry.
- List identity, cloud, SaaS, CI/CD, endpoint, and Kubernetes logs.

Deliverable:

&gt; Detection inventory with telemetry dependency map.

### Days 16–30: Build validation basics

- Put rules in Git.
- Add schema for detection metadata.
- Add CI checks for syntax and required fields.
- Add test fixture format.
- Pick top 10 critical detections.
- Write one malicious and one benign fixture for each.

Deliverable:

&gt; First detections-as-code pipeline.

### Days 31–45: Validate against behavior

- Run Atomic Red Team or equivalent for selected ATT&CK techniques.
- Replay synthetic logs.
- Record which rules fired.
- Record which rules did not fire.
- Fix missing telemetry before tuning logic.

Deliverable:

&gt; Syntax-versus-reality test report.

### Days 46–60: Add stateful identity and cloud detections

- Build password spray to success sequence.
- Build first-seen source ASN for privileged users.
- Build OAuth consent or device-code monitoring.
- Build cloud role assumption from new infrastructure.
- Build SaaS bulk download baseline.

Deliverable:

&gt; First entity-centric detection set.

### Days 61–75: Add risk scoring

- Define weak-signal events.
- Create risk score table.
- Add 24-hour and 7-day score windows.
- Route low-fidelity detections into risk, not analyst queue.
- Create escalation threshold.

Deliverable:

&gt; First risk-based alerting workflow.

### Days 76–90: Add drift and quality monitoring

- Monitor log volume by source.
- Monitor required field null rates.
- Monitor parser failure rates.
- Monitor delayed ingestion.
- Alert when critical telemetry drops.
- Add monthly detection review.

Deliverable:

&gt; Telemetry drift dashboard and alerting.

## Validation Metrics That Matter

ATT&CK coverage percentage is not enough.

**Better metrics:**

![Article image](https://cdn-images-1.medium.com/max/660/1*hSSOkqlz92RersSyTyE9Pw.png)

The most important metric is usually not fancy:

&gt; How many detections have been proven to fire against the behavior they claim to detect?

## Common Failure Modes

![Article image](https://cdn-images-1.medium.com/max/1024/1*OkL3m06GG8wTn3Nq4sWELA.png)

### 1. ATT&CK heatmap theater

A rule tagged to a technique does not mean the technique is covered. Coverage requires telemetry, logic, and validation.

### 2. Syntax-only detection-as-code

YAML validation is useful. It is not behavioral validation.

### 3. Data lake optimism

A security data lake stores data. It does not automatically create detections. Normalization, content, and query patterns still matter.

### 4. AI hallucinated schemas

LLMs often invent field names that look correct. Always validate against the real schema.

### 5. Broad anomaly detection

Unscoped anomaly detection produces noise. Use narrow metrics, entity context, and peer groups.

### 6. Missing data-plane logs

Many cloud exfiltration detections fail because the organization logs admin activity but not data access.

### 7. Over-tuned atomic rules

Aggressive allowlisting can remove the exact weak signals needed for attack-chain reconstruction.

### 8. Runtime detection without workload context

Kubernetes runtime alerts are noisy without namespace, deployment, image, service account, and environment context.

### 9. No shadow mode

Deploying new rules directly into the analyst queue creates avoidable fatigue.

### 10. Autonomous response too early

Automated containment should be reserved for high-confidence detections with tested rollback paths.

## References

1. MITRE ATT&CK, “Data Components.”[https://attack.mitre.org/datacomponents/](https://attack.mitre.org/datacomponents/)
2. MITRE ATT&CK, “Data Sources.”[https://attack.mitre.org/datasources/](https://attack.mitre.org/datasources/)
3. MITRE Cyber Analytics Repository.[https://car.mitre.org/](https://car.mitre.org/)
4. OCSF, “Open Cybersecurity Schema Framework.”[https://ocsf.io/](https://ocsf.io/)
5. AWS Security Lake, “Open Cybersecurity Schema Framework in Security Lake.”[https://docs.aws.amazon.com/security-lake/latest/userguide/open-cybersecurity-schema-framework.html](https://docs.aws.amazon.com/security-lake/latest/userguide/open-cybersecurity-schema-framework.html)
6. AWS Security Lake, “What is Amazon Security Lake?”[https://docs.aws.amazon.com/security-lake/latest/userguide/what-is-security-lake.html](https://docs.aws.amazon.com/security-lake/latest/userguide/what-is-security-lake.html)
7. AWS CloudTrail, “Logging data events.”[https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html)
8. Google Cloud, “Cloud Audit Logs overview.”[https://docs.cloud.google.com/logging/docs/audit](https://docs.cloud.google.com/logging/docs/audit)
9. Microsoft Entra ID, “Sign-in logs in Microsoft Entra ID.”[https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins)
10. Microsoft Entra ID, “Service principal sign-in logs.”[https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-service-principal-sign-ins](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-service-principal-sign-ins)
11. SigmaHQ, “Sigma.”[https://sigmahq.io/sigma/](https://sigmahq.io/sigma/)
12. SigmaHQ GitHub repository.[https://github.com/SigmaHQ/sigma](https://github.com/SigmaHQ/sigma)
13. Elastic, “EQL.”[https://www.elastic.co/docs/explore-analyze/query-filter/languages/eql](https://www.elastic.co/docs/explore-analyze/query-filter/languages/eql)
14. Elastic, “Event correlation EQL rules.”[https://www.elastic.co/docs/solutions/security/detect-and-alert/eql](https://www.elastic.co/docs/solutions/security/detect-and-alert/eql)
15. Google SecOps, “Single and multiple event rules in YARA-L.”[https://docs.cloud.google.com/chronicle/docs/yara-l/yara-l-2-0-examples](https://docs.cloud.google.com/chronicle/docs/yara-l/yara-l-2-0-examples)
16. Google SecOps, “Create multi-stage queries.”[https://docs.cloud.google.com/chronicle/docs/investigation/multi-stage-yaral](https://docs.cloud.google.com/chronicle/docs/investigation/multi-stage-yaral)
17. Microsoft Sentinel, “Advanced multistage attack detection in Microsoft Sentinel.”[https://learn.microsoft.com/en-us/azure/sentinel/fusion](https://learn.microsoft.com/en-us/azure/sentinel/fusion)
18. Red Canary, “Atomic Red Team.”[https://github.com/redcanaryco/atomic-red-team](https://github.com/redcanaryco/atomic-red-team)
19. Apache Caldera (Incubating), formerly MITRE Caldera.[https://caldera.apache.org/](https://caldera.apache.org/)
20. Falco.[https://falco.org/](https://falco.org/)
21. Tetragon.[https://tetragon.io/](https://tetragon.io/)
22. Mandiant / Google Cloud, “UNC5537 Targets Snowflake Customer Instances for Data Theft and Extortion.”[https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion)
23. Microsoft Security, “Midnight Blizzard: Guidance for responders on nation-state attack.”[https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/)
24. GitHub Docs, “Secure use reference.”[https://docs.github.com/en/actions/reference/security/secure-use](https://docs.github.com/en/actions/reference/security/secure-use)
25. GitHub Security Lab, “Keeping your GitHub Actions and workflows secure Part 1.”[https://securitylab.github.com/resources/github-actions-preventing-pwn-requests/](https://securitylab.github.com/resources/github-actions-preventing-pwn-requests/)
26. GitHub Blog, “Safer pull_request_target defaults for GitHub Actions checkout.”[https://github.blog/changelog/2026-06-18-safer-pull_request_target-defaults-for-github-actions-checkout/](https://github.blog/changelog/2026-06-18-safer-pull_request_target-defaults-for-github-actions-checkout/)
27. OWASP Gen AI Security Project, “OWASP Top 10 for LLM Applications 2025.”[https://genai.owasp.org/llm-top-10/](https://genai.owasp.org/llm-top-10/)
28. OWASP Gen AI Security Project, “LLM01:2025 Prompt Injection.”[https://genai.owasp.org/llmrisk/llm01-prompt-injection/](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
29. NIST, “AI Risk Management Framework.”[https://www.nist.gov/itl/ai-risk-management-framework](https://www.nist.gov/itl/ai-risk-management-framework)
30. NIST, “Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile.”[https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
31. Model Context Protocol, “Security Best Practices.”[https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
32. OWASP Gen AI Security Project, “A Practical Guide for Secure MCP Server Development.”[https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/](https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/)
33. OpenTelemetry, “Semantic Conventions.”[https://opentelemetry.io/docs/specs/semconv/](https://opentelemetry.io/docs/specs/semconv/)
34. OpenTelemetry, “Gen AI attributes.”[https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/](https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/)
35. Sysdig, “JADEPUFFER: Agentic ransomware for automated database extortion.”[https://www.sysdig.com/blog/jadepuffer-agentic-ransomware-for-automated-database-extortion](https://www.sysdig.com/blog/jadepuffer-agentic-ransomware-for-automated-database-extortion)
36. RulePilot, “An LLM-Powered Agent for Security Rule Generation.”[https://arxiv.org/abs/2511.12224](https://arxiv.org/abs/2511.12224)
37. CORTEX, “Collaborative LLM Agents for High-Stakes Alert Triage.”[https://arxiv.org/abs/2510.00311](https://arxiv.org/abs/2510.00311)
38. Andrey Pautov, “The Atomic Standard: A Practitioner’s Compendium for Single-Event Threat Detection.”[https://medium.com/@1200km/the-atomic-standard-a-practitioners-compendium-for-single-event-threat-detection-570c4241d4d9](https://medium.com/@1200km/the-atomic-standard-a-practitioners-compendium-for-single-event-threat-detection-570c4241d4d9)
39. Andrey Pautov, “Correlation-Based Detection Rules in Cybersecurity.”[https://medium.com/@1200km/correlation-based-detection-rules-in-cybersecurity-from-atomic-events-to-behavioral-insight-1b3df31597bb](https://medium.com/@1200km/correlation-based-detection-rules-in-cybersecurity-from-atomic-events-to-behavioral-insight-1b3df31597bb)
40. Andrey Pautov, “Malicious Activity as a Statistical Signal.”[https://medium.com/@1200km/malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-based-90df8b6dea12](https://medium.com/@1200km/malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-based-90df8b6dea12)

## Follow my works

I publish practical cybersecurity research, CTI workflows, detection engineering notes, malware analysis projects, OpenCTI work, cloud and Kubernetes security research, AI-assisted security tooling, labs, and technical guides.
