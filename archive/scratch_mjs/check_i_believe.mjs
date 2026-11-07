import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const homeScript = path.join(projectDir, 'scripts', 'IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs');
const content = fs.readFileSync(homeScript, 'utf8');

const targetIdx = content.indexOf('We believe');
if (targetIdx !== -1) {
  console.log('=== Headline Full ===');
  console.log(content.slice(targetIdx - 200, targetIdx + 400));
}
