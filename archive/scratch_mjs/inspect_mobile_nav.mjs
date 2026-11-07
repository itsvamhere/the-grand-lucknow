import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const m = html.indexOf('data-framer-name="Mobile Navbar"');
if (m !== -1) {
  console.log(html.substring(m - 50, m + 1200));
}
