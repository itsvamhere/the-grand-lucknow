import fs from 'fs';
import path from 'path';

const origHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html.original', 'utf-8');

// Find card structure in original HTML
const cardMatches = [...origHtml.matchAll(/(.{0,100}(?:Boutique N°|Loft N°|Garden N°|20,000 sq ft|60 sq ft|Details).{0,100})/g)];
console.log(`Original HTML matches: ${cardMatches.length}`);
for (const m of cardMatches.slice(0, 10)) {
  console.log('->', m[0].replace(/\s+/g, ' '));
}
