import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const file = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
const content = fs.readFileSync(file, 'utf8');

const targetIdx = content.indexOf('2404.809');
if (targetIdx !== -1) {
  console.log('=== shared-lib 2404.809 ===');
  console.log(content.slice(targetIdx - 200, targetIdx + 400));
}
