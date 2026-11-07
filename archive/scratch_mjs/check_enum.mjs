import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/AOQA9ZjYa.CwSXFmg7.mjs', 'utf-8');

const matches = [...content.matchAll(/(.{0,80}(?:qw7dqueHF|A7CXMDlgw|Boutique|Grand Ballroom|Loft|Garden|Urban).{0,80})/gi)];
console.log(`Matches in AOQA9ZjYa: ${matches.length}`);
for (const m of matches) {
  console.log('->', m[0]);
}
