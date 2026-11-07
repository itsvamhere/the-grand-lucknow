import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const content = fs.readFileSync(path.join(projectDir, 'upstream_boutique-n1.html'), 'utf8');

const m = content.indexOf('id="svg870196829_4253"');
if (m !== -1) {
  console.log('--- Original svg870196829_4253 in upstream ---');
  console.log(content.substring(m - 50, m + 800));
}
