---
title: "Customer-Driven AI CTI Project"
description: "Full Workflow Quick Reference"
image: "https://cdn-images-1.medium.com/max/800/1*VQGM4kDVKCqhTDkmQRZkqA.png"
---

# Customer-Driven AI CTI Project


<img src="https://cdn-images-1.medium.com/max/800/1*VQGM4kDVKCqhTDkmQRZkqA.png" alt="Cover image" width="2528" height="1696" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/customer-driven-ai-cti-project-c0db3cdc1830](https://medium.com/@1200km/customer-driven-ai-cti-project-c0db3cdc1830)
- **Published:** 2026-05-13
- **Preserved media:** 17 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 0 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### Full Workflow Quick Reference

Most cyber threat intelligence programs fail at the same point: they produce reports nobody uses. The analyst delivers a threat summary; the SOC ignores it; the CISO asks why the budget exists. The gap is not effort — it is structure. Intelligence that cannot be traced from a customer decision all the way to a fired detection rule, a tuned alert, and a measurable outcome is not intelligence. It is research.

This project template exists to close that gap. It is a 15-phase, gate-controlled methodology for delivering CTI that ends in production detections, executive metrics, and a customer who can articulate exactly what changed in their security posture. AI accelerates every phase — source extraction, hypothesis generation, detection drafting, report writing — but the methodology enforces analytic discipline that no AI can shortcut: source rating, evidence labeling, confidence calibration, quality gate sign-off, and chain integrity from the first PIR to the last deliverable.

The project is published across three foundational articles and this workflow reference.

## The Four Articles

[**Part 1: Foundations**](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)establishes the analytic standards the entire methodology depends on. Read it before anything else. It defines the[Claim-to-Action Chain](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)— the backbone that connects every source claim to a customer decision — and the vocabulary every phase uses:[PIR and SIR format](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md),[Source Reliability using the Admiralty Code](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md),[Evidence Labels](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md),[Detection Readiness Levels](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md),[Threat Scenario Priority Scoring](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md),[Confidence Language](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md),[ATT&CK and D3FEND Mapping Quality](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md), and the[AI Governance Model](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)that controls what AI can and cannot do at each phase.

[**Customer-Driven AI CTI Project Template. Part 1: Foundations**
[From pure CTI to hands-on detection engineering with strict validation gates](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

[**Part 2A: Phase-by-Phase Execution Guide**](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)is the operational core. It walks all 15 phases in sequence — from Phase 0 (project charter and metric floors) through Phase 14 (continuous improvement loop) — with activities, register templates, allowed and prohibited AI actions, validation tests, exit criteria, and chain integrity requirements for each phase. If you are running a live project, Part 2A is your primary reference.

[**Customer-Driven AI CTI Project Template. Part 2A: Phase-by-Phase Execution Guide**
[From pure CTI to hands-on detection engineering with strict validation gates.](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

[**Part 2B: Reference Toolkit**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)contains everything you pick up and use: ten[AI Workflows](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)with ready-to-run prompts, eleven[Task Cards](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)for structured human review, six[Quality Gates](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)with non-waivable and waivable blockers, all master register schemas, a complete[worked example](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)tracing one threat through the full chain, the[30/60/90-Day Execution Plan](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md), and the[Minimum Viable Customer Delivery](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)checklist for time-constrained engagements.

[**Customer-Driven AI CTI Project Template:Part 2B: Reference Toolkit**
[From pure CTI to hands-on detection engineering with strict validation gates](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

**This article**is the quick-reference layer. It lists every phase as a numbered action checklist — no explanations, no background, just what to do and where to go. Every action links directly to the relevant section in Part 1, Part 2A, or Part 2B. Use it as your daily driver once you have read the foundational articles.

### Read First (Once)

[Claim-to-Action Chain](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)·[PIR and SIR Definitions](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)·[Source Reliability and Admiralty Code](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)·[Evidence Labels](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)·[Detection Readiness Levels](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)·[Threat Scenario Priority Scoring](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)·[Confidence Language](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)·[ATT&CK and D3FEND Mapping Quality](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)·[AI Governance Model](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

See also:[Minimum Viable Customer Delivery](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)·[30/60/90-Day Execution Plan](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

## Table of content

- **Phase 0: Project Charter and Guardrails**

- **Phase 1: Customer Decision and PIR Definition**

- **Phase 2: Crown-Jewel and Business-Impact Mapping**

- **Phase 3: Telemetry and Data Readiness Assessment**

- **Phase 4: External CTI Source Intake and Validation**

- **Phase 5: Threat Scenario Development**

- **Phase 6: Hypothesis-Driven Threat Hunting Backlog**

- **Phase 7: Detection Engineering Design**

- **Phase 8: Detection-as-Code Implementation**

- **Phase 9: Test Data, Simulation, and Replay**

- **Phase 10: SOC Triage and Incident Workflow**

- **Phase 11: Pilot Deployment and Tuning**

- **Phase 12: Production Deployment**

- **Phase 13: Executive and Technical Reporting**

- **Phase 14: Continuous Improvement and Maturity Loop**

- **Quality Gates**

- **Master Registers**

- **AI Workflows**

- **Task Cards**

<img src="https://cdn-images-1.medium.com/max/800/1*Qtk3g5J-PnrCq1LD4pIHpw.png" alt="Article image" width="1055" height="1491" loading="lazy" decoding="async" />

## Phase 0: Project Charter and Guardrails

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Set success metric floors per[Phase 0](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md): coverage = named scenario + minimum DRL; telemetry = named gap; hunts = count + required classification; decisions = named Decision ID + required register status

- Define TLP 2.0 handling policy and data-sharing constraints

- List AI tools in use; require Task Card ID + AI Session ID on every AI-assisted output per[Evidence Labels](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

- Document chosen Admiralty Code convention (FIRST: F = cannot be judged; or EOS: F = proven false) per[Source Reliability](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

- Get customer sponsor sign-off on charter

<img src="https://cdn-images-1.medium.com/max/800/1*fGY1_YnMjTr_qplOhPsX2g.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 1: Customer Decision and PIR Definition

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Conduct customer kickoff; extract the business decisions the PIRs must support per[PIR and SIR Definitions](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

- Draft PIRs in strong format: decision-linked, time-bounded, named customer owner

- Decompose each PIR into SIRs: answerable, bounded, named data source, evidence type, confidence threshold, owner, due date, closure condition

- Run[AI Workflow 1: Source Extraction](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)on highest-priority sources

- Complete[Task Card 1: Source Claim Extraction](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Challenge PIR quality with[Task Card 2: PIR Quality Challenge](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Submit evidence pack and pass[**Gate A: PIR Approval**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

<img src="https://cdn-images-1.medium.com/max/800/1*e_mCstkhVEjhjNZ7EmXzbg.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 2: Crown-Jewel and Business-Impact Mapping

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- List candidate crown jewels; assign business owner and technical owner to each

- [Map regulatory](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)and contractual exposure per asset (GDPR, PCI, sector-specific)

- [Score](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)business impact: financial, operational, reputational

- Run[AI Workflow 2: Customer Relevance Mapping](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Complete[Task Card 3: Crown-Jewel Dependency Review](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Get customer owner approval on final crown-jewel list (no self-classification)

<img src="https://cdn-images-1.medium.com/max/800/1*akD_ZC6k1lcWCz8sXNLE0g.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 3: Telemetry and Data Readiness Assessment

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Inventory all telemetry sources against each crown-jewel system

- Assign[Detection Readiness Level (DRL-0 to DRL-9)](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)per observable type

- Document collection gaps, retention windows, and normalization state

- Run[AI Workflow 2: Customer Relevance Mapping](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)(telemetry coverage angle)

- Complete[Task Card 4: Telemetry Feasibility Review](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Flag any SIR that has no telemetry source at DRL ≥ 2 as a blocker before Phase 5

<img src="https://cdn-images-1.medium.com/max/800/1*LL5L2VB4iSKSssmr7KX5yg.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 4: External CTI Source Intake and Validation

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Register each source in the Source Register with two-character combined Admiralty rating (e.g., B4, A1) per[Source Reliability and Admiralty Code](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

- For AI-assisted output: verify traceable primary evidence; if none → rate F6, block from gate decisions; rate underlying source separately

- Attach Evidence Label (Task Card ID + AI Session ID) to every AI-assisted entry per[Evidence Labels](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

- IC 1 (Confirmed) is not available for AI-generated claims

- Run[AI Workflow 1: Source Extraction](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Complete[Task Card 1: Source Claim Extraction](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Resolve all inter-rater disagreements &gt; 1 letter or number before closing phase

<img src="https://cdn-images-1.medium.com/max/800/1*x8n3W0FZUiKqdalqOz5adw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 5: Threat Scenario Development

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Build one threat scenario per crown-jewel / SIR pair

- Compute Risk Score (RS) per[Threat Scenario Priority Scoring](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

- Assign analyst confidence (High / Moderate / Low) per[Confidence Language](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

- Map MITRE ATT&CK technique(s) per[ATT&CK and D3FEND Mapping Quality](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

- Run[AI Workflow 3: Threat Scenario Drafting](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Complete[Task Card 5: Threat Scenario Builder](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Submit evidence pack and pass[**Gate B: Scenario Approval**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

<img src="https://cdn-images-1.medium.com/max/800/1*JwWOeLaJ4WKYhvnJRCAWvw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 6: Hypothesis-Driven Threat Hunting Backlog

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Convert each threat scenario into a hunt hypothesis: actor, technique, observable, data source, expected artifact

- Prioritize backlog by RS score; assign to hunter with sprint target

- Run[AI Workflow 4: Hunt Hypothesis Generation](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Complete[Task Card 6: Hunt Hypothesis Generator](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Submit evidence pack and pass[**Gate C: Hunt Approval**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

<img src="https://cdn-images-1.medium.com/max/800/1*bo7rihxAoXcsIsLkgKV0iQ.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 7: Detection Engineering Design

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Verify target[DRL ≥ 2](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)before writing detection logic — no logic without telemetry

- Draft detection query or Sigma rule against named data source

- Map MITRE D3FEND countermeasure per[ATT&CK and D3FEND Mapping Quality](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

- Record detection in Detection Backlog with schema version, data-source dependency, DRL, severity

- Run[AI Workflow 5: Detection Drafting](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Complete[Task Card 7: Detection Logic Draft](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Challenge logic with[Task Card 8: Rule Quality Challenge](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Submit evidence pack and pass[**Gate D: Detection Design Approval**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

<img src="https://cdn-images-1.medium.com/max/800/1*XZU0y9f76enIlDsLOsX0kg.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 8: Detection-as-Code Implementation

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Commit detection rule to version-controlled repository (branch-per-rule pattern)

- Peer review by second engineer; resolve all review findings before merge

- Run CI/CD pipeline: syntax check, unit test, lint, schema validation

- Translate rule to target SIEM query per[AI Workflow 6: Query Translation](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Advance DRL to 4 on successful merge and CI pass

<img src="https://cdn-images-1.medium.com/max/800/1*rJ-d2lP2zYCqlxixvHNOOQ.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 9: Test Data, Simulation, and Replay

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Obtain or generate test dataset: real log replay, atomic red team, or purple-team exercise

- RS ≥ 20 or Tier 1 crown jewels → purple-team exercise is mandatory; log result in Purple-Team Test Register

- Run[AI Workflow 7: Test Case Generation](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Challenge test coverage with[Task Card 8: Rule Quality Challenge](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Record result per detection: Pass / Conditional pass / Fail-tuning gap / Fail-false negative / Deferred

- Pilot precision is**undefined**(not zero) when TP = 0 — do not record “0% precision”

- Log any false negatives in False-Negative Register; log D3FEND countermeasures in D3FEND Mapping Register

- Advance DRL to 6 on test pass

<img src="https://cdn-images-1.medium.com/max/800/1*6ajdoBb87qeRLJG8aW8dQg.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 10: SOC Triage and Incident Workflow

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Draft SOC playbook: triage steps, escalation path, containment actions, evidence preservation

- Define alert severity mapping and SLA thresholds

- Map each alert to a decision owner and an IR escalation contact

- Run[AI Workflow 8: SOC Playbook Drafting](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Complete[Task Card 9: SOC Playbook Draft](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Conduct SOC dry-run against the detection; advance DRL to 7 after playbook approved and dry-run completed per[Detection Readiness Levels](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

<img src="https://cdn-images-1.medium.com/max/800/1*sJ6sUGcFqRvH8MbZVFJ8Tw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 11: Pilot Deployment and Tuning

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Deploy rule to pilot scope (limited asset set or log volume)

- Measure MTTD, FPR, precision; compare against Phase 0 floor targets

- Document each FP suppression with rationale; no undocumented tuning

- Record Detection Health Register entries daily during pilot window

- Advance DRL to 8 on pilot pass (pilot completed + tuning decision documented) per[Detection Readiness Levels](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

- Submit evidence pack and pass[**Gate E: Production Approval**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

<img src="https://cdn-images-1.medium.com/max/800/1*yxYygKtOgDxsVTW-s4hpVA.png" alt="Article image" width="2730" height="1536" loading="lazy" decoding="async" />

## Phase 12: Production Deployment

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Merge detection to production branch; tag release

- Notify SOC: rule name, severity, expected alert volume, escalation path

- Start 30-day monitoring window per[30/60/90-Day Execution Plan](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Confirm[Gate E: Production Approval](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)evidence pack is filed

- Advance DRL to 9 after sustained production pass: owner assigned, monitoring active, review date set, rollback and health tracking confirmed per[Detection Readiness Levels](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

<img src="https://cdn-images-1.medium.com/max/800/1*gak53wtvopgvV53rCKPpow.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 13: Executive and Technical Reporting

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Compute metrics: MTTD, FPR, precision, RS coverage %, DRL distribution across all active detections

- Record WIP metric: count of active detections at DRL 2–6 (in-flight, not yet production-ready)

- Draft executive report: business impact, threat coverage, open gaps, next-quarter priorities

- Draft technical appendix:[Claim-to-Action Chain](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)integrity table, DRL table, gate evidence pack

- Run[AI Workflow 9: Report Drafting](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Complete[Task Card 10: Executive Report Draft](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

<img src="https://cdn-images-1.medium.com/max/800/1*_Pp_46xibYT2RQMSVOJRfQ.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Phase 14: Continuous Improvement and Maturity Loop

→[Full phase guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- Conduct PIR Feedback Loop meeting with customer; re-score open SIRs

- Close satisfied SIRs with evidence; document residual risk for unsatisfied SIRs

- Promote new threat actor TTPs to Phase 1 intake queue

- Run[AI Workflow 10: Quality Review](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Complete[Task Card 11: Final Red-Team Review](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md); resolve all Critical and High findings before Gate F

- Submit evidence pack and pass[**Gate F: Final Delivery Approval**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- Deliver[Final Customer Delivery Package](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

<img src="https://cdn-images-1.medium.com/max/800/1*B4HvwpMwai-YJksBSNNzGg.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Quality Gates

- **Gate A: PIR Approval**— after Phase 1 →[Gate A](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- **Gate B: Scenario Approval**— after Phase 5 →[Gate B](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- **Gate C: Hunt Approval**— after Phase 6 →[Gate C](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- **Gate D: Detection Design**— after Phase 7 →[Gate D](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- **Gate E: Production**— after Phase 11–12 →[Gate E](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

- **Gate F: Final Delivery**— after Phase 14 →[Gate F](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

## Master Registers

- **PIR / SIR Register**— Phase 1 →[Phase 1](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **Crown-Jewel Register**— Phase 2 →[Phase 2](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **Telemetry Register**— Phase 3 →[Phase 3](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **Source Register**— Phase 4 →[Phase 4](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **Threat Scenario Register**— Phase 5 →[Phase 5](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **Hunt Backlog**— Phase 6 →[Phase 6](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **Detection Backlog**— Phase 7 →[Phase 7](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **Detection Coverage Gap Register**— Phase 7 →[Phase 7](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **Detection Register**— Phase 7 →[Phase 7](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **D3FEND Mapping Register**— Phase 7 →[Phase 7](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **Purple-Team Test Register**— Phase 9 →[Phase 9](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **False-Negative Register**— Phase 9 →[Phase 9](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **Detection Health Register**— Phase 11 →[Phase 11](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **Final Delivery Package**— Phase 14 →[Phase 14](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

## AI Workflows

- [**AI Workflow 1: Source Extraction**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phases 1 and 4

- [**AI Workflow 2: Customer Relevance Mapping**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phases 2 and 3

- [**AI Workflow 3: Threat Scenario Drafting**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 5

- [**AI Workflow 4: Hunt Hypothesis Generation**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 6

- [**AI Workflow 5: Detection Drafting**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phases 7 and 8

- [**AI Workflow 6: Query Translation**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 8

- [**AI Workflow 7: Test Case Generation**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 9

- [**AI Workflow 8: SOC Playbook Drafting**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 10

- [**AI Workflow 9: Report Drafting**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 13

- [**AI Workflow 10: Quality Review**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 14

## Task Cards

- [**Task Card 1: Source Claim Extraction**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phases 1 and 4

- [**Task Card 2: PIR Quality Challenge**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 1

- [**Task Card 3: Crown-Jewel Dependency Review**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 2

- [**Task Card 4: Telemetry Feasibility Review**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 3

- [**Task Card 5: Threat Scenario Builder**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 5

- [**Task Card 6: Hunt Hypothesis Generator**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 6

- [**Task Card 7: Detection Logic Draft**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 7

- [**Task Card 8: Rule Quality Challenge**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phases 7 and 9

- [**Task Card 9: SOC Playbook Draft**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 10

- [**Task Card 10: Executive Report Draft**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 13

- [**Task Card 11: Final Red-Team Review**](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)— Phase 14

## Follow for practical cybersecurity research

If you’re interested in**Offensive security,****AI security, real-world attack simulations, CTI, and detection engineering**— this is exactly what I focus on.

### Stay connected:

→**Subscribe on Medium:**[medium.com/@1200km](https://medium.com/@1200km)
→**Connect on LinkedIn:**[andrey-pautov](https://www.linkedin.com/in/andrey-pautov/)
→**GitHub — tools & labs:**[github.com/anpa1200](https://github.com/anpa1200)
→**Contact:**[1200km@gmail.com](mailto:1200km@gmail.com)
