import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const homeScript = path.join(projectDir, 'scripts', 'IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs');
const content = fs.readFileSync(homeScript, 'utf8');

const matches = [...content.matchAll(/(\/images\/[^"'\s`]+)/g)].map(m => m[1]);
console.log('Images in homepage script:', Array.from(new Set(matches)));
