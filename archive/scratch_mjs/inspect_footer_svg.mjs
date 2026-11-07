import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const svgIdx = html.indexOf('svg870196829_4253');
if (svgIdx !== -1) {
  console.log('--- Context around svg870196829_4253 in index.html ---');
  console.log(html.substring(svgIdx - 600, svgIdx + 600));
}
