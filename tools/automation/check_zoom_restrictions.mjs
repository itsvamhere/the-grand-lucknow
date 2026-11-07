import fs from 'node:fs';

const style = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json', 'utf8'));

const bLayers = style.layers.filter(l => l.id.includes('building'));
console.log('Building layers:');
console.log(JSON.stringify(bLayers, null, 2));

const landLayers = style.layers.filter(l => l.id.includes('land') || l.id.includes('park'));
console.log('Land layers:');
console.log(JSON.stringify(landLayers.map(l => ({ id: l.id, minzoom: l.minzoom, maxzoom: l.maxzoom })), null, 2));

const roadLayers = style.layers.filter(l => l.id.includes('road'));
console.log('Road layers:');
console.log(JSON.stringify(roadLayers.map(l => ({ id: l.id, minzoom: l.minzoom, maxzoom: l.maxzoom })), null, 2));
