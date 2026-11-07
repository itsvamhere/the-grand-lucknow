import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs', 'utf8');

const idx = content.indexOf('t?.src&&z?');
console.log(content.substring(Math.max(0, idx - 500), Math.min(content.length, idx + 500)));
