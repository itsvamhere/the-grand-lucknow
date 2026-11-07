import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const homeScript = path.join(projectDir, 'scripts', 'IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs');
const content = fs.readFileSync(homeScript, 'utf8');

const targetIdx = content.indexOf('svg870196829');
if (targetIdx !== -1) {
  console.log('=== svg870196829 in homeScript ===');
  console.log(content.slice(targetIdx - 200, targetIdx + 300));
}

// Find any other footer SVGs or mentions of GRAND or footer logo
const matches = [...content.matchAll(/svg[^"'\s`]+/g)].map(m => m[0]);
console.log('SVGs in homeScript:', Array.from(new Set(matches)).slice(0, 10));
