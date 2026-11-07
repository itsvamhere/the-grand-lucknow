import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf8');

const idx = content.indexOf('Squaremeter');
console.log(content.substring(idx - 3500, idx - 2000));
