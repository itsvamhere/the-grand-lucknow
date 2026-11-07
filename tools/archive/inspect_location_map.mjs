import fs from 'fs';
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n1.html', 'utf8');
const startIdx = html.indexOf('data-framer-name="Location Map"');
console.log(html.substring(startIdx - 100, startIdx + 3000));
