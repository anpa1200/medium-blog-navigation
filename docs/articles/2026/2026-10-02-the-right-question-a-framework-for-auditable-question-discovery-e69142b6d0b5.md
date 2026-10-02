---
title: "The Right Question: A Framework for Auditable Question Discovery"
description: "A framework for using AI to discover, challenge, and prioritize empirical questions that could produce new knowledge."
image: "https://1200km.com/articles/article-assets/right-question/cover.png"
---

# The Right Question: A Framework for Auditable Question Discovery

**A practical definition and selection framework for moving AI beyond plausible prompts toward bounded, adversarial, and testable empirical questions.**

<img src={require('@site/static/article-assets/right-question/cover.png').default} alt="The Right Question cosmic roadside guide, with a researcher choosing better questions over more questions." width="1672" height="941" loading="eager" fetchPriority="high" decoding="async" />

Artificial intelligence can answer questions, summarize evidence, and generate
new text at extraordinary speed. It can also produce an almost unlimited number
of research questions. But an abundance of questions is not the same as an
abundance of discovery.

Douglas Adams gave us 42. The difficult part was not producing the answer; it
was working out what anyone had actually asked—a problem modern AI can now
reproduce at industrial speed.

Most generated questions are easy to write and expensive to investigate. Some
are paraphrases of established work. Some hide false assumptions. Some sound
important but cannot be connected to an observable. Others are technically
testable, yet every possible answer would leave our beliefs and decisions
unchanged.

My idea, **The Right Question**, begins from a different premise: the central
problem is not generating more questions. It is finding questions that are
worth the cost of answering—and making the reasoning behind that choice
auditable.

The framework treats a research question as a structured proposal for changing
a bounded state of knowledge. It combines diverse question-forming operators,
adversarial criticism, scoped prior-art search, hard validity gates, explicit
assumptions, observable consequences, and multiobjective selection. AI helps
expand and challenge the search space, but it does not receive authority to
declare truth or novelty.

I am currently performing empirical tests of this framework. This article
explains the idea and its claim boundaries, then reports the current validation
state without presenting incomplete tracks as successful evidence.

:::info Publication and evidence

First published on [Medium](https://medium.com/@1200km/the-right-question-a-framework-for-auditable-question-discovery-e69142b6d0b5) on 2 October 2026. This expanded 1200km edition adds the current validation results and self-hosted figures. The [project repository](https://github.com/anpa1200/right-question), [validation plan](https://github.com/anpa1200/right-question/blob/main/benchmarks/real-world/REAL_TEST_PLAN.md), and [full evidence report](https://github.com/anpa1200/right-question/blob/main/runs/feasible-validation-20261001/report.md) preserve the implementation, protocols, raw-result boundaries, and reproduction artifacts.

:::

## Table of contents

1. [The problem is not a shortage of questions](#the-problem-is-not-a-shortage-of-questions)
2. [The central thesis](#the-central-thesis)
3. [Positioning against related work](#positioning-against-related-work)
4. [Knowledge must be bounded before questions are generated](#knowledge-must-be-bounded-before-questions-are-generated)
5. [A question is a proposed knowledge transition](#a-question-is-a-proposed-knowledge-transition)
6. [Question discovery requires multiple operators](#question-discovery-requires-multiple-operators)
7. [Adversarial roles make the reasoning inspectable](#adversarial-roles-make-the-reasoning-inspectable)
8. [Novelty is a documented search result](#novelty-is-a-documented-search-result)
9. [Hard gates come before scoring](#hard-gates-come-before-scoring)
10. [Why there should not be one universal question score](#why-there-should-not-be-one-universal-question-score)
11. [The Question Frontier](#the-question-frontier)
12. [Questions should evolve without erasing their failures](#questions-should-evolve-without-erasing-their-failures)
13. [The proper division of labor between AI, code, and people](#the-proper-division-of-labor-between-ai-code-and-people)
14. [A conceptual cybersecurity example](#a-conceptual-cybersecurity-example)
15. [What I am testing now](#what-i-am-testing-now)
16. [Current validation results](#current-validation-results)
17. [Limitations](#limitations)
18. [Conclusion](#conclusion)
19. [References](#references)
20. [Follow My Work](#follow-my-work)

## The problem is not a shortage of questions

Question generation has become cheap. A model can transform a paragraph into
dozens of apparently reasonable research prompts. This creates a misleading
impression that the difficult part of discovery has been automated.

The difficult part is selection under uncertainty.

A research team has limited time, data, compute, laboratory access, reviewer
attention, and tolerance for risk. Choosing one question means postponing many
others. A useful system must therefore do more than produce fluent sentences.
It must expose why a question deserves scarce investigative resources.

This requires distinguishing four objects that are often collapsed:

| Object | What it means |
|---|---|
| A new sentence | Wording that has not appeared before |
| A new question | A distinct relation, boundary, mechanism, or uncertainty |
| A useful experiment | A feasible observation with interpretable outcomes |
| New knowledge | A justified update to a claim, model, boundary, or decision |

These objects can overlap, but none guarantees the next. A new sentence may
express an old question. A novel question may be impossible to investigate. A
successful engineering artifact may improve operations without establishing a
new causal or explanatory claim.

The Right Question is designed around those separations.

## The central thesis

The framework’s central thesis is simple:

> A valuable empirical question is one for which at least one plausible answer
> would produce a material, auditable update to a bounded state of knowledge,
> while the meaning of the other important outcomes is specified in advance.

This definition makes question value relational rather than absolute. A
question is valuable **for a particular knowledge state, decision context, and
evidence boundary**. The same question can be transformative for one team,
routine for another, and meaningless for a third. The framework is scoped to
empirical questions with inspectable evidence and possible observables. It does
not claim to rank purely normative, philosophical, aesthetic, or personal
questions.

The word *material* is operational rather than rhetorical. An answer produces
a material update when it causes at least one of these declared changes:

- confidence in a claim moves by at least two steps on a declared five-bin
  scale: `very low`, `low`, `medium`, `high`, and `very high`;
- an evidence status changes, such as `unresolved` to `supported` or
  `contradicted`;
- the next justified action changes;
- a candidate mechanism enters or leaves the viable explanation set.

A useful question does not require every answer to cause a large update. One
outcome may change the model substantially while another preserves the current
view. The requirement is that at least one plausible outcome matters and that
the no-change, null, and contradictory outcomes have explicit interpretations.
If every plausible answer leads to the same belief, model, or action, the
question may be interesting but it has low decision value. If the only
acceptable answer is the answer preferred by the researcher, the question is
not genuinely discriminating. If the required observable cannot exist, the
question is not ready for investigation.

The framework therefore asks six questions about every candidate:

1. What do we currently believe?
2. Which evidence supports or contradicts that belief?
3. Which assumption makes the proposed question meaningful?
4. What could we observe?
5. Which possible outcomes would change our knowledge?
6. What would count against the proposed mechanism?

<img src={require('@site/static/article-assets/right-question/from-belief-to-testable-question.png').default} alt="Six checks that move from a current belief to a testable evidence-based question." width="1146" height="1372" loading="lazy" decoding="async" />

*Figure 1. A question becomes testable only after its belief, evidence, assumptions, observables, material outcomes, and falsifier are explicit.*

The question text is only the visible tip of this record.

The framework also makes one falsifiable comparative claim:

> Given the same bounded evidence and resource constraints, a multioperator,
> adversarial, gated workflow should produce a lower false-question rate and a
> higher proportion of questions that blinded domain experts independently
> judge worth testing than free-form generation followed by generic
> self-critique.

This claim can fail. If controlled comparisons show no reliable improvement,
or show that simpler methods perform as well at lower cost, then the added
workflow is not justified.

## Positioning against related work

The Right Question does not claim to invent question formation, falsifiability,
information gain, assumption breaking, causal reasoning, novelty search,
research agents, or Pareto selection. Several recent systems overlap directly
with important parts of the framework.

- **[FirstResearch](https://arxiv.org/abs/2607.05682):** Establishes a
  Research Question Certificate that records primitives, assumptions,
  mechanisms, tension, falsifiability, a decisive test, and failure updates.
  The configuration tested here adds explicit multioperator generation, a
  scoped novelty ledger, assumption dispositions, hard gates, and grouped
  frontier selection.

- **[InciteResearch](https://arxiv.org/abs/2605.06345):** Establishes
  pre-question ideation through assumption-breaking hypothesis generation and
  necessity validation. The configuration tested here integrates assumption
  breaking with collision search, explicit evidence states, and downstream
  selection policy.

- **[ResearchStudio-Idea](https://arxiv.org/abs/2607.04439):** Establishes an
  evidence-grounded ideation skill suite with paper search and prior-art
  collision checking. The configuration tested here centers the artifact on
  empirical question records, provisional assumptions, outcome-dependent
  knowledge updates, and non-scalar comparison.

The distinction is therefore not any single component. It is the combined
workflow and its decision policy: diverse operators generate candidates;
adversarial roles attack them; evidence states determine whether assumptions
are eligible, provisional, or rejected; and a small grouped objective vector
preserves tradeoffs among survivors. Whether this configuration improves
question selection is the empirical claim now being tested, not an established
result.

## Knowledge must be bounded before questions are generated

The process begins with a bounded knowledge state:

`K = {C, E, X, M, O, U}`

where:

- `C` represents current claims;
- `E` represents supporting and contradicting evidence;
- `X` represents tensions, anomalies, and unexplained residuals;
- `M` represents the current mechanism or causal model;
- `O` represents available observables;
- `U` represents uncertainty, missing access, and unresolved assumptions.

This boundary is not merely documentation. It determines which questions can
be justified and which claims can later be made.

For example, a model that sees only endpoint events cannot honestly infer an
identity mechanism without additional evidence. A system with current
literature cannot be used to simulate historical discovery unless later
terminology and outcomes are excluded. A question based on private telemetry
cannot be described as broadly generalizable before it is tested elsewhere.

A useful evidence boundary records:

- the domain and decision context;
- the sources supplied or searched;
- the relevant dates;
- excluded or inaccessible sources;
- what is directly observed;
- what is inferred;
- what remains unconfirmed.

This prevents a common failure in AI-assisted research: allowing the model to
mix evidence, background knowledge, plausible invention, and hindsight into
one fluent narrative.

## A question is a proposed knowledge transition

In this framework, a question is not just a sentence ending with a question
mark. It is a proposed transition from `K` to a possible future state
`K-prime`.

Conceptually, a complete question record can be represented as:

`q = {P, A, Y, T, delta-K}`

where:

- `P` is the proposition or relation under investigation;
- `A` is the set of load-bearing assumptions;
- `Y` is the set of observable outcomes;
- `T` is the minimal discriminating observation or test;
- `delta-K` describes how each important outcome changes knowledge.

This formulation forces the researcher to define more than a preferred
positive result. A strong question explains what a null result means, what a
contradictory result means, and which result would invalidate the framing
itself.

Consider the difference between these two questions:

> Can identity graphs detect attackers?

and:

> Within a defined environment, does adding a temporal relationship between
> privilege change, new-device authentication, and remote execution provide
> discriminating information beyond the same events without identity links?

The first question contains an undefined technology, population, outcome, and
baseline. It invites a demonstration rather than a knowledge update. The
second identifies a relation, a comparison, a boundary, and a possible
observable difference. It can still be wrong, but it is structured so that
being wrong is informative.

## Question discovery requires multiple operators

Free-form brainstorming tends to collapse into paraphrases. If an agent is
asked to “find a research gap,” it often generates several versions of the
same missing fact.

The Right Question instead uses explicit discovery operators. Each operator
interrogates the evidence from a different direction.

| Operator family | What it asks |
|---|---|
| Missing relation | Which expected connection has not been examined? |
| Contradiction | Which observation could distinguish conflicting claims? |
| Anomaly | Which mechanism could explain a residual the current model misses? |
| Assumption inversion | What changes if a load-bearing premise is false? |
| Hidden variable | Which unobserved factor could produce the apparent relation? |
| Causal reversal | Could the proposed effect be producing the supposed cause? |
| Boundary condition | Where does an accepted relation stop holding? |
| Negative space | Which expected event or relation is absent, and does that absence matter? |
| Scale transfer | Does a mechanism survive a change in scale or granularity? |
| Domain bridge | Is there a justified structural mapping to another field? |
| Tool-created observability | What became askable only because a new measurement is available? |
| Counterfactual | What should differ if an alternative mechanism were true? |

<img src={require('@site/static/article-assets/right-question/question-discovery-operators.png').default} alt="Twelve question-discovery operator families for finding valuable empirical questions." width="1536" height="1024" loading="lazy" decoding="async" />

*Figure 2. Twelve operator families search for different structures in the same bounded evidence instead of generating paraphrases of one generic gap.*

The goal is not to maximize the number of operators used. The goal is to avoid
letting one style of reasoning define the entire candidate pool.

A contradiction operator may produce a discriminating comparison. A boundary
operator may expose where a known relation fails. A causal-reversal operator
may show that the original premise was backwards. These are not cosmetic
rewrites; they imply different observations and different knowledge updates.
The causal operators inherit the basic discipline emphasized by
[Judea Pearl](https://doi.org/10.1017/CBO9780511803161): causal direction and
intervention claims cannot be recovered from fluent association alone.

## Adversarial roles make the reasoning inspectable

The framework separates question development into adversarial roles. This is
not intended to imitate a committee for its own sake. Each role has a narrow
responsibility and produces a different inspectable artifact.

| Role | Responsibility |
|---|---|
| Generator | Expand the candidate space through distinct operators |
| Assumption critic | Expose causal, sampling, measurement, and scope assumptions |
| Nonsense filter | Reject category errors, circular logic, undefined variables, and inaccessible observables |
| Novelty hunter | Search for semantic collisions, older terminology, adjacent fields, and negative results |
| Experiment designer | Identify the cheapest observation that separates leading explanations |
| Paradigm challenger | Replace one load-bearing frame while preserving established constraints |

The generator cannot certify its own novelty. The novelty hunter cannot decide
that a question is scientifically important. The experiment designer cannot
rescue an incoherent premise merely by proposing a sophisticated measurement.

This separation creates productive friction. It also leaves a trail that a
human reviewer can inspect. When a question survives, the reader can see which
assumptions were challenged, which collisions were considered, and why the
remaining uncertainty was accepted.

The roles do not guarantee independence. Several models may reproduce the same
bias, and a single model playing several roles may remain anchored to its first
answer. The benefit is therefore procedural transparency, not automatic truth.
The paradigm-challenger role is influenced by
[Thomas Kuhn’s](https://doi.org/10.7208/chicago/9780226458106.001.0001)
account of how prevailing frames shape legitimate questions, but it receives
no automatic value merely for being distant from the current frame.

## Novelty is a documented search result

Global novelty cannot be established by a finite search. Literature is
distributed across languages, disciplines, patents, theses, datasets,
proprietary systems, failed experiments, and unindexed practice. Even a careful
search can miss the nearest work.

The Right Question therefore avoids the label “novel” as an unrestricted
property. It uses four bounded statuses:

- `known`: substantially the same material question and discriminating test are documented;
- `collision`: wording differs, but located work materially answers or operationalizes the question;
- `not_found`: no collision was located within the recorded search scope;
- `unresolved`: access, terminology, coverage, or evidence is insufficient.

Candidates marked `known` or `collision` remain in the audit record but cannot
enter the eligible frontier. An `unresolved` candidate may proceed only with
its uncertainty and search limits attached; `not_found` remains a scoped
search result rather than proof of global novelty.

The novelty ledger records queries, sources, dates, filters, inspected hits,
nearest prior work, access failures, and collision reasoning. Search passes
move beyond exact wording to include:

1. mechanisms and semantic equivalents;
2. historical names, acronyms, and translations;
3. predicted observables rather than preferred explanations;
4. adjacent disciplines and structural analogies;
5. reviews, citation chains, patents, datasets, theses, and negative results;
6. evidence that the premise is false or that the proposed observation is routine.

“Not found” therefore means exactly what it says: not found in the documented
scope. It never means that no one has asked the question before.

## Hard gates come before scoring

Many ranking systems allow strength on one dimension to compensate for a
fundamental failure elsewhere. A candidate can receive a high novelty score
and survive despite being incoherent or unmeasurable.

The Right Question applies four hard gates before any comparative scoring:

1. **Soundness:** no known category error or premise contradiction already
   defeats the question.
2. **Informativeness:** at least one plausible answer would materially change
   a belief, model, investigation, or decision, while other important outcomes
   have declared interpretations.
3. **Evidence binding:** assumptions and evaluations refer to declared
   evidence rather than unsupported model prose.
4. **Nonsense-filter passage:** terms, units, causal direction, population,
   observables, and comparison logic cohere, and at least one stated
   observation could count against the proposed mechanism or framing.

The gate requires a falsifier to exist. After that binary requirement is met,
the falsifiability judgment inside empirical viability evaluates how precise,
feasible, and discriminating that falsifier is.

A model, a human reviewer, or an evidence-backed review procedure supplies the
gate judgments. Deterministic code does not know whether a question is sound
or informative. It validates that the required judgments and rationales are
present, then enforces the declared disposition consistently.

Assumption status is handled separately and explicitly:

- a contradicted **critical** assumption rejects the candidate;
- an unresolved **critical** assumption makes the candidate `provisional` and
  keeps it off the eligible frontier until the assumption is resolved;
- an unresolved **noncritical** assumption may remain eligible only when the
  uncertainty is recorded;
- supported assumptions do not prove the question, but they allow evaluation
  to continue.

Evidence binding therefore does not mean that every assumption must already be
supported. It means that assumptions have explicit evidence states and that
unresolved critical uncertainty cannot be silently treated as eligibility.

A question that fails a gate is rejected. High surprise, broad reach, or
apparent novelty cannot compensate for a false premise. This preserves the
falsifiability discipline associated with
[Karl Popper](https://doi.org/10.4324/9780203994627): a candidate must expose
what could count against it rather than merely describe a desirable outcome.

This makes rejection a legitimate output. The framework is not designed to
rewrite every candidate until it passes. A failed question may reveal that the
ontology is wrong, that the evidence is inaccessible, or that the proposed
answer would not matter. Preserving that failure is part of the knowledge
process.

## Why there should not be one universal question score

Research questions contain real, irreducible tradeoffs. One may be inexpensive
and narrow. Another may be difficult but capable of changing several important
claims. A third may be highly falsifiable but dependent on evidence that is not
yet accessible.

To avoid an eleven-axis frontier that retains almost everything, the selection
policy groups value judgments into four objectives:

| Grouped objective | Constituent judgments |
|---|---|
| Epistemic value | Scoped novelty, information gain, and surprise |
| Empirical viability | Testability, falsifiability, plausibility, and evidential accessibility |
| Scope | Reach of the possible knowledge update |
| Burden | The inverse of cost, time, coordination, and ethical burden |

Information gain follows the experimental perspective developed by
[Dennis Lindley](https://doi.org/10.1214/aoms/1177728069): the value lies in
how much an observation can change uncertainty, not in how impressive the
question sounds.

Operator family, cross-domain bridging, contradiction origin, and paradigm
distance remain descriptive or diagnostic metadata. They explain where a
question came from and help audit diversity, but they are not benefits by
themselves. If a cross-domain bridge or contradiction resolution creates real
value, that value must appear through information gain, empirical viability,
or reach rather than receiving a second score for its origin.

Each retained value judgment requires a rationale and evidence references.
These are structured judgments, not calibrated probabilities. Grouping reduces
frontier sparsity, but it does not make the groups objective facts.

Collapsing them into one “discovery score” would create false precision. There
is no universal exchange rate between reach, testability, novelty, and cost. A
weighted sum can be useful for a specific organization, but its weights express
policy. They should be visible, justified, and tested for sensitivity.

The default framework therefore preserves four explicit objectives instead of
pretending that every individual feature naturally deserves its own axis or
that all values share one universal scale.

## The Question Frontier

Rather than selecting a universal winner, the framework constructs a Pareto
frontier across the four grouped objectives: the set of surviving questions
that are not dominated across epistemic value, empirical viability, scope, and
burden.

Candidate `q-a` dominates `q-b` only if `q-a` is at least as strong on every
grouped objective and stronger on at least one. A non-dominated question
remains on the **Question Frontier**.

This produces a more honest decision surface:

- an accessible, narrow question can survive beside an expensive, high-reach question;
- a high-information question can survive beside a more empirically accessible question;
- two questions can remain legitimate because they represent different resource and knowledge tradeoffs.

The frontier does not say that every surviving question should be investigated.
It says that no surviving candidate is obviously inferior under the declared
groups. Even four dimensions may leave a broad frontier, especially when the
candidate pool is small or judgments are noisy. Frontier size is therefore a
diagnostic: if almost everything survives, the groups or evidence need better
discrimination rather than additional dimensions.

If a team must choose one question, it can apply a context-specific cost rule,
resource limit, ethical constraint, or strategic priority. The important point
is that this final decision is explicit. It is not hidden inside an opaque
model score.

## Questions should evolve without erasing their failures

Research questions change when evidence changes. A collision with prior art may
force a narrower boundary. A failed observation may invalidate a mechanism. A
new instrument may make a previously abstract variable measurable.

The framework treats a material revision as a new version. A question-evolution
record preserves:

- the trigger for revision;
- evidence added or removed;
- assumptions changed;
- observables changed;
- novelty-ledger changes;
- selection-feature changes;
- the reason the previous version failed or became incomplete.

This matters because polished final wording can erase the actual path of
discovery. The useful history often includes vague questions, false premises,
prior-art collisions, measurement failures, and null observations.

A failed question is not always wasted effort. It can reveal a broken
classification, a hidden dependency, a missing instrument, or an unproductive
research direction. The framework preserves those outcomes rather than
presenting every surviving question as if it emerged fully formed.

## The proper division of labor between AI, code, and people

The Right Question separates three kinds of work.

### AI expands and challenges

Language models are useful for generating structural alternatives, surfacing
assumptions, proposing search terms, translating between disciplines, and
challenging the current frame. They are especially valuable when the goal is
to explore several possible ways of asking rather than immediately converging
on one polished answer.

AI output remains a lead. A fluent rationale is not evidence, and agreement
between several models is not independent corroboration.

### Deterministic code enforces declared policy

Schemas and deterministic logic can verify that required fields exist, values
are in range, supplied gate verdicts are enforced, rejected and provisional
candidates remain visible, and Pareto selection follows the stated rule.

This layer does not judge soundness, informativeness, novelty, or scientific
truth. Those verdicts come from people, models, or review procedures and must
carry evidence and rationales. Code owns only consistency and enforcement: the
same structured judgments should produce the same policy output.

### People retain responsibility

Domain experts decide whether the evidence is meaningful, whether the
assumptions are acceptable, whether the proposed observation is ethical, and
whether the remaining uncertainty justifies the cost.

People also define the decision context. A frontier cannot determine an
organization’s risk tolerance, scientific priorities, legal duties, or moral
constraints.

The framework is therefore not an autonomous scientist. It is an audited
collaboration between generative reasoning, deterministic policy, evidence,
and human judgment.

## A conceptual cybersecurity example

Consider a security team investigating privileged activity. It has endpoint
events, authentication records, identity-role changes, and administrative
context. Existing detections evaluate individual events, but the team suspects
that temporal relations across these sources may contain additional
information.

A free-form system might ask:

> Can AI use identity graphs to detect sophisticated attacks?

The question sounds current, but it is weak. “AI,” “identity graph,”
“sophisticated,” and “detect” are undefined. There is no population, baseline,
boundary, or falsifier.

Different operators produce more useful candidates:

| Operator | Conceptual candidate |
|---|---|
| Missing relation | Does a privilege-change-to-execution path add information beyond the same events considered separately? |
| Causal reversal | Do emergency administrative actions cause both the identity change and the alert pattern? |
| Boundary condition | At what temporal separation does the identity relation stop contributing useful information? |
| Negative space | Does the absence of expected administrative context distinguish otherwise similar sessions? |

The assumption critic would then expose identity-resolution quality, clock
alignment, label construction, observation-window comparability, and missing
administrative records. The nonsense filter would require a declared
population, observable, comparison, and causal direction. The novelty hunter
would search academic work, commercial capabilities, patents, public
detections, and older terminology.

The important output is not the most impressive sentence. It is a question
record that shows what is known, which assumptions remain unresolved, what
observation could distinguish explanations, and how different outcomes would
change the investigation.

This example is conceptual and sanitized. It is not a reported experiment,
customer finding, detection result, or claim of novelty.

## What I am testing now

The framework is intentionally stronger than a prompt pattern: it makes claims
about the quality, auditability, and selection of questions. Those claims need
evidence.

At the time of writing, I am performing a structured validation program. The
work examines whether the framework can:

- classify evidence status without confusing support, contradiction, and
  unresolved information;
- generate questions that compile into objective, measurable predictors;
- avoid rewarding questions that are incoherent or impossible to execute;
- identify prior-art collisions without treating a failed search as proof of
  novelty;
- produce selections that remain useful when compared with simpler baselines;
- preserve tradeoffs without hiding them inside one arbitrary score;
- support reliable review by independent human experts;
- remain honest when outcomes are delayed, inaccessible, or negative.

Some parts of this work require future outcomes, licensed datasets, or human
review. Those dependencies cannot be replaced with model opinion. The
validation process therefore separates implementation checks, synthetic
checks, existing expert labels, prospective outcomes, and human judgments.

The completed, failed, blocked, and future-dependent results are reported below
and preserved in the repository. Until the required real-world and human
comparisons are complete, The Right Question should be understood as a testable
framework and research instrument—not as a proven method for increasing
scientific discovery.

## Current validation results

The validation snapshot below is dated **1 October 2026**. It combines machine
checks, one completed SciFact model cell, a frozen prospective vulnerability
ranking, and explicit non-results. The shared model-call ledger stopped at the
preregistered boundary of **128 of 160 attempts**. No future KEV outcome was
opened early, no human judgment was simulated, and no unavailable dataset or
model was silently replaced.

| Track | Observed result | What it establishes |
|---|---|---|
| Implementation and integrity | The preserved JUnit record contains 62 tests with zero failures, errors, or skips. Workflow and baseline ranking artifacts rebuilt byte-for-byte. | Deterministic implementation consistency and artifact reproducibility—not question quality or scientific discovery. |
| SciFact evidence-status classification | GPT-4.1 reached 84.0% majority agreement, below the fixed 85% threshold. Its 2.0% contradicted-called-supported rate passed the 10% ceiling. Anthropic evidence coverage was incomplete; the local Qwen cells produced no responses. | The only complete evidence-model cell missed the primary threshold. The three-model experiment failed to complete. |
| Prospective KEV workflow | Three of 12 generated questions were unexecutable: 25%, above the fixed 10% maximum. The selected EPSS-free ranking covers 379,952 eligible CVEs and reproduced byte-identically. | The operational rule already failed. Future recall remains unevaluated and cannot repair that failure. |
| PatentMatch collision retrieval | Official licensing and label meaning were confirmed, but official dataset bytes were unavailable and no third-party substitute was accepted. | Dataset readiness only; no retrieval metric. |
| Human preference study | The protocol, rubric, evidence packs, and synthetic analysis check exist, but the required candidate corpus, blinded forms, sealed keys, and reviewer ratings do not. | Preparation only; no expert-preference or reliability result. |
| LANL telemetry | No authorized local dataset was supplied, so no telemetry records or outcomes were inspected. | No end-to-end telemetry result. |

The most informative result is not a win. The SciFact threshold miss shows that
high repeatability does not guarantee sufficient agreement with evidence
labels. The prospective track shows that a theoretically attractive workflow
can still fail operationally when too many generated questions cannot compile
into measurable predictors. Those failures are exactly the kind of evidence
the framework is supposed to retain.

The project’s central comparative claim therefore remains **unevaluated**. The
current evidence does not show that the workflow produces questions that
blinded experts prefer, improves real-world discovery, retrieves novelty
collisions reliably, or beats simpler baselines on future outcomes. See the
[full report](https://github.com/anpa1200/right-question/blob/main/runs/feasible-validation-20261001/report.md), [SciFact proof report](https://github.com/anpa1200/right-question/blob/main/runs/RT-02/20261001-scifact-v1/report.md), and [prospective KEV report](https://github.com/anpa1200/right-question/blob/main/runs/RT-09/20261001-objective-outcome-v1/report.md) for the exact denominators, failures, deviations, and next evidence dates.

## Limitations

The framework cannot guarantee global novelty. No finite search can.

Its feature values remain judgments. Requiring rationales and evidence makes
those judgments auditable, but it does not automatically make them correct.

Pareto selection depends on the candidate pool. A valuable question that was
never generated cannot appear on the frontier.

Grouping reduces the tendency of a high-dimensional frontier to retain nearly
every candidate, but the grouped frontier can still be broad. Arithmetic means
inside a group can also hide a weak constituent behind a strong one. Group
definitions, minimum constituent floors, frontier size, and sensitivity to
judgment uncertainty therefore remain part of the selection audit.

Adversarial roles can share model biases. Role separation improves process
visibility but does not create independent evidence.

A question can be sound, informative, and testable while still being unsafe,
unethical, or socially unacceptable. Medical, biological, cybersecurity,
dual-use, and human-subject research require their own governance.

The framework also cannot guarantee that answering a strong question will
produce an important discovery. Research can fail because measurements are
noisy, effects are small, mechanisms are more complex than expected, or the
world simply does not contain the hoped-for relation.

Finally, formal structure can create an illusion of rigor. A complete JSON
record, detailed rationale, or clean frontier is not evidence by itself. The
framework is useful only when its fields remain tied to real observations,
honest uncertainty, and decisions that can be challenged.

## Conclusion

The right question is not the most original sentence an AI can generate. It is
a structured proposal for an observation that could change a bounded state of
knowledge.

That proposal should reveal its assumptions, survive adversarial criticism,
face a documented novelty search, define interpretable outcomes, and compete
with alternatives without hiding real tradeoffs. It should also be allowed to
fail.

The Right Question reframes AI from an answer machine or creativity oracle into
an audited collaborator. AI can expand the space of possibilities. Deterministic
policy can preserve consistency. Human judgment can set boundaries and accept
responsibility. Evidence still decides what we learn.

Testing has begun, and the first results include threshold misses, blocked
tracks, reproducible machine artifacts, and deliberately unopened future
outcomes. Until the comparative evidence is established, the most important
claim is also the most modest: question discovery can be made more explicit,
more adversarial, and more auditable than free-form brainstorming alone.

## References

- [The Right Question project repository](https://github.com/anpa1200/right-question)
- [Real-World Validation Plan v0.3](https://github.com/anpa1200/right-question/blob/main/benchmarks/real-world/REAL_TEST_PLAN.md)
- [Feasible Validation Report, 1 October 2026](https://github.com/anpa1200/right-question/blob/main/runs/feasible-validation-20261001/report.md)
- [Original Medium publication](https://medium.com/@1200km/the-right-question-a-framework-for-auditable-question-discovery-e69142b6d0b5)
- [FirstResearch: Auditable Question Formation for LLM Scientific Discovery Agents](https://arxiv.org/abs/2607.05682)
- [More Than Can Be Said: A Benchmark and Framework for Pre-Question Scientific Ideation](https://arxiv.org/abs/2605.06345)
- [ResearchStudio-Idea: An Evidence-Grounded Research-Ideation Skill Suite](https://arxiv.org/abs/2607.04439)
- [Karl Popper, *The Logic of Scientific Discovery*](https://doi.org/10.4324/9780203994627)
- [Thomas S. Kuhn, *The Structure of Scientific Revolutions*](https://doi.org/10.7208/chicago/9780226458106.001.0001)
- [Dennis V. Lindley, “On a Measure of the Information Provided by an Experiment”](https://doi.org/10.1214/aoms/1177728069)
- [Judea Pearl, *Causality*](https://doi.org/10.1017/CBO9780511803161)

## Follow My Work

I publish practical cybersecurity research, CTI workflows, detection engineering notes, malware-analysis projects, AI-security research, open-source tools, labs, and technical guides.

- <a href="https://1200km.com/" target="_self">Website — 1200km.com</a>
- [Medium — @1200km](https://medium.com/@1200km)
- [LinkedIn — Andrey Pautov](https://www.linkedin.com/in/andrey-pautov/)
- [GitHub — tools and labs](https://github.com/anpa1200)
- [Contact — 1200km@gmail.com](mailto:1200km@gmail.com)
