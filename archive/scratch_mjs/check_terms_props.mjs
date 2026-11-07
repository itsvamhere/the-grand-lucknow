import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const terms = fs.readFileSync(path.join(projectDir, 'scripts/-DcStZJFIhsBH2N6z7an1MDNvSqrOU1xTseJDDDYkrQ.Cf76yzJq.mjs'), 'utf-8');

const textProps = [...terms.matchAll(/text:`([^`]+)`/g)];
console.log('Terms text props:', textProps.length);
for (const t of textProps) {
  console.log('->', t[1]);
}

const childrenProps = [...terms.matchAll(/children:`([^`]+)`/g)];
console.log('Terms children props:', childrenProps.length);
for (const c of childrenProps) {
  console.log('->', c[1]);
}
