import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const fr7 = fs.readFileSync(path.join(projectDir, 'scripts/fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs'), 'utf-8');

console.log('Length of fr7:', fr7.length);

// Search for Boutique or Apartment or card elements
const matches = [...fr7.matchAll(/(.{0,80}(?:Boutique|Apartment|venues|qwHsbwPqfdWdQUSwIKbIkRdc).{0,80})/gi)];
console.log(`Found ${matches.length} matches in fr7:`);
for (const m of matches.slice(0, 15)) {
  console.log('->', m[0].replace(/\s+/g, ' '));
}
