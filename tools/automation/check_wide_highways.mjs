import fs from 'node:fs';

const ways = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/parsed_wide_ways.json', 'utf8'));

console.log('Highways in parsed_wide_ways:', ways.highways.length);
ways.highways.forEach((h, i) => {
  if (i < 20) {
    console.log(i, h.type, h.name || '(unnamed)', h.points.length, 'points');
  }
});
