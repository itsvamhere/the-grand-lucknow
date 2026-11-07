import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf-8');

const matches = [...content.matchAll(/(.{0,80}\bvetnlzTno\b.{0,80})/g)];
for (const m of matches) {
  console.log('->', m[0]);
}
