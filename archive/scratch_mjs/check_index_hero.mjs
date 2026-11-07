import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf-8');

const matches = [...html.matchAll(/(.{0,80}(?:Hero Word|framer-gx6kn9|framer-127143z).{0,80})/gi)];
for (const m of matches) {
  console.log('->', m[0]);
}
