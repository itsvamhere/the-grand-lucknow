import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const imprint = fs.readFileSync(path.join(projectDir, 'scripts/RLhzQFk4u8SCr1ATTFCwyOJSRszGyzmpaoHYDZIbFNM.CUXFb53O.mjs'), 'utf-8');

// Find all backtick strings of length > 10
const strings = [...imprint.matchAll(/`([^`]{15,300})`/g)].map(m => m[1]);
console.log(`Found ${strings.length} strings in Imprint:`);
for (const s of strings.slice(0, 20)) {
  console.log('->', s.replace(/\n/g, ' '));
}
