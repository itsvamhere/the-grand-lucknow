import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const t5 = fs.readFileSync(path.join(projectDir, 'scripts/T5PVEAy5F.D5-RUb5a.mjs'), 'utf-8');

const matches = [...t5.matchAll(/(.{0,50}ParallaxImage.{0,80})/g)];
for (const m of matches) {
  console.log(m[0]);
}

const idx = t5.indexOf('ParallaxImage');
if (idx !== -1) {
  console.log('--- Around ParallaxImage: ---');
  console.log(t5.slice(idx - 200, idx + 400));
}
