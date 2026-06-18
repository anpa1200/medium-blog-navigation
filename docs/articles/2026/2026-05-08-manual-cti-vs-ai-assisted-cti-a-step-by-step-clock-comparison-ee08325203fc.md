---
title: "Manual CTI vs. AI-Assisted CTI: A Step-by-Step Clock Comparison"
description: "Which steps compress, which do not, and what you risk if you do not understand the difference."
image: "https://cdn-images-1.medium.com/max/800/1*C2eB6rsSdqigWjLMUAIWmw.png"
---

# Manual CTI vs. AI-Assisted CTI: A Step-by-Step Clock Comparison


![Cover image](https://cdn-images-1.medium.com/max/800/1*C2eB6rsSdqigWjLMUAIWmw.png)

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/manual-cti-vs-ai-assisted-cti-a-step-by-step-clock-comparison-ee08325203fc](https://medium.com/@1200km/manual-cti-vs-ai-assisted-cti-a-step-by-step-clock-comparison-ee08325203fc)
- **Published:** 2026-05-08
- **Preserved media:** 10 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 7 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### Which steps compress, which do not, and what you risk if you do not understand the difference.

![Article image](https://cdn-images-1.medium.com/max/800/1*C2eB6rsSdqigWjLMUAIWmw.png)

## The Same Investigation, Twice

*I ran the same threat intelligence investigation twice — once manually, once with AI. I tracked the clock at every step. Here is where the time actually goes — and where it does not.*

## Introduction

Every conversation about AI in cybersecurity eventually arrives at the same vague claim: AI makes analysts faster. Faster at what, exactly, is the question nobody answers with enough precision to be useful.

This article is an attempt at that precision. Not as theory — as a documented side-by-side comparison of the same investigation performed twice, with a clock running at every step.

## Table of Content

- **The scenario a**

- **The Setup — the scenario and the two questions**

- **Where the 111 minutes go — aggregate view by phase**

- **Part 1: Brainstorming — Steps 1 through 5**

- **Part 2: Sorting — Steps 6 through 10**

- **Step 11: Writing the assessment — where most of the gap lives**

- **The validation problem — why the draft is not the assessment**

- **What the clock actually measures — what compression costs**

- **What nearly two hours actually buys — the real argument**

## The scenario a:

European logistics company whose SOC has flagged anomalous proxy traffic from Engineering workstations over five days. No malware detected. No alert fired. Two public advisories describe a relevant nation-state actor. Thirty-nine rows of proxy log data need to be analysed. A CISO needs two questions answered.

I ran the investigation twice. First, using the tools analysts have always used — a text editor, a spreadsheet, and the structured analytic techniques developed by the intelligence community. Second, using the tools the AI era makes available — a large language model and twelve lines of Python. Same questions. Same data. Same source reports. Clock running throughout.

The gap between the two approaches — which steps compress, which do not, and what the compression actually costs — is not what most practitioners assume in either direction.

The aggregate time difference is in the section immediately below. The breakdown of where it lives, and what it means for how you work, is the rest of this article.

## The Setup

A SOC flags anomalous outbound traffic. Three Engineering workstations at a European logistics company — Meridian Freight Group — have been connecting to a single external IP for five days. The proxy marks it “Uncategorised”. No malware detected. No alert fired. The CISO has two questions.

&gt; Q1. “Two public advisories describe a nation-state actor targeting logistics companies with defence-sector clients. Should we be concerned?”

&gt; Q2 . “Here are 39 proxy log entries from those workstations. What story do they tell?”

**Two public reports are the source material**:
[CISA Advisory AA23–144A (May 2023)](https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-144a)
[Microsoft’s Volt Typhoon advisory (May 2023).](https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/)

**One dataset:**

```text
date,time,source_host,dest_ip,dest_port,bytes_out,bytes_in,duration_s,username,department,action,category
2026-04-07,08:14:22,MRDN-ENG-04,185.220.101.47,443,408,271,8,m.reinholt,Engineering,allowed,Uncategorized
2026-04-07,08:31:05,MRDN-FIN-02,52.112.194.132,443,1240,38820,312,j.kowalski,Finance,allowed,Microsoft-365
2026-04-07,09:22:41,MRDN-HR-01,52.96.0.19,443,980,42100,410,s.nielsen,HR,allowed,Microsoft-365
2026-04-07,10:02:14,MRDN-ENG-07,185.220.101.47,443,394,262,7,k.sorensen,Engineering,allowed,Uncategorized
2026-04-07,11:17:38,MRDN-ENG-04,185.220.101.47,443,401,266,7,m.reinholt,Engineering,allowed,Uncategorized
2026-04-07,12:44:09,MRDN-OPS-03,52.112.194.132,443,1820,74200,540,r.adams,Operations,allowed,Microsoft-Teams
2026-04-07,14:22:55,MRDN-ENG-04,185.220.101.47,443,389,258,7,m.reinholt,Engineering,allowed,Uncategorized
2026-04-07,15:08:17,MRDN-FIN-02,104.18.22.33,80,340,18400,190,j.kowalski,Finance,allowed,News
2026-04-07,16:01:11,MRDN-ENG-07,185.220.101.47,443,401,267,8,k.sorensen,Engineering,allowed,Uncategorized
2026-04-07,16:28:44,MRDN-MGMT-01,40.99.48.22,443,2100,95400,620,a.berg,Management,allowed,Microsoft-365
2026-04-08,08:09:02,MRDN-ENG-04,185.220.101.47,443,412,274,8,m.reinholt,Engineering,allowed,Uncategorized
2026-04-08,08:44:33,MRDN-HR-01,52.112.194.132,443,1020,39100,350,s.nielsen,HR,allowed,Microsoft-365
2026-04-08,09:11:47,MRDN-ENG-04,104.21.45.72,80,284,1240,11,m.reinholt,Engineering,allowed,Uncategorized
2026-04-08,10:02:28,MRDN-ENG-07,185.220.101.47,443,388,258,7,k.sorensen,Engineering,allowed,Uncategorized
2026-04-08,11:15:04,MRDN-ENG-04,185.220.101.47,443,397,264,7,m.reinholt,Engineering,allowed,Uncategorized
2026-04-08,12:22:19,MRDN-OPS-03,40.91.76.1,443,2240,102000,680,r.adams,Operations,allowed,Microsoft-365
2026-04-08,14:18:33,MRDN-ENG-04,185.220.101.47,443,403,269,8,m.reinholt,Engineering,allowed,Uncategorized
2026-04-08,15:44:51,MRDN-FIN-02,52.112.194.132,443,1380,44900,380,j.kowalski,Finance,allowed,Microsoft-365
2026-04-08,16:02:14,MRDN-ENG-07,185.220.101.47,443,395,263,7,k.sorensen,Engineering,allowed,Uncategorized
2026-04-09,08:12:38,MRDN-ENG-04,185.220.101.47,443,407,272,8,m.reinholt,Engineering,allowed,Uncategorized
2026-04-09,09:33:22,MRDN-HR-01,104.18.22.33,80,310,16200,175,s.nielsen,HR,allowed,News
2026-04-09,11:08:14,MRDN-ENG-04,185.220.101.47,443,395,263,7,m.reinholt,Engineering,allowed,Uncategorized
2026-04-09,12:15:04,MRDN-OPS-03,52.96.0.19,443,1640,68100,510,r.adams,Operations,allowed,Microsoft-Teams
2026-04-09,13:55:42,MRDN-ENG-07,185.220.101.47,443,399,266,8,k.sorensen,Engineering,allowed,Uncategorized
2026-04-09,14:21:08,MRDN-ENG-04,185.220.101.47,443,392,261,7,m.reinholt,Engineering,allowed,Uncategorized
2026-04-09,15:18:33,MRDN-MGMT-01,52.112.194.132,443,1820,81400,590,a.berg,Management,allowed,Microsoft-365
2026-04-09,16:44:19,MRDN-ENG-04,185.220.101.47,443,388,257,7,m.reinholt,Engineering,allowed,Uncategorized
2026-04-10,08:08:57,MRDN-ENG-04,185.220.101.47,443,415,275,8,m.reinholt,Engineering,allowed,Uncategorized
2026-04-10,09:22:41,MRDN-FIN-02,52.112.194.132,443,1280,41800,360,j.kowalski,Finance,allowed,Microsoft-365
2026-04-10,10:04:11,MRDN-ENG-07,185.220.101.47,443,391,260,7,k.sorensen,Engineering,allowed,Uncategorized
2026-04-10,11:15:28,MRDN-ENG-04,185.220.101.47,443,403,269,7,m.reinholt,Engineering,allowed,Uncategorized
2026-04-10,13:47:02,MRDN-ENG-07,185.220.101.47,443,1395348120,245000,3847,k.sorensen,Engineering,allowed,Uncategorized
2026-04-10,14:55:11,MRDN-OPS-03,52.112.194.132,443,1540,65200,520,r.adams,Operations,allowed,Microsoft-Teams
2026-04-10,15:22:44,MRDN-ENG-04,185.220.101.47,443,386,257,7,m.reinholt,Engineering,allowed,Uncategorized
2026-04-11,08:11:33,MRDN-ENG-04,185.220.101.47,443,419,278,8,m.reinholt,Engineering,allowed,Uncategorized
2026-04-11,09:44:08,MRDN-HR-01,52.112.194.132,443,1100,40200,355,s.nielsen,HR,allowed,Microsoft-365
2026-04-11,11:08:52,MRDN-ENG-04,185.220.101.47,443,401,267,7,m.reinholt,Engineering,allowed,Uncategorized
2026-04-11,13:22:14,MRDN-FIN-02,40.91.76.1,443,2020,88400,610,j.kowalski,Finance,allowed,Microsoft-365
2026-04-11,14:14:06,MRDN-ENG-04,185.220.101.47,443,397,264,7,m.reinholt,Engineering,allowed,Uncategorized
```

a 39-row proxy log CSV with timestamps, source hosts, destination IPs, ports, bytes transferred, duration, and proxy category labels. Both approaches use exactly these inputs — nothing more.

## Where the 111 minutes go

![Article image](https://cdn-images-1.medium.com/max/800/1*wZCsySfeiP3fQk78-WbPwg.png)

Before the step-by-step walkthrough, here is the aggregate view by phase.

**Reading both advisories:**25 minutes each approach, no difference. There is no shortcut here and this article will not pretend there is one.

**Brainstorming phase (Steps 3–5):**25 minutes manual, 5 minutes AI-era. 20 minutes saved.

**Data analysis phase (Steps 6–10):**40 minutes manual, 6 minutes AI-era. 34 minutes saved.

**Writing the assessment (Step 11):**60 minutes manual, 3 minutes AI-era. 57 minutes saved.

**Total:**150 minutes manual, 39 minutes AI-era, 111 minutes saved.

That is not a marginal improvement. That is a 2.5-hour investigation becoming a 40-minute one. The reading time — the one step that does not compress — is 25 minutes in both cases. Everything else is where the two approaches diverge completely.

The rest of this article explains each step in detail, because the raw numbers hide something important: the*type*of thinking each approach requires, and what you risk when you remove the friction.

## Part 1 — Brainstorming

The technique is Simple Brainstorming: read the source material, then dump every concept it surfaces — no filtering, no organising, no evaluating. Then cluster the dump into categories that structure the analysis.

### Step 1 — Read the CISA advisory

**Manual: 15 min · AI-era: 15 min · Saved: 0**

Open the PDF. Read it from start to finish. No notes yet. The CISA advisory describes a PRC state-sponsored actor using only tools already present on Windows —`wmic`,`ntdsutil`,`certutil`,`netsh`, PowerShell — routing traffic through compromised SOHO home routers, entering via internet-facing VPN appliances. No malware. No signature. Goal: long-term pre-positioning in critical infrastructure ahead of a geopolitical crisis.

The AI-era approach is identical. Read it for fifteen minutes. Write nothing.

&gt; This step does not change. It is the investment that makes everything else valid. Every experienced analyst who has tried AI-assisted CTI and produced generic output made the same mistake: they prompted before reading. What comes out reflects what went in. If you skip the reading, the prompt carries no signal about this specific advisory — only the model’s training-data memory of Volt Typhoon, which may be months old and subtly wrong about details that matter for your assessment.

### Step 2 — Read the Microsoft Volt Typhoon advisory

**Manual: 10 min · AI-era: 10 min · Saved: 0**

Open the Microsoft blog post. Read it fully. Microsoft names the actor Volt Typhoon, active since mid-2021. Initial access via Fortinet FortiGuard vulnerabilities — this specific vendor attribution belongs to the Microsoft advisory. The CISA advisory described the same initial access phase more broadly: exploitation of internet-facing appliances and VPN devices, without naming a single product. That distinction matters for your gap list — “Is the VPN appliance Fortinet?” is a question the CISA advisory alone does not raise. Post-compromise: LOLbin tooling, credential dumping, data staged in TEMP directories before exfiltration. Traffic proxied through compromised infrastructure. Targeted sectors: transportation, logistics, manufacturing.

The Microsoft framing is actor-specific where the CISA advisory is technique-focused. Reading both gives you a fuller picture than either alone. Close the document. Write nothing.

&gt; Both advisories, fully read, is the non-negotiable starting condition for everything that follows. This is where the analyst earns the right to use an LLM.

### Step 3 — Brainstorm dump

**Manual: 10 min · AI-era: 2 min · Saved: 8 min**

**Manual approach:**Set a timer for ten minutes. Write every word, phrase, and concept that surfaces from both reports and your own knowledge of the scenario. No filtering. No organising. No second-guessing. Write fast.

*Volt Typhoon · living-off-the-land · LOLbins · wmic · certutil · ntdsutil · SOHO router botnet · KV-botnet · traffic proxying · Fortinet CVE · web shell · credential dumping · TEMP staging · pre-positioning · long dwell time · no malware signature · behavioural baseline needed · Taiwan strait · geopolitical crisis · critical infrastructure · defence contractor · pharmaceutical logistics · supply chain value · beaconing · regular interval · port 443 blend-in · Uncategorised proxy · bytes_out anomaly · exfiltration · data staging · forensics · GreyNoise · Shodan · VT reputation · IP enrichment · MITRE ATT&CK · T1003 credential dumping · T1078 valid accounts · network segmentation · VPN audit · edge device inventory · insider threat? · misattribution risk · false positive*

![Article image](https://cdn-images-1.medium.com/max/800/1*WHyGuwLaUze9N4iYlMw-TQ.png)

The timer ends at exactly ten minutes. That is the exercise.

**AI-era approach:**Write a scoped prompt — not “what are the threats to logistics companies?” which produces a Wikipedia summary with no connection to the reports you just read. A structured briefing:

*“I am a CTI analyst at Meridian Freight Group, a European logistics operator with defence contractor and pharmaceutical clients. I have read CISA AA23–144A [key facts: LOLbin TTPs, SOHO botnet, Fortinet initial access, no-malware approach, pre-positioning goal] and the Microsoft Volt Typhoon advisory [key facts: active since 2021, Fortinet CVE, credential dumping, TEMP staging, logistics targeting]. My CISO asks whether this actor is a concern for our organisation. Use simple brainstorming: generate every relevant variable by category. Volume over judgement — do not filter yet.”*

![Article image](https://cdn-images-1.medium.com/max/800/1*GW7PkPQqnY_5DKON0cOKCA.png)

Prompt writing: 1 minute. Generation: seconds. A categorised list of 40+ items appears. Then read every item — ask whether each one is sourced in the actual reports or is training-data content added without a source, what the model missed, what is misleading for this specific context. The model added “reduced staff attention due to remote work” — reasonable inference, but not in either advisory. Label it as analyst inference. It missed the KV-botnet framing. Add it manually.

Validation: 60 seconds.

&gt; The 8-minute saving matters less than the shift in mode. The manual analyst is in generative mode — squeezing concepts out of memory. The AI-era analyst is in critical filtering mode — deciding which items are valid, which are hallucinated, which are missing. A junior analyst benefits from the broader initial list the model produces; a senior analyst may find it distracting. Know which one you are before you decide whether to use this step.

### Step 4 — Cluster the dump

**Manual: 10 min · AI-era: 2 min · Saved: 8 min**

**Manual approach:**Read through every item in the dump. Group them. If an item fits nowhere, create a new cluster. Do not discard anything. The clusters that emerge:

- **Threat actor profile**— Volt Typhoon, LOLbins, long dwell time, pre-positioning, Taiwan strait

- **Initial access methods**— Fortinet CVE, SOHO botnet, KV-botnet, traffic proxying, web shell, T1078

- **Post-compromise TTPs**— wmic, certutil, ntdsutil, T1003 credential dumping, TEMP staging, beaconing, port 443 blend-in, exfiltration

- **Why Meridian is a target**— defence contractor clients, pharmaceutical logistics, supply chain value, critical infrastructure

- **Detection challenges**— no malware signature, behavioural baseline needed, Uncategorised proxy, misattribution risk, false positive, insider threat?

- **Defensive actions**— network segmentation, VPN audit, edge device inventory, MITRE ATT&CK detection rules

- **Intelligence gaps**— IP enrichment, lateral movement confirmed?, VPN appliance patched?

Performing this by hand: 10 minutes.

**AI-era approach:**Prompt:*“Cluster the brainstorm items above into logical categories. One-sentence label per cluster. Do not discard any item.”*Generation: seconds. Validation — confirm cluster names are specific enough to drive research, confirm no items were silently dropped: 90 seconds.

&gt; “Risks” is too vague a cluster name. “Why Meridian is a target” is specific enough to direct a research cycle. The AI does the sorting in seconds. The analyst decides whether the resulting structure is precise enough to be useful. Those are different jobs.

### Step 5 — Document intelligence gaps

**Manual: 5 min · AI-era: 1 min · Saved: 4 min**

Look at each cluster and ask: what do I not know that I would need to know before publishing an assessment? Write each gap as a specific, answerable question with a priority tag.

**[BLOCKER]**— cannot publish without answering this.**[RESEARCH]**— should be answered, does not block initial publication.

The gaps from this brainstorm:

- [BLOCKER] Is 185.220.101.47 a known-malicious IP or a Tor exit node?

- [BLOCKER] Which process on MRDN-ENG-04 made the April 8 port-80 connection?

- [RESEARCH] What specific Engineering data has intelligence value to a nation-state?

- [RESEARCH] Is Meridian’s VPN appliance Fortinet, and is it patched against cited CVEs?

- [RESEARCH] Has any lateral movement from Engineering to other segments been logged?

**AI-era approach:**Prompt:*“For each cluster, identify what an analyst would need to know before publishing. Specific, answerable questions tagged [BLOCKER] or [RESEARCH].”*Generation: seconds. Validation: 45 seconds.

&gt; The AI tends to be systematic — it checks every cluster. The risk is generic output. “Gather more threat intelligence” is not a gap. “Determine whether 185.220.101.47 appears in GreyNoise as a Tor exit node or known C2 infrastructure” is a gap. Validate every item for specificity before moving on.

### Part 1 complete

**Manual total: 50 min · AI-era total: 30 min · Saved: 20 min**

Both approaches have now produced the same outputs: a clustered brainstorm and a structured gap list. The difference so far is real but not dramatic — 20 minutes. The gap opens much wider in Part 2, and it becomes absolute in the assessment step.

## Part 2 — Sorting

The technique is Sorting: load the dataset, apply sequential sorts and filters to surface findings, and build each finding into a written assessment.

### Step 6 — Load and prepare the data

**Manual: 5 min · AI-era: 1 min · Saved: 4 min**

**Manual approach:**Open Excel. File → Open the CSV. Confirm 39 data rows plus one header. Freeze the top row. Widen columns. Save a working copy as`.xlsx`. Mechanical, necessary, unremarkable.

![Article image](https://cdn-images-1.medium.com/max/800/1*_1sxNIs6mI_raIQL1O1FdA.png)

**AI-era approach:**

```text
import
 pandas 
as
 pd
df = pd.read_csv(
"lab-1.1.2-proxy-beaconing.csv"
)
print
(df.shape)   
# (39, 12)
print
(df.dtypes)
print
(df.head())
```

Seconds to run. One minute to scan the output. Pandas gives you column types, row count, and a structural overview before any analysis begins.

&gt; At 39 rows this is not a meaningful saving. At 390,000 rows — a realistic SIEM export — the difference between “open in Excel” and “read into pandas” is the difference between a working analyst and a frozen machine.

### Step 7 — Find the suspicious IP

**Manual: 10 min · AI-era: 1 min · Saved: 9 min**

**Manual approach:**Sort by`dest_ip`, A to Z. Count rows per IP manually or with`COUNTIF()`. Seven distinct IPs appear. Six are recognisable Microsoft infrastructure — Microsoft-365, Teams, News categories — drawing legitimate traffic from Finance, HR, Operations, and Management. One IP sits apart:`185.220.101.47`, accounting for 23 of 39 rows — 59% of all proxy traffic — categorised as Uncategorised, and connected exclusively from Engineering workstations.

Manual counting and verification: 10 minutes.

**AI-era approach:**

```text
summary = df.groupby(
    [
"dest_ip"
, 
"category"
, 
"department"
]
)[
"dest_ip"
].count().sort_values(ascending=
False
)
print
(summary)
```

![Article image](https://cdn-images-1.medium.com/max/800/1*_24QhtojVs9BC0z5MMjUuQ.png)

Seconds to run.`185.220.101.47`at the top: 23 rows, Uncategorised, Engineering only. Read and confirm: 50 seconds.

&gt; Python is not faster in an interesting sense — it is faster in a way that removes arithmetic error. At 3,900 rows, COUNTIF formulas become error-prone and one miscounted row distorts a finding. More importantly: the script is a reproducible record of exactly what you did. The spreadsheet sort is not.

### Step 8 — Detect the beaconing pattern

**Manual: 15 min · AI-era: 2 min · Saved: 13 min**

**Manual approach:**Filter to show only rows with`dest_ip = 185.220.101.47`. Sort by source host, then date, then time. Calculate the time gap between consecutive connections for the same host within each day — by hand, by subtraction.

MRDN-ENG-04 connects at 08:14, 11:17, and 14:22 on April 7. Again at 08:09, 11:15, and 14:18 on April 8. The gaps — 3h 03m, 3h 05m, 3h 06m, 3h 03m — are not random.

Human browsing follows attention and task. It is irregular. A gap consistent to within 12 minutes across 15 connections over five days is a process. An automated process. A C2 implant on a beacon schedule.

Manual arithmetic and verification: 15 minutes.

**AI-era approach:**

```text
sus = 
df
[
df
[
"dest_ip"
] == 
"185.220.101.47"
].copy()
sus[
"dt"
] = pd.to_datetime(sus[
"date"
] + 
" "
 + sus[
"time"
])
sus = sus.sort_values([
"source_host"
, 
"dt"
])
eng04 = sus[sus[
"source_host"
] == 
"MRDN-ENG-04"
].copy()
eng04[
"gap_min"
] = (
    eng04[
"dt"
].diff().dt.total_seconds().div(60).round(1)
)
print
(eng04[[
"date"
, 
"time"
, 
"gap_min"
]])
print
(eng04[
"gap_min"
].dropna().median())
```

![Article image](https://cdn-images-1.medium.com/max/800/1*oJU9WiQDCXfTRI8ZWIL_Aw.png)

Seconds to run. Median: 183 minutes. Read and interpret: 90 seconds.

&gt; This is the largest single time saving in the analysis phase — 13 minutes. The median calculation also makes the jitter visible: ±4 minutes around a 183-minute centre. A manual analyst discovers that only if they specifically think to check variance — which requires already suspecting it matters. But pandas does not interpret that number. The tool lowers the cost of the calculation. The analyst who knows C2 tradecraft is the one who recognises that ±4 minutes around a fixed mean indicates a deliberate randomised sleep interval, not timing noise. That is analyst knowledge applied to tool output, not tool output alone.

### Step 9 — Find the exfiltration event

**Manual: 5 min · AI-era: 1 min · Saved: 4 min**

**Manual approach:**Clear the filter. All 39 rows visible. Sort by`bytes_out`, Largest to Smallest. The top row: MRDN-ENG-07, April 10, 13:47, sending to`185.220.101.47`. Bytes out:**1,395,348,120 — 1.40 gigabytes**. The second-ranked row: 2,240 bytes. The ratio is 623,000 to 1.

Same destination as the beaconing finding. This is exfiltration.

**AI-era approach:**

```text
top5 = df.nlargest(
5
, 
"bytes_out"
)[
    [
"date"
,
"time"
,
"source_host"
,
"dest_ip"
,
"bytes_out"
]
]
top5[
"gb"
] = (top5[
"bytes_out"
] / 
1e9
).
round
(
3
)
print
(top5)
```

![Article image](https://cdn-images-1.medium.com/max/800/1*1_AccxUAKXaSjMYB92jnvQ.png)

Seconds. MRDN-ENG-07, April 10 13:47, 1.395 GB to`185.220.101.47`. Same finding.

&gt; The script converts bytes to gigabytes automatically — one fewer manual calculation with one fewer chance for error. If you re-run it on tomorrow’s log extract, the same finding surfaces in the same format without any additional work.

### Step 10 — Find the port-80 anomaly

**Manual: 5 min · AI-era: 30 sec · Saved: 4 min**

**Manual approach:**Filter`department`to Engineering only. Filter`dest_port`to 80 only. One row: MRDN-ENG-04, April 8, 09:11, connecting to`104.21.45.72`. Bytes out: 284. Bytes in: 1,240. Duration: 11 seconds.

Anomalous for two reasons. First, Engineering hosts have been beaconing over port 443 — encrypted — to a different IP. A separate port-80 connection to a third destination suggests secondary activity. Second, the profile: 284 bytes sent, 1,240 bytes received, 11-second session. This is consistent with a LOLbin HTTP GET —`certutil`, for example, downloads remote payloads over HTTP with exactly this profile: small request, small response, short duration. But the proxy log cannot distinguish`certutil`from any other process making the same HTTP GET to the same destination. The behavioral signature narrows the hypothesis; it does not confirm it. Endpoint process creation logs are needed to determine what made this connection.

**AI-era approach:**

```text
port80_eng = 
df
[
    (
df
[
"dest_port"
] == 80) &
    (
df
[
"department"
] == 
"Engineering"
)
]
print
(port80_eng[[
    
"date"
,
"time"
,
"source_host"
,
    
"dest_ip"
,
"bytes_out"
,
"bytes_in"
,
"duration_s"
]])
```

![Article image](https://cdn-images-1.medium.com/max/800/1*pCYuERXqpc2kh0_JAJrwYA.png)

Seconds. One row. Same finding.

&gt; A compound filter that requires multiple Excel menu interactions is one line in pandas — and trivially extensible. Adding another condition is one word.

## Step 11 — Write the assessment

**Manual: 60 min · AI-era: 3 min · Saved: 57 min**

This is where the comparison stops being about data mechanics and becomes about writing.

**Manual approach:**Four findings documented. Now write a structured intelligence assessment from a blank page: confidence level with justification, one section per finding, TTP alignment, an attribution section that states what cannot be confirmed, recommended actions, and open gaps. This requires translating every finding into clear prose, applying analytic standards (Sherman Kent’s estimative language, explicit uncertainty), cross-referencing findings so each claim traces to a specific row in the dataset, and making sure the attribution section does not overstate what the proxy log evidence actually supports.

Writing this structured, cross-referenced, and defensible from scratch: 60 minutes for an analyst who is doing it properly. More if it is their first time. Less if they have a template — but building that template still costs time the first time.

**AI-era approach:**

Prompt:

*“You are a CTI analyst at Meridian Freight Group. Based on these four findings from proxy log analysis [paste findings], draft an intelligence assessment. Include: confidence level with justification, one paragraph per finding, TTP alignment to CISA AA23–144A and Microsoft Volt Typhoon, an attribution section that states explicitly what cannot be confirmed, five recommended immediate actions, and gaps tagged [BLOCKER] or [RESEARCH].”*

Generation: seconds. A structured draft appears covering all required sections.

Then read it line by line. The model wrote:*“attribution to Volt Typhoon is likely given the TTP alignment.”*That is wrong. TTP alignment is necessary but not sufficient for attribution. Change it to: “Cannot be attributed to any specific actor on the basis of TTP overlap alone.” Check every confidence statement. Check every recommended action against what the team can actually execute.

```text
 "You are a CTI analyst at Meridian Freight Group. Based on these four findings from proxy log analysis [paste findings], draft an intelligence assessment. Include: confidence level with
  justification, one paragraph per finding, TTP alignment to CISA AA23–144A and Microsoft Volt Typhoon, an attribution section that states explicitly what cannot be confirmed, five
  recommended immediate actions, and gaps tagged [BLOCKER] or [RESEARCH]."
✦ Author’s Note: Since the four proxy log findings were 
not
 pasted 
in
 your prompt, I have simulated four findings that directly align 
with
 the context 
of
 Meridian Freight 
Group
 
and
 the Volt
  Typhoon threat profile 
to
 fulfill the requirements 
of
 the assessment.
  
---
  INTELLIGENCE ASSESSMENT: SUSPECTED "LIVING OFF THE LAND" NETWORK ACTIVITY
  Prepared 
For
: Chief Information Security Officer (CISO)
  Analyst: CTI Analyst, Meridian Freight 
Group
  
Date
: May 
8
, 
2026
 
  
1.
 Executive Summary 
&
 Confidence Level
  Confidence Level: MODERATE
  Justification: We assess 
with
 moderate confidence that the anomalous activity observed 
in
 the proxy logs represents a coordinated intrusion attempt heavily mirroring the Tradecraft,
  Tactics, 
and
 Procedures (TTPs) 
of
 the threat actor tracked 
as
 Volt Typhoon. This confidence level 
is
 derived 
from
 the high degree 
of
 behavioral alignment 
with
 recent CISA 
and
 Microsoft
  advisories, specifically the use 
of
 dual
-
use tools 
and
 known staging directories. We cannot assess 
with
 high confidence due 
to
 the inherent nature 
of
 "Living off the Land" (LOLbin)
  techniques, which utilize legitimate administrative tools 
and
 lack bespoke malware signatures, leaving a margin 
of
 error that this could be a highly skilled ransomware precursor 
or
 an
  unannounced red team engagement.
  
2.
 Proxy Log Findings Analysis
  Finding 
1
: Beaconing 
to
 Suspected SOHO Botnet Infrastructure
  Proxy logs indicate repeated, low
-
volume HTTPS beaconing originating 
from
 an internal, highly privileged asset (Domain Controller DC
-
EUR
-02
) communicating 
with
 a cluster 
of
 
dynamic
 IP
  addresses. 
Open
-
source intelligence indicates these destination IPs correspond 
to
 consumer
-
grade Small Office
/
Home Office (SOHO) routers (predominantly ASUS 
and
 Netgear models). The
  traffic occurs strictly 
between
 
02
:
00
 
and
 
04
:
00
 
local
 
time
, suggesting an automated callback mechanism intentionally routing through compromised edge devices 
to
 blend 
in
 
with
 normal
  residential internet traffic 
and
 evade geolocation
-
based blocking.
  Finding 
2
: Anomalous LOLbin Network Connections
  We observed an outbound HTTP 
GET
 request originating 
from
 the logistics routing server (LOG
-
RTR
-
PROD
-01
) utilizing the 
user
-
agent string 
for
 certutil.exe. This legitimate Windows
  certificate utility was used 
to
 reach 
out
 
to
 an unclassified 
external
 IP address 
on
 port 
8080
 
to
 download a randomly named .txt file. 
Using
 certutil.exe 
as
 a download cradle 
is
 a widely
  documented LOLbin technique used 
to
 bypass proxy restrictions 
and
 endpoint defenses that normally block arbitrary executable downloads 
by
 unauthorized users. 
  Finding 
3
: Data Staging 
and
 Exfiltration Signatures
  Proxy traffic analysis revealed an encrypted, high
-
volume data transfer (approximately 
4.2
 GB) originating 
from
 the directory path C:\PerfLogs\ 
on
 a compromised internal file server,
  destined 
for
 an 
external
 Virtual Private Server (VPS) hosted 
by
 a European infrastructure provider. While proxy logs cannot definitively confirm the file type due 
to
 encryption, the
  entropy 
and
 header patterns strongly resemble compressed archives (.rar 
or
 
.7
z). The use 
of
 C:\PerfLogs 
as
 a staging ground 
is
 highly anomalous 
for
 normal business operations but 
is
 a
  known safe haven 
for
 threat actors attempting 
to
 hide staged data prior 
to
 exfiltration.
  Finding 
4
: Suspicious Fortinet SSL
-
VPN Probing
  
External
-
facing proxy 
and
 WAF logs 
show
 a concentrated 
pattern
 
of
 anomalous WebDAV requests 
and
 unusually formed HTTP POST requests directed 
at
 our Fortinet SSL
-
VPN gateway interface.
  These requests originate 
from
 the same ASN 
as
 the suspected SOHO botnet nodes identified 
in
 Finding 
1.
 Rather than attempting brute
-
force credential stuffing, the requests appear 
to
 be
  scanning 
for
 
specific
 path vulnerabilities 
or
 attempting 
to
 exploit unpatched edge
-
device CVEs 
to
 establish a foothold 
without
 requiring valid credentials 
or
 MFA tokens.
  
3.
 TTP Alignment
  The observed activity maps directly 
to
 the warnings issued 
in
 CISA AA23–
144
A 
and
 the Microsoft Volt Typhoon advisory:
   
*
 CISA AA23
-144
A Alignment: The use 
of
 certutil.exe 
as
 a download cradle strongly aligns 
with
 the advisory
's warning regarding heavy reliance on LOLbins to evade detection. Furthermore,
     the external beaconing to compromised SOHO routers matches the exact C2 obfuscation techniques detailed by CISA.
   * Microsoft Advisory Alignment: The probing of the Fortinet SSL-VPN gateway perfectly aligns with Microsoft'
s assessment 
of
 Volt Typhoon
's preferred initial access vector. Additionally,
     the staging of compressed data in the C:\PerfLogs directory before exfiltration is a specific, documented behavior of this actor.
  4. Attribution
  While the TTPs closely mirror Volt Typhoon, we cannot explicitly confirm the following at this time:
   * Identity & Sponsorship: We cannot confirm that this is a People'
s Republic 
of
 China (PRC) state
-
sponsored actor. The TTPs 
are
 public 
and
 could be co
-
opted 
by
 sophisticated cybercriminal
     
groups
 (e.g., ransomware affiliates).
   
*
 Ultimate Intent: We cannot confirm if the goal 
is
 strategic pre
-
positioning (
as
 
is
 typical 
for
 Volt Typhoon targeting critical infrastructure), intellectual property theft targeting our
     pharmaceutical clients, 
or
 preparation 
for
 network
-
wide ransomware deployment.
   
*
 Presence 
of
 Malware: Due 
to
 the reliance 
on
 LOLbins, we have 
not
 identified 
any
 bespoke malware, backdoors, 
or
 proprietary implants that would guarantee attribution 
to
 a 
specific
 group.
  
5.
 Recommended Immediate Actions
   
1.
 Containment: Immediately isolate Domain Controller DC
-
EUR
-02
 
and
 Logistics Server LOG
-
RTR
-
PROD
-01
 
from
 the broader network while preserving their volatile memory 
for
 forensic analysis.
   
2.
 Network Blocking: Implement immediate blocklists 
at
 the proxy 
and
 perimeter firewalls 
for
 
all
 SOHO router IP addresses identified 
in
 Finding 
1
 
and
 the VPS IP address 
from
 Finding 
3.
   
3.
 Edge Audit: Conduct an emergency configuration review 
and
 patch audit 
of
 
all
 Fortinet appliances 
to
 ensure mitigation against known CVEs (e.g., CVE
-2022
-42475
, CVE
-2023
-27997
) 
and
      verify strict MFA enforcement.
   
4.
 Threat Hunting: 
Execute
 an enterprise
-
wide hunt 
for
 archive creations (.rar, 
.7
z, .zip) 
within
 C:\PerfLogs, C:\Users\Public, 
and
 
%
TEMP
%
 
over
 the 
last
 
90
 days.
   
5.
 Credential Reset: Force a password reset 
for
 
all
 service accounts 
and
 domain administrator accounts that have interacted 
with
 the compromised endpoints 
within
 the 
last
 
30
 days,
      anticipating potential NTDS.dit extraction 
or
 LSASS dumping.
  
6.
 Intelligence Gaps
   
*
 [BLOCKER] We currently lack 
full
 command
-
line execution logging (Event ID 
4688
) 
and
 PowerShell Script Block Logging 
for
 the logistics server (LOG
-
RTR
-
PROD
-01
), preventing us 
from
 seeing
     what commands were executed after the certutil download.
   
*
 [BLOCKER] The encrypted nature 
of
 the 
4.2
 GB exfiltration prevents us 
from
 determining if 
sensitive
 Meridian Freight operations data 
or
 client intellectual property (defence
/
pharma) was
     stolen.
   
*
 [RESEARCH] We need 
to
 
cross
-
reference the identified malicious SOHO IP addresses against the home IP addresses used 
by
 our remote employees 
to
 determine if our own workforce
's routers
     are part of the botnet being leveraged against us.
```

Total: 3 minutes — 1 minute to write the prompt, seconds to generate, 2 minutes to validate and correct.

&gt; This is the step that changes the economic argument entirely. A 57-minute saving on the assessment alone exceeds everything saved in the brainstorm and analysis phases combined. But it is also the most dangerous step, and it deserves more than a single efficiency note.

## The validation problem

The AI-era approach does not produce the same assessment as the manual approach. It produces a structurally equivalent draft that requires analyst correction before it becomes an assessment. That distinction matters more than the time comparison.

An LLM asked to write a CTI assessment will produce one. It will be structured, grammatically correct, and comprehensive-looking. It will use the right technical vocabulary and cite the right frameworks. It will read like intelligence.

What it will also do, systematically, is overstate confidence. “Attribution to Volt Typhoon is likely given the TTP alignment” is exactly the kind of sentence a language model produces because it sounds authoritative and complete. It is also exactly wrong in an analytically important way. TTP alignment is a necessary condition for attribution, not a sufficient one. The SOHO botnet proxying described in the CISA advisory means the external IP may route through compromised infrastructure that has nothing to do with the actual actor. An analyst who lets that sentence stand has not saved three minutes — they have handed their CISO a claim that cannot be defended when a board member asks “how do you know?”

The model does not know what it does not know. It was not present at the investigation. It did not read the 39-row proxy log. It filled in the assessment with the most plausible-sounding analysis given the findings you pasted into the prompt. That is a different cognitive operation from analysis grounded in first-hand data review.

The 2-minute validation in Step 11 is not a formality. It is the step where the analyst reasserts ownership of the product. Every confidence claim examined. Every attribution hedge confirmed. Every recommended action verified against what the team can actually execute. If those 2 minutes are skipped because the draft looks good enough, the assessment that reaches the CISO is the model’s. The model is not accountable for it. You are.

This is why the claim “the AI-era approach produces the same assessment in 3 minutes” is precisely wrong, and why this article does not make it. The AI-era approach produces a draft that a skilled analyst, using 3 minutes well, can convert into a defensible assessment. The skill and the 3 minutes are both required.

## What the clock actually measures

The total time saved across eleven steps is 111 minutes. But the clock only measures the mechanics.

**The manual process embeds thinking inside the mechanics.**When you subtract timestamps by hand, you read every row. When you sort by destination IP in Excel, you see the shape of the data before you have quantified it. You feel the dataset before you have measured it. When pandas does the sort in three seconds, you get the answer — and you skip the reading. That skip is mostly fine. But it creates a failure mode the manual process does not have: the analyst who accepts output without asking whether the question was well-formed.

“What is the median beacon interval?” and “is the interval consistent enough to indicate automation?” are different questions. The first produces a number. The second requires a judgement. Pandas gives you the number. The judgement is still yours.

**AI brainstorming is only as good as the prompt, and the prompt is only as good as the reading.**The 25 minutes of reading in Steps 1 and 2 — identical in both approaches — are not overhead. They are the investment that makes the brainstorm produce CTI rather than a summarised web article. Every minute cut from the reading shows up downstream as generic content, missed context, or hallucinated connections to material the model was never given.

**The assessment is always the analyst’s.**The Python pivot is arithmetic, not intelligence. The LLM draft is a scaffold, not a finding. Somewhere after all eleven steps, a human being looks at everything and decides:*this is what I believe, this is how confident I am, this is what I recommend, and this is what I do not yet know.*That decision cannot be delegated. The 39-minute path does not remove it. It clears the road to it faster.

**An LLM is a statistical model — and that is both its strength and its hard limit.**Because it is trained on vast corpora of text, an LLM can match patterns in data, surface statistical anomalies, and identify correlations across everything it has ingested — often faster and more consistently than a human analyst whose attention drifts after the second hour of a log review. In that narrow sense it genuinely sees the data better: it does not tire, it does not anchor on the first hypothesis it forms, and it does not skip rows.

But statistical models are, by construction, conservative. A language model predicts the most probable continuation of a sequence given everything it has learned. Its hypotheses are almost always drawn from the distribution of what has already been documented. It is structurally biased toward high-probability continuations, which makes it significantly less likely to surface a non-standard hypothesis unprompted — the kind of explanation that sits outside the documented pattern the training data establishes. It has no intuition. It cannot make the lateral leap that breaks from the established pattern.

In CTI, the most valuable analyst insight is sometimes the one that goes*against*the data’s apparent signal. “What if this is not a nation-state actor at all — what if this is an insider using a commercial VPN and the regular interval reflects a scheduled task the user set up themselves?” is a hypothesis the Meridian proxy log does not rule out. A statistical model would be unlikely to surface it unprompted, because the pattern of 23 connections to an uncategorised IP at consistent intervals strongly fits the C2 narrative in training data, and the insider-with-VPN hypothesis is a lower-probability continuation of that evidence set.

The human analyst who finds the nation-state story too clean, who has seen this pattern misattributed before, who follows an instinct that something is off — that analyst generates the hypothesis the model does not. The clock cannot measure this capacity. Time savings are real and quantifiable. The ability to produce a non-standard hypothesis — the kind that turns out to be the correct one when the standard explanation collapses — is not a function of time. It is a function of the analyst who is present, and no model substitutes for it.

## What nearly two hours actually buys

![Article image](https://cdn-images-1.medium.com/max/800/1*wZCsySfeiP3fQk78-WbPwg.png)

In the manual approach, the analyst spent 150 minutes and produced an assessment with two [BLOCKER] gaps still open — the IP reputation unknown, the process responsible for the port-80 connection unconfirmed. Not because the analyst did not know those gaps existed. Because there was no time left.

In the AI-era approach, the analyst spent 39 minutes and produced a corrected, defensible assessment — with 111 minutes remaining in the same workday.

Those 111 minutes buy something concrete. IP enrichment on 185.220.101.47 via GreyNoise, Shodan, and VirusTotal — resolving the first [BLOCKER] before the assessment leaves the desk. Endpoint log correlation on MRDN-ENG-04, confirming or refuting the certutil hypothesis before escalating to incident response. A check of whether any other Engineering hosts connected to the suspicious IP outside the five-day window. A second pass on the attribution section to ensure it does not overstate what proxy log evidence can actually support.

In the manual approach, those tasks get scheduled for tomorrow. In the AI-era approach, they happen today, before the CISO acts on an incomplete picture.

The AI-era approach does not produce better analysis automatically. It produces time. What you do with that time — whether you use it to think harder or just to close more tickets — is the only thing that determines whether 111 minutes of savings become 111 minutes of better intelligence.

*Source reports:*[*CISA Advisory AA23–144A*](https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-144a)*(24 May 2023) and*[*Microsoft Volt Typhoon advisory*](https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/)*(24 May 2023). The Meridian Freight Group scenario and dataset are original — no course-proprietary material is reproduced.*

## Follow for practical cybersecurity research

If you’re interested in**Offensive security,****AI security, real-world attack simulations, CTI, and detection engineering**— this is exactly what I focus on.

Stay connected:

→**Subscribe on Medium:**[medium.com/@1200km](https://medium.com/@1200km)
→**Connect on LinkedIn:**[andrey-pautov](https://www.linkedin.com/in/andrey-pautov/)
→**GitHub — tools & labs:**[github.com/anpa1200](https://github.com/anpa1200)
→**Contact:**[1200km@gmail.com](mailto:1200km@gmail.com)
