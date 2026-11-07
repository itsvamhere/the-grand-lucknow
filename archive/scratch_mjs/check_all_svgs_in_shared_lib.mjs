import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const file = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
const content = fs.readFileSync(file, 'utf8');

const regex = /svg:`<svg[^`]+`/g;
let m;
let count = 0;
while ((m = regex.exec(content)) !== null) {
  count++;
  console.log(`=== SVG Match ${count} ===`);
  console.log(m[0]);
}
