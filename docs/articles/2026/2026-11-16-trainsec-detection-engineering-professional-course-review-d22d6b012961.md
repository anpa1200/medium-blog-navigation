---
title: "TrainSec Detection Engineering Professional Course Review"
description: "An independent review of TrainSec detection engineering training, attack simulations, Windows telemetry, Elastic investigations, workload, and companion resources."
image: "https://1200km.com/articles/article-assets/trainsec-detection-engineering-review/cover.png"
---

# TrainSec Detection Engineering Professional Course Review

*How attack simulations, endpoint telemetry, and clear investigation workflows turn detection engineering into a practical discipline.*

<img src={require('@site/static/article-assets/trainsec-detection-engineering-review/cover.png').default} alt="TrainSec Detection Engineering Professional course review cover from the published Medium article" width="700" height="394" loading="eager" fetchPriority="high" decoding="async" />

**By Andrey Pautov**

> **Affiliate disclosure:** Course enrollment links marked “affiliate” use my TrainSec referral URL. I may earn a commission if you enroll through them. The basis on which I obtained course access is not disclosed. The review reflects my own assessment.

Originally published on [Medium](https://medium.com/@1200km/trainsec-detection-engineering-professional-course-review-d22d6b012961) on 16 November 2026.

## My verdict

This review follows my <a href="https://1200km.com/articles/read/2026/2026-08-19-course-review-trainsec-malware-analyst-professional-level-1-203ca89b76a2/" target="_self">TrainSec Malware Analyst Professional Level 1 review</a>, but the central question is different. Malware analysis asks what a suspicious object does. Detection engineering asks what evidence that behavior creates, how we can recognize it reliably, and how we know our detection actually works.

TrainSec’s Detection Engineering Professional course is strongest when it connects an attacker’s actions to the evidence a defender can investigate. Its hands-on approach makes that relationship concrete: explain the technique, simulate it, inspect the telemetry, and develop a detection.

I approached the course as an experienced security practitioner, connecting the lessons to my research and practical guides. Windows Event Logs, Sysmon configuration, and the Elastic-based investigation workflow stood out. The main value for me is the explanation of what happens, why it happens, and how to investigate it.

> The simulations discussed here require an isolated, authorized lab. The linked companion guides and tools are my independent work and supplement the course.

## Table of Contents

1. [More than an introductory bootcamp](#more-than-an-introductory-bootcamp)

2. [From foundations to investigation](#from-foundations-to-investigation)

3. [The real workload](#the-real-workload)

4. [What I would improve](#what-i-would-improve)

5. [My supplementary course materials](#my-supplementary-course-materials)

6. [My research ecosystem as a parallel practical project](#my-research-ecosystem-as-a-parallel-practical-project)

7. [Who the course suits](#who-the-course-suits)

8. [Conclusion](#conclusion)

9. [Related research](#related-research)

10. [References](#references)

11. [Follow my work](#follow-my-work)

## More than an introductory bootcamp

What I appreciate most is the strong offensive-security foundation. It is much easier to reason about an alert when you understand the activity that produced it.

The course connects attacker behavior to defensive observation rather than presenting the two as unrelated subjects. That is particularly valuable for people who can already execute a technique but want to understand its visibility from the defender’s side, or who investigate alerts but have never reproduced the underlying activity themselves.

My notes repeatedly return to three qualities: practical simulations, real-world use cases, and clear explanations. Those qualities matter more to me than a long list of product names.

A useful demonstration does not end when an attack succeeds. It should make the evidence understandable. What changed on the endpoint? What appeared in the logs? Which observations are relevant to the investigation? What should a detection look for? That connection is where this course is strongest.

### Windows Event Logs that actually make sense

The Windows event-log explanation stood out as particularly clear and professional. The instructor’s practical experience comes through in the way the material is explained.

Knowing an event number is only the beginning. The useful skill is understanding the record in context and connecting it to what happened on the system. A log entry is evidence, not a complete explanation by itself.

For readers who want a reference beside the lessons, my <a href="https://1200km.com/log-sources/" target="_self">Security Log Source Library</a> provides examples, field descriptions, collection guidance, and investigation context. I use it as a companion to the reasoning process, not as a substitute for looking at the actual telemetry in a lab.

### Sysmon explained through configuration and simulation

The Sysmon material is detailed and hands-on, particularly where it connects configuration choices to attack simulations.

That is an important distinction. Installing a sensor is not the same as understanding what it records. Configuration choices affect what an analyst can observe, and a useful exercise connects those choices to the behavior being investigated.

I particularly value training that makes you think about visibility before detection logic. If the necessary evidence is not collected, a sophisticated query cannot recover it afterward.

### EDR explained with a concrete example

The explanation of EDR using Elastic Agent is detailed and practical. The course materials distinguish the agent, the Elastic Defend integration, Fleet policy management, Elasticsearch storage, and the Kibana investigation interface. Instead of leaving EDR as an abstract category, the course gives the discussion a concrete platform.

For me, the value is the relationship between endpoint activity, collected evidence, and investigation. A product interface is easier to understand when it represents behavior you have just seen demonstrated.

The broader lesson is portable even when the interface is not: understand the data, understand its limitations, and know which observations support the conclusion. A detection should not become a black box simply because it runs inside an EDR product.

## From foundations to investigation

The official <a href="https://training.trainsec.net/soc-analyst-professional-attack-and-defense/v6dfz" rel="sponsored noopener noreferrer">course curriculum (affiliate)</a> moves from attacker concepts and malware behavior through proactive defense, Windows telemetry, Sysmon, and Elastic-based detection work. It then applies those foundations to attack-and-defense exercises.

What makes that progression useful to me is the repeated connection between explanation and evidence. The later demonstrations are easier to follow because the foundations give the activity meaning.

### From foundations to an operational workflow

The 367-page course presentation provides a substantial written companion to the videos. Its scope runs from attacker thinking and malware analysis through hardening, incident response, threat hunting, Windows logs, Sysmon, EDR deployment, detection development, and practice scenarios.

The hardening material connects defensive work with system and network controls, rather than treating an alert as the only possible outcome. The threat-hunting section then develops a progression from a scoped question and checked telemetry to a hypothesis, investigation, validation, a reusable detection, and improvements to visibility.

I like that connection to the larger defensive workflow. A detection engineer should understand both the evidence needed to recognize an intrusion and the decisions that evidence will support. My <a href="https://1200km.com/articles/read/2026/incident-response-lifecycle/" target="_self">incident-response guide</a> and <a href="https://1200km.com/articles/read/2026/threat-hunting-from-intelligence-to-validated-defense/" target="_self">threat-hunting guide</a> are useful companions to these parts of the course.

### Initial access and lateral movement

The RDP, PsExec, and WinRM demonstrations are excellent examples of the teaching style. Each attack is explained, simulated, investigated, and followed through to detection.

The demonstrations make each stage clear and visual. That helps connect the command being executed to the evidence an investigator would see.

Seeing the sequence from both sides also makes it easier to ask better questions. What evidence distinguishes expected administration from suspicious behavior? Which details matter to the detection? What context would an analyst need before deciding what happened?

Those are more useful questions than simply asking whether a particular tool is malicious.

### Discovery using ordinary Windows tools

The discovery section follows the same hands-on pattern. The syllabus identifies Nltest and Net discovery exercises, with separate simulation, investigation, and detection stages.

The value of this topic is that ordinary administrative tools can appear in both legitimate and malicious workflows. The tool name alone cannot explain intent.

What I liked in this section was the clarity of the progression. Instead of treating discovery as an abstract ATT&CK label, the demonstrations make the activity visible and understandable.

That is also why I keep practical ATT&CK references close to my notes. A framework is useful when it helps explain evidence and organize a test, not when it becomes a collection of labels added after the analysis.

### Living off the land and detection bypass

The published syllabus includes Emotet-related PowerShell detection, WMI, and KeyMgr detection-bypass lessons. These topics extend the same attack-and-defense perspective into situations where simplistic assumptions can break.

The important question for a defender is not whether a familiar binary or management mechanism exists. It is whether the observed behavior makes sense in context.

For my own study, this is a reason to document assumptions explicitly: what the detection expects to observe, what would make that expectation fail, and what additional evidence would be needed. Learning how a detection can fail is part of learning how to trust it appropriately.

### Persistence and credential access

The persistence and credential-access material is detailed, visual, and highly practical. The persistence examples include the Windows Registry, services, and the Startup folder.

Again, the separation into simulation, investigation, and detection is what makes the teaching effective. These are not just three headings for the same demonstration. They represent different questions: how the behavior is produced, how it can be reconstructed, and how it can be recognized again.

I especially appreciate that level of explanation for persistence. A configuration change can look simple in isolation, while its significance depends on how it was created and what it causes the system to do afterward.

The credential-access coverage has the same practical strength: hands-on demonstrations that make the techniques easier to follow.

### Process injection and the limits of visibility

The course presentation also covers remote-thread injection, MavInject, process hollowing, APC injection, and thread execution hijacking. The useful connection is between the technique, the evidence a sensor might provide, and the limits of that evidence.

The Sysmon section explicitly warns that one event type does not reveal every form of injection. That is an important qualification: seeing suspicious cross-process activity is not the same as having a complete explanation of what happened in memory.

I would approach these examples as detection-development exercises, not ready-made proof of universal coverage. Collection settings, product capabilities, and available fields still need to be checked in the environment where a rule will run.

### Practical advice from the Protips section

The Protips section adds a useful professional perspective to the technical demonstrations.

Its detailed advice on approaching problems and questioning assumptions is valuable even for experienced practitioners.

Experienced practitioners can still benefit from hearing how another professional approaches a problem. Sometimes the most valuable part of a course is not a new technique, but a better way to organize an investigation or recognize a weak assumption.

## The real workload

The workload extends beyond video playback.

The repeated simulation–investigation–detection structure makes active participation particularly important. Watching a demonstration can make the process feel straightforward. Repeating it yourself reveals whether you understand the behavior and the evidence.

My preferred approach is to keep three kinds of notes:

- **What happened:** the action being simulated and the conditions under which it ran.

- **What I observed:** the relevant telemetry and the reasoning that connects it to the action.

- **What I can reuse:** an investigation checklist, a detection idea, a reference, or a question for further testing.

That approach is also why I connect the lessons to independent guides. A short note captures an observation; a fuller guide makes it easier to return to the subject and apply it elsewhere.

I would budget time for reproducing examples, reviewing results, and tuning detections. A successful lab demonstration is a starting point; the same logic still needs testing against the telemetry and legitimate activity in another environment.

### Six independent investigation labs

The separate 19-page practice workbook turns individual techniques into longer investigation scenarios. It contains six labs:

| Lab | Main investigation focus |
| --- | --- |
| Phishing to execution | Connect user-driven execution with process, file, and network evidence. |
| Password spraying to account compromise | Relate authentication failures to a later successful logon and follow-on activity. |
| PsExec and ADMIN$ lateral movement | Reconstruct remote authentication, service activity, and execution on the target. |
| Defense evasion and security-tool tampering | Distinguish a suspicious command from a control change that actually succeeded. |
| C2, data staging, and exfiltration | Connect staged files and archive creation with a transfer, then establish its outcome and scope. |
| Ransomware incident | Investigate simulated mass file changes, recovery-tampering indicators, and earlier intrusion activity. |

The workbook asks for independent detection work and explicitly provides no answer key. It also includes a reusable incident-note template covering the timeline, affected entities, assessment, containment recommendation, detection logic, tuning, and possible bypasses.

That is a meaningful practical requirement. The output is not merely a screenshot of an alert; it is an explanation an analyst can use.

The distinction between a broad hunting query and an operational alert is also explicit. The workbook separates Elastic KQL filters from Threshold rules and EQL sequences, and requires validation through another simulation. This is especially useful because Kibana Query Language and Microsoft’s Kusto Query Language share an abbreviation but are not interchangeable.

The workbook specifies an Active Directory lab with a domain controller and workstation, Sysmon, Elastic Defend through Elastic Agent/Fleet, and disposable VM snapshots. Its hardware guidance is 16 GB RAM minimum, with 32 GB recommended. Plan for the environment and investigation work, not just playback time.

Safety boundaries are part of the exercises: local test services and dummy files are used for transfer and impact scenarios, while audit-only examples are separated from real changes to protective controls. Those distinctions matter. Producing a suspicious-looking command line does not prove that a security control was disabled.

## What I would improve

The substantial written materials support the practical work with investigation questions, tuning guidance, and an incident-note template. The improvements I would most welcome concern feedback and consistency.

First, I would welcome an optional self-check rubric or worked reference investigation for the independent labs. The workbook deliberately gives no answer key. That encourages independent reasoning, but a rubric would help a student distinguish a defensible alternative solution from an investigation that missed important evidence.

Second, I would make an editorial consistency pass across the slides and workbook. For example, the presentation associates event 4776 with Kerberos on page 184, but identifies it as NTLM on page 190. The workbook also explicitly cautions against importing Microsoft query syntax and table names into Elastic. A unified, versioned reference would make these details easier to follow.

Finally, the query examples should remain starting points for testing, not copy-and-deploy rules. The materials repeatedly call for checking results in Discover or Timeline and tuning legitimate activity. I would retain that requirement prominently in any downloadable rule pack, together with the relevant schema, collection prerequisites, and validation results.

There is also a scope consideration. The published curriculum concentrates on Windows and Active Directory, with Sysmon and Elastic prominent in the workflow. That makes it relevant to those environments, but readers looking specifically for a cloud-only, Linux-focused, or multi-SIEM specialization should compare their goals with the curriculum before enrolling.

## My supplementary course materials

The following guides and projects expand on subjects covered in the course, from reconnaissance and malware behavior to telemetry and detection design.

These are independent resources from my own learning and research. Some are newer companion articles; others predate this course.

### Foundations and reconnaissance

My reconnaissance material provides additional context for the port-mapping and attacker-perspective topics:

- <a href="https://1200km.com/articles/read/2024/2024-10-24-shodan-guide-how-you-can-find-everything-640f47f41bbe/" target="_self">Shodan</a>

- <a href="https://1200km.com/articles/read/2024/2024-10-26-mastering-nmap-a-comprehensive-guide-to-network-exploration-and-security-auditing-part-1-f36d74d1b2c0/" target="_self">Nmap Part 1</a>

- <a href="https://1200km.com/articles/read/2024/2024-10-27-mastering-nmap-a-comprehensive-guide-to-network-exploration-and-security-auditing-part-2-d5a95569031c/" target="_self">Nmap Part 2</a>

- <a href="https://1200km.com/articles/read/2024/2024-10-28-mastering-nmap-a-comprehensive-guide-to-network-exploration-and-security-auditing-part-3-450eec6e9db2/" target="_self">Nmap Part 3</a>

- <a href="https://1200km.com/articles/read/2024/2024-10-30-mastering-nmap-a-comprehensive-guide-to-network-exploration-and-security-auditing-part-4-s-5ec77704057f/" target="_self">Nmap Part 4 Scripts</a>

- <a href="https://1200km.com/articles/read/2025/2025-11-24-reinventing-recon-nmap-meets-chatgpt-e2acb6130be5/" target="_self">Reinventing Recon Nmap Meets ChatGPT</a>

- <a href="https://1200km.com/articles/read/2025/2025-12-23-integrating-shodan-with-hexstrike-ai-using-gemini-cli-b6f9fcbe8e6e/" target="_self">Integrating Shodan with HexStrike AI</a>

- <a href="https://1200km.com/articles/read/2025/2025-12-21-ai-driven-pentesting-at-home-using-hexstrike-ai-for-full-network-discovery-and-exploitatio-00a9e88b3bde/" target="_self">AI Driven Pentesting at Home</a>

- <a href="https://1200km.com/articles/read/2025/2025-12-18-hexstrike-ai-install-configure-and-run-mcp-with-gemini-openai-cursor-llama-85a0e5752949/" target="_self">HexStrike AI Installation and Configuration</a>

- <a href="https://1200km.com/articles/read/2026/2026-01-31-a-complete-cloud-penetration-testing-walkthrough-1914f687d7fd/" target="_self">A Complete Cloud Penetration Testing Walkthrough</a>

- <a href="https://1200km.com/articles/read/2026/2026-01-31-ai-assisted-web-and-cloud-penetration-testing-with-cursor-mcp-hexstrike-and-burp-suite-mcp-01c02eed5258/" target="_self">AI Assisted Web and Cloud Penetration Testing</a>

Some earlier reconnaissance guides are preserved historical articles; check commands and tooling against current documentation before reuse. The AI-assisted examples are optional extensions. They are useful for exploring workflow and tooling, but I would learn the underlying reconnaissance behavior before relying on automation.

### Vulnerabilities, exploits, and attacker objectives

- <a href="https://1200km.com/articles/read/2026/2026-03-24-cvss-v4-0-the-practical-field-guide-for-vulnerability-management-5b5a59728456/" target="_self">CVSS v4.0: The Practical Field Guide for Vulnerability Management</a> connects severity scoring with threat and environmental context.

- <a href="https://1200km.com/articles/read/2024/2024-11-24-title-metasploit-modules-guide-exploit-73eecb50e3c3/" target="_self">Metasploit Modules Guide: Exploit</a> expands the exploitation vocabulary into module selection and configuration.

- <a href="https://1200km.com/articles/read/2026/2026-05-09-cti-kill-chain-an-analyst-guide-with-real-world-evidence-c3bef6fd2979/" target="_self">CTI Kill Chain: An Analyst Guide With Real-World Evidence</a> connects intrusion stages to evidence.

- <a href="https://1200km.com/articles/read/2026/2026-03-20-attribution-methodology-how-to-build-defend-and-challenge-a-threat-actor-attribution-071066437ced/" target="_self">Attribution Methodology</a> explores actor identification, alternative explanations, and confidence.

These resources connect technical vocabulary to practical questions: what is vulnerable, what the exploit does, how an intrusion develops, and which claims the available evidence actually supports.

### Malware behavior and ATT&CK

- <a href="https://1200km.com/articles/read/2026/2026-08-06-what-is-malware-93746950ce9a/" target="_self">What Is Malware?</a> provides the vocabulary for malware categories and capabilities.

- <a href="https://1200km.com/articles/read/2026/2026-03-01-basic-static-malware-analysis-from-triage-to-unpacking-explained-and-automated-9442ef3b11b8/" target="_self">Basic Static Malware Analysis: From Triage to Unpacking</a> connects initial file examination to deeper investigation.

- <a href="https://1200km.com/articles/read/2026/2026-03-19-att-and-ck-as-a-working-tool-theory-and-hands-on-practical-usage-d63835c9f101/" target="_self">ATT&CK as a Working Tool</a> develops practical workflows for CTI, detection engineering, and hunting.

- <a href="https://1200km.com/articles/read/2025/2025-06-17-tools-by-mitre-att-and-ck-guide-77c4d947ba36/" target="_self">Tools by MITRE ATT&CK Guide</a> connects techniques with practical tool examples.

My goal with these materials is to make ATT&CK useful in an investigation. A technique mapping should help organize evidence, select tests, or identify gaps. It should not substitute for explaining what happened.

### Proactive defense, incident response, and threat hunting

- <a href="https://1200km.com/articles/read/2026/incident-response-lifecycle/" target="_self">The Incident Response Lifecycle: From First Alert to Verified Recovery</a> covers the progression from preparation and analysis to recovery and improvement.

- <a href="https://1200km.com/articles/read/2026/threat-hunting-from-intelligence-to-validated-defense/" target="_self">Threat Hunting: From Intelligence to Validated Defense</a> extends the discussion into evidence-led hunting.

- <a href="https://1200km.com/articles/read/2025/2025-12-12-protocol-level-network-threat-hunting-a-wireshark-centric-guide-a6770ffc96c6/" target="_self">Protocol-Level Network Threat Hunting: A Wireshark-Centric Guide</a> provides a complementary network perspective.

Detection is part of a larger defensive workflow. An alert needs context, investigation, and a decision about what happens next. These guides extend that relationship beyond the individual lab exercise.

### Windows telemetry and detection engineering

- <a href="https://1200km.com/log-sources/" target="_self">Security Log Source Library</a> supports field-level investigation and collection planning.

- <a href="https://1200km.com/articles/read/2025/2025-12-01-single-event-detection-rules-in-cybersecurity-aa7498f665bd/" target="_self">Single-Event Detection Rules in Cybersecurity</a> provides a starting point for reasoning about individual observations.

- <a href="https://1200km.com/articles/read/2025/2025-12-02-correlation-based-detection-rules-in-cybersecurity-from-atomic-events-to-behavioral-insigh-1b3df31597bb/" target="_self">Correlation-Based Detection Rules in Cybersecurity</a> extends that thinking to connected activity.

- <a href="https://1200km.com/newest-detection-engineering-techniques/" target="_self">Newest Detection Engineering Techniques</a> connects rule development to a broader detection-engineering workflow.

I would use these alongside the Windows event-log, Sysmon, and EDR sections. They support the habit I want to retain from the course: move from a behavior to evidence, and from evidence to a detection whose assumptions can be tested.

## My research ecosystem as a parallel practical project

In my Malware Analysis review, AIDebug was the parallel project. Here, the most natural connection is my broader detection and threat-intelligence ecosystem.

<a href="https://1200km.com/threat-matrix/" target="_self">Threat Matrix</a> helps organize actor and technique context. <a href="https://1200km.com/adversarygraph/" target="_self">AdversaryGraph</a> and its <a href="https://1200km.com/adversarygraph-docs/" target="_self">documentation</a> connect intelligence investigation with detection-oriented work. The [source repository](https://github.com/anpa1200/adversarygraph) provides the project’s code and maintained documentation.

The connection is methodological: describe the behavior, preserve the evidence, map it carefully, and make the next step explicit.

A practical route through that ecosystem is to choose a behavior in the <a href="https://1200km.com/attack-matrix/" target="_self">ATT&CK matrix</a>, inspect the <a href="https://1200km.com/ttp-simulation/" target="_self">attack simulation references</a>, plan collection with the <a href="https://1200km.com/ttp-simulation/telemetry/" target="_self">Telemetry Library</a> and <a href="https://1200km.com/log-sources/" target="_self">Security Log Source Library</a>, then compare candidate logic with the <a href="https://1200km.com/ttp-simulation/detections/" target="_self">Detection Rules library</a>. Use the <a href="https://1200km.com/anomaly-detection-atlas/" target="_self">Anomaly Detection Atlas</a> for additional investigation questions. These are independent references; their presence does not establish that a course exercise or rule has been validated in your environment.

The <a href="https://1200km.com/courses/#path-detection-engineering-practice" target="_self">Detection Engineering learning path</a> brings those steps together with this review and the earlier malware-analysis learning record.

I do not want an ATT&CK mapping, a tool output, or an attractive report to stand in for validation. The course’s practical emphasis fits the way I want to develop my own work: use simulations to ask concrete questions, then inspect what the telemetry actually supports.

The same principle applies to AI assistance. Automation can help organize material, suggest hypotheses, or accelerate repetitive work. It does not remove the need to understand the evidence or test the resulting detection.

## Who the course suits

I would recommend this learning style to people who:

- already have a practical security foundation and want to deepen their detection-engineering skills;

- understand offensive techniques but want to see them through endpoint and SIEM evidence;

- investigate alerts and want a stronger understanding of the behavior behind them;

- want clear, visual demonstrations rather than a terminology-only overview;

- are prepared to reproduce simulations and investigate the results;

- want to connect Windows logs, Sysmon, and EDR telemetry to practical detection work.

For a complete beginner, I would first build confidence with Windows, networking, command-line tools, and basic lab operation. Otherwise, too much attention may go into operating the environment rather than understanding the investigation.

For an experienced practitioner, the attraction is different: detailed explanations, another professional’s reasoning, and a structured opportunity to revisit assumptions.

## Conclusion

The strongest quality of TrainSec’s Detection Engineering Professional course is the connection between attack and defense.

Windows Event Logs, Sysmon configuration, Elastic-based investigations, lateral movement, discovery, persistence, and credential access fit into a coherent workflow. The value is in following the evidence from the simulated behavior through investigation to detection.

The repeated simulation–investigation–detection structure is the main reason I find the course valuable. The Protips section adds useful professional perspective to that technical work.

I would recommend it to practitioners who want to reproduce attacker behavior, understand the resulting telemetry, and test their own detection logic. To get the most from it, plan to spend time in the lab and explain your findings, rather than stopping at an alert screenshot.

Review the <a href="https://training.trainsec.net/soc-analyst-professional-attack-and-defense/v6dfz" rel="sponsored noopener noreferrer">official curriculum and enrollment information (affiliate)</a> against your own goals and environment.

## Related research

- <a href="https://1200km.com/articles/read/2026/2026-08-19-course-review-trainsec-malware-analyst-professional-level-1-203ca89b76a2/" target="_self">My previous TrainSec Malware Analysis review</a> explains the companion-guide approach behind this learning record.

- <a href="https://1200km.com/kill-chain/" target="_self">Kill Chain Navigator</a> organizes my material around intrusion stages.

- [AIDebug](https://github.com/anpa1200/AIDebug) connects the malware-analysis side of my work with the behavioral questions that feed defensive research.

- <a href="https://1200km.com/courses/" target="_self">1200km Courses and Learning Paths</a> brings the learning records and supporting material together.

## References

1. <a href="https://training.trainsec.net/soc-analyst-professional-attack-and-defense/v6dfz" rel="sponsored noopener noreferrer">TrainSec Detection Engineering Professional: Attack Simulation & Defense (affiliate)</a>

2. [Official course syllabus](https://trainsec.net/wp-content/uploads/2026/09/Syllabus-Detection-Engineering-Professional.pdf)

3. [Uriel Kosayev’s TrainSec profile](https://trainsec.net/uriel-kosayev/)

4. Uriel Kosayev, *Detection Engineering Professional: Attack Simulation & Defense*, supplied course presentation, 367 pages. Relevant sections include hunting (pp. 160–169), Windows logs and Sysmon (pp. 178–200), Elastic architecture and query languages (pp. 201–227), technique demonstrations (pp. 228–309), and detection workflow and labs (pp. 310–367).

5. *Attack Simulation and Detection Engineering Practice Labs*, supplied workbook, 19 pages. The lab method and environment are on pp. 2–3; six scenarios occupy pp. 4–18; the reusable analyst template is on p. 19.

## Follow my work

I publish practical cybersecurity research, CTI workflows, detection-engineering notes, malware-analysis projects, AI-security research, open-source tools, labs, and technical guides.

- <a href="https://1200km.com/" target="_self">Website: 1200km.com</a>

- [Medium: @1200km](https://medium.com/@1200km)

- [LinkedIn: Andrey Pautov](https://www.linkedin.com/in/andrey-pautov/)

- [GitHub: tools and labs](https://github.com/anpa1200)

- Contact: 1200km@gmail.com
