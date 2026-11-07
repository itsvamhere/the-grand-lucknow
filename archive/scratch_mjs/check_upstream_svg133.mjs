import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'upstream_boutique-n1.html'), 'utf8');

const m = html.indexOf('id="svg-1334768056_3843"');
if (m !== -1) {
  console.log(html.substring(m - 50, m + 500));
}
