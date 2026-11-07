import fs from 'node:fs';

const style = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json', 'utf8'));

const roadLayers = style.layers.filter(l => l.id.includes('road'));
console.log('Road layers details:');
roadLayers.forEach(l => {
  console.log(l.id, {
    minzoom: l.minzoom,
    maxzoom: l.maxzoom,
    color: l.paint?.['line-color'],
    width: l.paint?.['line-width']
  });
});
