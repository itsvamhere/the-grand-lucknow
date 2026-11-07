import fs from 'node:fs';

const ways = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/parsed_wide_ways.json', 'utf8'));
console.log('Sample highway 0:', ways.highways[0]);
