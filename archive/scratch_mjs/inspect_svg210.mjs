import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const idx = html.indexOf('svg2102709420_405');
if (idx !== -1) {
  console.log(html.substring(idx - 50, idx + 400));
}
