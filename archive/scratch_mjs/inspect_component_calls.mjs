import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs', 'utf8');

// Find the function name: function Something({ ... })
const idx = content.indexOf('t?.src&&z?');
// Look backwards for function definition
const match = content.substring(idx - 4000, idx).match(/function\s+([A-Za-z0-9_$]+)\s*\(/g);
console.log('Functions defined before this:', match);

// Search for the component name being used
if (match) {
  const lastFn = match[match.length - 1].replace('function ', '').replace('(', '');
  console.log('Likely component name:', lastFn);
  const uses = [...content.matchAll(new RegExp(lastFn, 'g'))];
  console.log(`Used ${uses.length} times in file`);
}
