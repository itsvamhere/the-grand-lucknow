import fs from 'node:fs';

const style = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json', 'utf8'));

const waterLayers = style.layers.filter(l => l.id.includes('water'));
console.log('Water layers:');
waterLayers.forEach(l => {
  console.log(l.id, {
    type: l.type,
    minzoom: l.minzoom,
    maxzoom: l.maxzoom,
    color: l.paint?.['fill-color'] || l.paint?.['line-color']
  });
});
