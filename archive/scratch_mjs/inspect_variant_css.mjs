import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
const lib = fs.readFileSync(sharedLibPath, 'utf8');

['1yl90lf', 'umsvbj', '385mce', '6tqtee', 'b08zsq', '85phcs'].forEach(cls => {
  const re = new RegExp(`\\.framer-v-${cls}[^{]*\\{[^}]+\\}`, 'g');
  const matches = [...lib.matchAll(re)];
  console.log(`\nMatches for .framer-v-${cls}:`);
  matches.forEach(m => console.log(m[0]));
});
