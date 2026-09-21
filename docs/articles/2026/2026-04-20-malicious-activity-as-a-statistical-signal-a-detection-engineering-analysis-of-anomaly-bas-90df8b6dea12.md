---
title: "Malicious Activity as a Statistical Signal: Anomaly Detection Engineering"
description: "Explore anomaly detection and multi-event correlation through real incidents, with telemetry, ATT&CK mappings and explicit evidence limits."
image: "/research/anomaly-visuals/malicious-activity-statistical-signal-cover.png"
---

import ResearchFigure from '@site/src/components/ResearchFigure';
import ResearchCover from '@site/src/components/ResearchCover';

<span id="malicious-activity-as-a-statistical-signal-anomaly-detection-engineering"></span>

# Malicious Activity as a Statistical Signal: Anomaly Detection Engineering

**Fourteen anomaly families, multi-event correlation, and the telemetry needed to distinguish suspicious behavior from legitimate change.**

<ResearchCover />

An unusual login, a new process relationship, or a sudden data export can be an investigation lead. None proves an intrusion on its own. This research connects statistical anomaly concepts to documented attacker behavior, explains which logs could expose that behavior, and makes the limits of each interpretation explicit.

This September 2026 technical revision retains the incident register and topic crosslinks, corrects the implementation guidance, and adds reproducible functional tests, public lab-recording replay and an explicitly synthetic statistical experiment. These evidence levels remain separate: a documented intrusion is not a detector benchmark.

> **Scope and safety:** This is defensive research for detection engineers and threat hunters. The supplied tests process synthetic or public recorded events; they do not execute attack commands. Use live exercises only in authorized, isolated environments. No production detection accuracy or automatic-containment safety is established.

<ResearchFigure id="research-map" />

:::info Article Metadata
- **Category:** Detection Engineering
- **Source article:** [https://medium.com/@1200km/malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12](https://medium.com/@1200km/malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12)
- **Published:** 2026-04-20
- **Research updated:** 2026-09-21
- **Visual revision:** 55 evidence-linked figures appear inline: 45 reviewed, user-supplied infographics and 10 generated diagrams. All have text equivalents and full-size links; the generated diagrams also have separate narrow-screen layouts. Calculated research-result figures remain bound to the committed evidence.
- **Historical media:** All 44 original images, including the old cover, remain in Section 9.8; they are not current technical guidance.
- **Implementation revision:** canonical KQL examples, explicit telemetry contracts and downloadable validation evidence replace the broken operational snippets.
:::

## Ecosystem Fit

This is the revised 1200km.com edition. The Medium version is not automatically updated. Use the [incident and tag index](#anomaly-evidence-index) to navigate across cases, telemetry domains, statistical concepts and related research. Original query exports remain in an explicitly historical artifact; the operational examples now have a single maintained source.

By [Andrey Pautov](https://medium.com/@1200km) — first published April 2026; incident expansion and technical revision September 2026.

> Evidence labels: **[Documented] / [source-reported]** = the cited source reports the observation; it was not independently reproduced here. **[Inferred]** = the detection interpretation is the author's reasoning from that observation. A documented intrusion does not establish that a proposed anomaly detector would have detected it.

## Table of Contents

:::info Evidence and validation status
The technical guidance has been revised in response to the factual audit and external review. Section 8 reports actual functional tests and public-recording observations; Section 9 distinguishes a synthetic sensitivity experiment from production evaluation. Read the <a href="https://1200km.com/articles/research/anomaly-fact-audit.md" target="_self">reconciled claim ledger</a> for corrections and remaining limits. Anomaly tags indicate topical relevance, not accuracy certification.
:::

- [1. The Hypothesis — Scope and Definitions](#1-the-hypothesis--scope-and-definitions)
- [2. Taxonomy of Anomaly Types](#2-taxonomy-of-anomaly-types)
  - [Volumetric](#anomaly-volumetric) · [Frequency / Rate](#anomaly-frequency-rate) · [Temporal](#anomaly-temporal)
  - [Peer Group](#anomaly-peer-group) · [Sequence](#anomaly-sequence) · [Graph / Relationship](#anomaly-graph-relationship)
  - [Geographic / ASN](#anomaly-geographic-asn) · [Identity / Access](#anomaly-identity-access)
  - [Rare Process / Service](#anomaly-rare-process-service) · [Parent–Child](#anomaly-parent-child)
  - [Data Movement](#anomaly-data-movement) · [Protocol / Application](#anomaly-protocol-application)
  - [Negative / Absence](#anomaly-negative-absence) · [State Change](#anomaly-state-change)
  - [Multi-Event Correlation](#anomaly-multi-event-correlation)
  - [Incident register, tags and evidence boundaries](#anomaly-evidence-index)
- [3. Mapping Anomalies to ATT&CK Tactics](#3-mapping-anomalies-to-the-attck-lifecycle)
- [4. Evidence Register: Real APT Campaigns and Documented Anomaly Patterns](#4-evidence-register-real-apt-campaigns-and-documented-anomaly-patterns)
- [5. Detection by Log Source and Security Device](#5-detection-by-log-source-and-security-device)
- [6. Credential-Based Attacks: Detection Engineering Deep Dive](#6-credential-based-attacks-detection-engineering-deep-dive)
- [7. How Attackers Suppress Anomaly Visibility](#7-how-attackers-suppress-anomaly-visibility)
- [8. Detection Engineering Patterns and Logic Examples](#8-detection-engineering-patterns-and-logic-examples)
- [9. Implementation Guidance](#9-implementation-guidance)
  - [Reproducible statistical study](#96-a-reproducible-statistical-study)
  - [Revision and remaining work](#97-revision-reproducibility-and-remaining-work)
- [10. Conclusion](#10-conclusion)
- [11. References](#11-references) and [incident primary sources](#incident-primary-sources)
- [Follow My Work](#follow-my-work)

## 1. The Hypothesis — Scope and Definitions

The claim that malicious activity creates detectable anomaly patterns underpins UEBA platforms, ML-based SIEM analytics, network traffic analysis tools, and a large portion of behavioural detection engineering practice.

The operational hypothesis is conditional: some malicious behavior differs measurably from a suitable baseline in available telemetry. This selected case series does not establish how often that holds across attacks or enterprises. Absence of an anomaly may reflect ordinary-looking malicious behavior, the wrong comparison population or missing observations.

### 1.1 Definitions


**Anomaly.** NIST SP 800–94 defines anomaly-based intrusion detection as the comparison of normal activity profiles against observed events to identify significant deviations[[1]](https://csrc.nist.gov/pubs/sp/800/94/final). In operational terms, an anomaly is a measurable deviation from one or more baselines: an entity baseline (this user, this host), a peer baseline (users in this role, hosts in this class), a temporal baseline (activity at this time of day), a relationship model (who normally communicates with whom), or an event-sequence model (what normally follows what).

#### Point anomaly {#anomaly-form-point}

A single data instance that is anomalous relative to the rest of the data (Chandola et al., 2009)[[2]](https://dl.acm.org/doi/10.1145/1541880.1541882).
**Synthetic example:** one observation lies far outside the rest of a fixed, explicitly defined univariate distribution. If its unusualness depends on that host's history or role, the analysis is also contextual; these interpretations need not be mutually exclusive.

<ResearchFigure id="statistical-forms" />

#### Contextual anomaly {#anomaly-form-contextual}

An instance that is anomalous only in a specific context[[2]](https://dl.acm.org/doi/10.1145/1541880.1541882).
**Synthetic example:** an IFM backup operation on a domain controller outside the approved maintenance context differs from the same operation during a verified backup job. The host role, principal and purpose matter; the executable name alone is not a verdict.

<ResearchFigure id="definition-contextual" />

#### Collective anomaly {#anomaly-form-collective}

A collection of related instances that is anomalous together, even if each individual instance is not[[2]](https://dl.acm.org/doi/10.1145/1541880.1541882).
**Synthetic example:** a sequence of individually ordinary authentication, permission and data-access events departs from an expected workflow when considered together. The sequence still needs benign alternatives and reliable event/entity correlation.

<ResearchFigure id="definition-collective" />

**Malicious-behaviour correlation.** The analytical step that links an observed anomaly to an attacker goal, technique, or intrusion stage. An anomaly is not a verdict — it is evidence. A detection becomes operationally useful when that evidence is correlated with asset context, identity state, companion telemetry, or known adversary tradecraft.

<ResearchFigure id="definition-correlation" />

### 1.2 The Central Tension

Malicious activity can be rare relative to ordinary enterprise events. **Precision and false-positive rate are different quantities:** precision is TP / (TP + FP), while false-positive rate is FP / (FP + TN). In an illustrative population of 1,000,000 benign events, a 1% false-positive rate produces 10,000 false alerts. If 100 malicious events are present and recall is 90%, the resulting 90 true alerts yield about 0.89% precision. These are explanatory numbers, not measured results. NIST SP 800–94 discusses the false positives caused by benign deviations from normal profiles[[1]](https://csrc.nist.gov/pubs/sp/800/94/final).

Operational usefulness depends on the costs of misses and false alerts, available observability, and how the output changes an analyst's decision. Stable, role-appropriate baselines can help, but their value must be measured rather than inferred from a rarity score.

<ResearchFigure id="base-rate" />

## 2. Taxonomy of Anomaly Types


The taxonomy below is an operational synthesis, not a standardized list of mutually exclusive classes. Its statistical foundation comes from [Chandola et al.](https://dl.acm.org/doi/10.1145/1541880.1541882) [2] and [NIST SP 800–94](https://csrc.nist.gov/pubs/sp/800/94/final) [1]. The [incident-source register](#incident-primary-sources) supplies primary investigations for each type. One intrusion can produce several signals, and a proposed statistical interpretation is not itself a reported detector result.


### 2.1 Volumetric {#anomaly-volumetric}

Unusual amount of data or events over a defined observation window.

**Telemetry contract:** Directional flow counters, exports, object access or audit events; record whether units are bytes, objects, rows or events.

**Candidate method [unvalidated until tested]:** Compare aligned windows within a workload/role. Evaluate empirical quantiles or an appropriate location/scale model.

**Benign alternatives and limits:** Backups, reporting, synchronization and incident recovery can create large legitimate volumes.

<ResearchFigure id="family-volumetric" />

<!-- anomaly-evidence:volumetric:start -->
**Evidence tags:** [Cloud and SaaS](#tag-cloud) · [Network telemetry](#tag-network). **Statistical forms:** [point](#anomaly-form-point), [collective](#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-volumetric" target="_self">Browse articles and guides: Volumetric</a>.

**Reported incidents and detection interpretations**

#### UNC5537 and Snowflake customer data theft {#case-volumetric-unc5537-snowflake-2024}

**Period:** 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant investigated stolen customer credentials used to access Snowflake instances and exfiltrate database records. [Mandiant: UNC5537 Targets Snowflake Customer Instances for Data Theft and Extortion](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion).

**Anomaly interpretation [inferred]:** Compare exported rows or bytes with that account's job and warehouse workload. A large legitimate reporting job remains a competing explanation.

**Telemetry to validate:** Snowflake query and access history; export destinations; identity and warehouse context.

**Boundary / competing explanation:** The report does not provide a universal per-account volume threshold or a measured anomaly-detector success rate.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1078.004/" target="_self">T1078.004 — Valid Accounts: Cloud Accounts</a>

#### HTTP/2 Rapid Reset DDoS campaign {#case-volumetric-rapid-reset-2023}

**Period:** August 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Cloudflare reported HTTP/2 attacks reaching just above 201 million requests per second and automatic detection and mitigation. [Cloudflare: HTTP/2 Rapid Reset: deconstructing the record-breaking attack](https://blog.cloudflare.com/technical-breakdown-http2-rapid-reset-ddos-attack/).

**Anomaly interpretation [inferred]:** This is a documented extreme-load event. Separate total resource load from rate and compare it with service capacity and normal demand.

**Telemetry to validate:** Edge request counters, connection statistics, origin saturation and mitigation events.

**Boundary / competing explanation:** This is Cloudflare's measurement, not a generic enterprise threshold or independent validation of a particular model.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1499/" target="_self">T1499 — Endpoint Denial of Service</a>

**Crosslinks:** [Frequency / Rate](#anomaly-frequency-rate) · [Data Movement](#anomaly-data-movement). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#12-magnitude-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-09-18-ai-agent-vs-human-with-wireshark-six-malware-pcaps-put-to-the-test-63ffeaed97de/" target="_self">AI Agent vs. Human with Wireshark: Six Malware PCAPs Put to the Test</a>.
<!-- anomaly-evidence:volumetric:end -->

**Illustrative scenarios (not additional incidents):**

- A finance user whose historical complete 40-minute windows contain 20–50 download events produces 8,000 download events in a comparable window. Audit-event counts are not necessarily unique documents.

- A database server with stable nightly replication begins sending 12 GB of outbound traffic to an external IP at 03:12, far above its normal egress baseline.

- A workstation that usually makes fewer than 200 DNS requests per hour suddenly generates 9,000 queries, including many high-entropy subdomains.

- A cloud service account that typically reads a few dozen objects per day suddenly accesses 30,000 S3 objects in one session.

- A file server that normally changes 1–2 GB of data daily suddenly shows mass file modifications and deletions consistent with ransomware impact.


### 2.2 Frequency / Rate {#anomaly-frequency-rate}

Unusual event frequency per entity and unit of observed time.

**Telemetry contract:** Authentication, API, process or DNS events, with collection completeness and event deduplication.

**Candidate method [unvalidated until tested]:** Measure count, duration, source diversity and target breadth. Check dispersion and seasonality before choosing a Poisson model.

**Benign alternatives and limits:** Retries, outages, load tests and shared gateways can resemble an attack burst.

<ResearchFigure id="family-frequency-rate" />

<!-- anomaly-evidence:frequency-rate:start -->
**Evidence tags:** [Identity and access](#tag-identity) · [Network telemetry](#tag-network). **Statistical forms:** [collective](#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-frequency-rate" target="_self">Browse articles and guides: Frequency / Rate</a>.

**Reported incidents and detection interpretations**

#### HTTP/2 Rapid Reset DDoS campaign {#case-frequency-rate-rapid-reset-2023}

**Period:** August 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** The HTTP/2 campaign repeatedly opened and reset streams, letting relatively few connections generate exceptional request rates. [Cloudflare: HTTP/2 Rapid Reset: deconstructing the record-breaking attack](https://blog.cloudflare.com/technical-breakdown-http2-rapid-reset-ddos-attack/).

**Anomaly interpretation [inferred]:** Measure stream creation and cancellation per connection and per target, not just source-IP counts. Distribution shape complements aggregate rate.

**Telemetry to validate:** HTTP/2-aware edge telemetry, reset counters and time-aligned request rates.

**Boundary / competing explanation:** Ordinary access logs may not expose frame-level resets; encrypted packet metadata alone is insufficient for this feature.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1499/" target="_self">T1499 — Endpoint Denial of Service</a>

#### Midnight Blizzard compromise of Microsoft {#case-frequency-rate-midnight-blizzard-2024}

**Period:** Reported January 2024. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** Microsoft described low-count password attempts against selected accounts through distributed residential proxies. [Microsoft: Midnight Blizzard: Guidance for responders on nation-state attack](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/).

**Anomaly interpretation [inferred]:** This is an evasion case for simple rate thresholds. Aggregate repeated targeting across sources, retaining the affected identities and observation window.

**Telemetry to validate:** Identity sign-in results, account IDs, source networks and provider risk signals.

**Boundary / competing explanation:** Do not claim that every tenant-local detector must fail or that unrelated successful logins prove compromise.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1110.003/" target="_self">T1110.003 — Brute Force: Password Spraying</a>

**Crosslinks:** [Volumetric](#anomaly-volumetric) · [Geographic / ASN](#anomaly-geographic-asn). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#14-rate-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-14-from-threat-intelligence-to-detection-a-practitioner-s-guide-2d930b168426/" target="_self">From Threat Intelligence to Detection: A Practitioner’s Guide</a>.
<!-- anomaly-evidence:frequency-rate:end -->

**Illustrative scenarios (not additional incidents):**

- A single user account generates 45 failed VPN logins in 6 minutes, far above its normal authentication rate.

- One API client that typically makes 2–3 requests per minute suddenly sends 1,200 token validation requests in 10 minutes.

- A workstation that usually launches a browser a few times per hour suddenly starts 300 PowerShell processes in 15 minutes.

- A host that normally performs low-volume name resolution suddenly issues hundreds of DNS queries per minute to many rare domains.

- A service account that usually accesses one mailbox at a time suddenly performs repeated read operations across dozens of mailboxes in a short window.


### 2.3 Temporal {#anomaly-temporal}

Activity inconsistent with a defined time-of-day, shift or seasonal context.

**Telemetry contract:** Event-time identity, administration and workload logs plus time-zone and schedule context.

**Candidate method [unvalidated until tested]:** Compare like calendar periods; handle travel, daylight-saving changes and ingestion delay.

**Benign alternatives and limits:** On-call work, international teams and scheduled maintenance are legitimate alternatives.

<ResearchFigure id="family-temporal" />

<!-- anomaly-evidence:temporal:start -->
**Evidence tags:** [Network telemetry](#tag-network) · [Endpoint telemetry](#tag-endpoint) · [Operational technology](#tag-ot). **Statistical forms:** [contextual](#anomaly-form-contextual), [collective](#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-temporal" target="_self">Browse articles and guides: Temporal</a>.

**Reported incidents and detection interpretations**

#### SUNBURST in the SolarWinds supply-chain compromise {#case-temporal-sunburst-2020}

**Period:** 2020. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** SUNBURST delayed activation and subsequently used DNS coordination and command-and-control traffic. [Mandiant: SUNBURST Additional Technical Details](https://cloud.google.com/blog/topics/threat-intelligence/sunburst-additional-technical-details/).

**Anomaly interpretation [inferred]:** Relate software installation, delayed first contact and later callbacks. The delay is an event-sequence feature, not an observable DNS anomaly while the implant is silent.

**Telemetry to validate:** Software deployment records, process-attributed network events and DNS timestamps.

**Boundary / competing explanation:** Dormancy without emitted telemetry cannot be scored from network traffic; normal update delays can look similar.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1071.004/" target="_self">T1071.004 — Application Layer Protocol: DNS</a>

#### Industroyer2 attempted disruption of a Ukrainian energy provider {#case-temporal-industroyer2-2022}

**Period:** 8 April 2022. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** ESET documented Industroyer2 execution scheduled for 8 April 2022 at 16:10 UTC in an attempted attack on a Ukrainian energy provider. [ESET: Industroyer2: Industroyer reloaded](https://www.welivesecurity.com/2022/04/12/industroyer2-industroyer-reloaded/).

**Anomaly interpretation [inferred]:** Correlate the task's creation and scheduled execution with approved OT work and operational commands. Clock time alone does not make an event anomalous.

**Telemetry to validate:** Scheduled-task records, engineering-host process logs, OT commands and maintenance approvals.

**Boundary / competing explanation:** The public report establishes the scheduled time, not the site's full maintenance baseline or a successful temporal detection.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1053.005/" target="_self">T1053.005 — Scheduled Task/Job: Scheduled Task</a>

**Crosslinks:** [Sequence](#anomaly-sequence) · [Protocol / Application Usage](#anomaly-protocol-application). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#21-temporal-context-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-07-11-newest-detection-engineering-techniques-from-rules-to-validated-security-telemetry-a5ccb46d5556/" target="_self">Newest Detection Engineering Techniques: From Rules to Validated Security Telemetry</a>.
<!-- anomaly-evidence:temporal:end -->

**Illustrative scenarios (not additional incidents):**

- An HR employee who normally logs in between 08:00–17:00 starts downloading sensitive employee records at 02:43 on a Sunday.

- A SaaS admin account that is typically active only during local business hours performs privilege changes at 03:10.

- A developer laptop that usually shows weekday activity suddenly initiates code repository access and cloud console actions during a national holiday.

- A server management account that normally runs scheduled maintenance at 01:00–02:00 begins executing admin actions at an unusual afternoon hour outside its normal service window.

- A user with a stable daytime pattern starts authenticating from the same device every night for several consecutive days, outside their historical baseline.


### 2.4 Peer-Group {#anomaly-peer-group}

An entity differs from an explicitly defined comparison cohort.

**Telemetry contract:** Identity and asset inventory, role history, application use and access records.

**Candidate method [unvalidated until tested]:** Validate cohort membership, then compare distributions or fit a clustering model. TF-IDF can weight input features; it is not clustering itself.

**Benign alternatives and limits:** Role changes, small cohorts and incomplete personnel data can create misleading outliers.

<ResearchFigure id="family-peer-group" />

<!-- anomaly-evidence:peer-group:start -->
**Evidence tags:** [Identity and access](#tag-identity) · [Insider risk](#tag-insider) · [Cloud and SaaS](#tag-cloud). **Statistical forms:** [contextual](#anomaly-form-contextual).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-peer-group" target="_self">Browse articles and guides: Peer-Group</a>.

**Reported incidents and detection interpretations**

#### Twitter insider access for a foreign official {#case-peer-group-twitter-insider}

**Period:** Conduct addressed in the 2022 Abouammo conviction. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** A jury convicted former Twitter media-partnerships manager Ahmad Abouammo over unlawful access and disclosure of user information. The indictment explains the job-duty boundary. [US Department of Justice: Former Twitter Employee Found Guilty of Acting as an Agent of a Foreign Government and Unlawfully Sharing Twitter User Information](https://www.justice.gov/archives/opa/pr/former-twitter-employee-found-guilty-acting-agent-foreign-government-and-unlawfully-sharing); [US Department of Justice: Superseding indictment, United States v. Abouammo et al., filed July 28, 2020](https://www.justice.gov/usao-ndca/page/file/1299331/dl?inline=).

**Anomaly interpretation [inferred]:** Compare sensitive-record access with employees having the same responsibilities, not with all staff who technically possess access.

**Telemetry to validate:** Internal user-data access logs, role assignments, case authorization and HR role history.

**Boundary / competing explanation:** Peer-group detection is an author-derived opportunity; the sources do not say a UEBA model discovered this case.

**ATT&CK [author-mapped behavior, not actor attribution]:** Not forced: the public role-misuse evidence does not justify a specific technique mapping here.

#### Storm-1283 OAuth-enabled cryptomining {#case-peer-group-storm1283-2023}

**Period:** Reported December 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Microsoft reported that compromised access was used to create an OAuth application and deploy virtual machines for cryptomining. [Microsoft: Threat actors misuse OAuth applications to automate financially driven attacks](https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/).

**Anomaly interpretation [inferred]:** Compare application activity with applications having the same business function. VM creation may be abnormal for one cohort and routine for deployment automation.

**Telemetry to validate:** Application inventory, workload-identity logs, Azure Activity and approved deployment records.

**Boundary / competing explanation:** The comparison cohort and expected activity are not supplied by the incident report and must be established locally.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1496/" target="_self">T1496 — Resource Hijacking</a>

**Crosslinks:** [Identity / Access](#anomaly-identity-access) · [Data Movement](#anomaly-data-movement). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#8-peer-group-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-22-detecting-malicious-insider-activity-a-technical-detection-engineering-guide-3c3b41e95e82/" target="_self">Detecting Malicious Insider Activity: A Technical Detection Engineering Guide</a>.
<!-- anomaly-evidence:peer-group:end -->

**Illustrative scenarios (not additional incidents):**

- One finance employee accesses source code repositories and DevOps dashboards that no one else in the finance peer group normally uses.

- A single server in the same Windows server class begins spawning developer tools and compression utilities, unlike its peer servers.

- One sales user downloads 15 times more CRM records than others in the same department over the same week.

- A service account in a group of low-privilege automation accounts suddenly begins calling privileged admin APIs that its peers never invoke.

- One employee in a peer group of standard Microsoft 365 users starts creating mailbox forwarding rules and performing eDiscovery-like searches, unlike comparable users with the same role.


### 2.5 Sequence {#anomaly-sequence}

An event sequence differs from an expected operational workflow.

**Telemetry contract:** Process ancestry, authentication, application actions, session identifiers and event time.

**Candidate method [unvalidated until tested]:** Use explicit sequence constraints or a validated sequence model; define allowed lateness and missing steps.

**Benign alternatives and limits:** Different legitimate workflows and timestamp disorder can produce the same apparent sequence.

<ResearchFigure id="family-sequence" />

<!-- anomaly-evidence:sequence:start -->
**Evidence tags:** [Identity and access](#tag-identity) · [Endpoint telemetry](#tag-endpoint) · [Cloud and SaaS](#tag-cloud). **Statistical forms:** [collective](#anomaly-form-collective), [contextual](#anomaly-form-contextual).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-sequence" target="_self">Browse articles and guides: Sequence</a>.

**Reported incidents and detection interpretations**

#### UNC3944 help-desk compromise and SaaS data theft {#case-sequence-unc3944-saas}

**Period:** 2023–2024 investigations reported June 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant described help-desk impersonation, MFA changes and subsequent access to privileged accounts and SaaS applications across its investigations. [Mandiant: UNC3944 Targets SaaS Applications](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/).

**Anomaly interpretation [inferred]:** Correlate reset, new-device enrollment, sign-in and expanded access on the same identity. Preserve ordering rather than merely counting co-occurring alerts.

**Telemetry to validate:** Help-desk tickets, IdP factor events, session records and SaaS audit logs.

**Boundary / competing explanation:** The report synthesizes multiple engagements; do not invent one victim timeline containing every reported technique.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1098.005/" target="_self">T1098.005 — Account Manipulation: Device Registration</a>

#### BazarCall to Conti intrusion {#case-sequence-bazarcall-conti}

**Period:** 2021 case reported on 1 August. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** The DFIR Report traced a workbook-led intrusion through Trickbot, Cobalt Strike, discovery and lateral movement to later Conti deployment. [The DFIR Report: BazarCall to Conti Ransomware via Trickbot and Cobalt Strike](https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/).

**Anomaly interpretation [inferred]:** Link execution, discovery and remote activity by host and identity. A multi-stage sequence can warrant investigation before ransomware appears.

**Telemetry to validate:** Process trees, authentication records, service creation and endpoint/network timestamps.

**Boundary / competing explanation:** A rigid sequence requiring every stage will miss partial telemetry and different attack paths; evaluate missing-stage tolerance.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1087.002/" target="_self">T1087.002 — Account Discovery: Domain Account</a>

**Crosslinks:** [Identity / Access](#anomaly-identity-access) · [Parent-Child Execution](#anomaly-parent-child). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#60-sequence-order-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-14-from-threat-intelligence-to-detection-a-practitioner-s-guide-2d930b168426/" target="_self">From Threat Intelligence to Detection: A Practitioner’s Guide</a>.
<!-- anomaly-evidence:sequence:end -->

**Illustrative scenarios (not additional incidents):**

- A user authenticates to a SaaS tenant, creates a new OAuth app, grants high-risk permissions, and then performs bulk data access in a sequence not seen in normal admin workflows.

- On a server, `powershell.exe` spawns `rundll32.exe`, which then launches a network connection to an external host—an execution chain that deviates from the usual parent-child order.

- A mailbox access session shows inbox rule creation before any normal interactive user activity, followed immediately by message forwarding and deletion operations.

- A cloud workflow shows snapshot creation, privilege modification, and object export in an order that does not match standard backup or maintenance procedures.

- A workstation process tree shows Office opening a script interpreter, then a credential access tool, then an archive utility — an event sequence inconsistent with normal user productivity flows.


### 2.6 Graph / Relationship {#anomaly-graph-relationship}

A new or unusual edge, path or community relationship.

**Telemetry contract:** Verified identities, effective permissions, resource ownership, authentication and network observations.

**Candidate method [unvalidated until tested]:** Define graph direction, edge meaning, observation window and novelty against a past-only graph.

**Benign alternatives and limits:** Migrations, new projects and automated infrastructure can legitimately create many edges.

<ResearchFigure id="family-graph-relationship" />

<!-- anomaly-evidence:graph-relationship:start -->
**Evidence tags:** [Identity and access](#tag-identity) · [Cloud and SaaS](#tag-cloud). **Statistical forms:** [contextual](#anomaly-form-contextual), [collective](#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-graph-relationship" target="_self">Browse articles and guides: Graph / Relationship</a>.

**Reported incidents and detection interpretations**

#### Midnight Blizzard compromise of Microsoft {#case-graph-relationship-midnight-blizzard-2024}

**Period:** Reported January 2024. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** Microsoft described a compromised legacy OAuth application being used to grant malicious applications Exchange full_access_as_app access. [Microsoft: Midnight Blizzard: Guidance for responders on nation-state attack](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/).

**Anomaly interpretation [inferred]:** Model principal, application, consent and mailbox-access edges. Investigate a new privileged path rather than treating each grant as an isolated event.

**Telemetry to validate:** Application credentials, consent and role-assignment audit history; EWS access.

**Boundary / competing explanation:** A new graph edge is not proof of abuse, and the report does not establish that graph analytics detected the intrusion.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1098/" target="_self">T1098 — Account Manipulation</a>

#### Storm-1283 OAuth-enabled cryptomining {#case-graph-relationship-storm1283-2023}

**Period:** Reported December 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** The compromised subscription owner granted the attacker-created application Contributor permissions, enabling subsequent VM deployment. [Microsoft: Threat actors misuse OAuth applications to automate financially driven attacks](https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/).

**Anomaly interpretation [inferred]:** Trace the new user-to-application-to-subscription path and its first resource actions. Link authorization changes to what the newly authorized principal actually did.

**Telemetry to validate:** Directory audit, Azure role assignments and resource deployment activity.

**Boundary / competing explanation:** Infrastructure-as-code can produce similar edges; compare ownership, approval and expected resource scope.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1098/" target="_self">T1098 — Account Manipulation</a>

**Crosslinks:** [State-Change](#anomaly-state-change) · [Identity / Access](#anomaly-identity-access). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#75-graph-evolution-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-14-from-threat-intelligence-to-detection-a-practitioner-s-guide-2d930b168426/" target="_self">From Threat Intelligence to Detection: A Practitioner’s Guide</a>.
<!-- anomaly-evidence:graph-relationship:end -->

**Illustrative scenarios (not additional incidents):**

- A low-privilege user is suddenly added to a group that creates a new privilege path to domain admin through nested Active Directory memberships.

- An IAM role that normally accesses only one application is granted trust relationships that connect it to multiple high-value cloud resources it never touched before.

- A workstation begins communicating with a server segment that is normally reachable only by backup or management systems, creating a new network edge outside its usual community.

- A SaaS account that historically had no relationship to executive mailboxes suddenly gains delegated access to several senior leadership accounts.

- A service account becomes the bridge between two previously separate environments by authenticating to both the on-prem domain and cloud admin plane, creating an unusual cross-environment path.


### 2.7 Geographic / ASN {#anomaly-geographic-asn}

A change in the network/location context associated with an identity.

**Telemetry contract:** Sign-in/VPN records, device context and versioned IP/ASN/geolocation enrichment.

**Candidate method [unvalidated until tested]:** Compare the account and device history; treat geolocation as uncertain and account for VPN/proxy egress.

**Benign alternatives and limits:** Mobile networks, privacy relays, travel and shared egress can create apparent impossible travel.

<ResearchFigure id="family-geographic-asn" />

<!-- anomaly-evidence:geographic-asn:start -->
**Evidence tags:** [Identity and access](#tag-identity) · [Network telemetry](#tag-network) · [Cloud and SaaS](#tag-cloud). **Statistical forms:** [contextual](#anomaly-form-contextual).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-geographic-asn" target="_self">Browse articles and guides: Geographic / ASN</a>.

**Reported incidents and detection interpretations**

#### UNC5537 and Snowflake customer data theft {#case-geographic-asn-unc5537-snowflake-2024}

**Period:** 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant observed VPN-origin access and separate VPS infrastructure associated with exfiltration in the Snowflake customer campaign. [Mandiant: UNC5537 Targets Snowflake Customer Instances for Data Theft and Extortion](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion).

**Anomaly interpretation [inferred]:** Compare source networks with each account's approved access paths and subsequent queries. ASN category is context, not an identity or maliciousness verdict.

**Telemetry to validate:** Snowflake login history, timestamped IP/ASN enrichment, query history and destination ownership.

**Boundary / competing explanation:** VPNs are common legitimate infrastructure. Neither a country nor an ASN identifies the human operator.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1078.004/" target="_self">T1078.004 — Valid Accounts: Cloud Accounts</a>

#### Midnight Blizzard compromise of Microsoft {#case-geographic-asn-midnight-blizzard-2024}

**Period:** Reported January 2024. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** Midnight Blizzard used residential proxies also used by legitimate customers, reducing the usefulness of static IP indicators. [Microsoft: Midnight Blizzard: Guidance for responders on nation-state attack](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/).

**Anomaly interpretation [inferred]:** Evaluate unfamiliar sign-in properties and source diversity alongside the account's behavior. Residential-looking traffic can conceal an intrusion.

**Telemetry to validate:** Historical sign-in properties, IP/ASN observations, device and application context.

**Boundary / competing explanation:** Impossible-travel logic is vulnerable to VPN and proxy artifacts; no fixed travel threshold is asserted here.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1110.003/" target="_self">T1110.003 — Brute Force: Password Spraying</a>

**Crosslinks:** [Frequency / Rate](#anomaly-frequency-rate) · [Identity / Access](#anomaly-identity-access). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#80-spatial-context-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-22-detecting-malicious-insider-activity-a-technical-detection-engineering-guide-3c3b41e95e82/" target="_self">Detecting Malicious Insider Activity: A Technical Detection Engineering Guide</a>.
<!-- anomaly-evidence:geographic-asn:end -->

**Illustrative scenarios (not additional incidents):**

- A user who has only ever logged in from Israel suddenly authenticates to Microsoft 365 from Vietnam and then accesses sensitive SharePoint content minutes later.

- An administrator signs in from a residential ISP in the morning and then appears from a cloud-hosting ASN in another country 25 minutes later, triggering impossible-travel logic.

- A service account that normally uses one fixed corporate VPN egress suddenly accesses the cloud console from a consumer mobile network ASN.

- A SaaS account with a stable history of logins from one city begins showing repeated access from multiple distant countries over two days.

- A privileged user who normally connects only through a known enterprise VPN starts logging in from a newly observed anonymization provider or VPS-hosting ASN.


### 2.8 Identity / Access {#anomaly-identity-access}

An unexpected authentication property, permission or identity relationship.

**Telemetry contract:** IdP, factor lifecycle, consent, token-validation and workload audit data where available.

**Candidate method [unvalidated until tested]:** Separate observed state changes, provider risk detections and inferred anomaly features.

**Benign alternatives and limits:** Recovery, legitimate consent, role changes and delegated administration require investigation context.

<ResearchFigure id="family-identity-access" />

<!-- anomaly-evidence:identity-access:start -->
**Evidence tags:** [Identity and access](#tag-identity) · [Cloud and SaaS](#tag-cloud). **Statistical forms:** [contextual](#anomaly-form-contextual), [collective](#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-identity-access" target="_self">Browse articles and guides: Identity / Access</a>.

**Reported incidents and detection interpretations**

#### UNC3944 help-desk compromise and SaaS data theft {#case-identity-access-unc3944-saas}

**Period:** 2023–2024 investigations reported June 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** UNC3944 persuaded help desks to change MFA controls and used compromised privileged identities to reach protected applications. [Mandiant: UNC3944 Targets SaaS Applications](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/).

**Anomaly interpretation [inferred]:** Prioritize factor changes followed by unfamiliar access, accounting for the support ticket and strength of identity verification.

**Telemetry to validate:** IdP factor lifecycle, device enrollment, sign-ins, application assignments and support records.

**Boundary / competing explanation:** Legitimate device replacement produces similar events; a reset alone does not establish an account takeover.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1098.005/" target="_self">T1098.005 — Account Manipulation: Device Registration</a>

#### Storm-0558 forged-token mailbox access {#case-identity-access-storm0558-2023}

**Period:** 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Storm-0558 used an acquired Microsoft consumer signing key to forge tokens accepted for enterprise mailbox access. [Microsoft: Microsoft mitigates China-based threat actor Storm-0558 targeting of customer email](https://www.microsoft.com/en-us/msrc/blog/2023/07/microsoft-mitigates-china-based-threat-actor-storm-0558-targeting-of-customer-email).

**Anomaly interpretation [inferred]:** Correlate mailbox access with identity and token context. Absence of an expected tenant sign-in can be a lead, not proof of token forgery.

**Telemetry to validate:** Mailbox-access audit, application/session context and provider-side token-validation evidence where available.

**Boundary / competing explanation:** The key was acquired, not forged. Tenant logs do not necessarily expose the token material or all provider validation decisions.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1550.001/" target="_self">T1550.001 — Use Alternate Authentication Material: Application Access Token</a>

**Crosslinks:** [Sequence](#anomaly-sequence) · [Graph / Relationship](#anomaly-graph-relationship). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#3-contextual-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-22-detecting-malicious-insider-activity-a-technical-detection-engineering-guide-3c3b41e95e82/" target="_self">Detecting Malicious Insider Activity: A Technical Detection Engineering Guide</a>.
<!-- anomaly-evidence:identity-access:end -->

**Illustrative scenarios (not additional incidents):**

- A user who normally authenticates with MFA suddenly registers a new authentication factor and then performs privileged actions within the same session.

- An employee account that has never approved third-party apps grants OAuth consent to a new application requesting mail read, file access, and offline token permissions.

- A service principal starts authenticating to new resources or from new workload infrastructure outside its historical pattern. Distinguish application-only token flows from delegated-user refresh-token behavior.

- A privileged admin account that normally signs in with one managed device starts authenticating with a new device and a newly enrolled MFA method on the same day.

- A user with stable sign-in behavior suddenly shows unusual token reuse across multiple applications or sessions inconsistent with their normal access pattern.


### 2.9 Rare Process / Service {#anomaly-rare-process-service}

Low observed prevalence of a process or service in a stated population.

**Telemetry contract:** Process/service creation, software inventory, signer/hash and collection coverage.

**Candidate method [unvalidated until tested]:** Measure prevalence within a role and time period; distinguish new telemetry from a genuinely new binary.

**Benign alternatives and limits:** Deployment, troubleshooting and rare authorized tools can all be legitimate.

<ResearchFigure id="family-rare-process-service" />

<!-- anomaly-evidence:rare-process-service:start -->
**Evidence tags:** [Endpoint telemetry](#tag-endpoint) · [Network telemetry](#tag-network). **Statistical forms:** [point](#anomaly-form-point), [contextual](#anomaly-form-contextual).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-rare-process-service" target="_self">Browse articles and guides: Rare Process / Service</a>.

**Reported incidents and detection interpretations**

#### BazarCall to Conti intrusion {#case-rare-process-service-bazarcall-conti}

**Period:** 2021 case reported on 1 August. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** The investigators recorded AdFind deployment and execution for domain enumeration on compromised hosts. [The DFIR Report: BazarCall to Conti Ransomware via Trickbot and Cobalt Strike](https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/).

**Anomaly interpretation [inferred]:** Measure first-seen execution within the host role and inspect the associated account and discovery output. Tool presence alone cannot distinguish administration from intrusion.

**Telemetry to validate:** Process image, hash, command line, account and host-class software history.

**Boundary / competing explanation:** The report documents execution, not a measured enterprise prevalence distribution or a guaranteed rarity alert.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1087.002/" target="_self">T1087.002 — Account Discovery: Domain Account</a>

#### MESSAGETAP on telecommunications SMS servers {#case-rare-process-service-messagetap-2019}

**Period:** 2019. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant found MESSAGETAP on Linux SMS-center servers, capturing network traffic with libpcap and selecting SMS data. [Mandiant: MESSAGETAP: Who's Reading Your Text Messages?](https://cloud.google.com/blog/topics/threat-intelligence/messagetap-who-is-reading-your-text-messages/).

**Anomaly interpretation [inferred]:** Compare capture-capable executables with the approved SMS-server software inventory and investigate unknown binaries in that role.

**Telemetry to validate:** Executable inventory, process execution, package integrity and packet-capture capability use.

**Boundary / competing explanation:** libpcap also supports legitimate monitoring; the proposed rarity baseline is not a result published by the investigators.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1040/" target="_self">T1040 — Network Sniffing</a>

**Crosslinks:** [Parent-Child Execution](#anomaly-parent-child) · [Peer-Group](#anomaly-peer-group). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#84-rare-category-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-07-11-newest-detection-engineering-techniques-from-rules-to-validated-security-telemetry-a5ccb46d5556/" target="_self">Newest Detection Engineering Techniques: From Rules to Validated Security Telemetry</a>.
<!-- anomaly-evidence:rare-process-service:end -->

**Illustrative scenarios (not additional incidents):**

- A domain controller suddenly executes `7z.exe`, a binary never before seen on that host class, shortly before large archive creation.

- A Linux web server launches `socat` for the first time, despite no prior history of that tool in its software baseline.

- A workstation starts a newly dropped unsigned binary from `%AppData%`, and that file has zero prevalence across the enterprise.

- A Windows server that normally runs only approved business services suddenly installs and starts a new service with a random-looking name and no trusted signature.

- A production database host executes `rclone`, a utility not previously observed on similar servers, followed by outbound network activity.


### 2.10 Parent-Child Execution {#anomaly-parent-child}

An unusual direct process relationship or explicitly defined ancestry path.

**Telemetry contract:** Stable process identifiers, parent identifiers, command lines, user and asset role.

**Candidate method [unvalidated until tested]:** Specify direct child versus ancestor matching and test process-ID reuse and incomplete ancestry.

**Benign alternatives and limits:** Application automation can launch shells; in-process activity can evade child-process rules.

<ResearchFigure id="family-parent-child" />

<!-- anomaly-evidence:parent-child:start -->
**Evidence tags:** [Endpoint telemetry](#tag-endpoint). **Statistical forms:** [contextual](#anomaly-form-contextual), [collective](#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-parent-child" target="_self">Browse articles and guides: Parent-Child Execution</a>.

**Reported incidents and detection interpretations**

#### Lemon Duck exploitation of Exchange servers {#case-parent-child-lemon-duck-exchange}

**Period:** March 2021 reporting. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Microsoft associated Exchange IIS-worker spawning of PowerShell with observed Lemon Duck activity and supplied a corresponding hunting query. [Microsoft: Analyzing attacks taking advantage of the Exchange Server vulnerabilities](https://www.microsoft.com/en-us/security/blog/2021/03/25/analyzing-attacks-taking-advantage-of-the-exchange-server-vulnerabilities/).

**Anomaly interpretation [inferred]:** Investigate w3wp.exe to powershell.exe lineage in the Exchange context, then inspect the command, deployment history and network activity.

**Telemetry to validate:** MDE DeviceProcessEvents or equivalent parent/child process events with command lines.

**Boundary / competing explanation:** Microsoft's query is a hunting starting point, not proof that every matching parent-child pair is malicious.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1059.001/" target="_self">T1059.001 — Command and Scripting Interpreter: PowerShell</a>

#### DoejoCrypt activity after Exchange exploitation {#case-parent-child-doejocrypt-exchange}

**Period:** March 2021 reporting. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Microsoft described DoejoCrypt-associated batch-script credential theft and published lineage-oriented queries for post-exploitation activity. [Microsoft: Analyzing attacks taking advantage of the Exchange Server vulnerabilities](https://www.microsoft.com/en-us/security/blog/2021/03/25/analyzing-attacks-taking-advantage-of-the-exchange-server-vulnerabilities/).

**Anomaly interpretation [inferred]:** Follow the web-server, command-shell and credential-access chain instead of alerting on cmd.exe globally. Corroborate with script content and resulting files.

**Telemetry to validate:** Process ancestry, batch command lines, sensitive-registry access and file creation.

**Boundary / competing explanation:** The report covers several exploiting actors; do not attribute every Exchange child process to HAFNIUM or DoejoCrypt.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1059.003/" target="_self">T1059.003 — Command and Scripting Interpreter: Windows Command Shell</a>

**Crosslinks:** [Rare Process / Service](#anomaly-rare-process-service) · [Sequence](#anomaly-sequence). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#60-sequence-order-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-07-11-newest-detection-engineering-techniques-from-rules-to-validated-security-telemetry-a5ccb46d5556/" target="_self">Newest Detection Engineering Techniques: From Rules to Validated Security Telemetry</a>.
<!-- anomaly-evidence:parent-child:end -->

**Illustrative scenarios (not additional incidents):**

- `winword.exe` spawns `powershell.exe`, even though Office applications on that workstation normally never launch script interpreters.

- `w3wp.exe` (IIS worker process) starts `cmd.exe`, an uncommon parent-child relationship that can indicate web shell activity.

- `excel.exe` launches `rundll32.exe` and then a network connection follows, which is not part of normal spreadsheet usage.

- An SSH session has `curl` or `wget` in its descendant process tree, although such downloads are unusual for the host role. A shell may be the direct parent; record actual ancestry instead of assuming `sshd` is the direct parent.

- A business application service suddenly spawns `7z.exe` or `rar.exe`, an unusual child process for that parent and host role.


### 2.11 Data Movement {#anomaly-data-movement}

Unexpected access, export, copy or synchronization involving a source and destination.

**Telemetry contract:** Application/storage audit, destination account, object sensitivity and transfer counters where available.

**Candidate method [unvalidated until tested]:** Keep event counts, distinct objects, bytes and records separate; evaluate destination and authorization context.

**Benign alternatives and limits:** Approved export, backup, migration and collaboration can resemble exfiltration.

<ResearchFigure id="family-data-movement" />

<!-- anomaly-evidence:data-movement:start -->
**Evidence tags:** [Cloud and SaaS](#tag-cloud) · [Identity and access](#tag-identity). **Statistical forms:** [contextual](#anomaly-form-contextual), [collective](#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-data-movement" target="_self">Browse articles and guides: Data Movement</a>.

**Reported incidents and detection interpretations**

#### UNC5537 and Snowflake customer data theft {#case-data-movement-unc5537-snowflake-2024}

**Period:** 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** The campaign moved stolen database content out of customer environments and used external hosting or storage infrastructure. [Mandiant: UNC5537 Targets Snowflake Customer Instances for Data Theft and Extortion](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion).

**Anomaly interpretation [inferred]:** Compare source data, export operation and destination ownership with normal business flows. An authorized account can execute an unauthorized transfer.

**Telemetry to validate:** Database queries, export commands, storage destinations and identity-to-session correlation.

**Boundary / competing explanation:** A dataset's sensitivity and the destination's authorization must come from customer context, not its public hostname alone.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1078.004/" target="_self">T1078.004 — Valid Accounts: Cloud Accounts</a>

#### UNC3944 help-desk compromise and SaaS data theft {#case-data-movement-unc3944-saas}

**Period:** 2023–2024 investigations reported June 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant obtained victim Airbyte logs and described Airbyte/Fivetran transfers from SaaS data sources to attacker-owned storage. [Mandiant: UNC3944 Targets SaaS Applications](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/).

**Anomaly interpretation [inferred]:** Join connector creation and authorization to source objects, destination account ownership and transfer activity, even when the transport is normal cloud traffic.

**Telemetry to validate:** Connector job logs, SaaS audit, consent records and cloud-storage access history.

**Boundary / competing explanation:** A legitimate sync product is not an IOC. Visibility depends on where the connector runs and which logs are collected.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1567.002/" target="_self">T1567.002 — Exfiltration Over Web Service: Exfiltration to Cloud Storage</a>

**Crosslinks:** [Volumetric](#anomaly-volumetric) · [Peer-Group](#anomaly-peer-group). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#48-multivariate-combination-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-22-detecting-malicious-insider-activity-a-technical-detection-engineering-guide-3c3b41e95e82/" target="_self">Detecting Malicious Insider Activity: A Technical Detection Engineering Guide</a>.
<!-- anomaly-evidence:data-movement:end -->

**Illustrative scenarios (not additional incidents):**

- A user who usually views a few HR documents per week suddenly exports entire employee folders to a ZIP archive and syncs them to a personal cloud storage destination.

- A service account that normally reads small sets of objects begins copying thousands of customer records from one S3 bucket to an external account.

- A SaaS user who typically works inside dashboards suddenly performs multiple CSV exports of high-value reports in one session.

- A workstation that normally accesses Office files locally starts reading large numbers of engineering documents and copying them to a removable device or network share.

- A cloud admin account that usually performs management actions begins bulk snapshot export or cross-region object replication involving sensitive data classes.


### 2.12 Protocol / Application Usage {#anomaly-protocol-application}

Unusual use of a protocol, application function or destination for an entity.

**Telemetry contract:** Protocol-aware sensors, endpoint attribution and application audit, with parser/version details.

**Candidate method [unvalidated until tested]:** Define the feature explicitly: record types, endpoint usage, negotiated attributes or destination novelty.

**Benign alternatives and limits:** New clients, protocol changes and legitimate encoded identifiers can invalidate a historical baseline.

<ResearchFigure id="family-protocol-application" />

<!-- anomaly-evidence:protocol-application:start -->
**Evidence tags:** [Network telemetry](#tag-network) · [Endpoint telemetry](#tag-endpoint). **Statistical forms:** [contextual](#anomaly-form-contextual), [collective](#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-protocol-application" target="_self">Browse articles and guides: Protocol / Application Usage</a>.

**Reported incidents and detection interpretations**

#### SUNBURST in the SolarWinds supply-chain compromise {#case-protocol-application-sunburst-2020}

**Period:** 2020. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant decoded SUNBURST DNS subdomain formats carrying victim information and other coordination data. [Mandiant: SUNBURST Additional Technical Details](https://cloud.google.com/blog/topics/threat-intelligence/sunburst-additional-technical-details/).

**Anomaly interpretation [inferred]:** Combine domain novelty, label structure and the originating process. DNS that is syntactically valid can still carry application data unrelated to normal resolution.

**Telemetry to validate:** Full QNAME, response details, timing and endpoint process attribution.

**Boundary / competing explanation:** Entropy alone is not a discriminator; the cited analysis does not establish the article's proposed numeric entropy range as a benchmark.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1071.004/" target="_self">T1071.004 — Application Layer Protocol: DNS</a>

#### OilRig-associated RDAT at a telecommunications organization {#case-protocol-application-oilrig-rdat-2020}

**Period:** April 2020 activity. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** Unit 42 analyzed RDAT deployed against a telecommunications organization, including variants with DNS tunneling over A and AAAA queries. [Palo Alto Networks Unit 42: OilRig Targets Middle Eastern Telecommunications Organization and Adds Novel C2 Channel with Steganography to Its Inventory](https://unit42.paloaltonetworks.com/oilrig-novel-c2-channel-steganography/).

**Anomaly interpretation [inferred]:** Inspect encoded-label structure and repeated exchanges by process and domain. Restricting detection to TXT queries would miss these documented variants.

**Telemetry to validate:** DNS queries and responses, label lengths, per-domain patterns and endpoint context.

**Boundary / competing explanation:** Different RDAT variants use different channels; do not assign one DNS signature to every OilRig intrusion.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1071.004/" target="_self">T1071.004 — Application Layer Protocol: DNS</a>

**Crosslinks:** [Temporal](#anomaly-temporal) · [Data Movement](#anomaly-data-movement). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#48-multivariate-combination-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-09-18-ai-agent-vs-human-with-wireshark-six-malware-pcaps-put-to-the-test-63ffeaed97de/" target="_self">AI Agent vs. Human with Wireshark: Six Malware PCAPs Put to the Test</a>.
<!-- anomaly-evidence:protocol-application:end -->

**Illustrative scenarios (not additional incidents):**

- A workstation starts making large HTTPS uploads over port 8443 to an external host, even though that port and destination are not part of its normal application profile.

- DNS traffic from a user device suddenly shifts from normal lookup behavior to long, high-entropy TXT queries consistent with tunneling or covert signaling.

- A browser session begins using an unusual user-agent string and repeatedly calls rarely used SaaS API endpoints that the user never accessed before.

- An internal host starts communicating over SSH on a non-standard port to multiple external systems, outside its normal administrative pattern.

- A cloud application account that usually performs routine API reads begins using bulk export, synchronization, or token-management features rarely seen in that application context.


### 2.13 Negative Anomaly (Absence) {#anomaly-negative-absence}

An expected observation is absent during a period where it should be observable.

**Telemetry contract:** Independent collector health, source heartbeat, delivery status, asset state and expected workload.

**Candidate method [unvalidated until tested]:** Model expected presence and detection delay separately from actual zero activity.

**Benign alternatives and limits:** Outage, retirement, filtering, permissions and retention are alternatives to deliberate impairment.

<ResearchFigure id="family-negative-absence" />

<!-- anomaly-evidence:negative-absence:start -->
**Evidence tags:** [Cloud and SaaS](#tag-cloud) · [Endpoint telemetry](#tag-endpoint) · [Telemetry health](#tag-telemetry-health). **Statistical forms:** [contextual](#anomaly-form-contextual), [collective](#anomaly-form-collective).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-negative-absence" target="_self">Browse articles and guides: Negative Anomaly (Absence)</a>.

**Reported incidents and detection interpretations**

#### SCARLETEEL cloud intrusion {#case-negative-absence-scarleteel-2023}

**Period:** 2023 reporting. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** Sysdig reported attackers disabling CloudTrail logging during SCARLETEEL and described StopLogging-based detection. [Sysdig: How to Detect SCARLETEEL with Sysdig Secure](https://www.sysdig.com/blog/detect-scarleteel-sysdig-secure).

**Anomaly interpretation [inferred]:** Combine an explicit logging change with loss of an otherwise expected event stream. Monitor the collection path independently of the source being disabled.

**Telemetry to validate:** CloudTrail control-plane changes, trail configuration, delivery health and downstream ingestion counters.

**Boundary / competing explanation:** StopLogging is a positive state-change event; missing logs are a separate inferred signal. Outages and configuration changes are competing explanations.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1685.002/" target="_self">T1685.002 — Disable or Modify Tools: Disable or Modify Cloud Log</a>

#### AuKill use before ransomware deployment {#case-negative-absence-aukill-2023}

**Period:** January–February 2023 incidents. **Evidence:** incident series reported by the cited source.

**Observed [source-reported]:** Sophos investigated ransomware incidents where AuKill abused a Process Explorer driver to disable EDR processes before payload deployment. [Sophos: AuKill EDR killer malware abuses Process Explorer driver](https://www.sophos.com/en-us/blog/aukill-edr-killer-malware-abuses-process-explorer-driver).

**Anomaly interpretation [inferred]:** Correlate unexpected security-service loss with driver installation and other independent host activity. A running host with a silent agent deserves investigation.

**Telemetry to validate:** EDR health, service state, driver-load events and independent management/network heartbeats.

**Boundary / competing explanation:** The source documents defense impairment, not a demonstrated heartbeat detector. Agent maintenance and host shutdown must be distinguished.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1685/" target="_self">T1685 — Disable or Modify Tools</a>

**Crosslinks:** [State-Change](#anomaly-state-change) · [Temporal](#anomaly-temporal). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#101-missingness-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-07-11-newest-detection-engineering-techniques-from-rules-to-validated-security-telemetry-a5ccb46d5556/" target="_self">Newest Detection Engineering Techniques: From Rules to Validated Security Telemetry</a>.
<!-- anomaly-evidence:negative-absence:end -->

**Illustrative scenarios (not additional incidents):**

- An EDR agent on a critical server that normally checks in every few minutes stops reporting immediately before suspicious outbound activity begins.

- A domain controller that consistently produces Windows security events suddenly goes silent, with no expected authentication logs during business hours.

- A Linux host that normally sends steady `auditd` records stops emitting process and file-access telemetry after a privileged session starts.

- A firewall or proxy log source with a stable event stream abruptly drops to near zero, even though the protected segment remains active.

- A backup service process that is normally always present on a server is no longer running, followed by unexpected file encryption or deletion activity.


### 2.14 State-Change {#anomaly-state-change}

A change to configuration, trust, permissions or exposure that warrants contextual review.

**Telemetry contract:** Before/after state, actor, control-plane audit, object identity and approved change records.

**Candidate method [unvalidated until tested]:** Scope the object and policy; first occurrence is a feature, not a maliciousness verdict.

**Benign alternatives and limits:** Administrative changes can be legitimate, including changes to sensitive objects.

<ResearchFigure id="family-state-change" />

<!-- anomaly-evidence:state-change:start -->
**Evidence tags:** [Identity and access](#tag-identity) · [Cloud and SaaS](#tag-cloud) · [Application audit](#tag-application). **Statistical forms:** [point](#anomaly-form-point), [contextual](#anomaly-form-contextual).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-state-change" target="_self">Browse articles and guides: State-Change</a>.

**Reported incidents and detection interpretations**

#### Storm-1283 OAuth-enabled cryptomining {#case-state-change-storm1283-2023}

**Period:** Reported December 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** The actor added credentials and permissions to OAuth applications and used application access for resource deployment. [Microsoft: Threat actors misuse OAuth applications to automate financially driven attacks](https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/).

**Anomaly interpretation [inferred]:** Track changes to authentication material and authorization separately from subsequent consumption. Connect the changed application to its first unusual resource operations.

**Telemetry to validate:** Application credential additions, consent/role changes and Azure resource activity.

**Boundary / competing explanation:** Secret rotation and application provisioning are ordinary operations; ownership, approvals and deployment scope determine risk.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1098/" target="_self">T1098 — Account Manipulation</a>; <a href="https://1200km.com/threat-matrix/techniques/T1496/" target="_self">T1496 — Resource Hijacking</a>

#### LEMURLOOT in MOVEit data-theft intrusions {#case-state-change-moveit-lemurloot}

**Period:** May–June 2023. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant described LEMURLOOT creating a MOVEit application account with Health Check Service names through database operations. [Mandiant: Zero-Day Vulnerability in MOVEit Transfer Exploited for Data Theft](https://cloud.google.com/blog/topics/threat-intelligence/zero-day-moveit-data-theft).

**Anomaly interpretation [inferred]:** Investigate unauthorized application-account creation and session insertion, correlating database changes with webshell access.

**Telemetry to validate:** MOVEit application/database evidence, web requests and web-root file changes.

**Boundary / competing explanation:** This is not inherently a Windows account. Windows Event 4720 is not the correct expected artifact for this application-database operation.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1505.003/" target="_self">T1505.003 — Server Software Component: Web Shell</a>

**Crosslinks:** [Graph / Relationship](#anomaly-graph-relationship) · [Negative Anomaly (Absence)](#anomaly-negative-absence). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#75-graph-evolution-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-14-from-threat-intelligence-to-detection-a-practitioner-s-guide-2d930b168426/" target="_self">From Threat Intelligence to Detection: A Practitioner’s Guide</a>.
<!-- anomaly-evidence:state-change:end -->

**Illustrative scenarios (not additional incidents):**

- A new trust policy is added to an IAM role, allowing a previously unrelated principal to assume it for the first time.

- An Active Directory group policy or group membership change creates a new path to privileged access for a sensitive server tier.

- A SaaS administrator changes a tenant setting to allow external sharing on a repository that was previously restricted to internal users.

- An IdP admin modifies conditional access or MFA policy for a privileged group, reducing authentication requirements for high-risk accounts.

- A cloud storage bucket that was private is suddenly changed to public or cross-account accessible, materially increasing exposure.


### 2.15 Multi-Event Correlation {#anomaly-multi-event-correlation}

A composition method joining related evidence, not a fifteenth independent statistical family.

**Telemetry contract:** Cross-source events with reliable tenant, identity, asset, session and time keys.

**Candidate method [unvalidated until tested]:** Specify equality keys and temporal constraints; measure the recall cost of each added gate.

**Benign alternatives and limits:** Unrelated events, duplicate observations and correlated models can inflate confidence without adding independent evidence.

<ResearchFigure id="family-multi-event-correlation" />

<!-- anomaly-evidence:multi-event-correlation:start -->
**Evidence tags:** [Identity and access](#tag-identity) · [Endpoint telemetry](#tag-endpoint) · [Cloud and SaaS](#tag-cloud). **Statistical forms:** [collective](#anomaly-form-collective), [contextual](#anomaly-form-contextual).

<a href="https://1200km.com/search.html?f.anomaly=anomaly-multi-event-correlation" target="_self">Browse articles and guides: Multi-Event Correlation</a>.

**Reported incidents and detection interpretations**

#### UNC3944 help-desk compromise and SaaS data theft {#case-multi-event-correlation-unc3944-saas}

**Period:** 2023–2024 investigations reported June 2024. **Evidence:** campaign reported by the cited source.

**Observed [source-reported]:** Mandiant reported identity manipulation, privileged SaaS access and cloud connector use for data theft across UNC3944 investigations. [Mandiant: UNC3944 Targets SaaS Applications](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/).

**Anomaly interpretation [inferred]:** Join identity-control changes to application sessions and connector transfers where entity and timestamp evidence supports the link. Correlation combines signal families; ordered sequence analysis is one possible component.

**Telemetry to validate:** Support records, IdP factor events, application sessions, connector jobs and destination ownership.

**Boundary / competing explanation:** A campaign synthesis is not one victim's complete timeline. Do not merge unrelated users or tenants because their events share a time window.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1098.005/" target="_self">T1098.005 — Account Manipulation: Device Registration</a>; <a href="https://1200km.com/threat-matrix/techniques/T1567.002/" target="_self">T1567.002 — Exfiltration Over Web Service: Exfiltration to Cloud Storage</a>

#### BazarCall to Conti intrusion {#case-multi-event-correlation-bazarcall-conti}

**Period:** 2021 case reported on 1 August. **Evidence:** incident reported by the cited source.

**Observed [source-reported]:** The DFIR Report documented an intrusion progressing from initial execution through discovery and lateral activity to Conti ransomware deployment. [The DFIR Report: BazarCall to Conti Ransomware via Trickbot and Cobalt Strike](https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/).

**Anomaly interpretation [inferred]:** Correlate endpoint execution, discovery and remote-service activity using stable host and account identifiers. Evaluate the linked evidence, not an uncalibrated sum of anomaly scores.

**Telemetry to validate:** Process trees, authenticated sessions, service events and network connections, with collection delays recorded.

**Boundary / competing explanation:** Two alerts generated from the same event are not independent corroboration. Missing sensors can break the join without making the behavior benign.

**ATT&CK [author-mapped behavior, not actor attribution]:** <a href="https://1200km.com/threat-matrix/techniques/T1087.002/" target="_self">T1087.002 — Account Discovery: Domain Account</a>

**Crosslinks:** [Sequence](#anomaly-sequence) · [State-Change](#anomaly-state-change) · [Data Movement](#anomaly-data-movement). <a href="https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#48-multivariate-combination-anomaly" target="_self">Statistical foundation in the Anomaly Detection Atlas</a>. Related research: <a href="https://1200km.com/articles/read/2026/2026-04-14-from-threat-intelligence-to-detection-a-practitioner-s-guide-2d930b168426/" target="_self">From Threat Intelligence to Detection: A Practitioner’s Guide</a>.
<!-- anomaly-evidence:multi-event-correlation:end -->

**Illustrative scenarios (not additional incidents):**

- A user shows a new login location, registers a new MFA factor, and then downloads an unusually large number of files in the same session.

- A workstation triggers a rare parent-child process chain, connects to a newly observed external domain, and then starts compressing many files within 20 minutes.

- A cloud admin account performs a first-time role assumption, changes bucket permissions, and initiates bulk object access shortly afterward.

- A mailbox account creates a forwarding rule, shows unusual sign-in properties, and then performs repeated message access and deletion activity.

- A server begins executing a rare binary, stops sending normal EDR heartbeats, and then generates abnormal outbound traffic to an external IP.

<!-- anomaly-evidence:index:start -->
### 2.16 Incident register, tags and evidence boundaries {#anomaly-evidence-index}

This expansion covers **14 operational anomaly families plus multi-event correlation: 15 navigation tags, 30 incident-to-topic mappings and 17 distinct case/campaign records**, reviewed on 2026-09-21. A campaign record may summarize multiple victims; this is not a count of individual breaches. A repeated case is not independent evidence.

**Reading the labels:** “Observed” means reported by the named investigator, not reproduced in this research. Each anomaly interpretation and ATT&CK association is an author-derived mapping. Suggested telemetry is a collection plan, not a claim that it was available to the original victim. No new precision, recall, threshold or successful-detection result is asserted.

**Scope:** Fourteen headings describe operational feature families; the fifteenth, multi-event correlation, is a composition pattern that combines them. The companion Atlas has a broader statistical taxonomy; its linked categories explain the statistical concept and do not imply one-to-one equivalence. The existing generic example bullets remain illustrative scenarios, not extra documented incidents.

<ResearchFigure id="incident-register" />

| Case / campaign record | Attribution boundary | Crosslinked analytical views |
|---|---|---|
| UNC5537 and Snowflake customer data theft (2024) | UNC5537, as tracked by Mandiant; customer-account compromise, not a demonstrated compromise of Snowflake itself | [Volumetric](#case-volumetric-unc5537-snowflake-2024) · [Geographic / ASN](#case-geographic-asn-unc5537-snowflake-2024) · [Data Movement](#case-data-movement-unc5537-snowflake-2024) |
| HTTP/2 Rapid Reset DDoS campaign (August 2023) | Operators not named in the cited report | [Volumetric](#case-volumetric-rapid-reset-2023) · [Frequency / Rate](#case-frequency-rate-rapid-reset-2023) |
| Midnight Blizzard compromise of Microsoft (Reported January 2024) | Midnight Blizzard, as attributed by Microsoft | [Frequency / Rate](#case-frequency-rate-midnight-blizzard-2024) · [Graph / Relationship](#case-graph-relationship-midnight-blizzard-2024) · [Geographic / ASN](#case-geographic-asn-midnight-blizzard-2024) |
| SUNBURST in the SolarWinds supply-chain compromise (2020) | UNC2452 in contemporaneous Mandiant reporting; a malware observation is not by itself group attribution | [Temporal](#case-temporal-sunburst-2020) · [Protocol / Application Usage](#case-protocol-application-sunburst-2020) |
| Industroyer2 attempted disruption of a Ukrainian energy provider (8 April 2022) | Sandworm, as assessed by ESET and CERT-UA | [Temporal](#case-temporal-industroyer2-2022) |
| Twitter insider access for a foreign official (Conduct addressed in the 2022 Abouammo conviction) | Ahmad Abouammo, named in the conviction report; indictment allegations about other people are not treated as convictions | [Peer-Group](#case-peer-group-twitter-insider) |
| Storm-1283 OAuth-enabled cryptomining (Reported December 2023) | Storm-1283, as tracked by Microsoft | [Peer-Group](#case-peer-group-storm1283-2023) · [Graph / Relationship](#case-graph-relationship-storm1283-2023) · [State-Change](#case-state-change-storm1283-2023) |
| UNC3944 help-desk compromise and SaaS data theft (2023–2024 investigations reported June 2024) | UNC3944, as tracked by Mandiant; overlapping public names are not assumed to be exact aliases | [Sequence](#case-sequence-unc3944-saas) · [Identity / Access](#case-identity-access-unc3944-saas) · [Data Movement](#case-data-movement-unc3944-saas) · [Multi-Event Correlation](#case-multi-event-correlation-unc3944-saas) |
| BazarCall to Conti intrusion (2021 case reported on 1 August) | Conti ransomware operators in this investigation; tools alone do not establish actor identity | [Sequence](#case-sequence-bazarcall-conti) · [Rare Process / Service](#case-rare-process-service-bazarcall-conti) · [Multi-Event Correlation](#case-multi-event-correlation-bazarcall-conti) |
| Storm-0558 forged-token mailbox access (2023) | Storm-0558, as attributed by Microsoft | [Identity / Access](#case-identity-access-storm0558-2023) |
| MESSAGETAP on telecommunications SMS servers (2019) | APT41, as attributed by Mandiant | [Rare Process / Service](#case-rare-process-service-messagetap-2019) |
| Lemon Duck exploitation of Exchange servers (March 2021 reporting) | Lemon Duck activity in Microsoft's report; not reassigned to HAFNIUM | [Parent-Child Execution](#case-parent-child-lemon-duck-exchange) |
| DoejoCrypt activity after Exchange exploitation (March 2021 reporting) | DoejoCrypt activity in Microsoft's report; malware label, not a proven identity of the operator | [Parent-Child Execution](#case-parent-child-doejocrypt-exchange) |
| OilRig-associated RDAT at a telecommunications organization (April 2020 activity) | OilRig association assessed by Unit 42; not an attribution inferred from DNS entropy | [Protocol / Application Usage](#case-protocol-application-oilrig-rdat-2020) |
| SCARLETEEL cloud intrusion (2023 reporting) | SCARLETEEL is the operation label used by Sysdig, not an independently established actor identity | [Negative Anomaly (Absence)](#case-negative-absence-scarleteel-2023) |
| AuKill use before ransomware deployment (January–February 2023 incidents) | Ransomware incidents involving Medusa Locker or LockBit; no assertion that their operators are one group | [Negative Anomaly (Absence)](#case-negative-absence-aukill-2023) |
| LEMURLOOT in MOVEit data-theft intrusions (May–June 2023) | FIN11 in Mandiant's updated assessment (initially UNC4857); the separately reported CL0P data-leak claim is not an alias inferred from the account artifact | [State-Change](#case-state-change-moveit-lemurloot) |

#### Topic tags {#anomaly-topic-tags}

These tags link to the relevant sections of this existing article; they do not create new tag landing pages.

##### Cloud and SaaS {#tag-cloud}

[Volumetric](#anomaly-volumetric) · [Peer-Group](#anomaly-peer-group) · [Sequence](#anomaly-sequence) · [Graph / Relationship](#anomaly-graph-relationship) · [Geographic / ASN](#anomaly-geographic-asn) · [Identity / Access](#anomaly-identity-access) · [Data Movement](#anomaly-data-movement) · [Negative Anomaly (Absence)](#anomaly-negative-absence) · [State-Change](#anomaly-state-change) · [Multi-Event Correlation](#anomaly-multi-event-correlation)

##### Network telemetry {#tag-network}

[Volumetric](#anomaly-volumetric) · [Frequency / Rate](#anomaly-frequency-rate) · [Temporal](#anomaly-temporal) · [Geographic / ASN](#anomaly-geographic-asn) · [Rare Process / Service](#anomaly-rare-process-service) · [Protocol / Application Usage](#anomaly-protocol-application)

##### Identity and access {#tag-identity}

[Frequency / Rate](#anomaly-frequency-rate) · [Peer-Group](#anomaly-peer-group) · [Sequence](#anomaly-sequence) · [Graph / Relationship](#anomaly-graph-relationship) · [Geographic / ASN](#anomaly-geographic-asn) · [Identity / Access](#anomaly-identity-access) · [Data Movement](#anomaly-data-movement) · [State-Change](#anomaly-state-change) · [Multi-Event Correlation](#anomaly-multi-event-correlation)

##### Endpoint telemetry {#tag-endpoint}

[Temporal](#anomaly-temporal) · [Sequence](#anomaly-sequence) · [Rare Process / Service](#anomaly-rare-process-service) · [Parent-Child Execution](#anomaly-parent-child) · [Protocol / Application Usage](#anomaly-protocol-application) · [Negative Anomaly (Absence)](#anomaly-negative-absence) · [Multi-Event Correlation](#anomaly-multi-event-correlation)

##### Insider risk {#tag-insider}

[Peer-Group](#anomaly-peer-group)

##### Operational technology {#tag-ot}

[Temporal](#anomaly-temporal)

##### Telemetry health {#tag-telemetry-health}

[Negative Anomaly (Absence)](#anomaly-negative-absence)

##### Application audit {#tag-application}

[State-Change](#anomaly-state-change)

#### Reuse and validation {#anomaly-reuse-validation}

**ATT&CK currency:** Mappings were reviewed on 2026-09-21; the technical revision uses Enterprise ATT&CK v19.2. The former T1562.001 now points to [T1685 — Disable or Modify Tools](https://attack.mitre.org/techniques/T1685/); The former T1562.008 now points to [T1685.002 — Disable or Modify Tools: Disable or Modify Cloud Log](https://attack.mitre.org/techniques/T1685/002/). The JSON retains these identifier transitions. Vendor finding names remain their vendor-defined identifiers.

The companion machine-readable evidence register is <a href="https://1200km.com/articles/research/anomaly-incidents.json" target="_self">available as JSON</a>. It keeps source URLs and publication dates separate from incident periods, and records both the observed behavior and the inferred detection opportunity. Case identifiers support deduplication across anomaly types.

To evaluate a proposed detector, preserve the source event IDs, normalize entity identifiers and time zones, define the comparison population, and test against both attack and legitimate activity. Freeze thresholds before evaluation. Report missing telemetry, false alerts per entity-day, incident recall and alert precision separately. A high anomaly score is neither group attribution nor an automatic containment decision.

**Implementation boundary:** Incident evidence does not validate a detector. Section 8 now uses maintained query files and explicit telemetry contracts; its execution report distinguishes functional tests from public-recording replay. Section 9 labels synthetic statistical results separately. Neither establishes production precision, recall, connector compatibility or universal thresholds.
<!-- anomaly-evidence:index:end -->

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

<ResearchFigure id="attack-mapping" />

## 4. Evidence Register: Real APT Campaigns and Documented Anomaly Patterns

These investigations illustrate opportunities and limitations. **Source-reported** means the named investigator reports the activity; **inferred** means a detection hypothesis developed here. None of the following accounts represents a replay of a victim's private telemetry.

### 4.1 SUNBURST / UNC2452 (2020)

**Source-reported:** Mandiant documented a trojanized SolarWinds component, delayed activation and encoded information in DNS names. Its initial investigation also described TEARDROP reading a file with a likely fake JPEG header before loading a payload; the executable itself should not be described as a JPEG. [Initial investigation](https://cloud.google.com/blog/topics/threat-intelligence/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor/), [technical follow-up](https://cloud.google.com/blog/topics/threat-intelligence/sunburst-additional-technical-details/).

**Inferred:** investigate DNS-label structure, destination novelty and the originating process together. Dormancy complicates short lookbacks but does not itself supply an outbound-network observation. Neither the source nor this research establishes a universal entropy cutoff, an above-baseline entropy measurement at victims, or inevitable detection by a DNS analytic. Sysmon image-load telemetry is not a guarantee of visibility into manual or reflective loading.

<ResearchFigure id="case-sunburst" />

### 4.2 HAFNIUM / Exchange ProxyLogon (2021)

**Source-reported:** Microsoft described exploitation of Exchange vulnerabilities followed by webshell deployment. Its separate post-exploitation investigation described multiple actors and tools; observations from that broader set must not all be attributed to HAFNIUM. [HAFNIUM investigation](https://www.microsoft.com/en-us/security/blog/2021/03/02/hafnium-targeting-exchange-servers/), [post-exploitation analysis](https://www.microsoft.com/en-us/security/blog/2021/03/25/analyzing-attacks-taking-advantage-of-the-exchange-server-vulnerabilities/).

**Inferred:** correlate unusual web requests, ASPX writes, and shell execution descending from a web worker. Ordinary IIS logs do not contain arbitrary request bodies. Process fields differ between native 4688, Sysmon and EDR schemas; normalize them explicitly. Custom applications may legitimately invoke shells, so role and change context matter. Later native IIS-module campaigns are a separate evidence set; no claim about them is derived from the original HAFNIUM report here.

<ResearchFigure id="case-exchange" />

### 4.3 Conti Ransomware (2021–2022)

**Source-reported:** the selected BazarCall investigation describes a progression through Trickbot and Cobalt Strike to Conti. It is one intrusion account, not a composite timeline for every Conti affiliate. The earlier IcedID-proxy detail and unmatched elapsed-time claims are not retained as facts of this incident. [The DFIR Report](https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/).

**Inferred:** correlate enumeration, remote administration, share access, service creation and security-setting changes by identity and host. AdFind prevalence must be measured locally; its execution does not guarantee that every EDR alerts. Shadow-copy deletion can occur during legitimate administration. For Defender, collect its own Operational channel: event 5001 reports disabled real-time protection and 5007 a configuration change. Registry telemetry can supplement these records but does not replace them. [Defender event reference](https://learn.microsoft.com/en-us/defender-endpoint/troubleshoot-microsoft-defender-antivirus).

<ResearchFigure id="case-conti" />

### 4.4 APT34 / OilRig DNS Tunneling (2018–2024)

**Source-reported:** Unit 42's RDAT investigation describes OilRig-associated tooling with several communication mechanisms and an email/steganography variant. Mechanisms differ by sample and version. The separate Talos DNSpionage investigation does not, by itself, establish an OilRig attribution. [RDAT investigation](https://unit42.paloaltonetworks.com/oilrig-novel-c2-channel-steganography/), [DNSpionage investigation](https://blog.talosintelligence.com/dnspionage-campaign-targets-middle-east/).

**Inferred:** evaluate label structure, unique-label counts, record types, timing, destinations and process context. TXT-heavy legitimate workloads exist; a TXT:A ratio above one is not intrinsically malicious. Full labels are necessary for label-entropy analysis, not for every possible endpoint, traffic-volume or DNS-behavior detector. No universal label-length, entropy or cadence threshold is validated here.

<ResearchFigure id="case-oilrig" />

### 4.5 MOVEit / Cl0p Campaign (2023)

**Source-reported:** Mandiant described exploitation of MOVEit Transfer and LEMURLOOT, including its custom HTTP headers, database interaction and creation of a MOVEit application account named `HealthCheckService` / `Health Check Service`. It also described retrieval of Azure storage settings from the database. This is not evidence that a Windows user was created or that a particular configuration file was read. [Mandiant investigation](https://cloud.google.com/blog/topics/threat-intelligence/zero-day-moveit-data-theft).

**Inferred:** correlate webshell writes/access, application account and session changes, database activity and exports. Windows event 4720 does not represent this SQL-backed account operation. A familiar-looking name alone is not proof of a malicious account, and a normal HTTP status does not establish benign use.

<ResearchFigure id="case-moveit" />

### 4.6 Midnight Blizzard / Cozy Bear (2023–2024)

**Source-reported:** Microsoft described password spraying against a legacy test account without MFA, residential proxies, malicious applications and Exchange `full_access_as_app` permission abuse. Generic Microsoft Graph mail scopes must not be substituted for the incident's actual permission. [January 25 investigation](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/).

Microsoft's March update separately reported that some activity, including password sprays, increased by as much as tenfold in February relative to January. This is not a January observation or a measurement of total attack volume. [March update](https://msrc.microsoft.com/blog/2024/03/update-on-microsoft-actions-following-attack-by-nation-state-actor-midnight-blizzard/).

**Inferred:** combine tenant/account-level failures with consent, application ownership, credentials and EWS access. Provider-wide visibility can add context that a tenant lacks; this does not establish that tenant-local analytics cannot detect distributed activity. Missing prior history is a cold-start problem, not proof of innocence.

<ResearchFigure id="case-midnight" />

### 4.7 Scattered Spider / UNC3944 (2023)

**Source-reported:** Mandiant's June 2024 investigation describes help-desk social engineering, identity abuse and SaaS data theft involving legitimate integration tools. Its cluster label should not be treated as identical membership across every vendor name or as proof of attribution for every publicly named victim. [UNC3944 investigation](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/).

**Inferred:** join factor changes to subsequent sessions and sensitive application actions using actual account and tenant keys. A failed MFA event is not necessarily a denied push or a fraud report. Provider-side transfers may bypass the customer's endpoint and perimeter monitoring, but visibility varies: identity, application, connector, provider and destination records may still exist. Do not claim that an extortion demand is the only possible discovery path.

<ResearchFigure id="case-unc3944" />

### 4.8 Storm-0558 and OAuth Abuse Campaigns (2023)

**Source-reported — Storm-0558:** the actor used an acquired Microsoft account consumer signing key to forge tokens. The key was not itself forged. The CSRB documents the State Department's June 2023 discovery and alerts from its custom **Big Yellow Taxi** rule using `MailItemsAccessed`. Customer-side detection did work; failure by the provider to discover the compromise independently is a different claim. [CSRB investigation, incident narrative](https://www.cisa.gov/sites/default/files/2024-03/CSRB%20Review%20of%20the%20Summer%202023%20MEO%20Intrusion%20Final_508c.pdf).

This is an important positive example of the article's thesis: available audit data, a contextual analytic and analyst investigation contributed to discovery. However, the public account does not provide the complete production query, thresholds, negative corpus or denominator needed to reproduce its performance. This article does not reconstruct the private rule or assign it precision/recall. Historical licensing constraints must not be presented as current product requirements. [Current mailbox-audit guidance](https://learn.microsoft.com/en-us/purview/audit-log-investigate-accounts).

**Source-reported — Storm-1283:** this separate financially motivated activity involved OAuth applications and Azure compute used for cryptomining. It is not part of the Storm-0558 intrusion. [Microsoft, December 12, 2023](https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/).

**Inferred:** unexpected application-to-resource relationships can guide investigation. VM creation by a service principal is also normal automation; principal ownership, role, change history and workload purpose are essential.

<ResearchFigure id="case-storm" />

### 4.9 Volt Typhoon (2023–2024)

**Source-reported:** Microsoft describes credential extraction with `ntdsutil` IFM against domain controllers, alongside living-off-the-land activity and proxy infrastructure. The execution host and any remote initiation host must be distinguished. [Microsoft, May 24, 2023](https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/).

**Inferred:** examine IFM creation **on a domain controller** by an unexpected principal or outside approved backup activity, particularly with subsequent staging and movement. A non-DC-only filter misses the relevant execution context. Process arguments are useful but not the only evidence: file, authentication, network and change records can contribute.

For log clearing, distinguish Security event **1102** from **104** in the System channel from the Eventlog provider. Record which channel was cleared; do not map `wevtutil cl System` to Security 1102. Collection gaps require independent health evidence before attributing intentional impairment. Legitimate maintenance remains a competing explanation. [Security 1102 reference](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-1102).

<ResearchFigure id="case-volt" />

### 4.10 APT41 / Winnti — MESSAGETAP and Database Exfiltration {#410-apt41--winnti--messagetap-2019-and-m-trends-2025-exfiltration-2024}

**Source-reported — MESSAGETAP:** Mandiant describes a 64-bit ELF data miner on Linux SMS servers. It checks for configuration files, reads and removes them after loading, then uses libpcap to inspect traffic and save selected content. The polling phase is not a continuing configuration refresh, and the report does not describe the program as a shared library. [Mandiant, October 2019](https://cloud.google.com/blog/topics/threat-intelligence/messagetap-who-is-reading-your-text-messages/).

**Inferred:** investigate unexpected packet-capture capability, process provenance and sensitive output files. Merely loading libpcap is not proof of malicious behavior; capturing packets can be part of legitimate operations.

**Source-reported — database theft:** Mandiant's July 2024 APT41 investigation describes SQLULDR2 for Oracle data export and PINEGROVE for transfer to OneDrive. This directly supports the account; a generic M-Trends citation is insufficient. [APT41 Has Arisen From the DUST](https://cloud.google.com/blog/topics/threat-intelligence/apt41-arisen-from-dust).

**Inferred:** evaluate unexpected exports and new storage destinations against the database server's role and approved jobs. Both an export utility and cloud storage can be legitimate.

<ResearchFigure id="case-apt41" />

### 4.11 CISA AA22–277A — Impacket Lateral Movement in Defense Industrial Base Compromise (2022)

The advisory reports Impacket and data theft without assigning a named actor. Tool names do not identify an execution mode: `secretsdump.py` is not synonymous with DCSync, and ordinary `wmiexec.py` execution is not a permanent WMI event subscription. [CISA AA22–277A](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-277a).

**Inferred:** correlate remote logons and WMI-related process ancestry; examine replication-specific evidence where DCSync is suspected. WMI Operational 5861 concerns permanent subscription activity, not every remote WMI execution. TCP/135 followed by dynamic RPC ports is not sufficient to identify DRSUAPI. Event 4662 also needs configured auditing and source enrichment, discussed below.

<ResearchFigure id="case-impacket" />

### 4.12 Lazarus Group / DPRK — 3CX Supply Chain (2023)

**Source-reported:** SentinelOne reported behavioral detections starting March 22, before public disclosure of the compromised 3CX application. In the Windows chain, GitHub-hosted icon files carried encoded C2 information; they should not be described as executable content downloaded from GitHub. [SentinelOne investigation](https://www.sentinelone.com/blog/smoothoperator-ongoing-campaign-trojanizes-3cx-software-in-software-supply-chain-attack/).

**Inferred:** investigate unusual destinations and subsequent execution associated with a normally trusted application. A valid signature is not a benign verdict. Vendor-reported detection is evidence of those observations, not an independent comparison of all EDR products or proof that a proposed destination-rarity rule would perform equally well.

<ResearchFigure id="case-3cx" />

## 5. Detection by Log Source and Security Device

A telemetry contract states what must actually be collected: provider/channel, event version, fields, entity keys, clock, parser, retention, collection health and enrichment. A vendor feature list is not a measurement of coverage. Verify prerequisites with generated test activity and raw records before writing analytics against normalized fields.

<ResearchFigure id="telemetry-contract" />

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

<ResearchFigure id="source-windows" />

### 5.2 Sysmon

Use the [Sysmon event reference](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon) and record the installed version and configuration hash. Useful event families include process creation (1), network connections (3), driver/image loads (6/7), remote threads (8), process access (10), file creation (11), registry changes (12–14), pipes (17/18), DNS (22) and supported process-tampering observations (25).

Collection and filtering determine availability. Image-load events do not guarantee coverage of manual mapping. Event 8's inferred start-module/function fields can be empty; an empty field or parser-generated `Unknown` is not proof of shellcode. Likewise an unresolved event-10 call trace is not proof of injected code. Named pipes associated with tooling are leads, not immutable tool identities.

<ResearchFigure id="source-sysmon" />

### 5.3 EDR Platforms

<span id="crowdstrike-falcon"></span><span id="microsoft-defender-for-endpoint-mde"></span>

EDR can supply process, file, memory, identity and network evidence that raw audit logs lack. Preserve raw event IDs, sensor health, event times, host identity and detection provenance. Vendor-reported capabilities and detections must remain labeled as such; this research does not rank products, reproduce proprietary models, or guarantee built-in alert names and licensing.

For example, Microsoft documents `DeviceProcessEvents` as an advanced-hunting table. Confirm the available columns and ingestion before porting a process-lineage analytic. Exact sensor-event counts, proprietary model inventories and unsupported release-year claims have been removed from the operational guidance. [Microsoft table reference](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-deviceprocessevents-table).

<ResearchFigure id="source-edr" />

### 5.4 Network Detection and Response

<span id="zeek--corelight"></span><span id="vectra-ai"></span>

For Zeek, record sensor placement, packet loss, version, loaded scripts and packages. `dns.log` uses `TTLs`, not `TTL`; `conn.log` provides directional connection metadata. TLS, certificate, file-hash and fingerprint fields depend on analyzers and configuration. JA3/JA3S are not guaranteed stock fields in every `ssl.log`. [Zeek DNS schema](https://docs.zeek.org/en/v8.2.1/reference/logs/dns.html), [Zeek TLS logging](https://docs.zeek.org/en/lts/reference/logs/ssl.html).

TLS-extension randomization weakens order-sensitive JA3 stability for affected browsers. JA4 addresses extension-order sensitivity, but neither fingerprint is an actor identity or proof of malware; libraries are shared and fingerprints can be imitated. Record the implementation and normalize consistently before comparing sensors. [Cloudflare's JA4 explanation](https://blog.cloudflare.com/ja4-signals/).

<ResearchFigure id="source-ndr" />

### 5.5 Identity and Access Management Platforms

Entra risk detections mix behavioral analytics, threat intelligence, leaked credentials and user reporting. Do not describe every detection as an anomaly model or every denied MFA challenge as a user fraud report. Verify the actual detection type, licensing, configuration and retained events. [Entra risk catalog](https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks).

Okta's catalog includes `user.mfa.factor.update`, `user.session.impersonation.initiate` and `user.account.privilege.grant`. Their identifiers are not invented. Interpret outcome, reason, factor, actor and target together; a generic failure does not establish MFA fatigue. [Okta event catalog](https://developer.okta.com/docs/reference/api/event-types/).

<ResearchFigure id="source-iam" />

### 5.6 Cloud Security Services

Cloud analytics require the relevant accounts, regions, event categories and resource-level logging. A control-plane log does not automatically contain every data access. Provider-native detections may use context unavailable in exported logs; a local reproduction must declare that difference.

**AWS documentation inconsistency:** GuardDuty lists `GenerateDbAuthToken` among credential-access anomalous APIs, while RDS states that CloudTrail does not track token generation. Preserve both statements rather than calling the article's vendor citation invented or assuming an observable CloudTrail event. This revision does not implement a detector dependent on that event. [GuardDuty IAM findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-iam.html), [RDS IAM authentication limitations](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html).

<span id="microsoft-sentinel--anomaly-analytics"></span>

Sentinel anomaly rules provide deviations for investigation and correlation. Use the selected template's documented requirements rather than asserting a universal learning period or assuming that an anomaly is an incident. [Sentinel anomaly-rule guidance](https://learn.microsoft.com/en-us/azure/sentinel/work-with-anomaly-rules).

<ResearchFigure id="source-cloud" />

### 5.7 DNS Security

Full DNS labels allow lexical analysis. Resolver logs, endpoint DNS events and network sensors observe different parts of the path; caches, encryption and collection gaps affect coverage. Specify whether the metric concerns a leftmost label, all labels below a registrable domain, or the entire name. A public-suffix-aware parser is required if the analytic groups by registrable domain.

#### Shannon Entropy for DNS Anomaly Detection {#shannon-entropy-for-dns-anomaly-detection}

Empirical character entropy is `H = -sum(p(c) * log2(p(c)))`, in bits per character. It measures the symbol-frequency distribution, not semantic randomness or maliciousness. For a label of length n over alphabet A, its upper bound is `log2(min(n, |A|))`. A short word's low maximum entropy does not calibrate a cutoff for a long encoded label; a structured sequence with distinct characters can have high empirical entropy.

Normalize casing and label selection, handle internationalized names explicitly, and test legitimate encoded names. Section 8's implementation is an ASCII-label feature extractor, not a tunneling verdict. No SUNBURST-specific entropy range or universal alert threshold is claimed.

<ResearchFigure id="dns-entropy" />

### 5.8 SaaS Audit Logs

Separate event counts, distinct objects, records and bytes. The example below counts download audit events; it does not infer bytes from `OfficeObjectId`. If authoritative object sizes or transfer counters are available, document that separate enrichment and its limitations.

For Microsoft 365, verify workload auditing and retention for operations such as `MailItemsAccessed`, `FileDownloaded` and `FileSyncDownloadedFull`. Current mailbox auditing must not inherit historical licensing assumptions. Application grants and service-principal activity may require Entra audit data in addition to workload logs. [Mailbox investigation guidance](https://learn.microsoft.com/en-us/purview/audit-log-investigate-accounts), [OfficeActivity schema](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/officeactivity).

<ResearchFigure id="source-saas" />

### 5.9 Detection Source Prioritization Matrix

Unmeasured fidelity ratings have been replaced with a planning matrix. No universal deployment order is implied.

| Decision | Evidence to collect before choosing |
|---|---|
| Which source closes an important visibility gap? | Threat model, important assets and currently missing behaviors |
| Can the proposed fields actually be collected? | Raw samples, policy, sensor health, schema and license verification |
| Can operations sustain the source? | Measured volume, storage/retention, privacy needs and ownership |
| Does the analytic add value? | Held-out alerts, legitimate workload controls, missed cases and analyst workload |
| Is prioritization justified? | Local benefit and cost, not a vendor name or an unsupported High/Medium/Low score |

<ResearchFigure id="source-prioritization" />

## 6. Credential-Based Attacks: Detection Engineering Deep Dive

### 6.1 Kerberoasting

Kerberoasting obtains service-ticket material for offline password recovery. The service key depends on the encryption type: RC4-HMAC and AES must not be explained as the same NTLM-hash encryption mechanism. Ordinary users requesting service tickets is normal authentication behavior. [MITRE T1558.003](https://attack.mitre.org/techniques/T1558/003/).

Event 4769 can support investigation when the relevant DC auditing is enabled. Preserve requester identity, source address, target service, encryption type, result and event version. A rule limited to RC4 (`0x17`) cannot claim AES (`0x11`/`0x12`) coverage. Broader request breadth and novelty can be considered across encryption types; a low-volume targeted request may evade either approach.

Do not exclude every machine account or service merely because its name ends in `$`. Such filtering is an explicit scope reduction with blind spots, not a proof of legitimacy. Section 8 excludes `krbtgt` from its service-breadth example, keeps computer principals visible, and reports encryption types rather than treating RC4 as a verdict. The distinct-service count is only as meaningful as the service identifier emitted by the source.

<ResearchFigure id="credential-kerberoast" />

### 6.2 DCSync

Replication abuse uses directory replication permissions to retrieve credential material. A tool name alone does not establish this mode. For event 4662, configure Directory Service Access auditing and an applicable SACL on the domain object. The SACL controls auditing; the DACL and effective directory permissions determine access. [Microsoft 4662 reference](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4662).

Relevant extended-right GUIDs include Get-Changes (`1131f6aa-9c07-11d1-f79f-00c04fc2dcd2`), Get-Changes-All (`1131f6ad-9c07-11d1-f79f-00c04fc2dcd2`) and Get-Changes-In-Filtered-Set (`89e95b76-444d-4c62-991a-0facbeda640c`). Interpret these with the control-access bit (`0x100`), object type and complete session evidence. They need not all appear in one event, and one matching right does not prove successful credential extraction.

Event 4662 has no native client-IP field. Correlate to a suitable logon record using the same DC, normalized logon identifier and bounded event time. Preserve unresolved or ambiguous correlations rather than dropping the candidate or inventing an address. Validate parser aliases and logon-ID reuse.

Approved replication should be an inventory-backed, time-bounded principal/source relationship. Entra Connect, backup and identity systems need verified exceptions—not blanket `MSOL_*`, `AADConnect*` or computer-account exclusions. Compromise of an approved source remains a blind spot. The provided rule reports candidates; it does not silently discard approved-looking accounts.

<ResearchFigure id="credential-dcsync" />

### 6.3 Pass-the-Hash

Pass-the-Hash uses captured credential material to perform authentication without the cleartext password. It does not transmit the NTLM hash directly as a password; distinguish the hash from the challenge-response exchange. [MITRE T1550.002](https://attack.mitre.org/techniques/T1550/002/).

Target-side NTLM network logons (4624, type 3) are common and do not by themselves identify PtH. A null subject SID or zero key length is not proof that there was no earlier interactive session on the source. Source-side type 9 (`NewCredentials`) with `seclogo` is a useful additional hunting view for some implementations, but can also occur with legitimate alternate-credential workflows. Other PtH implementations need not produce that pattern. [Microsoft 4624 fields](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4624).

Correlate identity, source process, destination, authentication and authorized administration. Absence of a prior event is meaningful only with adequate collection, retention and clock alignment. Section 8 intentionally returns two different evidence classes, not a binary PtH classification.

<ResearchFigure id="credential-pth" />

### 6.4 LSASS Credential Dumping (Sysmon Event 10)

LSASS process access can support credential-access investigations, but legitimate security and diagnostic software also accesses it. `GrantedAccess` is a bitmask: `0x1010` combines VM read and limited query information; `0x1410` additionally includes query information. These masks do not certify malicious intent. [Microsoft process-access rights](https://learn.microsoft.com/en-us/windows/win32/procthread/process-security-and-access-rights).

Use the source/target process identifiers, actual access rights, signer/hash, ancestry, call trace and available memory evidence. An unresolved call trace is not proof of injection. A familiar filename, signature or trusted directory is not a safe universal exclusion. Exceptions require provenance, scope, owner, expiry and periodic review; they can otherwise conceal abuse of a trusted process.

<ResearchFigure id="credential-lsass" />

## 7. How Attackers Suppress Anomaly Visibility

Separate reported tradecraft from untested claims about defeating a specific detector.

| Mechanism | Evidence or analytical implication | What this research does not establish |
|---|---|---|
| Distributed activity | Midnight Blizzard's residential proxies motivate identity-level correlation alongside source-level counts. | That all tenant-local analytics failed or that every source stayed below every threshold. |
| Valid accounts and native tools | Volt Typhoon motivates role, actor and change-context analysis. | That native commands are indistinguishable in every available source, or command lines are the only evidence. |
| In-process behavior | A detector requiring a child process misses activity that does not create one. | That Sysmon image-load or remote-thread events cover every injection mechanism. |
| Low-rate collection | Small transfers can avoid a large-transfer rule; longer windows may expose accumulation. | A measured recall advantage without replay and representative benign traffic. |
| Provider-side activity | Some SaaS transfers bypass a customer's endpoint/perimeter sensors. | That no identity, application, provider or destination evidence exists. |
| Baseline contamination | Including the scored event in training or accepting attacker activity as normal can mask deviations. | That a specific historical actor poisoned a particular model unless a source documents it. |
| Collection interruption | Missing logs reduce observability and may distort statistical denominators. | That a missing event proves deliberate evasion rather than outage, filtering, retention or parser failure. |

The campaign-specific sources and boundaries are in Section 4. For an operational analytic, publish its expected blind spots next to the query—not only in a distant disclaimer.

<ResearchFigure id="visibility-limits" />

## 8. Detection Engineering Patterns and Logic Examples

### 8.1 Four Core Design Patterns

**Rarity in role:** compare equivalent entities and tasks rather than the entire estate. Role membership itself must be trustworthy and updated after legitimate changes.

**Rate plus shape:** combine count, distinct targets, distinct sources and ordering. A fixed time bin has boundary effects; longer or overlapping windows introduce additional cost and deduplication requirements.

**State change:** inspect a new permission, identity relationship or configuration state against policy and approved change. A deterministic condition is not the same as a deterministic malicious verdict.

**Corroboration:** combine independent evidence while measuring what each extra gate removes. If a gate intersects a candidate set, it can remove true positives as well as false positives. Do not promise improved precision without a recall trade-off.

<ResearchFigure id="analytic-contract" />

### 8.2 Detection Logic Examples

The canonical implementations are eight KQL files under `research/anomaly-validation/queries/` in the companion repository. This section is generated from those files; edits belong in the files, not in duplicated snippets. The old broken SPL/KQL exports remain in an explicitly historical download, not as deployment recipes.

**Contract:** these queries use the named normalized tables in the <a href="https://1200km.com/articles/research/anomaly-validation/contracts.json" target="_self">telemetry contract</a>. They are not drop-in queries for an unspecified Sentinel connector. Fixture execution establishes syntax and selected logic behavior; live ingestion, identity enrichment, scheduling, production thresholds and analyst outcomes require separate validation. No Splunk execution is claimed by converting an SPL example to KQL.

#### Distributed Password Spray — Rate and Shape {#distributed-password-spray--rate-and-shape}

The example selects result `50126` as one invalid-credential class, not every nonzero status. It joins only attempted identities within the same tenant, requires success after that identity's last failure, and uses a bounded follow-up period. `50140` is an interaction interruption, not generic completed success. [Microsoft error-code reference](https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes), [Kusto time-window joins](https://learn.microsoft.com/en-us/kusto/query/join-time-window).

The numeric thresholds are fixture parameters. Shared proxies and identity outages can create similar patterns; success afterward does not prove compromise. This analytic deliberately requires a burst and subsequent success, so failure-only spraying, unresolved identities and sufficiently low-volume activity fall outside its scope. Its fixed-bin boundary blind spot is an explicit regression test, not hidden by reporting only positive cases.

<!-- query-source:password-spray:start -->
```kusto
// Normalized SigninEvents; illustrative parameters, not calibrated production settings.
let Window = 15m;
let Followup = 30m;
let MinFailures = 6;
let MinAccounts = 3;
let MinSources = 2;
let Events = SigninEvents
    | where isnotempty(TenantId) and isnotempty(UserId) and isnotempty(EventId)
    | summarize arg_max(TimeGenerated, *) by TenantId, EventId;
let Failures = Events
    | where ResultType == "50126" and isnotempty(IPAddress)
    | extend WindowStart = bin(TimeGenerated, Window);
let Bursts = Failures
    | summarize Failures=count(), Accounts=count_distinct(UserId), Sources=count_distinct(IPAddress)
        by TenantId, WindowStart
    | where Failures >= MinFailures and Accounts >= MinAccounts and Sources >= MinSources;
let Attempted = Failures
    | summarize FirstFailure=min(TimeGenerated), LastFailure=max(TimeGenerated)
        by TenantId, UserId, WindowStart
    | join kind=inner Bursts on TenantId, WindowStart;
Attempted
| join kind=inner (Events | where ResultType == "0"
    | project TenantId, UserId, SuccessTime=TimeGenerated, SuccessEventId=EventId, SuccessIP=IPAddress)
    on TenantId, UserId
| where SuccessTime > LastFailure and SuccessTime <= LastFailure + Followup
| project TenantId, UserId, WindowStart, FirstFailure, LastFailure,
    SuccessTime, SuccessEventId, SuccessIP, Failures, Accounts, Sources
| order by TenantId asc, UserId asc, SuccessTime asc
```
<!-- query-source:password-spray:end -->

#### Kerberoasting — Service-Request Breadth {#kerberoasting--rc4-tgs-volume}

This version reports encryption types and includes AES instead of asserting that RC4 alone covers Kerberoasting. It excludes `krbtgt` from this service-breadth view without excluding all computer principals. The threshold of five distinct service identifiers is illustrative. The public single-ticket recording is deliberately not modified or repeated to make this rule fire: a volume detector can miss a real low-volume technique example.

<!-- query-source:kerberoasting:start -->
```kusto
// WindowsEvents normalized as documented in contracts.json. Five is a test parameter.
WindowsEvents
| where EventID == 4769 and ResultCode == "0"
| where isnotempty(Principal) and isnotempty(ServiceName)
| extend ServiceName=tolower(ServiceName)
| where ServiceName !~ "krbtgt" and not(ServiceName startswith "krbtgt/")
| summarize arg_max(TimeGenerated, *) by Computer, EvidenceId
| extend WindowStart=bin(TimeGenerated, 15m)
| summarize Requests=count(), DistinctServices=count_distinct(ServiceName),
    Services=make_set(ServiceName, 100), EncryptionTypes=make_set(EncryptionType, 10)
    by Principal, SourceIP, WindowStart
| where DistinctServices >= 5
| order by Principal asc, WindowStart asc
```
<!-- query-source:kerberoasting:end -->

#### DCSync — Replication-Right Access {#dcsync--replication-guids-from-non-dc-account}

Return each candidate access, including computer principals and separate-right events. Source enrichment is a bounded same-DC/logon-ID join; unresolved and ambiguous addresses remain visible. An approved-source review belongs after this evidence-preserving stage. The 24-hour correlation bound is a test configuration, not proof that logon IDs cannot be reused. Validate session uniqueness and stale-address handling in the actual environment.

<!-- query-source:dcsync:start -->
```kusto
// Candidate replication-right access, NOT proof of successful credential extraction.
let Candidates = WindowsEvents
    | where EventID == 4662
    | where binary_and(AccessMask, 256) != 0
    | where ObjectType =~ "domainDNS" or ObjectType contains "19195a5b-6da0-11d0-afd3-00c04fd930c9"
    | where Properties contains "1131f6aa-9c07-11d1-f79f-00c04fc2dcd2"
        or Properties contains "1131f6ad-9c07-11d1-f79f-00c04fc2dcd2"
        or Properties contains "89e95b76-444d-4c62-991a-0facbeda640c"
    | summarize arg_max(TimeGenerated, *) by Computer, EvidenceId
    | project Computer, EvidenceId, ReplicationTime=TimeGenerated, Principal, LogonId, Properties;
let Correlation = Candidates
    | where isnotempty(LogonId)
    | join kind=inner (WindowsEvents | where EventID == 4624 and isnotempty(LogonId)
        | project Computer, LogonId, LogonTime=TimeGenerated, CorrelatedIP=SourceIP) on Computer, LogonId
    | where LogonTime <= ReplicationTime and LogonTime >= ReplicationTime - 24h
    | where isnotempty(CorrelatedIP) and CorrelatedIP != "-"
    | summarize CandidateIPs=make_set(CorrelatedIP, 100) by Computer, EvidenceId
    | extend SourceIP=iff(array_length(CandidateIPs) == 1, tostring(CandidateIPs[0]), ""),
        SourceStatus=iff(array_length(CandidateIPs) == 1, "correlated", "ambiguous");
Candidates
| join kind=leftouter Correlation on Computer, EvidenceId
| extend SourceStatus=iff(isempty(SourceStatus), "unresolved", SourceStatus)
| project Computer, EvidenceId, ReplicationTime, Principal, LogonId, Properties, SourceIP, SourceStatus
| order by Computer asc, EvidenceId asc
```
<!-- query-source:dcsync:end -->

#### Pass-the-Hash — Authentication Hunting Views {#pass-the-hash--ntlm-network-logon-heuristic}

These are broad hunting outputs: source-side alternate-credential context and target-side NTLM network authentication. They intentionally include legitimate activity and do not assign a malicious verdict. Correlate them with process and identity evidence; missing one view does not exclude PtH.

<!-- query-source:pass-the-hash:start -->
```kusto
// Two hunting views, not an authentication-attack classifier.
WindowsEvents
| where EventID == 4624
| extend EvidenceClass=case(
    LogonType == 9 and LogonProcess =~ "seclogo", "source-new-credentials",
    LogonType == 3 and AuthenticationPackage =~ "NTLM", "target-ntlm-network",
    "outside-scope")
| where EvidenceClass != "outside-scope"
| summarize arg_max(TimeGenerated, *) by Computer, EvidenceId
| project TimeGenerated, Computer, EvidenceId, Principal, SourceIP, LogonId, EvidenceClass
| order by EvidenceId asc
```
<!-- query-source:pass-the-hash:end -->

#### LSASS Credential Access — Sysmon Event 10

The query identifies VM-read access to LSASS. It does not equate every matching process with a credential dumper or every nonmatching access mode with safety. Familiar paths are deliberately retained for review rather than silently allowlisted.

<!-- query-source:lsass-access:start -->
```kusto
// PROCESS_VM_READ candidates. No trusted-path or process-name auto-exclusion.
EndpointEvents
| where Provider == "Microsoft-Windows-Sysmon" and EventID == 10
| where TargetImage endswith "\\lsass.exe"
| where binary_and(GrantedAccess, 16) != 0
| summarize arg_max(TimeGenerated, *) by Computer, EvidenceId
| project TimeGenerated, Computer, EvidenceId, Image, TargetImage, GrantedAccess, CallTrace
| order by EvidenceId asc
```
<!-- query-source:lsass-access:end -->

#### Web-Server Process Spawning Shell Interpreter

This tests a direct parent-child relationship on inventory-confirmed web servers. It does not detect every webshell, indirect descendant, module or in-process action. A legitimate application can match. Do not substitute an ancestor for a direct parent without changing and testing the analytic.

<!-- query-source:web-shell-lineage:start -->
```kusto
// Direct child relation only; HostRole is inventory enrichment, not guessed from a filename.
EndpointEvents
| where Provider == "Microsoft-Windows-Sysmon" and EventID == 1 and HostRole == "web-server"
| where ParentImage endswith "\\w3wp.exe" or ParentImage endswith "\\UMWorkerProcess.exe"
| where Image endswith "\\cmd.exe" or Image endswith "\\powershell.exe" or Image endswith "\\pwsh.exe"
| summarize arg_max(TimeGenerated, *) by Computer, EvidenceId
| project TimeGenerated, Computer, EvidenceId, Image, ParentImage, CommandLine, HostRole
| order by EvidenceId asc
```
<!-- query-source:web-shell-lineage:end -->

#### DNS Tunneling — Shannon Entropy on Subdomain

The implementation extracts entropy from a specified ASCII label; it does not classify tunneling. Keep the raw QNAME and extraction provenance upstream. Short labels, valid encoded services, alphabet choices and internationalized names need deliberate handling. A high score on `abcdefghijklmnop` demonstrates why character entropy is not the same as unpredictable or malicious content.

<!-- query-source:dns-entropy:start -->
```kusto
// Feature extraction, NOT a malicious-domain verdict. One normalized ASCII label per row.
let Labels = DnsLabels
    | where isnotempty(EvidenceId) and isnotempty(Label)
    | extend Label=tolower(Label)
    | where Label matches regex "^[a-z0-9_-]{1,63}$"
    | summarize arg_max(TimeGenerated, *) by Sensor, EvidenceId
    | extend LabelLength=strlen(Label);
Labels
| mv-expand CharacterIndex=range(0, LabelLength - 1, 1) to typeof(long)
| extend Character=substring(Label, toint(CharacterIndex), 1)
| summarize Occurrences=count() by Sensor, EvidenceId, Label, LabelLength, Character
| extend P=todouble(Occurrences) / todouble(LabelLength)
| summarize Entropy=-sum(P * log2(P)) by Sensor, EvidenceId, Label, LabelLength
| extend LengthBound=log2(todouble(LabelLength))
| order by EvidenceId asc
```
<!-- query-source:dns-entropy:end -->

#### SaaS Bulk Download Anomaly (M365 SharePoint / OneDrive)

`DailyDownloads` contains one row per tenant, immutable user and complete UTC calendar day. Independent collection health determines `Complete`. Missing collection must not become an invented zero. Count deduplicated audit events; do not label the result bytes or unique files. Reject duplicate entity/day rows before scoring.

The caller supplies `EvaluationDay`; training excludes that day and the future. The example exposes cold starts and incomplete data instead of silently losing users in an inner join. The zero-MAD fallback and minimum excess are explicit policy parameters, not a universal improvement over z-scores. A seasonal or role-specific model may be more appropriate.

<!-- query-source:bulk-download:start -->
```kusto
// Complete UTC calendar days; Counts are audit events, not bytes or unique documents.
// EvaluationDay is supplied explicitly by the caller. Do not tune on the scored day.
let HistoryDays=28d;
let MinimumObservedDays=14;
let MinimumExcess=20.0;
let MadMultiplier=6.0;
let History = DailyDownloads
    | where Day >= EvaluationDay - HistoryDays and Day < EvaluationDay
    | where Complete and isnotnull(Count) and Count >= 0;
let Medians = History | summarize Median=percentile(Count, 50), ObservedDays=count() by TenantId, UserId;
let Baselines = History
    | join kind=inner Medians on TenantId, UserId
    | extend Deviation=abs(todouble(Count) - Median)
    | summarize MAD=percentile(Deviation, 50), Median=take_any(Median), ObservedDays=take_any(ObservedDays)
        by TenantId, UserId;
DailyDownloads
| where Day == EvaluationDay
| join kind=leftouter Baselines on TenantId, UserId
| extend ObservedDays=coalesce(ObservedDays, tolong(0))
| extend Threshold=Median + max_of(MinimumExcess, MadMultiplier * MAD)
| extend Status=case(
    not(Complete) or isnull(Count) or Count < 0, "missing-telemetry",
    ObservedDays < MinimumObservedDays, "insufficient-history",
    todouble(Count) > Threshold, "above-baseline",
    "within-baseline")
| project TenantId, UserId, Day, Count, ObservedDays, Median, MAD, Threshold, Status
| order by TenantId asc, UserId asc
```
<!-- query-source:bulk-download:end -->

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

**Measured functional result:** 34/34 synthetic KQL regression cases and 8/8 offline checks passed. This is test-suite completion, not a detection-accuracy percentage.

| Public lab recording | Input records | Query output rows | Interpretation |
|---|---:|---:|---|
| dcsync | 11 | 4 | Candidate observations, not individually labeled true positives. |
| lsass-access | 32 | 24 | Candidate observations, not individually labeled true positives. |
| kerberoasting | 1 | 0 | Low-volume case falls below the breadth threshold; known blind spot. |

Full outputs, input-record hashes, query hashes, engine identity and limits are in the <a href="https://1200km.com/articles/research/anomaly-validation/functional-results.json" target="_self">functional report</a>.

The public recordings are provided by Splunk's Attack Data repository under Apache-2.0, pinned in `datasets.json`. They are lab activity, not a representative mix of labeled enterprise events. Query output rows are not a true-positive denominator. A recording can contain legitimate background behavior. Zero matches may expose an analytic's scope limitation rather than an ingestion or execution failure. [Dataset repository](https://github.com/splunk/attack_data).

<ResearchFigure id="validation-levels" />

## 9. Implementation Guidance

### 9.1 Instrument Before Modelling

Start with a threat hypothesis and a collection test. Confirm event generation, forwarding, parsing, identity normalization, retention and clock behavior. Record the data that is absent as well as the data that arrives. A valid query over an empty or misparsed table is not detection coverage.

Treat event time and ingestion time separately. Define allowed lateness, query overlap and stable alert identifiers so retries do not create duplicate incidents. Preserve raw evidence and adapter versions. Host-role or identity enrichment can be wrong; its provenance belongs in the investigation output.

### 9.2 Prioritise by Baseline Stability

Choose a baseline only after examining the feature distribution. Counts can be sparse, seasonal and overdispersed. A Poisson model assumes a particular relationship between mean and variance; do not assume it fits authentication or API counts. A z-score can still be a feature, but a normal-tail probability is not justified merely by computing it.

Median and median absolute deviation (MAD) are candidates for robust location and scale, not universal replacements. A zero MAD is common with sparse counts. Define what happens then; do not divide by zero, discard the entity or pretend a small constant is scientifically calibrated. Consider empirical quantiles, appropriate count models, categorical novelty and seasonal residuals according to the feature and sample size.

Remove unsupported High/Medium/Low false-positive and fidelity ratings. Until measured, describe anticipated benign explanations and operational requirements. Deterministic rules still require validation: a process relationship, named pipe or snapshot deletion is not structurally equivalent to malicious intent.

### 9.3 Baseline by Role, Not by Estate

Specify the entity, comparison population, observation window and feature units. A user's uploads must not become the baseline for their downloads. A daily total should not be compared directly with a rolling 40-minute count. Different roles, shift patterns, automation and newly onboarded systems can require different treatment.

TF-IDF is feature weighting, not a clustering algorithm. If using it with clustering, document the representation, normalization, distance function and clustering method separately. Peer membership and model outputs can also expose sensitive personnel information; minimize access and avoid equating deviations with employee misconduct.

### 9.4 Accumulate Weak Signals via Entity Risk Scoring

Use entity and causal context, not mere temporal coincidence. Joining every tenant success to every failure burst invents relationships. Correlated sources may duplicate the same underlying event, so adding their scores is not independent corroboration. Calibrate score interpretation and avoid labeling an arbitrary risk score as a probability of maliciousness.

Separate **investigation priority**, **incident declaration** and **automatic containment**. One reliable, consequential observation may justify immediate investigation. Conversely, several weak or duplicated observations may not justify disruptive action. Record competing explanations and why the next action is proportionate.

### 9.5 Validate with Purple-Team Exercises

Use only authorized, isolated test identities and systems. This revision replays recorded logs; it does not launch password sprays, credential extraction or live exploitation. Exercise results should document what ran, what was collected, what matched, what did not, and whether the alert contained usable evidence.

Positive cases are necessary but insufficient. Include approved replication, alternate-credential administration, software deployment, backups, browser/DNS diversity, scheduled downloads, missing logs, duplicate events and parser changes. A successful lab exercise does not estimate a production false-positive rate.

<ResearchFigure id="operational-workflow" />

### 9.6 A reproducible statistical study

<ResearchFigure id="study-splits" />

For a real deployment study, predeclare the target population, prediction unit, labels, costs and evaluation period. Separate chronological training, validation and testing; keep future observations out of every feature and baseline. Where relevant, separate campaigns or entities to test generalization. Do not tune on the held-out test or retrospectively select only incidents the detector catches.

Report confusion counts, alert precision, incident recall, false alerts per observed entity-day, detection delay and investigation workload. Use precision-recall analysis alongside, rather than being reassured solely by, ROC curves in rare-event settings. Labels must distinguish benign, malicious and unresolved; an unlabeled event is not automatically a true negative. Uncertainty should respect clustered entities/incidents rather than treating every log line as independent.

This revision includes a **seeded synthetic sensitivity experiment** to expose baseline and gate trade-offs. Its numbers describe the generated world, not enterprise performance. The public-recording replay in Section 8 is a separate evidence class. Neither supplies a representative production negative corpus.

**Synthetic experiment, not enterprise performance:** 2688 entity-days across 48 generated entities. Training uses days 0–27, validation 28–41 and the frozen test 42–55. The test contains 26 labeled generated attack entity-days and 646 generated benign entity-days. Parameters are selected on validation, not the test; gated MAD reuses the ungated threshold to isolate the gate's effect.

| Model | TP | FP | FN | TN | Precision | Recall |
|---|---:|---:|---:|---:|---:|---:|
| global-z | 8 | 12 | 18 | 634 | 40.0% | 30.8% |
| entity-z | 14 | 45 | 12 | 601 | 23.7% | 53.8% |
| entity-mad | 18 | 85 | 8 | 561 | 17.5% | 69.2% |
| entity-mad-gated | 11 | 8 | 15 | 638 | 57.9% | 42.3% |

In this constructed example, robust scale is not a free improvement: role variation, sparse counts, scheduled work and legitimate test-period drift affect the results. Corroboration removes both benign alerts and generated attacks. The generator deliberately makes the corroborating signal more likely for attacks; its apparent usefulness is therefore an assumption of this toy world, not a discovery about real telemetry. Read the <a href="https://1200km.com/articles/research/anomaly-validation/synthetic-study.json" target="_self">study specification and results</a> and <a href="https://1200km.com/articles/research/anomaly-validation/synthetic-study.csv" target="_self">generated dataset</a>. Reproduce with `python3 research/anomaly-validation/statistical_study.py`.

LANL's public authentication data could support a larger, carefully scoped follow-up. Its anonymized DNS relationship data is not suitable for raw-label entropy evaluation, and its red-team labels do not exhaust all behavior. Dataset suitability must be checked per analytic. [LANL dataset specification](https://csr.lanl.gov/data/cyber1/).

<ResearchFigure id="study-results" />

### 9.7 Revision, reproducibility and remaining work

The machine-readable issue ledger distinguishes textual correction, functional execution, unresolved external evidence and production validation. It reconciles the earlier audit and external review rather than claiming their counts are independent. Download the <a href="https://1200km.com/articles/research/anomaly-fact-audit.md" target="_self">audit</a>, <a href="https://1200km.com/articles/research/anomaly-validation/bundle.json" target="_self">validation bundle</a> and <a href="https://1200km.com/articles/research/anomaly-incidents.json" target="_self">incident register</a>.

The canonical URL, case anchors and topic tags are retained. Tags indicate relevance, not factual certification. The original Medium edition is not automatically synchronized; publication access is required to update its text and correction notice. No claim of a live Medium correction follows from changing this repository.

### 9.8 Historical illustrations and corrected navigation

The current edition has **55 inline figures** beside the relevant explanations: 45 reviewed, user-supplied infographics and 10 generated diagrams. The supplied images provide four definition illustrations, cover Sections 2.1–2.16, replace the incident figures in Sections 4.1–4.12 and illustrate every detection-source subsection in Sections 5.1–5.9 and replace the credential-attack figures in Sections 6.1–6.4. Each figure includes an evidence label, nearby sources, a text equivalent and a full-size link. Definition and taxonomy examples are synthetic or conceptual; the register records checked scope counts, and incident graphics separate source reporting from proposed detection hypotheses. Detection-source guides distinguish documentation, exact synthetic arithmetic and planning advice from verified local collection. These are not private victim-telemetry reconstructions or product benchmarks. The calculated research-result figures still use the committed results. The downloadable <a href="https://1200km.com/articles/research/anomaly-visuals/manifest.json" target="_self">visual manifest</a> records placement, data and source hashes. Original PNG and JPEG files are unchanged, and previous SVG asset URLs remain available. This is an author-reviewed replacement set, not independent correctness certification.

The original media are retained below for historical continuity, **not as validated technical guidance**. Older diagrams can contain superseded taxonomy, field assumptions or claims. The corrected text, source-specific citations, telemetry contracts and test artifacts take precedence. This avoids leaving an old infographic to silently contradict a corrected paragraph. No image file or existing article URL was deleted.

<details>
<summary>Historical figures from the original edition — superseded, not implementation guidance</summary>

**Historical figure 1.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*1YpT-qIBgCt11NZ3slY3vw.png" alt="Cover image" width="2752" height="1536" loading="eager" fetchpriority="high" decoding="async" />

**Historical figure 2.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*gvZi-quN2EbEi1VH4x84dg.png" alt="Article image" width="1024" height="1536" loading="lazy" decoding="async" />

**Historical figure 3.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*0gsdLTrvWS3EmSAu5WoL0w.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 4.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*oARxu_lgKxAuI5EgXuuleQ.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 5.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*bWJ5BNtuFu_v_bw6FoMwTg.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 6.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*W-zn-qJkeLtk9sZ-6jmw5g.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 7.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*SXg5h8_qdQB4flYPkQHVWw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 8.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*Kj_pfrlqCnOviRu8wfTW8g.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 9.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*bYcMULfRE30SoE9bMYFlgQ.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 10.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*bE0culxVhjiWdTIK4ibzOw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 11.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*UgEMTfLrLmcJscxWKxJFTw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 12.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*5D_-BYWLKjb5JQ1sOucfUw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 13.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*d70XgpYA5npUiQDRYxIphg.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 14.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*ZsGfnUZGQSora4S3f-woFA.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 15.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*BikTV0gLj4MlEv7hg8Q_Ug.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 16.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*P1Hy0CJdFiXnI94Ph-lZvA.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 17.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*j-OXWbgJAG8QHjCjJzjjNw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 18.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*HSqc4Tgp2Djx-GZxe6Tb4A.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Historical figure 19.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*WsUqdnCVq_mdtkRKIAGZPw.png" alt="Article image" width="1907" height="613" loading="lazy" decoding="async" />

**Historical figure 20.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*lZJB9pgfW1e_5WdTZmsLVw.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 21.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*aimdYjy2yJ4aTvesiCSKOQ.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 22.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*xyHr2wkv1ZMZm3xCKXujLA.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 23.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*ra0nKuChB9pMu5ZY0N_B9w.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 24.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*dYKcIi0C8T52jhDJL13Qwg.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 25.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*QWW9hIVmF8ZUA4OH0Qt3zw.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 26.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*TF97AhQGLF4i0tdB1oN_4g.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 27.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*Wt6n1iG4OOGvKdIJwkmL0g.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 28.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*Zm2KZ8YA0K1MvIO2zCnkyQ.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 29.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*JIcigvanUn7CA1DA5dV9dQ.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 30.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*gyRgxUYLGcOgYZgUNi0NdA.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 31.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*R4gExN2nictTQZz-BXeu0w.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 32.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*aGqnYeF_Sm2daueK0A96Cg.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 33.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*RTX7AO7qc93wBio4CIOWqQ.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Historical figure 34.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*33nFt4BqdnfK6EKgvnBhwQ.png" alt="Article image" width="1024" height="1536" loading="lazy" decoding="async" />

**Historical figure 35.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*eJL6NhduQ6_DkUsxHEArQg.png" alt="Article image" width="2816" height="1536" loading="lazy" decoding="async" />

**Historical figure 36.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*RoB5bhSZ4IunaZM3DJKEFg.png" alt="Article image" width="2816" height="1536" loading="lazy" decoding="async" />

**Historical figure 37.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*iLzeuns7bfYSgavTllVs5w.png" alt="Article image" width="2816" height="1536" loading="lazy" decoding="async" />

**Historical figure 38.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*nFXxFcm5dNEeH4P1MC6xTA.png" alt="Article image" width="2816" height="1536" loading="lazy" decoding="async" />

**Historical figure 39.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*6gfxvyR8ILtJsC4hjnmFUQ.png" alt="Article image" width="2816" height="1536" loading="lazy" decoding="async" />

**Historical figure 40.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*aKEDQh--BV1kNrI0Bkea_Q.png" alt="Article image" width="2816" height="1536" loading="lazy" decoding="async" />

**Historical figure 41.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*2K62HrIf19EIC0IgXH6jXg.png" alt="Article image" width="2816" height="1536" loading="lazy" decoding="async" />

**Historical figure 42.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*IBfgmROIE6IFT-AjWjw7qQ.png" alt="Article image" width="2816" height="1536" loading="lazy" decoding="async" />

**Historical figure 43.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*hy6wXNOM0M-yGh9MTRKVRg.png" alt="Article image" width="2816" height="1536" loading="lazy" decoding="async" />

**Historical figure 44.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.

<img src="https://cdn-images-1.medium.com/max/800/1*NhNgD8Ajq_7Ama5VhR8e0Q.png" alt="Article image" width="1024" height="1536" loading="lazy" decoding="async" />

</details>

<span id="malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-based-detection"></span>
<span id="low-effort--deploy-first"></span>
<span id="medium-effort"></span>
<span id="high-effort--mature-infrastructure-required"></span>
<span id="step-by-step-breakdown"></span>
<span id="1-input-data"></span>
<span id="2-identify-the-failed-login-bursts-the-spray-window"></span>
<span id="3-find-subsequent-successful-sign-ins"></span>
<span id="4-output-results-candidate-accounts-to-investigate"></span>
<span id="step-1-filter-relevant-events"></span>
<span id="step-2-group-and-summarize-data"></span>
<span id="step-3-apply-the-threshold"></span>
<span id="step-4-output-results"></span>
<span id="step-1-filter-relevant-events-1"></span>
<span id="step-2-exclude-legitimate-domain-controllers"></span>
<span id="step-3-output-results-and-investigation"></span>
<span id="by-andrey-pautov--april-2026"></span>

## 10. Conclusion

Documented intrusions show that malicious activity can produce observable deviations. Some investigations, including Storm-0558 and 3CX, report detections that contributed to discovery. Other incident-to-anomaly mappings in this article are retrospective hypotheses, not demonstrations that a proposed rule would have caught the intrusion.

The useful question is not whether an action looks unusual in isolation. It is whether the available telemetry, comparison population and analytic produce evidence that improves an analyst's decision at an acceptable operational cost. A high anomaly score does not establish maliciousness, actor identity or permission to contain a system.

This revision separates source facts, proposed detection logic, functional tests, public lab-recording observations and a synthetic statistical experiment. It preserves negative results and known blind spots. None of those evidence classes alone establishes production precision, incident recall or universal thresholds.

The practical sequence is: **verify collection, define the feature, choose and test the baseline, preserve evidence, evaluate benign alternatives, and measure the decision outcome**. Correlation can improve an investigation, but it must not turn unrelated events into a story or conceal what the detector misses.

## 11. References

<!-- anomaly-evidence:sources:start -->
### Incident-source register (September 2026 expansion) {#incident-primary-sources}

- Mandiant. [UNC5537 Targets Snowflake Customer Instances for Data Theft and Extortion](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion). Published 2024-06-10; reviewed 2026-09-21.
- Cloudflare. [HTTP/2 Rapid Reset: deconstructing the record-breaking attack](https://blog.cloudflare.com/technical-breakdown-http2-rapid-reset-ddos-attack/). Published 2023-10-10; reviewed 2026-09-21.
- Microsoft. [Midnight Blizzard: Guidance for responders on nation-state attack](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/). Published 2024-01-25; reviewed 2026-09-21.
- Mandiant. [SUNBURST Additional Technical Details](https://cloud.google.com/blog/topics/threat-intelligence/sunburst-additional-technical-details/). Published 2020-12-24; reviewed 2026-09-21.
- ESET. [Industroyer2: Industroyer reloaded](https://www.welivesecurity.com/2022/04/12/industroyer2-industroyer-reloaded/). Published 2022-04-12; reviewed 2026-09-21.
- US Department of Justice. [Former Twitter Employee Found Guilty of Acting as an Agent of a Foreign Government and Unlawfully Sharing Twitter User Information](https://www.justice.gov/archives/opa/pr/former-twitter-employee-found-guilty-acting-agent-foreign-government-and-unlawfully-sharing). Published 2022-08-10; reviewed 2026-09-21.
- US Department of Justice. [Superseding indictment, United States v. Abouammo et al., filed July 28, 2020](https://www.justice.gov/usao-ndca/page/file/1299331/dl?inline=). Published 2020-07-28; reviewed 2026-09-21.
- Microsoft. [Threat actors misuse OAuth applications to automate financially driven attacks](https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/). Published 2023-12-12; reviewed 2026-09-21.
- Mandiant. [UNC3944 Targets SaaS Applications](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/). Published 2024-06-13; reviewed 2026-09-21.
- The DFIR Report. [BazarCall to Conti Ransomware via Trickbot and Cobalt Strike](https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/). Published 2021-08-01; reviewed 2026-09-21.
- Microsoft. [Microsoft mitigates China-based threat actor Storm-0558 targeting of customer email](https://www.microsoft.com/en-us/msrc/blog/2023/07/microsoft-mitigates-china-based-threat-actor-storm-0558-targeting-of-customer-email). Published 2023-07-11; reviewed 2026-09-21.
- Mandiant. [MESSAGETAP: Who's Reading Your Text Messages?](https://cloud.google.com/blog/topics/threat-intelligence/messagetap-who-is-reading-your-text-messages/). Published 2019-10-31; reviewed 2026-09-21.
- Microsoft. [Analyzing attacks taking advantage of the Exchange Server vulnerabilities](https://www.microsoft.com/en-us/security/blog/2021/03/25/analyzing-attacks-taking-advantage-of-the-exchange-server-vulnerabilities/). Published 2021-03-25; reviewed 2026-09-21.
- Palo Alto Networks Unit 42. [OilRig Targets Middle Eastern Telecommunications Organization and Adds Novel C2 Channel with Steganography to Its Inventory](https://unit42.paloaltonetworks.com/oilrig-novel-c2-channel-steganography/). Published 2020-07-22; reviewed 2026-09-21.
- Sysdig. [How to Detect SCARLETEEL with Sysdig Secure](https://www.sysdig.com/blog/detect-scarleteel-sysdig-secure). Published 2023-03-29; reviewed 2026-09-21.
- Sophos. [AuKill EDR killer malware abuses Process Explorer driver](https://www.sophos.com/en-us/blog/aukill-edr-killer-malware-abuses-process-explorer-driver). Published 2023-04-19; reviewed 2026-09-21.
- Mandiant. [Zero-Day Vulnerability in MOVEit Transfer Exploited for Data Theft](https://cloud.google.com/blog/topics/threat-intelligence/zero-day-moveit-data-theft). Published 2023-06-02; reviewed 2026-09-21.
<!-- anomaly-evidence:sources:end -->

### Statistical and implementation references

- NIST. [Guide to Intrusion Detection and Prevention Systems, SP 800–94](https://csrc.nist.gov/pubs/sp/800/94/final), 2007.
- Chandola, Banerjee and Kumar. [Anomaly Detection: A Survey](https://dl.acm.org/doi/10.1145/1541880.1541882), 2009; [author technical-report version hosted by the University of Minnesota](https://conservancy.umn.edu/server/api/core/bitstreams/108030d3-3bf3-4c58-bd60-77d0644f8359/content). The publisher endpoint restricted automated access during this revision; the university copy was accessible.
- MITRE. [ATT&CK version history](https://attack.mitre.org/resources/versions/) and [April 2026 changes](https://attack.mitre.org/resources/updates/updates-april-2026/). Mapping edition: Enterprise v19.2.
- Microsoft. [Sysmon reference](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon), [Security event 4662](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4662), [Kusto time-window joins](https://learn.microsoft.com/en-us/kusto/query/join-time-window), and [Kusto emulator limitations](https://learn.microsoft.com/en-us/azure/data-explorer/kusto-emulator-overview).
- Splunk. [Attack Data repository](https://github.com/splunk/attack_data/tree/6bc794b7f65562148c872fde1e7412ab3c173f4c). Exact recording paths, SHA-256 hashes and license are in the downloadable dataset manifest.
- LANL. [Comprehensive, Multi-Source Cyber-Security Events](https://csr.lanl.gov/data/cyber1/). Proposed follow-up source; not used to generate this revision's results.

### Additional incident and correction references

- CSRB. [Review of the Summer 2023 Microsoft Exchange Online Intrusion](https://www.cisa.gov/sites/default/files/2024-03/CSRB%20Review%20of%20the%20Summer%202023%20MEO%20Intrusion%20Final_508c.pdf), 2024.
- Microsoft. [Volt Typhoon investigation](https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/), May 2023.
- Mandiant. [APT41 Has Arisen From the DUST](https://cloud.google.com/blog/topics/threat-intelligence/apt41-arisen-from-dust), July 2024.
- SentinelOne. [SmoothOperator / 3CX investigation](https://www.sentinelone.com/blog/smoothoperator-ongoing-campaign-trojanizes-3cx-software-in-software-supply-chain-attack/), March 2023.
- AWS. [GuardDuty IAM findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-iam.html) and [RDS IAM authentication limitations](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html). The token-generation observability discrepancy remains unresolved.

### Companion research

- <a href="https://1200km.com/anomaly-detection-atlas/" target="_self">Anomaly Detection Atlas — statistical definitions and detection design</a>.
- <a href="https://1200km.com/threat-matrix/" target="_self">Threat Matrix — behavior-oriented ATT&CK exploration</a>.
- <a href="https://1200km.com/adversarygraph/" target="_self">AdversaryGraph — evidence and investigation workflows</a>. Enrichment and correlation support investigation; they do not validate attribution automatically.

<span id="follow-for-practical-cybersecurity-research"></span>

## Follow My Work

I publish practical cybersecurity research, CTI workflows, detection engineering notes, malware-analysis projects, AI-security research, open-source tools, labs, and technical guides.

- <a href="https://1200km.com/" target="_self">Website — 1200km.com</a>
- [Medium — @1200km](https://medium.com/@1200km)
- [LinkedIn — Andrey Pautov](https://www.linkedin.com/in/andrey-pautov/)
- [GitHub — tools and labs](https://github.com/anpa1200)
- [Contact — 1200km@gmail.com](mailto:1200km@gmail.com)
