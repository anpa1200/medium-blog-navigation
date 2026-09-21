import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import manifest from '@site/static/research/anomaly-visuals/manifest.json';

export default function ResearchFigure({id}) {
  const f=manifest.figures.find(item=>item.id===id);
  if(!f)throw new Error(`Unknown research figure: ${id}`);
  const base=useBaseUrl('/research/anomaly-visuals/');
  const desktop=base+f.assets.desktop.name, mobile=base+f.assets.mobile.name;
  return <figure className="anomaly-figure" id={`figure-${id}`} data-research-figure={id}>
    <a className="anomaly-figure-image" href={desktop} target="_self" aria-label={`Open full-size diagram: ${f.title}`}>
      <picture>
        <source media="(max-width: 1100px)" srcSet={mobile} width={f.assets.mobile.width} height={f.assets.mobile.height}/>
        <img src={desktop} width={f.assets.desktop.width} height={f.assets.desktop.height}
          alt={`${f.title}. ${f.caption} ${f.boundary}`} loading={id==='research-map'?'eager':'lazy'} decoding="async"/>
      </picture>
    </a>
    <figcaption><strong>Figure {f.number}. {f.title}.</strong> {f.caption} <span className="anomaly-figure-evidence">{f.evidence}</span>
      <span className="anomaly-figure-sources">Sources: {f.sources.map((s,i)=><React.Fragment key={s.url}>{i>0?' · ':''}<a href={s.url} target={s.url.startsWith('https://1200km.com/')?'_self':'_blank'} rel="noopener noreferrer">{s.label}</a></React.Fragment>)}.</span>
    </figcaption>
    <details className="anomaly-figure-transcript"><summary>Text equivalent and full-size diagram</summary>
      <p>{f.boundary}</p>
      {f.steps&&<ol>{f.steps.map((s,i)=><li key={i}><strong>{s.label}.</strong> {s.text}</li>)}</ol>}
      {f.labels&&<p>Illustrated relationship: {f.labels.join(' → ')}. Schematic, not observed incident data.</p>}
      {f.panels&&<ul>{f.panels.map((p,i)=><li key={i}><strong>{p.label}.</strong> {p.text}</li>)}</ul>}
      {f.data&&<pre aria-label="Exact data used in this diagram">{JSON.stringify(f.data,null,2)}</pre>}
      <p><a href={desktop} target="_self">Open full-size SVG</a>{' · '}<a href={mobile} target="_self">Open narrow-layout SVG</a></p>
    </details>
  </figure>;
}
