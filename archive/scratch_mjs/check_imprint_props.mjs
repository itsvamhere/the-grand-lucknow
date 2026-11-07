import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const imprint = fs.readFileSync(path.join(projectDir, 'scripts/RLhzQFk4u8SCr1ATTFCwyOJSRszGyzmpaoHYDZIbFNM.CUXFb53O.mjs'), 'utf-8');

// Find all occurrences of text:
const textProps = [...imprint.matchAll(/text:`([^`]+)`/g)];
console.log('text props:', textProps.length);
for (const t of textProps) {
  console.log('->', t[1]);
}

// Find all occurrences of children: `...`
const childrenProps = [...imprint.matchAll(/children:`([^`]+)`/g)];
console.log('children props:', childrenProps.length);
for (const c of childrenProps) {
  console.log('->', c[1]);
}
