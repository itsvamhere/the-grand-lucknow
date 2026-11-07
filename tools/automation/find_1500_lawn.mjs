import fs from 'node:fs';

const lawn = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const matches = lawn.match(/.{0,50}1,500.{0,50}/g) || [];
console.log('Matches in lawn:', matches.slice(0, 10));
