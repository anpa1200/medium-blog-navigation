#!/usr/bin/env node
// Verify the actual local embedded build. Does not claim live-site deployment.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFileSync,writeFileSync,existsSync,statSync,mkdirSync} from 'node:fs';
import {resolve,extname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const arg=(name,fallback)=>process.argv.includes(name)?process.argv[process.argv.indexOf(name)+1]:fallback;
const modulePath=arg('--playwright','playwright');
const {chromium}=await import(modulePath.startsWith('/')?pathToFileURL(modulePath).href:modulePath);
const build=resolve(root,'build');
const site=resolve(arg('--site-root','../anomaly-ecosystem-update'));
const shellAssets=new Map();
const report=resolve(root,'reports/anomaly-technical-revision-20260921');
mkdirSync(report,{recursive:true});
const catalog=JSON.parse(readFileSync(resolve(root,'src/data/article-catalog.json')));
const row=catalog.find(x=>x.id==='90df8b6dea12');
const path=`/articles/read/${row.local_path}/`;
const inventory=JSON.parse(readFileSync(resolve(root,'research/anomaly-revision/original-inventory.json')));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.md':'text/plain; charset=utf-8'};
function shellAsset(pathname){
  if(!pathname.startsWith('/assets/'))return null;
  const file=resolve(site,pathname.slice(1));
  if(!file.startsWith(resolve(site,'assets')+'/')||!existsSync(file)||!statSync(file).isFile())return null;
  shellAssets.set(pathname,createHash('sha256').update(readFileSync(file)).digest('hex'));
  return file;
}
function local(url){
  const pathname=decodeURIComponent(new URL(url,'http://localhost').pathname);
  if(pathname.startsWith('/assets/'))return shellAsset(pathname);
  if(!pathname.startsWith('/articles/'))return null;
  const file=resolve(build,pathname.slice(10));
  if(!file.startsWith(build+'/'))return null;
  for(const candidate of [file,file+'.html',resolve(file,'index.html')])if(existsSync(candidate)&&statSync(candidate).isFile())return candidate;
  return null;
}
const server=createServer((req,res)=>{
  const file=local(req.url);
  if(!file){res.writeHead(404).end('Not in local archive');return;}
  res.writeHead(200,{'content-type':mime[extname(file)]||'application/octet-stream','cache-control':'no-store'}).end(readFileSync(file));
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const origin=`http://127.0.0.1:${server.address().port}`;
let browser;
const checks=[],pageErrors=[];
const result={checked_at:new Date().toISOString(),scope:'Local embedded article with read-only main-site shell assets; not a full main-site build or deployment.',shell_asset_root:site,checks,page_errors:pageErrors,screenshots:[],passed:false};
try{
  browser=await chromium.launch({executablePath:arg('--chrome','/usr/bin/google-chrome'),headless:true,args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>pageErrors.push(e.message));
  await page.route('**/*',route=>{
    const r=route.request(),u=new URL(r.url());
    if(u.hostname==='1200km.com'&&u.pathname.startsWith('/assets/')){
      const file=shellAsset(decodeURIComponent(u.pathname));
      if(file)return route.fulfill({path:file,contentType:mime[extname(file)]||'application/octet-stream',headers:{'access-control-allow-origin':origin}});
    }
    if(u.origin===origin||(r.resourceType()==='image'&&u.hostname==='cdn-images-1.medium.com'))return route.continue();
    return route.abort();
  });
  const response=await page.goto(origin+path,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('.site-header')).position==='sticky'||getComputedStyle(document.querySelector('.site-header')).position==='fixed');
  assert.equal(response.status(),200);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),`https://1200km.com${path}`);
  for(const id of inventory.anchors)assert.equal(await page.locator(`[id="${id}"]`).count(),1,`Missing or duplicated historical anchor ${id}`);
  checks.push('HTTP 200, one H1, preserved self-canonical and all 153 historical anchors.');
  const preCount=await page.locator('main pre').count()-await page.locator('.anomaly-figure-transcript pre').count();
  assert.equal(preCount,10);
  checks.push('Eight rendered KQL examples and two reproduction commands.');
  const historical=page.locator('details').filter({hasText:'Historical figures from the original edition'});
  assert.equal(await historical.count(),1);
  assert.equal(await historical.getAttribute('open'),null);
  assert.equal(await historical.locator('img').count(),44);
  assert.equal(await page.locator('[data-research-figure]').count(),43);
  checks.push('44 superseded images retained; 43 new figures are inline with their own evidence labels.');
  const downloads=await page.locator('main a[href*="/articles/research/"]').evaluateAll(nodes=>[...new Set(nodes.map(n=>n.href))]);
  for(const url of downloads){
    const remote=new URL(url),response=await fetch(origin+remote.pathname);
    assert.equal(response.status,200,remote.pathname);
    const bytes=Buffer.from(await response.arrayBuffer());
    const file=local(remote.pathname);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),createHash('sha256').update(readFileSync(file)).digest('hex'));
  }
  checks.push(`${downloads.length} linked research artifacts return 200 and match the local build byte-for-byte.`);
  await page.screenshot({path:resolve(report,'article-desktop.png')});result.screenshots.push('article-desktop.png');
  await page.locator('table').filter({hasText:'Public lab recording'}).scrollIntoViewIfNeeded();
  await page.screenshot({path:resolve(report,'validation-evidence-desktop.png')});result.screenshots.push('validation-evidence-desktop.png');
  for(const width of [390,768,1440]){
    await page.setViewportSize({width,height:900});
    await page.locator('table').filter({hasText:'entity-mad-gated'}).scrollIntoViewIfNeeded();
    const sizes=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
    assert.ok(sizes.scroll<=sizes.width+1,`Page overflow at ${width}px: ${JSON.stringify(sizes)}`);
    if(width===390){
      await page.screenshot({path:resolve(report,'statistical-study-mobile.png')});result.screenshots.push('statistical-study-mobile.png');
      const table=page.locator('table').filter({hasText:'entity-mad-gated'});
      const scroll=await table.evaluate(node=>{
        const maximum=node.scrollWidth-node.clientWidth;node.scrollLeft=maximum;
        return {maximum,actual:node.scrollLeft};
      });
      assert.ok(scroll.maximum<=0||scroll.actual>0,'Wide mobile table must be horizontally scrollable, not clipped');
      await page.screenshot({path:resolve(report,'statistical-study-mobile-recall.png')});result.screenshots.push('statistical-study-mobile-recall.png');
      await table.evaluate(node=>{node.scrollLeft=0;});
    }
  }
  checks.push('No page-level horizontal overflow at 390, 768 or 1440 pixels; wide code/tables retain internal scrolling.');
  assert.deepEqual(pageErrors,[]);
  checks.push('No uncaught browser JavaScript errors.');
  result.passed=true;
}catch(e){result.error=e.stack;process.exitCode=1;}
finally{
  if(browser)await browser.close();
  await new Promise(ok=>server.close(ok));
  result.shell_asset_sha256=Object.fromEntries(shellAssets);
  writeFileSync(resolve(report,'browser-validation.json'),JSON.stringify(result,null,2)+'\n');
}
console.log(JSON.stringify(result,null,2));
