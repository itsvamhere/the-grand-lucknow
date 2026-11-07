import fs from 'node:fs';

const lawn = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
console.log('Does open-earth-lawn have svg870196829_4253?', lawn.includes('svg870196829_4253'));
