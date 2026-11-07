import fs from 'node:fs';

const lawn = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const idx = lawn.indexOf("txt === '2'");
console.log(lawn.slice(idx - 200, idx + 400));
