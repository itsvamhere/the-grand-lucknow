import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

const idx = html.indexOf('id="apartment-header"');
console.log('apartment-header index:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 1200));
}
