import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const t5 = fs.readFileSync(path.join(projectDir, 'scripts/T5PVEAy5F.D5-RUb5a.mjs'), 'utf-8');

const matches = [...t5.matchAll(/([a-zA-Z0-9_$.]+\s*\(N\b|\bN\s*\()/g)];
for (const m of matches) {
  console.log(m[0]);
}
