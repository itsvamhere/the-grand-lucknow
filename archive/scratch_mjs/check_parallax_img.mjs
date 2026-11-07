import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const pImg = fs.readFileSync(path.join(projectDir, 'scripts/ParallaxImage.B0avVUfL.mjs'), 'utf-8');

const idx = pImg.indexOf('img');
if (idx !== -1) {
  console.log(pImg.slice(idx - 100, idx + 600));
}
