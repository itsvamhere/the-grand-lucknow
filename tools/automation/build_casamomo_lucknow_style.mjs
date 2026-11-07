import fs from 'node:fs';

const origStyle = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/grand_detailed_style.json', 'utf8'));

// Clone style
const style = JSON.parse(JSON.stringify(origStyle));

// 1. Remove all symbol/text layers to keep map 100% clean and minimal like Casa Momo
style.layers = style.layers.filter(l => l.type !== 'symbol');

// 2. Exact Casa Momo sampled colors:
const BG_COLOR = '#FFF0CA';       // 62.2% in original Casa Momo
const ROAD_WHITE = '#FFFAEC';     // 20.5% in original Casa Momo
const CASING_COLOR = '#EADBBD';   // soft warm edge
const BLOCK_COLOR = '#F0E2BD';    // 11.8% in original Casa Momo (buildings/blocks)
const WATER_COLOR = '#F5E7C4';    // 4.2% in original Casa Momo
const PARK_COLOR = '#F0E4C3';     // subtle landcover
const RAIL_COLOR = '#D7CBB0';     // railway line

style.layers.forEach(layer => {
  const id = layer.id;
  const p = layer.paint || {};

  // Background
  if (layer.type === 'background') {
    p['background-color'] = BG_COLOR;
  }

  // Water
  if (id.includes('water') || id.includes('river') || id.includes('canal') || id.includes('ocean')) {
    if (layer.type === 'fill') {
      p['fill-color'] = WATER_COLOR;
      p['fill-opacity'] = 0.9;
    } else if (layer.type === 'line') {
      p['line-color'] = WATER_COLOR;
      p['line-width'] = 6;
    }
  }

  // Landuse, parks, residential
  else if (id.includes('park') || id.includes('landuse') || id.includes('landcover') || id.includes('wood') || id.includes('grass')) {
    if (layer.type === 'fill') {
      p['fill-color'] = PARK_COLOR;
      p['fill-opacity'] = 0.8;
    }
  }

  // Buildings & urban blocks
  else if (id.includes('building')) {
    if (layer.type === 'fill') {
      p['fill-color'] = BLOCK_COLOR;
      p['fill-opacity'] = 0.85;
    }
  }

  // Railways
  else if (id.includes('rail')) {
    if (layer.type === 'line') {
      p['line-color'] = RAIL_COLOR;
      p['line-width'] = 2.2;
      p['line-dasharray'] = [3, 3];
    }
  }

  // Roads - Casings
  else if (id.includes('casing')) {
    if (layer.type === 'line') {
      p['line-color'] = CASING_COLOR;
      p['line-opacity'] = 0.8;
      // Boost width so roads look confident and smooth
      if (id.includes('trunk') || id.includes('motorway') || id.includes('primary')) {
        p['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 6, 13, 10, 15, 16];
      } else if (id.includes('secondary') || id.includes('tertiary')) {
        p['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 4, 13, 7, 15, 11];
      } else {
        p['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 2.5, 13, 4.5, 15, 8];
      }
    }
  }

  // Roads - Core fill
  else if (id.includes('road') || id.includes('highway') || id.includes('transportation')) {
    if (layer.type === 'line') {
      p['line-color'] = ROAD_WHITE;
      p['line-opacity'] = 1.0;
      if (id.includes('trunk') || id.includes('motorway') || id.includes('primary')) {
        p['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 4, 13, 7, 15, 12];
      } else if (id.includes('secondary') || id.includes('tertiary')) {
        p['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 2.8, 13, 5, 15, 8];
      } else {
        p['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 1.8, 13, 3, 15, 5.5];
      }
    }
  }
});

const outPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json';
fs.writeFileSync(outPath, JSON.stringify(style, null, 2), 'utf8');
console.log('Successfully written casamomo_lucknow_style.json with', style.layers.length, 'clean vector layers!');
