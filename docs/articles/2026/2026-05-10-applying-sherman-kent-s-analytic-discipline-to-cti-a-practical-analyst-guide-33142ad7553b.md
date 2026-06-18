---
title: "Applying Sherman Kent\u2019s Analytic Discipline to CTI: A Practical Analyst Guide"
description: "Estimative language, evidence discipline, and analytic integrity for cyber threat intelligence"
image: "https://cdn-images-1.medium.com/max/800/1*le-GPHh7adFR9iex1Ff7qQ.png"
---

# Applying Sherman Kent’s Analytic Discipline to CTI: A Practical Analyst Guide


![Cover image](https://cdn-images-1.medium.com/max/800/1*le-GPHh7adFR9iex1Ff7qQ.png)

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/applying-sherman-kent-s-analytic-discipline-to-cti-a-practical-analyst-guide-33142ad7553b](https://medium.com/@1200km/applying-sherman-kent-s-analytic-discipline-to-cti-a-practical-analyst-guide-33142ad7553b)
- **Published:** 2026-05-10
- **Preserved media:** 14 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 1 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### Estimative language, evidence discipline, and analytic integrity for cyber threat intelligence

![Article image](https://cdn-images-1.medium.com/max/800/1*le-GPHh7adFR9iex1Ff7qQ.png)

## Executive Summary

This is an analyst guide, not a formal CTI report. It does not answer a single priority intelligence requirement, assess one actor or campaign end to end, provide an IOC package, or produce a defensive detection plan. Its purpose is narrower: show how cyber threat intelligence analysts can apply Sherman Kent-style analytic discipline to public evidence without overstating what the evidence proves.

Sherman Kent was one of the central figures in professionalizing U.S. intelligence analysis. His writing emphasized clear estimative language, policy relevance, analytic independence, evidence discipline, explicit uncertainty, and the separation of fact from judgment ([CIA, Words of Estimative Probability](https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-8-no-4/words-of-estimative-probability/);[CIA, The Intelligence Process: A Digest from Strategic Intelligence](https://www.cia.gov/readingroom/document/cia-rdp78-04718a000600100003-3);[CIA, Sherman Kent and the Profession of Intelligence Analysis](https://www.cia.gov/resources/csi/static/Kent-Profession-Intel-Analysis.pdf)).

This article uses**“Kent-style analytic discipline”**as shorthand for that professional tradition. It is not claiming that there is one official, codified “Sherman Kent doctrine” that directly governs modern CTI. The safer claim is that Kent’s principles are consistent with later Intelligence Community analytic standards and structured analytic technique guidance, including ICD 203 and the CIA tradecraft primer ([ODNI, ICD 203](https://www.dni.gov/files/documents/ICD/ICD-203.pdf);[CIA, A Tradecraft Primer](https://www.cia.gov/resources/csi/static/Tradecraft-Primer-apr09.pdf)).

For CTI, this matters because analysts often work from incomplete telemetry, vendor reporting, malware analysis, infrastructure links, victimology, and government attribution statements. Those evidence types do not all prove the same thing. A file hash can support a malware-family claim. A command-and-control pattern can support a campaign link. Victimology can support a targeting assessment. None of those, by itself, proves adversary intent or state tasking.

This guide therefore focuses on one standard: make the reader see where evidence ends and assessment begins.

## Table of Contents

**Evidence and Confidence Model Used Here**

**Estimative Probability Reference**

**What Is Sherman Kent-Style Analytic Discipline?**

**What Maps From Traditional Intelligence to CTI — And What Does Not**

- **1. Policy Relevance Without Policy Capture**

- **2. Facts, Assumptions, and Judgments**

- **3. Estimative Probability Language**

- **4. Confidence Is Not Probability**

- **5. Alternative Hypotheses**

- **6. Warning, Indicators, and Collection Gaps**

- **7. Analytic Integrity in CTI**

**Cognitive Biases CTI Analysts Should Name**

**Where ATT&CK and the Pyramid of Pain Fit**

**Kent-Style Checklist**

**Practical Analyst Template**

**Conclusion**

**References**

## Evidence and Confidence Model Used Here

**This article uses these evidence labels:**

- **Author-observed:**directly inspected by the author. This article rarely uses this label because it is based on public reporting, not original telemetry or reverse engineering.

- **Source-observed:**the cited source claims direct access to evidence, such as imagery, telemetry, malware samples, incident response data, or official records.

- **Reported:**stated by a cited source, but not independently verified here.

- **Assessed:**analytic judgment made by a cited source.

- **Inferred:**reasonable interpretation made in this article from public evidence, but not directly observed.

**Qualifiers are tracked separately from evidence labels:**

- **Qualifier / limitation:**ambiguity, scope limit, alternate explanation, source-access constraint, or reason the evidence should not be overinterpreted.

**Confidence attaches to a specific assessment, not to an example as a whole:**

- **High confidence:**strong source access, strong credibility, meaningful corroboration, and a short inference chain.

- **Moderate confidence:**credible reporting, but incomplete visibility, limited corroboration, contested interpretation, or a longer inference chain.

- **Low confidence:**plausible inference from thin, indirect, or weakly corroborated evidence.

**Every example uses the same four-field confidence basis:**

- **Source access:**direct telemetry, reverse engineering, official record, government statement, vendor incident response, or secondary reporting.

- **Source reliability:**established, unknown, contested, or mixed.

- **Information credibility:**corroborated, single-source, inferred, or disputed.

- **Author verification:**verified, partially verified, or not independently verified here.

This is still not a formal source-grading model. Operational CTI should use a more rigorous source reliability and information credibility system, especially when reporting will support security operations, legal action, executive decision-making, or public attribution.

## Estimative Probability Reference

Kent argued that estimative words should not be left to normal conversational ambiguity. Different organizations use different probability bands, but a CTI team should publish and reuse one internal lexicon. A simple working version is:

![Article image](https://cdn-images-1.medium.com/max/800/1*O5dwFHm_ncEOU61MI32nLw.png)

Probability is not confidence. “Likely” says how probable the judgment is. “Moderate confidence” says how strong the evidentiary basis is.

These bands are illustrative, not universal; the important control is consistency inside the publishing team.

## What Is Sherman Kent-Style Analytic Discipline?

![Article image](https://cdn-images-1.medium.com/max/800/1*oXWwShvs3qtrUWIDyfreXQ.png)

Kent-style analytic discipline can be reduced to a practical standard: intelligence analysis should help decision-makers reason under uncertainty without hiding the uncertainty. The analyst’s job is not to sound certain. The analyst’s job is to make evidence, assumptions, probability, confidence, alternatives, and collection gaps visible enough that decision-makers understand the basis and limits of the judgment.

In practice, that means:

- **Serve the decision, not the preference:**Intelligence should be relevant to policy or defensive decisions, but analytic judgment should not be shaped to support a preferred outcome.

- **Separate facts from estimates:**The analyst should distinguish observed evidence from assumptions, inference, and judgment.

- **Use estimative language deliberately:**Words such as “likely,” “probably,” “possible,” and “almost certainly” should communicate probability consistently rather than act as vague hedges.

- **State confidence separately from probability:**A judgment can be likely but low confidence if evidence is thin. A judgment can be high confidence but still not certain.

- **Expose assumptions and alternatives:**Analysts should test what else could explain the same evidence.

- **Identify collection gaps:**A good estimate says what is missing, not only what is believed.

- **Preserve analytic integrity:**Intelligence should be candid about uncertainty, source weakness, and dissent.

This is not a mechanical checklist. It is a writing and reasoning discipline: structure the product so the reader can audit the analytic path.

## What Maps From Traditional Intelligence to CTI — And What Does Not

![Article image](https://cdn-images-1.medium.com/max/800/1*P_kpV2peYBfbICkYx0HRhg.png)

Traditional national-security intelligence and CTI share the same analytic problem: decisions must be made before evidence is complete. Kent-style discipline maps well to CTI in several areas:

- **Estimative language:**CTI needs disciplined wording for attribution, intent, targeting, capability, and likelihood of future activity.

- **Source access:**CTI must distinguish endpoint telemetry, network logs, malware samples, sinkhole data, victim reporting, vendor clustering, government statements, and media summaries.

- **Confidence:**CTI must explain whether confidence comes from direct artifacts, multiple independent sources, long-term tracking, or inference.

- **Alternative hypotheses:**CTI must test whether shared infrastructure means same actor, whether victimology means deliberate targeting, and whether malware behavior proves intent.

- **Collection gaps:**CTI should turn uncertainty into hunt tasks, telemetry requirements, malware-analysis questions, and intelligence requirements.

### But not everything transfers cleanly:

- **CTI evidence is often technical and perishable:**Domains, infrastructure, certificates, hashes, and telemetry can age quickly.

- **Vendor labels are not legal attribution:**NOBELIUM, APT29, COZY BEAR, and other labels may overlap, but they are not automatically interchangeable.

- **Visibility is uneven:**One vendor may see endpoint telemetry, another may see cloud logs, and a government source may have classified access unavailable to public readers.

- **Intent is harder than behavior:**Malware execution, credential theft, and lateral movement can be documented technically. Strategic objective usually requires assessment.

- **A CTI report needs a scoped question:**This article is a tradecraft guide. A real CTI report would need a PIR, key judgments, actor or campaign scope, timeline, source base, indicators, affected victims or sectors, confidence per judgment, and defensive implications.

## 1. Policy Relevance Without Policy Capture

![Article image](https://cdn-images-1.medium.com/max/800/1*mBQ_-Mvq3kbMpUNRP3Dc0g.png)

Kent argued for intelligence that mattered to national decisions. Relevance does not mean advocacy. In CTI terms, the analyst should understand the decision context — patch prioritization, detection engineering, executive risk, incident response, threat hunting, vendor exposure, or public communication — without forcing the evidence to support a preferred action.

### Example 1: Cuban Missile Crisis imagery supported decision-making without replacing policy judgment

- **Claim:**October 1962 imagery narrowed uncertainty about Soviet offensive missile deployment in Cuba, but did not determine the U.S. policy response.

- **Evidence:**U.S. historical records describe a U-2 flight on October 14, 1962 and subsequent photo interpretation that identified Soviet MRBM sites under construction.

- **Source access:**Official historical records and archival imagery; reported in U.S. government records, not author-observed here.

- **Assessment:**This is a strong national-security example of policy-relevant intelligence: evidence clarified the threat, while the response remained a policy decision.

- **Confidence in assessment:**High.

- **Confidence basis:**Source access: official records and archival imagery; Source reliability: established; Information credibility: corroborated; Author verification: public records checked, original imagery not independently analyzed here.

- **Sources:**[Office of the Historian, FRUS chronology](https://history.state.gov/historicaldocuments/frus1961-63v11/d16);[National Archives, Aerial Photograph of Missiles in Cuba](https://www.archives.gov/milestone-documents/aerial-photograph-of-missiles-in-cuba).

- **Qualifier / limitation:**This is not a CTI case. It is used because the evidence-to-decision structure is directly relevant to CTI reporting.

The CTI translation is straightforward: a malware sample, intrusion timeline, or cloud log can narrow uncertainty, but it does not automatically decide whether the organization should disclose publicly, isolate a business unit, attribute the incident, or notify regulators.

### Example 2: The 2007 Iran NIE decomposed a broad question into narrower judgments

- **Claim:**The 2007 Iran NIE separated several analytic questions — weaponization, enrichment, intent, and future capability — instead of treating “Iran’s nuclear program” as one indivisible judgment.

- **Evidence:**The declassified NIE uses differentiated judgments and confidence levels across related nuclear questions.

- **Source access:**Public declassified key judgments; reported by ODNI, not author-observed classified sourcing.

- **Assessment:**The product is a useful example of decomposing a broad question into narrower estimative judgments.

- **Confidence in assessment:**High for the decomposition claim; low for any claim about policy effect unless separately sourced.

- **Confidence basis:**Source access: declassified ODNI key judgments; Source reliability: established; Information credibility: primary public document; Author verification: public text checked, classified sourcing not available.

- **Sources:**[ODNI, Iran: Nuclear Intentions and Capabilities](https://www.dni.gov/files/documents/Newsroom/Reports%20and%20Pubs/20071203_release.pdf);[CIA CSI, 2007 NIE on Iran](https://www.cia.gov/resources/csi/books-monographs/cia-support-to-policymakers-the-2007-nie-on-irans-nuclear-intentions-and-capabilities/).

- **Qualifier / limitation:**This article does not assess whether the NIE changed policy. It only uses the public product to show disciplined decomposition of judgments.

## 2. Facts, Assumptions, and Judgments

![Article image](https://cdn-images-1.medium.com/max/800/1*f0Wu_l81Mk6vjtKsA73UQA.png)

Kent-style analysis requires a visible boundary between what the analyst knows and what the analyst concludes. The most dangerous failures often occur when assumptions are written as if they are evidence.

### Example 1: Iraq WMD analysis shows the risk of assumption-driven certainty

- **Claim:**The Iraq WMD case is a negative example of insufficiently disciplined separation between evidence, assumptions, and judgment.

- **Evidence:**The WMD Commission identified weak collection, analytic errors, and failure to make clear how much analysis rested on assumptions rather than strong evidence.

- **Source access:**Official retrospective commission reporting; reported, not author-observed original intelligence.

- **Assessment:**The Kent-style lesson is that historical behavior and concealment indicators should not be converted into current capability judgments without showing the inference chain.

- **Confidence in assessment:**High for the official finding of intelligence failure; moderate for the article’s specific “assumption-driven certainty” framing.

- **Confidence basis:**Source access: official retrospective commission reporting; Source reliability: established; Information credibility: corroborated for broad failure, interpreted for this article’s lesson framing; Author verification: public report checked, original intelligence not available.

- **Sources:**[WMD Commission report index](https://govinfo.library.unt.edu/wmd/report/index.html);[WMD Commission transmittal letter](https://govinfo.library.unt.edu/wmd/report/transmittal_letter.html);[GPO WMD Commission PDF](https://www.govinfo.gov/content/pkg/GPO-WMD/pdf/GPO-WMD.pdf).

- **Qualifier / limitation:**The Iraq case is not a CTI case. It is included because it is a canonical warning about assumptions, source weakness, and overconfident estimates.

**Correct Kent-style wording would separate:**

- **Reported:**Iraq had historical WMD programs and had previously concealed activity.

- **Reported:**sources and technical indicators were interpreted as suggesting renewed activity.

- **Assumed:**past concealment behavior implied possible continuing programs.

- **Assessed:**Iraq retained or reconstituted WMD capabilities.

- **Collection gap:**direct, reliable access to current program status was limited.

The failure mode is converting “the regime has concealed WMD before” into “the regime currently has active WMD programs” without making the inferential jump visible enough.

### Example 2: SolarWinds analysis required separating technical fact from attribution judgment

- **Claim:**SolarWinds reporting should distinguish technical supply-chain compromise from actor attribution and strategic intent.

- **Evidence:**CISA reported malicious code inserted into the SolarWinds software lifecycle; CrowdStrike analyzed SUNSPOT’s role in manipulating the build process.

- **Source access:**CISA-reported government advisory and CrowdStrike-reported technical analysis; not author-observed here.

- **Assessment:**The technical compromise, vendor cluster labels, government attribution, and intent assessment should be written as separate claims.

- **Confidence in assessment:**High.

- **Confidence basis:**Source access: government advisory and vendor technical analysis; Source reliability: established; Information credibility: corroborated for supply-chain compromise; Author verification: public reports checked, no independent reverse engineering here.

- **Sources:**[CISA AA20–352A](https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a);[CrowdStrike, SUNSPOT](https://www.crowdstrike.com/en-us/blog/sunspot-malware-technical-analysis/).

- **Qualifier / limitation:**Public reporting can support strong technical conclusions while still leaving parts of attribution and intent dependent on non-public evidence.

**Kent-style separation:**

- **Technical behavior:**malicious Orion component inserted into build/update lifecycle.

- **Tooling:**SUNSPOT and SUNBURST.

- **Vendor/government label:**NOBELIUM, StellarParticle, APT29-style community labels depending on source.

- **Attribution:**assessed responsibility by governments or vendors.

- **Intent:**assessed intelligence collection or access objective.

## 3. Estimative Probability Language

![Article image](https://cdn-images-1.medium.com/max/800/1*dOK04WErXA1j0WBJz5d0Xw.png)

Kent’s “Words of Estimative Probability” addressed a persistent intelligence problem: analysts use words like “possible,” “probable,” and “likely,” but readers may assign different probabilities to the same words. This discipline does not require every estimate to become a math problem. It requires that probability language be intentional and consistent.

### Example 1: APT28 attribution should preserve source confidence

- **Claim:**Public APT28 attribution language should preserve the source’s estimative wording.

- **Evidence:**The linked Google Cloud/Mandiant blog says FireEye assessed APT28 was most likely sponsored by the Russian government and targeted information useful to government interests. Older or fuller Mandiant/FireEye reporting may use different confidence phrasing, so analysts should preserve the exact wording of the specific source they cite.

- **Source access:**Vendor reporting based on proprietary analysis; exact source base not fully available to public readers.

- **Assessment:**“The cited Google Cloud/Mandiant blog says FireEye assessed APT28 was most likely sponsored by the Russian government” is stronger tradecraft than writing “APT28 is proven to be Russia.”

- **Confidence in assessment:**High for the wording recommendation; moderate for public evaluation of the underlying sponsorship claim.

- **Confidence basis:**Source access: vendor reporting based on proprietary analysis; Source reliability: established vendor; Information credibility: credible but not fully public; Author verification: linked blog wording checked, underlying evidence not independently verified.

- **Source:**[Google Cloud / Mandiant, APT28](https://cloud.google.com/blog/topics/threat-intelligence/apt28-a-window-into-russias-cyber-espionage-operations).

- **Qualifier / limitation:**Vendor attribution can be credible without being fully independently auditable from public evidence.

**Kent-style wording:**

- **Better**: “The cited Google Cloud/Mandiant blog says FireEye assessed APT28 was most likely sponsored by the Russian government.”

- **Weaker**: “APT28 is Russian government-directed.”

- **Worse**: “APT28 is proven to be Russia.”

The first version preserves the source, the estimative term, and the fact that the statement is an assessment.

### Example 2: 2007 Iran NIE showed probability and confidence in the same product

- **Claim:**The 2007 Iran NIE is a useful example of stating confidence levels across separate judgments.

- **Evidence:**The declassified NIE differentiates judgments about halted weaponization, enrichment, intent, and future decisions.

- **Source access:**Public declassified key judgments; original classified evidence not available here.

- **Assessment:**The product demonstrates why broad topics should be decomposed into narrower estimates with separate uncertainty.

- **Confidence in assessment:**High.

- **Confidence basis:**Source access: declassified ODNI key judgments; Source reliability: established; Information credibility: primary public document; Author verification: public text checked, classified sourcing not available.

- **Source:**[ODNI, Iran NIE](https://www.dni.gov/files/documents/Newsroom/Reports%20and%20Pubs/20071203_release.pdf).

- **Qualifier / limitation:**Confidence language is not a guarantee of truth. It is a statement about evidentiary strength and analytic basis at the time of the estimate.

## 4. Confidence Is Not Probability

![Article image](https://cdn-images-1.medium.com/max/800/1*PieOUrrsp4VbSGcRInnZpg.png)

Probability answers: “How likely is the judgment?” Confidence answers: “How strong is the basis for the judgment?” Analysts often blur these together. Kent-style discipline keeps them separate.

### Example 1: Iraq WMD showed that high-confidence judgments can still be wrong

- **Claim:**High confidence does not guarantee analytic accuracy if the source base and assumptions are weak.

- **Evidence:**Official retrospective reporting found major problems in prewar Iraq WMD assessments, including unsupported or overstated judgments.

- **Source access:**Official retrospective investigations and public reporting.

- **Assessment:**The case shows why confidence statements must identify source quality, access, corroboration, and assumption sensitivity.

- **Confidence in assessment:**High.

- **Confidence basis:**Source access: official retrospective investigations; Source reliability: established; Information credibility: corroborated for failure finding; Author verification: public reports checked, original intelligence not available.

- **Sources:**[WMD Commission report](https://www.govinfo.gov/content/pkg/GPO-WMD/pdf/GPO-WMD.pdf);[Senate Select Committee conclusions via GlobalSecurity mirror](https://www.globalsecurity.org/intell/library/congress/2004_rpt/iraq-wmd_intell_09jul2004_conclusions.htm).

- **Qualifier / limitation:**This does not mean confidence language is useless. It means confidence must be earned and explained.

**Kent-style analysts should ask:**

- What are the strongest sources?

- Which sources are single points of failure?

- What assumptions connect the evidence to the judgment?

- What reporting contradicts the judgment?

- What evidence would reduce confidence?

### Example 2: CTI malware behavior can be high confidence while intent remains moderate confidence

- **Claim:**A CTI product can have high confidence in technical behavior and lower confidence in actor intent.

- **Evidence:**Mandiant reporting ties WannaCry to SMBv1/TCP 445 propagation and EternalBlue/MS17–010 exploitation. The U.S. Department of Justice later alleged that a North Korean regime-backed programmer connected to Lazarus Group activity participated in creating the malware used in the WannaCry 2.0 attack.

- **Source access:**Mandiant malware analysis reported technical behavior; DOJ charged/alleged DPRK-linked involvement and provided public attribution material; not author-observed here.

- **Assessment:**Analysts should assign separate confidence to malware behavior, actor clustering, government attribution, and intent. Government attribution does not remove the need to distinguish technical behavior from strategic motivation.

- **Confidence in assessment:**High.

- **Confidence basis:**Source access: Mandiant malware analysis and DOJ charging/public attribution material; Source reliability: established; Information credibility: high for SMB/MS17–010 behavior, established public government attribution exists, inferred for intent and internal tasking; Author verification: public reporting checked, no independent malware analysis here.

- **Sources:**[Mandiant, WannaCry malware profile](https://cloud.google.com/blog/topics/threat-intelligence/wannacry-malware-profile);[Mandiant, WannaCry use of EternalBlue](https://cloud.google.com/blog/topics/threat-intelligence/smb-exploited-wannacry-use-of-eternalblue/);[DOJ, North Korean regime-backed programmer charged](https://www.justice.gov/archives/opa/pr/north-korean-regime-backed-programmer-charged-conspiracy-conduct-multiple-cyber-attacks-and).

- **Qualifier / limitation:**This article does not independently adjudicate the DPRK/Lazarus attribution. It uses the case to show how post-attribution CTI should still separate behavior, attribution, and intent.

## 5. Alternative Hypotheses

![Article image](https://cdn-images-1.medium.com/max/800/1*OgBOQ_0sgEge7IwPdLOr7g.png)

Kent-style analysis does not require analysts to treat all hypotheses as equally plausible. It does require analysts to ask what else could explain the evidence and what collection would discriminate between explanations.

### Example 1: 9/11 warning failure showed the cost of narrow imagination

- **Claim:**The 9/11 case illustrates why warning analysis needs alternative hypotheses before a threat becomes obvious in hindsight.

- **Evidence:**The 9/11 Commission identified failures of imagination, policy, capabilities, and management.

- **Source access:**Official retrospective commission reporting.

- **Assessment:**A warning product should test competing explanations for fragmentary indicators, including low-frequency but high-impact possibilities.

- **Confidence in assessment:**High for the broad warning lesson; moderate for any reconstructed pre-attack hypothesis set.

- **Confidence basis:**Source access: official retrospective commission reporting; Source reliability: established; Information credibility: corroborated for broad failure categories, illustrative for reconstructed hypotheses; Author verification: public report checked.

- **Sources:**[9/11 Commission Report PDF](https://www.9-11commission.gov/report/911Report.pdf);[Office of Justice Programs summary](https://www.ojp.gov/ncjrs/virtual-library/abstracts/911-commission-report-executive-summary).

- **Qualifier / limitation:**Hindsight makes patterns look cleaner than they appeared at the time. The goal is humility and better warning structure, not retrospective certainty.

**Possible analytic frame before the attack:**

- **H1:**Al-Qaida intended overseas attacks against U.S. interests.

- **H2:**Al-Qaida intended a major attack inside the United States.

- **H3:**Al-Qaida intended aviation-related operations, but the exact target and method were unknown.

- **Discrimination:**travel patterns, flight training, visa anomalies, financial movement, communications, and detainee reporting could have been evaluated as indicators across hypotheses.

### Example 2: NotPetya intent remains an assessed judgment

- **Claim:**NotPetya’s destructive effect is easier to establish publicly than the operators’ internal intent.

- **Evidence:**Microsoft reported destructive behavior and enterprise spread; Cisco Talos reported M.E.Doc infrastructure manipulation connected to the outbreak. The UK and U.S. governments publicly attributed NotPetya to the Russian government or Russian military in February 2018, and DOJ later charged GRU Unit 74455 officers in connection with NotPetya and other destructive operations.

- **Source access:**Vendor technical analysis, incident reporting, and public government attribution statements.

- **Assessment:**Destructive effect should be reported separately from strategic intent even after public government attribution exists.

- **Confidence in assessment:**High for destructive effect; moderate for specific intent claims.

- **Confidence basis:**Source access: vendor technical reporting and government attribution statements; Source reliability: established; Information credibility: corroborated for destructive effect, public attribution strengthens actor context, internal intent remains inferred; Author verification: public reports checked, no original telemetry review.

- **Sources:**[Microsoft, NotPetya technical analysis](https://www.microsoft.com/security/blog/2017/10/03/advanced-threat-analytics-security-research-network-technical-analysis-notpetya/);[Cisco Talos, The MeDoc Connection](https://blogs.cisco.com/security/talos/the-medoc-connection);[UK Government, Foreign Office Minister condemns Russia for NotPetya](https://www.gov.uk/government/news/foreign-office-minister-condemns-russia-for-notpetya-attacks);[White House, Statement from the Press Secretary](https://trumpwhitehouse.archives.gov/briefings-statements/statement-press-secretary-25/);[DOJ, Six Russian GRU officers charged](https://www.justice.gov/opa/pr/six-russian-gru-officers-charged-connection-worldwide-deployment-destructive-malware-and).

- **Qualifier / limitation:**Public attribution strengthens the actor context, but it still does not expose every internal objective, command decision, or intended propagation boundary.

**Alternative hypotheses:**

- **H1:**NotPetya was designed as a destructive state operation using ransomware aesthetics as cover.

- **H2:**NotPetya was designed primarily for Ukraine-focused disruption but propagated more broadly than intended.

- **H3:**The ransomware presentation reflected mixed objectives or operational cover rather than a pure financial motive.

The evidence strongly supports destructive effect. It does not publicly prove the internal decision process behind the operation.

## 6. Warning, Indicators, and Collection Gaps

Kent-style analysis is not only retrospective. It should produce warning questions and collection requirements. A judgment with no collection gap is often a judgment that has not been examined carefully enough.

![Article image](https://cdn-images-1.medium.com/max/800/1*XkXGaxgF5xHc8p4jfSAsBg.png)

### Example 1: Cuban Missile Crisis warning depended on collection timing and imagery interpretation

- **Claim:**The Cuban Missile Crisis shows how warning changes as collection improves.

- **Evidence:**Official records describe the October 14, 1962 U-2 mission, subsequent photo interpretation, and identification of MRBM sites under construction.

- **Source access:**Official records and imagery references.

- **Assessment:**Before imagery confirmation, the problem was warning under uncertainty; after imagery, the problem became site status, operational timeline, Soviet intent, and escalation risk.

- **Confidence in assessment:**High.

- **Confidence basis:**Source access: official records and imagery references; Source reliability: established; Information credibility: corroborated; Author verification: public records checked.

- **Sources:**[Office of the Historian, FRUS chronology](https://history.state.gov/historicaldocuments/frus1961-63v11/d16);[DIA photo record](https://www.dia.mil/News-Features/Photo-Gallery/igphoto/2000948884/).

- **Qualifier / limitation:**This is a national-security warning example, not a CTI intrusion case.

**Kent-style warning questions:**

- What indicators would show offensive missile deployment rather than defensive military aid?

- What collection confirms construction status?

- What evidence distinguishes operational missiles from support equipment?

- What is the time horizon before the threat becomes operational?

- What assumptions could cause overreaction or underreaction?

### Example 2: SolarWinds exposed a collection gap in trusted software supply chains

- **Claim:**SolarWinds showed that trusted software updates can create visibility gaps not solved by ordinary IOC matching.

- **Evidence:**CISA and CrowdStrike reporting describe malicious code inserted into a trusted software build and update process.

- **Source access:**Government advisory and vendor technical analysis.

- **Assessment:**The collection gap included build integrity, signed software provenance, vendor trust relationships, and anomalous post-update behavior.

- **Confidence in assessment:**High for the SolarWinds-specific gap; moderate for generalizing across all software supply-chain risk.

- **Confidence basis:**Source access: government advisory and vendor technical analysis; Source reliability: established; Information credibility: corroborated for SolarWinds compromise mechanism, inferred for broader supply-chain lessons; Author verification: public reports checked.

- **Sources:**[CISA AA20–352A](https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a);[CrowdStrike, SUNSPOT](https://www.crowdstrike.com/en-us/blog/sunspot-malware-technical-analysis/).

- **Qualifier / limitation:**A supply-chain compromise does not imply every similar vendor relationship is equally exposed.

## 7. Analytic Integrity in CTI

![Article image](https://cdn-images-1.medium.com/max/800/1*SjsMMnm-vjqrTKTrKl-QUA.png)

CTI reporting often mixes telemetry, malware family names, vendor clusters, infrastructure, attribution, and intent. Analytic integrity means refusing to compress those into a single confident story unless the evidence supports it.

### Example 1: APT1 victimology supports targeting assessment, not observed reconnaissance

- **Claim:**APT1 victimology supports a target-selection assessment, but does not directly prove specific reconnaissance methods.

- **Evidence:**Mandiant reported that APT1 compromised at least 141 organizations across many industries and tied the victimology to Chinese strategic priorities.

- **Source access:**Vendor incident response and technical reporting; public readers do not see the full underlying evidence.

- **Assessment:**Victimology supports deliberate campaign-level targeting, while individual intrusion reconnaissance remains a collection gap unless separate evidence exists.

- **Confidence in assessment:**Moderate.

- **Confidence basis:**Source access: vendor incident response reporting; Source reliability: established vendor; Information credibility: credible but limited public raw data; Author verification: public report checked, underlying case data not available.

- **Source:**[Mandiant, APT1 report](https://www.mandiant.com/sites/default/files/2021-09/mandiant-apt1-report.pdf).

- **Qualifier / limitation:**Victimology alignment is not proof of tasking or pre-compromise research for each victim.

**Kent-style wording:**

- **Reported:**APT1 compromised a large victim set across multiple sectors.

- **Assessed by source:**Victim sectors aligned with strategic economic and policy interests.

- **Inferred by this article:**The campaign likely involved deliberate target selection.

- **Collection gap:**The exact reconnaissance method before each intrusion is not directly shown by victimology alone.

### Example 2: SUNBURST, GoldMax, Sibot, and StellarParticle should not be flattened into one label

- **Claim:**SolarWinds-related reporting requires careful separation of malware, tools, vendor clusters, campaign names, attribution, and intent.

- **Evidence:**Microsoft described GoldMax, GoldFinder, and Sibot as later-stage NOBELIUM tools; CrowdStrike used StellarParticle for related follow-on intrusion activity.

- **Source access:**Vendor technical analysis based on proprietary telemetry and incident response.

- **Assessment:**Treating SUNBURST, SUNSPOT, GoldMax, Sibot, NOBELIUM, StellarParticle, APT29, and COZY BEAR as interchangeable would collapse different analytic layers.

- **Confidence in assessment:**High.

- **Confidence basis:**Source access: vendor technical reporting; Source reliability: established vendors; Information credibility: credible and label-specific; Author verification: public reports checked, cross-vendor clustering not independently verified.

- **Sources:**[Microsoft, GoldMax, GoldFinder, and Sibot](https://www.microsoft.com/en-us/security/blog/2021/03/04/goldmax-goldfinder-sibot-analyzing-nobelium-malware/);[CrowdStrike, StellarParticle observations](https://www.crowdstrike.com/blog/observations-from-the-stellarparticle-campaign/).

- **Qualifier / limitation:**Cross-vendor clustering may be valid, but it should be stated as an assessment with evidence, not assumed from name proximity.

**Kent-style separation:**

- **Malware/tool:**SUNBURST, SUNSPOT, GoldMax, GoldFinder, Sibot.

- **Vendor cluster:**NOBELIUM, StellarParticle, APT29-style community labels.

- **Campaign:**SolarWinds-related intrusion activity.

- **Attribution:**assessed state-linked responsibility.

- **Intent:**intelligence collection, access development, or other objectives.

## Cognitive Biases CTI Analysts Should Name

Kent-style discipline is partly about fighting predictable analytic failure modes. The CIA tradecraft primer emphasizes structured techniques because analysts working with incomplete and ambiguous information are vulnerable to cognitive bias ([CIA, A Tradecraft Primer](https://www.cia.gov/resources/csi/static/Tradecraft-Primer-apr09.pdf)).

![Article image](https://cdn-images-1.medium.com/max/800/1*_MKrRprTzQEF_CJcS2EefA.png)

**Common CTI bias patterns:**

- **Confirmation bias:**treating every new domain, malware string, or infrastructure overlap as support for the actor hypothesis already in the analyst’s head.

- **Anchoring:**giving too much weight to the first vendor label or first incident-response theory, even after better evidence appears.

- **Mirror imaging:**assuming the adversary values risk, cost, publicity, or operational tempo the same way the defender does.

- **Availability bias:**over-weighting the most recent high-profile campaign because it is memorable, not because it best explains the evidence.

- **Groupthink:**converging on a shared attribution label because peer teams or trusted vendors use it, without separately testing the underlying evidence.

Structured analytic techniques are useful because they force friction into the analysis. Alternative hypotheses, key assumptions checks, evidence matrices, and premortems are not bureaucratic decoration; they are bias controls. In CTI, the most practical bias check is simple: before publishing an attribution, write down the strongest evidence against it.

## Where ATT&CK and the Pyramid of Pain Fit

MITRE ATT&CK gives CTI teams a structured vocabulary for adversary tactics and techniques based on real-world observations ([MITRE ATT&CK](https://attack.mitre.org/)). The Pyramid of Pain, associated with David Bianco, explains why higher-level behavioral indicators and TTPs are usually harder for adversaries to change than hashes, IPs, and domains.

![Article image](https://cdn-images-1.medium.com/max/800/1*Avn2HMvyvckpmQTWnsCEiQ.png)

**Kent-style discipline does not replace these frameworks. It tells analysts how to write about them:**

- **Hash, IP, domain:**usually source-observed or reported technical indicators; useful but often perishable and weak for attribution.

- **Host or network artifact:**stronger than a raw IOC when tied to execution context, but still may not identify an actor.

- **ATT&CK technique:**a behavioral claim. It should be mapped only when evidence supports the behavior, not because a malware family is commonly associated with the technique.

- **Tool:**stronger than a hash when supported by reverse engineering, but tool reuse and leaks can complicate attribution.

- **TTP pattern:**stronger for clustering when repeated across time, victims, infrastructure, and tooling.

- **Actor attribution and intent:**assessed judgments. ATT&CK mapping can support them, but does not prove them by itself.

Example: “The intrusion used credential dumping” is a technique-level claim. “This was APT28” is an attribution claim. “The objective was strategic intelligence collection” is an intent claim. They need different evidence and different confidence statements.

## Kent-Style Checklist

Use this checklist before publishing an analytic judgment:

![Article image](https://cdn-images-1.medium.com/max/800/1*kZv6tiN5XkW8yiGJzvSiSA.png)

- **Question:**What decision or intelligence requirement does this answer?

- **Claim:**What exactly are you asserting?

- **Evidence:**What is source-observed, reported, assessed, or inferred?

- **Source access:**Did the source have telemetry, malware samples, logs, imagery, victim access, official records, or secondhand reporting?

- **Source reliability:**Is the source established, unknown, contested, or mixed?

- **Information credibility:**Is the information corroborated, single-source, inferred, or disputed?

- **Author verification:**What did you personally verify?

- **Assumptions:**What must be true for the judgment to hold?

- **Probability:**How likely is the judgment?

- **Confidence:**How strong is the evidence base?

- **Alternatives:**What else could explain the same evidence?

- **Discrimination:**What evidence would separate the hypotheses?

- **Gaps:**What do we still not know?

- **Dissent:**Are there credible disagreements or minority views?

- **Change indicators:**What would cause the assessment to change?

## Practical Analyst Template

```text
Product title:
Primary intelligence requirement:
Decision context:
Analyst:
Date:
Bottom line:
-
 
Assessment:
-
 
Probability language:
-
 
Confidence:
-
 
Scope and time horizon:
Claim:
-
 
Exact claim:
-
 
What this claim does not say:
Evidence base:
-
 
Author-observed:
-
 
Source-observed:
-
 
Reported:
-
 
Assessed by source:
-
 
Inferred by analyst:
Source quality:
-
 
Source access:
-
 
Source reliability:
-
 
Information credibility:
-
 
Corroboration:
-
 
Author verification:
Assumptions:
-
 
Assumption 1:
-
 
Assumption 2:
-
 
Assumption sensitivity:
Alternative hypotheses:
-
 
H1
 
(primary):
-
 
H2
 
(alternative):
-
 
H3
 
(alternative,
 
if
 
needed):
-
 
Discriminating evidence:
-
 
Current preferred hypothesis and why:
Confidence basis:
-
 
Collection strength:
-
 
Collection weakness:
-
 
Analytic uncertainty:
-
 
Dissent or caveats:
Collection requirements:
-
 
Requirement 1:
-
 
Requirement 2:
-
 
Requirement 3:
Indicators to watch:
-
 
Indicator that would increase confidence:
-
 
Indicator that would decrease confidence:
-
 
Indicator that would change the assessment:
Defensive or policy implications:
-
 
Tactical:
-
 
Operational:
-
 
Strategic:
```

## Conclusion

Sherman Kent’s analytic legacy is not a historical curiosity. It is a practical discipline for writing intelligence under uncertainty. For CTI analysts, the lesson is especially important because cyber reporting routinely combines artifacts, telemetry, malware names, infrastructure links, vendor clusters, government statements, victimology, attribution, and intent.

The real-world examples show why the discipline matters:

- Cuban Missile Crisis imagery shows policy-relevant intelligence narrowing uncertainty without replacing policy judgment.

- Iraq WMD analysis shows the danger of converting assumptions into confident conclusions.

- The 2007 Iran NIE shows the value of decomposing a broad issue into separate judgments with separate confidence levels.

- 9/11 warning analysis shows why alternative hypotheses matter before a threat is obvious.

- SolarWinds shows why CTI must separate technical fact, tooling, vendor labels, attribution, and intent.

- APT1 victimology shows how to infer target selection without pretending to observe reconnaissance.

- NotPetya shows why destructive effect and strategic intent must be assessed separately.

Used this way, Kent-style analytic discipline helps CTI analysts produce clearer estimates, better collection requirements, more defensible confidence statements, and fewer overclaims.

## References

- CIA, Sherman Kent, Words of Estimative Probability:[https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-8-no-4/words-of-estimative-probability/](https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-8-no-4/words-of-estimative-probability/)

- CIA, Words of Estimative Probability PDF:[https://www.cia.gov/resources/csi/static/Words-of-Estimative-Probability.pdf](https://www.cia.gov/resources/csi/static/Words-of-Estimative-Probability.pdf)

- CIA, The Intelligence Process: A Digest from Strategic Intelligence by Sherman Kent:[https://www.cia.gov/readingroom/document/cia-rdp78-04718a000600100003-3](https://www.cia.gov/readingroom/document/cia-rdp78-04718a000600100003-3)

- CIA, Sherman Kent and the Profession of Intelligence Analysis:[https://www.cia.gov/resources/csi/static/Kent-Profession-Intel-Analysis.pdf](https://www.cia.gov/resources/csi/static/Kent-Profession-Intel-Analysis.pdf)

- ODNI, Intelligence Community Directive 203: Analytic Standards:[https://www.dni.gov/files/documents/ICD/ICD-203.pdf](https://www.dni.gov/files/documents/ICD/ICD-203.pdf)

- CIA, A Tradecraft Primer: Structured Analytic Techniques for Improving Intelligence Analysis:[https://www.cia.gov/resources/csi/static/Tradecraft-Primer-apr09.pdf](https://www.cia.gov/resources/csi/static/Tradecraft-Primer-apr09.pdf)

- Office of the Historian, Cuban Missile Crisis chronology and U-2 collection:[https://history.state.gov/historicaldocuments/frus1961-63v11/d16](https://history.state.gov/historicaldocuments/frus1961-63v11/d16)

- National Archives, Aerial Photograph of Missiles in Cuba:[https://www.archives.gov/milestone-documents/aerial-photograph-of-missiles-in-cuba](https://www.archives.gov/milestone-documents/aerial-photograph-of-missiles-in-cuba)

- DIA, Cuban Missile Crisis U-2 photo record:[https://www.dia.mil/News-Features/Photo-Gallery/igphoto/2000948884/](https://www.dia.mil/News-Features/Photo-Gallery/igphoto/2000948884/)

- WMD Commission report index:[https://govinfo.library.unt.edu/wmd/report/index.html](https://govinfo.library.unt.edu/wmd/report/index.html)

- WMD Commission report PDF:[https://www.govinfo.gov/content/pkg/GPO-WMD/pdf/GPO-WMD.pdf](https://www.govinfo.gov/content/pkg/GPO-WMD/pdf/GPO-WMD.pdf)

- WMD Commission transmittal letter:[https://govinfo.library.unt.edu/wmd/report/transmittal_letter.html](https://govinfo.library.unt.edu/wmd/report/transmittal_letter.html)

- Senate Select Committee conclusions on Iraq WMD intelligence via GlobalSecurity mirror:[https://www.globalsecurity.org/intell/library/congress/2004_rpt/iraq-wmd_intell_09jul2004_conclusions.htm](https://www.globalsecurity.org/intell/library/congress/2004_rpt/iraq-wmd_intell_09jul2004_conclusions.htm)

- 9/11 Commission Report PDF:[https://www.9-11commission.gov/report/911Report.pdf](https://www.9-11commission.gov/report/911Report.pdf)

- Office of Justice Programs, 9/11 Commission Report summary:[https://www.ojp.gov/ncjrs/virtual-library/abstracts/911-commission-report-executive-summary](https://www.ojp.gov/ncjrs/virtual-library/abstracts/911-commission-report-executive-summary)

- ODNI, Iran: Nuclear Intentions and Capabilities, 2007 NIE:[https://www.dni.gov/files/documents/Newsroom/Reports%20and%20Pubs/20071203_release.pdf](https://www.dni.gov/files/documents/Newsroom/Reports%20and%20Pubs/20071203_release.pdf)

- CIA CSI, CIA Support to Policymakers: The 2007 NIE on Iran’s Nuclear Intentions and Capabilities:[https://www.cia.gov/resources/csi/books-monographs/cia-support-to-policymakers-the-2007-nie-on-irans-nuclear-intentions-and-capabilities/](https://www.cia.gov/resources/csi/books-monographs/cia-support-to-policymakers-the-2007-nie-on-irans-nuclear-intentions-and-capabilities/)

- Mandiant, APT1:[https://www.mandiant.com/sites/default/files/2021-09/mandiant-apt1-report.pdf](https://www.mandiant.com/sites/default/files/2021-09/mandiant-apt1-report.pdf)

- Google Cloud / Mandiant, APT28:[https://cloud.google.com/blog/topics/threat-intelligence/apt28-a-window-into-russias-cyber-espionage-operations](https://cloud.google.com/blog/topics/threat-intelligence/apt28-a-window-into-russias-cyber-espionage-operations)

- CISA, SolarWinds AA20–352A:[https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a)

- CrowdStrike, SUNSPOT:[https://www.crowdstrike.com/en-us/blog/sunspot-malware-technical-analysis/](https://www.crowdstrike.com/en-us/blog/sunspot-malware-technical-analysis/)

- Microsoft, GoldMax, GoldFinder, and Sibot:[https://www.microsoft.com/en-us/security/blog/2021/03/04/goldmax-goldfinder-sibot-analyzing-nobelium-malware/](https://www.microsoft.com/en-us/security/blog/2021/03/04/goldmax-goldfinder-sibot-analyzing-nobelium-malware/)

- CrowdStrike, StellarParticle observations:[https://www.crowdstrike.com/blog/observations-from-the-stellarparticle-campaign/](https://www.crowdstrike.com/blog/observations-from-the-stellarparticle-campaign/)

- MITRE ATT&CK:[https://attack.mitre.org/](https://attack.mitre.org/)

- MITRE, MITRE ATT&CK overview:[https://www.mitre.org/focus-areas/cybersecurity/mitre-attack](https://www.mitre.org/focus-areas/cybersecurity/mitre-attack)

- Sqrrl / David Bianco, A Framework for Cyber Threat Hunting Part 1: The Pyramid of Pain:[https://www.threathunting.net/files/A%20Framework%20for%20Cyber%20Threat%20Hunting%20Part%201_%20The%20Pyramid%20of%20Pain%20_%20Sqrrl.pdf](https://www.threathunting.net/files/A%20Framework%20for%20Cyber%20Threat%20Hunting%20Part%201_%20The%20Pyramid%20of%20Pain%20_%20Sqrrl.pdf)

- Mandiant, WannaCry malware profile:[https://cloud.google.com/blog/topics/threat-intelligence/wannacry-malware-profile](https://cloud.google.com/blog/topics/threat-intelligence/wannacry-malware-profile)

- Mandiant, WannaCry use of EternalBlue:[https://cloud.google.com/blog/topics/threat-intelligence/smb-exploited-wannacry-use-of-eternalblue/](https://cloud.google.com/blog/topics/threat-intelligence/smb-exploited-wannacry-use-of-eternalblue/)

- DOJ, North Korean regime-backed programmer charged in cyber attacks including WannaCry 2.0:[https://www.justice.gov/archives/opa/pr/north-korean-regime-backed-programmer-charged-conspiracy-conduct-multiple-cyber-attacks-and](https://www.justice.gov/archives/opa/pr/north-korean-regime-backed-programmer-charged-conspiracy-conduct-multiple-cyber-attacks-and)

- Microsoft, NotPetya technical analysis:[https://www.microsoft.com/security/blog/2017/10/03/advanced-threat-analytics-security-research-network-technical-analysis-notpetya/](https://www.microsoft.com/security/blog/2017/10/03/advanced-threat-analytics-security-research-network-technical-analysis-notpetya/)

- Cisco Talos, The MeDoc Connection:[https://blogs.cisco.com/security/talos/the-medoc-connection](https://blogs.cisco.com/security/talos/the-medoc-connection)

- UK Government, Foreign Office Minister condemns Russia for NotPetya attacks:[https://www.gov.uk/government/news/foreign-office-minister-condemns-russia-for-notpetya-attacks](https://www.gov.uk/government/news/foreign-office-minister-condemns-russia-for-notpetya-attacks)

- White House, Statement from the Press Secretary on NotPetya:[https://trumpwhitehouse.archives.gov/briefings-statements/statement-press-secretary-25/](https://trumpwhitehouse.archives.gov/briefings-statements/statement-press-secretary-25/)

- DOJ, Six Russian GRU officers charged in connection with destructive malware including NotPetya:[https://www.justice.gov/opa/pr/six-russian-gru-officers-charged-connection-worldwide-deployment-destructive-malware-and](https://www.justice.gov/opa/pr/six-russian-gru-officers-charged-connection-worldwide-deployment-destructive-malware-and)

## Follow for practical cybersecurity research

If you’re interested in**Offensive security,****AI security, real-world attack simulations, CTI, and detection engineering**— this is exactly what I focus on.

Stay connected:

→**Subscribe on Medium:**[medium.com/@1200km](https://medium.com/@1200km)
→**Connect on LinkedIn:**[andrey-pautov](https://www.linkedin.com/in/andrey-pautov/)
→**GitHub — tools & labs:**[github.com/anpa1200](https://github.com/anpa1200)
→**Contact:**[1200km@gmail.com](mailto:1200km@gmail.com)
