---
title: "AdversaryGraph: I Built a Self-Hosted AI Threat Intelligence Platform \u2014 Here\u2019s How to Use It"
description: "GitHub - anpa1200/threatmapper: AI-powered MITRE ATT&CK threat intelligence platform - D3.js navigator, APT comparison, Claude/GPT-4o/Gemini analysis, PDF reports"
image: "https://cdn-images-1.medium.com/max/1024/1*31Nq2VMJ9Mm9lgryHGJRQQ.png"
---

# AdversaryGraph: I Built a Self-Hosted AI Threat Intelligence Platform — Here’s How to Use It


<img src="https://cdn-images-1.medium.com/max/1024/1*31Nq2VMJ9Mm9lgryHGJRQQ.png" alt="Cover image" width="1024" height="572" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://infosecwriteups.com/threatmapper-i-built-a-self-hosted-ai-threat-intelligence-platform-heres-how-to-use-it-0aa7673e6bd8](https://infosecwriteups.com/threatmapper-i-built-a-self-hosted-ai-threat-intelligence-platform-heres-how-to-use-it-0aa7673e6bd8)
- **Published:** 2026-06-07
- **Preserved media:** 34 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 18 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium RSS article into the 1200km.com Docusaurus ecosystem. The article flow, images, screenshots, infographics, and technical blocks are preserved from the Medium feed.

### Map adversary behaviour to MITRE ATT&CK in seconds, compare against 160+ APT groups, and generate PDF reports — all running locally with your own LLM keys.

<img src="https://cdn-images-1.medium.com/max/1024/1*31Nq2VMJ9Mm9lgryHGJRQQ.png" alt="Article image" width="1024" height="572" loading="lazy" decoding="async" />

## Table of Contents

1. **The Problem**
2. **What**AdversaryGraph**Does**
3. **Architecture in Brief**
4. **Setting Up (10 Minutes)**
5. **Core Workflow: Analysing a Threat Report**
6. **The Navigator: Your ATT&CK Workspace**
7. **APT Attribution Deep-Dive: Three Compare Modes**
8. **Two Databases: Actor Profiles and Your Report Library**
9. **Generating Reports**
10. **Using the AI Chat Assistant**
11. **Working with All Three ATT&CK Domains**
12. **API Usage (Headless / CI Integration)**
13. **Keeping ATT&CK Data Fresh**
14. **Tips for Analysts**
15. **Security Considerations**
16. **What’s Coming Next**
17. **Final Thoughts**

## The tool:

[GitHub - anpa1200/threatmapper: AI-powered MITRE ATT\&CK threat intelligence platform - D3.js navigator, APT comparison, Claude/GPT-4o/Gemini analysis, PDF reports](https://github.com/anpa1200/threatmapper)

### Docs :

[ThreatMapper - Self-Hosted AI Threat Intelligence | ThreatMapper](https://anpa1200.github.io/threatmapper-docs/)

## The Problem

<img src="https://cdn-images-1.medium.com/max/1024/1*69nMwI7Xj8eNIWHv_C_KVg.png" alt="Article image" width="1024" height="683" loading="lazy" decoding="async" />

Every threat intelligence analyst knows the workflow: you receive a malware report, an IR summary, or a threat feed entry, and you need to translate it into ATT&CK technique IDs so you can slot it into a detection backlog or a purple-team plan.

Doing this manually is slow. You read the report, recognise a behaviour (“the implant used scheduled tasks for persistence”), pull up the ATT&CK website, search for the technique, copy the ID. Repeat 20 times for a single report. Then someone asks:*“Does this look like APT29?”*— and you start manually cross-referencing technique lists.

There are commercial platforms that do this — but they are expensive, require data to leave your environment, and often treat ATT&CK as a secondary feature behind proprietary kill-chains.

AdversaryGraph is my attempt to solve this for analysts who want a self-hosted, privacy-first, open-source option that uses the LLM API keys they already have.

## What AdversaryGraph Does

<img src="https://cdn-images-1.medium.com/max/1024/1*7jquz_YKO0Odni3r3InzYw.png" alt="Article image" width="1024" height="683" loading="lazy" decoding="async" />

In one sentence:**you give it a threat report, it gives you ATT&CK technique IDs, APT group matches, confidence scores, and a PDF.**

**Concretely:**

<img src="https://cdn-images-1.medium.com/max/1024/1*VAfpLRWhfkB0pwRR5C4Nlw.png" alt="Article image" width="1024" height="539" loading="lazy" decoding="async" />

- **AI Analysis**— upload a PDF, DOCX, or TXT file (or paste text), pick Claude, GPT-4o, or Gemini, and get a streamed extraction of every ATT&CK technique the LLM identifies with evidence snippets and confidence scores

<img src="https://cdn-images-1.medium.com/max/502/1*Up-LNxuga22bScwyZiFuHA.png" alt="Article image" width="502" height="1007" loading="lazy" decoding="async" />

- **ATT&CK Navigator**— an interactive heatmap of the full ATT&CK matrix (Enterprise, Mobile, ICS) where you build and explore your TTP layer

<img src="https://cdn-images-1.medium.com/max/1024/1*4zLLN71CBFHIMCEPOrTxmw.png" alt="Article image" width="1024" height="423" loading="lazy" decoding="async" />

- **APT Attribution**— automatic Jaccard similarity ranking of every extraction against 174+ named ATT&CK threat groups and 56+ named campaigns (e.g. “Operation Ghost”, “SolarWinds Compromise”)

<img src="https://cdn-images-1.medium.com/max/1024/1*Dw7KTqHRijCEkYvUrdBMbQ.png" alt="Article image" width="1024" height="407" loading="lazy" decoding="async" />

- **Compare**— deep side-by-side comparison of your TTP set against groups, MITRE named campaigns, or your own stored report library; with visual matrix diff, tactic breakdown chart, and gap analysis

<img src="https://cdn-images-1.medium.com/max/1024/1*07j05Kn78RJY96S3Ga4IVQ.png" alt="Article image" width="1024" height="423" loading="lazy" decoding="async" />

- **Export**— ATT&CK Navigator-compatible JSON layers and multi-page PDF reports suitable for executive briefings

Everything runs locally in Docker. Your threat reports never leave your machine.(With local or private LLM)

<img src="https://cdn-images-1.medium.com/max/1024/1*z711T5SOrORpjITlM2IY9A.png" alt="Article image" width="1024" height="146" loading="lazy" decoding="async" />

## Architecture in Brief

AdversaryGraph is four containers:

<img src="https://cdn-images-1.medium.com/max/1024/1*a6c9YTdIktlPk1w0FRQHaA.png" alt="Article image" width="1024" height="683" loading="lazy" decoding="async" />

The backend ingests ATT&CK STIX 2.1 bundles directly from MITRE’s GitHub repository using pure Python — no third-party ATT&CK library, fully compatible with Python 3.12. All three ATT&CK domains (Enterprise, Mobile, ICS) are parsed and stored in PostgreSQL with JSONB arrays for the STIX arrays.

LLM calls go directly from the FastAPI backend to Anthropic / OpenAI / Google using their official SDKs. Your API keys never touch a third-party service beyond the LLM provider itself.

## Setting Up (10 Minutes)

### Prerequisites

- Docker + Docker Compose
- An API key for at least one of: Anthropic (Claude), OpenAI, Google Gemini

### Step 1: Clone and configure

```text
git clone https://github.com/anpa1200/AdversaryGraph.git
cd AdversaryGraph
cp .env.example .env
```

**Important:**you must create .env before running docker compose up. Without it the container starts with empty API keys and AI Analysis returns 500.

Open .env and add your keys. You only need one:

```text
ANTHROPIC_API_KEY=sk-ant-...
# OPENAI_API_KEY=sk-...
# GEMINI_API_KEY=AIza...
DB_PASS=choose_a_strong_password
```

```text
If you want a faster first start and only need Enterprise ATT&CK, set:
```

```text
ATTCK_DOMAINS=enterprise-attack
```

This downloads ~35 MB instead of ~105 MB.

### Step 2: Start

```text
docker compose up
```

The first start downloads and ingests ATT&CK data automatically. Watch progress:

```text
docker compose logs -f api
```

You’ll see something like:

<img src="https://cdn-images-1.medium.com/max/1024/1*z4L2KcZIixQjdkrcBt8OlA.png" alt="Article image" width="1024" height="205" loading="lazy" decoding="async" />

```text
Parsing enterprise-attack-19.1.json ...
  Parsed: 15 tactics, 760 techniques, 174 groups, 56 campaigns, 9100+ usages
Finished ingesting enterprise-attack v19.1
INFO:     Application startup complete.
```

This takes 5–15 minutes depending on your network speed. Subsequent startups are instant (data is cached in the PostgreSQL volume).

### Step 3: Open

- Frontend:[http://localhost:3000](http://localhost:3000)

<img src="https://cdn-images-1.medium.com/max/1024/1*l_EPylZmZEnAaDF6JjQE4w.png" alt="Article image" width="1024" height="538" loading="lazy" decoding="async" />

- API docs (Swagger UI):[http://localhost:8000/docs](http://localhost:8000/docs)

<img src="https://cdn-images-1.medium.com/max/1024/1*CsGSK7APVQvnvTDCLxXKNA.png" alt="Article image" width="1024" height="662" loading="lazy" decoding="async" />

## Core Workflow: Analysing a Threat Report

This is the killer feature and what most analysts will use day-to-day.

### Upload your report

Navigate to**Analyze**in the sidebar. You’ll see:

<img src="https://cdn-images-1.medium.com/max/496/1*EsC2UAT23n0xRDPv29oEWg.png" alt="Article image" width="496" height="1006" loading="lazy" decoding="async" />

1. A provider dropdown (Claude / GPT-4o / Gemini)
2. An optional model override (defaults to claude-opus-4-8, gpt-4o, gemini-2.0-flash)
3. A domain selector (enterprise-attack for most corporate IR work)
4. A text area or file upload

For a PDF analysis report:

1. Select**Claude**(or your preferred provider)
2. Leave the domain as enterprise-attack
3. Click**Choose file**and upload your PDF
4. Click**Analyse with AI**

You’ll immediately see the LLM’s response streaming in the output box — token by token, just like ChatGPT. This is not a spinner that makes you wait: you can read the thinking as it happens.

<img src="https://cdn-images-1.medium.com/max/1024/1*89fT-TuOac6OMSNdZ61vag.png" alt="Article image" width="1024" height="536" loading="lazy" decoding="async" />

### Reading the results

When the stream completes, three tabs appear:

<img src="https://cdn-images-1.medium.com/max/273/1*FpAXPkiL1j3fiuOkL7tp8A.png" alt="Article image" width="273" height="47" loading="lazy" decoding="async" />

**Techniques tab**— the core output. Each row shows:

<img src="https://cdn-images-1.medium.com/max/675/1*aSqu_irokLlGQa1Njwa0fQ.png" alt="Article image" width="675" height="785" loading="lazy" decoding="async" />

FieldExampleATT&CK IDT1059.001NamePowerShellTacticExecutionConfidence92%Evidence*”executed a base64-encoded PowerShell payload”*

The evidence field is a direct quote or paraphrase from your source document — you can use it to trace every mapping back to its origin in the text. High confidence (≥ 80%) means the text explicitly described the behaviour; lower scores mean it was inferred.

**APT Matches tab**— the attribution layer. Computed locally using Jaccard similarity between your extracted techniques and every named ATT&CK group’s known TTP set. The top 10 are shown with:

<img src="https://cdn-images-1.medium.com/max/1024/1*RL5VY8-RMrIQv_SIZpwPQQ.png" alt="Article image" width="1024" height="502" loading="lazy" decoding="async" />

- Similarity score (0–100%)
- Shared technique count
- List of the overlapping technique IDs

A match above 25–30% is worth investigating. Don’t treat this as definitive attribution — use it as a lead for further research.

**Raw Response**— the LLM’s full JSON output. Useful for debugging when the model outputs something unexpected.

<img src="https://cdn-images-1.medium.com/max/1024/1*T8D25vI8Mt2T7iWmqEJkfA.png" alt="Article image" width="1024" height="502" loading="lazy" decoding="async" />

## Inject into Navigator

Click**→ Inject into Navigator**to push all extracted techniques into your live Navigator layer. You can then:

<img src="https://cdn-images-1.medium.com/max/1024/1*q9LHKlOmbS1119qTlPKjIA.png" alt="Article image" width="1024" height="510" loading="lazy" decoding="async" />

- See the techniques highlighted on the full ATT&CK matrix
- Overlay an APT group to visualise the behavioural overlap
- Export as an ATT&CK Navigator JSON layer

## The Navigator: Your ATT&CK Workspace

The Navigator is the central hub. It renders the full ATT&CK matrix as an interactive heatmap with D3.js zoom/pan.

### Building a layer

Click any technique cell to add it to your layer (it turns red). Click again to deselect. For sub-techniques, click the small ▶ arrow to expand the parent cell and see the sub-technique rows.

<img src="https://cdn-images-1.medium.com/max/1024/1*QkMDTHSy82_j4PA96Q3j6A.png" alt="Article image" width="1024" height="510" loading="lazy" decoding="async" />

**Practical tip:**use the search box to find techniques by name or ID without manually scanning the matrix. Type T1059 to jump to all Command and Scripting Interpreter techniques, or type phish to find all phishing-related techniques.

### Overlaying an APT group

1. Go to**APT Library**and find your group of interest
2. Click**Overlay on Navigator**
3. Return to**Navigator**

<img src="https://cdn-images-1.medium.com/max/1024/1*62_zstQMYPoqj4kSTn4nBg.png" alt="Article image" width="1024" height="161" loading="lazy" decoding="async" />

The matrix now uses three colours:

- **Red**— in your layer only
- **Blue**— in the APT group’s profile only
- **Amber**— in both (the overlap)

<img src="https://cdn-images-1.medium.com/max/1024/1*XfbZTKCAGTSArnhi3tiMOA.png" alt="Article image" width="1024" height="437" loading="lazy" decoding="async" />

This visual immediately answers:*“Which of this group’s known techniques am I not already detecting?”*

### Importing an existing layer

If you already have ATT&CK Navigator layers from previous work, click**↑ Import layer**and upload the JSON. AdversaryGraph will load it as your active layer, which you can then enrich with AI analysis or compare against APT groups.

### Saving and Loading Named Layers

Once you have built a TTP layer — whether through AI analysis, manual selection, or an APT campaign overlay — you can save it to the database with a name and reload it in any future session.

<img src="https://cdn-images-1.medium.com/max/584/1*m1Zh30Hm7e6wmzZq1Mjdog.png" alt="Article image" width="584" height="108" loading="lazy" decoding="async" />

### Why this matters

Without persistence, every session starts blank. You would have to re-inject or re-select all your techniques each time you come back to a piece of work. Named layers let you:

- **Bookmark a specific investigation.**Save “Lazarus Q1 2025 incident” at 47 techniques and return to it a week later exactly where you left off.
- **Build a fingerprint library.**Save a layer for each major campaign you track — “Operation Ghost TTPs”, “SolarWinds Compromise TTPs” — and reload any of them for comparison without re-running AI analysis.
- **Maintain a baseline.**Keep a “What we detect” layer with your detection coverage and a “What we’ve seen” layer of your observed incidents. Load each into a fresh session to compare.
- **Share work across team members.**Layers are stored in the shared PostgreSQL database, so a layer saved by one analyst is visible to all.

### Saving a layer

1. Select your techniques in Navigator (they turn red)
2. Click**↓ Save layer**in the toolbar — this button appears only when at least one technique is selected
3. Enter a descriptive name (e.g.*“MuddyWater CTI analysis — April 2025”*)
4. Press Enter or click**Save**

The layer is immediately written to the database. The technique IDs are stored in sorted, deduplicated form together with the domain.

### Loading a layer

1. Click**📂 Load layer**in the toolbar (always visible)
2. A list of all saved layers appears, each showing the name, technique count, domain, and last-modified date
3. Click**Load**— the saved layer replaces your current selection entirely

To delete a layer you no longer need, click the**✕**button next to it in the Load dialog and confirm.

## APT Attribution Deep-Dive: Three Compare Modes

The Compare view has three modes selectable from a switcher at the top of the page.

<img src="https://cdn-images-1.medium.com/max/1024/1*lKoiwInK4AuBHDFSINWekA.png" alt="Article image" width="1024" height="131" loading="lazy" decoding="async" />

### Mode 1 — Groups (DB 1)

With techniques selected in Navigator (or injected from an AI analysis), navigate to**Compare**, make sure**Groups (DB 1)**is selected, and click**Compare vs APT Groups**. This ranks all 174+ threat groups by Jaccard similarity.

Click any group to open the four-tab detail view:

<img src="https://cdn-images-1.medium.com/max/1024/1*aJW4II93D-bLqFMexDlW1g.png" alt="Article image" width="1024" height="408" loading="lazy" decoding="async" />

**Overview**— similarity score, shared technique chips (amber), techniques only in your layer (red). Answers:*“How much of our observed behaviour matches this group’s known playbook?”*

**Tactic Breakdown**— stacked bar per kill-chain phase: shared / user-only / APT-only. Reveals*where*in the kill chain the overlap is concentrated.

<img src="https://cdn-images-1.medium.com/max/1024/1*_Dlqijzjnt_Ehr1ULHPmrg.png" alt="Article image" width="1024" height="408" loading="lazy" decoding="async" />

**Visual Diff**— compact colour-strip matrix. Best for presentations.

<img src="https://cdn-images-1.medium.com/max/1024/1*lLkb-oRUX5Tns2S85SS16g.png" alt="Article image" width="1024" height="408" loading="lazy" decoding="async" />

**Gap Analysis**— every technique in the group’s known profile not in your layer. This is your detection backlog.

### Mode 2 — Campaigns (DB 1)

Switch to**Campaigns (DB 1)**and click**Compare vs Campaigns**. This ranks all 56+ named MITRE operations by Jaccard similarity.

<img src="https://cdn-images-1.medium.com/max/1024/1*0dTCvSgZ4dMeQDXkbutXPA.png" alt="Article image" width="1024" height="408" loading="lazy" decoding="async" />

**Why this is more precise than group comparison:**A group’s aggregate profile spans years. A campaign profile is one specific attack. Matching your TTPs against C0024 (SolarWinds Compromise) at 40% is a sharper lead than matching against G0016 (APT29) at 15%.

### Mode 3 — Reports (DB 2)

Switch to**Reports (DB 2)**. The left panel lists every AI analysis you have ever run. Click any report to re-run Jaccard comparison against all ATT&CK groups — without re-calling the LLM.

<img src="https://cdn-images-1.medium.com/max/1024/1*ecTDnydMYwWX8-Ncuk8GfQ.png" alt="Article image" width="1024" height="408" loading="lazy" decoding="async" />

Use this for retrospective attribution after ATT&CK releases new group data, or to cluster multiple incidents under a common actor.

### Practical attribution workflow

<img src="https://cdn-images-1.medium.com/max/1024/1*JDE0azpONj0OVW95p9yZkg.png" alt="Article image" width="1024" height="683" loading="lazy" decoding="async" />

1. Run AI analysis on your incident data (give it a descriptive name)
2. Inject extracted techniques into Navigator
3. Compare → Groups mode: look for similarity &gt; 25%
4. Compare → Campaigns mode: check if the top group has a campaign that fits the timeline
5. Gap Analysis tab: use the technique gap as a structured hunt checklist
6. Download the PDF report for your findings

## Two Databases: Actor Profiles and Your Report Library

When you dig into attribution you quickly realise there are two different things you want to compare against:

1. **What MITRE says groups have done**— the curated ATT&CK dataset of group TTP profiles, including named campaigns (specific operations like “Operation Ghost”)
2. **What you have actually observed**— your own library of analysed reports, each with its own extracted TTP mapping

AdversaryGraph v0.3 builds both into a single comparison workflow via three modes in the**Compare**view.

### DB 1: MITRE Actor Profiles and Named Campaigns

The ATT&CK STIX 2.1 bundle contains more than just group TTP profiles. It also includes:

- **campaign objects**— named operations with their own ATT&CK IDs (e.g. C0023 = "Operation Ghost", C0025 = "2016 Ukraine Electric Power Attack")
- **attributed-to relationships**— which group conducted which campaign
- **uses relationships at the campaign level**— the specific techniques observed in each named operation (often different from the group's aggregate profile)

AdversaryGraph parses all of this during ATT&CK ingestion. The result is two searchable, comparable datasets that both live in DB 1:

DatasetWhat it containsID formatAPT GroupsAggregate TTP profile of each named threat groupG0001 — G0174+CampaignsTTP profile of each named operation/campaignC0001 — C0063+

**Why campaigns matter:**A group’s aggregate profile is the union of everything ever attributed to them across all operations and years. A campaign profile is specific to one attack. Comparing your incident TTPs against campaigns is often more discriminating than comparing against the full group — an incident that matches C0023 (Operation Ghost) at 45% similarity is a more specific lead than a match against G0016 (APT29) at 15%.

### Viewing campaigns in the APT Library

The APT Library now has two tabs per group:

- **Techniques**— the full aggregate TTP list (existing behaviour)
- **Campaigns (DB 1)**— all named operations attributed to this group

Each campaign card shows the date range, technique count, and ATT&CK ID. Click to expand and see the full technique list with the use description from STIX.

The**“Add to my TTPs”**button on each campaign card pushes all of that campaign’s techniques into your Navigator layer — useful for building a “this specific operation’s TTP fingerprint” layer to compare against your detection coverage.

### DB 2: Your Report Library

Every time you run an AI analysis in AdversaryGraph, the result is stored: the extracted techniques, the summary, the APT matches, and the provider/model used. DB 2 is this library of past analyses.

Access it via**Compare → Reports (DB 2)**.

The left panel lists every completed report session with:

- Name (the filename or label you gave it when you uploaded)
- Technique count
- Domain
- Provider and model used
- Date

Click any report to run a fresh Jaccard comparison of that report’s extracted techniques against all ATT&CK groups. This answers:*“If I come back to this report from three months ago — which groups match its TTP profile?”*

This is useful in a few scenarios:

**Retrospective attribution:**You analysed a report before you had a strong hypothesis about the actor. A new ATT&CK version was released that added new groups or techniques. Rerun the comparison against the updated ATT&CK data without re-running the expensive LLM analysis.

**Cross-incident correlation:**If two reports from different incidents both have high similarity to the same APT group, that’s a data point for clustering the incidents under the same actor.

**Building a baseline:**Accumulate 20 reports over a quarter. In the Reports library you can see at a glance which groups are recurring themes across your incident set — a form of environmental threat profiling.

### The three Compare modes

ModeWhat you compareAgainst**Groups (DB 1)**Your selected TTPs (from Navigator)All 174+ ATT&CK groups**Campaigns (DB 1)**Your selected TTPs (from Navigator)All named MITRE campaigns**Reports (DB 2)**A stored report’s extracted TTPsAll 174+ ATT&CK groups

Use the mode switcher at the top of the Compare page to move between them.

### API for both databases

Compare against campaigns:

```text
curl -X POST "http://localhost:8000/api/apt/campaigns/compare?domain=enterprise-attack&top_n=10" \
  -H "Content-Type: application/json" \
  -d '{"technique_ids": ["T1566.001", "T1059.001", "T1078", "T1021.001"]}'
```

List your stored report sessions:

```text
curl "http://localhost:8000/api/analyze/sessions?limit=20" | python -m json.tool
```

Re-compare a stored report:

```text
SESSION_ID="550e8400-e29b-41d4-a716-446655440000"
curl -X POST "http://localhost:8000/api/analyze/sessions/$SESSION_ID/compare?top_n=10"
```

List campaigns for a specific group:

```text
curl "http://localhost:8000/api/apt/campaigns?domain=enterprise-attack&group_id=G0016"
```

## Generating Reports

AdversaryGraph generates two types of PDF reports.

<img src="https://cdn-images-1.medium.com/max/581/1*oyHjzN-tAx7Lx19Xg0IPyA.png" alt="Article image" width="581" height="802" loading="lazy" decoding="async" />

### Analysis report

From the**Analyze**page, after a completed analysis, click**Download PDF**. The report is formatted for sharing with management or a client and includes:

- Cover page with provider, model, domain, session ID, and timestamp
- Executive summary (the AI-generated TL;DR)
- Extracted techniques table sorted by confidence descending
- APT attribution section with the top 10 Jaccard matches
- Tactic coverage breakdown showing how the techniques distribute across the kill chain

### Navigator layer report

From the**Navigator**, click**↓ PDF**in the toolbar. This generates a lighter report listing all techniques in your current layer with their ATT&CK IDs, tactics, and platforms — useful as a rapid deliverable for a purple-team session or a detection engineering sprint.

## Using the AI Chat Assistant

Every technique in the detail panel has an embedded AI chat. This is not a generic chatbot — it is a threat intelligence assistant with the full ATT&CK description of the selected technique already in context.

**Practical prompts that work well:**

<img src="https://cdn-images-1.medium.com/max/433/1*Rai3eOrk1Upsd4zeHxtroA.png" alt="Article image" width="433" height="877" loading="lazy" decoding="async" />

For detection engineering:

&gt; “Write a SIGMA rule for detecting this technique on Windows via Sysmon events”

For understanding evasion:

&gt; “How do attackers modify this technique to avoid common detections?”

For hunting:

&gt; “What should I look for in Windows Security event logs to hunt for this technique? Give me specific event IDs and field values.”

For red teaming context:

&gt; “Which tools in the open-source red team ecosystem implement this technique?”

For correlation:

&gt; “Which techniques are commonly chained with this one in post-exploitation workflows?”

The**context**field at the bottom of the chat lets you paste additional information — for example, a log snippet or a list of technique IDs from your current investigation. This gives the assistant grounding in your specific situation. The context field accepts up to 8,000 characters.

## Working with All Three ATT&CK Domains

<img src="https://cdn-images-1.medium.com/max/466/1*lp9MmZunILgId0X7JHQVbw.png" alt="Article image" width="466" height="116" loading="lazy" decoding="async" />

AdversaryGraph supports Enterprise, Mobile, and ICS ATT&CK out of the box.

Switch domains using the**Domain**dropdown in the Navigator toolbar or the Analyze page.

**Enterprise ATT&CK**— 641 techniques, 163 groups. Use for traditional IT infrastructure incidents: Windows/Linux/macOS endpoints, cloud workloads, Active Directory environments.

**Mobile ATT&CK**— covers Android and iOS threat behaviours. Useful for incidents involving mobile device management (MDM) bypass, spyware, or mobile-targeting APT campaigns.

**ICS ATT&CK**— covers operational technology and industrial control systems. Use for incidents involving SCADA, PLCs, HMIs, or critical infrastructure.

Each domain has its own set of tactics, techniques, and APT groups. When you run an AI analysis, select the appropriate domain so the Jaccard comparison runs against groups known for activity in that domain.

## API Usage (Headless / CI Integration)

AdversaryGraph exposes a full REST API. You can drive the entire workflow programmatically.

### Analyse a report via API

```text
curl -X POST http://localhost:8000/api/analyze \
  -F "provider=claude" \
  -F "domain=enterprise-attack" \
  -F "file=@incident_report.pdf" \
  | python -m json.tool
```

Response:

```text
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "provider": "claude",
  "model": "claude-opus-4-8",
  "summary": "The report describes a spearphishing campaign ...",
  "techniques": [
    {
      "attack_id": "T1566.001",
      "name": "Spearphishing Attachment",
      "tactic": "initial-access",
      "confidence": 0.95,
      "evidence": "the email contained a malicious Excel attachment"
    }
  ],
  "apt_matches": [
    {
      "group_attack_id": "G0016",
      "group_name": "APT29",
      "similarity": 0.34,
      "shared_count": 8,
      "shared_techniques": ["T1566.001", "T1059.001", ...]
    }
  ]
}
```

### Compare a known technique set via API

```text
curl -X POST "http://localhost:8000/api/apt/compare?domain=enterprise-attack&top_n=5" \
  -H "Content-Type: application/json" \
  -d '{"technique_ids": ["T1566.001", "T1059.001", "T1078", "T1021.001", "T1003.001"]}' \
  | python -m json.tool
```

### Manage saved layers via API

```text
# List all saved layers (optionally filter by domain)
curl "http://localhost:8000/api/layers?domain=enterprise-attack" | python -m json.tool
# Save a layer
curl -X POST http://localhost:8000/api/layers \
  -H "Content-Type: application/json" \
  -d '{"name": "MuddyWater Q1 indicators", "domain": "enterprise-attack",
       "technique_ids": ["T1566.001", "T1059.001", "T1078", "T1021.001"]}'
# Load a specific layer (returns technique_ids)
LAYER_ID="550e8400-e29b-41d4-a716-446655440000"
curl "http://localhost:8000/api/layers/$LAYER_ID" | python -m json.tool
# Delete a layer
curl -X DELETE "http://localhost:8000/api/layers/$LAYER_ID"
```

### Stream an analysis (Python example)

```text
import httpx, json
with httpx.stream(
    "POST",
    "http://localhost:8000/api/analyze/stream",
    data={"provider": "claude", "domain": "enterprise-attack"},
    files={"file": open("report.pdf", "rb")},
    timeout=300,
) as r:
    for line in r.iter_lines():
        if line.startswith("data: "):
            event = json.loads(line[6:])
            if event["type"] == "token":
                print(event["content"], end="", flush=True)
            elif event["type"] == "result":
                print("\n\nFinal techniques:")
                for t in event["data"]["techniques"]:
                    print(f"  {t['attack_id']} ({t['confidence']*100:.0f}%) - {t['name']}")
            elif event["type"] == "error":
                print(f"\nError: {event['message']}")
```

## Keeping ATT&CK Data Fresh

ATT&CK releases new versions periodically (approximately twice a year). AdversaryGraph checks for new versions daily at 03:00 UTC via a Celery Beat job.

The sidebar footer shows a pulsing amber indicator when a new version is available. Trigger an update:

```text
# Quick API call
curl -X POST http://localhost:8000/api/sync/trigger
```

```text
# Check what version you have vs what's available
curl
http://localhost:8000/api/sync/status
```

The sync downloads only the new bundle version and ingests it alongside the existing data without deleting anything. Both versions remain queryable — endpoints accept an optional ?version=19.1 parameter to target a specific release.

## Tips for Analysts

**Calibrate your confidence threshold.**I recommend treating &lt; 50% confidence as noise until you validate it manually. The LLM is trying hard to find ATT&CK mappings, which means it will sometimes stretch an inference. Use the evidence snippet to sanity-check every mapping.

**Use the Gap Analysis as a hunt checklist.**When you match against an APT group in Compare, the Gap Analysis tab shows every technique in their known profile that you haven’t covered. This is an excellent input for a structured hunt — you’re essentially asking*“what would we need to observe to confirm this attribution?”*

**Chain features for maximum value.**The best workflow is: AI Analysis → inject into Navigator → Compare against APT groups → Gap Analysis → export PDF. Each step builds on the last.

**Chat is good for detection rules.**The AI assistant is particularly strong at generating SIGMA rules, KQL queries, and Splunk SPL from ATT&CK technique IDs. Give it the full ATT&CK technique description plus any specific context from your environment (OS, logging stack) and you’ll get useful starting points rather than generic templates.

**Import your existing layers.**If your team already maintains ATT&CK Navigator layers for your environment (e.g. a “what we detect” layer and a “what we’ve seen” layer), import them via the ↑ Import button. AdversaryGraph will let you compare them against APT profiles and run AI chat against the techniques in the layer.

**Save named layers as investigation checkpoints.**After any significant piece of work — a completed AI analysis, a finished APT comparison session, a purple-team prep layer — click**↓ Save layer**and give it a meaningful name. This takes 10 seconds and means you never lose work between sessions. You can reload any saved layer instantly from**📂 Load layer**without re-running analysis.

**Use text paste for quick triage.**You don’t need a formatted document. Paste raw Slack thread text, a SIEM alert body, or a vendor advisory into the text box. The AI is good at extracting signal from noisy, informal text.

## Security Considerations

AdversaryGraph is designed for internal/intranet use. It has no built-in authentication — anyone who can reach the Docker network can use it.

**For a team deployment:**

1. Set a strong DB_PASS in .env
2. Put AdversaryGraph behind nginx / Caddy with TLS and HTTP Basic Auth (or integrate with your identity provider via OAuth)
3. Run the Docker containers on an internal network that is not directly internet-accessible
4. The .env file containing your LLM API keys should have chmod 600 and never be committed to git

Your threat intelligence reports are stored in PostgreSQL inside the Docker volume. If you need to comply with data handling policies, deploy AdversaryGraph on infrastructure that meets those policies — since it’s self-hosted, you retain full control.

## What’s Coming Next

The tool is functional but there is plenty of room to grow. Things I’m actively thinking about:

- **TAXII/STIX import**— accept threat intelligence directly from TAXII feeds (MISP, OpenCTI, commercial CTI platforms)
- **Team collaboration**— shared TTP layers with user namespacing
- **Detection coverage overlay**— import your existing SIGMA rule library and visualise which ATT&CK techniques you have coverage for vs which are blind spots
- **Automatic APT tracking**— when ATT&CK releases a new version that adds techniques to a group you’re tracking, send a notification

## Final Thoughts

The core idea behind AdversaryGraph is that the heavy lifting of ATT&CK mapping — reading a report, recognising a technique, looking it up, comparing it — is exactly the kind of repetitive, pattern-matching work that LLMs are well-suited for.

The analyst’s judgement is still essential: deciding which mappings to trust, what the attribution implications are, what to do about the gap analysis. But the mechanical translation layer — text to ATT&CK IDs — should not take most of your time.

AdversaryGraph tries to handle that translation layer so you can spend your time on the interesting parts.

The project is open source under the MIT licence. If you find it useful, have feature requests, or find bugs, open an issue on GitHub.

**GitHub:**[https://github.com/anpa1200/](https://github.com/anpa1200/threatmapper)AdversaryGraph
**API Docs:**[http://localhost:8000/docs](http://localhost:8000/docs)(after starting with docker compose up)

AdversaryGraph*uses the MITRE ATT&CK® framework. ATT&CK is a registered trademark of The MITRE Corporation. This project is not affiliated with or endorsed by MITRE.*

## Follow for practical cybersecurity research

If you’re interested in**Offensive security,****AI security, real-world attack simulations, CTI, and detection engineering**— this is exactly what I focus on.

### Stay connected:

→**Subscribe on Medium:**[medium.com/@1200km](https://medium.com/@1200km)
→**Connect on LinkedIn:**[andrey-pautov](https://www.linkedin.com/in/andrey-pautov/)
→**GitHub — tools & labs:**[github.com/anpa1200](https://github.com/anpa1200)
→**Contact:**[1200km@gmail.com](mailto:1200km@gmail.com)

Follow My Work

I publish practical cybersecurity research, CTI workflows, detection engineering notes, malware analysis projects, OpenCTI work, cloud and Kubernetes security research, AI-assisted security tooling, labs, and technical guides.
