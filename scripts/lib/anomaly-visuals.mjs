// Deterministic, dependency-free SVG renderer. Assets contain no scripts,
// remote fonts, external images or embedded HTML.
import {figures} from '../../research/anomaly-visuals/figures.mjs';
export const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const colors = {bg:'#0b1426', panel:'#14233b', ink:'#f3f7ff', muted:'#c4d2e8', line:'#52708f', blue:'#8cbcff', teal:'#68e0cb', amber:'#ffcd7a', red:'#ff9ca7'};
// Reserve width for bold glyphs and font-platform differences. Browser geometry
// tests check actual rendered bounds as well as this conservative line layout.
const estimate = (value, size) => [...value].reduce((n,c) => n + (/[^\u0000-\u007f]/.test(c) ? .7 : /[ilI.,:;'|! ]/.test(c) ? .3 : /[MW@%]/.test(c) ? .92 : /[A-Z0-9]/.test(c) ? .66 : .55), 0) * size * 1.1;
export function wrap(value, width, size) {
  const lines=[]; let line='';
  for (const word of String(value).split(/\s+/)) {
    if (estimate((line ? line+' ' : '')+word,size) <= width) {line+=(line?' ':'')+word;continue;}
    if(line){lines.push(line);line='';}
    if(estimate(word,size)>width){
      let part=''; for(const c of word){if(estimate(part+c,size)>width){lines.push(part);part='';}part+=c;}line=part;
    } else line=word;
  }
  if(line)lines.push(line);return lines;
}
export function renderFigure(f, mobile=false) {
  const W=mobile?400:800, M=mobile?22:30, inner=W-M*2, font=mobile?18:22, gap=mobile?16:20;
  let y=26, svg=[];
  const rect=(x,y,w,h,fill=colors.panel,stroke='none',dash=false)=>svg.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${stroke}"${dash?' stroke-dasharray="7 5"':''}/>`);
  const line=(x1,y1,x2,y2,color=colors.line,dash=false)=>svg.push(`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${color}" stroke-width="2.5" fill="none"${dash?' stroke-dasharray="6 5"':''}/>`);
  const circle=(cx,cy,r,fill,stroke='none')=>svg.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`);
  const height=(text,w,size=font)=>wrap(text,w,size).length*size*1.4;
  function text(value,x,top,w,size=font,color=colors.ink,weight=400){
    const rows=wrap(value,w-3,size),h=rows.length*size*1.4;
    svg.push(`<text x="${x}" y="${top+size}" fill="${color}" font-size="${size}" font-weight="${weight}" data-max-width="${w}" data-top="${top}" data-bottom="${top+h}">${rows.map((row,i)=>`<tspan x="${x}" dy="${i?size*1.4:0}">${escape(row)}</tspan>`).join('')}</text>`);return h;
  }
  function paragraph(value,size=font,color=colors.muted){y+=text(value,M,y,inner,size,color)+16;}
  function panels(items,columns=mobile?1:2){
    const cols=Math.min(columns,items.length),cw=(inner-(cols-1)*gap)/cols,pad=18;
    for(let i=0;i<items.length;i+=cols){
      const row=items.slice(i,i+cols);
      const hh=Math.max(...row.map(p=>height(p.label,cw-2*pad,font)+height(p.text,cw-2*pad,font)+2*pad+12));
      row.forEach((p,j)=>{
        const x=M+j*(cw+gap),tone=colors[p.tone]||colors.blue;
        rect(x,y,cw,hh,colors.panel,tone,f.kind==='evidence'&&p.tone==='blue');
        const h=text(p.label,x+pad,y+pad,cw-2*pad,font,tone,700);
        text(p.text,x+pad,y+pad+h+12,cw-2*pad,font);
      });y+=hh+gap;
    }
  }
  function arrow(x1,y1,x2,y2,dash=false){
    line(x1,y1,x2,y2,colors.blue,dash);
    if(x1===x2)svg.push(`<path d="M${x2-5} ${y2-7} L${x2} ${y2} L${x2+5} ${y2-7}" stroke="${colors.blue}" stroke-width="2" fill="none"/>`);
    else svg.push(`<path d="M${x2-7} ${y2-5} L${x2} ${y2} L${x2-7} ${y2+5}" stroke="${colors.blue}" stroke-width="2" fill="none"/>`);
  }
  function flow(steps){
    const cols=mobile?1:steps.length>3?2:steps.length,cw=(inner-(cols-1)*28)/cols,pad=15,rows=Math.ceil(steps.length/cols),rowGap=44;
    const hh=Math.max(...steps.map(p=>height(p.label,cw-2*pad,font)+height(p.text||'',cw-2*pad,font)+2*pad+12));
    steps.forEach((p,i)=>{
      const col=i%cols,row=Math.floor(i/cols),x=M+col*(cw+28),yy=y+row*(hh+rowGap);
      rect(x,yy,cw,hh,colors.panel,colors.blue);
      const h=text(p.label,x+pad,yy+pad,cw-2*pad,font,colors.blue,700);
      if(p.text)text(p.text,x+pad,yy+pad+h+12,cw-2*pad,font);
      if(i<steps.length-1){
        if(col<cols-1)arrow(x+cw+4,yy+hh/2,x+cw+24,yy+hh/2);
        else if(cols===1)arrow(W/2,yy+hh+4,W/2,yy+hh+rowGap-4);
        else {
          const nextX=M+cw/2,mid=yy+hh+rowGap/2;
          line(x+cw/2,yy+hh+4,x+cw/2,mid,colors.blue);
          line(x+cw/2,mid,nextX,mid,colors.blue);
          arrow(nextX,mid,nextX,yy+hh+rowGap-4);
        }
      }
    });y+=rows*hh+(rows-1)*rowGap+24;
  }
  function bars(data,{max=100,suffix='%',labelKey='label',valueKey='value'}={}){
    for(const r of data){
      y+=text(`${r[labelKey]} · ${r[valueKey]}${suffix}`,M,y,inner,font,colors.ink,600)+8;
      rect(M,y,inner,16,colors.panel);
      if(r[valueKey]>0)rect(M,y,inner*r[valueKey]/max,16,r.color||colors.blue);
      y+=34;
    }
  }
  function schematic(f){
    const mode=f.motif;
    if(['sequence','network','lineage','state','absence','correlation'].includes(mode)){
      flow(f.labels.map(label=>({label})));
      if(mode==='lineage')paragraph('Read each arrow as a parent → child relationship. The third node is a descendant of the first.',font);
      if(mode==='absence')paragraph('The gap is an observation problem until independent health evidence explains it.',font);
      if(mode==='correlation')paragraph('Join on entity keys and time constraints—not proximity alone.',font);
      return;
    }
    const h=mode==='graph'?245:200;
    rect(M,y,inner,h);
    const top=y;
    if(mode==='volume'){
      const values=[.22,.29,.25,.31,.24,.85,.3],bw=(inner-52)/values.length;
      values.forEach((v,i)=>rect(M+26+i*bw,top+140-v*100,bw-12,v*100,i===5?colors.amber:colors.blue));
      line(M+20,top+142,W-M-20,top+142);
      text('Aligned observation windows →',M+20,top+158,inner-40,mobile?16:20,colors.muted);
    } else if(mode==='rate'){
      [3,9].forEach((n,row)=>{
        text(row?'Window B':'Window A',M+18,top+20+row*72,inner-36,mobile?16:20,colors.muted);
        for(let i=0;i<n;i++)circle(M+26+i*(inner-50)/9,top+65+row*72,6,row?colors.amber:colors.blue);
      });
      text('Equal duration; dots represent events.',M+18,top+160,inner-36,mobile?15:18,colors.muted);
    } else if(mode==='time'){
      rect(M+22,top+62,inner-44,40,'#233653');
      rect(M+22+(inner-44)*.23,top+62,(inner-44)*.4,40,'#216057');
      circle(M+22+(inner-44)*.84,top+82,10,colors.amber);
      text('Usual schedule band + event outside it',M+20,top+125,inner-40,font,colors.muted);
    } else if(mode==='peers'){
      for(let i=0;i<12;i++)circle(M+30+(i%6)*(inner-60)/5,top+50+Math.floor(i/6)*45,9,i===11?colors.amber:colors.blue);
      text('Define cohort membership before comparing.',M+20,top+128,inner-40,font,colors.muted);
    } else if(mode==='graph'){
      const a={x:M+45,y:top+85}, b={x:W-M-45,y:top+50}, c={x:W-M-45,y:top+140};
      arrow(a.x+13,a.y,b.x-13,b.y);arrow(a.x+13,a.y,c.x-13,c.y,true);
      for(const p of [a,b,c])circle(p.x,p.y,12,p===c?colors.amber:colors.blue);
      text('Observed relationship',M+20,top+170,inner-40,font,colors.blue);
      text('Dashed: new relationship to review',M+20,top+204,inner-40,mobile?16:20,colors.amber);
    }
    y+=h+14;
    paragraph('Illustrative geometry only; no measured scale or operational threshold.',mobile?15:18);
  }
  y+=text('1200km / DETECTION ENGINEERING',M,y,inner,mobile?14:16,colors.teal,700)+14;
  y+=text(f.title,M,y,inner,mobile?30:38,colors.ink,700)+14;
  if(f.subtitle)y+=text(f.subtitle,M,y,inner,font,colors.muted)+12;
  y+=text(f.evidence,M,y,inner,mobile?14:17,colors.amber,700)+22;
  if(f.kind==='flow')flow(f.steps);
  if(f.kind==='family')schematic(f);
  if(f.kind==='forms'){
    // Explanatory glyphs are paired with text rather than being numerical plots.
    const labels=['Point: unusual instance','Context: role / time','Collective: related pattern'];
    labels.forEach((label,i)=>{
      rect(M,y,inner,90);
      text(label,M+14,y+10,inner-28,font,colors.blue,600);
      for(let j=0;j<7;j++)circle(M+24+j*(inner-48)/6,y+64,7,(i===0&&j===5)||(i===2&&j>=4)?colors.amber:colors.blue);
      y+=104;
    });
  }
  if(f.kind==='base-rate'){
    const d=f.data;
    panels([{label:'Benign events',text:`${d.benign.toLocaleString('en-US')} × ${(100*d.fpr).toFixed(0)}% FPR → ${d.fp.toLocaleString('en-US')} false alerts`,tone:'amber'},
      {label:'Malicious events',text:`${d.malicious} × ${(100*d.recall).toFixed(0)}% recall → ${d.tp} true alerts`,tone:'teal'}]);
    paragraph(`Precision = ${d.tp} / (${d.tp} + ${d.fp.toLocaleString('en-US')}) = ${(100*d.precision).toFixed(2)}%`,mobile?23:31,colors.teal);
    paragraph(`False-positive rate = FP / (FP + TN). Precision = TP / (TP + FP).`,font);
  }
  if(f.kind==='entropy')bars(f.data,{max:2,suffix:' bits/character'});
  if(f.kind==='validation'){
    const d=f.data;
    panels([{label:`${d.kqlPassed}/${d.kqlTotal} KQL cases`,text:'Synthetic functional regression cases passed in the recorded engine run.',tone:'teal'},
      {label:`${d.offlinePassed}/${d.offlineTotal} offline checks`,text:'Counterexamples passed. These are not an accuracy estimate.',tone:'teal'}]);
    for(const row of d.replay)panels([{label:row.id,text:`${row.input} input records → ${row.output} query output rows`,tone:row.output?'blue':'amber'}],1);
  }
  if(f.kind==='splits'){
    const d=f.data;
    flow([{label:'TRAIN',text:`Days ${d.training_days.join('–')} · 28 days`},{label:'VALIDATE',text:`Days ${d.validation_days.join('–')} · 14 days`},{label:'FROZEN TEST',text:`Days ${d.test_days.join('–')} · 14 days`}]);
    panels([{label:`${d.entities} entities / ${d.rows} entity-days`,text:`Seed ${d.seed}. No baseline updates during validation or test.`,tone:'blue'},
      {label:'Held-out test labels',text:`${d.positives} generated attack entity-days; ${d.negatives} generated benign entity-days.`,tone:'teal'}]);
  }
  if(f.kind==='results'){
    paragraph('All bars use the same 0–100% scale.',font);
    for(const r of f.data){
      y+=text(r.model,M,y,inner,font+2,colors.ink,700)+8;
      bars([{label:'Precision',value:Number((100*r.precision).toFixed(1)),color:colors.teal},{label:'Recall',value:Number((100*r.recall).toFixed(1)),color:colors.blue}]);
      paragraph(`TP ${r.tp} · FP ${r.fp} · FN ${r.fn} · TN ${r.tn}`,font);
    }
    const u=f.data.find(x=>x.model==='entity-mad'),g=f.data.find(x=>x.model==='entity-mad-gated');
    panels([{label:'Gate trade-off versus entity-MAD',text:`${u.fp-g.fp} fewer false alerts, but ${u.tp-g.tp} fewer true alerts. Recall ${(100*u.recall).toFixed(1)}% → ${(100*g.recall).toFixed(1)}%.`,tone:'amber'}],1);
  }
  if(f.panels)panels(f.panels, f.kind==='evidence'?1:mobile?1:2);
  const bh=height(f.boundary,inner-34,font)+40;
  rect(M,y,inner,bh,'#30283a',colors.amber);
  text(f.boundary,M+17,y+18,inner-34,font,colors.amber,500);y+=bh+22;
  y+=text('Andrey Pautov · 1200km.com · Revised research',M,y,inner,mobile?14:16,colors.muted)+10;
  const H=Math.ceil(y+14);
  const description=[f.caption,...(f.steps||[]).map(s=>`${s.label}: ${s.text}`),...(f.panels||[]).map(p=>`${p.label}: ${p.text}`),f.boundary].join(' ');
  return {width:W,height:H,svg:`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc"><title id="title">${escape(f.title)}</title><desc id="desc">${escape(description)}</desc><rect width="${W}" height="${H}" rx="18" fill="${colors.bg}"/><g font-family="Arial, Helvetica, sans-serif">${svg.join('')}</g></svg>\n`};
}

// Reapply after either article generator. Keep figure insertion outside managed
// incident blocks, and fail on ambiguous anchors rather than guess a placement.
export function insertFigures(markdown) {
  let text=markdown.replace(/^<ResearchFigure id="[a-z0-9-]+" \/>\n\n/gm,'');
  for(const f of figures){
    const idx=text.indexOf(f.before);
    if(idx<0||text.indexOf(f.before,idx+1)!==-1)throw Error(`Missing/ambiguous figure placement: ${f.id}`);
    const point=f.placement==='after-heading'?text.indexOf('\n\n',idx)+2:idx;
    text=text.slice(0,point)+`<ResearchFigure id="${f.id}" />\n\n`+text.slice(point);
  }
  return text;
}
