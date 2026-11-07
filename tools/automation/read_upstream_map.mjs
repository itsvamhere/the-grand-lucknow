import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');
const locIdx = html.indexOf('name="Location Map"');
console.log('Location Map index:', locIdx);
if (locIdx !== -1) {
  const snippet = html.substring(locIdx, locIdx + 4000);
  console.log(snippet);
  fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/upstream_map_snippet.html', snippet);
}
