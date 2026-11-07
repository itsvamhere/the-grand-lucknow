import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const t5 = fs.readFileSync(path.join(projectDir, 'scripts/T5PVEAy5F.D5-RUb5a.mjs'), 'utf-8');

const idx = t5.indexOf('=h(A)');
if (idx !== -1) {
  console.log(t5.slice(idx - 10, idx + 20));
}
