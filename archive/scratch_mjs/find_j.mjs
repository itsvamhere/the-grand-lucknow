import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf8');

const idx = content.indexOf('J=');
console.log('J= definition:');
console.log(content.substring(idx, idx + 1000));
