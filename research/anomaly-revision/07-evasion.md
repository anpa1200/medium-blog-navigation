## 7. How Attackers Suppress Anomaly Visibility

Separate reported tradecraft from untested claims about defeating a specific detector.

| Mechanism | Evidence or analytical implication | What this research does not establish |
|---|---|---|
| Distributed activity | Midnight Blizzard's residential proxies motivate identity-level correlation alongside source-level counts. | That all tenant-local analytics failed or that every source stayed below every threshold. |
| Valid accounts and native tools | Volt Typhoon motivates role, actor and change-context analysis. | That native commands are indistinguishable in every available source, or command lines are the only evidence. |
| In-process behavior | A detector requiring a child process misses activity that does not create one. | That Sysmon image-load or remote-thread events cover every injection mechanism. |
| Low-rate collection | Small transfers can avoid a large-transfer rule; longer windows may expose accumulation. | A measured recall advantage without replay and representative benign traffic. |
| Provider-side activity | Some SaaS transfers bypass a customer's endpoint/perimeter sensors. | That no identity, application, provider or destination evidence exists. |
| Baseline contamination | Including the scored event in training or accepting attacker activity as normal can mask deviations. | That a specific historical actor poisoned a particular model unless a source documents it. |
| Collection interruption | Missing logs reduce observability and may distort statistical denominators. | That a missing event proves deliberate evasion rather than outage, filtering, retention or parser failure. |

The campaign-specific sources and boundaries are in Section 4. For an operational analytic, publish its expected blind spots next to the query—not only in a distant disclaimer.
