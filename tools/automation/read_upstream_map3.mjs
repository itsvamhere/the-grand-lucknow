import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');
const locIdx = html.indexOf('name="Location Map"');
const afterChips = html.substring(locIdx + 4500, locIdx + 8500);
console.log(afterChips);
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/upstream_map_snippet3.html', afterChips);
