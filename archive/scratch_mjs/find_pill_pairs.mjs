import fs from 'fs';

const orig = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html.original', 'utf-8');

// Look for pills or badges that appear in pairs
// In Casa Momo, maybe it had the category ("Boutique", "Loft") and the name ("Open Earth", "Grassland Gala")?
// Let's check!
const matches = [...orig.matchAll(/(.{0,80}(?:Boutique|Loft|Garden|Urban).{0,40}(?:Boutique|Loft|Garden|Urban|Open Earth|Grassland|Ballroom|Dining|Mandap|Courtyard).{0,80})/gi)];
console.log(`Matched pairs in original: ${matches.length}`);
for (const m of matches.slice(0, 10)) {
  console.log('->', m[0].replace(/\s+/g, ' '));
}
