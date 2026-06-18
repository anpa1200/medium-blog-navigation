---
title: "Customer-Driven AI CTI Project Template. Part 2A: Phase-by-Phase Execution Guide"
description: "From pure CTI to hands-on detection engineering with strict validation gates."
image: "https://cdn-images-1.medium.com/max/800/1*oajUaMGHCUlODowBWstSFQ.png"
---

# Customer-Driven AI CTI Project Template. Part 2A: Phase-by-Phase Execution Guide


![Cover image](https://cdn-images-1.medium.com/max/800/1*oajUaMGHCUlODowBWstSFQ.png)

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59](https://medium.com/@1200km/customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59)
- **Published:** 2026-05-12
- **Preserved media:** 25 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 37 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### From pure CTI to hands-on detection engineering with strict validation gates.

![Article image](https://cdn-images-1.medium.com/max/800/1*oajUaMGHCUlODowBWstSFQ.png)

## This article is one part of a four-part series covering the full customer-driven AI-CTI project lifecycle.

### Full Workflow Quick Reference

[**Customer-Driven AI CTI Project**
[Full Workflow Quick Reference](2026-05-13-customer-driven-ai-cti-project-c0db3cdc1830.md)

### Part 1:Foundations and methodology:

Covers the foundations: methodology rules, analytic standards, scoring models, governance, roles, and delivery frameworks — the*what*and*why*behind every project decision.

[**Customer-Driven AI CTI Project Template. Part 1: Foundations**
[From pure CTI to hands-on detection engineering with strict validation gates](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

### Part 2A (this document): how to do it

is the phase-by-phase execution guide — the*how to do it*, from project charter and guardrails (Phase 0) through continuous improvement and maturity loop (Phase 14), including project execution controls and the master workflow. Part 1 covers the foundations: methodology rules, analytic standards, scoring models, governance, roles, and delivery frameworks.

### Part 2B is the reference toolkit:

AI Workflow Library, LLM Task Cards, Strict Quality Gates, Master Registers, end-to-end Worked Example, and Final Customer Delivery Package. Read Part 1 first, then use Part 2A as your operational execution guide and Part 2B as your reference during project work.

[**Customer-Driven AI CTI Project Template:Part 2B: Reference Toolkit**
[From pure CTI to hands-on detection engineering with strict validation gates](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

## Executive Summary

Part 2A is the operational execution guide for a customer-driven AI-assisted CTI project. It assumes the reader is familiar with the methodology rules, scoring models, governance framework, and analytic standards defined in Part 1. Where Part 1 establishes*what*the project must do and*why*, Part 2A defines*how*to run it phase by phase from the first day to final delivery.

The guide covers fifteen phases, from project charter and guardrails (Phase 0) through continuous improvement and maturity loop (Phase 14). Each phase defines its objective, required inputs, activities, AI usage boundaries, validation tests, and exit criteria. No phase may be closed unless its exit criteria and validation tests are met.

The operational tools referenced throughout these phases — AI Workflow Library, LLM Task Cards, Strict Quality Gates, Master Registers, end-to-end Worked Example, and Final Customer Delivery Package — are defined in Part 2B.

The binding rule throughout Part 2A is unchanged from Part 1: no CTI output is accepted until it connects to a customer decision, customer asset, customer telemetry source, defensive action, owner, validation result, and measurable outcome.

## Table of Contents

- **System map**

- **Executive Summary**

- **Repository Setup**

- **Phase 0: Project Charter and Guardrails****
**AI Usage

- **Phase 1: Customer Decision and PIR/SIR Definition****
**AI Usage

- **Phase 2: Crown-Jewel and Business-Impact Mapping****
**AI Usage

- **Phase 3: Telemetry and Data Readiness Assessment****
**AI Usage

- **Phase 4: External CTI Source Intake and Validation****
**AI Usage

- **IOC Emergency Unblock Procedure**

- **Phase 5: Threat Scenario Development****
**AI Usage

- **Phase 6: Hypothesis-Driven Threat Hunting Backlog****
**AI Usage

- **Phase 7: Detection Engineering Design****
**AI Usage

- **Phase 8: Detection-as-Code Implementation****
**AI Usage

- **Phase 9: Test Data, Simulation, and Replay****
**AI Usage

- **Phase 10: SOC Triage and Incident Workflow****
**AI Usage

- **Active Compromise Escalation Protocol**

- **Phase 11: Pilot Deployment and Tuning****
**AI Usage

- **Phase 12: Production Deployment****
**AI Usage

- **Phase 13: Executive and Technical Reporting****
**AI Usage

- **Phase 14: Continuous Improvement and Maturity Loop****
**AI Usage

- **Project Execution Controls**

- **Master Workflow**

## System map

![Article image](https://cdn-images-1.medium.com/max/800/1*yIHza0R-qUmxBcS_hecb2Q.png)

## Phase 0: Project Charter and Guardrails

### Objective

Define scope, success criteria, data handling, AI rules, stakeholders, and delivery cadence before analysis begins.

### Required Inputs

![Article image](https://cdn-images-1.medium.com/max/800/1*G0SVgupPo-hYl9b-hu21iw.png)

- customer business objectives;

- in-scope business units;

- in-scope environments;

- data classification rules;

- data classification and regulatory handling annex;

- project staff onboarding and offboarding plan;

- vendor or third-party data sharing agreements for non-public customer data;

- AI usage permissions;

- regulatory constraints;

- current security tooling;

- existing CTI, SOC, and incident response processes.

### Activities

- Confirm project scope and exclusions.

- Define what decisions the project must support.

- Define acceptable AI usage and prohibited data types.

- Define project approval gates.

- Define delivery cadence and review meetings.

- Define severity language and confidence language.

- Define final success metrics.

- Complete Day 1–5 technical validation sprint before final mode selection is locked.

### Decision Quality Checklist

Each customer decision counted toward the Phase 0 decision test must:

- name a specific action the customer will or will not take;

- name the person accountable for that action;

- identify what information would change the decision;

- have a time horizon.

Vague goals such as “improve security” or “understand risk” do not count as decisions.

### Data Classification and Regulatory Handling Annex

Before data handling rules are approved, document:

```text
Regulated data types in scope:
Applicable legal or regulatory frameworks:
Cross-border transfer restrictions:
Employee monitoring constraints:
Customer data constraints:
Active incident evidence restrictions:
Approved storage locations:
Approved AI processing locations:
Legal/privacy approval owner:
```

**Non-exhaustive regulatory framework reference list.**This list is provided for initial scoping only. Confirm which frameworks apply with the customer’s legal or compliance owner. Additional sector-specific regulations may apply and are not listed here.

- **GDPR (EU General Data Protection Regulation)**— Scope summary: Personal data of EU residents — Typical relevance to CTI projects: Source data, analyst notes, or employee monitoring data involving EU individuals

- **HIPAA (US Health Insurance Portability and Accountability Act)**— Scope summary: Protected health information (PHI) — Typical relevance to CTI projects: Healthcare sector customers; incident evidence may include PHI

- **PCI-DSS (Payment Card Industry Data Security Standard)**— Scope summary: Cardholder data environments — Typical relevance to CTI projects: Retail, financial, and payment-processor customers; scope definition and logging constraints

- **NIS2 (EU Network and Information Security Directive 2)**— Scope summary: Critical infrastructure and essential services operators in the EU — Typical relevance to CTI projects: Incident reporting obligations; telemetry and log retention requirements

- **SOX (US Sarbanes-Oxley Act)**— Scope summary: Financial controls and audit trails for US-listed companies — Typical relevance to CTI projects: Detection and logging of access to financial systems

- **DORA (EU Digital Operational Resilience Act)**— Scope summary: ICT risk management and incident reporting for EU financial entities — Typical relevance to CTI projects: Resilience testing, detection coverage, and incident classification requirements

- **CCPA / CPRA (California Consumer Privacy Act / Privacy Rights Act)**— Scope summary: Personal data of California residents — Typical relevance to CTI projects: Source data or employee monitoring data involving California residents

- **Sector-specific (examples: NERC CIP for energy, ITAR/EAR for defense, FedRAMP for US federal cloud)**— Scope summary: Varies by sector — Typical relevance to CTI projects: Confirm applicable sector frameworks with customer legal owner

### Project Staff Onboarding and Offboarding

**Staff onboarding must define:**

- project access required;

- SIEM, EDR, cloud, ticketing, repository, and AI tool access;

- least-privilege role;

- approval owner;

- access expiration date;

- knowledge-transfer owner.

**Staff offboarding must define:**

- access revocation owner;

- AI tool credential revocation;

- local data purge requirement;

- handoff of open evidence, detections, and customer notes;

- confirmation in Customer Acceptance Record or RAID Register.

### Vendor / Third-Party Data Sharing

No non-public customer data may enter a vendor-managed AI, enrichment, sandbox, or analysis platform unless a data processing agreement or equivalent approved legal/commercial instrument is in place.

### Day 1–5 Technical Validation Sprint

Before final mode selection is locked:

- inspect at least one sample event from each claimed priority telemetry source;

- confirm analyst access to SIEM or data export path;

- confirm SOC routing path for pilot detections;

- confirm whether AI tool approval exists;

- validate one crown-jewel owner and one platform owner;

- update Customer Readiness Assessment.

If the sprint contradicts the assumed readiness, the mode must be escalated or de-escalated before Phase 1 begins.

### AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*_dRYjDdW1MUypjrcZ-2KHQ.png)

**Allowed**:

- draft project charter from approved notes;

- summarize stakeholder interviews;

- extract action items and decisions;

- create first version of artifact templates.

**Not allowed:**

- infer unstated business priorities;

- store or process restricted customer data without approval;

- decide project scope.

*Part 2B:*[*Minimum Viable Customer Delivery*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*30/60/90-Day Execution Plan*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Success Metric Floors

![Article image](https://cdn-images-1.medium.com/max/800/1*UxdcrXAzQmeEf2lIu-a4BA.png)

Each success metric defined in Activity 7 must meet the following minimum floor requirements. Metrics that do not meet these floors must be revised before Phase 0 exits.

- **Detection coverage target:**Must reference at least one specific threat scenario by ID and specify a minimum DRL (e.g., “Scenario SC-01 reaches DRL-7 or above”). A target of “improve detection coverage” without a named scenario and DRL does not pass.

- **Telemetry gap closure target:**Must reference at least one named telemetry gap by ID or description (e.g., “close TG-03: no EDR coverage on OT segment”). A generic target of “reduce telemetry gaps” without a named gap does not pass.

- **Hunt completion target:**Must specify a minimum number of hunt completions and a required result classification (e.g., “complete at least two hunts, each closed as Confirmed Not Found, Escalated, or Inconclusive with documented evidence”). A target of “run hunts” without a count and classification requirement does not pass.

- **Executive decision support target:**Must name at least one specific Decision ID and define the required Decision Register status at project close: Approved, Rejected, or Deferred with owner-signed rationale. A decision that remains Open with no recommended action at Gate F does not count toward this metric.

A quality reviewer (not the analyst who defined the metrics) must confirm that all success metrics meet these floors before the Phase 0 gate is closed. The quality reviewer’s name and confirmation date must be recorded in the Customer Acceptance Record.

### Validation Tests

- **Scope test:**In-scope and out-of-scope systems are explicitly listed.

- **Decision test:**At least five customer decisions are documented.

- **Decision quality test:**Each counted decision passes the four-part decision quality checklist.

- **AI policy test:**Allowed and prohibited AI use cases are documented.

- **AI tool test:**Approved AI Tool Register contains at least one approved tool or project is marked no-AI.

- **Approval test:**Named approvers exist for CTI, detection, SOC, and executive outputs.

- **Data handling test:**Data classifications and storage locations are defined.

- **Legal/privacy test:**Legal and privacy approval conditions are defined for personal data, employee monitoring, customer records, and active incident evidence.

- **Technical validation test:**Day 1–5 technical validation sprint completed and mode selection confirmed.

- **Success metric floor test:**All success metrics meet the minimum floor requirements (named scenario and DRL for coverage; named gap for telemetry; count and classification for hunts). Quality reviewer name and confirmation date recorded in Customer Acceptance Record.

### Exit Criteria

![Article image](https://cdn-images-1.medium.com/max/800/1*HYwVpXb_qF_9J9hf3O2H-A.png)

- Signed project charter.

- Approved AI usage policy.

- Approved stakeholder list.

- Approved delivery timeline.

- Baseline success metrics.

- Minimum success metrics: detection coverage target, telemetry gap closure target, and hunt completion target with measurable thresholds.

- Decision Register initialized.

- RAID Register initialized.

- Customer Acceptance Record initialized.

- Approved AI Tool Register initialized and populated or AI workflows disabled.

- Customer confirms whether case management timestamps (case open, case assigned, case closed) are available and accessible to the project team. If timestamps are not accessible, time-based metrics such as mean time to triage are excluded from the metrics plan and the gap is recorded in the RAID Register.

- **Chain integrity:**At least one primary output from this phase (charter, PIR, or Decision) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Customer Relevance**node are logged as collection gaps or context items, not closed deliverables.

## Repository Setup

Treat the CTI project as a codebase. Every artifact is a file, every register is a versioned record, every gate evidence pack is a commit-ready bundle. One directory per engagement. Nothing lives in email or chat. Initialize the repository on Day 1 before any analysis begins.

```text
cti-project/
│
├── README.md                                    
# project scope, mode, customer, cycle dates
├── .gitignore                                   
# exclude raw source PDFs, PII, credentials
│
├── config/
│   ├── project.yaml                             
# mode (1/2), AI governance level, cycle dates
│   ├── ai-governance-policy.md                  
# format: part2a → Phase 0 → AI Usage
│   └── crown-jewels.md                          
# format: part2a → Phase 2 → Crown-Jewel and Business-Impact Mapping
│
├── registers/                                   
# one CSV per register; schemas in part2b → Master Registers
│   ├── evidence-register.csv                    
# schema: part2b → Evidence Register
│   ├── decision-register.csv                    
# schema: part2b → Decision Register
│   ├── source-register.csv                      
# schema: part2b → Source Register
│   ├── pir-register.csv                         
# schema: part2b → PIR Register
│   ├── sir-register.csv                         
# schema: part2b → SIR Register
│   ├── collection-gap-register.csv              
# schema: part2b → Collection Gap Register
│   ├── contradiction-register.csv               
# schema: part2b → Contradiction Register
│   ├── threat-scenario-register.csv             
# schema: part2b → Threat Scenario Register
│   ├── ioc-review-register.csv                  
# schema: part2b → IOC Review Register
│   ├── attck-mapping-register.csv               
# schema: part2b → ATT&CK Mapping Register
│   ├── detection-coverage-gap-register.csv      
# schema: part2b → Detection Coverage Gap Register; derived view — regenerate on DRL or scenario change
│   ├── hunt-backlog.csv                         
# schema: part2b → Hunt Backlog
│   ├── detection-backlog.csv                    
# schema: part2b → Detection Backlog
│   ├── detection-health-register.csv            
# schema: part2b → Detection Health Register
│   ├── customer-detection-data-model.csv        
# schema: part2b → Customer Detection Data Model Register
│   ├── raid-register.csv                        
# schema: part2b → RAID Register
│   ├── customer-acceptance-record.csv           
# schema: part2b → Customer Acceptance Record
│   ├── ai-use-log.csv                           
# schema: part2b → AI Use Log
│   └── approved-ai-tool-register.csv            
# schema: part2b → Approved AI Tool Register
│
├── sources/                                     
# one subdirectory per source
│   ├── SRC-
001
/
│   │   ├── source.pdf                           
# original document (gitignored if restricted)
│   │   └── extraction.md                        
# format: part2b → Task Card 1: Source Claim Extraction; run via AI Workflow 1
│   └── SRC-
002
/
│       ├── source.pdf
│       └── extraction.md
│
├── intelligence/
│   ├── pirs/
│   │   ├── PIR-
01
.md                            
# format: part2b → PIR Register + worked example Step 1; validated via Task Card 2
│   │   └── PIR-
02
.md
│   ├── sirs/
│   │   ├── SIR-
01.1
.md                          
# format: part2b → SIR Register + worked example Step 2
│   │   ├── SIR-
01.2
.md
│   │   └── SIR-
01.3
.md
│   └── scenarios/
│       ├── SCN-
01
-cloud-identity-backup-deletion.md   
# format: part2b → Threat Scenario Register + worked example Step 4; drafted via Task Card 5
│       └── SCN-
02
.md
│
├── telemetry/
│   ├── telemetry-map.md                         
# format: part2a → Phase 3 → Telemetry and Data Readiness Assessment; reviewed via Task Card 4
│   ├── customer-detection-data-model.md         
# format: part2b → Customer Detection Data Model Register; mirrors register CSV
│   └── sample-events/
│       ├── SAMPLE-CLOUD-AUDIT-
014
.json          
# raw log sample; required input for Task Card 7 and DRL-2 confirmation
│       └── SAMPLE-IDP-
001
.json
│
├── hunts/
│   └── HUNT-
01
/
│       ├── hypothesis.md                        
# format: part2b → Hunt Backlog + worked example Step 6; generated via Task Card 6 / AI Workflow 4
│       ├── 
query
.kql                            
# format: part2b → AI Workflow 6: Query Translation
│       └── result.md                            
# format: part2b → Hunt Backlog result and Result Classification fields; required before hunt can be closed
│
├── detections/
│   └── DET-
001
/
│       ├── design.md                            
# format: part2b → Detection Backlog + worked example Step 7; fields: name, DRL, ATT&CK, D3FEND, log sources, required fields, known FPs
│       ├── logic-neutral.md                     
# format: part2b → Task Card 7: Detection Logic Draft (platform-neutral output)
│       ├── logic.kql                            
# format: part2b → AI Workflow 6: Query Translation (target-platform output)
│       ├── 
false
-positives.md                   
# format: part2b → Task Card 8: Rule Quality Challenge; known FP categories and tuning decisions
│       ├── rollback-plan.md                     
# format: part2b → worked example Step 11 → Rollback plan; fields: disable owner, steps, re-enable criteria, notification path
│       ├── tests/
│       │   ├── TEST-CLOUD-IAM-
001
-positive.json 
# format: part2b → AI Workflow 7 / worked example Step 8; positive synthetic event
│       │   ├── TEST-NEG-
001
-negative.json       
# negative test; required for Gate E
│       │   └── TEST-EDGE-
001
-edge.json          
# edge test; required for Gate E
│       └── playbooks/
│           └── PB-DET-
001
.md                    
# format: part2b → Task Card 9: SOC Playbook Draft / AI Workflow 8; includes dry-run record; required for Gate E
│
├── gates/
│   ├── GATE-A-pir-approval/
│   │   └── evidence-pack.md                     
# format: part2b → Gate Evidence Pack Template; required fields: PIR Register, Decision Register, Collection Gap Register
│   ├── GATE-B-scenario-approval/
│   │   └── evidence-pack.md                     
# format: part2b → Gate Evidence Pack Template; required fields: Scenario Register, Evidence IDs, priority score, telemetry score
│   ├── GATE-C-hunt-approval/
│   │   └── evidence-pack.md                     
# format: part2b → Gate Evidence Pack Template; required fields: hypothesis, telemetry map, observables, result classification
│   ├── GATE-D-detection-design/
│   │   └── evidence-pack.md                     
# format: part2b → Gate Evidence Pack Template; required fields: detection design, field mapping, ATT&CK mapping, test plan
│   ├── GATE-E-production-approval/
│   │   └── GATE-E-DET-
001
.md                    
# format: part2b → Gate Evidence Pack Template + worked example Step 11; one file per detection; required fields: test evidence IDs, playbook ID, detection health entry, rollback plan, labeling completeness
│   └── GATE-F-final-delivery/
│       └── evidence-pack.md                     
# format: part2b → Gate Evidence Pack Template; required fields: final package, Evidence Register, Decision Register, Detection Health Register, AI Use Log, Customer Acceptance Record
│
├── ai/
│   ├── approved-tools.md                        
# format: part2b → Approved AI Tool Register; mirrors register CSV
│   └── quality-checklists/
│       ├── QC-AIL-
001
.md                        
# format: part2b → AI Use Log → Quality Checklist column definition; seven items: source grounding, no fabrication, customer fit, uncertainty preserved, actionability, security review, prompt-injection resistance
│       └── QC-AIL-
002
.md
│
├── delivery/
│   ├── executive-summary.md                     
# format: part2b → Task Card 10: Executive Report Draft / AI Workflow 9
│   ├── key-judgments.md                         
# format: part2b → Task Card 11: Final Red-Team Review; every judgment must trace to an Evidence ID
│   ├── technical-appendix.md                    
# format: part2b → Final Customer Delivery Package checklist
│   ├── 
30
-
60
-
90
-roadmap.md                      
# format: part2b → 30/60/90-Day Execution Plan
│   └── customer-acceptance/
│       └── ACC-
001
-final-signoff.md             
# format: part2b → Customer Acceptance Record + Evidence Package Template
│
└── admin/
    ├── weekly-hygiene/
    │   └── 
2026
-
05
-
01
-register-hygiene.md       
# format: part2a → Project Execution Controls → Weekly Register Hygiene; covers overdue contradictions, stale IOCs, DRL drift
    └── exceptions/
        └── 
(
gate exception records
)
             
# format: part2b → Strict Quality Gates → Conditional pass rules; fields: risk owner, expiry date
```

**File naming rules:**

```text
Register files     → kebab-case, singular noun, .csv
Intelligence files → ID prefix + short description, .md (e.g., SCN-01-cloud-identity.md)
Detection files    → one subdirectory per Detection ID; logic files named by platform
Test files         → TEST-
<
ID
>
-
<
type
>
.json (type: positive / negative / edge)
Gate packs         → GATE-
<
letter
>
[-
<
Detection
 
ID
>
].md
AI checklists      → QC-AIL-
<
three-digit
 
sequence
>
.md
Sample events      → SAMPLE-
<
SOURCE
>
-
<
sequence
>
.json
```

**Version control rules:**

```text
Commit
 
on
 
every
 register change, gate pass, 
or
 DRL update.
Commit
 message format: 
<
artifact
-
id
>
: 
<
action
>
 — e.g., "DET-001: advance to DRL-7"
Tag releases 
at
 Gate F: v
<
cycle
>
-
gate
-
f (e.g., v1
-
gate
-
f)
Never 
commit
 raw customer PII, credentials, 
or
 restricted source documents.
Gate exception records must be committed before the gate 
is
 marked Pass.
```

## Phase 1: Customer Decision and PIR/SIR Definition

### Objective

Translate customer needs into priority intelligence requirements and specific intelligence requirements.

### PIR and SIR Foundations

FIRST’s CTI curriculum treats Priority Intelligence Requirements as decision-quality questions that should be limited, scoped to key decision points or courses of action, and continually refined as the operating environment changes [39]. NATO-style intelligence doctrine uses the same basic logic: PIRs express the commander’s priority intelligence needs, while Specific Intelligence Requirements support and complement each PIR with more detailed information needs that guide collection, processing, and analysis [40].

For this strategy:

- **PIR:**the decision-level intelligence question that a senior consumer needs answered.

- **SIR:**the specific information requirement that decomposes the PIR into collectible evidence.

- **Collection task:**the concrete data request, log source, hunt query, partner question, or vendor evidence needed to answer the SIR.

The relationship is hierarchical: each PIR drives one or more SIRs; each SIR drives one or more collection tasks. Nothing enters the collection plan without a parent SIR; no SIR exists without a parent PIR; no PIR is approved without naming a consumer and a decision it supports.

### Strong PIR Format

```text
PIR-[ID]:
Decision supported:
Question:
Consumer:
Time horizon:
Required confidence:
Likely action if answered:
Related crown jewels:
Related threat scenarios:
```

### Strong SIR Format

```text
SIR-[ID]:
Parent PIR:
Question:
Collection approach:
Required evidence type:
Required data source:
Confidence threshold to close:
Owner:
Due date:
Closure condition:
Status:
```

### SIR Quality Criteria

**Each SIR must:**

- be answerable with a yes/no, bounded finding, or specific evidence statement;

- name at least one data source or collection path;

- define the evidence type required to close it;

- define the confidence threshold needed for closure;

- have an owner and due date;

- include a closure condition.

**Weak SIR:**

```text
SIR:
Understand cloud identity risk.
```

**Corrected SIR:**

```text
SIR-
01.2
:
Parent PIR: PIR-
01
Question:
 
Do
 cloud audit logs capture service-principal credential additions 
with
 actor, source IP, resource ID, 
and
 timestamp?
Collection approach: Pull 
10
 sample events 
from
 the last 
30
 days 
or
 generate a controlled test 
event
.
Required evidence type: customer-observed cloud audit log sample.
Required data source: cloud audit logs.
Confidence threshold 
to
 close: high 
for
 field presence, moderate 
for
 retention adequacy.
Owner:
 platform owner.
Due 
date
: [
date
].
Closure condition: sample 
event
 inspected 
and
 field mapping added 
to
 Customer Detection Data Model.
Status:
 open.
```

### Activities

- Interview executives, security leadership, SOC, IR, IT, cloud, identity, and business owners.

- Identify current decision pain points.

- Draft PIRs in decision language.

- Decompose each PIR into SIRs.

- Map each SIR to collection tasks.

- Assign owner and due date to each collection task.

### Example PIR

```text
PIR-01:
Decision supported:
 
prioritize
 
90
-day
 
detection
 
engineering
 
investment.
Question:
 
Which
 
adversary
 
behaviors
 
are
 
most
 
relevant
 
to
 
the
 
customer's
 
crown
 
jewels
 
and
 
most
 
detectable
 
with
 
current
 
telemetry?
Consumer:
 
CISO,
 
SOC
 
lead,
 
detection
 
engineering
 
lead.
Time horizon:
 
90
 
days.
Required confidence:
 
moderate
 
or
 
high.
Likely action if answered:
 
approve
 
detection
 
backlog
 
and
 
logging
 
remediation
 
plan.
Related crown jewels:
 
identity
 
plane,
 
cloud
 
management,
 
customer
 
database,
 
backup
 
platform.
Related threat scenarios:
 
credential
 
compromise,
 
cloud
 
deletion,
 
data
 
theft,
 
ransomware
 
staging.
```

### Example PIR and SIR with Collection Tasks — Third-Party Access

```text
PIR:
Which
 
third-party
 
access
 
paths
 
could
 
provide
 
privileged
 
access
 
to
 
core
 
network,
 
cloud,
Kubernetes,
 
or
 
management
 
systems?
SIRs:
-
 
Which
 
vendors
 
have
 
standing
 
VPN,
 
ZTNA,
 
PAM,
 
or
 
cloud-console
 
access?
-
 
Which
 
vendor
 
accounts
 
can
 
reach
 
network
 
management,
 
Kubernetes,
 
backup,
  
or
 
telecom-core
 
support
 
systems?
-
 
Which
 
vendor
 
sessions
 
occurred
 
outside
 
approved
 
change
 
windows
 
in
 
the
 
last
 
90
 
days?
Collection tasks:
-
 
Pull
 
VPN/ZTNA
 
logs
 
for
 
all
 
vendor
 
identities.
-
 
Export
 
PAM
 
session
 
records
 
and
 
approvals
 
for
 
privileged
 
vendor
 
sessions.
-
 
Join
 
vendor
 
access
 
events
 
with
 
NOC
 
change
 
tickets
 
and
 
cloud
 
IAM
 
role
 
assignments.
```

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*fk8_bHutgtM93ozn9U3mOA.png)

**Allowed:**

- cluster interview notes into decision themes;

- draft PIR and SIR wording;

- identify unclear or non-decision-oriented PIRs;

- propose collection tasks from validated PIRs.

**Validation requirement:**

```text
The human CTI lead must confirm that 
each
 PIR supports a 
real
 customer decision.
```

*Part 2B tools:*[*AI Workflow 1: Source Extraction*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 1: Source Claim Extraction*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 2: PIR Quality Challenge*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Gate A: PIR Approval*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Decision linkage:**Every PIR names a consumer and decision.

- **Collection linkage:**Every PIR has at least two SIRs.

- **SIR quality:**Every SIR in the SIR Register has all required fields populated: SIR ID, parent PIR, question, collection approach, required evidence type, required data source, confidence threshold to close, owner, due date, closure condition, and status.

- **Feasibility:**Every SIR has at least one realistic collection task.

- **Time-bound:**Every PIR has a time horizon.

- **Owner assigned:**Every collection task has an owner.

- **Register linkage:**Every PIR maps to at least one Decision ID.

- **Chain integrity:**At least one primary output from this phase (PIR, SIR, or Decision) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Customer Relevance**node are logged as collection gaps or context items, not closed deliverables.

### Exit Criteria

- Approved PIR/SIR register.

- Collection task register.

- Decision owners confirmed.

- Decision Register updated.

## Phase 2: Crown-Jewel and Business-Impact Mapping

### Objective

Define what the customer must protect and why it matters.

### Activities

- Identify crown jewels by business process, system, identity plane, data type, and operational dependency.

- Map crown jewels to owners.

- Map crown jewels to business impact.

- Identify upstream and downstream dependencies.

- Identify privileged access paths.

- Identify recovery dependencies.

### Crown-Jewel Template

```text
Crown jewel:
Business owner:
Technical owner:
Business function:
Data or service protected:
Impact if compromised:
Impact if unavailable:
Regulatory relevance:
Privileged access paths:
Third-party dependencies:
Recovery dependencies:
Current visibility:
Current controls:
Known gaps:
```

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*VAxQwhL8TvKXZ0Twv3Utfw.png)

**Allowed**:

- normalize asset interview notes;

- propose dependency questions;

- identify missing owner fields;

- summarize crown-jewel map for executives.

**Not allowed:**

- classify crown jewels without customer owner approval;

- infer regulatory impact without legal or compliance review.

*Part 2B tools:*[*AI Workflow 2: Customer Relevance Mapping*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 3: Crown-Jewel Dependency Review*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Owner test:**Every crown jewel has business and technical owners.

- **Impact test:**Confidentiality, integrity, and availability impacts are documented.

- **Access-path test:**Privileged and third-party access paths are documented.

- **Recovery test:**Backup and recovery dependencies are documented.

- **Approval test:**Crown-jewel list is approved by customer leadership.

- **Chain integrity:**At least one primary output from this phase (crown-jewel register entry or Decision) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Customer Relevance**node are logged as collection gaps or context items, not closed deliverables.

### Exit Criteria

- Approved crown-jewel register.

- Dependency map.

- Privileged access map.

- Recovery dependency map.

- Customer attack surface and trust boundary map started.

## Phase 3: Telemetry and Data Readiness Assessment

### Objective

Determine what evidence the customer can actually collect, search, trust, and retain.

### Required Data Sources

Assess availability and quality for:

- SIEM;

- EDR;

- identity provider;

- MFA;

- PAM;

- VPN/ZTNA;

- email gateway;

- DNS;

- proxy;

- firewall;

- NDR;

- WAF;

- cloud audit logs;

- Kubernetes audit logs;

- database audit logs;

- application logs;

- endpoint process logs;

- file logs;

- backup platform logs;

- CI/CD logs;

- vulnerability management;

- asset inventory;

- ticketing and change management.

### Telemetry Quality Scale

- **0:**Not collected.

- **1:**Collected but not searchable or unreliable.

- **2:**Searchable but missing key fields or short retention.

- **3:**Searchable, parsed, retained, and mapped to asset/user context.

- **4:**High quality with normalization, enrichment, baselines, and tested detections.

### Telemetry Map Template

```text
Source:
Owner:
Platform:
Coverage:
Retention:
Parsing status:
Key fields:
Known missing fields:
Time synchronization:
Normalization model:
Search examples:
Access restrictions:
Detection use cases supported:
Gaps:
Score:
Last assessed:
```

Critical log source means any source required by a Critical or High Risk scenario, any Risk Score 20–25 scenario, any EP1/EP2 detection or hunt, or any production/pilot detection.

**Phase 3 fallback definition:**Scenarios are not built until Phase 5, so the full critical log source definition cannot be applied during Phase 3. During Phase 3, treat as critical any log source that the CTI lead or customer security lead identifies as likely required for the top three priority scenarios based on the Customer Readiness Assessment and initial crown-jewel map. After Phase 5 scenarios are approved, re-apply the full critical log source definition retroactively, update the telemetry map with any newly critical sources, and inspect sample events for any sources promoted to critical status that were not previously inspected.

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*XVPCkhue9UQmkFGZJWg5VQ.png)

**Allowed:**

- convert telemetry inventories into structured tables;

- identify missing fields for proposed detection use cases;

- draft data-source questions for platform owners;

- compare detection requirements against available fields.

**Not allowed:**

- claim a log source exists without platform-owner confirmation;

- mark parsing as valid without sample-event inspection.

*Part 2B tools:*[*AI Workflow 2: Customer Relevance Mapping*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 4: Telemetry Feasibility Review*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Sample-event test:**Each critical log source has inspected sample events.

- **Field test:**Required fields for priority detections are present and parsed.

- **Retention test:**Retention supports intended lookback and baselining.

- **Time test:**Timestamps are normalized and time skew is understood.

- **Join test:**User, host, IP, asset, and ticket joins are possible where required.

- **Access test:**Analysts have approved access to run required searches.

- **Data model test:**Canonical fields and source fields are mapped for priority data sources.

- **Reassessment test:**Telemetry entries include last assessed date and reassessment owner.

- **Chain integrity:**At least one primary output from this phase (telemetry map entry or Collection Gap) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Telemetry**node are logged as collection gaps or context items, not closed deliverables

### Exit Criteria

- Telemetry map complete.

- Collection gap register created.

- Searchable sample events attached or referenced.

- Detection feasibility rating assigned.

- Customer Detection Data Model started.

Telemetry must be re-assessed at Day 45 and before any production deployment. If a required log source changes schema, retention, parsing, or access, affected detections must be reviewed for DRL demotion.

## Phase 4: External CTI Source Intake and Validation

### Objective

Transform external reporting into validated, customer-relevant intelligence inputs.

### Source Types

- government advisories;

- vendor reports;

- ISAC/ISAO sharing;

- partner reporting;

- vulnerability advisories;

- malware reports;

- sandbox output;

- threat feeds;

- open-source reporting;

- customer-provided historical incidents.

### Source Register Template

```text
Source ID:
Source name:
Publication date:
Reporting type:
Original URL or document:
Source access:
Evidence provided:
Source Reliability:
Combined Rating:
 [
Source
 
Reliability
 
letter
][
Information
 
Credibility
 
number
] 
—
 
e.g.,
 
B4
Rating rationale:
Information Credibility:
AI-assisted source handling:
 
yes
 
/
 
no.
 
If
 
yes
,
 
record
 
whether
 
AI
 
was
 
used
 
for
 
summarization,
 
extraction,
 
translation,
 
mapping,
 
or
 
claim
 
generation.
 
Unsupported
 
AI-generated
 
claims
 
default
 
to
 
F6
 
unless
 
independently
 
corroborated
 
by
 
human-verifiable
 
non-AI
 
evidence.
 
Rate
 
traceable
 
underlying
 
sources
 
separately.
Confidence stated by source:
Claims relevant to customer:
Indicators included:
TTPs included:
Actor labels:
Handling restrictions:
Expiration or review date:
Analyst notes:
```

*Source rating definitions, combined notation standard, CTI-specific examples, and AI-generated source constraints:*[*Part 1 → Source Reliability and Information Credibility*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*.*

### AI Pre-Screening Checklist

Complete this checklist for every source before submitting it to any AI workflow. If any item is marked YES, the source requires legal/privacy review before AI processing. This applies regardless of whether the source is publicly available.

- **Does the source contain named individuals (full names, usernames, handles traceable to a person)?**— Action if YES: Legal/privacy review required before any AI workflow. Record review decision and approver in AI Use Log.

- **Does the source contain email addresses, phone numbers, or other direct personal identifiers?**— Action if YES: Legal/privacy review required before any AI workflow. Record review decision and approver in AI Use Log.

- **Does the source contain organizational details (org charts, internal role titles, internal system names) that could identify individuals indirectly?**— Action if YES: Legal/privacy review required before any AI workflow. Record review decision and approver in AI Use Log.

- **Does the source contain active incident evidence, employee communications, or HR-adjacent data?**— Action if YES: Legal/privacy review required before any AI workflow. Record review decision and approver in AI Use Log.

If all checks are NO, proceed to AI Usage below. If any check is YES and legal/privacy review is not yet complete, the source must be held in the source register with status “Pending privacy review” until the review is recorded and the approver is named in the AI Use Log.

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*Y-f_c08-cydgCYOOIgD0pw.png)

**Allowed:**

- summarize reports;

- extract IOCs, TTPs, victimology, malware, infrastructure, and claims;

- separate source-observed facts from source assessments;

- generate first-pass relevance mapping.

**Not allowed:**

- treat AI extraction as complete;

- merge actor labels without analyst review;

- promote IOCs automatically.

*Part 2B tools:*[*AI Workflow 1: Source Extraction*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 1: Source Claim Extraction*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Source-access test:**The source’s access is described: telemetry, malware analysis, IR, government statement, or secondary reporting.

- **Source-rating test:**Every external claim has Source Reliability and Information Credibility ratings and a combined notation code (e.g., B4) recorded in the Source Register. Any claim flagged as AI-generated without traceable primary evidence is rated F6; any traceable underlying source is rated separately on its own merits (see Part 1 §Rating AI-Generated Intelligence).

- **Inter-rater calibration test:**At least one priority source per Phase 4 close has been independently rated by two analysts; any disagreement of more than one letter or one number has been resolved and the resolution rationale recorded.

- **Claim separation test:**Facts, assessments, and inferences are separated.

- **Relevance test:**Each source maps to a customer PIR, crown jewel, sector, technology, or threat scenario.

- **Recency test:**Publication date and activity window are recorded.

- **Indicator risk test:**Shared infrastructure, stale indicators, sinkholes, CDNs, and legitimate services are flagged.

- **Handling test:**TLP or sharing restrictions are recorded.

- **Contradiction test:**Conflicting claims are added to the Contradiction Register.

- **Regulated data test:**If source content contains personal data, regulated records, employee-related data, or active incident evidence, the legal/privacy owner re-reviews before the source is used in AI-assisted workflows. The review decision and approver are recorded in the AI Use Log before any AI workflow processes this source.

- **Chain integrity:**At least one primary output from this phase (validated source, IOC, or TTP extraction) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Observable**node are logged as collection gaps or context items, not closed deliverables.

### Exit Criteria

- Validated source register.

- Relevance matrix.

- IOC review queue.

- TTP extraction table.

- Rejected or low-value sources documented.

- Evidence Register updated.

- Contradiction Register updated where needed.

### Threat Actor Disambiguation and Tracking Protocol

Actor labels are treated as source claims, not facts. Maintain a separate tracking note when multiple sources use different labels for similar activity.

Required fields:

```text
Actor tracking ID:
Source label:
Source:
Evidence basis:
Overlap with other labels:
Differences from other labels:
Confidence:
Assessment:
Status:
 
candidate
 
/
 
tracked
 
separately
 
/
 
merged
 
for
 
reporting
 
/
 
rejected
Review date:
```

**Rules:**

- Do not merge vendor labels unless the evidence basis is documented.

- Preserve source-specific labels in the Evidence Register.

- Use “activity cluster” or “unknown actor” when attribution is not needed for defensive action.

- Actor label collisions must be added to the Contradiction Register if they affect priority, reporting, or response.

### IOC Blocking Risk Assessment

![Article image](https://cdn-images-1.medium.com/max/800/1*IrYe5iytB_Ez0iOKCAVT-Q.png)

No IOC may be recommended for blocking until this assessment is complete.

Minimum enrichment:

- source and original context;

- first seen and last seen;

- source reliability and information credibility;

- customer sightings;

- passive DNS or hosting context where available;

- shared infrastructure risk;

- legitimate service or CDN risk;

- business owner impact review for domains, IPs, and SaaS endpoints;

- expiry date and rollback owner.

**Blocking decision:**

```text
IOC:
Recommended action:
Blocking rationale:
Operational risk:
Expected blast radius:
Blast radius tier:
Customer sightings:
Approval owner:
Rollback procedure:
Expiry date:
Review date:
```

**Blast radius tiers and minimum approval requirements:**

- **Tier 1: Single host or confirmed threat IP**— Description: One known malicious IP or host with no shared hosting; customer sightings confirmed — Minimum Approval: One named approver (CTI lead or detection engineer)

- **Tier 2: Domain, IP range, CDN endpoint, or shared hosting**— Description: Block may affect multiple services or unknown tenants — Minimum Approval: Customer security lead sign-off and documented blast radius review

- **Tier 3: SaaS platform, cloud service endpoint, or multi-business-unit dependency**— Description: Block may affect production integrations, external partners, or cross-org dependencies — Minimum Approval: Customer security lead, platform owner, and business owner; formal change request required

**Any block without confirmed customer sightings requires customer security lead approval regardless of tier.**

**Actions:**

```text
Observe / Enrich / Hunt / Detect / Block / Do 
not
 
use
 / Expired
```

## IOC Emergency Unblock Procedure

An emergency unblock is required when a blocked IOC is generating confirmed false positives that are impacting production operations, or when new intelligence demonstrates the IOC is no longer attributable to threat activity.

**Trigger criteria (any one is sufficient):**

- confirmed business-impacting false positive with blast radius affecting production;

- intelligence update from a Tier A–B source reclassifying the IOC as benign or expired;

- customer sightings drop to zero and TTL has elapsed without refresh;

- blocking causes outage to Tier 1 business system.

**Emergency unblock request fields:**

```text
IOC:
Trigger criteria met:
Business impact of continued block:
Requester name and role:
Emergency approver name and role:
New intelligence or evidence supporting unblock:
Interim mitigation while block remains active:
Unblock action timestamp:
Post-unblock monitoring period:
Follow-up review date:
```

**Approval path:**

- Tier 1 block: CTI lead or detection engineer may approve unblock within 1 hour.

- Tier 2 block: Customer security lead approval required before unblock is executed.

- Tier 3 block: Customer security lead + platform owner required; change request must be updated before execution.

**Post-unblock obligations:**

- Update the IOC Review Register entry with unblock timestamp, approver, and reason.

- Open a Contradiction Register entry (CON-xxx) if the unblock reveals a sourcing or enrichment error.

- Schedule follow-up review within 5 business days to determine whether the IOC should be reclassified as “Do not use” or “Expired” in the register.

## Phase 5: Threat Scenario Development

### Objective

Build customer-specific threat scenarios that connect external CTI, customer assets, business impact, and telemetry.

### Scenario Template

```text
Scenario ID:
Scenario name:
Customer decision supported:
Decision ID:
Relevant PIRs:
Threat actor or actor class:
Motivation:
Targeted crown jewels:
Likely initial access:
Likely capabilities:
Likely infrastructure:
Likely victim path:
Potential impact:
Required telemetry:
Current visibility:
Existing controls:
Detection opportunities:
Hunt opportunities:
Collection gaps:
Business impact score:
Likelihood score:
Risk score:
Defensive relevance score:
Detection feasibility score:
Engineering priority score:
Priority label:
Confidence:
Priority:
```

### Required Modeling Views

Each priority scenario must be represented in:

- Diamond Model;

- Kill Chain or intrusion lifecycle;

- MITRE ATT&CK techniques;

- defensive countermeasures;

- telemetry requirements;

- detection and hunt opportunities.

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*ccJGT_iOQvchVtFyZ9fsvw.png)

**Allowed:**

- generate scenario drafts from validated source and customer inputs;

- propose ATT&CK techniques;

- propose Diamond Model structure;

- identify missing evidence and collection gaps.

**Not allowed:**

- invent customer exposure;

- infer actor intent beyond evidence;

- assign high priority without risk owner review.

*Part 2B tools:*[*AI Workflow 3: Threat Scenario Drafting*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 5: Threat Scenario Builder*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Gate B: Scenario Approval*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Customer relevance:**Scenario maps to at least one crown jewel and PIR.

- **Evidence support:**Scenario cites validated sources or customer observations.

- **Visibility test:**Required telemetry is identified and scored.

- **Actionability test:**Scenario creates at least one hunt, detection, control, or decision.

- **Alternative test:**At least one plausible alternative or limitation is documented.

- **Priority test:**Priority is based on likelihood, impact, and detectability, not fear.

- **Score test:**Risk Score and Engineering Priority Score use the approved formula and cite Evidence IDs.

- **Decision test:**Scenario maps to at least one Decision ID.

- **High-risk remediation test:**Any scenario with Risk Score ≥ 20 and Detection Feasibility &lt; 3 has a documented telemetry remediation plan, control recommendation, or architecture decision linked to a Collection Gap ID or Decision ID.

- **Telemetry map retroactive update:**Any log source newly identified as critical during scenario development is added to the telemetry map and, if not previously inspected, has sample events inspected or an inspection task open in the gap register.

- **Chain integrity:**At least one primary output from this phase (threat scenario) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Scenario**node are logged as collection gaps or context items, not closed deliverables.

### Exit Criteria

- Approved threat scenario register.

- Top scenarios ranked.

- Scenario-to-detection matrix started.

- Risk and engineering priority scores approved or challenged by risk owner.

- Telemetry map updated to reflect any log sources first identified as critical during scenario development.

## Phase 6: Hypothesis-Driven Threat Hunting Backlog

### Objective

Convert scenarios into testable hunt hypotheses.

### Hunt Hypothesis Format

```text
Hunt ID:
Hypothesis:
Scenario:
PIR/SIR:
ATT&CK
 
technique:
Diamond feature focus:
Expected observable:
Required data sources:
Query approach:
Time window:
Expected benign causes:
Escalation threshold:
Evidence to collect:
Result:
Result classification:
Follow-up action:
```

### Good Hypothesis

```text
If
 an adversary 
is
 
using
 valid credentials 
for
 cloud control-plane access,
then
 we may observe privileged role assignment 
or
 service-principal credential changes
outside approved change windows, followed 
by
 access 
to
 backup, logging, 
or
 production resources.
```

### Weak Hypothesis

```text
Look 
for
 
APT
 activity.
```

### Hunt Result Classification

- **Positive finding:**Evidence supports the hypothesis.

- **Negative with good visibility:**No evidence found and telemetry was sufficient for the scoped question.

- **Negative with weak visibility:**No evidence found but telemetry was insufficient.

- **Inconclusive:**Query, data, time window, or scope limitations prevent judgment.

- **Rejected hypothesis:**Hypothesis is not relevant, not testable, or based on invalid assumptions.

Negative results must not be written as “no compromise” unless the visibility, scope, and time window justify that conclusion.

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*O9kDRneVLPxXQ3OIezM00Q.png)

**Allowed**:

- generate candidate hypotheses from approved scenarios;

- propose expected observables;

- suggest benign explanations;

- draft initial pseudo-query logic.

**Not allowed:**

- mark a hypothesis as tested;

- decide suspiciousness without reviewing customer baseline.

*Part 2B tools:*[*AI Workflow 4: Hunt Hypothesis Generation*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 6: Hunt Hypothesis Generator*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Gate C: Hunt Approval*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Falsifiability:**The hypothesis can be tested and can fail.

- **Observable test:**Expected observables are defined in available logs.

- **Baseline test:**Benign and expected administrative behavior is documented.

- **Escalation test:**Thresholds for case creation are defined.

- **Repeatability test:**Another analyst can run the hunt from the documentation.

- **Result classification test:**The hunt has approved result categories before execution.

- **Chain integrity:**At least one primary output from this phase (hunt hypothesis or query) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Hunt/Detection**node are logged as collection gaps or context items, not closed deliverables.

### Exit Criteria

- Prioritized hunt backlog.

- Queries or pseudo-queries drafted.

- Data-source owners confirmed.

- Hunt execution schedule approved.

- Negative and inconclusive result handling defined.

## Phase 7: Detection Engineering Design

### Detection Engineering Operational Controls

### Detection CI/CD Requirements

Detection-as-code must be operated through controlled review and deployment.

- **Branch creation:**Branch or change request links to Detection ID and Scenario ID.

- **Pull request:**CTI and detection engineer review required for threat logic.

- **Static validation:**Schema, metadata, ATT&CK mapping, D3FEND mapping, owner, severity, confidence, and review date checked.

- **Syntax validation:**Target SIEM query compile test required.

- **Unit testing:**Positive, negative, and edge fixtures required.

- **Historical preview:**Expected alert volume and false-positive review required.

- **Staging deployment:**SOC dry-run, alert routing check, and case creation test required.

- **Production deployment:**Owner, rollback, monitoring, review date, and DRL-9 evidence required.

- **Post-deployment monitoring:**Alert volume, rule errors, data-source health, suppression rate, and SOC feedback reviewed.

**Required CI/CD Artifacts**

```text
Pull request ID:
Detection ID:
Scenario ID:
Changed files:
Schema validation result:
Syntax validation result:
Unit test result:
Historical preview result:
Reviewer approvals:
Rollback package:
Deployment target:
Deployment time:
Post-deployment owner:
```

### Multi-SIEM / Multi-Platform Translation Control

When one detection is deployed to multiple platforms, define an authoritative source and track platform-specific differences.

```text
Detection ID:
Authoritative logic source:
Platform implementation IDs:
Platform owner:
Translation owner:
Known semantic differences:
Field mapping differences:
Test evidence per platform:
Last parity review:
```

### Rules:

- Platform-specific implementations must each pass syntax and positive/negative tests.

- A passing Splunk rule does not prove the Elastic, Sentinel, Chronicle, QRadar, or SQL version works.

- Translation differences must be documented before production deployment.

- AI-assisted translation requires human review against customer schema and sample events.

### Emergency Disable Process

Every production detection must have:

- emergency disable owner;

- disable procedure;

- expected customer impact;

- notification path;

- re-enable criteria;

- post-disable review requirement.

Emergency disable owner must be a named SOC lead, platform owner, detection engineering lead, or approved on-call delegate. The owner must be authorized by the customer security lead. The disable procedure must be tested at least annually or during the first production deployment cycle.

### Operational SLAs

SLAs should be adjusted for customer contracts and severity levels, but they must be explicit.

- **Critical detection false-positive review**— SLA: 2 business days — Owner: Detection engineer — Escalation: SOC lead

- **Production rule failure**— SLA: Same business day — Owner: Platform owner — Escalation: Customer security lead

- **Telemetry gap owner assignment**— SLA: 5 business days — Owner: Platform owner — Escalation: Executive sponsor

- **AI output review**— SLA: Before use in deliverable — Owner: Domain owner — Escalation: CTI lead

- **Source extraction review**— SLA: 3 business days — Owner: CTI lead — Escalation: Customer security lead

- **PIR approval**— SLA: 5 business days after workshop — Owner: Executive sponsor — Escalation: Customer security lead

- **Crown-jewel approval**— SLA: 5 business days after workshop — Owner: Business owner — Escalation: Executive sponsor

- **Evidence Register update for key finding**— SLA: 2 business days — Owner: CTI lead — Escalation: Quality reviewer

- **Contradiction affecting production detection**— SLA: Weekly review; resolution plan within 30 days — Owner: CTI lead — Escalation: Customer security lead

- **Pilot tuning decision**— SLA: 5 business days after pilot end — Owner: Detection engineer — Escalation: SOC lead

- **Executive decision response**— SLA: Customer-defined, normally 5–10 business days — Owner: Decision owner — Escalation: Executive sponsor

- **Production rollback for high-noise rule**— SLA: Same business day — Owner: Platform owner — Escalation: Customer security lead

**SLA breach consequence:**

- breach is added to RAID Register;

- gate depending on the breached item is held unless risk owner accepts exception;

- second escalation goes to executive sponsor if unresolved after one additional SLA period;

- critical production issues escalate immediately to customer security lead and executive sponsor.

### Objective

Convert validated threats and hunts into production-quality detections.

### Detection Design Template

```text
Detection ID:
Name:
Status:
 
draft
 
/
 
lab
 
/
 
pilot
 
/
 
production
 
/
 
retired
Detection readiness level:
Use case:
Scenario:
PIR/SIR:
ATT&CK:
D3FEND countermeasure:
Diamond feature:
Evidence IDs:
Log sources:
Required fields:
Canonical field mapping:
Detection logic:
Correlation logic:
Suppression logic:
Severity:
Confidence:
Known false positives:
Tuning inputs:
Test data:
Positive tests:
Negative tests:
Edge cases:
Response playbook:
Owner:
Review date:
Expiry or retirement criteria:
```

### Required Detection Types

![Article image](https://cdn-images-1.medium.com/max/800/1*S8CaBJLPwkEH8HbyY25-rw.png)

Use different detection patterns based on the behavior:

- atomic rule;

- threshold rule;

- sequence rule;

- anomaly rule;

- baseline deviation;

- correlation rule;

- risk-based alerting;

- graph or relationship detection;

- compound incident rule.

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*znAPpR1dmIrcCgYau_OU4w.png)

**Allowed:**

- draft Sigma-like or platform-neutral rule logic;

- translate rule logic into KQL, SPL, EQL, SQL, YARA-L, or platform syntax;

- generate positive and negative test cases;

- propose false-positive categories;

- suggest field normalization mappings.

**Not allowed:**

- deploy rules;

- bypass syntax testing;

- bypass historical preview;

- claim precision or recall without test results.

*Part 2B tools:*[*AI Workflow 5: Detection Drafting*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 7: Detection Logic Draft*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 8: Rule Quality Challenge*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Gate D: Detection Design Approval*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Logic test:**Rule logic matches the stated behavior and does not drift into unrelated activity.

- **Field test:**Every field exists, is parsed, and has expected values.

- **Syntax test:**Query compiles in the target platform.

- **ATT&CK quality test:**Mapping includes technique, sub-technique where available, platform, mapping type, observable, data source, and evidence.

- **D3FEND test:**Countermeasure mapping explains the defensive control or gap.

- **Positive test:**Rule fires on known or simulated malicious behavior.

- **Negative test:**Rule does not fire on known benign activity.

- **Historical preview:**Rule is tested against historical data before production.

- **False-positive review:**Expected false positives are documented and routed.

- **Severity review:**Severity reflects impact, confidence, and response urgency.

- **Playbook link:**SOC triage steps are attached.

- **Chain integrity:**At least one primary output from this phase (detection design or detection logic) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Detection**node are logged as collection gaps or context items, not closed deliverables.

### Exit Criteria

- Detection design approved.

- Target platform selected.

- Test plan approved.

- SOC workflow drafted.

- Initial Detection Readiness Level assigned.

## Phase 8: Detection-as-Code Implementation

### Objective

Implement detections with version control, review, testing, and deployment discipline.

### Repository Structure

```text
detections
/
  cloud
/
  
identity
/
  endpoint
/
  network
/
  email
/
  application
/
tests
/
  positive
/
  negative
/
  edge
/
docs
/
  playbooks
/
  data_sources
/
  false_positives
/
metadata
/
  attack_mapping.yml
  data_source_mapping.yml
  owners.yml
```

### Detection File Requirements

Each detection must include:

- stable ID;

- name;

- description;

- author;

- owner;

- status;

- version;

- date created;

- date reviewed;

- data sources;

- required fields;

- rule logic;

- ATT&CK mapping;

- severity;

- confidence;

- known false positives;

- test cases;

- response playbook link;

- changelog.

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*7em6CtyR1w3DyYowkGrDag.png)

**Allowed:**

- draft detection files from approved design;

- propose metadata completion;

- translate platform-neutral logic to target syntax;

- generate documentation.

**Not allowed:**

- commit without human review;

- invent test evidence;

- change production severity without approval.

*Part 2B tools:*[*AI Workflow 5: Detection Drafting*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*AI Workflow 6: Query Translation*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 7: Detection Logic Draft*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Schema test:**Detection file matches required schema.

- **Metadata test:**Owner, status, severity, confidence, data source, and mapping fields are complete.

- **Lint test:**Detection follows repository style.

- **Unit test:**Detection logic passes defined test fixtures.

- **Peer review:**CTI and detection engineer approve.

- **Deployment test:**Rule imports into target platform without error.

- **DRL test:**Detection Readiness Level is updated only when evidence supports the transition.

- **Chain integrity:**At least one primary output from this phase (committed detection or test result) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Detection**node are logged as collection gaps or context items, not closed deliverables.

### Exit Criteria

- Detection committed to version control.

- Tests passing.

- Reviewer approval recorded.

- Deployment plan approved.

- Detection Health Register entry created.

## Phase 9: Test Data, Simulation, and Replay

### Objective

Prove detections work before relying on them.

### Test Types

- **Positive test:**Confirm detection fires when target behavior occurs.

- **Negative test:**Confirm detection does not fire on common benign behavior.

- **Edge test:**Confirm detection handles missing fields, unusual values, time zones, and partial sequences.

- **Historical test:**Measure expected alert volume and false positives.

- **Replay test:**Validate detection against known attack datasets or controlled simulated logs.

- **Purple-team test:**Validate detection against executed adversary emulation.

- **Regression test:**Confirm rule changes do not break previous expected behavior.

### Minimum Test Evidence

```text
Detection ID:
Test date:
Tester:
Data source:
Test type:
Input event or dataset:
Expected result:
Actual result:
Pass/fail:
Screenshots or query output:
Notes:
Reviewer:
Synthetic event used:
Real sample event reference:
Field names match customer schema:
 
yes
/no
Values match expected platform encoding:
 
yes
/no
Validated by:
```

### Purple-Team Test Requirements

A purple-team test executes the adversary technique in a controlled environment against the production or near-production detection stack to confirm the detection fires on real execution, not only on synthetic inputs.

**When required:**

- Mandatory for any detection mapped to a scenario with Risk Score ≥ 20 before DRL-9 promotion.

- Required for Tier 1 crown-jewel attack paths regardless of Risk Score.

- Required when the positive test passed on a synthetic event only (no real-environment execution validated).

**Minimum test record:**

```text
PT ID:
Detection ID:
ATT&CK
 
Technique:
Execution method:
 [
manual
 
/
 
automated
 
emulation
 
/
 
attack
 
simulation
 
tool
]
Tool used:
Test environment:
 [
isolated
 
lab
 
/
 
staging
 
/
 
production-isolated
]
Test date:
Executed by:
Approved by:
Detection fired:
 
yes
 
/
 
no
Alert generated:
 
yes
 
/
 
no
Alert severity matched expected:
 
yes
 
/
 
no
False negative occurred:
 
yes
 
/
 
no
If
 
false
 
negative
 
—
 
root cause and RAID entry:
Result:
 [
pass
 
/
 
conditional
 
pass
 
/
 
fail
 
—
 
tuning
 
gap
 
/
 
fail
 
—
 
false
 
negative
 
/
 
deferred
]
Reviewer:
Notes:
```

**Result classifications:**

- **Pass:**Detection fired on first clean execution; alert severity and content match expected behavior.

- **Conditional pass:**Detection fired but required tuning (timing, field values); documented and retested before DRL-9 promotion.

- **Fail — tuning gap:**Detection fired with incorrect field enrichment or miscategorized severity; tuning documented with dated resolution plan.

- **Fail — false negative:**Detection did not fire on confirmed execution. False-Negative Register entry required; DRL demotion to DRL-5 until root cause is resolved and test is re-run.

- **Deferred:**Technique cannot be safely executed in any available environment. A RAID Register entry is required; approved alternative evidence (controlled capture replay or vendor confirmation) must be documented before DRL-9 promotion is eligible.

All purple-team test records must be stored in the Purple-Team Test Register (*Part 2B → Purple-Team Test Register*) and referenced in the Gate E evidence pack before DRL-9 promotion.

### Synthetic Event Validation

Synthetic events may be used only after validation against at least one real sample event from the same log source.

Validation requirements:

- field names match the Customer Detection Data Model;

- timestamp format matches real events;

- event action names match real platform values;

- user, host, IP, resource, and result fields match real normalization;

- command-line, URL, JSON, or cloud-action encoding matches target platform behavior;

- validation owner is recorded in test evidence.

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*LrPFsFMAS10yTLkbO1PsHQ.png)

**Allowed**:

- generate synthetic test events;

- generate negative test cases;

- identify missing test coverage;

- summarize test outcomes.

**Not allowed:**

- treat synthetic tests as proof of real-world precision;

- fabricate screenshots or query results;

- approve production readiness.

*Part 2B tools:*[*AI Workflow 7: Test Case Generation*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 8: Rule Quality Challenge*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Positive evidence:**At least one positive test passes.

- **Negative evidence:**At least one negative test passes.

- **Historical volume:**Expected alert volume is acceptable or tuning is documented.

- **Edge handling:**Missing fields or partial data do not create uncontrolled alerting.

- **Reviewer signoff:**Detection engineer and SOC lead approve pilot.

- **Readiness update:**DRL is updated based on passed tests only.

- **Synthetic validation:**Any synthetic event is validated against real sample event and customer schema.

- **Purple-team coverage:**Any detection for a technique with Risk Score ≥ 20 has a purple-team test result on record in the Purple-Team Test Register, or a RAID Register entry documenting the operational constraint that prevents live execution, with an approved alternative evidence approach and a dated resolution target before DRL-9 promotion.

- **Chain integrity:**At least one primary output from this phase (test evidence record) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Test**node are logged as collection gaps or context items, not closed deliverables.

### Exit Criteria

- Test evidence stored.

- Rule tuned or rejected.

- Pilot deployment approved.

- Detection Health Register updated with last tested date and known limitations.

## Phase 10: SOC Triage and Incident Workflow

### Objective

Ensure detections produce actionable cases, not unexplained alerts.

### SOC Playbook Template

```text
Alert name:
Purpose:
Why this matters:
Severity:
Confidence:
Required evidence:
First 15-minute triage:
Enrichment steps:
Benign explanations:
Escalation criteria:
Containment criteria:
Evidence preservation:
Customer contacts:
Related detections:
Related hunts:
Closure criteria:
Feedback fields:
```

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*emkeEYucVD4VPtJxGyrS5w.png)

**Allowed:**

- draft playbook steps from approved detection design;

- create analyst-friendly summaries;

- propose enrichment steps;

- generate closure notes from validated case facts.

**Not allowed:**

- recommend containment without escalation criteria;

- auto-close alerts;

- generate incident conclusions from incomplete facts.

*Part 2B tools:*[*AI Workflow 8: SOC Playbook Drafting*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 9: SOC Playbook Draft*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Analyst usability:**SOC analyst can follow the playbook without CTI context.

- **Evidence test:**Required evidence fields are available in the alert or linked searches.

- **Escalation test:**Escalation criteria are clear and measurable.

- **Benign test:**Common false positives are included.

- **Closure test:**Closure categories capture true positive, benign true positive, false positive, duplicate, and insufficient evidence.

- **DRL test:**Detection cannot exceed DRL-7 until SOC playbook is approved.

- **Chain integrity:**At least one primary output from this phase (SOC playbook or closure procedure) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**SOC Action**node are logged as collection gaps or context items, not closed deliverables

### Exit Criteria

- SOC playbook approved.

- Case fields configured.

- Escalation contacts confirmed.

- Feedback loop enabled.

## Active Compromise Escalation Protocol

If a hunt, detection, source review, or workshop uncovers credible evidence of active compromise, the project must pause the affected workstream and transition to incident handling.

![Article image](https://cdn-images-1.medium.com/max/800/1*uY6lwAu9jLiF1yGymJTYSA.png)

**Escalation triggers:**

- confirmed unauthorized privileged access;

- active command-and-control traffic;

- destructive or recovery-inhibiting activity;

- confirmed data exfiltration;

- active malware execution on in-scope assets;

- suspicious access to regulated or crown-jewel data;

- customer security lead declares incident mode.

**Required actions:**

- Stop non-essential analysis on the affected evidence.

- Preserve logs, queries, screenshots, sample events, and chain-of-custody notes where required.

- Notify customer security lead, IR lead, SOC lead, and legal/privacy owner if regulated or personal data is involved.

- Create or update incident ticket.

- Mark related project deliverables as paused or incident-dependent.

- Do not run AI workflows on active incident evidence unless explicitly approved by IR lead and legal/privacy owner.

- Resume project work only after the IR lead defines what can continue.

**Non-essential analysis scope decision table:**

- **Compromise is confined to systems not in project scope:**Continue project work with notification to customer security lead. Log escalation record.

- **Compromise affects in-scope systems but not the monitoring or logging plane:**Pause all analysis on affected systems. Confirm continuation of work on unaffected systems explicitly with the IR lead. Do not use evidence from affected systems in detections or reports until cleared.

- **Compromise affects the monitoring, logging, or SIEM plane:**Assume integrity of all evidence captured during or before the incident window is uncertain. Pause all active engineering and hunting work. Resume only after IR lead and platform owner confirm log integrity and provide a cleared evidence start date.

- **Scope is unknown:**Default to treating all in-scope evidence as uncertain until IR lead defines the boundary.

**Escalation record:**

```text
Escalation ID:
Trigger:
Evidence IDs:
Affected systems:
Notified owners:
Incident ticket:
Project work paused:
AI restriction:
Resume criteria:
Status:
```

## Phase 11: Pilot Deployment and Tuning

### Objective

Run detections in controlled mode before full production.

### Pilot Rules

- Pilot duration must be defined.

- Alert routing must be agreed.

- Alert volume must be measured.

- False positives must be categorized.

- Tuning changes must be version controlled.

- Critical misses must trigger redesign.

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*8I_2EsP1k0tGHS-ru5Qvug.png)

**Allowed:**

- summarize pilot alert patterns;

- cluster false positives;

- propose tuning options;

- draft tuning change notes.

**Not allowed:**

- suppress alerts without human approval;

- change rule logic without review;

- optimize only for low alert volume if it harms detection value.

*Part 2B gate:*[*Gate E: Production Approval*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Volume test:**Alert rate is operationally manageable.

- **Precision review:**False-positive categories are understood and tunable.

- **Coverage test:**Detection still covers target behavior after tuning.

- **SOC feedback:**SOC analysts confirm triage instructions are usable.

- **Owner approval:**Detection owner approves production promotion.

- **Health metrics test:**Alert volume, FP rate, TP count, rule errors, data-source health, and suppression rate are recorded.

- **Labeling progress check:**By Day 3 of the pilot, SOC labeling completeness is on track to reach 80% by pilot end, or a corrective action is documented. If labeling completeness is below 60% at Day 3, the SOC lead must be notified and a recovery plan (SOC briefing, alert routing review, analyst time allocation) documented before the pilot continues.**For low-frequency detections**documented as such per the DRL-7 to DRL-8 transition guidance, where zero alerts have been generated by Day 3: the labeling completeness check does not apply. Instead, confirm at Day 3 that SOC analysts have reviewed the playbook, alert routing is confirmed active, and a notification path exists for when alerts arrive. Record this confirmation in the Detection Health Register as “labeling check deferred: zero alerts at Day 3, SOC readiness confirmed.”

- **Chain integrity:**At least one primary output from this phase (pilot alert label or tuning record) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Test**node are logged as collection gaps or context items, not closed deliverables.

### Exit Criteria

- Production or retirement decision made.

- Tuning rationale documented.

- Known limitations documented.

- Review date set.

- Detection Health Register updated.

## Phase 12: Production Deployment

### Objective

Move validated detections and workflows into production operations.

### Production Readiness Checklist

```text
Detection logic validated:
Positive tests passed:
Negative tests passed:
Historical preview completed:
False positives documented:
SOC playbook approved:
Severity approved:
Owner assigned:
Rollback plan defined:
Monitoring enabled:
  
-
 
Data
 
source
 
silence
 
alert
 
configured
 
(triggers
 
if
 
source
 
stops
 
producing
 
events
 
for
 
more
 
than
 
24
 
hours):
  
-
 
Zero-alert
 
baseline
 
alert
 
configured
 
(triggers
 
if
 
rule
 
produces
 
zero
 
alerts
 
beyond
 
the
 
established
 
baseline
 
window):
  
-
 
Scheduled
 
review
 
date
 
confirmed
 
(calendar
 
entry
 
for
 
next
 
review
 
exists
 
and
 
owner
 
is
 
assigned):
Emergency disable procedure confirmed:
  
-
 
Disable owner named and authorized by customer security lead:
  
-
 
Disable steps tested or test scheduled within first production deployment cycle:
Detection health entry created:
Review date assigned:
```

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*doXx_KteOjSbV-HFrp1l1A.png)

**Allowed:**

- create production release notes;

- summarize detection value;

- draft executive update;

- create maintenance checklist.

**Not allowed:**

- approve deployment;

- hide limitations;

- remove review dates.

*Part 2B gate:*[*Gate E: Production Approval*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*30/60/90-Day Execution Plan*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Deployment test:**Rule is active in production and firing path is confirmed.

- **Case creation test:**Alert creates a case or ticket as designed.

- **Notification test:**Required owners receive notifications.

- **Rollback test:**Rollback steps are documented and executable.

- **Monitoring test:**Detection health is monitored.

- **DRL-9 test:**Owner, monitoring, review date, rollback, test evidence, and SOC playbook are complete.

- **Chain integrity:**At least one primary output from this phase (production deployment record) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Decision**node are logged as collection gaps or context items, not closed deliverables.

### Exit Criteria

- Detection live.

- SOC informed.

- Executive or security lead notified if relevant.

- Detection health monitoring started.

- Detection marked DRL-9 only if all production criteria are met.

## Phase 13: Executive and Technical Reporting

### Objective

Report outcomes in decision language, not activity language.

### Executive Report Template

```text
Reporting period:
Top customer decisions supported:
Key judgments:
Threat scenarios prioritized:
New detections deployed:
Detection
 
Work-in-Progress
 
(WIP)
 
pipeline:
Hunts completed:
Confirmed findings:
Rejected hypotheses:
Coverage improvements:
Remaining collection gaps:
Business risks requiring decision:
Next 30 days:
```

### Detection Work-in-Progress (WIP) Metric

The WIP metric communicates forward progress on detection engineering without violating the rule that only DRL-7+ detections count as operational coverage. It shows the customer that detection engineering is moving toward coverage — not that coverage exists.

**WIP reporting format:**

```text
WIP pipeline 
summary
 (as of 
[date]
):
| Detection ID | Name | Scenario | DRL | Stage Label | Blocking Issues |
|--------------|------|----------|-----|-------------|-----------------|
| DET-
002
      |      |          | 
4
   | Testing     |                 |
| DET-
003
      |      |          | 
3
   | Lab         |                 |
| DET-
004
      |      |          | 
6
   | Preview     |                 |
```

**Stage labels by DRL:**

- DRL 2–3:**Lab**— logic drafted and fields confirmed; not yet tested

- DRL 4–5:**Testing**— positive and/or negative tests in progress or passing

- DRL 6:**Preview**— historical preview completed; false-positive volume known; awaiting SOC playbook

- DRL 7:**Pilot-Ready**— SOC playbook approved; ready for pilot deployment

- DRL 8:**Pilot**— running in pilot; tuning in progress

- DRL 9:**Production**— deployed with owner, monitoring, rollback, and review date

**WIP rules:**

- WIP detections at DRL 2–6 must not be cited as “coverage” or “deployed detections” anywhere in the executive report.

- WIP counts may be cited as “engineering progress” or “detections in pipeline” with clear stage labels.

- Blocking issues in the WIP table must name the obstacle (missing telemetry, schema gap, test data unavailable) — not leave the field blank.

- The WIP pipeline is an informational supplement to the coverage report. It does not replace the Detection Coverage Gap Register, which remains the authoritative statement of covered and uncovered techniques.

- A detection that has been in the WIP pipeline at the same DRL for more than 30 days without a documented blocker must be reviewed by the CTI lead and detection engineer and either advanced or moved to Deferred with a rationale.

### Technical Report Template

```text
Scenario:
Evidence:
Telemetry:
Detection logic:
Tests:
Results:
False positives:
Tuning:
SOC workflow:
Gaps:
Next engineering work:
```

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*e-YlaqjXMDsAhkPowfOvPA.png)

**Allowed**:

- draft reports from approved evidence and metrics;

- create audience-specific summaries;

- convert technical findings into executive language;

- identify unsupported claims before publication.

**Not allowed:**

- create new claims not present in evidence;

- remove uncertainty;

- change severity without owner approval.

*Part 2B tools:*[*AI Workflow 9: Report Drafting*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Task Card 10: Executive Report Draft*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Gate F: Final Delivery Approval*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Final Customer Delivery Package*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Evidence traceability:**Every key judgment links to evidence or test results.

- **Decision clarity:**Executive report states decisions needed.

- **No metric theater:**Metrics show defensive value, not just activity counts.

- **Gap visibility:**Remaining limitations are visible.

- **Approval:**CTI lead, detection lead, and customer security lead approve within 5 business days of report delivery, or a documented objection is filed with a resolution path.

- **Chain integrity:**At least one primary output from this phase (executive report, technical report, or metric) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Metric**node are logged as collection gaps or context items, not closed deliverables.

**Report approval SLA:**Approvers have 5 business days from report delivery to approve or document a specific objection. Silence past 5 business days is escalated to the executive sponsor.

**Analytic conflict resolution:**If the CTI lead and the customer security lead disagree on a key judgment’s framing or confidence, the executive sponsor makes the final framing decision. The CTI lead records the analytic disagreement, the business framing decision, and the rationale in the RAID Register. The analytic judgment remains on record even if the executive-facing language is adjusted.

### Exit Criteria

- Executive report delivered.

- Technical report delivered.

- Approvals received or objections resolved within SLA.

- Decisions and actions tracked.

- Analytic conflicts, if any, recorded in RAID Register.

- If an analytic conflict was recorded in the RAID Register, the Customer Acceptance Record must reference the RAID Register entry ID before Phase 13 is closed. Record the RAID entry ID in the Conditions / Exceptions field of the Customer Acceptance Record row for the executive report deliverable. This ensures the customer’s signed acceptance reflects awareness of any unresolved analytic disagreement rather than implying full consensus on all judgments.

## Phase 14: Continuous Improvement and Maturity Loop

### Objective

Make CTI and detection engineering a repeatable operating cycle.

### Monthly Review Questions

- Which PIRs were answered?

- Which PIRs changed?

- Which detections produced useful cases?

- Which detections produced noise?

- Which hunts found meaningful evidence?

- Which threat scenarios became more or less relevant?

- Which telemetry gaps blocked analysis?

- Which sources were useful?

- Which AI outputs failed validation?

- Which playbooks need revision?

### PIR Feedback Loop

![Article image](https://cdn-images-1.medium.com/max/800/1*JgMikTqdJe5KBfjOz0VqYw.png)

The PIR Feedback Loop is the structured process by which findings from the current cycle directly shape the intelligence requirements for the next. It closes the gap between delivery and decision-making and prevents PIRs from drifting into static, unreviewed placeholders.

**At the end of each delivery cycle, before the next cycle begins:**

- **Review each PIR in the PIR Register.**Classify each as: Answered (key judgment delivered and accepted), Partially Answered (evidence gathered but confidence insufficient), Unanswered (insufficient collection), or Expired (decision no longer relevant).

- **For each Answered PIR:**Record the decision it supported in the Decision Register. If the consumer acted on the judgment, note the outcome. Close the PIR in the register.

- **For each Partially Answered PIR:**Determine whether to carry forward as-is, revise the question, reduce scope, or escalate collection priority. Create or update corresponding SIRs.

- **For each Unanswered PIR:**Identify whether the failure was a collection gap, a scope problem, or an irrelevant question. If a collection gap: create or update a Collection Gap Register entry. If irrelevant: retire the PIR with a rationale.

- **For each Expired PIR:**Archive with rationale. Do not carry expired PIRs into the next cycle.

- **Identify new intelligence gaps**surfaced during the cycle: missed detections, threat scenarios that emerged without prior PIR coverage, crown jewels with no collection. Draft new PIRs for the next cycle using the PIR quality criteria in Part 1.

- **Review the cycle’s Contradiction Register.**For each unresolved contradiction, determine whether it should generate a new PIR or SIR in the next cycle.

- **Present the revised PIR set to the executive sponsor and customer security lead for approval before the next cycle begins.**PIRs carried into the next cycle without re-approval are treated as stale.

**Minimum output of the PIR Feedback Loop:**

- Updated PIR Register (Answered/Retired/Carried Forward/New status for every entry)

- New SIRs for carried-forward PIRs with revised collection approaches

- Collection gap closure targets for unanswered PIRs

- Decision Register updated with final outcomes for answered PIRs

- Next-cycle PIR set approved by executive sponsor

### Metrics

**Minimum required metrics:**

- **Top scenario detection/hunt coverage**— Data source: Scenario Register, Detection Backlog, Hunt Backlog — Frequency: Every two weeks — Minimum data quality: Scenario IDs and detection/hunt IDs linked — Review trigger: Coverage below Phase 0 target

- **Critical crown jewels with mapped telemetry**— Data source: Crown-Jewel Map, Telemetry Map — Frequency: Every two weeks — Minimum data quality: Business owner and platform owner assigned — Review trigger: Any critical crown jewel lacks telemetry map

- **Collection gaps closed**— Data source: Collection Gap Register — Frequency: Weekly — Minimum data quality: Gap owner and status updated — Review trigger: No progress for 2 weeks

- **Detections passing positive and negative tests**— Data source: Test Evidence, Detection Health Register — Frequency: Weekly during engineering — Minimum data quality: Test evidence reviewed — Review trigger: Detection stuck below DRL-5

- **Pilot alert volume and labeling**— Data source: SIEM, case management, SOC feedback — Frequency: Weekly during pilot — Minimum data quality: SOC labels at least 80% of pilot alerts — Review trigger: Labeling below 80% or volume exceeds threshold

- **Mean time to triage**— Data source: Case management — Frequency: Weekly in pilot/production — Minimum data quality: Case timestamps populated and labeling completeness is at least 80% for the measured period — Review trigger: SLA breach

- **AI output rejection rate**— Data source: AI Use Log — Frequency: Weekly — Minimum data quality: AI outputs have reviewer and status — Review trigger: Rejection trend increases or unreviewed AI output appears

- **Executive decisions supported**— Data source: Decision Register — Frequency: Every two weeks — Minimum data quality: Decision status and outcome populated — Review trigger: Open decision exceeds deadline

**Optional metrics when data quality supports:**

- percentage of top threat scenarios with at least one tested detection;

- percentage of critical crown jewels with mapped telemetry;

- number of detections passing positive and negative tests;

- mean time from CTI source intake to validated detection;

- false-positive rate by detection;

- alert volume per day or week;

- precision estimate;

- true positive count;

- benign true positive count;

- false negative known cases;

- detection latency;

- mean time to triage;

- mean time to escalate;

- data freshness;

- detection uptime;

- rule execution errors;

- suppression hit rate;

- last successful test date;

- coverage by data source;

- coverage by crown jewel;

- SOC escalation quality;

- number of collection gaps closed;

- number of executive decisions supported;

- number of AI outputs rejected for unsupported claims;

- detection review compliance.

**Avoid weak metrics:**

- number of reports read;

- number of IOCs ingested;

- number of AI prompts run;

- number of ATT&CK techniques mentioned without tested coverage.

## AI Usage

![Article image](https://cdn-images-1.medium.com/max/800/1*wJ6Hq53Yp1dehDrkVbzGgw.png)

**Allowed**:

- trend metrics;

- identify recurring gaps;

- summarize SOC feedback;

- suggest backlog reprioritization.

**Not allowed:**

- define success only from activity metrics;

- hide failed detections;

- suppress critical feedback.

*Part 2B tools:*[*AI Workflow 10: Quality Review*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)*·*[*Gate F: Final Delivery Approval*](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

### Validation Tests

- **Outcome test:**Metrics show defensive improvement.

- **Feedback test:**SOC and platform-owner feedback is incorporated.

- **Drift test:**Detections are reviewed for environment and threat drift.

- **AI quality test:**AI error patterns are tracked and reduced.

- **Backlog test:**Backlog is reprioritized based on risk, evidence, and feasibility.

- **Chain integrity:**At least one primary output from this phase (updated PIR, metric, or backlog item) can be traced forward along the Claim-to-Action Chain defined in Part 1 §Claim-to-Action Chain: Source → Claim → Evidence → Assessment → Customer Relevance → Scenario → Observable → Telemetry → Hunt/Detection → Test → SOC Action → Decision → Metric. Outputs that cannot reach at least the**Metric**node are logged as collection gaps or context items, not closed deliverables.

### Exit Criteria

- Updated backlog.

- Updated PIRs.

- Updated detection status.

- Updated telemetry gaps.

- Next-cycle plan approved.

### Detection Retirement Process

**Retirement triggers:**

- detection is replaced by stronger logic;

- required telemetry no longer exists;

- false-positive cost exceeds value and cannot be tuned;

- threat scenario is no longer relevant;

- detection has zero true positives over 90 days, SOC alert labeling completeness was at least 80% for that period, and there is no risk owner justification;

- platform migration makes rule obsolete.

**Retirement steps:**

- Open retirement request with Detection ID and rationale.

- Confirm affected ATT&CK coverage and scenario coverage. If retirement removes the only DRL-7+ detection for a technique associated with an approved threat scenario, add a new row to the Detection Coverage Gap Register before closing the retirement request.

- Confirm whether replacement detection or control exists.

- Update SOC playbook status.

- Update Detection Backlog and Detection Health Register.

- Notify SOC, platform owner, CTI lead, and customer security lead.

- Record approval in Customer Acceptance Record.

Retired detections must not be counted as active coverage.

## Project Execution Controls

Customer CTI projects need delivery controls, not only analytic controls.

### Weekly Cadence

- **Executive checkpoint**— Participants: Executive sponsor, customer security lead, CTI lead — Required Output: Decisions, blockers, risk acceptance, priority changes, Detection Coverage Gap Register reviewed.

- **CTI working session**— Participants: CTI lead, analysts, customer SMEs — Required Output: Source validation, scenarios, PIR/SIR progress, evidence gaps.

- **Detection engineering session**— Participants: Detection engineer, platform owner, SOC lead — Required Output: Rule status, tests, telemetry blockers, pilot decisions.

- **SOC workflow session**— Participants: SOC lead, IR lead, detection engineer — Required Output: Playbooks, escalation, false positives, case feedback.

- **Quality gate review**— Participants: Quality reviewer, CTI lead, detection engineer, customer security lead — Required Output: Pass/fail decisions for gates and acceptance criteria.

### Change Control

Any change to scope, priority, data handling, production detection logic, severity, or customer-facing judgment must record:

```text
Change ID:
Requested by:
Reason:
Affected deliverables:
Risk:
Decision owner:
Backup decision owner:
Approved / rejected:
Date:
```

If the decision owner does not respond within 4 hours for a critical change, escalation to the backup decision owner and executive sponsor is automatic.

### Out-of-Scope Request Handling

Out-of-scope requests are not silently absorbed. They must be classified:

```text
Accept 
into
 
current
 
scope
 
/
 
Add
 
to
 backlog 
/
 Requires change request 
/
 Reject
```

### Acceptance Criteria

Every deliverable must have:

- named reviewer;

- acceptance criteria;

- evidence required;

- due date;

- status;

- exceptions or conditions.

No deliverable is final until the Customer Acceptance Record is updated.

### Weekly Register Hygiene

Every weekly project checkpoint must review:

- IOC expiry dates and IOCs within 30 days of expiry;

- open contradictions, especially production-affecting contradictions;

- Detection Health Register for DRL demotion triggers;

- AI Use Log for unreviewed outputs;

- Evidence Register entries in “Needs Corroboration” or “Contradicted” status;

- telemetry entries whose last assessed date is older than 45 days;

- Detection Coverage Gap Register for new Gap entries or status changes since the last checkpoint, and to confirm the last reconciliation date is current.

## Master Workflow

![Article image](https://cdn-images-1.medium.com/max/800/1*p5U3BA5ILIEYC9yTd4_tFw.png)

```text
1. Charter and guardrails
   -> 
approved scope, AI policy, success metrics
2. Customer decisions and PIRs
   -> 
PIR/SIR register and collection tasks
3. Crown jewels
   -> 
business-impact and dependency map
4. Telemetry readiness
   -> 
data-source score and collection gap register
5. CTI source validation
   -> 
source
 register, TTPs, IOCs, relevance matrix
6. Threat scenarios
   -> 
ranked customer-specific scenarios
7. Hunt hypotheses
   -> 
testable hunt backlog
8. Detection design
   -> 
detection specifications and 
test
 plan
9. Detection-as-code
   -> 
reviewed rule files and metadata
10. Testing and replay
   -> 
positive, negative, edge, and historical validation
11. SOC workflow
   -> 
triage playbooks and escalation path
12. Pilot and tuning
   -> 
measured alert volume and precision
13. Production deployment
   -> 
live detection with owner and review 
date
14. Reporting and maturity loop
   -> 
decisions, metrics, gaps, next backlog
```

**Continue to Part 2B**for the complete reference toolkit: AI Workflow Library, LLM Task Cards, Strict Quality Gates, Master Registers, the end-to-end Worked Example, and the Final Customer Delivery Package.

[**Customer-Driven AI CTI Project Template:Part 2B: Reference Toolkit**
[From pure CTI to hands-on detection engineering with strict validation gates](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)

## Follow for practical cybersecurity research

If you’re interested in**Offensive security,****AI security, real-world attack simulations, CTI, and detection engineering**— this is exactly what I focus on.

### Stay connected:

→**Subscribe on Medium:**[medium.com/@1200km](https://medium.com/@1200km)
→**Connect on LinkedIn:**[andrey-pautov](https://www.linkedin.com/in/andrey-pautov/)
→**GitHub — tools & labs:**[github.com/anpa1200](https://github.com/anpa1200)
→**Contact:**[1200km@gmail.com](mailto:1200km@gmail.com)
