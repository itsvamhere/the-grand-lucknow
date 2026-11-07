import fs from 'node:fs';

const lawn = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const idx = lawn.indexOf("if (txt === '3' || txt === '2' || txt === '4')");
console.log(lawn.slice(idx - 600, idx + 400));
