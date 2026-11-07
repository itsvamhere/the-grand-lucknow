import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const orig = fs.readFileSync(path.join(projectDir, 'index.html.original'), 'utf8');

const targetIdx = orig.indexOf('2404.809');
if (targetIdx !== -1) {
  console.log('=== Original 2404.809 SVG ===');
  console.log(orig.slice(targetIdx - 50, targetIdx + 500));
}
