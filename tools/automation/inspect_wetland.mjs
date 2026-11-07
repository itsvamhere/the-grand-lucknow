import fs from 'node:fs';

const stylePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json';
const style = JSON.parse(fs.readFileSync(stylePath, 'utf8'));

const wet = style.layers.find(l => l.id === 'landcover_wetland');
console.log('Wetland layer:', wet);
