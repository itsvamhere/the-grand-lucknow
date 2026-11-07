import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const file = path.join(projectDir, 'scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs');
const c = fs.readFileSync(file, 'utf-8');

const idx = c.indexOf('Sticky Header');
if (idx !== -1) {
  console.log(c.slice(idx - 300, idx + 1000));
}
