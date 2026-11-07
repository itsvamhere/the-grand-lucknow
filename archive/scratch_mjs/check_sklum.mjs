import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const dp5 = fs.readFileSync(path.join(projectDir, 'scripts/dp5RxapaCfSZDIUmJAPG-pqEe4sCQP3YFN6nZtPiSRo.BJjlHCZa.mjs'), 'utf-8');

const idx = dp5.indexOf('Sklum Chair');
if (idx !== -1) {
  console.log(dp5.slice(idx - 200, idx + 400));
}
