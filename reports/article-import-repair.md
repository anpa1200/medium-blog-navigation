# Medium import integrity repair

The original Medium HTML exports retain code whitespace and prose boundaries. The importer had inserted a newline between every highlighted text node, stripped spaces around inline elements, and wrapped embedded Markdown with a fence too short for its contents.

This repair replaces source-matched imported blocks and source-derived contextual whitespace only. Frontmatter, catalog IDs, canonical routes, metadata, curated prose additions, example credential substitutions, images, and research components are preserved. The accompanying JSON records the baseline and hashes for every changed article. The separately maintained anomaly research edition keeps all its queries and evidence; only four source-matched citation spaces changed.

The scan covered 203 locally preserved exports and all 194 catalogued article Markdown files. The distinctive token-fragment pattern occurred in 107 article files before repair and none afterward. This signature is a detector for one importer defect, not a count of every broken article. Code fences are balanced throughout the resulting article corpus. The repair also preserves literal application links inside code during same-origin navigation normalization. A fence-aware Docusaurus compatibility preprocessor preserves literal heading IDs inside code while retaining real heading anchors.

Regression tests cover highlighted commands, actual and nested HTML line breaks, nested Markdown fences, inline whitespace and emphasis boundaries, literal code URLs, the corpus fragmentation signature, and rendered source-to-code equality for the reported article and representative adjacent/nested-fence articles. No commands contained in the articles were executed.
