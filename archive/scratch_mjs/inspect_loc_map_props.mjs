import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

const idx = html.indexOf('name="Location Map"');
console.log(html.substring(idx - 1500, idx + 500));
