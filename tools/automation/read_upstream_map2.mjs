import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');
const locIdx = html.indexOf('name="Location Map"');
const snippet2 = html.substring(locIdx + 2000, locIdx + 6000);
console.log(snippet2);
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/upstream_map_snippet2.html', snippet2);
