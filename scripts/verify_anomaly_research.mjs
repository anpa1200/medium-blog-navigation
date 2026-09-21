#!/usr/bin/env node
// Reproducible local verification only: no git writes, push or deployment.
import {spawn} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const reportDir = resolve(root, 'reports/anomaly-incidents-20260921');
mkdirSync(reportDir, {recursive: true});
const commands = [
  ['archive', 'npm', ['run', 'validate:archive']],
  ['media-local', 'npm', ['run', 'validate:media:local']],
  ['research-source', 'npm', ['run', 'research:anomalies:check']],
  ...(process.argv.includes('--live') ? [['public-links', 'npm', ['run', 'research:anomalies:links']]] : []),
  ['legacy-build', 'npm', ['run', 'build:legacy']],
  ['embedded-build', 'npm', ['run', 'build:embedded']],
  ['research-rendered', 'node', ['scripts/validate_anomaly_incidents.mjs', '--built']],
  ['whitespace', 'git', ['diff', '--check']],
];
const started = new Date().toISOString();
const results = [];
for (const [name, command, args] of commands) {
  const start = Date.now();
  console.log(`START ${name}: ${command} ${args.join(' ')}`);
  const result = await new Promise(resolveResult => {
    let output = '';
    let settled = false;
    const child = spawn(command, args, {cwd: root, env: {...process.env, CI: 'true', NO_COLOR: '1'}, stdio: ['ignore', 'pipe', 'pipe']});
    for (const stream of [child.stdout, child.stderr]) stream.on('data', chunk => {
      output += chunk;
      process.stdout.write(chunk);
    });
    const finish = (exit_code, error = null) => {
      if (settled) return;
      settled = true;
      writeFileSync(resolve(reportDir, name + '.log'), output + (error ? '\n' + error : ''));
      resolveResult({name, command: [command, ...args], exit_code, error, elapsed_ms: Date.now() - start, log: name + '.log'});
    };
    child.on('error', error => finish(null, error.message));
    child.on('close', (code, signal) => finish(code, signal ? `signal ${signal}` : null));
  });
  results.push(result);
  console.log(`END ${name}: exit=${result.exit_code} elapsed=${result.elapsed_ms}ms`);
  if (result.exit_code !== 0) break;
}
const data = JSON.parse(readFileSync(resolve(root, 'research/anomaly-incidents.json')));
const catalog = JSON.parse(readFileSync(resolve(root, 'src/data/article-catalog.json')));
const paths = ['research/anomaly-incidents.json', 'src/data/article-catalog.json', `docs/articles/${catalog.find(row => row.id === data.article_id).local_path}.md`];
const hashes = Object.fromEntries(paths.map(path => [path, createHash('sha256').update(readFileSync(resolve(root, path))).digest('hex')]));
const report = {started_at: started, completed_at: new Date().toISOString(), deployment_performed: false, source_sha256: hashes, planned_checks: commands.length, results, passed: results.length === commands.length && results.every(result => result.exit_code === 0)};
writeFileSync(resolve(reportDir, 'validation-summary.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`VERIFICATION ${report.passed ? 'PASS' : 'FAIL'}: ${results.filter(result => result.exit_code === 0).length}/${commands.length} checks`);
process.exitCode = report.passed ? 0 : 1;
