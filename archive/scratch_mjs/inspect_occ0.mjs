import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const m = html.indexOf("y=\"22.5\" text-anchor=\"middle\"");
if (m !== -1) {
  console.log(html.substring(m - 300, m + 200));
}
