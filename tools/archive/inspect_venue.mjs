import fs from 'fs';
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n1.html', 'utf8');
const idx = html.indexOf('data-framer-name="Location"');
console.log(html.substring(idx, idx + 4000));
