import fs from 'node:fs';

const style = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json', 'utf8'));

console.log('Sources:', Object.keys(style.sources));

// Check building layers
const buildings = style.layers.filter(l => l.id.includes('build'));
console.log('Building layers:', buildings);

// Check landuse layers
const landuse = style.layers.filter(l => l.id.includes('landuse') || l.id.includes('landcover'));
console.log('Landuse layers:', landuse.map(l => ({ id: l.id, minzoom: l.minzoom, maxzoom: l.maxzoom, color: l.paint?.['fill-color'] })));

// Check road layers
const roads = style.layers.filter(l => l.id.includes('road'));
console.log('Road layers count:', roads.length);
