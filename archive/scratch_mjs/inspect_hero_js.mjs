import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const heroJsPath = path.join(projectDir, 'scripts', 'IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs');
const heroJs = fs.readFileSync(heroJsPath, 'utf8');

const matches = [...heroJs.matchAll(/EL PACRE Regular/g)];
console.log('Hero JS EL PACRE Regular occurrences:', matches.length);
matches.forEach(m => {
  console.log(heroJs.substring(m.index - 50, m.index + 200));
});
