import fs from 'fs';

const p = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/grand_detailed_style.json';
const style = JSON.parse(fs.readFileSync(p, 'utf8'));

// Enhance the roads & rail styling in the cartography style
style.layers.forEach(l => {
  // 1. Primary Road (Raibareli Rd / NH-24B / Padera-Raebareli Rd)
  if (l.id === 'road_trunk_primary') {
    l.paint['line-color'] = '#8EA3B8'; // Google Maps slate blue for major highway
    l.paint['line-width'] = [
      'interpolate', ['linear'], ['zoom'],
      10, 3,
      13, 6,
      15, 10,
      18, 16
    ];
  }
  if (l.id === 'road_trunk_primary_casing') {
    l.paint['line-color'] = '#768B9E';
    l.paint['line-width'] = [
      'interpolate', ['linear'], ['zoom'],
      10, 4.5,
      13, 8,
      15, 12.5,
      18, 19
    ];
  }

  // 2. Secondary & Tertiary Roads (e.g. Kankaha Rd, Badan Khera Rd, connecting arteries)
  if (l.id === 'road_secondary_tertiary') {
    l.paint['line-color'] = '#FFFFFF';
    l.paint['line-width'] = [
      'interpolate', ['linear'], ['zoom'],
      10, 1.5,
      13, 3.5,
      15, 6,
      18, 11
    ];
  }
  if (l.id === 'road_secondary_tertiary_casing') {
    l.paint['line-color'] = '#D2C3AA';
    l.paint['line-width'] = [
      'interpolate', ['linear'], ['zoom'],
      10, 2.5,
      13, 5,
      15, 8,
      18, 13.5
    ];
  }

  // 3. Minor Village Streets & Local Access Roads
  if (l.id === 'road_minor') {
    l.paint['line-color'] = '#FFFFFF';
    l.paint['line-width'] = [
      'interpolate', ['linear'], ['zoom'],
      11, 1,
      13, 2.2,
      15, 4.5,
      18, 8
    ];
  }
  if (l.id === 'road_minor_casing') {
    l.paint['line-color'] = '#D8CBB6';
    l.paint['line-width'] = [
      'interpolate', ['linear'], ['zoom'],
      11, 1.8,
      13, 3.4,
      15, 6.2,
      18, 10
    ];
  }

  // 4. Railway line (visible on the right of NH-24B in Google Maps)
  if (l.id === 'road_major_rail') {
    l.paint['line-color'] = '#A39480';
    l.paint['line-width'] = [
      'interpolate', ['linear'], ['zoom'],
      10, 1.2,
      13, 2,
      15, 3
    ];
  }
  if (l.id === 'road_major_rail_hatching') {
    l.paint['line-color'] = '#A39480';
  }

  // 5. Waterways
  if (l.id.includes('waterway')) {
    if (l.paint && l.paint['line-color']) {
      l.paint['line-color'] = '#B8D0C8';
    }
  }

  // 6. Parks & Greenery (subtle light mint/cream as in Google Maps)
  if (l.id.includes('park') || l.id.includes('grass') || l.id.includes('wood')) {
    if (l.paint && l.paint['fill-color']) {
      l.paint['fill-color'] = '#E2ECD8';
    }
  }
});

fs.writeFileSync(p, JSON.stringify(style, null, 2), 'utf8');
console.log('Successfully refined road layers in grand_detailed_style.json!');
