---
title: "Threat Hunting with the Pyramid of Pain"
description: "A practical guide to using threat indicators that actually hurt your attackers, based on David J. Bianco\u2019s model. Why detecting TTPs is\u2026"
image: "https://cdn-images-1.medium.com/max/800/0*4MGxnmKxvKTWSyem.png"
---

# Threat Hunting with the Pyramid of Pain


<img src="https://cdn-images-1.medium.com/max/800/0*4MGxnmKxvKTWSyem.png" alt="Cover image" width="720" height="405" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/threat-hunting-with-the-pyramid-of-pain-8add3cedb380](https://medium.com/@1200km/threat-hunting-with-the-pyramid-of-pain-8add3cedb380)
- **Published:** 2025-07-09
- **Preserved media:** 1 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 0 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### A practical guide to using threat indicators that actually hurt your attackers, based on David J. Bianco’s model. Why detecting TTPs is more powerful than blocking IPs — and how to use that to your advantage

Every security team knows that blocking malicious IPs or blacklisting hashes is only part of the battle. But what if you could force your adversaries back to the drawing board, slow them down, or even break their momentum entirely? Enter the**Pyramid of Pain**, a framework created by David J. Bianco that ranks common indicators of compromise (IOCs) by how much they “hurt” an attacker when you deny their use. By shifting our focus up the pyramid, we can inflict the maximum operational cost on threat actors — and make our defenses truly effective.

### What Is the Pyramid of Pain?

Originally published in 2013 (with a 2014 update adding hashes), the Pyramid of Pain illustrates seven levels of indicators:[HERE](https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html)

- **Wider**(green) levels at the bottom are**easier**for attackers to change.

- **Narrower**(red) levels at the top are**harder**and thus inflict far more “pain” when you detect and block them.

## The Seven Levels Explained

- **Hash Values**

- *What they are:*Exact file fingerprints (MD5, SHA1).

- *Why they hurt least:*A single bit flip turns one hash into a completely new one. Tracking hundreds of unique hashes quickly becomes a losing game.

**2. IP Addresses**

- *What they are:*Source or destination network addresses.

- *Why they’re easy:*Threat actors can pivot through VPNs, proxies, or cloud instances in seconds — making IP-based blocks trivial to bypass.

**3. Domain Names**

- *What they are:*URLs or DNS records used for command-and-control (C2), phishing, or payload hosting.

- *Why they cost more:*Registering a new domain takes time and (sometimes) money, and DNS propagation can introduce delays, but free DNS services and compromised registrars can blunt this pain.

**4. Network Artifacts**

- *What they are:*Signatures in network traffic — unusual User-Agent strings, URI patterns, custom protocol markers.

- *Why they matter:*Modifying these requires attackers to tweak or recompile their networking code, slowing them down and exposing them to further detection.

**5. Host Artifacts**

- *What they are:*Traces on endpoints — registry keys, dropped DLLs, service names, WMI artifacts.

- *Why they hurt:*Attackers must change how their malware installs, communicates, or persists, which often means a full rebuild of payloads and implantation routines.

**6. Tools**

- *What they are:*The actual software utilities (scanners, backdoors, credential dumpers) adversaries bring or develop.

- *Why they’re painful:*A well-tuned YARA rule or behavioral engine can force adversaries to discard or significantly retool their entire toolset — an expensive, time-consuming endeavor.

**7. Tactics, Techniques & Procedures (TTPs)**

- *What they are:*The overarching methods and workflows — phishing delivery vectors, lateral-movement approaches, credential-theft techniques.

- *Why they’re king:*Disrupting TTPs goes straight to attackers’ playbooks. They must learn new methodologies rather than tweak code, potentially reinventing their entire operation.

### Why Target Higher Levels?

- **Maximized Return:**One piece of TTP-based detection (e.g., spotting Pass-the-Hash behavior in Windows logs) costs attackers hours or days to overcome — versus minutes for IP blocks.

- **Broader Coverage:**TTP detections are tool-agnostic. They catch new variants without requiring rule updates for every new binary or domain.

- **Sustainable Defense:**Focusing on higher-level indicators builds resilience against future campaigns, not just the current ones.

### Putting the Pyramid into Practice

- **Audit Your Indicators:**Map existing IOCs to the pyramid. Are you heavy on hashes and IPs? Time to level up.

- **Enrich Your Telemetry:**Ensure your SIEM or EDR collects host and network artifacts with enough context (process names, command lines, registry changes).

- **Build Behavior Rules:**Create analytics that look for anomalous sequences — e.g., “New admin service created immediately after a PowerShell download.”

- **Integrate Threat Intel:**When new reports arrive (APT1, SolarWinds, etc.), ask: “Which indicators fall high on the pyramid?” Prioritize those in your detection roadmap.

- **Continuously Refine:**Review detections quarterly. As attackers adapt, your pyramid should evolve — shifting emphasis up, not down.

## Conclusion

The Pyramid of Pain is more than a conceptual model — it’s a**strategic playbook**. By climbing from hashes and IPs to TTPs, you not only detect adversaries more effectively but also**inflict real operational costs**on them, disrupting their campaigns long before they strike.

Ready to take your threat hunting to the next level? Start by evaluating your current detections against the pyramid today — and watch your defenders become attackers’ worst nightmare.
