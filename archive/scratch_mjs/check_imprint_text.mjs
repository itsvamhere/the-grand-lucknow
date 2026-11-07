import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const imprint = fs.readFileSync(path.join(projectDir, 'scripts/RLhzQFk4u8SCr1ATTFCwyOJSRszGyzmpaoHYDZIbFNM.CUXFb53O.mjs'), 'utf-8');

const matches = [...imprint.matchAll(/children:(?:`([^`]+)`|\["([^"]+)"\])/g)];
console.log('Matches:', matches.length);

// Search for any paragraph or text strings
const textMatches = [...imprint.matchAll(/([A-Z][a-zA-Z0-9\s,–.—:;()@+/]{15,120})/g)];
for (const t of textMatches.slice(0, 15)) {
  console.log('->', t[0]);
}
