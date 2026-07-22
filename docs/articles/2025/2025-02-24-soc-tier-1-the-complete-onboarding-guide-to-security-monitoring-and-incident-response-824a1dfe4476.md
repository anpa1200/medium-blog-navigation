---
title: "SOC Tier 1: The Complete Onboarding Guide to Security Monitoring and Incident Response"
description: "Part 1."
image: "https://cdn-images-1.medium.com/max/800/0*IK2qcLkDcCpK5lhp"
---

# SOC Tier 1: The Complete Onboarding Guide to Security Monitoring and Incident Response


<img src="https://cdn-images-1.medium.com/max/800/0*IK2qcLkDcCpK5lhp" alt="Cover image" width="1792" height="1024" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/soc-tier-1-the-complete-onboarding-guide-to-security-monitoring-and-incident-response-824a1dfe4476](https://medium.com/@1200km/soc-tier-1-the-complete-onboarding-guide-to-security-monitoring-and-incident-response-824a1dfe4476)
- **Published:** 2025-02-24
- **Preserved media:** 1 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 0 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

Part 1.

### Essential Tools, Techniques, and Knowledge for Entry-Level SOC Analysts with No Prior Experience

<img src="https://cdn-images-1.medium.com/max/800/0*IK2qcLkDcCpK5lhp" alt="Article image" width="1792" height="1024" loading="lazy" decoding="async" />

## Introduction

In today’s digital landscape, organizations face an ever-increasing number of cyber threats, ranging from phishing attacks to advanced persistent threats (APTs). To effectively defend against these risks, businesses rely on a**Security Operations Center (SOC)**— the central hub for monitoring, detecting, and responding to security incidents in real time.

The SOC is the frontline defense, equipped with skilled analysts, advanced tools, and robust processes to ensure that critical assets, networks, and data remain secure. Whether you’re new to the cybersecurity field or looking to understand the role of a SOC, this guide will provide you with a clear and comprehensive overview of its structure, functions, and importance in protecting an organization’s digital infrastructure.

From continuous monitoring and incident response to proactive threat hunting, the SOC plays a critical role in safeguarding against modern cyber adversaries. This introduction will set the stage for you to dive deeper into the world of**SOC operations**and understand how analysts at different tiers work together to defend against evolving threats.

Let’s explore what a SOC is, why it’s vital, and how it operates to ensure your organization’s security remains resilient and effective.

## Syllabus: SOC Tier 1 — Structured Training Program

## Week 1: Introduction to SOC and Information Security

**Objective**: Provide a fundamental understanding of the SOC, system structure, common threats, and key tools.

- **Introduction to SOC**

- What is a Security Operations Center (SOC)?

- SOC roles and responsibilities (Tier 1, Tier 2, Analysts, Investigators).

- Key concepts:**Alert/Offense**,**Event**,**Incident**.

**2. Common Threats and Attack Types**

- Types of attacks:

- **Phishing**,**Brute Force**,**DDoS**,**Ransomware**.

- Introduction to**MITRE ATT&CK**framework and TTPs (Tactics, Techniques, Procedures).

**3. Introduction to SIEM Systems**

- What is a SIEM?

- Example SIEM tools:**QRadar**,**Splunk**,**Google Chronicle**.

- Basic SIEM concepts: log collection, dashboards, correlation rules, and basic queries.

**4. Logs and Basic Protocols**

- Understanding**TCP/IP**and common ports (80, 443, 22).

- Log formats:**Syslog**,**JSON**.

- How to read and interpret logs (source IP, destination IP, event type).

## Week 2: SOC Tools and Techniques

**Objective**: Build technical skills and familiarity with tools for monitoring and incident handling.

- **Working with SIEM Systems**

- Running basic queries to analyze logs.

- Identifying key log fields:**Source IP**,**Destination IP**,**Event Type**.

- Searching for anomalies in logs.

**2. Identifying and Handling Common Alerts**

- Detecting**Failed Login Attempts**(Brute Force).

- Analyzing**Phishing Emails**and email headers.

- Basic**DLP (Data Loss Prevention)**alert investigation.

**3. Introduction to External Tools**

- **VirusTotal**: File and hash analysis.

- **WHOIS**: Domain lookup and ownership.

- **IP Reputation**: Checking IP blacklists.

**4. Basic Network Traffic Analysis**

- Using**Wireshark**for network traffic capture and analysis.

- Understanding common protocols (HTTP, DNS, SSH).

## Week 3: Incident Response and Documentation

**Objective**: Prepare the analyst to handle incidents, document processes, and communicate effectively.

- **Incident Response Process**

- Key phases:**Detection**,**Analysis**,**Containment**,**Reporting**.

- Following**Playbooks**for common scenarios.

**2. Identifying False Positives**

- Differentiating false positives from real alerts.

- Case studies and real-world examples.

**3. Documentation and Reporting**

- Proper incident documentation.

- Structure of a basic**Incident Response Report**.

- Key communication guidelines for escalating incidents to Tier 2 and IT teams.

**4. Hands-On Practice**

- Simulated scenarios: phishing detection, brute force alerts, malware detection

- Writing queries (AQL for QRadar) to identify security events.

## Week 4: Final Assessment and Independent Shift Readiness

**Objective**: Prepare participants for fully independent work as SOC Tier 1 analysts.

- **Hands-On Practice and Simulations**

- Guided SOC shifts with live or simulated alerts.

- Investigation, containment, and documentation of incidents.

2.**Red Team and Blue Team Scenarios**

- Recognizing Red Team techniques in simulations.

- Analyzing suspicious activities through logs.

3.**Final Assessment**

- Practical exercise with 3–4 alerts to investigate.

- Writing a full incident response report.

4.**Feedback and Next Steps**

- Personal feedback session for each participant.

- Preparation for independent shifts and ongoing mentorship.

## Tools Used During the Syllabus

- **SIEM**: QRadar, Google Chronicle.

- **SOAR:**Palo Alto XSOAR

- **Network Analysis**: Check Point Smart Console, Check Point NDR.

- **Information Gathering**: VirusTotal, WHOIS, IP Lookup Tools.

- **Documentation**: Templates for Incident Response Reports.

## What is a Security Operations Center (SOC)?

A**Security Operations Center (SOC)**is a centralized unit within an organization that is responsible for**monitoring, detecting, responding to, and mitigating security incidents**in real time. The primary goal of a SOC is to**protect an organization’s information systems, networks, and assets**from cyber threats.

## SOC Roles and Responsibilities

In a Security Operations Center (SOC), roles and responsibilities are typically divided into**tiers**to ensure efficient monitoring, analysis, and response to security threats. Each tier has distinct responsibilities, skill levels, and focus areas.

## 1. Tier 1: SOC Analyst (Junior / Entry-Level)

### Primary Role : Monitoring, triaging, and escalating security alerts.

### Responsibilities:

- **Alert Monitoring**: Continuously monitor the**SIEM**and security tools for alerts or suspicious activities.

- **Initial Triage**: Investigate and validate alerts to determine their legitimacy.

- **Incident Escalation**: Escalate verified security incidents to Tier 2 analysts for in-depth investigation.

- **Documentation**: Log incidents, alerts, and triage steps taken for record-keeping.

- **Basic Investigation**: Identify false positives and document real incidents.

- **Reporting**: Generate simple reports for management or SOC managers.

### Skills Required:

- Basic understanding of networking (TCP/IP, ports, protocols).

- Familiarity with security tools like SIEM, antivirus, and log management.

- Ability to follow playbooks and escalate appropriately.

## SOC Roles and Responsibilities

In a Security Operations Center (SOC), roles and responsibilities are typically divided into**tiers**to ensure efficient monitoring, analysis, and response to security threats. Each tier has distinct responsibilities, skill levels, and focus areas.

## 1. Tier 1: SOC Analyst (Junior / Entry-Level)

**Primary Role**: Monitoring, triaging, and escalating security alerts.

### Responsibilities:

- **Alert Monitoring**: Continuously monitor the**SIEM**and security tools for alerts or suspicious activities.

- **Initial Triage**: Investigate and validate alerts to determine their legitimacy.

- **Incident Escalation**: Escalate verified security incidents to Tier 2 analysts for in-depth investigation.

- **Documentation**: Log incidents, alerts, and triage steps taken for record-keeping.

- **Basic Investigation**: Identify false positives and document real incidents.

- **Reporting**: Generate simple reports for management or SOC managers.

### Skills Required:

- Basic understanding of networking (TCP/IP, ports, protocols).

- Familiarity with security tools like SIEM, antivirus, and log management.

- Ability to follow playbooks and escalate appropriately.

## 2. Tier 2: SOC Analyst (Intermediate / Senior)

**Primary Role**: In-depth analysis and investigation of security incidents.

### Responsibilities:

- **Incident Analysis**: Perform deeper investigation into escalated incidents from Tier 1.

- **Containment and Response**: Work to contain incidents and prevent further impact.

- **Log Analysis**: Correlate data from multiple sources (SIEM, network, endpoint tools).

- **Threat Hunting**: Proactively search for hidden threats or anomalies within the environment.

- **Playbook Execution**: Follow incident response playbooks for containment and mitigation.

- **Collaboration**: Coordinate with IT teams, Threat Intelligence teams, and Tier 3 analysts.

### Skills Required:

- Strong knowledge of network protocols, logs, and attack techniques.

- Hands-on experience with tools like EDR (Endpoint Detection & Response), and firewalls.

- Understanding of incident response methodologies.

## 3. Tier 3: SOC Investigator / Threat Hunter

**Primary Role**: Advanced analysis, threat hunting, and response to complex incidents.

### Responsibilities:

- **Advanced Threat Hunting**: Proactively search for**hidden threats**, APTs (Advanced Persistent Threats), and anomalies.

- **Forensic Investigation**: Perform digital forensics to analyze and trace root causes of breaches.

- **Malware Analysis**: Analyze malicious files, payloads, and behavior to understand the attack.

- **Incident Mitigation**: Provide advanced recommendations for containment, eradication, and recovery.

- **Automation & Optimization**: Develop advanced scripts and tools to improve SOC efficiency.

- **Threat Intelligence**: Leverage threat intelligence feeds to identify emerging attack trends.

### Skills Required:

- Expertise in digital forensics, malware analysis, and reverse engineering.

- Deep understanding of attack frameworks like**MITRE ATT&CK**and**Cyber Kill Chain**.

- Scripting knowledge (Python, Bash, PowerShell) for automation and analysis.

- Experience with tools like**Splunk**,**QRadar**, EDRs, and forensic tools.

## 4. SOC Manager

**Primary Role**: Oversee SOC operations, ensure workflows run smoothly, and align the SOC’s objectives with organizational goals.

### Responsibilities:

- **Team Management**: Supervise and mentor Tier 1, Tier 2, and Tier 3 analysts.

- **Incident Oversight**: Ensure all incidents are handled efficiently and documented properly.

- **Process Improvement**: Optimize processes, playbooks, and incident response procedures.

- **Reporting**: Generate executive reports about incident trends, SOC performance, and KPIs.

- **Collaboration**: Coordinate with IT, compliance, and management teams.

- **Strategy**: Develop security strategies and evaluate new tools and technologies.

### Skills Required:

- Leadership and project management skills.

- In-depth understanding of security operations, tools, and incident response.

- Strong communication and reporting skills.

## Key Concepts: Alert/Offense, Event, and Incident

These are fundamental terms in a**Security Operations Center (SOC)**and are crucial to understanding how security monitoring and incident response workflows operate. Here’s a breakdown of each concept:

### 1. Event

An**event**is any recorded activity or occurrence on a system, network, or application that is captured and logged for analysis. Events are raw data points and do not necessarily indicate malicious or abnormal activity.

### Examples of Events:

- A user logs into a system.

- A file is accessed, modified, or deleted.

- A firewall allows or denies network traffic.

- A server generates a status update or system error.

### Characteristics:

- Events are**low-level**and**high in volume**.

- They are**neutral**by nature and need further analysis to determine if they pose a threat.

### Tools:

Events are collected by tools like**SIEMs**(QRadar), endpoint tools, or log aggregators.

### 2. Alert (or Offense)

An**alert**(sometimes referred to as an**offense**in IBM QRadar) is a**notification**or signal generated by a security system when it detects suspicious or potentially malicious activity based on predefined rules, thresholds, or behavior.

### How Alerts Are Triggered:

- A**rule**or**correlation**in the SIEM system identifies a pattern of suspicious behavior.

- A threshold for unusual activity (e.g., multiple failed login attempts) is exceeded.

### Examples of Alerts:

- **Brute Force Alert**: Multiple failed login attempts in a short time.

- **Phishing Alert**: Detection of an email with malicious attachments.

- **Malware Alert**: Endpoint antivirus detects a malware-infected file.

### Characteristics:

- Alerts are**actionable**but may include**false positives**.

- Alerts require investigation by Tier 1 analysts to validate or escalate.

- Alerts aggregate one or more**events**that match specific criteria.

### 3. Incident

An**incident**is a**confirmed security breach**or event that poses a threat to the confidentiality, integrity, or availability of an organization’s systems, data, or services. An incident typically originates from an alert that has been investigated and validated by the SOC team.

### Examples of Incidents:

- A ransomware infection encrypting critical files.

- Unauthorized access to a server by an external threat actor.

- A phishing email successfully stealing user credentials.

- Data exfiltration of sensitive company information.

### Characteristics:

- Incidents are**escalated**from validated alerts.

- Require a structured**Incident Response (IR)**process, including containment, mitigation, and recovery.

- Often reported to management and may trigger regulatory compliance requirements (e.g., GDPR, HIPAA).

### Incident Lifecycle:

- **Detection**: Alert identifies a suspicious activity.

- **Validation**: SOC analysts confirm the incident.

- **Containment**: The threat is contained to prevent further damage.

- **Eradication**: The root cause is identified and removed.

- **Recovery**: Systems are restored to a secure state.

- **Post-Incident Review**: Lessons learned and reporting.

### Summary Table: Key Concepts

**Concept****Definition****Example****Action Required****Event**A logged activity, neutral in nature. A user logs in, or a file is accessed. None (raw data).**Alert/Offense**Notification of potential suspicious activity. Multiple failed login attempts detected. Investigate and validate.**Incident**A validated and confirmed security breach. Malware encrypting files. Trigger Incident Response.

### Relationship Between These Concepts

- **Events**are the raw data.

- **Alerts/Offenses**are generated when specific patterns or anomalies are detected in the events.

- Once validated, an alert becomes an**incident**that requires immediate action and remediation.

Understanding these concepts is critical for**SOC analysts**as it helps them efficiently identify threats, prioritize alerts, and respond to incidents in a structured manner.

## 2. Common Threats and Attack Types

In cybersecurity, understanding common threats and attack types is crucial for defense planning and incident response. Below, we’ll discuss some prevalent types of cyberattacks and introduce the MITRE ATT&CK framework, which categorizes and describes various cyber adversary behaviors.

### Types of Attacks

- **Phishing**:

- **Description**: Phishing involves sending fraudulent communications that appear to come from a reputable source, typically through email. The goal is to steal sensitive data like credit card and login information or to install malware on the victim’s machine.

- **Prevention Tips**: Educate users on the importance of not clicking on unsolicited links or downloading attachments from unknown sources. Use email filtering solutions to block suspected phishing emails.

**2. Brute Force Attack**:

- **Description**: This attack method involves trying many passwords or passphrases with the hope of eventually guessing correctly. The attacker systematically checks all possible passwords and passphrases until the correct one is found.

- **Prevention Tips**: Implement account lockout policies after a certain number of failed login attempts to prevent automated attacks. Use strong, complex passwords and consider using multi-factor authentication.

**3. DDoS (Distributed Denial of Service)**:

- **Description**: A DDoS attack aims to overwhelm a targeted server, service, or network with a flood of Internet traffic to make it unavailable to its intended users. These attacks often leverage numerous compromised computer systems as sources of attack traffic.

- **Prevention Tips**: Use advanced intrusion prevention and threat management systems that can detect and block DDoS attacks. Employ scalability in your internet infrastructure to handle unexpected increases in traffic.

**4. Ransomware**:

- **Description**: Ransomware is a type of malicious software designed to block access to a computer system or data, typically by encrypting it, until a sum of money is paid.

- **Prevention Tips**: Regularly back up data and store it independently from your network. Employ antivirus software and keep all systems up to date to protect against vulnerabilities that ransomware may exploit.

### MITRE ATT&CK Framework

The MITRE ATT&CK framework is a globally accessible knowledge base of adversary tactics and techniques based on real-world observations. It is used as a foundation for the development of specific threat models and methodologies in the private sector, in government, and in the cybersecurity product and service community.

- **Tactics**: The “why” of an ATT&CK technique. It describes the immediate goal of the attacker, such as gaining access or executing code. Tactics are categorized into stages like initial access, execution, persistence, privilege escalation, defense evasion, credential access, discovery, lateral movement, collection, exfiltration, and command and control.

- **Techniques**: The “how” of achieving a tactical goal. Techniques represent the specific actions an attacker takes to accomplish objectives. For example, a technique may involve the use of spear-phishing emails (under the tactic of Initial Access) to deliver malicious software.

- **Procedures**: These are the implementations of techniques. A procedure could be the specific method used to carry out a technique, such as the types of phishing emails sent and their contents.

To effectively guide a new SOC analyst on how to see each step of the cyber kill chain within IBM QRadar, it’s important to focus on the specific areas of the QRadar interface where these steps can be monitored, and how to interpret the data presented. Below, I’ll detail how a SOC analyst can utilize QRadar to view and analyze data relevant to each stage of the kill chain, assuming all necessary integrations and configurations are already in place.

## Understanding the Cyber Kill Chain

The concept of the “kill chain” is a model used to describe the stages of a cyber attack from early reconnaissance to the final execution of the objective. It was originally developed by Lockheed Martin and is based on military strategies, which break down the structure of an attack into distinct phases. The model helps cybersecurity professionals understand and defend against attacks by identifying and preventing each step in the process.

Here’s a breakdown of the typical phases in a cyber kill chain:

- **Reconnaissance**: During this initial phase, the attacker gathers information on potential targets to find vulnerabilities. This can include collecting publicly available information, scanning for open network services, or identifying specific human targets for social engineering.

- **Weaponization**: The attacker creates a payload that exploits a vulnerability in the target system. This could involve packaging malware within a seemingly harmless file or crafting a deceptive email with malicious links or attachments.

- **Delivery**: The weaponized payload is delivered to the target. Common delivery methods include phishing emails, infected websites, or USB drives. The goal is to get the target to trigger the payload, either by opening a file, clicking a link, or connecting a compromised device to their network.

- **Exploitation**: Once the delivery is successful, the exploitation phase begins. Here, the malware or malicious code executes on the target system, exploiting a vulnerability to perform unauthorized actions. This could be as simple as executing a script to more complex behaviors like escalating privileges or bypassing security controls.

- **Installation**: After exploiting a system, the attacker installs additional tools or malware to maintain control over the system. This may include rootkits, backdoors, or other malicious software that allows persistent access to the compromised environment.

- **Command and Control (C2)**: In this stage, the compromised system establishes communication with an external server controlled by the attacker. This server can issue commands to the malware and receive stolen data. The communication may be designed to be difficult to detect and can use various channels, including encrypted transmissions.

- **Actions on Objectives**: This is the final stage where the attacker achieves their primary goal. Depending on the attacker’s intent, this could involve data theft, data encryption for ransom, creating a disruption (like a DDoS attack), or using the compromised system as a launchpad for attacks on other targets.

## How you can detect fingerprints of kill chain in SOC

## 1. Reconnaissance

**Where to Look**:

- **Log Activity Dashboard**: Focus on logs from firewalls, IDS/IPS, and other perimeter devices. Look for high volumes of failed login attempts, port scans, and IP sweeps.

- **Network Activity**: Review flow records for abnormal traffic patterns that might indicate scanning activities.

**Analysis Tips**:

- Use QRadar’s filter capabilities to isolate traffic from suspicious IP addresses.

- Examine geographical location data for IP addresses to identify potential foreign probes.

## 2. Weaponization and Delivery

**Where to Look**:

- **Offenses Dashboard**: Monitor for offenses that relate to malware delivery mechanisms, such as phishing emails or malicious downloads.

- **Data from Email Security Tools**: Check for alerts on emails with malicious attachments or links, especially those blocked or quarantined.

**Analysis Tips**:

- Correlate date and time of email offenses with spikes in malware detection across the network.

- Review attachment types and sender reputation scores provided by email security integrations.

## 3. Exploitation

**Where to Look**:

- **Offenses Dashboard**: Look for active offenses that involve exploitation tactics. This could include alerts from IDS/IPS about known vulnerabilities being targeted.

- **Vulnerability Management**: Check for reports of successful exploit attempts that coincide with known vulnerabilities.

**Analysis Tips**:

- Focus on the asset profile to see if affected systems lacked recent patches.

- Use QRadar’s AQL to query logs for entries related to specific exploit signatures.

## 4. Installation

**Where to Look**:

- **Endpoint Security Integrations**: Monitor logs from EDR tools for evidence of unusual files, registry changes, or suspicious persistence mechanisms.

- **Log Activity Dashboard**: Search for system-level events indicating installation activities.

**Analysis Tips**:

- Analyze the timelines of detected events to identify the progression from exploitation to installation.

- Cross-reference file hashes with threat intelligence databases directly from the QRadar interface.

## 5. Command and Control (C2)

**Where to Look**:

- **Network Activity**: Check for consistent traffic to known bad domains or unusual outbound connections.

- **Flow Data**: Utilize flow data to spot irregularities in protocol usage or destination ports that might suggest C2 activities.

**Analysis Tips**:

- Set up QRadar to generate geographic maps of network connections to visualize potential C2 communication with servers in high-risk countries.

- Regularly update QRadar’s threat intelligence feeds to automatically flag known malicious IP addresses and domains.

## 6. Actions on Objectives

**Where to Look**:

- **Log Activity Dashboard**: Observe logs indicating unauthorized access to sensitive data or unusual data exfiltration attempts.

- **Data Loss Prevention (DLP) Alerts**: Monitor DLP alerts for any unauthorized attempts to access or transfer sensitive information.

**Analysis Tips**:

- Configure QRadar rules to escalate and notify analysts of repeated unauthorized access attempts.

- Review user behavior analytics (UBA) for anomalies in user actions, such as accessing large volumes of data at odd hours.
