import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs', 'utf8');

// Find function name that returns this component
const idx = content.indexOf('t?.src&&z?');
const before = content.substring(Math.max(0, idx - 2500), idx);
console.log(before);
