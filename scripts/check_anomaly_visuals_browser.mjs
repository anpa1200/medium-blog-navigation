#!/usr/bin/env node
// Real SVG text geometry, deterministic PNG export and local article checks.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,existsSync,statSync} from 'node:fs';
import {resolve,extname} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {createServer} from 'node:http';
import {createHash} from 'node:crypto';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const arg=(name,fallback)=>process.argv.includes(name)?process.argv[process.argv.indexOf(name)+1]:fallback;
const report=resolve(root,'reports/anomaly-visuals-20260921');mkdirSync(report,{recursive:true});
const {chromium}=await import(pathToFileURL(arg('--playwright','/home/andrey/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs')).href);
const manifest=JSON.parse(readFileSync(resolve(root,'static/research/anomaly-visuals/manifest.json')));
const result={scope:'Local rendered SVG assets and, unless assets-only, embedded article. Not a deployment or new KQL execution.',checked_at:new Date().toISOString(),assets:[],article:[],failures:[],passed:false};
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
let server;
try{
  const page=await browser.newPage({viewport:{width:820,height:1000},deviceScaleFactor:1});
  for(const f of manifest.figures)for(const [variant,a] of Object.entries(f.assets)){
    const file=resolve(root,'static/research/anomaly-visuals',a.name);
    await page.setContent(`<!doctype html><html><body style="margin:0;background:#0b1426">${readFileSync(file,'utf8')}</body></html>`);
    const problems=await page.evaluate(()=>{
      const errors=[],svg=document.querySelector('svg'),vb=svg.viewBox.baseVal;
      if(document.querySelector('parsererror'))errors.push('XML parse error');
      const nodes=[...document.querySelectorAll('text')];
      for(const node of nodes){
        const b=node.getBBox(),limit=Number(node.dataset.maxWidth);
        if(b.width>limit+2||b.x<0||b.y<0||b.x+b.width>vb.width+1||b.y+b.height>vb.height+1)errors.push({text:node.textContent,box:{x:b.x,y:b.y,width:b.width,height:b.height},limit});
      }
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i].getBBox(),b=nodes[j].getBBox();
        if(Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x)>2&&Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y)>2)errors.push({overlap:[nodes[i].textContent,nodes[j].textContent]});
      }
      return errors;
    });
    result.assets.push({figure:f.id,variant,width:a.width,height:a.height,text_overflows:problems});
    if(problems.length)result.failures.push({figure:f.id,variant,problems});
    if(['research-map','family-volumetric','family-graph-relationship','case-storm','credential-dcsync','study-results'].includes(f.id)){
      await page.setViewportSize({width:a.width,height:a.height});
      await page.screenshot({path:resolve(report,`${f.id}-${variant}.png`),fullPage:true});
    }
    if(process.argv.includes('--export-cover')&&f.id==='research-map'&&variant==='desktop'){
      await page.setViewportSize({width:a.width,height:a.height});
      await page.screenshot({path:resolve(root,'static/research/anomaly-visuals/research-map.png'),fullPage:true});
      const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
      writeFileSync(resolve(root,'static/research/anomaly-visuals/cover-provenance.json'),JSON.stringify({source:a.name,source_sha256:digest(readFileSync(file)),png_sha256:digest(readFileSync(resolve(root,'static/research/anomaly-visuals/research-map.png'))),width:a.width,height:a.height},null,2)+'\n');
    }
  }
  // Contact sheets make every desktop/mobile design available for visual review.
  for(let start=0;start<manifest.figures.length;start+=8){
    const rows=manifest.figures.slice(start,start+8);
    await page.setViewportSize({width:1440,height:1000});
    await page.setContent(`<html><body style="margin:0;background:#dce4ef;font-family:Arial"><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:12px">${rows.map(f=>`<div><p>${f.number}. ${f.title}</p><img style="width:100%" src="data:image/svg+xml;base64,${readFileSync(resolve(root,'static/research/anomaly-visuals',f.assets.desktop.name)).toString('base64')}"/></div>`).join('')}</div></body></html>`);
    await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
    await page.screenshot({path:resolve(report,`contact-sheet-${1+start/8}.png`),fullPage:true});
  }
  if(!process.argv.includes('--assets-only')){
    const build=resolve(root,'build'),site=resolve(arg('--site-root','../anomaly-revision-release'));
    const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.woff2':'font/woff2'};
    function local(url){
      const p=decodeURIComponent(new URL(url,'http://localhost').pathname);
      const base=p.startsWith('/articles/')?build:p.startsWith('/assets/')?site:null;if(!base)return null;
      const f=resolve(base,p.startsWith('/articles/')?p.slice(10):p.slice(1));
      if(!f.startsWith(base+'/'))return null;
      for(const q of [f,f+'.html',resolve(f,'index.html')])if(existsSync(q)&&statSync(q).isFile())return q;
      return null;
    }
    server=createServer((req,res)=>{const f=local(req.url);if(!f){res.writeHead(404).end();return;}res.writeHead(200,{'content-type':mime[extname(f)]||'text/plain'}).end(readFileSync(f));});
    await new Promise(ok=>server.listen(0,'127.0.0.1',ok));const origin=`http://127.0.0.1:${server.address().port}`;
    const article=JSON.parse(readFileSync(resolve(root,'src/data/article-catalog.json'))).find(x=>x.id==='90df8b6dea12');
    const path='/articles/read/'+article.local_path+'/';const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/*',route=>{
      const u=new URL(route.request().url());
      if(u.hostname==='1200km.com'&&(u.pathname.startsWith('/assets/')||u.pathname.startsWith('/articles/research/'))){const f=local(u.pathname);if(f)return route.fulfill({path:f,contentType:mime[extname(f)]||'text/plain',headers:{'access-control-allow-origin':'*'}});}
      if(u.origin===origin)return route.continue();
      return route.abort();
    });
    assert.equal((await page.goto(origin+path,{waitUntil:'networkidle'})).status(),200);
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('[data-research-figure]').count(),43);
    assert.equal(await page.locator('details [data-research-figure]').count(),0);
    const historical=page.locator('details').filter({has:page.locator('summary').filter({hasText:'Historical figures from the original edition'})});
    assert.equal(await historical.locator('img').count(),44);
    assert.equal(await page.locator('main pre').count(),10+manifest.figures.filter(f=>f.data).length,'Existing code blocks plus accessible figure data equivalents');
    for(const width of [390,768,1440])for(const theme of ['light','dark']){
      await page.setViewportSize({width,height:900});
      await page.evaluate(t=>{document.documentElement.setAttribute('data-theme',t);document.documentElement.setAttribute('data-site-theme',t);},theme);
      for(const f of manifest.figures){
        const fig=page.locator(`[data-research-figure="${f.id}"]`);await fig.scrollIntoViewIfNeeded();
        await fig.locator('img').evaluate(img=>img.decode());
        const info=await fig.locator('img').evaluate(img=>({width:img.clientWidth,height:img.clientHeight,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,src:img.currentSrc}));
        assert.ok(info.width>0&&info.naturalWidth>0,f.id);
        assert.ok(Math.abs(info.width/info.height-info.naturalWidth/info.naturalHeight)<.02,`Aspect ratio ${width} ${f.id}`);
        assert.ok(width<=1100?info.src.includes('-mobile.svg'):!info.src.includes('-mobile.svg'),f.id);
      }
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Overflow ${width} ${theme}`);
      result.article.push({width,theme,figures_loaded:43,aspect_ratios:true,overflow:false});
    }
    for(const [width,id] of [[1440,'family-graph-relationship'],[1440,'case-storm'],[390,'family-volumetric'],[390,'study-results']]){
      await page.setViewportSize({width,height:1000});const fig=page.locator(`[data-research-figure="${id}"]`);await fig.scrollIntoViewIfNeeded();
      await page.screenshot({path:resolve(report,`article-${id}-${width}.png`)});
    }
    assert.deepEqual(errors,[]);result.article.push({javascript_errors:errors});
  }
  assert.deepEqual(result.failures,[],'SVG text exceeds its declared region');result.passed=true;
}catch(e){result.error=e.stack;process.exitCode=1;}
finally{await browser.close();if(server)await new Promise(ok=>server.close(ok));writeFileSync(resolve(report,process.argv.includes('--assets-only')?'asset-validation.json':'browser-validation.json'),JSON.stringify(result,null,2)+'\n');}
console.log(JSON.stringify({passed:result.passed,assets:result.assets.length,article:result.article,failures:result.failures,error:result.error},null,2));
