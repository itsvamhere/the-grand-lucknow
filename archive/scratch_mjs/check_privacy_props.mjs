import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const privacy = fs.readFileSync(path.join(projectDir, 'scripts/k8tn8BJfwySqaZWkAYD4XG30F0GcCEX0iKFVF7CmhHc.D8-NMBX-.mjs'), 'utf-8');

const childrenProps = [...privacy.matchAll(/children:`([^`]+)`/g)];
console.log('Privacy children props:', childrenProps.length);
for (const c of childrenProps) {
  console.log('->', c[1]);
}
