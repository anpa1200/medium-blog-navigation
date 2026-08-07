---
title: "I\u2019m Building an AI Security Engineering Course"
description: "AI security has moved beyond a narrow conversation about prompt injection"
image: "https://cdn-images-1.medium.com/max/1024/1*0V1atQwOKtY2BXdKheNDCA.jpeg"
---

# I’m Building an AI Security Engineering Course


<img src="https://cdn-images-1.medium.com/max/1024/1*0V1atQwOKtY2BXdKheNDCA.jpeg" alt="Cover image" width="1024" height="687" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/im-building-an-ai-security-engineering-course-55e29e6c035e](https://medium.com/@1200km/im-building-an-ai-security-engineering-course-55e29e6c035e)
- **Published:** 2026-07-31
- **Preserved media:** 2 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 0 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium RSS article into the 1200km.com Docusaurus ecosystem. The article flow, images, screenshots, infographics, and technical blocks are preserved from the Medium feed.

### A practical, evidence-grounded path from AI fundamentals to secure agentic systems

AI security has moved beyond a narrow conversation about prompt injection.

Modern AI systems combine models with data pipelines, retrieval, applications, identities, tools, agents, memory, cloud infrastructure, and human decisions. A weakness in any one of those components can expose sensitive information, amplify authority, execute code, alter business state, or make an investigation impossible.

I am building a new course to help security practitioners understand and secure that complete system.

The course is called**AI Security Engineering: From Models to Agentic Systems**.

&gt; Course status: This course is under construction. The syllabus may change during creation. Modules, examples, exercises, references, assessment criteria, and publication dates may change before the pilot release.

## Ready lessons:

**AI Security Course, Module 00 — Part 1: Introduction, AI/ML Taxonomy**

[AI Security Course, Module 00 — Part 1: Introduction, AI/ML Taxonomy](https://medium.com/@1200km/ai-security-course-module-00-part-1-introduction-ai-ml-taxonomy-and-data-foundations-2e26c0740a17)

**AI Security Course, Module 00 — Part 2: How Learning Systems Use Data**

[AI Security Course, Module 00 — Chapter 2](https://medium.com/@1200km/ai-security-course-module-00-chapter-2-69381c74a59c)

## Why I am building this course

Many AI-security learning resources are strong in one area:

- LLM application testing;
- prompt injection and jailbreaks;
- adversarial machine learning;
- AI red teaming;
- cloud-specific controls;
- governance and risk;
- secure AI development.

The challenge is connecting those areas into one practitioner workflow.

A security team does not only need to know that an attack is possible. It needs to decide:

- whether the organization is exposed;
- which identity and asset are at risk;
- whether the evidence describes an incident, vulnerability, demonstration, or forecast;
- which control should be implemented first;
- what telemetry can verify that the control works;
- how to investigate if the control fails;
- how to communicate uncertainty to leadership.

This course is designed around those decisions.

## The course is about AI security, supported by CTI

Cyber threat intelligence is the evidence spine of the course, not a competing subject.

Every major security topic is connected to real evidence:

- incident reporting;
- provider threat intelligence;
- vulnerability disclosures;
- malicious artifact research;
- adversarial machine-learning research;
- academic work;
- government and standards guidance;
- reproducible security demonstrations.

The course teaches learners to distinguish different evidence statuses instead of calling everything a “real-world AI attack.”

The language matters:

<img src="https://cdn-images-1.medium.com/max/987/1*7I1wBG3P6Sk-vuOMWRpv-Q.png" alt="Article image" width="987" height="241" loading="lazy" decoding="async" />

This evidence discipline is carried through architecture, testing, detection, incident response, and governance.

## What the course covers

The course is organized as a connected sequence of modules.

### Module 00 — AI, Machine Learning, and LLM Foundations

The foundation module establishes the technical language used throughout the course:

- AI, machine learning, deep learning, generative AI, foundation models, and LLMs;
- data, features, labels, parameters, hyperparameters, training, validation, testing, and inference;
- neural networks, optimization, generalization, and distribution shift;
- tokenization, embeddings, attention, decoding, and context;
- pre-training, fine-tuning, instruction tuning, preference optimization, adapters, quantization, and serving;
- RAG ingestion, retrieval, authorization, provenance, and citation;
- agents, tools, memory, delegated identity, and MCP;
- evaluation, quality, latency, throughput, cost, robustness, safety, and security metrics;
- deployment, MLOps, versioning, and observability.

### Module 01 — AI Security Threat Landscape

The first security module builds an attack-surface model from real cases and CTI evidence. Learners examine:

- ShadowRay and exposed AI infrastructure;
- malicious public model artifacts and unsafe loading;
- EchoLeak and indirect prompt injection in an enterprise copilot;
- MCP tool-poisoning research;
- provider reporting on adversarial use of generative AI;
- the DeepSeek exposed-database case.

The objective is not to memorize headlines. Learners reconstruct prerequisites, identities, affected assets, trust boundaries, actions, impact, evidence limits, controls, and telemetry.

The separate Module 01 article will explain this evidence-to-architecture method in more detail.

### Modules 02–04 — Architecture, data, retrieval, and supply chain

These modules examine how AI systems are assembled and where trust breaks:

- system architecture and threat modeling;
- data ingestion, parsers, embeddings, vector stores, authorization, and provenance;
- model registries, adapters, tokenizers, serialized formats, dependencies, build pipelines, and artifact admission.

### Modules 05–09 — Threat behavior and containment

The middle of the course covers:

- direct and indirect prompt injection;
- jailbreaks and unsafe output handling;
- privacy, memorization, extraction, and inference attacks;
- agents, tools, MCP, memory, and delegated authority;
- identity, authorization, tenancy, and approvals;
- adversarial ML, robustness, availability, unbounded consumption, and AI infrastructure.

Each topic continues beyond the exploit. Learners identify containment, detection, evidence preservation, and regression requirements.

### Modules 10–12 — Testing, monitoring, and response

These modules connect threat intelligence to operations:

- authorized AI red teaming and purple teaming;
- reproducible evaluation and regression tests;
- AI event schemas and flight-recorder telemetry;
- retrieval, tool, memory, identity, and egress detections;
- CTI production, incident response, and AI-native DFIR;
- evidence preservation under nondeterministic and stateful conditions.

### Modules 13–14 — Governance and secure delivery

The final modules turn technical findings into decisions:

- AI inventory and risk ownership;
- supplier and model due diligence;
- assurance evidence and residual risk;
- secure AI development and release gates;
- versioning, rollback, kill switches, incident readiness, and decommissioning;
- an end-to-end purple-team capstone.

## The course method

Every module follows the same evidence-to-engineering loop:

1. **Frame the decision.**Identify the consumer, system boundary, and intelligence requirement.
2. **Understand the mechanism.**Explain the model and the surrounding data, application, identity, and platform components.
3. **Anchor the threat.**Use a primary report, advisory, research result, or clearly labeled constructed scenario.
4. **Reconstruct the path.**Record prerequisites, entry point, identities, state changes, assets, and outcomes.
5. **Design controls.**Separate prevention, authority reduction, blast-radius containment, detection, and preservation.
6. **Define telemetry.**Specify the events and fields needed to verify control operation and investigate failure.
7. **Validate safely.**Use authorized, isolated, course-owned systems and synthetic data.
8. **Communicate uncertainty.**Separate facts, assumptions, judgments, gaps, and recommendations.

This is why the course is not a collection of disconnected prompt experiments. The same AI system is viewed from architecture, adversary, detection, response, governance, and delivery perspectives.

## What learners will produce

The course portfolio will include:

- AI system maps and threat models;
- CTI collection plans and source matrices;
- confidence-rated threat assessments;
- evidence registers and incident timelines;
- model-admission and supply-chain policies;
- retrieval-integrity and tenant-isolation tests;
- agent and MCP security reviews;
- identity and authorization matrices;
- red-team plans and regression suites;
- AI flight-recorder event schemas;
- detections and replay corpora;
- DFIR case files and executive briefings;
- governance and assurance packs;
- an end-to-end secure-release decision.

The goal is to produce work that another engineer, analyst, incident responder, or decision-maker can review and act upon.

## How the course will be published

The course will be developed publicly and incrementally.

Each new module will be published in two places:

1. on the course website, where the complete lesson, workbook, practical, instructor guide, and assessment materials will live;
2. as a separate article on my Medium blog, where I will explain the module’s ideas, evidence, practical lessons, and development decisions.

The Medium articles will not replace the full course materials. They will provide a readable entry point and document the evolution of the curriculum.

As the course develops, each article may include:

- the module’s purpose and learning objectives;
- technical explanations;
- real reports and research references;
- evidence-status caveats;
- examples of architecture and control decisions;
- practical questions for security teams;
- links to the corresponding course page.

## A note about the “under construction” status

This is an active build, not a finished commercial training product.

The field changes quickly. Models, agent protocols, security advisories, provider reports, frameworks, tooling, and regulatory expectations can change between revisions. For that reason, the course will maintain source dates, versioned terminology, lab assumptions, tool versions, known limitations, and corrections.

The under-construction disclaimer means:

- module order may change;
- examples may be corrected or replaced;
- references may be updated;
- practical exercises may be revised for safety and reproducibility;
- assessment criteria may evolve;
- publication and enrollment details are not final.

The purpose of publishing during development is to make the reasoning visible and invite useful review — not to present unfinished material as a final credential.

## What comes next

The first public foundation article covers Module 00. The next articles will follow the module sequence, beginning with the CTI-grounded threat landscape and then moving into architecture, data, retrieval, supply chain, prompt security, agents, identity, testing, detection, response, governance, and secure delivery.

If you work in security engineering, threat intelligence, application security, cloud security, SOC/IR, AI platform engineering, or governance, I hope the course provides a useful bridge between disciplines that are often taught separately.

The central question is straightforward:

&gt; What can this AI component see, decide, change, or delegate — and what evidence will prove that it did?

That question is the foundation of the course.

**Course status:**Under construction. The syllabus may change during creation. New modules and their companion Medium articles will be published incrementally.
