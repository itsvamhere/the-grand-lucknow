import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
const s = fs.readFileSync(sharedLibPath, 'utf8');

const matches = [...s.matchAll(/"Dark"|`Dark`|"Phone Dark"|`Phone Dark`/g)];
console.log('Matches:', matches.length);
matches.forEach((m, i) => {
  console.log(`\n[${i}]`, s.substring(m.index - 50, m.index + 150));
});
