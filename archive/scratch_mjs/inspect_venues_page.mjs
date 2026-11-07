import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const content = fs.readFileSync(path.join(projectDir, 'scripts', 'fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs'), 'utf8');

const matches = [...content.matchAll(/text:([`"'])([\s\S]*?)\1/g)];
console.log('Found', matches.length, 'texts in /venues:');
for (const m of matches) {
  console.log('---');
  console.log(m[2]);
}

const imgs = [...content.matchAll(/https:\/\/framerusercontent\.com\/images\/[^"'&?]+/g)].map(m => m[0]);
console.log('Images in /venues page:', [...new Set(imgs)]);
