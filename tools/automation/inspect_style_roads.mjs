import fs from 'node:fs';

const style = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/grand_detailed_style.json', 'utf8'));

console.log('Total layers:', style.layers.length);

const roadLayers = style.layers.filter(l => l.id.includes('road') || l.id.includes('highway') || l.id.includes('transportation'));
console.log('Road layers count:', roadLayers.length);
roadLayers.slice(0, 8).forEach(l => {
  console.log(l.id, l.type, JSON.stringify(l.paint));
});
