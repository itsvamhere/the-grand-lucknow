import fs from 'node:fs';

const style = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json', 'utf8'));

console.log('Total layers:', style.layers.length);
style.layers.forEach((l, idx) => {
  console.log(`${idx}: id="${l.id}", source-layer="${l['source-layer']}", type="${l.type}", minzoom=${l.minzoom}, maxzoom=${l.maxzoom}`);
});
