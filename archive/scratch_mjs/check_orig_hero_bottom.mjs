import fs from 'fs';

const origHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html.original', 'utf-8');

const idx = origHtml.indexOf('framer-name="Hero"');
if (idx !== -1) {
  console.log(origHtml.slice(idx + 1800, idx + 4500));
}
