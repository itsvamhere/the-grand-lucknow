import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');
const locIdx = html.indexOf('name="Location Map"');
const endOfChips = html.indexOf('</div></div></div>', locIdx);
console.log('End of chips at:', endOfChips);
const snippet4 = html.substring(endOfChips, endOfChips + 2000);
console.log(snippet4);
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/upstream_map_snippet4.html', snippet4);
