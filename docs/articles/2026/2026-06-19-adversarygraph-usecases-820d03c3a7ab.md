---
title: "AdversaryGraph Usecases"
description: ""
image: "https://cdn-images-1.medium.com/max/700/0*uEhtrOMXUiTRj9_e.png"
---

# AdversaryGraph Usecases


![Cover image](https://cdn-images-1.medium.com/max/700/0*uEhtrOMXUiTRj9_e.png)

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/adversarygraph-usecases-820d03c3a7ab](https://medium.com/@1200km/adversarygraph-usecases-820d03c3a7ab)
- **Published:** 2026-06-19
- **Preserved media:** 21 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 0 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium RSS article into the 1200km.com Docusaurus ecosystem. The article flow, images, screenshots, infographics, and technical blocks are preserved from the Medium feed.

### 30 Practical AdversaryGraph Use Cases

![Article image](https://cdn-images-1.medium.com/max/700/0*uEhtrOMXUiTRj9_e.png)

[AdversaryGraph v2.5: New Name, New Release, Full AI CTI Platform Capability Map](https://medium.com/@1200km/adversarygraph-v2-5-new-name-new-release-full-ai-cti-platform-capability-map-93cd9224127e)

AdversaryGraph is a self-hosted AI CTI and detection engineering platform for analysts who need to move from raw intelligence to reviewed action. It connects report analysis, log and PCAP triage, IOC enrichment, actor context, MITRE ATT&CK mapping, feed synchronization, matrix visualization, detection generation, and exportable evidence in one workflow.

The main idea is simple: an analyst should be able to take a report, IOC, log excerpt, PCAP, actor name, sector requirement, or detection gap and turn it into something operational. That output can be a reviewed ATT&CK layer, an IOC enrichment record, an actor comparison, a customer-ready investigation report, a coverage backlog, or a draft Sigma/YARA/YARA-L detection.

Relevant links:

- GitHub repository:[https://github.com/anpa1200/adversarygraph](https://github.com/anpa1200/adversarygraph)
- Official documentation:[https://1200km.com/adversarygraph-docs/](https://1200km.com/adversarygraph-docs/)
- Getting started guide:[https://1200km.com/adversarygraph-docs/get-started.html](https://1200km.com/adversarygraph-docs/get-started.html)
- Capabilities overview:[https://1200km.com/adversarygraph-docs/capabilities.html](https://1200km.com/adversarygraph-docs/capabilities.html)
- Public project page:[https://1200km.com/adversarygraph/](https://1200km.com/adversarygraph/)
- 1200km research ecosystem:[https://1200km.com/](https://1200km.com/)

This article is not a generic feature list. It is a practical use-case map for the platform. Each use case starts from a real analyst situation, shows where to begin in AdversaryGraph, and defines the expected output. You can read it from top to bottom, but it is more useful as a workflow menu:

- SOC analysts can start with IOC lookup, log/PCAP triage, enrichment, and actor comparison.
- CTI analysts can start with report-to-ATT&CK mapping, actor profiles, sector intelligence, and campaign comparison.
- Detection engineers can start with Navigator layers, coverage gaps, rule feeds, and AI-assisted detection generation.
- Consultants and customer-facing analysts can start with investigation reports, executive coverage summaries, and evidence-backed exports.
- Platform operators can start with selftest, feed management, TAXII/STIX, MISP, custom feeds, and troubleshooting.

This article collects 30 practical ways to use the platform. The first 10 are simple daily actions, the next 10 are structured analyst workflows, and the final 10 are full investigation and defense workflows.

The value of these use cases is that they show how the platform pieces connect. AdversaryGraph is strongest when it is used as a workflow system, not as isolated pages. For example, an IOC lookup can become a VirusTotal enrichment, which can become mapped TTPs, which can become a Navigator comparison layer, which can become a detection backlog and a report. A vendor article can become accepted or rejected TTP evidence, actor similarity hypotheses, enriched IOCs, and a customer-ready PDF. A sector question can become a prioritized actor/TTP list for a specific customer environment.

Use this article as a checklist when demonstrating, testing, documenting, or improving the platform. If a workflow is important to your team, it should be possible to trace it through one of these use cases from input to reviewed output.

## Table Of Contents

- **Usecase number “1” — Check One IOC**
- **Usecase number “2” — Open One Actor Profile**
- **Usecase number “3” — Show Actor TTPs On The Matrix**
- **Usecase number “4” — Search The IOC Library**
- **Usecase number “5” — Sync ThreatFox IOCs**
- **Usecase number “6” — Import A Navigator Layer**
- **U**[**secase number “7” — Export A PDF Report**](http://a39d)
- **Usecase number “8” — Run Deployment Selftest**
- **Usecase number “9” — Add A Custom IOC Feed**
- **Usecase number “10” — Open Troubleshooting For An Error**
- **Usecase number “11” — Map A Report To ATT&CK**
- **Usecase number “12” — Compare Incident TTPs To Actors**
- **Usecase number “13” — Build A Sector Threat Brief**
- **Usecase number “14” — Enrich Actor IOCs**
- **Usecase number “15” — Import MISP JSON**
- **Usecase number “16” — Pull TAXII Or Import STIX**
- **Usecase number “17” — Sync YARA, YARA-L, And Sigma Feeds**
- **Usecase number “18” — Compare Two Reports**
- **Usecase number “19” — Review One Coverage Gap**
- **Usecase number “20” — Use A Local LLM For Private Reports**
- **Usecase number “21” — Investigation: Ransomware Intrusion Triage**
- **Usecase number “22” — Investigation: Cloud And Kubernetes Incident**
- **Usecase number “23” — Investigation: Cluster Multiple APT Reports**
- **Usecase number “24” — Investigation: Malware Family Behavior Mapping**
- **Usecase number “25” — Investigation: Validate A Third-Party CTI Report**
- **Usecase number “26” — Defense: Build MITRE Coverage Baseline**
- **Usecase number “27” — Defense: Create Sector-Based Detection Roadmap**
- **Usecase number “28” — Defense: Build IOC Enrichment Pipeline**
- **Usecase number “29” — Defense: Create Detection Content From CTI**
- **Usecase number “30” — Defense: Executive Risk And Coverage Report**
- **Common Review Standard**

## Simple Use Cases

## Usecase number “1” — Check One IOC

![Article image](https://cdn-images-1.medium.com/max/1024/0*bMw9Xpzgy6mw_Z1J.gif)

**Scenario:**SOC triage receives a single IP, domain, URL, or hash from an EDR alert, firewall log, phishing ticket, or customer report.

**Flow:**Open IOC Library or VirusTotal Lookup, paste the indicator, and open Enrichment. Review reputation, source labels, timestamps, malware family, actor hints, and mapped TTPs.

**Output:**A short IOC decision record that supports escalation, hunting, blocking, or closure.

## Usecase number “2” — Open One Actor Profile

![Article image](https://cdn-images-1.medium.com/max/1024/0*M2AXVIy5z5pXA5Mr.gif)

**Scenario:**A customer asks whether a named actor in a report is relevant to their environment or sector.

**Flow:**Open ATT&CK Group Library, search by actor name, ATT&CK ID, or alias, then review aliases, description, last activity, sectors, TTPs, reports, and IOC availability.

**Output:**A reviewed actor context note with aliases, known techniques, evidence links, and relevance comments.

## Usecase number “3” — Show Actor TTPs On The Matrix

![Article image](https://cdn-images-1.medium.com/proxy/0*M2AXVIy5z5pXA5Mr.gif)

**Scenario:**A detection engineer needs a quick visual view of one actor behavior before planning coverage work.

**Flow:**Open the actor profile and click Show on matrix or Overlay on Navigator.

**Output:**An ATT&CK matrix view showing the actor technique set for fast coverage review.

## Usecase number “4” — Search The IOC Library

![Article image](https://cdn-images-1.medium.com/max/1024/0*Y8r9ttvPW80-gNZP.gif)

**Scenario:**A SOC analyst wants to know whether an indicator has already appeared in local or synchronized intelligence.

**Flow:**Open IOC Library and search by indicator value, malware family, campaign, source, type, or actor.

**Output:**A filtered IOC result with source, first seen, last seen, type, mapped actor, mapped TTPs, and enrichment entry point.

## Usecase number “5” — Sync ThreatFox IOCs

![Article image](https://cdn-images-1.medium.com/max/1024/1*iX6YZVoEnGlsZ6xSm7Aoyg.png)

**Scenario:**The local IOC library needs current malware infrastructure before the team starts daily triage.

**Flow:**Open Feeds Management, run ThreatFox sync, and review imported or updated IOC counts.

**Output:**Updated IOC records with source attribution, malware context, timestamps, and actor links where available.

## Usecase number “6” — Import A Navigator Layer

![Article image](https://cdn-images-1.medium.com/max/1024/0*9l3J9KkiI5R7CVH5.gif)

**Scenario:**A team already has an ATT&CK Navigator layer from a previous assessment or another tool.

**Flow:**Open Navigator, import the layer, and compare it against current actor, sector, or report-derived TTPs.

**Output:**Imported ATT&CK coverage that can be reused inside the AdversaryGraph workflow.

## Usecase number “7” — Export A PDF Report

![Article image](https://cdn-images-1.medium.com/max/1024/0*t5z2k2fJe8dpx075.gif)

**Scenario:**A customer or manager needs a clean summary of reviewed investigation output.

**Flow:**Open the investigation or report view and export reviewed findings as PDF.

**Output:**A shareable PDF containing reviewed TTPs, IOCs, actor context, evidence, and analyst notes.

## Usecase number “8” — Run Deployment Selftest

![Article image](https://cdn-images-1.medium.com/max/1024/0*qoQEuRzMpNI74a6A.gif)

**Scenario:**A new Docker deployment starts, but the analyst needs to know whether API keys, database, and sync services are ready.

**Flow:**Open the selftest popup or Troubleshooting page, click SelfTest button in navigator, click Recheck, and review failed checks if any.

**Output:**A clear system status message showing whether API, DB, keys, sync, and frontend connectivity are healthy.

## Usecase number “9” — Add A Custom IOC Feed

![Article image](https://cdn-images-1.medium.com/max/1024/0*gVbCIjrpWlwONXng.gif)

**Scenario:**A private customer or internal team publishes a JSON, CSV, or TXT feed that must stay inside the local environment.

**Flow:**Open Feeds Management, add the feed label, URL, format, and sync it.

**Output:**A reusable custom feed source with imported indicators linked to the local IOC Library.

## Usecase number “10” — Open Troubleshooting For An Error

![Article image](https://cdn-images-1.medium.com/max/1024/1*j1X3LDwfvekJshnSS02qow.png)

**Scenario:**An analyst sees an API error, missing key warning, failed sync, or failed enrichment request.

**Flow:**Click Open troubleshooting from the error popup, follow the matching checklist, and run Recheck.

**Output:**A clear remediation path and a green All correct message after the issue is fixed.

## Intermediate Use Cases

## Usecase number “11” — Map A Report To ATT&CK

![Article image](https://cdn-images-1.medium.com/max/1024/0*fSu2bLtUH2lDf2vC.gif)

**Scenario:**A CTI analyst receives a vendor report or incident write-up and needs to convert narrative text into ATT&CK evidence.

**Flow:**Open AI Analysis or Investigation Report, paste or upload the report, run analysis with the configured LLM provider, then review extracted TTPs as accepted, rejected, suggested, or needs-evidence.

**Output:**A reviewed ATT&CK mapping with evidence snippets and analyst status for each technique.

## Usecase number “12” — Compare Incident TTPs To Actors

![Article image](https://cdn-images-1.medium.com/max/1024/0*DQclpOhQqVzBOD69.gif)

**Scenario:**An incident shows a known set of behaviors, but attribution is not clear.

**Flow:**Load accepted incident TTPs, open Compare or Group vs Group, review overlapping actors and missing behaviors, then document hypotheses with confidence notes.

**Output:**A ranked actor similarity view with evidence-based hypotheses and caveats.

## Usecase number “13” — Build A Sector Threat Brief

![Article image](https://cdn-images-1.medium.com/max/1024/0*r54OzR8J_DXVZzGO.gif)

**Scenario:**A telecom, cloud, finance, healthcare, or industrial customer asks which actors are most relevant now.

**Flow:**Open Sector Intel, choose one or more sectors, regions, and technologies, set the activity window, then open top actors and export key TTPs.

**Output:**A sector-specific threat brief with relevant actors, recent activity, and priority TTPs.

## Usecase number “14” — Enrich Actor IOCs

![Article image](https://cdn-images-1.medium.com/max/1024/0*DDIG2htQYpZN4T1K.gif)

**Scenario:**An actor profile has only partial IOC coverage and the analyst needs current infrastructure context.

**Flow:**Open the actor IOC tab, sync ThreatFox, OTX, MalwareBazaar, Malpedia, or custom feeds, then open IOC Enrichment for high-value values.

**Output:**An enriched actor IOC view with source labels, malware family context, TTP hints, and review state.

## Usecase number “15” — Import MISP JSON

![Article image](https://cdn-images-1.medium.com/max/1024/0*lFOK6J8EBpfTXkEQ.gif)

**Scenario:**A partner shares a MISP event or attribute export that needs to be used inside the local investigation workflow.

**Flow:**Open Feeds Management or IOC Library, paste the MISP JSON export URL or local gateway URL, import, and filter values by source and actor.

**Output:**MISP-backed indicators stored in the IOC Library with source and context preserved.

## Usecase number “16” — Pull TAXII Or Import STIX

![Article image](https://cdn-images-1.medium.com/max/1024/1*El0DnDFymDfSll5e4pU0IA.png)

**Scenario:**A team receives STIX/TAXII intelligence from a sharing community or internal platform.

**Flow:**Open Feeds Management, add TAXII collection URL, token, or basic auth, pull STIX objects, and review imported indicators.

**Output:**A synchronized TAXII/STIX feed represented in the IOC Library and CTI workflow.

## Usecase number “17” — Sync YARA, YARA-L, And Sigma Feeds

![Article image](https://cdn-images-1.medium.com/max/1024/1*-zEIeRs01h_8X0bjBkBzIw.png)

**Scenario:**Detection engineers need current public and private rule sources available while building detections.

**Flow:**Open Feeds Management, connect Sigma, YARA, YARA-L, and custom rule sources, run rule sync, then use Pipeline detection generation.

**Output:**Rule feeds available as references for detection review and AI-assisted generation.

## Usecase number “18” — Compare Two Reports

![Article image](https://cdn-images-1.medium.com/max/1024/0*a0kHtiaVAmoHN18x.gif)

**Scenario:**Two reports may describe related campaigns but use different names, IOCs, and writing styles.

**Flow:**Analyze both reports, accept or reject extracted TTPs, open Compare, and review shared and unique techniques, IOCs, and actor hints.

**Output:**A comparison record showing overlap, divergence, and next investigation pivots.

## Usecase number “19” — Review One Coverage Gap

![Article image](https://cdn-images-1.medium.com/max/1024/1*m79gvMFKAoqSY6LZAzcgRg.png)

**Scenario:**A SOC manager asks whether a specific ATT&CK technique is covered by current detections.

**Flow:**Open Navigator or coverage view, select the technique, review actor/report usage evidence, then generate or draft detection logic.

**Output:**A coverage-gap note with evidence, affected actors, rule draft, and review status.

## Usecase number “20” — Use A Local LLM For Private Reports

![Article image](https://cdn-images-1.medium.com/max/1024/1*V0Z-imYAMXuUr4WQEhkEsg.png)

**Scenario:**A sensitive incident report cannot be sent to external AI providers.

**Flow:**Configure the local LLM provider, open AI Analysis, select local provider and model, then analyze the report and review extracted TTPs.

**Output:**Private report analysis output generated through the local LLM path.

## Complex Investigation Use Cases

## Usecase number “21” — Investigation: Ransomware Intrusion Triage

**Scenario:**A company discovers encrypted servers, PowerShell activity, lateral movement, suspicious domains, and possible data theft.

**Flow:**Run selftest, create an investigation workspace, upload the incident report, extract TTPs and IOCs, enrich IOCs with VT, OTX, ThreatFox, MalwareBazaar, sandbox, and custom feeds, compare accepted TTPs against actors, show them on Navigator, generate rule drafts, and export a PDF report.

**Output:**A full ransomware triage package with evidence-backed TTPs, enriched IOCs, actor hypotheses, matrix layer, and detection backlog.

## Usecase number “22” — Investigation: Cloud And Kubernetes Incident

**Scenario:**A cloud customer reports suspicious service account activity, container execution, and unusual outbound connections.

**Flow:**Collect cloud logs and Kubernetes audit snippets, analyze the report text, filter Sector Intel by cloud and Kubernetes technology, map extracted TTPs, enrich domains and IPs, compare against cloud-focused actor profiles, and generate KQL or Sigma drafts.

**Output:**A cloud incident workup with TTP mapping, IOC enrichment, actor relevance, and cloud-focused detection backlog.

## Usecase number “23” — Investigation: Cluster Multiple APT Reports

**Scenario:**Several vendor reports mention similar actors, aliases, malware, and infrastructure but use inconsistent names.

**Flow:**Import reports, extract TTPs and IOCs, normalize actor aliases, compare reports by campaign, review shared techniques, open related actor pages, and export matrix and evidence tables.

**Output:**A campaign-clustering package that separates strong evidence from weak similarity.

## Usecase number “24” — Investigation: Malware Family Behavior Mapping

**Scenario:**A malware family appears in multiple feeds and reports, but defenders need behavior rather than only hashes.

**Flow:**Search IOC Library by malware family, open enrichment for representative indicators, pull sandbox behavior, map behavior tags and report evidence to TTPs, then generate YARA, YARA-L, or Sigma drafts.

**Output:**A malware behavior profile with source-backed TTPs, enriched IOCs, and detection drafts.

## Usecase number “25” — Investigation: Validate A Third-Party CTI Report

**Scenario:**A customer sends an external CTI report and asks whether it is actionable for their sector.

**Flow:**Upload the report, extract TTPs and IOCs, enrich all indicators, compare with actor profiles and sector filters, reject unsupported mappings, mark uncertain mappings as needs-evidence, and create a validation summary.

**Output:**A validated CTI report summary with accepted findings, rejected claims, evidence gaps, and recommended actions.

## Complex Defense Use Cases

## Usecase number “26” — Defense: Build MITRE Coverage Baseline

**Scenario:**A detection team needs to know which ATT&CK techniques are covered before planning new engineering work.

**Flow:**Sync ATT&CK Enterprise, Mobile, ICS, and ATLAS where relevant, import current coverage layer, select relevant sectors and actors, overlay actor TTPs, identify uncovered techniques, and generate backlog.

**Output:**A baseline coverage map with prioritized missing techniques and supporting actor evidence.

## Usecase number “27” — Defense: Create Sector-Based Detection Roadmap

**Scenario:**A customer needs a practical roadmap for their sector and technology environment, not a generic ATT&CK checklist.

**Flow:**Open Sector Intel, select sectors, regions, technologies, and activity window, review ranked actors, show relevant TTPs on matrix, group gaps by telemetry source and detection format, and generate roadmap phases.

**Output:**A customer-specific detection roadmap tied to actors, sector evidence, and ATT&CK coverage.

## Usecase number “28” — Defense: Build IOC Enrichment Pipeline

**Scenario:**A SOC wants daily enrichment of IOCs from public, partner, and private sources.

**Flow:**Configure external database storage, connect ThreatFox, OTX, MalwareBazaar, Malpedia, MISP, TAXII/STIX, sandbox, and custom feeds, run sync, enrich new indicators by source priority, map IOCs to actors and TTPs, and export CSV or STIX when needed.

**Output:**A repeatable IOC enrichment pipeline with source attribution, mapped TTPs, actors, and update history.

## Usecase number “29” — Defense: Create Detection Content From CTI

**Scenario:**The detection team has CTI reports but needs usable rules for SIEM and malware tooling.

**Flow:**Analyze the source report, accept supported TTPs, open Pipeline detection generation, choose Sigma, YARA, YARA-L, KQL, SPL, or EQL, select AI provider or local model, generate rule draft, validate syntax, and attach analyst notes.

**Output:**Detection-rule handoff artifacts with CTI evidence, review status, and generated rule formats.

## Usecase number “30” — Defense: Executive Risk And Coverage Report

**Scenario:**Leadership asks which threats matter to the business and where defensive investment should go next.

**Flow:**Select sector, region, and technology filters, review ranked actors and activity windows, overlay relevant TTPs, summarize current coverage and gaps, group recommendations by business impact, and export a PDF report.

**Output:**An executive report that connects current threat relevance to measurable defensive coverage and priorities.

## Common Review Standard

- Preserve source labels and timestamps for every finding.
- Mark weak or incomplete evidence as needs-evidence instead of forcing a conclusion.
- Treat actor similarity as a hypothesis, not attribution.
- Prefer source-backed report evidence first, enrichment-platform evidence second, and AI enrichment only as reviewed support.
- Export only findings that have been reviewed by an analyst.

## Public Links

- Project:[https://github.com/anpa1200/adversarygraph](https://github.com/anpa1200/adversarygraph)
- Documentation:[https://1200km.com/adversarygraph-docs/](https://1200km.com/adversarygraph-docs/)
- Public use-case page:[https://1200km.com/adversarygraph/use-cases.html](https://1200km.com/adversarygraph/use-cases.html)
