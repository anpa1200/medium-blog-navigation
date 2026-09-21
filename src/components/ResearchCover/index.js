import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import cover from '@site/static/research/anomaly-visuals/uploaded-cover-provenance.json';

export default function ResearchCover() {
  const src=useBaseUrl('/research/anomaly-visuals/'+cover.file);
  return <figure className="anomaly-figure" data-research-cover="true">
    <a className="anomaly-figure-image" href={src} target="_self" aria-label="Open full-size research cover">
      <img src={src} width={cover.width} height={cover.height} alt={cover.alt}
        style={{width:'100%',height:'auto'}} loading="eager" fetchPriority="high" decoding="async"/>
    </a>
    <figcaption>{cover.caption}</figcaption>
  </figure>;
}
