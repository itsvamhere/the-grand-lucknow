import fs from 'fs';

const origHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html.original', 'utf-8');

const idx = origHtml.indexOf('data-framer-name="Phone 1"');
if (idx !== -1) {
  console.log(origHtml.slice(idx, idx + 1500));
}
