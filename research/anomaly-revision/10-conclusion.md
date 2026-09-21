## 10. Conclusion

Documented intrusions show that malicious activity can produce observable deviations. Some investigations, including Storm-0558 and 3CX, report detections that contributed to discovery. Other incident-to-anomaly mappings in this article are retrospective hypotheses, not demonstrations that a proposed rule would have caught the intrusion.

The useful question is not whether an action looks unusual in isolation. It is whether the available telemetry, comparison population and analytic produce evidence that improves an analyst's decision at an acceptable operational cost. A high anomaly score does not establish maliciousness, actor identity or permission to contain a system.

This revision separates source facts, proposed detection logic, functional tests, public lab-recording observations and a synthetic statistical experiment. It preserves negative results and known blind spots. None of those evidence classes alone establishes production precision, incident recall or universal thresholds.

The practical sequence is: **verify collection, define the feature, choose and test the baseline, preserve evidence, evaluate benign alternatives, and measure the decision outcome**. Correlation can improve an investigation, but it must not turn unrelated events into a story or conceal what the detector misses.
