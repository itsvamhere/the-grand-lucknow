import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
const s = fs.readFileSync(sharedLibPath, 'utf8');

const matches = [...s.matchAll(/backgroundColor:[^}]*8ecd7124-9686-4bd8-bf72-4f81314652d2[^}]*\}/g)];
console.log('Matches:', matches.length);
matches.forEach((m, i) => {
  const start = Math.max(0, m.index - 200);
  const end = Math.min(s.length, m.index + 300);
  console.log(`\n=== Match ${i} ===`);
  console.log(s.substring(start, end));
});
