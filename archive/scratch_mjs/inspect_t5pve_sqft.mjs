import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf8');

const idx = content.indexOf('children:`sqft`');
console.log(content.substring(Math.max(0, idx - 600), Math.min(content.length, idx + 600)));
