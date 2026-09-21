## 9. Implementation Guidance

### 9.1 Instrument Before Modelling

Start with a threat hypothesis and a collection test. Confirm event generation, forwarding, parsing, identity normalization, retention and clock behavior. Record the data that is absent as well as the data that arrives. A valid query over an empty or misparsed table is not detection coverage.

Treat event time and ingestion time separately. Define allowed lateness, query overlap and stable alert identifiers so retries do not create duplicate incidents. Preserve raw evidence and adapter versions. Host-role or identity enrichment can be wrong; its provenance belongs in the investigation output.

### 9.2 Prioritise by Baseline Stability

Choose a baseline only after examining the feature distribution. Counts can be sparse, seasonal and overdispersed. A Poisson model assumes a particular relationship between mean and variance; do not assume it fits authentication or API counts. A z-score can still be a feature, but a normal-tail probability is not justified merely by computing it.

Median and median absolute deviation (MAD) are candidates for robust location and scale, not universal replacements. A zero MAD is common with sparse counts. Define what happens then; do not divide by zero, discard the entity or pretend a small constant is scientifically calibrated. Consider empirical quantiles, appropriate count models, categorical novelty and seasonal residuals according to the feature and sample size.

Remove unsupported High/Medium/Low false-positive and fidelity ratings. Until measured, describe anticipated benign explanations and operational requirements. Deterministic rules still require validation: a process relationship, named pipe or snapshot deletion is not structurally equivalent to malicious intent.

### 9.3 Baseline by Role, Not by Estate

Specify the entity, comparison population, observation window and feature units. A user's uploads must not become the baseline for their downloads. A daily total should not be compared directly with a rolling 40-minute count. Different roles, shift patterns, automation and newly onboarded systems can require different treatment.

TF-IDF is feature weighting, not a clustering algorithm. If using it with clustering, document the representation, normalization, distance function and clustering method separately. Peer membership and model outputs can also expose sensitive personnel information; minimize access and avoid equating deviations with employee misconduct.

### 9.4 Accumulate Weak Signals via Entity Risk Scoring

Use entity and causal context, not mere temporal coincidence. Joining every tenant success to every failure burst invents relationships. Correlated sources may duplicate the same underlying event, so adding their scores is not independent corroboration. Calibrate score interpretation and avoid labeling an arbitrary risk score as a probability of maliciousness.

Separate **investigation priority**, **incident declaration** and **automatic containment**. One reliable, consequential observation may justify immediate investigation. Conversely, several weak or duplicated observations may not justify disruptive action. Record competing explanations and why the next action is proportionate.

### 9.5 Validate with Purple-Team Exercises

Use only authorized, isolated test identities and systems. This revision replays recorded logs; it does not launch password sprays, credential extraction or live exploitation. Exercise results should document what ran, what was collected, what matched, what did not, and whether the alert contained usable evidence.

Positive cases are necessary but insufficient. Include approved replication, alternate-credential administration, software deployment, backups, browser/DNS diversity, scheduled downloads, missing logs, duplicate events and parser changes. A successful lab exercise does not estimate a production false-positive rate.

### 9.6 A reproducible statistical study

For a real deployment study, predeclare the target population, prediction unit, labels, costs and evaluation period. Separate chronological training, validation and testing; keep future observations out of every feature and baseline. Where relevant, separate campaigns or entities to test generalization. Do not tune on the held-out test or retrospectively select only incidents the detector catches.

Report confusion counts, alert precision, incident recall, false alerts per observed entity-day, detection delay and investigation workload. Use precision-recall analysis alongside, rather than being reassured solely by, ROC curves in rare-event settings. Labels must distinguish benign, malicious and unresolved; an unlabeled event is not automatically a true negative. Uncertainty should respect clustered entities/incidents rather than treating every log line as independent.

This revision includes a **seeded synthetic sensitivity experiment** to expose baseline and gate trade-offs. Its numbers describe the generated world, not enterprise performance. The public-recording replay in Section 8 is a separate evidence class. Neither supplies a representative production negative corpus.

<!-- statistical-results -->

LANL's public authentication data could support a larger, carefully scoped follow-up. Its anonymized DNS relationship data is not suitable for raw-label entropy evaluation, and its red-team labels do not exhaust all behavior. Dataset suitability must be checked per analytic. [LANL dataset specification](https://csr.lanl.gov/data/cyber1/).

### 9.7 Revision, reproducibility and remaining work

The machine-readable issue ledger distinguishes textual correction, functional execution, unresolved external evidence and production validation. It reconciles the earlier audit and external review rather than claiming their counts are independent. Download the [audit](https://1200km.com/articles/research/anomaly-fact-audit.md), [validation bundle](https://1200km.com/articles/research/anomaly-validation/bundle.json) and [incident register](https://1200km.com/articles/research/anomaly-incidents.json).

The canonical URL, case anchors and topic tags are retained. Tags indicate relevance, not factual certification. The original Medium edition is not automatically synchronized; publication access is required to update its text and correction notice. No claim of a live Medium correction follows from changing this repository.

### 9.8 Historical illustrations and corrected navigation

The current edition has **43 new inline diagrams** beside the relevant explanations: statistical concepts, all 14 operational anomaly families and multi-event correlation, incident evidence, telemetry, credential analytics and evaluation. Each includes an evidence label, nearby sources, a text equivalent and a full-size SVG. Numerical charts are generated from the committed results, not manually transcribed. The downloadable [visual manifest](https://1200km.com/articles/research/anomaly-visuals/manifest.json) records placement, data and source hashes. This is an author-reviewed replacement set, not independent correctness certification.

The original media are retained below for historical continuity, **not as validated technical guidance**. Older diagrams can contain superseded taxonomy, field assumptions or claims. The corrected text, source-specific citations, telemetry contracts and test artifacts take precedence. This avoids leaving an old infographic to silently contradict a corrected paragraph. No image file or existing article URL was deleted.

<!-- historical-media -->

<!-- preserved-anchors -->
