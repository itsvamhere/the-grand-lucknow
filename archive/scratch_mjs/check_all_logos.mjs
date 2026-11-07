import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const matches = [...html.matchAll(/data-framer-name="Logo"[\s\S]*?<\/a>/gi)];
console.log('Matches for data-framer-name="Logo":', matches.length);
matches.forEach((m, i) => {
  console.log(`\n=== Logo ${i} ===`);
  console.log(m[0]);
});
