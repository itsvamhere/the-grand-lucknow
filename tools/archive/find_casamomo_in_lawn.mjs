import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const lawnHtml = fs.readFileSync(path.join(ROOT, 'venues', 'open-earth-lawn.html'), 'utf8');

let idx = lawnHtml.indexOf('casamomo.at');
while (idx !== -1) {
  console.log('Match at offset:', idx);
  console.log(lawnHtml.slice(Math.max(0, idx - 60), Math.min(lawnHtml.length, idx + 100)));
  idx = lawnHtml.indexOf('casamomo.at', idx + 1);
}
