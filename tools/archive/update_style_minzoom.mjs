import fs from 'fs';

const p = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/grand_detailed_style.json';
const style = JSON.parse(fs.readFileSync(p, 'utf8'));

// Update POI layers minzoom so institutions, colleges, and hospitals appear at zoom 12-14
style.layers.forEach(l => {
  if (l.id.startsWith('poi_')) {
    l.minzoom = 12.0;
  }
  if (l.id.startsWith('label_')) {
    l.minzoom = 11.0;
  }
});

fs.writeFileSync(p, JSON.stringify(style, null, 2), 'utf8');
console.log('Updated POI and label minzooms in grand_detailed_style.json');
