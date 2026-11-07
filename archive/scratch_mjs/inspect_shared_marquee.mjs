import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/shared-lib.DganPNQZ.mjs', 'utf8');

const matches = [...content.matchAll(/2404\.809|Footer Logo/g)];
matches.forEach(m => {
  console.log(content.substring(Math.max(0, m.index - 200), Math.min(content.length, m.index + 400)));
});
