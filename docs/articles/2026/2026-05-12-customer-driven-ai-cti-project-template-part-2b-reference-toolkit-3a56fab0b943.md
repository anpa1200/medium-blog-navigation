---
title: "Customer-Driven AI CTI Project Template:Part 2B: Reference Toolkit"
description: "From pure CTI to hands-on detection engineering with strict validation gates"
image: "https://cdn-images-1.medium.com/max/800/1*C8s7mebRGm7A7mmzALwq1A.png"
---

# Customer-Driven AI CTI Project Template:Part 2B: Reference Toolkit


![Cover image](https://cdn-images-1.medium.com/max/800/1*C8s7mebRGm7A7mmzALwq1A.png)

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943](https://medium.com/@1200km/customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943)
- **Published:** 2026-05-12
- **Preserved media:** 1 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 70 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### From pure CTI to hands-on detection engineering with strict validation gates

![Article image](https://cdn-images-1.medium.com/max/800/1*C8s7mebRGm7A7mmzALwq1A.png)

## This article is one part of a four-part series covering the full customer-driven AI-CTI project lifecycle.

### Full Workflow Quick Reference

[**Customer-Driven AI CTI Project**
[Full Workflow Quick Reference](2026-05-13-customer-driven-ai-cti-project-c0db3cdc1830.md)

### Part 1:Foundations and methodology

[**Customer-Driven AI CTI Project Template. Part 1: Foundations**
[From pure CTI to hands-on detection engineering with strict validation gates](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)

Covers the foundations: methodology rules, analytic standards, scoring models, governance, roles, and delivery frameworks — the*what*and*why*behind every project decision.

### Part 2A :how to do it

[**Customer-Driven AI CTI Project Template. Part 2A: Phase-by-Phase Execution Guide**
[From pure CTI to hands-on detection engineering with strict validation gates.](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

This is the phase-by-phase execution guide — the*how to do it*, from project charter and guardrails (Phase 0) through continuous improvement and maturity loop (Phase 14), including project execution controls and the master workflow. Part 1 covers the foundations: methodology rules, analytic standards, scoring models, governance, roles, and delivery frameworks.

### Part 2B(this document) is the reference toolkit:

AI Workflow Library, LLM Task Cards, Strict Quality Gates, Master Registers, end-to-end Worked Example, and Final Customer Delivery Package. Read Part 1 first, then use Part 2A as your operational execution guide and Part 2B as your reference during project work.

## Table of Contents

- **How to Start Next Monday**

- **AI Workflow Library**
AI Workflow 1: Source Extraction
AI Workflow 2: Customer Relevance Mapping
AI Workflow 3: Threat Scenario Drafting
AI Workflow 4: Hunt Hypothesis Generation
AI Workflow 5: Detection Drafting
AI Workflow 6: Query Translation
AI Workflow 7: Test Case Generation
AI Workflow 8: SOC Playbook Drafting
AI Workflow 9: Report Drafting
AI Workflow 10: Quality Review

- **LLM Task Cards****
**Task Card 1: Source Claim Extraction
Task Card 2: PIR Quality Challenge
Task Card 3: Crown-Jewel Dependency Review
Task Card 4: Telemetry Feasibility Review
Task Card 5: Threat Scenario Builder
Task Card 6: Hunt Hypothesis Generator
Task Card 7: Detection Logic Draft
Task Card 8: Rule Quality Challenge
Task Card 9: SOC Playbook Draft
Task Card 10: Executive Report Draft

- **Strict Quality Gates****
**Gate A: PIR Approval
Gate B: Scenario Approval
Gate C: Hunt Approval
Gate D: Detection Design Approval
Gate E: Production Approval
Gate F: Final Delivery Approval

- **Gate Evidence Pack Template**

- **Evidence Package Template**

- **Master Registers****
**Evidence Register
Decision Register
Source Register
PIR Register
SIR Register
Collection Gap Register
Contradiction Register
Threat Scenario Register
IOC Review Register
ATT&CK Mapping Register
D3FEND Mapping Register
Detection Coverage Gap Register
Hunt Backlog
Detection Backlog
Detection Health Register
False-Negative Register
Purple-Team Test Register
Customer Detection Data Model Register
RAID Register
Approved AI Tool Register

- **Worked Example: Cloud Identity to Backup Deletion****
**Customer Story
Step 1: PIR
Step 2: SIRs and Collection Tasks
Step 3: Source Claim and Evidence
Step 3.5: AI Use Log Entries
Step 4: Scenario
Step 4.5: Gate B — First Attempt Fails
Step 5: Observable and Telemetry
Step 6: Hunt Hypothesis
Step 7: Detection Design
Step 8: Test Plan
Step 9: SOC Action
Step 10: Decision and Metric
Step 11: DRL-9 Production Deployment and Gate E Evidence Pack

- **Final Customer Delivery Package**

- **Minimum Viable Customer Delivery**

- **30/60/90-Day Execution Plan**

- **References**

## How to Start Next Monday

A new engagement, a blank register, no institutional memory. This checklist gets you to a defensible position by end of week one — using this toolkit exactly as designed.

**Before you open any AI tool:**

- Read the project charter or brief. If there is no charter, your first deliverable is the charter. Use the Phase 0 template in Part 2A.

- Confirm the implementation mode (Mode 1–4 from Part 1 §Implementation Modes). If you cannot answer “does the customer have searchable telemetry and a SIEM?”, you are in Mode 1.

- Identify your first three decisions the customer needs to make. These become your first three PIRs. Every PIR must name a consumer, a decision, and a time horizon — not a topic area.

- Check AI governance status. Is there an Approved AI Tool Register entry for the tool you plan to use? If not, AI workflows are disabled until one is approved. Start by completing the AI Tool Approval Checklist (Part 1 §Approved AI Tool Register).

**Day 1 — scoping (≈3–4 hours):**

- Open the PIR Register. Write 3–5 PIRs using the Strong PIR Format. Each must name a consumer and a decision.

- Open the Source Register. List 5–10 sources you plan to use. Assign preliminary source reliability ratings using the two-character combined notation (e.g., B4 = usually reliable source, doubtful claim) defined in Part 1 §Combined Rating Notation.

- Write the crown-jewel list. Even a rough version: what are the 3–5 things that, if compromised, would constitute a material breach for this customer?

- Record any known constraints (telemetry gaps, legal/privacy blockers, approval gaps) in the RAID Register.

**Day 2 — source intake (≈3 hours):**

- Run[AI Workflow 1: Source Extraction](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)on your three highest-priority sources.

- Complete the Phase 4 pre-screening checklist for each source before submitting to AI.

- Populate the Evidence Register with extracted claims. Assign evidence labels (Source-reported / Observed / Inferred / Unverified).

- Flag any IOCs for triage using the IOC Blocking Risk Assessment form.

**Day 3 — relevance mapping and first scenario (≈3–4 hours):**

- Run[AI Workflow 2: Customer Relevance Mapping](2026-05-12-customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943.md)against extracted claims and crown-jewel list.

- Draft one threat scenario using the Scenario Template (Part 2A Phase 5). Score it: Business Impact, Likelihood, Risk Score, Detection Feasibility. Use the Worked Example as a calibration reference.

- Check Gate A exit criteria (Part 2A Phase 1). If you have approved PIRs, a validated source list, and at least one scenario, Gate A is in reach by end of week one.

**Day 4 — gap register and customer checkpoint (≈2–3 hours):**

- Populate the Collection Gap Register. For each PIR, ask: “What SIRs do I need? Which data sources would answer each SIR? Do I have them?” Every gap is a row.

- Open the Contradiction Register. If any two sources make conflicting claims, add a row now.

- Prepare a 15-minute checkpoint summary for the customer security lead: confirmed PIRs, first scenario priority score, top 3 collection gaps, AI governance status.

**Day 5 — Gate A evidence pack:**

- Complete the Gate A Evidence Pack Template using the form in Part 2B §Gate Evidence Pack Template.

- Required evidence: PIR Register (≥3 approved PIRs), Source Register (≥5 validated sources), first Threat Scenario with a Risk Score, first Decision Register entry.

- Pass Gate A only if all required evidence is present and no mandatory blocker exists. If you must take a Conditional Pass, name the risk owner and set the 30-day expiry.

**What comes next (Week 2 and beyond):**

- Follow the 30/60/90-Day Plan that matches your customer’s maturity level (Minimum Viable or Full Maturity — see §Plan Selection Rules).

- At each phase milestone, check the Phase-specific Validation Tests in Part 2A and the Gate evidence requirements in Part 2B.

- Use the PIR Feedback Loop at the end of each cycle (Part 2A Phase 14) to reset requirements for the next.

**Common first-week mistakes to avoid:**

- Starting with AI before charter and PIRs are agreed — output will not be traceable to decisions.

- Using “Phase 4” IOC triage only in Phase 4 — the pre-screening checklist applies to every source at every phase.

- Writing PIRs as topics (“What do we know about ransomware?”) — PIRs must be decision questions with named consumers.

- Claiming ATT&CK coverage before a tested detection exists — Coverage Status “Candidate” is not coverage.

## AI Workflow Library

This section defines separate AI workflows. Do not use one giant prompt. Each workflow has narrow inputs, outputs, and validation.

### AI Workflow 1: Source Extraction

```text
Task:
Extract
 
claims,
 
evidence,
 
IOCs,
 
TTPs,
 
actor
 
labels,
 
victimology,
 
dates,
 
and
 
confidence
 
from
 
one
 
source.
Inputs:
-
 
One
 
source
 
document.
-
 
Source
 
metadata.
Output:
-
 
Structured
 
extraction
 
table.
-
 
Claims
 
separated
 
from
 
evidence.
-
 
Proposed
 
combined
 
Source
 
Reliability
 
/
 
Information
 
Credibility
 
rating
 
with
 
rationale
 
(e.g.,
 
B4
 
—
 
usually
 
reliable
 
actor,
 
doubtful
 
claim
 
based
 
on
 
single-source
 
reporting).
-
 
Open
 
questions.
Validation:
-
 
Analyst
 
checks
 
extraction
 
against
 
source.
-
 
Unsupported
 
claims
 
removed.
-
 
Dates
 
and
 
actor
 
labels
 
verified.
-
 
If AI-generated or AI-assisted:
 
verify
 
whether
 
the
 
underlying
 
evidence
 
is
 
traceable.
 
Unsupported
 
AI-generated
 
claims
 
default
 
to
 
F6.
 
If
 
traceable
 
non-AI
 
sources
 
exist,
 
rate
 
those
 
separately
 
and
 
record
 
the
 
AI
 
step
 
as
 
processing
 
support
 
per
 
Part
 
1
 
§Rating
 
AI-Generated
 
Intelligence.
```

### AI Workflow 2: Customer Relevance Mapping

```text
Task:
Map
 
validated
 
CTI
 
source
 
content
 
to
 
customer
 
crown
 
jewels,
 
technologies,
 
PIRs,
 
and
 
telemetry.
Inputs:
-
 
Validated
 
source
 
extraction.
-
 
Crown-jewel
 
register.
-
 
Telemetry
 
map.
-
 
PIR/SIR
 
register.
Output:
-
 
Relevance
 
matrix.
-
 
Proposed
 
scenarios.
-
 
Gaps.
Validation:
-
 
Customer
 
owner
 
confirms
 
relevance.
-
 
CTI
 
lead
 
confirms
 
evidence.
-
 
Platform
 
owner
 
confirms
 
telemetry.
```

### AI Workflow 3: Threat Scenario Drafting

```text
Task:
Draft
 
a
 
customer-specific
 
threat
 
scenario
 
from
 
validated
 
inputs.
Inputs:
-
 
PIR.
-
 
Crown
 
jewel.
-
 
Validated
 
CTI.
-
 
Telemetry
 
score.
Output:
-
 
Scenario
 
draft.
-
 
Diamond
 
Model.
-
 
Kill
 
Chain
 
sequence.
-
 
ATT&CK
 
candidates.
-
 
Collection
 
gaps.
Validation:
-
 
Remove
 
unsupported
 
actor
 
claims.
-
 
Confirm
 
customer
 
exposure.
-
 
Confirm
 
scenario
 
has
 
defensive
 
action.
```

### AI Workflow 4: Hunt Hypothesis Generation

```text
Task:
Generate
 
testable
 
hunt
 
hypotheses
 
from
 
approved
 
scenarios.
Inputs:
-
 
Approved
 
scenario.
-
 
Available
 
telemetry.
-
 
Known
 
benign
 
patterns.
Output:
-
 
Hunt
 
hypotheses.
-
 
Expected
 
observables.
-
 
Pseudo-queries.
-
 
Escalation
 
thresholds.
Validation:
-
 
Hypothesis
 
must
 
be
 
falsifiable.
-
 
Required
 
logs
 
must
 
exist.
-
 
SOC
 
lead
 
approves
 
escalation
 
threshold.
```

### AI Workflow 5: Detection Drafting

Detection drafting is the highest-complexity AI workflow in this template — it involves schema-specific logic, customer-environment constraints, and detection engineering validation rules that must remain consistent across all analysts and AI tools. Task Card 7 consolidates all of these requirements in one place so that changes to detection logic standards are reflected everywhere without needing to update multiple workflow documents.

This workflow routes to Task Card 7 as the sole canonical work instruction. Do not use this workflow header for inputs, outputs, or validation — follow Task Card 7 exclusively to ensure consistent detection engineering behavior.

**Authoritative instruction:**

```text
Task Card 7:
 
Detection
 
Logic
 
Draft
```

### AI Workflow 6: Query Translation

```text
Task:
Translate
 
approved
 
logic
 
into
 
target
 
SIEM
 
syntax.
Inputs:
-
 
Approved
 
platform-neutral
 
logic.
-
 
Target
 
platform.
-
 
Customer
 
schema.
-
 
Sample
 
events.
Output:
-
 
Platform
 
query.
-
 
Field
 
mapping
 
notes.
-
 
Known
 
limitations.
Validation:
-
 
Query
 
compiles.
-
 
Query
 
runs
 
against
 
sample
 
data.
-
 
Results
 
match
 
expected
 
behavior.
```

### AI Workflow 7: Test Case Generation

```text
Task:
Generate
 
positive,
 
negative,
 
and
 
edge
 
test
 
cases.
Inputs:
-
 
Detection
 
logic.
-
 
Customer
 
schema.
-
 
Known
 
benign
 
patterns.
Output:
-
 
Test
 
case
 
table.
-
 
Synthetic
 
events
 
if
 
allowed.
-
 
Expected
 
results.
Validation:
-
 
Detection
 
engineer
 
reviews
 
realism.
-
 
Tests
 
executed.
-
 
Results
 
stored.
```

### AI Workflow 8: SOC Playbook Drafting

```text
Task:
Create
 
analyst
 
triage
 
instructions
 
for
 
a
 
validated
 
detection.
Inputs:
-
 
Detection
 
spec.
-
 
Expected
 
alert
 
fields.
-
 
Customer
 
escalation
 
process.
-
 
False
-positive
 
notes.
Output:
-
 
SOC
 
playbook.
-
 
Evidence
 
checklist.
-
 
Escalation
 
criteria.
Validation:
-
 
SOC
 
analyst
 
dry-runs
 
the
 
playbook.
-
 
Missing
 
fields
 
corrected.
-
 
Escalation
 
owner
 
approves.
```

### AI Workflow 9: Report Drafting

```text
Task:
Draft
 
executive
 
and
 
technical
 
reports
 
from
 
validated
 
outputs.
Inputs:
-
 
Approved
 
findings.
-
 
Test
 
results.
-
 
Metrics.
-
 
Gaps.
-
 
Decisions
 
required.
Output:
-
 
Executive
 
summary.
-
 
Technical
 
appendix.
-
 
Decision
 
list.
Validation:
-
 
Key
 
judgments
 
trace
 
to
 
evidence.
-
 
No
 
new
 
claims
 
introduced.
-
 
Uncertainty
 
preserved.
```

### AI Workflow 10: Quality Review

```text
Task:
Challenge
 
the
 
final
 
product
 
for
 
unsupported
 
claims,
 
missing
 
tests,
 
weak
 
logic,
 
and
 
overclaiming.
Inputs:
-
 
Draft
 
deliverable.
-
 
Evidence
 
register.
-
 
Test
 
results.
Output:
-
 
Issues
 
list.
-
 
Required
 
fixes.
-
 
Residual
 
risk.
Validation:
-
 
Human
 
reviewer
 
accepts
 
or
 
rejects
 
each
 
issue.
-
 
Fixes
 
are
 
tracked.
```

## LLM Task Cards

Use task cards as controlled work instructions. Each task card should be run separately with only the approved inputs for that task.**Do not paste the whole project into one prompt.**

### Task Card 1: Source Claim Extraction

```text
Role:
You
 
are
 
a
 
CTI
 
extraction
 
assistant.
 
You
 
do
 
not
 
assess
 
beyond
 
the
 
provided
 
source.
Inputs:
-
 
Source
 
text
 
or
 
source
 
excerpt.
-
 
Source
 
metadata.
Task:
Extract the following into a table:
-
 
factual
 
claims;
-
 
source
 
assessments;
-
 
actor
 
labels;
-
 
malware
 
or
 
tool
 
names;
-
 
infrastructure;
-
 
vulnerabilities;
-
 
victimology;
-
 
ATT&CK
 
candidate
 
techniques;
-
 
IOCs;
-
 
dates
 
and
 
activity
 
windows;
-
 
confidence
 
language
 
used
 
by
 
the
 
source;
-
 
handling
 
restrictions;
-
 
gaps
 
and
 
ambiguities.
Rules:
-
 
Do
 
not
 
add
 
facts
 
not
 
present
 
in
 
the
 
source.
-
 
Use
 
"not stated"
 
where
 
the
 
source
 
does
 
not
 
provide
 
information.
-
 
Quote
 
only
 
short
 
necessary
 
phrases.
-
 
Separate
 
source-observed
 
evidence
 
from
 
source
 
assessment.
-
 
If
 
the
 
claim
 
is
 
AI-generated
 
or
 
AI-assisted,
 
verify
 
whether
 
the
 
underlying
 
evidence
 
is
 
traceable.
 
Do
 
not
 
rate
 
the
 
AI
 
output
 
itself
 
as
 
A
 
or
 
B.
 
Unsupported
 
AI-generated
 
claims
 
default
 
to
 
F6.
 
If
 
traceable
 
non-AI
 
sources
 
exist,
 
rate
 
those
 
underlying
 
sources
 
separately
 
and
 
record
 
the
 
AI
 
step
 
as
 
processing
 
support.
Output:
Structured
 
table
 
plus
 
a
 
short
 
list
 
of
 
analyst
 
review
 
questions.
```

**Validation:**

- compare extraction to source;

- verify dates and actor labels;

- verify proposed combined rating matches stated rationale;

- remove unsupported ATT&CK mappings;

- record accepted/rejected status in AI use log.

### Task Card 2: PIR Quality Challenge

```text
Role:
You are a CTI methodology reviewer.
Inputs:
- Draft PIR/SIR register.
- Customer decision list.
Task:
Review 
each
 PIR 
for
 decision linkage, scope, collection feasibility, 
and
 wording quality.
Rules:
- Flag PIRs that are vague, tool-driven, actor-fixated, 
or
 
not
 tied 
to
 a decision.
- Recommend improved wording.
- Identify missing SIRs 
and
 collection tasks.
- 
Do
 
not
 invent customer decisions.
Output:
Issue table 
with
 severity, rationale, 
and
 proposed fix.
```

**Validation:**

- CTI lead accepts or rejects each recommendation;

- customer owner confirms decision language;

- collection owners confirm feasibility.

### Task Card 3: Crown-Jewel Dependency Review

```text
Role:
You are a security architecture review assistant.
Inputs:
- Crown-jewel register.
- Asset 
and
 dependency notes.
- Identity, cloud, network, 
and
 backup notes.
Task:
Identify missing dependencies, privileged access paths, third-party paths, 
and
 recovery dependencies.
Rules:
- Distinguish observed dependencies 
from
 questions 
to
 ask.
- 
Do
 
not
 classify an asset 
as
 crown jewel unless already listed.
- Produce owner-facing questions 
for
 missing context.
Output:
Dependency gap table 
and
 interview question list.
```

**Validation:**

- system owner confirms dependency;

- platform owner confirms access path;

- recovery owner confirms backup dependency.

### Task Card 4: Telemetry Feasibility Review

```text
Role:
You are a detection data-source reviewer.
Inputs:
- Proposed detection 
or
 hunt.
- Telemetry map.
- Sample 
event
 fields.
Task:
Determine whether the detection 
or
 hunt 
is
 feasible 
with
 current telemetry.
Rules:
- Check required log sources, fields, retention, parsing, 
and
 joins.
- Mark 
each
 requirement 
as
 available, 
partial
, missing, 
or
 unknown.
- 
Do
 
not
 assume a field exists because a platform usually has it.
Output:
Feasibility matrix, blocking gaps, 
and
 workaround options.
```

**Validation:**

- sample events inspected;

- query run by analyst;

- platform owner confirms retention and parsing.

### Task Card 5: Threat Scenario Builder

```text
Role:
You
 
are
 
a
 
CTI
 
scenario
 
drafting
 
assistant.
Inputs:
-
 
Approved
 
PIR.
-
 
Approved
 
crown
 
jewel.
-
 
Validated
 
CTI
 
source
 
extracts.
-
 
Telemetry
 
score.
Task:
Draft
 
one
 
customer-specific
 
threat
 
scenario.
Rules:
-
 
Use
 
only
 
provided
 
evidence.
-
 
Separate
 
reported
 
facts,
 
source
 
assessments,
 
and
 
project-team
 
inferences.
-
 
Include
 
Diamond
 
Model,
 
Kill
 
Chain
 
sequence,
 
ATT&CK
 
candidates,
 
telemetry
 
requirements,
 
detection
 
opportunities,
 
and
 
gaps.
-
 
Do
 
not
 
assign
 
actor
 
attribution
 
unless
 
evidence
 
supports
 
it.
Output:
Threat
 
scenario
 
draft
 
in
 
the
 
project
 
scenario
 
template.
```

**Validation:**

- CTI lead validates evidence;

- customer owner validates relevance;

- detection engineer validates feasibility;

- unsupported actor claims removed.

### Task Card 6: Hunt Hypothesis Generator

```text
Role:
You are a threat hunting design assistant.
Inputs:
- Approved threat scenario.
- Telemetry map.
- Known benign patterns.
Task:
Generate three 
to
 five testable hunt hypotheses.
Rules:
- 
Each
 hypothesis must be falsifiable.
- 
Each
 hypothesis must define expected observables.
- 
Each
 hypothesis must list required data sources 
and
 fields.
- Include benign explanations 
and
 escalation thresholds.
Output:
Hunt hypothesis table.
```

**Validation:**

- hunter confirms query feasibility;

- SOC lead confirms escalation threshold;

- benign pattern owner reviews false positives.

### Task Card 7: Detection Logic Draft

```text
Role:
You
 
are
 
a
 
detection
 
engineering
 
assistant.
Inputs:
-
 
Approved
 
detection
 
design.
-
 
Customer
 
schema
 
(from
 
Customer
 
Detection
 
Data
 
Model
 
Register).
-
 
Sample
 
events
 
(with
 
timestamps
 
from
 
Customer
 
Detection
 
Data
 
Model
 
Register).
-
 
Known
 
false
 
positives.
Pre-run
 
Schema
 
Freshness
 
Check
 
(mandatory
 
before
 
drafting):
1
.
 
Locate
 
the
 
sample-event
 
timestamp(s)
 
in
 
the
 
Customer
 
Detection
 
Data
 
Model
 
Register
   
for
 
each
 
required
 
data
 
source.
2
.
 
Calculate
 
the
 
number
 
of
 
days
 
between
 
the
 
sample-event
 
timestamp
 
and
 
today's
 
date.
3. If any required data source has a sample-event timestamp older than 30 days:
   
OUTPUT THE FOLLOWING WARNING before producing any detection logic:
   
⚠
 
SCHEMA
 
FRESHNESS
 
WARNING
 
—
 
LOGIC
 
PARITY
 
UNCERTAIN
   
Data source:
 [
source
 
name
]
   
Sample event timestamp:
 [
date
]
   
Age:
 [
N
] 
days
 
(exceeds
 
30
-day
 
freshness
 
threshold)
   
Risk:
 
The
 
schema,
 
field
 
names,
 
field
 
types,
 
or
 
event
 
structure
 
may
 
have
 
changed
   
since
 
the
 
sample
 
was
 
collected.
 
Detection
 
logic
 
drafted
 
against
 
stale
 
schema
 
may
   
produce
 
syntax
 
errors,
 
missing-field
 
failures,
 
or
 
incorrect
 
logic
 
in
 
the
 
current
   
environment.
   
Required action:
 
The
 
detection
 
engineer
 
must
 
either
 
(a)
 
collect
 
a
 
fresh
 
sample
   
event
 
from
 
the
 
production
 
environment
 
and
 
update
 
the
 
Customer
 
Detection
 
Data
 
Model
   
Register
 
before
 
proceeding,
 
or
 
(b)
 
explicitly
 
accept
 
the
 
schema
 
freshness
 
risk
 
in
   
writing,
 
document
 
the
 
acceptance
 
in
 
the
 
AI
 
Use
 
Log,
 
and
 
add
 
a
 
Detection
 
Health
   
Register
 
note
 
flagging
 
the
 
schema
 
validation
 
dependency.
   
Do
 
not
 
proceed
 
with
 
detection
 
logic
 
drafting
 
until
 
the
 
detection
 
engineer
 
responds
   
to
 
this
 
warning.
4
.
 
If
 
all
 
sample-event
 
timestamps
 
are
 
≤
 
30 days old:
 
proceed
 
with
 
detection
 
logic
   
drafting
 
without
 
the
 
warning.
Task:
Draft
 
platform-neutral
 
detection
 
logic
 
and
 
one
 
target-platform
 
implementation.
Execute
 
only
 
after
 
the
 
Schema
 
Freshness
 
Check
 
is
 
complete
 
and
 
any
 
warnings
 
are
 
resolved.
Rules:
-
 
Use
 
only
 
fields
 
shown
 
in
 
the
 
schema
 
or
 
sample
 
events.
-
 
Include
 
required
 
joins
 
and
 
time
 
windows.
-
 
Include
 
suppression
 
and
 
tuning
 
notes
 
separately
 
from
 
core
 
logic.
-
 
Include
 
positive,
 
negative,
 
and
 
edge
 
test
 
cases.
-
 
Include
 
the
 
schema
 
freshness
 
check
 
result
 
in
 
the
 
output
 
header.
Output:
Schema
 
freshness
 
check
 
result,
 
detection
 
spec,
 
query
 
draft,
 
and
 
test
 
plan.
Validation:
schema
 
freshness
 
check
 
completed
 
and
 
result
 
recorded;
if schema freshness warning was issued:
 
detection
 
engineer
 
resolution
 
documented
 
in
 
AI
 
Use
 
Log
 
before
 
logic
 
was
 
drafted;
query
 
syntax
 
test
 
passes;
positive
 
test
 
passes;
negative
 
test
 
passes;
historical
 
preview
 
completed;
detection
 
engineer
 
approves.
```

### Task Card 8: Rule Quality Challenge

```text
Role:
You are a skeptical detection reviewer.
Inputs:
- Detection rule.
- Detection design.
- Test results.
- 
False
-positive notes.
Task:
Find weaknesses 
in
 the detection.
Rules:
- Check whether the rule detects the intended behavior.
- Identify missing fields, logic gaps, bypass paths, overbroad conditions, 
and
 tuning risks.
- Identify tests that are missing.
- 
Do
 
not
 rewrite the rule unless asked.
Output:
Findings ordered 
by
 severity 
with
 recommended fixes.
```

**Validation:**

- detection engineer triages each finding;

- accepted fixes are implemented;

- rejected findings include rationale.

### Task Card 9: SOC Playbook Draft

```text
Role:
You
 
are
 
a
 
SOC
 
workflow
 
assistant.
Inputs:
-
 
Approved
 
detection.
-
 
Alert
 
fields.
-
 
Customer
 
escalation
 
process.
-
 
Known
 
false
 
positives.
Task:
Draft
 
a
 
SOC
 
triage
 
playbook.
Rules:
-
 
Write
 
steps
 
that
 
an
 
L1/L2
 
analyst
 
can
 
execute.
-
 
Include
 
first
 
15
-minute
 
triage,
 
enrichment,
 
benign
 
explanations,
 
escalation,
 
containment
 
criteria,
 
evidence
 
preservation,
 
and
 
closure
 
categories.
-
 
Do
 
not
 
recommend
 
containment
 
unless
 
criteria
 
are
 
met.
Output:
SOC
 
playbook
 
draft.
```

**Validation:**

- SOC analyst dry-runs playbook;

- missing fields corrected;

- escalation owner approves.

### Task Card 10: Executive Report Draft

```text
Role:
You are an executive CTI reporting assistant.
Inputs:
- Approved 
key
 judgments.
- Detection 
and
 hunt outcomes.
- Metrics.
- Remaining risks.
- Decisions required.
Task:
Draft an executive report.
Rules:
- Use decision language.
- 
Preserve
 confidence 
and
 uncertainty.
- 
Do
 
not
 introduce 
new
 findings.
- Separate completed actions 
from
 recommended decisions.
- Avoid technical detail unless it supports a decision.
Output:
Executive report draft 
with
 
key
 judgments, outcomes, risks, 
and
 required decisions.
```

**Validation:**

- every key judgment traces to evidence;

- CTI lead approves confidence language;

- customer security lead approves business framing.

### Task Card 11: Final Red-Team Review of the Deliverable

```text
Role:
You are a hostile quality reviewer 
for
 a CTI 
and
 detection engineering deliverable.
Inputs:
- Final draft.
- Evidence register.
- Test evidence.
- AI use log.
Task:
Identify 
where
 the deliverable overclaims, hides uncertainty, lacks evidence, lacks tests, misuses AI, 
or
 fails 
to
 support a customer decision.
Rules:
- Produce findings, 
not
 rewrites.
- Tie 
each
 finding 
to
 a section.
- Assign severity.
- Recommend concrete fix.
Output:
Quality findings table 
and
 final go/no-go recommendation.
```

**Validation:**

- quality reviewer confirms findings;

- project lead resolves mandatory findings;

- residual risks are documented.

## Strict Quality Gates

Gate status values:

```text
Pass
 / 
Conditional
 
Pass
 / 
Fail
```

**Conditional pass rules:**

- conditional pass requires named risk owner approval;

- exception must have expiry date;

- maximum exception duration is 30 days unless executive sponsor approves longer;

- mandatory blockers cannot receive conditional pass unless the risk is explicitly accepted;

- expired exceptions revert gate status to Fail.

### Gate A: PIR Approval

**Pass only if:**

- every PIR supports a named decision;

- every SIR has collection tasks;

- customer owners approve.

- **Gate owner:**CTI lead and customer security lead

- **Required evidence:**PIR Register, Decision Register, Collection Gap Register

- **Mandatory blockers:**No decision owner, no SIRs, no collection path

- **Conditional pass allowed?:**Yes, if missing owner or collection task has a dated remediation

- **Non-waivable blockers (Conditional Pass not permitted under any circumstances):**No named decision owner for any approved PIR; no SIRs derived from any approved PIR; no collection plan for any open SIR

- **Waivable blockers (Conditional Pass permitted with dated remediation plan and named risk owner):**Individual collection task not yet assigned; source not yet validated for a specific SIR; crown-jewel list pending final business owner approval within 5 business days

- **Conditional pass allowed?:**Yes — only for waivable blockers listed above. Non-waivable blockers must be resolved before Gate A can be passed under any circumstances.

- **Exception expiry:**Maximum 30 days

### Gate B: Scenario Approval

**Pass only if:**

- scenario maps to crown jewels;

- evidence is cited;

- telemetry feasibility is known;

- alternatives and gaps are documented;

- any scenario with Risk Score ≥ 20 and Detection Feasibility &lt; 3 has a documented telemetry remediation plan, control recommendation, or architecture decision.

- **Gate owner:**CTI lead and customer security lead

- **Required evidence:**Scenario Register, Evidence IDs, priority score, telemetry score

- **Mandatory blockers:**No crown-jewel mapping, no Evidence ID, unsupported attribution, Risk Score ≥ 20 with Detection Feasibility &lt; 3 and no telemetry remediation plan, control recommendation, or architecture decision

- **Conditional pass allowed?:**Yes, for telemetry gaps if scenario is labeled high risk but not detectable, provided a remediation plan owner and due date are assigned

- **Non-waivable blockers (Conditional Pass not permitted):**No crown-jewel mapping; no Evidence ID; unsupported attribution claim (e.g., actor attribution with no source-reported or observed evidence)

- **Waivable blockers (Conditional Pass permitted with remediation plan, owner, and due date):**Risk Score ≥ 20 with Detection Feasibility &lt; 3 — waivable only if a telemetry remediation plan, control recommendation, or architecture decision is documented with a named owner and target date

- **Conditional pass allowed?:**Yes — only for waivable blockers above. Non-waivable blockers must be resolved. A scenario with no crown-jewel mapping or no Evidence ID cannot pass Gate B under any circumstances.

- **Exception expiry:**Maximum 30 days

### Gate C: Hunt Approval

**Pass only if:**

- hypothesis is falsifiable;

- logs exist;

- expected observables are defined;

- escalation threshold is clear.

- **Gate owner:**CTI lead and SOC lead

- **Required evidence:**Hunt hypothesis, telemetry map, expected observables, result classification

- **Mandatory blockers:**No observable, no data source, no result classification

- **Non-waivable blockers for execution (hunt cannot be executed):**No observable defined; no confirmed data source; no result classification schema (how will the hunter know if they found something?); no escalation threshold

- **Non-waivable blockers for backlog inclusion:**No parent PIR or Scenario ID

- **Conditional pass allowed?:**No for execution; yes for backlog only

- **Exception expiry:**Not applicable for execution

### Gate D: Detection Design Approval

**Pass only if:**

- logic maps to behavior;

- fields exist;

- false positives are understood;

- test plan exists.

- **Gate owner:**Detection engineer

- **Required evidence:**Detection design, field mapping, ATT&CK mapping, D3FEND mapping, test plan

- **Mandatory blockers:**Missing fields, no test plan, no owner, unsupported ATT&CK mapping counted as coverage

- **Non-waivable blockers (cannot proceed even in lab):**No named detection owner; no Scenario ID link; required fields not confirmed in customer schema; ATT&CK mapping status “Candidate” counted toward Coverage Status “Covered”

- **Waivable blockers (lab work may continue with dated remediation plan):**D3FEND mapping not yet completed; test plan drafted but test data not yet available; ATT&CK mapping status “Candidate” — acceptable for lab as long as it is not counted as coverage

- **Conditional pass allowed?:**Yes for lab work only, not pilot

- **Exception expiry:**Maximum 30 days

### Gate E: Production Approval

**Pass only if:**

- syntax test passed;

- positive test passed;

- negative test passed;

- historical preview completed;

- SOC playbook approved;

- owner and review date assigned.

- **Gate owner:**Detection engineer and SOC lead

- **Required evidence:**Test Evidence ID, SOC Playbook ID, Detection Health entry, rollback plan, labeling completeness record from pilot

- **Mandatory blockers:**Missing rollback, no negative test, unvalidated synthetic event, no owner, no SOC path, no monitoring, pilot alert labeling completeness below 80% without pilot extension or relabeling, emergency disable procedure not confirmed

- **Conditional pass allowed?:**Yes, only with risk owner approval

- **Non-waivable blockers (cannot proceed even in lab):**No named detection owner; no Scenario ID link; required fields not confirmed in customer schema; ATT&CK mapping status “Candidate” counted toward Coverage Status “Covered”

- **Waivable blockers (lab work may continue with dated remediation plan):**D3FEND mapping not yet completed; test plan drafted but test data not yet available; ATT&CK mapping status “Candidate” — acceptable for lab as long as it is not counted as coverage

- **Conditional pass allowed?:**Yes for lab work only; a detection with a non-waivable blocker cannot advance to pilot. No pilot may be authorized without all non-waivable blockers resolved and a full test plan in place.

- **Exception expiry:**Maximum 30 days

- **Final status:**Pass / Conditional Pass / Fail

### Gate F: Final Delivery Approval

**Pass only if:**

- key judgments trace to evidence;

- deployed detections have test evidence;

- gaps are visible;

- outcomes are measurable: each Phase 0 success metric has a recorded final value, and each metric either meets its defined floor (named scenario at minimum DRL; named telemetry gap closed; hunt count and classification met) or has a documented exception with a named risk owner;

- AI use is logged.

- **Gate owner:**CTI lead and customer security lead

- **Required evidence:**Final package, Evidence Register, Decision Register, Detection Health Register, AI Use Log, Customer Acceptance Record

- **Mandatory blockers:**Unsupported key judgment, missing customer acceptance, unlogged AI use, unresolved production-affecting contradiction, candidate ATT&CK mapping counted as coverage, production claim below DRL-9, any ATT&CK technique in the ATT&CK Mapping Register that is linked to a scenario with Risk Score ≥ 20 or Engineering Priority EP1 and has Coverage Status “Gap” with no documented infeasibility reason in the Detection Coverage Gap Register

- **Conditional pass allowed?:**Yes, with documented exceptions and risk owner approval

- **Non-waivable blockers (delivery cannot be authorized under any circumstances):**Any key judgment with no traceable evidence and no documented assumption; missing signed Customer Acceptance Record; any AI output used in a deliverable with no AI Use Log entry; unresolved production-affecting contradiction (per the Contradiction Register definition); any ATT&CK technique claimed as “Covered” without DRL-7 or above; any production coverage claim for a detection below DRL-9; Task Card 11 not executed against the final draft

- **Waivable blockers (Conditional Pass with documented exception, risk owner, and expiry date):**ATT&CK technique in a scenario with Risk Score ≥ 20 with Coverage Status “Gap” — waivable only if the Detection Coverage Gap Register row has an infeasibility reason, an owner, and a dated remediation target; Task Card 11 Critical/High finding — waivable only with a named risk owner and a documented resolution plan; a Phase 0 success metric not meeting its defined floor — waivable only with a named risk owner and a dated remediation commit

- **Conditional pass allowed?:**Yes — only for waivable blockers above. Non-waivable blockers cannot be conditionally waived under any circumstances: missing customer acceptance, unlogged AI use, unsupported key judgment, and production-affecting contradictions have no exception path.

- **Exception expiry:**Maximum 30 days

## Gate Evidence Pack Template

```text
Gate ID:
Gate name:
Gate owner:
Date:
Related deliverables:
Required evidence:
Evidence IDs:
Test Evidence IDs:
Decision IDs:
Open blockers:
Exception requested:
Risk owner:
Exception expiry:
Gate status:
Approver:
Notes:
```

## Evidence Package Template

Use evidence packages for customer acceptance, audits, and final signoff.

```text
Package ID:
Related Deliverable:
Evidence IDs:
Source IDs:
Decision IDs:
Screenshots / Query Outputs:
Sample Events:
Test Results:
Reviewer:
Open Gaps:
Contradictions:
Accepted Limitations:
Approval:
```

## Master Registers

### Evidence Register

```text
| 
Evidence
 
ID
 | 
Claim
 | 
Evidence
 
Label
 | 
Source
 
ID
 | 
Reliability
 | 
Credibility
 | 
Task
 
Card
 
ID
 | 
AI
 
Session
 
ID
 | 
Status
 | 
Notes
 |
|
-------------
|
-------
|
----------------
|
-----------
|
-------------
|
-------------
|
--------------
|
---------------
|
--------
|
-------
|
| 
E-001
       |       |                |           |             |             |              |               |        |       |
```

Evidence Label options: Source-reported / Observed / Analyst inference / Unverified

Evidence status values:

```text
Accepted
 / 
Rejected
 / 
Superseded
 / 
Needs
 
Corroboration
 / 
Contradicted
 / 
Expired
```

### Decision Register

```text
|
 Decision ID 
|
 Decision 
|
 
Date
 
|
 Owner 
|
 Evidence IDs 
|
 Related PIR 
|
 Success Metric 
|
 Status 
|
 Review 
Date
 
|
|
-------------|----------|------|-------|--------------|-------------|----------------|--------|-------------|
|
 
DEC
-001
     
|
          
|
      
|
       
|
              
|
             
|
                
|
 
Open
   
|
             
|
```

**Decision status values:**

```text
Open
 
/
 Pending Evidence 
/
 Recommended 
/
 Approved 
/
 Rejected 
/
 Deferred 
/
 Superseded
```

### Source Register

```text
|
 Source ID 
|
 Title 
|
 
Date
 
|
 Type 
|
 Reliability 
|
 Credibility 
|
 Combined Rating 
|
 Rating Rationale 
|
 Relevance 
to
 PIRs 
|
 Handling 
|
 Notes 
|
|
-----------|-------|------|------|-------------|-------------|-----------------|------------------|-------------------|----------|-------|
|
 SRC
-001
   
|
       
|
      
|
      
|
             
|
             
|
                 
|
                  
|
          
```

Type: Vendor report / Government advisory / OSINT / Customer-observed / ISAC / Internal

**Combined Rating:**[Source Reliability letter][Information Credibility number] — e.g., B4. For AI-assisted entries, rate the underlying traceable source separately. Unsupported AI-generated claims default to F6. IC 1 is not assigned to the AI output itself; the underlying claim may only be treated as confirmed when independently verified through human-verifiable, non-AI evidence. See Part 1 §Combined Rating Notation and §Rating AI-Generated Intelligence.

### PIR Register

```text
|
 PIR ID 
|
 Decision Supported 
|
 Question 
|
 Consumer 
|
 
Time
 Horizon 
|
 Required Confidence 
|
 Likely Action if Answered 
|
 Crown Jewels 
|
 Status 
|
|
--------|--------------------|----------|----------|--------------|---------------------|---------------------------|--------------|--------|
|
 PIR
-01
 
|
                    
|
          
|
          
|
              
|
                     
|
                           
|
              
|
 
Open
   
|
```

### SIR Register

```text
|
 SIR ID    
|
 Parent PIR 
|
 Question 
|
 Collection Approach 
|
 Required Evidence Type 
|
 Data Source 
|
 Confidence Threshold 
|
 Owner 
|
 Due 
Date
 
|
 Closure 
Condition
 
|
 Status 
|
|
-----------|------------|----------|---------------------|------------------------|-------------|----------------------|-------|----------|-------------------|--------|
|
 SIR
-01.1
  
|
            
|
          
|
                     
|
                        
|
             
|
                      
|
       
|
          
|
                   
|
 
Open
   
|
```

### Collection Gap Register

```text
|
 Gap ID  
|
 SIR ID 
|
 Data Source 
|
 Gap Description 
|
 Owner 
|
 Remediation Plan 
|
 Due 
Date
 
|
 Status 
|
|
---------|--------|-------------|-----------------|-------|------------------|----------|--------|
|
 GAP
-001
 
|
        
|
             
|
                 
|
       
|
                  
|
          
|
 
Open
   
|
```

Status: Open / Accepted / Closed

### Contradiction Register

```text
| 
Contradiction
 
ID
 | 
Claim
 
A
 | 
Source
 
A
 | 
Claim
 
B
 | 
Source
 
B
 | 
Production
 
Affecting
 | 
Detection
 
IDs
 | 
Entry
 
Date
 | 
Review
 
Date
 | 
Status
 | 
Resolution
 |
|
------------------
|
---------
|
----------
|
---------
|
----------
|
----------------------
|
---------------
|
------------
|
-------------
|
--------
|
------------
|
| 
CON-001
          |         |          |         |          | 
No
                   |               |            |             | 
Open
   |            |
```

Status: Open / Resolved / Accepted / Overdue

**Production-affecting lookup rule:**A contradiction is production-affecting if it involves a claim that directly drives the severity, priority, ATT&CK mapping, or suppression logic of any active or pilot detection. Analyst judgment is not sufficient to mark a contradiction as not production-affecting when the conflict involves actor attribution, victim scope, or infrastructure overlap with a detection in production or pilot.

**Default review date rule:**When a contradiction is first entered, set the initial review date to 7 calendar days from the entry date. If the contradiction is not resolved or re-assessed within 7 days, it must appear in the next weekly register hygiene review as overdue.

### Threat Scenario Register

```text
| 
Scenario
 
ID
 | 
Name
 | 
Decision
 
ID
 | 
Actor
 
Class
 | 
Crown
 
Jewels
 | 
Impact
 | 
Business
 
Impact
 | 
Likelihood
 | 
Risk
 
Score
 | 
Def
. 
Relevance
 | 
Det
. 
Feasibility
 | 
Eng
. 
Priority
 | 
Priority
 
Label
 | 
Confidence
 | 
Status
 |
|
-------------
|
------
|
-------------
|
-------------
|
--------------
|
--------
|
-----------------
|
------------
|
------------
|
----------------
|
------------------
|
---------------
|
----------------
|
------------
|
--------
|
| 
SCN-01
      |      |             |             |              |        |                 |            |            |                |                  |               |                |            | 
Draft
  |
```

### IOC Review Register

```text
|
 IOC ID  
|
 IOC 
Value
 
|
 Type 
|
 Source ID 
|
 Source 
Date
 
|
 Evidence ID 
|
 Confidence 
|
 Action 
|
 Owner 
|
 Review 
Date
 
|
 Notes 
|
|
---------|-----------|------|-----------|-------------|-------------|------------|--------|-------|-------------|-------|
|
 IOC
-001
 
|
           
|
      
|
           
|
             
|
             
|
            
|
        
|
       
|
             
|
       
|
```

Type: IP / Domain / Hash / URL / Email / Certificate / ASN / Other

IOC actions:

```text
Observe / Enrich / Hunt / Detect / Block / Do 
not
 
use
 / Expired
```

### ATT&CK Mapping Register

```text
| Mapping ID | Technique ID | Technique Name | Scenario ID | Detection ID | DRL | Coverage Status | Notes |
|
------------|--------------|----------------|-------------|--------------|-----|-----------------|-------|
| MAP
-001
    |              |                |             |              |     | Candidate       |       |
```

Coverage Status: Covered / Partial / Telemetry Only / Gap / Candidate

### D3FEND Mapping Register

```text
| D3FEND ID  | D3FEND Technique         | Category | ATT&CK Technique ID | ATT&CK Mapping ID | Implementation Status | Evidence ID | Owner | Notes |
|
------------|--------------------------|----------|---------------------|-------------------|-----------------------|-------------|-------|-------|
| D3F
-001
    |                          |          |                     |                   | Not Implemented       |             |       |       |
```

Category: Harden / Detect / Isolate / Deceive / Evict

Implementation Status: Implemented / Planned / Not Implemented / Infeasible

**Populate rules:**Every row must reference a specific D3FEND technique (e.g., D3-UAP: User Account Permissions), not a category. Link each row to an ATT&CK Mapping Register ID. Set Implementation Status to “Implemented” only when an active defensive capability exists and is linked to an Evidence ID. “Planned” entries require a named owner and a target date in the Notes field. “Infeasible” entries require a rationale. Rows linked to Candidate ATT&CK mappings must be updated or removed when the mapping is resolved.

*Quality rules for this register are in Part 1 → D3FEND Countermeasure Mapping.*

### Detection Coverage Gap Register

The Detection Coverage Gap Register is a derived view — it does not require a separate source of truth. It is generated by cross-referencing the Threat Scenario Register and the ATT&CK Mapping Register to identify which ATT&CK techniques associated with approved threat scenarios have no coverage at DRL-7 or above.

```text
|
 Gap ID    
|
 Technique ID 
|
 Technique Name 
|
 Scenario ID 
|
 Risk Score 
|
 Eng. Priority 
|
 Coverage Status 
|
 Gap Reason 
|
 Infeasibility Reason 
|
 Owner 
|
 
Last
 Reconciled 
|
|
-----------|--------------|----------------|-------------|------------|---------------|-----------------|------------|----------------------|-------|-----------------|
|
 DCGAP
-001
 
|
              
|
                
|
             
|
            
|
               
|
 Gap             
|
            
|
                      
|
       
|
                 
|
```

Coverage Status: Gap / Partial / Telemetry Only

**How to populate:**For each ATT&CK technique referenced in an approved threat scenario, check the ATT&CK Mapping Register for a linked Detection ID with DRL ≥ 7. If none exists, add a row. Gap Reason should name the obstacle (no telemetry, no rule design, backlog not started, or known infeasibility). Owner is the detection engineer or CTI lead responsible for closing or formally accepting the gap.

The Detection Coverage Gap Register must be included in the Final Customer Delivery Package and reviewed at every executive checkpoint. A row in this register is Gate F relevant — and blocks Gate F — if the linked scenario has Risk Score ≥ 20 or Engineering Priority EP1 and Coverage Status is “Gap” with no documented infeasibility reason. Coverage Status “Partial” or “Telemetry Only” does not trigger the Gate F blocker.

**Derivation trigger:**The Detection Coverage Gap Register must be regenerated or manually reconciled whenever any detection changes DRL, any threat scenario is approved or modified, or any ATT&CK mapping changes Coverage Status. The accountable owner must record the date of the last reconciliation in the register or in the weekly register hygiene record.

### Hunt Backlog

```text
|
 Hunt ID 
|
 Hypothesis 
|
 Scenario ID 
|
 Required Telemetry 
|
 Expected Observables 
|
 Escalation Threshold 
|
 Status 
|
 
Result
 
|
 
Result
 Classification 
|
 Hunter 
|
 Completed 
|
 Notes 
|
|
---------|------------|-------------|--------------------|----------------------|----------------------|--------|--------|-----------------------|--------|-----------|-------|
|
 HUNT
-01
 
|
            
|
             
|
                    
|
                      
|
                      
|
 Queued 
|
        
|
                       
|
        
|
           
|
       
|
```

Status: Queued / In Progress / Completed / Cancelled

The Hunt Backlog serves as both the planning queue and the hunt results register. When a hunt is executed, the Result and Result Classification fields must be populated before the hunt is closed. A hunt with status “Completed” and empty Result or Result Classification fields is not a valid closed hunt for delivery or metrics purposes. There is no separate Hunt Results Register; the Hunt Backlog is the authoritative artifact for hunt outcomes in the Final Customer Delivery Package and executive reports.

### Detection Backlog

```text
| Detection ID | Name | Scenario ID | ATT&CK Techniques | Log Sources | Required Fields | DRL   | Status | Owner | Priority | Notes |
|
--------------|------|-------------|-------------------|-------------|-----------------|-------|--------|-------|----------|-------|
| DET
-001
      |      |             |                   |             |                 | DRL
-0
 | Idea   |       |          |       |
```

Status: Idea / Design / Lab / Candidate / Pilot / Production / Deferred / Rejected

The Detection Backlog is the planning and engineering queue. It tracks ideas, lab rules, designs, and candidates that may never become operational.

### Detection Health Register

```text
|
 Detection ID 
|
 Status 
|
 DRL 
|
 Alert Volume 
|
 Labeling Completeness (
%
) 
|
 FP Rate 
|
 TP Count 
|
 Benign TP Count 
|
 
Last
 Fired 
|
 
Last
 Tested 
|
 
Last
 Reviewed 
|
 Data Source Health 
|
 Rule Errors 
|
 Suppression Hit Rate 
|
 
Last
 Disable Test 
|
 Next Disable Test 
|
 Owner 
|
 Action Required 
|
|
--------------|--------|-----|--------------|---------------------------|---------|----------|-----------------|------------|-------------|---------------|--------------------|-------------|----------------------|-------------------|-------------------|-------|-----------------|
|
 DET
-001
      
|
        
|
     
|
              
|
                           
|
         
|
          
|
                 
|
            
|
             
|
               
|
                    
|
             
|
                      
|
                   
|
                   
|
       
|
                 
|
```

The Detection Health Register tracks the operational state of pilot and production detections.

**Labeling completeness**is the percentage of alerts in a given period that have been classified by the SOC as true positive, benign true positive, false positive, duplicate, or insufficient evidence. Precision estimates are only valid when labeling completeness is at least 80%.

**Labeling completeness history**must be tracked as a monthly average. The Detection Health Register must retain at least the last three monthly labeling completeness values. The 90-day zero true-positive demotion trigger requires that labeling completeness was at or above 80% for each of the three preceding monthly review periods, not only the current point-in-time figure. If fewer than three monthly periods are available, document available periods and note the limitation. Monthly average is calculated over each calendar month for which at least five alerts were generated. If fewer than five alerts were generated in a calendar month, record the actual count, note the limitation, and do not use that month’s figure as a valid completeness measurement for the demotion trigger.

**Last disable test date**and**next disable test due**track whether the emergency disable procedure has been exercised. Every production detection must have a confirmed disable test within 12 months of production deployment. Detection with no recorded test date is not eligible for DRL-9.

Metric definitions:

```text
Precision
 = 
True
 Positives / (
True
 Positives + 
False
 Positives)
```

Precision is only meaningful when labeling completeness is at least 80%. Precision is undefined (not zero) when TP count is zero; report as “no malicious TP in measurement period — precision undefined” rather than 0%. Reporting 0% implies the formula was applied with at least one true positive, which misstates the detection’s operational state and may trigger unwarranted tuning pressure on a correctly-functioning detection.

Known false negatives may come from purple-team tests, confirmed incidents, missed historical cases, or manual hunt findings.

### False-Negative Register

```text
|
 FN ID   
|
 Detection ID 
|
 ATT
&
CK Technique ID 
|
 Incident 
/
 Test Reference 
|
 Evidence ID 
|
 
Date
 Discovered 
|
 Root Cause 
|
 Root Cause Category 
|
 Resolution Action 
|
 Resolved 
Date
 
|
 Owner 
|
|
---------|--------------|---------------------|---------------------------|-------------|-----------------|------------|---------------------|-------------------|---------------|-------|
|
 FN
-001
  
|
              
|
                     
|
                           
|
             
|
                 
|
            
|
                     
|
                   
|
               
|
       
|
```

Root Cause Category: Logic gap / Missing telemetry / Field parsing error / Threshold misconfiguration / Scope exclusion / Unknown

**Populate rules:**Add an entry for every confirmed missed detection: adversary action confirmed by hunt, IR, red-team, or purple-team test where a production or pilot detection should have fired and did not. Each entry must link to a Detection ID, an ATT&CK technique, and an Evidence ID or incident reference. Root Cause must be assessed within 5 business days of discovery. Resolution Action must be documented within 10 business days. Unresolved entries older than 30 days block DRL-9 promotion for the linked detection. Two or more entries for the same detection within any 90-day window trigger mandatory demotion to DRL-7 pending logic review. Entries are permanent — do not delete resolved rows; set Resolved Date and keep the record.

*Quality rules and demotion triggers for this register are in Part 1 → False-Negative Register.*

### Purple-Team Test Register

```text
|
 PT ID  
|
 Detection ID 
|
 ATT
&
CK Technique 
|
 Execution 
Method
 
|
 Tool Used 
|
 Test Environment 
|
 Test 
Date
 
|
 Detection Fired 
|
 
False
 Negative 
|
 
Result
 
|
 Reviewer 
|
 Notes 
|
|
--------|--------------|------------------|------------------|-----------|------------------|-----------|-----------------|----------------|--------|----------|-------|
|
 PT
-001
 
|
              
|
                  
|
                  
|
           
|
                  
|
           
|
                 
|
                
|
        
|
          
|
       
|
```

Execution Method: manual / automated emulation / attack simulation tool

Test Environment: isolated lab / staging / production-isolated

Result: pass / conditional pass / fail — tuning gap / fail — false negative / deferred

**Populate rules:**Add an entry for every purple-team test executed. Mandatory for detections mapped to a scenario with Risk Score ≥ 20 before DRL-9 promotion, and for Tier 1 crown-jewel attack paths regardless of Risk Score. A “fail — false negative” result requires a linked False-Negative Register entry and DRL demotion to DRL-5. A “deferred” result requires a RAID Register entry with an approved alternative evidence approach and a dated resolution target before DRL-9 promotion is eligible. This register is included in the Gate E evidence pack and the Final Customer Delivery Package.

*Purple-team test methodology and result classifications are in Part 2A → Phase 9 → Purple-Team Test Requirements.*

### Customer Detection Data Model Register

```text
|
 Source ID 
|
 Data Source 
|
 Log 
Type
 
|
 Field Name 
(
Canonical
)
 
|
 Customer Field Name 
|
 Data 
Type
 
|
 Sample Value 
|
 Parsing Status 
|
 Notes 
|
|
-----------
|
-------------
|
----------
|
------------------------
|
---------------------
|
-----------
|
--------------
|
----------------
|
-------
|
|
 DS-
001
    
|
             
|
          
|
                        
|
                     
|
           
|
              
|
                
|
       
|
```

Parsing Status: Parsed / Partial / Not parsed / Unknown

### RAID Register

```text
|
 RAID ID  
|
 Type 
|
 Description 
|
 Impact 
|
 Probability 
|
 Owner 
|
 Status 
|
 Mitigation 
/
 Response 
|
 Due 
Date
 
|
|
----------|------|-------------|--------|-------------|-------|--------|-----------------------|----------|
|
 RAID
-001
 
|
 Risk 
|
             
|
        
|
             
|
       
|
 
Open
   
|
                       
|
          
|
```

RAID types:

```text
Risk
 / 
Assumption
 / 
Issue
 / 
Dependency
```

### Customer Acceptance Record

```text
|
 Acceptance ID 
|
 Deliverable 
/
 Milestone 
|
 Accepted 
By
 
|
 Role 
|
 
Date
 
|
 Conditions 
|
 Status  
|
|
---------------|-------------------------|-------------|------|------|------------|---------|
|
 ACC
-001
       
|
                         
|
             
|
      
|
      
|
            
|
 Pending 
|
```

Status: Accepted / Accepted with Conditions / Rejected / Pending

### AI Use Log

```text
|
 
Date
 
|
 Workflow 
/
 Task Card 
|
 Inputs 
|
 Output 
|
 Model 
/
 Tool 
|
 Reviewer 
|
 Reviewed 
By
 
|
 Quality Checklist ID 
|
 Validation Summary 
|
 Status 
|
|
------|----------------------|--------|--------|--------------|----------|-------------|----------------------|--------------------|--------|
|
      
|
                      
|
        
|
        
|
              
|
          
|
             
|
                      
|
                    
|
        
|
```

Status: Accepted / Rejected / Revised

**Quality Checklist column definition:**This column contains a reference ID to the completed seven-item AI Quality Tests checklist stored as a separate artifact for this AI use log entry. The checklist artifact must record pass or fail for each of the seven tests: source grounding, no fabrication, customer fit, uncertainty preserved, actionability, security review, and prompt-injection resistance. If any test fails, the Status column must be “Rejected” or “Revised” and the reason must be documented. An entry without a Quality Checklist reference ID is not considered reviewed and must not be used in any deliverable.

### Approved AI Tool Register

```text
| Tool ID  | Tool Name | Version / Tenant | Approved Use Cases | Restrictions / Exclusions | Approval 
Date
 | Approved 
By
 | Review 
Date
 | Data 
Class
 | Notes |
|----------|-----------|------------------|--------------------|---------------------------|---------------|-------------|-------------|------------|-------|
| TOOL-
001
 |           |                  |                    |                           |               |             |             |            |       |
```

Data Class: Public only / Internal / Customer-sensitive (with controls)

## Worked Example: Cloud Identity to Backup Deletion

This example shows one complete chain. The customer and events are fictional. Each step links to the methodology section that governs it — read[Part 1: Foundations](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)for analytic standards and[Part 2A: Phase-by-Phase Execution Guide](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)for phase activities, templates, and exit criteria.

### Customer Story

**Meridian Financial Services**is a mid-size regional bank with 1,400 employees, operating a hybrid cloud environment. Most core banking workloads run on-premises, but the disaster recovery infrastructure — backup vaults, snapshot storage, and offsite replicas — migrated to a major cloud provider two years ago as part of a cost-reduction program. The cloud environment is managed by a small platform team of four engineers and accessed by roughly 40 service principals spanning payment processing, regulatory reporting, and backup automation.

In early 2026, the CISO read two public reports in the same week: one describing a ransomware group that had silently added a credential to a service principal weeks before triggering destructive cloud storage operations, and a second documenting a financial sector incident where backup vault deletions were only discovered after the retention window expired. Neither report named Meridian, but both described an attacker profile and cloud access pattern that matched Meridian’s environment closely enough to prompt an internal question:*would we see this?*

The CISO brought the question to the quarterly security investment review. The SOC lead confirmed that cloud identity changes were not currently correlated with backup or storage events, and that the relevant cloud audit logs were only retained for 14 days. The cloud security lead noted that no detection covered service-principal credential additions outside the change management window.

The team agreed to commission a 90-day CTI and detection engineering sprint. The goal was not a threat assessment — it was a decision: approve the cloud identity detection backlog and fix the retention gap, or deprioritize it in favor of other roadmap items. They needed intelligence to support that call.

The CTI lead used this template to run the engagement. Everything below is the output.

### Step 1: PIR

*Methodology:*[*Part 1 → Intelligence Requirements*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 1 → Strong PIR Format*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 2A → Phase 1: Customer Decision and PIR Definition*](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

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
 
cloud
 
identity
 
behaviors
 
could
 
lead
 
to
 
destructive
 
impact
 
against
 
production
 
or
 
backup
 
resources?
Consumer:
 
CISO,
 
SOC
 
lead,
 
cloud
 
security
 
lead.
Time horizon:
 
90
 
days.
Required confidence:
 
moderate.
Likely action if answered:
 
approve
 
cloud
 
identity
 
detection
 
backlog
 
and
 
telemetry
 
remediation.
Related crown jewels:
 
cloud
 
management
 
plane,
 
backup
 
vault,
 
production
 
storage.
```

### Step 2: SIRs and Collection Tasks

*Methodology:*[*Part 1 → Strong SIR Format*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 1 → SIR Quality Criteria*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 2A → Phase 1: SIR activities*](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

SIR-01.2 below is shown in full SIR template format as a reference row. SIR-01.1 and SIR-01.3 follow the same structure.

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
 days covering credential additions, secret rotations, 
and
 federated trust updates. 
If
 no events exist 
in
 that window, generate a controlled test 
event
.
Required evidence type: customer-observed cloud audit log sample.
Required data source: cloud audit logs.
Confidence threshold 
to
 close: high 
for
 field presence; moderate 
for
 retention adequacy.
Owner:
 platform owner.
Due 
date
: Day 
15
.
Closure condition: sample 
event
 inspected 
and
 field mapping added 
to
 Customer Detection Data Model 
with
 actor, source_ip, resource_id, action, 
and
 timestamp confirmed parsed.
Status:
 open.
```

**All three SIRs in summary:**

- **SIR-01.1**— Question: Which privileged identities can delete recovery assets? — Collection Task: Export cloud IAM role assignments and backup administrator groups. — Owner: Cloud platform owner

- **SIR-01.2**— Question: Are service-principal credential changes logged with required fields? — Collection Task: Pull sample audit events; confirm field presence in Customer Detection Data Model. — Owner: Platform owner

- **SIR-01.3**— Question: Can destructive cloud actions be correlated to identity changes? — Collection Task: Test joins between cloud audit logs, IdP logs, PAM logs, and change tickets. — Owner: Detection engineer

### Step 3: Source Claim and Evidence

*Methodology:*[*Part 1 → Source Reliability and Information Credibility*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 1 → Evidence Labels*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 2A → Phase 4: External CTI Source Intake and Validation*](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

- **E-001**— Claim: Destructive cloud operations may follow identity compromise or privileged credential abuse. — Evidence Label: Source-reported — Source: Public vendor and government reporting — Reliability: B — Credibility: 2 — Combined Rating:**B2**— Status: Accepted

- **E-002**— Claim: Customer cloud audit logs include service-principal credential additions. — Evidence Label: Observed — Source: Customer sample logs — Reliability: A — Credibility: 1 — Combined Rating:**A1**— Status: Accepted

- **E-003**— Claim: Backup vault deletion events are retained for only 14 days. — Evidence Label: Observed — Source: Customer cloud log retention review — Reliability: A — Credibility: 1 — Combined Rating:**A1**— Status: Accepted

### Step 3.5: AI Use Log Entries

*Methodology:*[*Part 1 → AI Quality Tests*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 1 → AI Governance Model*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*· Part 2B → AI Workflow 1: Source Extraction · Part 2B → Task Card 7: Detection Logic Draft*

Two example entries are shown below. Entry AIL-001 covers source extraction (AI Workflow 1 applied to the public vendor report that produced E-001). Entry AIL-002 covers detection logic drafting (Task Card 7 applied to the DET-001 design). Both entries show the Quality Checklist reference ID, the reviewer, and the validation status.

- **2026–05–01**— Workflow: AI Workflow 1: Source Extraction — Inputs: E-001 public vendor report (redacted customer identifiers; no personal data present — pre-screening checklist completed, all NO) — Output: Structured extraction table: claims, actor labels, ATT&CK candidate techniques, IOC list, dates — Model/tool: Approved private LLM tenant — Reviewer: CTI lead — Reviewed By: CTI lead — Quality Checklist: QC-AIL-001 — Validation: Three extracted claims verified against source text; one actor label removed (not present in source); dates confirmed; no fabrication found — Status: Accepted (revised: one actor label removed)

- **2026–05–03**— Workflow: Task Card 7: Detection Logic Draft — Inputs: DET-001 detection design, customer schema from Customer Detection Data Model Register, sample event SAMPLE-CLOUD-AUDIT-014, known false positives list — Output: Platform-neutral detection logic, KQL implementation draft, positive/negative/edge test cases — Model/tool: Approved private LLM tenant — Reviewer: Detection engineer — Reviewed By: Detection engineer — Quality Checklist: QC-AIL-002 — Validation: Query compiled in target platform; positive test passed; negative test passed; field names verified against SAMPLE-CLOUD-AUDIT-014; suppression logic reviewed for blast radius; no fabricated fields — Status: Accepted

**Quality Checklist QC-AIL-001**(abbreviated; stored as separate artifact):

- **Source grounding:**Pass — all extracted claims map to source text

- **No fabrication:**Pass (after revision) — one unsupported actor label removed

- **Customer fit:**Pass — no customer-specific assets referenced in public source

- **Uncertainty preserved:**Pass — source confidence language preserved

- **Actionability:**Pass — output feeds E-001 in Evidence Register

- **Security review:**Pass — no credentials, raw logs, or customer identifiers in output

- **Prompt-injection resistance:**Pass — source text contained no embedded instructions

**Quality Checklist QC-AIL-002**(abbreviated; stored as separate artifact):

- **Source grounding:**Pass — logic uses only fields from SAMPLE-CLOUD-AUDIT-014

- **No fabrication:**Pass — no invented fields or values

- **Customer fit:**Pass — query references customer schema field names

- **Uncertainty preserved:**Pass — suppression logic documented as tuning input, not final

- **Actionability:**Pass — output is the detection file submitted to version control

- **Security review:**Pass — no credentials, session tokens, or restricted data

- **Prompt-injection resistance:**Pass — sample event text contained no instructions

### Step 4: Scenario

*Methodology:*[*Part 1 → Threat Scenario Priority Scoring*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 1 → Confidence Language*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 2A → Phase 5: Threat Scenario Development*](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

```text
Scenario ID:
 
SCN-01
Scenario name:
 
Cloud
 
identity
 
escalation
 
followed
 
by
 
backup
 
deletion
Decision ID:
 
DEC-01
Threat actor or actor class:
 
unknown
 
external
 
actor
 
or
 
compromised
 
administrator
Targeted crown jewels:
 
cloud
 
management
 
plane,
 
backup
 
vault,
 
production
 
storage
Potential impact:
 
recovery
 
inhibition
 
and
 
destructive
 
impact
Business impact score:
 
5
Likelihood score:
 
4
  
Likelihood evidence:
    
Sector relevance:
 
5
 
—
 
financial
 
sector
 
explicitly
 
named
 
in
 
both
 
public
 
reports
 
(E-001);
 
ransomware
 
groups
 
documented
 
targeting
 
cloud
 
DR
 
infrastructure
 
in
 
sector.
    
Customer exposure:
 
4
 
—
 
40
 
service
 
principals
 
with
 
backup
 
administrator
 
roles;
 
cloud
 
DR
 
environment
 
internet-accessible;
 
no
 
MFA
 
on
 
service-to-service
 
authentication.
    
Adversary activity:
 
4
 
—
 
public
 
reporting
 
documents
 
active
 
groups
 
using
 
service-principal
 
credential
 
abuse
 
as
 
pre-positioning
 
step
 
before
 
destructive
 
action
 
(E-001).
    
Exploitability:
 
3
 
—
 
backup
 
vault
 
accessible
 
to
 
any
 
service
 
principal
 
with
 
backup
 
administrator
 
role;
 
no
 
alert
 
on
 
out-of-window
 
credential
 
changes;
 
credential
 
addition
 
requires
 
no
 
additional
 
approval.
    
Control weakness:
 
5
 
—
 
no
 
identity-to-storage
 
correlation;
 
14
-day
 
log
 
retention
 
shorter
 
than
 
observed
 
attacker
 
dwell
 
time;
 
no
 
detection
 
at
 
any
 
DRL
 
for
 
this
 
path.
  
Likelihood derivation:
 
average
 
of
 
five
 
dimensions
 
(5+4+4+3+5)/5
 
=
 
4.2
,
 
rounded
 
to
 
4
.
Risk Score:
 
20
Defensive relevance score:
 
5
Detection feasibility score:
 
2
  
Feasibility evidence:
    
Platform
 
team
 
of
 
4
 
engineers;
 
no
 
existing
 
correlation
 
pipeline
 
between
 
identity
 
events
 
and
 
storage
 
events;
 
14
-day
 
retention
 
shorter
 
than
 
the
 
4
-hour
 
correlation
 
window
 
requires
 
a
 
retention
 
fix
 
before
 
detection
 
is
 
viable;
 
ticket
 
join
 
is
 
partial
 
at
 
62
%
 
coverage
 
(GAP-003).
 
Two
 
telemetry
 
sources
 
(IdP
 
logs
 
and
 
PAM
 
logs)
 
are
 
partial.
 
Engineering
 
effort
 
to
 
reach
 
DRL-9
 
from
 
DRL-0
 
is
 
high
 
relative
 
to
 
current
 
platform
 
capability.
Engineering Priority Score:
 
200
Priority label:
 
High
 
risk;
 
substantial
 
telemetry
 
investment
 
required
 
before
 
detection
 
reaches
 
production
Confidence:
 
moderate
```

### Step 4.5: Gate B — First Attempt Fails

*Methodology:*[*Part 2B → Gate B: Scenario Approval*](https://markdown2medium.vercel.app/#gate-b-scenario-approval)

The scenario was submitted to Gate B immediately after Step 4. The CTI lead and customer security lead reviewed it together.

**Gate B first-attempt outcome: BLOCKED**

Blocking reason: SCN-01 has Risk Score 20 and Detection Feasibility 2 (below 3). Gate B mandatory blocker requires a documented telemetry remediation plan, control recommendation, or architecture decision before the scenario can pass. No such document existed at the time of submission.

**Gate B evidence pack — first attempt:**

```text
Gate ID:
 
GATE-B-001-ATTEMPT-1
Gate name:
 
Gate
 
B
 
—
 
Scenario
 
Approval
Gate owner:
 
CTI
 
lead
 
(Meridian)
 
and
 
customer
 
security
 
lead
 
(Meridian)
Date:
 
2026-05-02
Related deliverables:
 
SCN-01
Required evidence:
 
Scenario
 
Register,
 
Evidence
 
IDs,
 
priority
 
score,
 
telemetry
 
score
Evidence IDs:
 
SCN-01,
 
E-001
Open blockers:
  
BLOCKER-B-1:
 
Risk
 
Score
 
20
 
with
 
Detection
 
Feasibility
 
2
 
—
 
no
 
telemetry
 
remediation
  
plan,
 
control
 
recommendation,
 
or
 
architecture
 
decision
 
documented.
Exception requested:
 
No
Gate status:
 
BLOCKED
Approver:
 
—
Notes:
 
Project
 
must
 
document
 
a
 
telemetry
 
remediation
 
plan
 
or
 
control
 
recommendation
before
 
Gate
 
B
 
can
 
be
 
re-attempted.
```

**Recovery actions (completed between Gate B attempt 1 and attempt 2):**

The CTI lead and platform owner convened a 90-minute working session. Three outputs were produced:

- **Telemetry remediation plan (RAID-002):**Increase log retention from 14 days to 90 days for cloud audit, IdP, and backup platform logs. Owner: platform owner. Target date: 2026–06–15. Rationale: detection correlation window requires at minimum 4-hour tail-back; investigation and dwell-time analysis requires 90 days to match documented attacker patterns from E-001.

- **Ticket join remediation (GAP-003):**Improve change-ticket join coverage from 62% to ≥80%. Owner: platform owner. Target date: 2026–07–01. Rationale: sub-80% ticket join creates false-positive risk for the out-of-window credential change rule.

- **Interim control recommendation (DEC-01 update):**Until detection reaches DRL-7, implement an administrative alert on out-of-window privileged service-principal changes as a compensating control. Owner: customer security lead. Approval required from: executive sponsor. Status: pending approval.

These actions were entered in the RAID Register (RAID-002, RAID-003) and the Collection Gap Register (GAP-003). SCN-01 was updated to reference RAID-002 and GAP-003 in the Feasibility evidence block.

**Gate B evidence pack — second attempt:**

```text
Gate ID:
 
GATE-B-001-ATTEMPT-2
Gate name:
 
Gate
 
B
 
—
 
Scenario
 
Approval
Gate owner:
 
CTI
 
lead
 
(Meridian)
 
and
 
customer
 
security
 
lead
 
(Meridian)
Date:
 
2026-05-04
Related deliverables:
 
SCN-01
Required evidence:
 
Scenario
 
Register,
 
Evidence
 
IDs,
 
priority
 
score,
 
telemetry
 
score,
  
telemetry
 
remediation
 
plan
Evidence IDs:
 
SCN-01,
 
E-001,
 
RAID-002,
 
RAID-003,
 
GAP-003
Open blockers:
 
None
 
—
 
BLOCKER-B-1
 
resolved
 
by
 
RAID-002
 
(retention
 
plan,
 
owner,
 
date)
  
and
 
interim
 
control
 
recommendation
 
(DEC-01
 
update).
Exception requested:
 
No
Gate status:
 
PASS
 
—
 
CONDITIONAL
Condition:
 
Retention
 
remediation
 
(RAID-002)
 
must
 
be
 
closed
 
by
 
2026-06-15
.
  
If
 
not
 
closed,
 
SCN-01
 
must
 
be
 
reviewed
 
and
 
Detection
 
Feasibility
 
score
 
updated.
Exception expiry:
 
2026-06-15
Risk owner:
 
Platform
 
owner
Approver:
 
Customer
 
security
 
lead
Notes:
 
Detection
 
engineering
 
may
 
proceed
 
to
 
DRL-1
 
on
 
the
 
basis
 
of
 
remediation
 
plan.
  
No
 
DRL-7
 
milestone
 
may
 
be
 
claimed
 
until
 
retention
 
is
 
≥
 
90
 
days
 
and
 
ticket
 
join
 
≥
 
80
%.
```

**Lesson from this Gate B example:**Gate B does not block detection work — it blocks claiming detection coverage without a viable plan. The project continued immediately to Step 5 with detection engineering running in parallel to telemetry remediation. Gate B failure is the correct outcome when a high-risk scenario has poor detectability and no documented path to closing the gap; the gate forces an explicit decision before the team spends engineering effort on a detection that cannot be validated.

### Step 5: Observable and Telemetry

*Methodology:*[*Part 2A → Phase 3: Telemetry and Data Readiness Assessment*](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)*· Part 2B → Task Card 4: Telemetry Feasibility Review*

- **Service-principal credential added outside change window**— Required Telemetry: Cloud audit logs, change tickets — Current Status: Available, ticket join partial

- **Backup vault deletion or retention reduction**— Required Telemetry: Cloud audit logs, backup platform logs — Current Status: Available, retention too short

- **Same actor or source path across identity and destructive event**— Required Telemetry: Cloud audit logs, IdP logs, PAM logs — Current Status: Partial

### Step 6: Hunt Hypothesis

*Methodology:*[*Part 2A → Phase 6: Hypothesis-Driven Threat Hunting Backlog*](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)*· Part 2B → Task Card 6: Hunt Hypothesis Generator · Part 2B → AI Workflow 4: Hunt Hypothesis Generation*

```text
HUNT
-01
:
If an actor 
is
 preparing destructive cloud activity through identity abuse,
then we may observe privileged service-principal credential changes outside approved change windows,
followed within 
4
 hours 
by
 backup deletion, retention reduction, snapshot deletion, 
or
 logging changes.
```

**Result classification options:**

```text
Positive finding / Negative 
with
 good visibility / Negative 
with
 weak visibility / Inconclusive / Rejected hypothesis
```

### Step 7: Detection Design

*Methodology:*[*Part 1 → ATT&CK and D3FEND Mapping Quality*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 1 → Detection Readiness Levels*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 2A → Phase 7: Detection Engineering Design*](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)*· Part 2B → Task Card 7: Detection Logic Draft*

```text
DET-001:
Name:
 
Cloud
 
identity
 
escalation
 
followed
 
by
 
recovery-impacting
 
action
DRL:
 
DRL-1
ATT&CK:
  
T1078.004 Valid Accounts:
 
Cloud
 
Accounts
 
—
 
evidence:
 
E-002;
 
customer
 
service
 
principals
 
confirmed
 
capable
 
of
 
accessing
 
backup
 
vault;
 
controlled
 
test
 
(TEST-CLOUD-IAM-001)
 
used
 
this
 
technique.
  
T1098.001 Account Manipulation:
 
Additional
 
Cloud
 
Credentials
 
—
 
evidence:
 
E-001;
 
public
 
reporting
 
documents
 
this
 
technique
 
as
 
the
 
pre-positioning
 
step
 
in
 
financial
 
sector
 
incidents.
  
T1490
 
Inhibit
 
System
 
Recovery
 
—
 
evidence:
 
E-001,
 
E-003;
 
backup
 
vault
 
deletion
 
and
 
retention
 
reduction
 
directly
 
inhibit
 
recovery
 
capability;
 
retention
 
gap
 
(14
 
days)
 
confirmed
 
in
 
customer
 
environment.
D3FEND:
 
Administrative
 
Access
 
Authentication,
 
Credential
 
Rotation,
 
File
 
Backup,
 
User
 
Account
 
Permissions
Log sources:
 
cloud
 
audit
 
logs,
 
IdP
 
logs,
 
change
 
tickets,
 
backup
 
platform
 
logs
Required fields:
 
actor,
 
source_ip,
 
action,
 
resource_id,
 
timestamp,
 
change_ticket,
 
result
Correlation:
 
identity
 
escalation
 
followed
 
by
 
destructive
 
or
 
recovery-inhibiting
 
action
 
within
 
4
 
hours
Known false positives:
 
approved
 
automation,
 
emergency
 
maintenance,
 
break-glass
 
recovery
 
testing
```

### Step 8: Test Plan

*Methodology:*[*Part 1 → DRL Transition Evidence Requirements*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 2A → Phase 9: Test Data, Simulation, and Replay*](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)*· Part 2B → AI Workflow 7: Test Case Generation*

- **Positive synthetic event: credential addition followed by backup deletion:**Alert fires

- **Negative event: approved automation with valid ticket:**Alert suppressed or lower severity

- **Edge event: missing change ticket field:**Alert fires with “ticket unknown” enrichment

- **Historical preview: 30 days:**Alert volume and false-positive categories documented

**Sample test evidence:**

```text
Detection ID:
 
DET-001
Test date:
 
2026-05-01
Tester:
 
detection
 
engineer
Data source:
 
cloud
 
audit
 
logs
Test type:
 
positive
 
synthetic
 
event
 
validated
 
against
 
real
 
sample
 
event
Input event or dataset:
 
TEST-CLOUD-IAM-001
Expected result:
 
alert
 
fires
Actual result:
 
alert
 
fired
 
with
 
actor,
 
source_ip,
 
resource_id,
 
action,
 
and
 
timestamp
 
populated
Pass/fail:
 
pass
Synthetic event used:
 
yes
Real sample event reference:
 
SAMPLE-CLOUD-AUDIT-014
Field names match customer schema:
 
yes
Values match expected platform encoding:
 
yes
Validated by:
 
platform
 
owner
Reviewer:
 
SOC
 
lead
```

**DRL progression:**

```text
DRL-2: required fields confirmed in SAMPLE-CLOUD-AUDIT-014.
DRL-3: query compiled in target SIEM.
DRL-4: positive test passed with validated synthetic event.
DRL-5: negative and edge tests passed.
DRL-6: 30-day historical preview completed.
```

### Step 9: SOC Action

*Methodology:*[*Part 2A → Phase 10: SOC Triage and Incident Workflow*](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)*·*[*Part 2A → Phase 11: Pilot Deployment and Tuning*](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)*· Part 2B → Task Card 9: SOC Playbook Draft*

```text
First 15 minutes:
1.
 Confirm actor, source IP, MFA state, and session path.
2.
 Check change ticket and emergency maintenance records.
3.
 Identify affected backup or production resources.
4.
 Preserve cloud audit logs, IdP logs, and PAM session evidence.
5.
 Escalate to IR if credential change is unauthorized or recovery assets were modified.
```

**SOC dry-run record:**

```text
Playbook ID:
 
PB-DET-001
Dry-run date:
 
2026-05-03
Participants:
 
SOC
 
lead,
 
L2
 
analyst,
 
detection
 
engineer,
 
cloud
 
platform
 
owner
Scenario:
 
service-principal
 
credential
 
addition
 
followed
 
by
 
backup
 
retention
 
reduction
Result:
 
analyst
 
completed
 
first
 
15
-minute
 
triage
 
in
 
11
 
minutes
Missing fields:
 
none
Escalation path:
 
confirmed
Evidence preservation steps:
 
confirmed
Status:
 
approved
DRL update:
 
DRL-7
```

**Pilot record:**

```text
Pilot duration: 
5
 business days
Alert volume: 
4
 alerts
True
 positives: 
0
 malicious
Benign 
true
 positives: 
1
 approved emergency maintenance
False
 positives: 
3
 approved automation events missing ticket enrichment
Precision estimate: 
not
 meaningful 
for
 this pilot. Zero malicious 
true
 positives occurred during the 
5
-day window — this 
is
 expected 
for
 a detection targeting rare pre-positioning behavior 
and
 does 
not
 indicate a detection failure. Precision 
is
 undefined (
not
 zero) 
when
 TP = 
0
; reporting 
0%
 would misrepresent the detection
's health. Tuning is required before DRL-9 promotion to reduce the FP count from automation events.
Expected post-tuning FP rate: <
20%
; derivation: automation identity list expected 
to
 suppress all 
3
 automation FPs; emergency maintenance FP handled 
by
 approved maintenance window suppression; 
0
 residual FPs anticipated 
in
 steady state 
for
 both suppression rules combined.
Tuning decision: add approved automation identity list 
and
 require missing 
or
 invalid change ticket 
for
 high severity
Zero 
true
-positive explanation: no malicious activity expected during pilot; detection value validated 
by
 controlled test TP (TEST-CLOUD-IAM-
001
) 
and
 benign 
true
-positive classification.
Labeling completeness: 
100%
 (
4
/
4
 alerts labeled 
by
 SOC lead 
and
 L2 analyst)
Low-frequency exception: invoked — 
4
 alerts falls below the 
5
-alert minimum 
for
 DRL-
8
 promotion. Exception approved 
by
 SOC lead 
2026
-
05
-
08
 
on
 the basis 
of
: (
1
) 
100%
 labeling completeness; (
2
) all 
4
 alerts fully classified 
with
 documented benign rationale; (
3
) controlled test TP provides confirmed positive evidence independent 
of
 pilot volume; (
4
) scenario targets rare adversary pre-positioning behavior 
not
 expected 
to
 generate high baseline volume 
in
 a 
5
-day window. Exception recorded 
in
 Gate E evidence pack.
Status:
 pilot completed 
with
 tuning
DRL update: DRL-
8
```

**Note on labeling completeness in real engagements:**In this example, four alerts over five days made 100% labeling trivially achievable. For detections targeting rare adversary pre-positioning, 0% pilot precision is a measurement artifact, not a quality signal: when no malicious true positives occur during a short pilot window, the precision formula is undefined (TP = 0 makes the ratio 0/FP, not 0%), not a failure indicator. Do not flag the detection as precision-deficient on this basis alone; instead, record the FP categories, document the expected post-tuning FP rate, and confirm detection value through controlled positive tests. On engagements with higher alert volume, labeling completeness must be actively tracked from Day 1 of the pilot. If labeling completeness falls below 80% at the end of the pilot window, the team must choose one of three options: (1) extend the pilot by at least 5 business days and continue tracking labels, (2) relabel all unlabeled alerts retrospectively with direct SOC involvement before closing the pilot, or (3) document the gap as a known limitation, block the DRL-8 to DRL-9 transition until it is resolved, and record the decision and recovery plan in the Detection Health Register and Gate E evidence pack. Choosing option 3 without a dated resolution plan is not acceptable.

### Step 10: Decision and Metric

*Methodology:*[*Part 1 → Claim-to-Action Chain*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 2A → Phase 0: Success Metric Floors*](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)

```text
Decision 
DEC
-01
:
Approve 
30
-
day
 remediation 
to
 extend cloud audit retention 
for
 backup
-
related events 
from
 
14
 days 
to
 
90
 days 
and
 pilot DET
-001.
Metric:
DET
-001
 reaches DRL
-9
 
within
 
60
 days, cloud backup audit retention reaches 
90
 days, 
and
 
all
 future alerts include actor, source_ip, resource_id, 
and
 ticket context.
```

### Step 11: DRL-9 Production Deployment and Gate E Evidence Pack

*Methodology:*[*Part 1 → Detection Readiness Levels*](2026-05-11-customer-driven-ai-cti-project-template-part-1-foundations-745861507d03.md)*·*[*Part 2A → Phase 12: Production Deployment*](2026-05-12-customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59.md)*· Part 2B → Gate E: Production Approval*

This step shows what “done” looks like at production readiness. All fields are required.

**Timeline note:**In this example, the detection moves from first test (2026–05–01) to DRL-9 (2026–05–15) in approximately 15 days. This is compressed for illustration. In a real engagement, the DRL-0 to DRL-9 path typically takes 6–12 weeks depending on telemetry readiness, SOC bandwidth, pilot alert volume, and approval SLAs. The example is intended to show the required artifacts and field completeness, not to set a timeline expectation.

**Completed Production Readiness Checklist:**

```text
Detection logic validated:
 
yes
 
—
 
DET-001
 
v1.2
 
approved
 
by
 
detection
 
engineer
 
and
 
CTI
 
lead.
Positive tests passed:
 
yes
 
—
 
TEST-CLOUD-IAM-001
 
with
 
validated
 
synthetic
 
event
 
SAMPLE-CLOUD-AUDIT-014.
Negative tests passed:
 
yes
 
—
 
approved
 
automation
 
identity
 
list
 
and
 
valid
 
change
 
ticket
 
suppress
 
correctly.
Historical preview completed:
 
yes
 
—
 
30
-day
 
preview,
 
4
 
alerts
 
per
 
5
-day
 
window,
 
3
 
FP
 
categories
 
documented.
False positives documented:
 
yes
 
—
 
approved
 
automation,
 
emergency
 
maintenance,
 
break-glass
 
recovery
 
testing.
SOC playbook approved:
 
yes
 
—
 
PB-DET-001
 
approved
 
after
 
dry-run
 
2026-05-03
.
Severity approved:
 
yes
 
—
 
High
 
for
 
missing
 
ticket
 
+
 
destructive
 
action;
 
Medium
 
for
 
credential
 
change
 
only.
Owner assigned:
 
yes
 
—
 
detection
 
engineer
 
(primary),
 
SOC
 
lead
 
(operational).
Rollback plan defined:
 
yes
 
—
 
see
 
below.
Monitoring enabled:
  
-
 
Data source silence alert:
 
configured;
 
triggers
 
if
 
cloud
 
audit
 
logs
 
stop
 
ingesting
 
for
 
more
 
than
 
24
 
hours.
  
-
 
Zero-alert baseline alert:
 
configured;
 
triggers
 
if
 
DET-001
 
fires
 
zero
 
alerts
 
for
 
14
 
consecutive
 
days
 
without
 
approved
 
suppression.
  
-
 
Scheduled review date:
 
2026-08-01
,
 
assigned
 
to
 
detection
 
engineer.
Emergency disable procedure confirmed:
  
-
 
Disable owner:
 
SOC
 
lead,
 
authorized
 
by
 
customer
 
security
 
lead.
  
-
 
Disable steps tested:
 
yes
,
 
tested
 
2026-05-15 
during
 
production
 
deployment
 
cycle.
Detection health entry created:
 
yes
 
—
 
see
 
below.
Review date assigned:
 
2026-08-01
.
```

**Rollback plan stub:**

```text
Detection ID: DET
-001
Disable owner: SOC lead
Disable 
procedure
: 
Set
 rule status 
to
 disabled 
in
 SIEM rule management console; confirm alert routing stops 
within
 
15
 minutes; notify detection engineer 
and
 customer security lead.
Expected customer impact: loss 
of
 detection coverage 
for
 cloud 
identity
 escalation 
to
 recovery
-
impacting action; compensating control 
is
 manual review 
of
 cloud audit logs weekly until rule 
is
 re
-
enabled.
Notification path: detection engineer 
-
>
 SOC lead 
-
>
 customer security lead 
-
>
 executive sponsor if impact exceeds 
48
 hours.
Re
-
enable criteria: root cause documented, logic corrected 
or
 suppression added, positive 
and
 negative tests passed, SOC lead approves.
Post
-
disable review requirement: detection engineer must 
open
 re
-
enable request 
within
 
5
 business days 
with
 root cause 
and
 fix plan.
```

**DRL-9 Detection Health Register entry:**

```text
Detection ID:
 
DET-001
Status:
 
production
DRL:
 
DRL-9
Alert Volume:
 
4
 
alerts
 
per
 
5
-day
 
pilot
 
window;
 
0.8
 
alerts
 
per
 
business
 
day
 
expected
 
baseline
Labeling Completeness:
 
100
%
 
(4/4
 
pilot
 
alerts
 
labeled)
FP Rate:
 
75
%
 
during
 
pilot
 
before
 
tuning;
 
expected
 
<
 
20
%
 
after
 
automation
 
identity
 
list
 
applied
TP Count:
 
0
 
malicious
 
TP
 
during
 
pilot;
 
1
 
controlled
 
test
 
TP
 
from
 
TEST-CLOUD-IAM-001
Benign TP Count:
 
1
 
(approved
 
emergency
 
maintenance)
Last Fired:
 
2026-05-07
Last Tested:
 
2026-05-15
Last Reviewed:
 
2026-05-15
Data Source Health:
 
cloud
 
audit
 
logs
 
healthy;
 
backup
 
platform
 
logs
 
healthy;
 
ticket
 
join
 
partial
 
—
 
62
%
 
of
 
audit
 
events
 
matched
 
a
 
change
 
ticket
 
by
 
resource_id
 
in
 
30
-day
 
preview
 
(41/66
 
events
 
matched;
 
25
 
lacked
 
ticket
 
field
 
or
 
had
 
no
 
matching
 
ticket)
 
—
 
logged
 
as
 
GAP-003
Rule Errors:
 
none
Suppression Hit Rate:
 
3
/4
 
pilot
 
alerts
 
suppressed
 
or
 
down-severity
 
by
 
automation
 
identity
 
list
 
post-tuning
Last Disable Test Date:
 
2026-05-15
Next Disable Test Due:
 
2027-05-15
Owner:
 
detection
 
engineer
Action Required:
 
close
 
GAP-003
 
(ticket
 
join)
 
by
 
2026-07-01
;
 
re-assess
 
after
 
cloud
 
audit
 
retention
 
extends
 
to
 
90
 
days.
```

**Gate E evidence pack summary for DET-001:**

```text
Gate ID:
 
GATE-E-DET-001
Gate name:
 
Production
 
Approval
Gate owner:
 
detection
 
engineer
 
and
 
SOC
 
lead
Date:
 
2026-05-15
Related deliverables:
 
DET-001,
 
PB-DET-001,
 
Production
 
Readiness
 
Checklist
Required evidence:
 
Test
 
Evidence
 
ID,
 
SOC
 
Playbook
 
ID,
 
Detection
 
Health
 
entry,
 
rollback
 
plan,
 
labeling
 
completeness
 
record
Evidence IDs:
 
E-002,
 
E-003
Test Evidence IDs:
 
TEST-CLOUD-IAM-001,
 
TEST-NEG-001,
 
TEST-EDGE-001
Decision IDs:
 
DEC-01
Open blockers:
 
none
Exception requested:
 
yes
 
—
 
low-frequency
 
pilot
 
exception
 
(SOC
 
lead
 
approval
 
2026-05-08
);
 
see
 
pilot
 
record.
Gate status:
 
Pass
Approver:
 
detection
 
engineer
 
and
 
SOC
 
lead
Notes:
  
ATT&CK
 
mappings:
 
all
 
three
 
techniques
 
(T1078.004,
 
T1098.001,
 
T1490)
 
confirmed
 
with
 
evidence
 
references;
 
no
 
candidate
 
mappings
 
counted
 
as
 
coverage.
  
GAP-003
 
(ticket
 
join
 
partial):
 
completeness
 
62
%
 
(41/66
 
events
 
in
 
30
-day
 
preview);
 
partial-join
 
events
 
receive
 
medium
 
severity;
 
full-join
 
events
 
receive
 
high
 
severity.
 
Gap
 
tracked
 
in
 
Detection
 
Health
 
Register
 
with
 
closure
 
target
 
2026-07-01
.
  
Low-frequency exception:
 
pilot
 
volume
 
(4
 
alerts)
 
below
 
5
-alert
 
minimum;
 
exception
 
approved
 
by
 
SOC
 
lead
 
on
 
documented
 
basis;
 
see
 
pilot
 
record
 
for
 
criteria.
  
Gate F note:
 
DET-001
 
is
 
eligible
 
for
 
Gate
 
F
 
review.
 
ATT&CK
 
mappings
 
are
 
confirmed,
 
not
 
candidates.
 
GAP-003
 
does
 
not
 
block
 
Gate
 
F
 
provided
 
closure
 
target
 
(2026-07-01)
 
is
 
met
 
and
 
completeness
 
reaches
 
≥80%
 
before
 
Gate
 
F
 
submission.
```

## Final Customer Delivery Package

The final package should include:

- executive summary;

- key judgments with confidence;

- evidence register;

- decision register;

- PIR/SIR register;

- crown-jewel map;

- attack surface and trust boundary map;

- telemetry map;

- customer detection data model;

- CTI source register;

- threat relevance matrix;

- top threat scenarios;

- hunt backlog;

- detection backlog;

- deployed detections;

- detection health register;

- detection coverage gap register;

- detection test evidence;

- purple-team test register;

- SOC playbooks;

- IOC review register;

- contradiction register;

- collection gaps;

- RAID register;

- customer acceptance record;

- AI use log;

- 30/60/90-day roadmap.

## Minimum Viable Customer Delivery

A successful first-cycle delivery must be small enough to finish and strong enough to prove value.

Minimum viable delivery:

- 3 approved PIRs;

- 3 crown jewels mapped;

- 1 attack surface and trust boundary map for the highest-priority environment;

- 1 customer detection data model covering the first priority telemetry sources;

- 5 validated CTI sources;

- 3 customer-specific threat scenarios with priority scores;

- 5 hunt hypotheses;

- 3 detection designs;

- 1 detection moved to pilot (minimum DRL-7, SOC playbook approved and dry-run completed before pilot starts);

- 1 SOC playbook dry-run;

- 1 executive decision note;

- visible evidence, decision, contradiction, RAID, and telemetry gap registers.

If these cannot be completed in the first cycle, reduce scope before expanding analysis.

## 30/60/90-Day Execution Plan

The 30/60/90 plan must be dependency-aware. Complex customers may not reach production detection deployment in 90 days if telemetry, ownership, legal review, or SOC workflow maturity is not ready.

### Milestone Dependency Table

- **PIR approval**— Dependency: Executive and security stakeholder access — Risk if Missing: Work becomes analyst-driven instead of decision-driven — Fallback: Run a short PIR workshop and freeze scope.

- **Crown-jewel map**— Dependency: Business and platform owner participation — Risk if Missing: Scenarios become generic — Fallback: Start with one business unit or critical service.

- **Telemetry assessment**— Dependency: SIEM and platform access — Risk if Missing: Detections cannot be validated — Fallback: Produce telemetry gap plan and lab-only logic.

- **Detection pilot**— Dependency: Parsed fields and SOC routing — Risk if Missing: Rule creates noise or no operational action — Fallback: Keep rule in lab and build playbook first.

- **Production deployment**— Dependency: Tests, pilot, owner, monitoring, rollback — Risk if Missing: Unsupported production claim — Fallback: Report as pilot or backlog, not production.

The 30/60/90 plan is the operational implementation of the Master Workflow. Use the Master Workflow to define the sequence and the 30/60/90 plan to define timing, checkpoints, and fallback decisions.

### Plan Selection Rules

- **Telemetry, detection engineering, and SOC workflow are all Level 2 or higher:**Full Maturity 90-Day Plan may be attempted.

- **Any of telemetry, detection engineering, or SOC workflow is below Level 2:**Minimum Viable 90-Day Plan is mandatory.

- **AI governance is Level 0 and AI use is required:**Project cannot use AI until governance reaches Level 2 or AI is removed from scope.

- **AI governance is Level 1 (informal) or Level 2 policy only, but no approved tool in the register:**AI workflows are disabled until at least one tool is approved and entered in the Approved AI Tool Register. An approved policy without an approved tool is not sufficient.

- **Legal/privacy process is Level 0 and regulated or personal data is in scope:**Project remains Mode 1 until approval path exists. Mode 1 legal/privacy gate applies.

### IR Pause/Resume Protocol

If the Active Compromise Escalation Protocol (Part 1 Rule 18) is triggered at any point during the 90-day plan, the following logic applies automatically:

**On IR Pause trigger:**

- All analytical work on affected evidence, telemetry, or detection logic pauses immediately. “Affected” means any evidence, log source, scenario, or detection that references data from the environment under active investigation.

- The current project day counter freezes. The elapsed-day count at the pause moment is recorded in the RAID Register (entry type: Issue).

- All SLA clocks on affected deliverables pause. SLA timers for unaffected deliverables continue.

- The IR lead provides written clearance criteria: the specific conditions that must be met before project work may resume (e.g., “IR containment confirmed,” “affected log sources re-verified clean,” “customer security lead sign-off”).

- The Executive Sponsor and Customer Security Lead are notified within 24 hours.

**On IR Resume:**

- IR lead provides written clearance confirming resume criteria are met. Clearance is recorded in the RAID Register with the clearance date and the elapsed pause duration.

- The project day counter resumes from the frozen point. Days elapsed during the pause are not counted toward the 90-day window.

- **SLA re-baselining:**All SLA clocks are reset from the resume date. The original SLA commitments remain; only the start clock shifts. Example: a Gate B target originally on Day 40 that was paused on Day 28 for 15 days resumes with a new target of Day 55 (original target + pause duration).

- **Milestone recalculation:**All Day 20, Day 50, and Day 70 checkpoints are shifted by the pause duration. Record the updated checkpoint dates in the RAID Register alongside the original dates.

- Any detection logic, scenarios, or evidence that relied on data from the affected environment must be reviewed for integrity before being used in AI workflows or gate submissions. Review is documented in the AI Use Log and RAID Register.

- If the pause duration exceeds 30 days, the plan selection rules must be re-evaluated: evidence from before the pause may be stale and require re-validation before use in gate decisions.

**IR Pause RAID Register entry fields:**

```text
RAID ID:
Type:
 
Issue
Description:
 
Active
 
Compromise
 
Escalation
 
Protocol
 
triggered
 
—
 
project
 
paused
Trigger date:
Affected
 
artifacts
 
(Evidence
 
IDs,
 
Detection
 
IDs,
 
Source
 
IDs):
IR lead:
Resume criteria:
Pause
 
duration
 
(days):
Resume date:
SLA re-baseline applied:
 
Y/N
Updated checkpoint dates:
Clearance reference:
```

### Day 20 and Day 50 Checkpoints

**Day 20 checkpoint:**

- confirm PIRs, crown jewels, mode selection, AI tool approval, and telemetry access;

- de-escalate from Full Maturity to Minimum Viable plan if telemetry or SOC routing is not confirmed;

- escalate from Mode 1 to Mode 2 only if searchable telemetry and collection owners are confirmed.

**Day 50 checkpoint:**

- confirm detection designs, test data, SOC playbook path, and pilot feasibility;

- de-escalate production goals to pilot-only if DRL-5 is not reached;

- escalate to production goal only if DRL-7 is realistically reachable by Day 70.

### Minimum Viable 90-Day Plan

This plan is realistic when customer access, telemetry, and approvals are constrained.

**Days 1–30:**

- approve charter, AI rules, and data handling;

- define 3–5 PIRs;

- map 3 crown jewels;

- validate 5–10 CTI sources;

- build first evidence, decision, and gap registers.

**Days 31–60:**

- complete telemetry assessment for priority sources;

- create 3 threat scenarios with priority scores;

- create 5 hunt hypotheses;

- design 3 detections;

- draft 1–3 SOC playbooks.

**Days 61–90:**

- execute priority hunts where telemetry exists;

- move 1 detection to pilot (DRL-7 required before pilot starts: SOC playbook approved and dry-run completed);

- complete positive and negative tests for pilot detection;

- deliver executive decision note;

- deliver telemetry remediation roadmap.

Note on DRL-7 readiness: for Medium or High Complexity projects, reaching DRL-7 before pilot start requires SOC playbook design and a dry-run, which may not be achievable by Day 90 if SOC bandwidth is constrained. If DRL-6 is reached by Day 85, carrying the pilot preparation into a second cycle is acceptable. This must be declared in the executive decision note as a known delivery gap with a target date for DRL-7 and pilot start.

### Full Maturity 90-Day Plan

Use this plan only when the customer already has strong telemetry, owners, SOC workflow, and deployment access.

### First 30 Days

- approve charter and AI rules;

- define PIRs and SIRs;

- map crown jewels;

- assess telemetry readiness;

- validate priority CTI sources;

- create initial threat scenarios;

- identify first collection gaps.

### Days 31–60

- run priority hunts;

- design first detections;

- build detection-as-code workflow;

- create test cases;

- run historical previews;

- draft SOC playbooks;

- pilot highest-value detections.

### Days 61–90

- tune pilot detections;

- promote validated detections to production;

- close highest-impact telemetry gaps;

- deliver executive risk note;

- measure coverage improvement;

- reprioritize backlog;

- set continuous improvement cadence.

## References

- ODNI,**ICD 203: Analytic Standards**:[https://www.dni.gov/files/documents/ICD/ICD-203.pdf](https://www.dni.gov/files/documents/ICD/ICD-203.pdf).

- CIA Center for the Study of Intelligence,**A Tradecraft Primer: Structured Analytic Techniques for Improving Intelligence Analysis**:[https://www.cia.gov/resources/csi/books-monographs/a-tradecraft-primer/](https://www.cia.gov/resources/csi/books-monographs/a-tradecraft-primer/).

- NIST,**Artificial Intelligence Risk Management Framework (AI RMF 1.0)**:[https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10).

- NIST,**AI Risk Management Framework**:[https://www.nist.gov/itl/ai-risk-management-framework](https://www.nist.gov/itl/ai-risk-management-framework).

- NIST,**Privacy Framework**:[https://www.nist.gov/privacy-framework](https://www.nist.gov/privacy-framework).

- MITRE,**ATT&CK Enterprise Matrix**:[https://attack.mitre.org/matrices/enterprise/](https://attack.mitre.org/matrices/enterprise/).

- MITRE ATT&CK,**Data Sources**:[https://attack.mitre.org/datasources/](https://attack.mitre.org/datasources/).

- MITRE ATT&CK,**Data Components**:[https://attack.mitre.org/datacomponents/](https://attack.mitre.org/datacomponents/).

- MITRE,**D3FEND Matrix**:[https://d3fend.mitre.org/](https://d3fend.mitre.org/).

- MITRE Center for Threat-Informed Defense:[https://ctid.mitre.org/](https://ctid.mitre.org/).

- Sergio Caltagirone, Andrew Pendergast, and Christopher Betz,**The Diamond Model of Intrusion Analysis**, 2013:[https://act.globalcyberalliance.org/index.php/The_Diamond_Model_of_Intrusion_Analysis](https://act.globalcyberalliance.org/index.php/The_Diamond_Model_of_Intrusion_Analysis).

- Lockheed Martin,**Cyber Kill Chain**:[https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html).

- SigmaHQ,**Sigma Rules Specification**:[https://sigmahq.io/sigma-specification/specification/sigma-rules-specification.html](https://sigmahq.io/sigma-specification/specification/sigma-rules-specification.html).

- Elastic,**Validate and test rules**:[https://www.elastic.co/docs/solutions/security/detect-and-alert/validate-and-test-rules](https://www.elastic.co/docs/solutions/security/detect-and-alert/validate-and-test-rules).

- Elastic,**Detection Rules repository**:[https://github.com/elastic/detection-rules](https://github.com/elastic/detection-rules).

- Splunk,**Security Content repository**:[https://github.com/splunk/security_content](https://github.com/splunk/security_content).

- OpenAI,**Evaluation best practices**:[https://platform.openai.com/docs/guides/evaluation-best-practices](https://platform.openai.com/docs/guides/evaluation-best-practices).

- [39] FIRST,**CTI Fundamentals Curriculum — Priority Intelligence Requirements**:[https://www.first.org/education/trainings](https://www.first.org/education/trainings)— source for treating PIRs as decision-quality questions limited to key decision points and continually refined as the environment changes.

- [40] NATO,**AJP-2.0: Allied Joint Doctrine for Intelligence, Counter-Intelligence and Security**— source for PIR as the commander’s priority intelligence need and SIR as the supporting specific requirement that guides collection, processing, and analysis.

## Follow for practical cybersecurity research

If you’re interested in**Offensive security,****AI security, real-world attack simulations, CTI, and detection engineering**— this is exactly what I focus on.

### Stay connected:

→**Subscribe on Medium:**[medium.com/@1200km](https://medium.com/@1200km)
→**Connect on LinkedIn:**[andrey-pautov](https://www.linkedin.com/in/andrey-pautov/)
→**GitHub — tools & labs:**[github.com/anpa1200](https://github.com/anpa1200)
→**Contact:**[1200km@gmail.com](mailto:1200km@gmail.com)
