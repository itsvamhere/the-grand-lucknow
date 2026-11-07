import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

const locIdx = html.indexOf('name="Location Map"');
console.log(html.substring(locIdx, locIdx + 5000));
