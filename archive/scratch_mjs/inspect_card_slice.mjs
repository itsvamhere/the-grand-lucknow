import fs from 'fs';

const origHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html.original', 'utf-8');

// Find a section of the card HTML
const idx = origHtml.indexOf('N°02');
if (idx !== -1) {
  console.log(origHtml.slice(idx - 400, idx + 600));
}
