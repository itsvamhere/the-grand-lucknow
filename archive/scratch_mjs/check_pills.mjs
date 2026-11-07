import fs from 'fs';

const orig = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html.original', 'utf-8');
const curr = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf-8');

// Find all pill-like or filter buttons
const filterMatches = [...orig.matchAll(/(.{0,100}(?:Boutique|Loft|Garden|Urban|All Venues|All Apartments).{0,100})/gi)];
console.log(`Original filter matches: ${filterMatches.length}`);
for (const m of filterMatches.slice(0, 10)) {
  console.log('->', m[0].replace(/\s+/g, ' '));
}

console.log('\n--- Current matches in index.html ---');
const currMatches = [...curr.matchAll(/(.{0,100}(?:Grand Ballroom|Venue N°).{0,100})/gi)];
for (const m of currMatches.slice(0, 10)) {
  console.log('->', m[0].replace(/\s+/g, ' '));
}
