import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const t5 = fs.readFileSync(path.join(projectDir, 'scripts/T5PVEAy5F.D5-RUb5a.mjs'), 'utf-8');

const idx = t5.indexOf('DmkowNNqx:g');
if (idx !== -1) {
  console.log(t5.slice(idx - 200, idx + 400));
} else {
  // search for "image:"
  const matches = [...t5.matchAll(/(.{0,40}image:.{0,40})/g)];
  for (const m of matches) {
    console.log(m[0]);
  }
}
