import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const footer = fs.readFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), 'utf8');

let idx = footer.indexOf('Lay Grotesk');
while (idx !== -1) {
  console.log('Match at:', idx);
  console.log(footer.slice(Math.max(0, idx - 100), Math.min(footer.length, idx + 150)));
  idx = footer.indexOf('Lay Grotesk', idx + 1);
}
