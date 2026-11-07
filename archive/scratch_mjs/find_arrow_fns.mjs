import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf8');

const matches = [...content.matchAll(/l\(\s*\((?:[a-zA-Z0-9_$,\s]+)\)\s*=>/g)];
console.log('Matches:', matches.map(m => m[0]));
matches.forEach(m => {
  console.log(content.substring(m.index, m.index + 400));
});
