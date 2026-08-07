---
title: "AdversaryGraph"
description: "AdversaryGraph is a self-hosted security intelligence workbench for teams that need to move from threat reports and observables to reviewed detection work. It helps analysts connect IOCs, ATT&CK techniques, malware fi…"
image: "https://cdn-images-1.medium.com/max/1024/1*ML9xzyAJOr2u6l1Dy4RpdA.png"
---

# AdversaryGraph


<img src="https://cdn-images-1.medium.com/max/1024/1*ML9xzyAJOr2u6l1Dy4RpdA.png" alt="Cover image" width="1024" height="576" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/adversarygraph-40df3439b90c](https://medium.com/@1200km/adversarygraph-40df3439b90c)
- **Published:** 2026-07-23
- **Preserved media:** 6 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 0 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium RSS article into the 1200km.com Docusaurus ecosystem. The article flow, images, screenshots, infographics, and technical blocks are preserved from the Medium feed.

### From Security Research Project To CTI-to-Detection Product

AdversaryGraph is a self-hosted security intelligence workbench for teams that need to move from threat reports and observables to reviewed detection work. It helps analysts connect IOCs, ATT&CK techniques, malware findings, actor context, attack simulation, rule validation, and reporting in one workflow.

The platform is built for practical security operations: CTI analysts, SOC teams, detection engineers, threat hunters, and security researchers who need evidence-backed outputs instead of disconnected notes and dashboards.

## There is a recurring problem inside security teams.

<img src="https://cdn-images-1.medium.com/max/1024/1*wQ9kKSGnVT_yA-66vLFWiw.png" alt="Article image" width="1024" height="1280" loading="lazy" decoding="async" />

The team has reports. The team has IOCs. The team has ATT&CK knowledge. The team has SIEM rules, EDR telemetry, malware notes, vulnerability context, actor profiles, and incident evidence. The team may also have AI tools.

**But the workflow between those things is still fragile.**

A CTI analyst reads a report and extracts observables. A detection engineer tries to convert behavior into coverage. A SOC analyst needs triage context. A security leader asks what is actually covered. A researcher wants to connect malware behavior to infrastructure and techniques. Somewhere in the middle, the work becomes spreadsheets, screenshots, one-off scripts, manual notes, and disconnected dashboards.

**AdversaryGraph is my attempt to build the missing workbench.**

It is a self-hosted CTI-to-detection platform for turning reports, logs, IOCs, malware findings, asset inventories, and ATT&CK knowledge into mapped techniques, investigation context, detection gaps, validation scenarios, and report-ready outputs.

**The product idea is simple:**

&gt; Security intelligence should not stop at “we collected indicators.”

&gt; It should become operational work.

## The Problem I Want To Solve

&gt; Most security teams do not suffer from a lack of data.

&gt; They suffer from disconnected work.

Threat intelligence is often stored in one place. IOC enrichment happens in another. ATT&CK mapping lives in a spreadsheet or Navigator layer. Malware findings stay in a reverse-engineering note. Detection engineering uses separate repositories. SIEM validation is another process. Reports are written manually after all of this.

**That creates several practical failures:**

<img src="https://cdn-images-1.medium.com/max/1024/1*XtHJ_LaywigO5ppn4ezwAw.png" alt="Article image" width="1024" height="1280" loading="lazy" decoding="async" />

- intelligence does not reliably become detection work;
- observables are enriched but not connected to behavior;
- ATT&CK mapping is created but not tied to evidence;
- detection gaps are known but not prioritized;
- AI output is accepted too easily or rejected completely;
- analysts repeat the same mechanical steps every week;
- leadership sees activity, but not enough traceable evidence.

**AdversaryGraph is built around the opposite workflow.**

Start with evidence. Extract entities. Enrich observables. Map behavior. Review assumptions. Compare against actors and campaigns. Identify gaps. Validate detections. Export something useful.

## What AdversaryGraph Is

AdversaryGraph is a self-hosted analyst workbench.

**It connects several workflows that are usually split across separate tools:**

<img src="https://cdn-images-1.medium.com/max/1024/1*TC8YVMbtvvyvhSdP-TR3RQ.png" alt="Article image" width="1024" height="683" loading="lazy" decoding="async" />

- CTI report analysis;
- IOC enrichment and investigation;
- ATT&CK and ATLAS mapping;
- actor, sector, campaign, and TTP context;
- malware analysis workflows;
- relationship graph review;
- attack simulation and SIEM validation evidence;
- investigation workspaces;
- report generation and export.

The current stable release is AdversaryGraph v6.0.0. The v6 release is important because it moves the project closer to product readiness: repeatable release checks, self-test behavior, documentation, case studies, validation evidence, Docker-based deployment, and clearer operator boundaries.

There is also active post-v6 development around governed Threat Hunting, query libraries, unified RAG, MCP integration, and stronger AI-assisted workflows. Those capabilities are current development unless they are released in a later stable version.

That distinction matters. If this becomes a startup, trust will matter more than hype.

## The Product Principle: AI Assists, Analysts Decide

I do not want AdversaryGraph to be another black-box AI tool that confidently invents security conclusions.

**The product direction is governed AI.**

<img src="https://cdn-images-1.medium.com/max/1024/1*DNi_29Yj-AYZW9TnUuptxA.png" alt="Article image" width="1024" height="683" loading="lazy" decoding="async" />

AI can help extract IOCs. AI can summarize reports. AI can suggest ATT&CK mappings. AI can help draft hunting hypotheses. AI can propose query structures. AI can explain assumptions. AI can help compare evidence.

**But AI output is not evidence.**

The analyst must review mappings, citations, assumptions, query syntax, telemetry requirements, and scope before accepting the result.

**That principle is visible throughout the platform direction:**

- AI suggestions are treated as leads;
- human review is required;
- provider configuration is explicit;
- local and private OpenAI-compatible endpoints are supported;
- sensitive workflows can remain self-hosted;
- generated outputs should preserve assumptions and review notes.

For security teams, this is not a philosophical detail. It is a product requirement.

## The Workflow

**A practical AdversaryGraph workflow looks like this:**

<img src="https://cdn-images-1.medium.com/max/1024/1*epIzRt0e6jkfDa6pyUn_kg.png" alt="Article image" width="1024" height="768" loading="lazy" decoding="async" />

1. An analyst uploads or pastes a report, log sample, IOC list, malware note, or asset inventory.
2. The platform extracts candidate observables, entities, behaviors, and ATT&CK techniques.
3. Observables are enriched through configured sources.
4. The analyst reviews relationships, actor leads, technique leads, and evidence conflicts.
5. Reviewed items are added into an investigation workspace.
6. TTPs can be sent to a Navigator-style view or coverage workflow.
7. Detection gaps and validation paths are identified.
8. The final output becomes a report, ATT&CK layer, IOC list, detection backlog material, or handoff package.

This is the product center: not storing intelligence, but operationalizing it.

## Attack Simulation For Rule Validation

One of the most important product directions is using attack simulation to validate detection rules.

Many teams write Sigma rules, SIEM detections, EDR logic, correlation searches, and hunting queries without enough repeatable evidence that the rule matches the behavior it claims to detect.

**The result is familiar:**

- rules exist, but nobody knows whether the right telemetry is present;
- ATT&CK mappings are attached, but the mapping may be too broad;
- test events are synthetic, but not connected to a realistic attack chain;
- detections fire in a lab, but the assumptions are not documented;
- false positives are discovered later in production;
- leadership sees rule counts instead of validated coverage.

**AdversaryGraph should treat rule validation as part of the CTI-to-detection workflow.**

The platform can take a reviewed technique, actor behavior, IOC context, or investigation finding and help build a validation scenario around it:

1. Select the ATT&CK technique or behavior to validate.
2. Generate or review an attack simulation scenario.
3. Define required telemetry sources, such as process creation, command line, DNS, proxy, EDR, PowerShell, authentication, or cloud logs.
4. Map the expected events to the detection logic.
5. Run the scenario in an approved lab or controlled environment.
6. Forward or compare events against SIEM or detection tooling.
7. Record whether the rule fired, partially fired, or missed.
8. Save the evidence, assumptions, gaps, and next actions.

This matters because detection engineering should not stop at writing rules.

**A useful detection needs a validation trail:**

- what behavior was simulated;
- which telemetry was required;
- which event fields were expected;
- which rule or query was tested;
- what fired and what did not;
- what false-positive conditions were identified;
- what gap remains.

For a startup, this is a strong wedge. It connects CTI, ATT&CK mapping, attack simulation, SIEM validation, and detection backlog management into one product story.

## Why Self-Hosted Matters

### Security data is sensitive.

Reports can contain customer names, internal infrastructure, private IOCs, incident context, endpoint telemetry, malware samples, and business-specific risk information.

That is why AdversaryGraph is self-hosted first.

**Self-hosting gives teams more control over:**

- where data is stored;
- which AI providers are enabled;
- whether local/private model gateways are used;
- which feeds and enrichment sources are connected;
- how investigations and outputs are retained;
- what can be shared externally.

For many products, self-hosted is a deployment choice.

For this product category, it can be the reason a team is willing to test it.

## Who It Is For

The first real users are not “everyone in cybersecurity.”

The best initial users are teams with a specific CTI-to-detection pain:

- CTI teams that need to turn reports into operational outputs;
- detection engineering teams that need ATT&CK-linked coverage and validation;
- SOC teams that need better triage context and investigation handoff;
- MSSPs that need repeatable customer-facing reporting workflows;
- security research teams that want local intelligence and enrichment workflows;
- enterprises that cannot send sensitive telemetry into generic hosted AI tools.

The strongest beachhead is CTI-to-detection for enterprise security teams.

That is where the pain is visible: too many reports, too many indicators, too much manual mapping, and not enough evidence-backed detection output.

## What Makes It Different

AdversaryGraph is not trying to replace every security tool.

It is not a SIEM replacement. It is not a full CTI platform replacement. It is not only an ATT&CK Navigator. It is not only an AI chatbot.

The value is the connected workflow around those systems.

AdversaryGraph should sit between CTI, enrichment, ATT&CK mapping, malware analysis, detection engineering, and reporting.

The differentiator is the bridge:

- from intelligence to investigation;
- from investigation to TTP mapping;
- from TTP mapping to detection gaps;
- from detection gaps to validation evidence;
- from validation evidence to report-ready output.

**That bridge is where analysts lose time today.**

## Get Started

- Main product page:

<a href="https://1200km.com/adversarygraph" target="_self">AdversaryGraph - CTI-to-Detection Platform</a>

- Documentation:

<a href="https://1200km.com/adversarygraph-docs/" target="_self">AdversaryGraph - Self-Hosted CTI-to-Detection Workbench | 1200km</a>

- GitHub repository:

[GitHub - anpa1200/adversarygraph: Self-hosted AI-assisted CTI-to-detection workbench for ATT&CK mapping, IOC/CVE intelligence, Threat Radar, malware triage, Attack Simulation, and SIEM validation.](https://github.com/anpa1200/adversarygraph)

- Stable v6.0.0 release:

[Release AdversaryGraph v6.0.0 · anpa1200/adversarygraph](https://github.com/anpa1200/adversarygraph/releases/tag/v6.0.0)

- Case studies and validation:

<a href="https://1200km.com/adversarygraph-docs/case-studies-validation/" target="_self">Case Studies And Validation Examples</a>

<a href="https://1200km.com" target="_self">Andrey Pautov - CTI & Detection Engineering</a>
