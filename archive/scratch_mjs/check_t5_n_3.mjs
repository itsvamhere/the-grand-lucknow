import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const t5 = fs.readFileSync(path.join(projectDir, 'scripts/T5PVEAy5F.D5-RUb5a.mjs'), 'utf-8');

const matches = [...t5.matchAll(/(.{0,50}\bN\b.{0,50})/g)];
for (const m of matches.slice(0, 5)) {
  console.log(m[0]);
}
