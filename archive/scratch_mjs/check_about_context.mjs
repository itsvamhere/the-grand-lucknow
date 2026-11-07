import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const homeScript = path.join(projectDir, 'scripts', 'IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs');
const content = fs.readFileSync(homeScript, 'utf8');

const targetIdx = content.indexOf('temporary home');
if (targetIdx !== -1) {
  console.log('=== Headline Context ===');
  console.log(content.slice(targetIdx - 150, targetIdx + 200));
}

const targetIdx2 = content.indexOf('head and heart');
if (targetIdx2 !== -1) {
  console.log('=== Paragraphs Context ===');
  console.log(content.slice(targetIdx2 - 100, targetIdx2 + 650));
}
