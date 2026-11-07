import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

// Find where "Boutique N°1" or "Sticky Header Text" is in upstream
const idx = html.indexOf('Sticky Header Text');
console.log('Sticky Header Text index:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 200, idx + 1000));
}

// Also check Gallery Image 6
const p6Idx = html.indexOf('Gallery Image 6');
console.log('Gallery Image 6 index:', p6Idx);
if (p6Idx !== -1) {
  console.log(html.substring(p6Idx - 200, p6Idx + 600));
}
