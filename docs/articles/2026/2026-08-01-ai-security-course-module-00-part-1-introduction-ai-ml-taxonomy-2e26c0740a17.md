---
title: "AI Security Course, Module 00 \u2014 Part 1: Introduction, AI/ML Taxonomy"
description: "AI security conversations often begin with prompt injection, jailbreaks, or a new red-team tool. That is understandable, but it creates a dangerous starting point"
image: "https://cdn-images-1.medium.com/max/1024/1*iXjLTeK5gtBdXKgVpUFBMw.png"
---

# AI Security Course, Module 00 — Part 1: Introduction, AI/ML Taxonomy


<img src="https://cdn-images-1.medium.com/max/1024/1*iXjLTeK5gtBdXKgVpUFBMw.png" alt="Cover image" width="1024" height="682" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** AI Security
- **Source article:** [https://infosecwriteups.com/ai-security-course-module-00-part-1-introduction-ai-ml-taxonomy-and-data-foundations-2e26c0740a17](https://infosecwriteups.com/ai-security-course-module-00-part-1-introduction-ai-ml-taxonomy-and-data-foundations-2e26c0740a17)
- **Published:** 2026-08-01
- **Preserved media:** 9 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 1 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium RSS article into the 1200km.com Docusaurus ecosystem. The article flow, images, screenshots, infographics, and technical blocks are preserved from the Medium feed.

### Before you secure an AI system, learn what the system is

AI security conversations often begin with prompt injection, jailbreaks, or a new red-team tool. That is understandable, but it creates a dangerous starting point.

An AI system is not just a model.

It is a chain of data pipelines, model artifacts, prompts, retrieval systems, applications, identities, tools, memory, infrastructure, operators, and downstream actions. The model may generate text or choose an action, but it does not automatically provide authorization, tenant isolation, provenance, auditability, or safe execution.

That is why the first module of the AI Security Engineering course is not an attack lab. It is a technical foundation module for security practitioners who need to reason accurately about the complete system.

This article introduces Module 00:**AI, Machine Learning, and LLM Foundations**.

&gt; Course status: Under construction. The syllabus may change during creation. The scope, examples, references, labs, and assessment criteria may change before pilot delivery.

## Table of contents

**The purpose of Module 00**

**Audience, prerequisites, and skip paths**

1. **AI, machine learning, deep learning, and generative AI**
2. **Artificial intelligence: the broadest category****|**
3. **Consider a rules-based transaction screening system**
4. **Machine learning: behavior learned from data or experience**
5. **Deep learning: multilayer representation learning**
6. **Generative AI: producing new content**
7. **Foundation models: broadly reusable starting point****s**
8. **Large language models: token prediction at scale**
9. **Real-life examples: the label changes the security question**
10. **Security cases that make the distinction concrete**

## The purpose of Module 00

Module 00 creates a shared technical language for the rest of the course. It is not intended to turn security engineers into research scientists, and it does not assume advanced mathematics. It teaches the mechanisms that affect security decisions:

- how learning systems use data;
- how models are trained, adapted, evaluated, and served;
- how LLMs turn tokens into generated output;
- how RAG moves external data into model context;
- how agents connect model output to tools and authority;
- how deployment and observability determine the blast radius;
- how terminology affects threat modeling and incident reporting.

The objective is practical precision. A learner should be able to look at an AI architecture and answer:

1. What are the assets?
2. Which component has authority?
3. Which data crosses a trust boundary?
4. Which artifacts and configurations can change behavior?
5. What evidence would reconstruct a security-relevant action?

## Audience, prerequisites, and skip paths

Module 00 is for security practitioners, AI platform engineers, MLOps engineers, threat-intelligence analysts, detection engineers, and technical risk owners who need a common operating vocabulary. Learners should be comfortable with basic security concepts such as identity, access control, logging, network boundaries, software dependencies, and incident evidence.

No advanced calculus, GPU programming, or model pretraining experience is required. Learners who already understand neural-network training may skim the optimization explanation, but should still complete the artifact, RAG, agent-authority, and observability traces. Learners who already operate LLM applications may skim the introductory definitions, but should not skip the security boundaries around retrieval, tool execution, caching, identity, and evidence.

The sequence is intentionally flexible. The course has no fixed time budget in this revision; instructors can deepen a topic, assign the glossary as reference, or use the skip paths without changing the learning contract. Every learner should still be able to explain the complete request path and produce the required artifacts.

## 1. AI, machine learning, deep learning, and generative AI are not synonyms

The first source of confusion is vocabulary. These terms describe overlapping scopes, not interchangeable products. The hierarchy below is useful as a map, but it is not a strict pipeline: some AI systems use no machine learning, some foundation models are not language models, and some generative systems are specialized rather than broadly reusable.

<img src="https://cdn-images-1.medium.com/max/1024/1*sV8zR3UoMgl9fzILFKAqNA.png" alt="Article image" width="1024" height="768" loading="lazy" decoding="async" />

## Artificial intelligence: the broadest category

**Artificial intelligence (AI)**is the broad field of machine-based systems that produce predictions, recommendations, decisions, or content for human-defined objectives. AI includes symbolic rules, search, planning, optimization, robotics, expert systems, statistical models, and neural networks.

## Consider a rules-based transaction screening system:

```text
if amount > approved_limit
and destination_country is restricted
and account_age < policy_threshold:
    require manual review
```

This is an AI-related decision system even though it does not learn parameters from data. Its security risks are still real: an attacker may manipulate input fields, bypass the policy path, abuse the review workflow, or compromise the service account. Calling it “not AI” would not make those risks disappear.

At the other end of the spectrum,[DeepMind’s AlphaGo](https://deepmind.google/research/alphago/)combined deep neural networks, search, and reinforcement learning to select moves. It is a useful reminder that an AI system may contain several techniques at once. The model is only one part of the decision loop; the search procedure, state, interfaces, and execution environment also matter.

**Symbolic rules**are explicit, human-authored logic: conditions, facts, policies, and actions written in a form a program can evaluate. A firewall rule, an allowlist, or “require review when a payment exceeds its limit” is symbolic behavior. It is usually easier to inspect and reproduce than learned behavior, but it can be brittle, incomplete, and vulnerable to input manipulation or rule-order mistakes. In a security investigation, preserve the rule version, evaluation order, input fields, and decision path; there are no learned weights to inspect, but the policy implementation is still a security-critical artifact.

## Machine learning: behavior learned from data or experience

**Machine learning (ML)**uses data or interaction to learn a relationship, representation, policy, or decision instead of expressing all behavior as hand-written rules. Typical tasks include classification, regression, ranking, clustering, anomaly detection, and control.

<img src="https://cdn-images-1.medium.com/max/1024/1*vD-pOcRd7nTjx_iwHKvFvQ.png" alt="Article image" width="1024" height="683" loading="lazy" decoding="async" />

**Real-world examples include:**

- an email system classifying messages as spam or not spam;
- a payment system estimating fraud risk;
- a search engine ranking results;
- a security platform grouping infrastructure by behavioral similarity;
- a forecasting model estimating demand or incident volume.

Google’s[classification guide](https://developers.google.com/machine-learning/crash-course/classification/)is a useful reference for the basic vocabulary of labels, predictions, thresholds, false positives, and false negatives.

The security boundary is the data and decision workflow around the model. A phishing classifier can be accurate and still be unsafe if an attacker poisons its training data, manipulates features, extracts sensitive examples, or causes an operator to treat a probability score as an authorization decision. The score is evidence for a policy; it is not the policy itself.

## Deep learning: multilayer representation learning

**Deep learning**is ML based on neural networks with multiple layers that learn representations and functions. A deep model can identify patterns in images, audio, text, code, sensor data, or multimodal inputs.

<img src="https://cdn-images-1.medium.com/max/1024/1*Y0TprTfQNrNlFkR6Z1UiZw.png" alt="Article image" width="1024" height="576" loading="lazy" decoding="async" />

The model may learn features that were not explicitly designed by an engineer. That is powerful, but it makes reasoning about provenance and failure more important. Security questions include:

- Which data created the representation?
- Which examples were overrepresented or mislabeled?
- What happens under distribution shift?
- Can an attacker craft an input that changes the prediction?
- Can a model artifact or dependency execute code before inference?
- What evidence shows which checkpoint and configuration produced the output?

The[AlexNet paper](https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html)is a landmark example of deep convolutional learning for image classification. The Transformer architecture later introduced attention-based processing that became central to modern language and multimodal models. These are technical milestones; the security properties still depend on data, deployment, identity, and controls.

## Generative AI: producing new content

**Generative AI**produces new text, code, images, audio, video, or structured content. Generation may use autoregressive Transformers, diffusion models, generative adversarial networks, flow-based models, or other architectures.

Examples include:

- an LLM drafting a report or generating code;
- an image model creating a synthetic image from a text prompt;
- a speech model generating audio;
- a coding assistant proposing a patch;
- an agent generating a structured API call.

The output is not automatically an answer, a fact, or an authorized action. It is a model-produced artifact that must be validated in the context where it will be used. An output rendered as HTML has a different risk than an output shown as plain text. An output passed to a ticketing API has a different risk than an output read by an analyst.

OpenAI’s[GPT-4 research report](https://openai.com/index/gpt-4-research/)illustrates this distinction well: it describes a large multimodal model, its evaluations, limitations, and deployment considerations. Evaluation results describe measured behavior under defined conditions; they do not replace application authorization, identity controls, or production monitoring.

For image generation, the[DDPM paper](https://arxiv.org/abs/2006.11239)is a primary reference for diffusion-model foundations. The security lesson is not that every generative model has the same vulnerability. It is that each generated output becomes part of a downstream data and decision path.

## Foundation models: broadly reusable starting points

A**foundation model**is trained on broad data and designed to support multiple downstream tasks or applications through prompting, adaptation, fine-tuning, retrieval, or additional system components. The concept is explained by Stanford’s[What are Foundation Models?](https://hai.stanford.edu/ai-definitions/what-are-foundation-models)and the[Bommasani et al. foundation-model report](https://arxiv.org/abs/2108.07258).

Foundation models create a concentration of dependency and supply-chain risk. One base model may be:

- fine-tuned by many teams;
- wrapped by many applications;
- downloaded from a public registry;
- combined with different adapters and tokenizers;
- connected to different retrieval systems and tools;
- deployed under identities with very different authority.

The same checkpoint can therefore be low-risk in an isolated research notebook and high-risk inside an agent with access to private documents, cloud APIs, or production systems. “The model is safe” is incomplete unless the model version, wrapper, data, identity, tools, and deployment are specified.

## Large language models: token prediction at scale

An**LLM**is a large language model, usually based on a Transformer architecture, that predicts a probability distribution over tokens and generates sequences by repeatedly selecting the next token. It may support summarization, translation, classification, code generation, question answering, reasoning-like workflows, or tool selection.

The original[Attention Is All You Need](https://arxiv.org/abs/1706.03762)paper introduced the Transformer architecture that underlies many current language systems. The GPT-4 research report linked above is a historical example of how a provider describes capabilities, evaluation, limitations, and system-level safety work; the course uses capability-based language so the lessons remain applicable to current model generations.

An LLM does not inherently provide:

- current or complete knowledge;
- truth verification;
- tenant authorization;
- secret management;
- stable identity;
- transactional integrity;
- safe tool execution;
- deterministic policy enforcement.

Those properties come from the application and operating environment.

## Real-life examples: the label changes the security question

<img src="https://cdn-images-1.medium.com/max/1024/1*UKRLS4viMDl-et03Af8bgQ.png" alt="Article image" width="1024" height="384" loading="lazy" decoding="async" />

## Security cases that make the distinction concrete

The course uses real reports to connect terminology to operational risk:

### ShadowRay:

<img src="https://cdn-images-1.medium.com/max/1024/1*bhUv7CF0ODgqgJ2-D_7ywA.png" alt="Article image" width="1024" height="576" loading="lazy" decoding="async" />

Oligo reported active exploitation of exposed Ray AI infrastructure. The initial technique was conventional control-plane abuse, but the compromised environment contained AI workloads, models, datasets, credentials, and expensive compute. Read the[ShadowRay report](https://www.oligo.security/blog/shadowray-attack-ai-workloads-actively-exploited-in-the-wild). The lesson is that AI security includes the platform around the model.

### Malicious model artifacts:

<img src="https://cdn-images-1.medium.com/max/1024/1*eAf4D1Q_YcTOB6giBzCuug.png" alt="Article image" width="1024" height="576" loading="lazy" decoding="async" />

JFrog documented public ML artifacts whose loading could execute embedded code. Read[JFrog’s model-supply-chain research](https://jfrog.com/blog/data-scientists-targeted-by-malicious-hugging-face-ml-models-with-silent-backdoor/). The lesson is that a model file may be an executable supply-chain input, not inert data.

### EchoLeak:

<img src="https://cdn-images-1.medium.com/max/1024/1*pH8s1BrzR1fSO9V0BD-pJQ.png" alt="Article image" width="1024" height="576" loading="lazy" decoding="async" />

Microsoft’s advisory for[CVE-2025–32711](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-32711)documents a production vulnerability involving an enterprise AI assistant. The course treats it as a disclosed vulnerability and reproduced chain, not automatically as a criminal campaign. The lesson is that retrieved content, instructions, rendering, and outbound paths can combine into impact.

### MCP tool poisoning:

<img src="https://cdn-images-1.medium.com/max/1024/1*kn1JsufOudr0LodwFzi4Sw.png" alt="Article image" width="1024" height="576" loading="lazy" decoding="async" />

Invariant Labs demonstrated[tool-poisoning attacks](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)in which tool metadata could influence an agent’s planning context. The lesson is that tool definitions, approval state, delegated identity, and application authorization are security boundaries.

These cases all involve AI, but they are not the same type of evidence or the same type of system. Treating them as one category produces bad prioritization.

## A practical test for terminology

When a report says “AI attack,” ask six questions before accepting the phrase:

1. Is the target a model, a data pipeline, an application, an agent, an identity, or infrastructure?
2. Is AI the target, the delivery mechanism, the enabling tool, or simply part of the environment?
3. Did the report establish feasibility, exposure, provider-observed activity, exploitation, or harm?
4. Which model, artifact, prompt, retrieval set, tool definition, identity, and runtime were involved?
5. What state or authority changed after the model produced its output?
6. Which deterministic control could have prevented, constrained, detected, or preserved the action?

If the report cannot answer these questions, it may still be useful as a lead, but it is not yet a complete threat model.

## References for this section

- [NIST AI 100–3: The Language of Trustworthy AI](https://doi.org/10.6028/NIST.AI.100-3)
- [Google Machine Learning Crash Course: Classification](https://developers.google.com/machine-learning/crash-course/classification/)
- [DeepMind: AlphaGo](https://deepmind.google/research/alphago/)
- [Krizhevsky, Sutskever, and Hinton: ImageNet Classification with Deep Convolutional Neural Networks](https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html)
- [Bommasani et al.: On the Opportunities and Risks of Foundation Models](https://arxiv.org/abs/2108.07258)
- [Oligo: ShadowRay](https://www.oligo.security/blog/shadowray-attack-ai-workloads-actively-exploited-in-the-wild)
- [JFrog: Malicious Hugging Face ML Models](https://jfrog.com/blog/data-scientists-targeted-by-malicious-hugging-face-ml-models-with-silent-backdoor/)
- [Microsoft MSRC: CVE-2025–32711](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-32711)
- [Invariant Labs: MCP Tool Poisoning Attacks](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)

## What comes next

The next article covers neural networks, optimization, and adversarial machine learning. Later parts will trace tokens and Transformer context assembly, the LLM lifecycle, RAG authorization, agent and tool authority, and serving observability.

*AI Security Engineering Course — under construction. New chapters will be published as they are developed.*

[1200km.com](https://1200km.com)·[Main course article on Medium](https://medium.com/@1200km/im-building-an-ai-security-engineering-course-55e29e6c035e)

## Follow My Work

I publish practical cybersecurity research, CTI workflows, detection engineering notes, malware analysis projects, OpenCTI work, cloud and Kubernetes security research, AI-assisted security tooling, labs, and technical guides.
