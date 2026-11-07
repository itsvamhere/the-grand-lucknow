import fs from 'node:fs';

const ways = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/parsed_wide_ways.json', 'utf8'));

console.log('Total ways:', ways.length);
const types = {};
ways.forEach(w => {
  types[w.type] = (types[w.type] || 0) + 1;
});
console.log('Way types:', types);
