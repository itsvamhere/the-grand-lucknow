import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const file = path.join(projectDir, 'scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs');

const c = fs.readFileSync(file, 'utf-8');
console.log('File length:', c.length);

// Look for pills or header elements
const matches = [...c.matchAll(/(.{0,80}(?:Pill|Badge|Header|Title|Ballroom|Boutique|Venue N°).{0,80})/gi)];
console.log(`Matches in venue detail: ${matches.length}`);
for (const m of matches.slice(0, 10)) {
  console.log('->', m[0]);
}
