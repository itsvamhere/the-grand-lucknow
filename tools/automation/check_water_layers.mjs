import fs from 'node:fs';

const style = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json', 'utf8'));

const waterLayers = style.layers.filter(l => l.id.includes('water') || l.id.includes('stream') || l.id.includes('canal'));
console.log('Water layers:');
console.log(JSON.stringify(waterLayers, null, 2));
