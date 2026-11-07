import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

const mwi = fs.readFileSync(path.join(projectDir, 'scripts/MWiDeq9TQ.B91DGIYZ.mjs'), 'utf-8');
const idx = mwi.indexOf('LinkedIn');
if (idx !== -1) {
  console.log('--- MWiDeq9TQ: ---');
  console.log(mwi.slice(idx - 200, idx + 400));
}

const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf-8');
const idx2 = html.indexOf('LinkedIn');
if (idx2 !== -1) {
  console.log('--- index.html: ---');
  console.log(html.slice(idx2 - 200, idx2 + 400));
}
