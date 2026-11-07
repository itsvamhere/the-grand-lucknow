import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const homeScript = path.join(projectDir, 'scripts', 'IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs');
const content = fs.readFileSync(homeScript, 'utf8');

// Find all matches of vetnlzTno:
const regex = /vetnlzTno:[^,}]+/g;
let m;
while ((m = regex.exec(content)) !== null) {
  console.log(m[0]);
}

// Also search in index.html
const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
const cardNames = ['Venue N°1', 'Venue N°2', 'Venue N°3', 'Venue N°4', 'Venue N°5', 'Venue N°6', 'Venue N°7', 'Venue N°8', 'Venue N°9'];
for (const cn of cardNames) {
  console.log(`[index.html] occurrences of ${cn}:`, (indexHtml.match(new RegExp(cn, 'g')) || []).length);
  console.log(`[homeScript] occurrences of ${cn}:`, (content.match(new RegExp(cn, 'g')) || []).length);
}
