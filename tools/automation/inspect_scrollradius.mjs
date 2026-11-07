import fs from 'node:fs';

const code = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/ScrollRadius.DdPK9K17.mjs', 'utf8');
console.log('Length:', code.length);
console.log(code.substring(0, 2000));
