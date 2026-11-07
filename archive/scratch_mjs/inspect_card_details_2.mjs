import fs from 'fs';

const origHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html.original', 'utf-8');

const idx = origHtml.indexOf('data-framer-name="Details"');
if (idx !== -1) {
  console.log(origHtml.slice(idx + 1000, idx + 2500));
}
