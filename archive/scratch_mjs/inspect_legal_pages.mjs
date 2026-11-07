import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

const imprint = fs.readFileSync(path.join(projectDir, 'scripts/RLhzQFk4u8SCr1ATTFCwyOJSRszGyzmpaoHYDZIbFNM.CUXFb53O.mjs'), 'utf-8');
console.log('--- Imprint text excerpts ---');
const imprintMatches = [...imprint.matchAll(/children:\[`([^`]{20,200})`\]/g)];
for (const m of imprintMatches.slice(0, 10)) {
  console.log(' ', m[1]);
}

const terms = fs.readFileSync(path.join(projectDir, 'scripts/-DcStZJFIhsBH2N6z7an1MDNvSqrOU1xTseJDDDYkrQ.Cf76yzJq.mjs'), 'utf-8');
console.log('\n--- Terms text excerpts ---');
const termsMatches = [...terms.matchAll(/children:\[`([^`]{20,200})`\]/g)];
for (const m of termsMatches.slice(0, 5)) {
  console.log(' ', m[1]);
}

const privacy = fs.readFileSync(path.join(projectDir, 'scripts/k8tn8BJfwySqaZWkAYD4XG30F0GcCEX0iKFVF7CmhHc.D8-NMBX-.mjs'), 'utf-8');
console.log('\n--- Privacy text excerpts ---');
const privacyMatches = [...privacy.matchAll(/children:\[`([^`]{20,200})`\]/g)];
for (const m of privacyMatches.slice(0, 5)) {
  console.log(' ', m[1]);
}
