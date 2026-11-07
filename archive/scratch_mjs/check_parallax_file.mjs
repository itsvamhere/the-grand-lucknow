import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const pImg = fs.readFileSync(path.join(projectDir, 'scripts/ParallaxImage.B0avVUfL.mjs'), 'utf-8');

console.log('ParallaxImage length:', pImg.length);
console.log(pImg.slice(0, 1000));
