import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/dp5RxapaCfSZDIUmJAPG-pqEe4sCQP3YFN6nZtPiSRo.BJjlHCZa.mjs', 'utf8');

const idx = content.indexOf('91291');
console.log(content.substring(Math.max(0, idx - 400), Math.min(content.length, idx + 400)));
