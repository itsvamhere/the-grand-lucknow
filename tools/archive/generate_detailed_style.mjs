import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/liberty_raw.json', 'utf8'));

// Filter out layers we don't want (like raw satellite raster or clutter)
// We want all vector layers: landcover, water, roads (with tunnels/bridges/casings), buildings (3D & 2D), railways, place labels, POIs, road labels
const style = {
  version: 8,
  name: 'Grand Lucknow Warm Detailed',
  glyphs: raw.glyphs,
  sprite: raw.sprite,
  sources: {
    openmaptiles: raw.sources.openmaptiles
  },
  layers: []
};

// Base background layer
style.layers.push({
  id: 'background',
  type: 'background',
  paint: { 'background-color': '#F3ECDD' }
});

for (const layer of raw.layers) {
  if (layer.id === 'background' || layer.id === 'natural_earth') continue;
  
  // Clone layer
  const l = JSON.parse(JSON.stringify(layer));

  // Harmonize colors into warm cream & stone palette
  if (l.paint) {
    // Fill colors
    if (l.paint['fill-color']) {
      if (l.id.includes('park') || l.id.includes('grass') || l.id.includes('wood')) {
        l.paint['fill-color'] = '#E6DECA';
      } else if (l.id.includes('water')) {
        l.paint['fill-color'] = '#D2DFCE';
      } else if (l.id.includes('residential')) {
        l.paint['fill-color'] = '#ECE3D0';
      } else if (l.id.includes('building')) {
        l.paint['fill-color'] = '#E4D9C3';
      } else if (l.id.includes('pitch') || l.id.includes('track') || l.id.includes('cemetery') || l.id.includes('school') || l.id.includes('hospital')) {
        l.paint['fill-color'] = '#EAE1CE';
      } else {
        l.paint['fill-color'] = '#EBE2D0';
      }
    }

    // Line colors (roads, rails, waterways)
    if (l.paint['line-color']) {
      if (l.id.includes('water')) {
        l.paint['line-color'] = '#C2D4BE';
      } else if (l.id.includes('rail')) {
        l.paint['line-color'] = '#C4B49C';
      } else if (l.id.includes('casing')) {
        l.paint['line-color'] = '#D5C4AA';
      } else if (l.id.includes('motorway') || l.id.includes('trunk') || l.id.includes('primary')) {
        l.paint['line-color'] = '#E8D9BF';
      } else if (l.id.includes('secondary') || l.id.includes('tertiary')) {
        l.paint['line-color'] = '#F2E6CE';
      } else {
        l.paint['line-color'] = '#FAF5EB';
      }
    }

    // Fill extrusion (3D buildings)
    if (l.paint['fill-extrusion-color']) {
      l.paint['fill-extrusion-color'] = '#DFD4BE';
    }

    // Text labels (cities, towns, roads)
    if (l.paint['text-color']) {
      l.paint['text-color'] = '#6A5A46';
      l.paint['text-halo-color'] = '#F3ECDD';
      l.paint['text-halo-width'] = 1.8;
    }
  }

  // Adjust minzoom so roads and places show earlier
  if (l.minzoom && l.minzoom > 13.5 && (l.id.includes('road') || l.id.includes('street') || l.id.includes('building'))) {
    l.minzoom = 12.0;
  }

  style.layers.push(l);
}

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/grand_detailed_style.json', JSON.stringify(style), 'utf8');
console.log(`Generated grand_detailed_style.json with ${style.layers.length} layers!`);
