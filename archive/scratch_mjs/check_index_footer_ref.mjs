import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const targetIdx = indexHtml.indexOf('#svg870196829_4253');
if (targetIdx !== -1) {
  console.log('=== Reference 1 ===');
  console.log(indexHtml.slice(targetIdx - 200, targetIdx + 200));
}

const targetIdx2 = indexHtml.indexOf('#svg870196829_4253', targetIdx + 1);
if (targetIdx2 !== -1) {
  console.log('=== Reference 2 ===');
  console.log(indexHtml.slice(targetIdx2 - 200, targetIdx2 + 200));
}
