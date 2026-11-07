import fs from 'node:fs';

const stylePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json';
const style = JSON.parse(fs.readFileSync(stylePath, 'utf8'));

// Maximize road widths so the highway and local streets are big, bold, luxurious ribbons
style.layers.forEach(l => {
  // Motorway / Trunk / Primary (NH30 Raibareli Road)
  if (l.id === 'road_trunk_primary_casing' || l.id === 'road_motorway_casing') {
    l.paint['line-color'] = '#E6D7B6';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 14, 14, 26, 15, 36, 16, 44];
  }
  if (l.id === 'road_trunk_primary' || l.id === 'road_motorway') {
    l.paint['line-color'] = '#FFFAEC';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 10, 14, 18, 15, 26, 16, 32];
  }

  // Secondary & Tertiary roads
  if (l.id === 'road_secondary_tertiary_casing') {
    l.paint['line-color'] = '#E6D7B6';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 10, 14, 18, 15, 24, 16, 30];
  }
  if (l.id === 'road_secondary_tertiary') {
    l.paint['line-color'] = '#FFFAEC';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 7, 14, 13, 15, 18, 16, 22];
  }

  // Minor roads (village connections)
  if (l.id === 'road_minor_casing') {
    l.paint['line-color'] = '#E6D7B6';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 7, 14, 13, 15, 18, 16, 22];
  }
  if (l.id === 'road_minor') {
    l.paint['line-color'] = '#FFFAEC';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 4.5, 14, 9, 15, 13, 16, 16];
  }

  // Service tracks & lanes
  if (l.id === 'road_service_track_casing') {
    l.paint['line-color'] = '#E6D7B6';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 5, 14, 9, 15, 13, 16, 16];
  }
  if (l.id === 'road_service_track' || l.id === 'road_path_pedestrian') {
    l.paint['line-color'] = '#FFFAEC';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 3, 14, 6, 15, 9, 16, 11];
  }

  // Railway
  if (l.id === 'road_major_rail' || l.id === 'road_transit_rail') {
    l.paint['line-width'] = 5;
    l.paint['line-color'] = '#D2C4A6';
  }
  if (l.id === 'road_major_rail_hatching' || l.id === 'road_transit_rail_hatching') {
    l.paint['line-width'] = 5;
    l.paint['line-color'] = '#D2C4A6';
  }

  // Waterways
  if (l.id.includes('waterway')) {
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 6, 14, 12, 15, 18, 16, 24];
    l.paint['line-color'] = '#F4E5C0';
  }

  // Building footprints (large, clean, warm)
  if (l.id === 'building') {
    l.paint['fill-color'] = '#E6D8B4';
    l.paint['fill-outline-color'] = '#D2C39E';
    l.paint['fill-opacity'] = 0.96;
  }
});

fs.writeFileSync(stylePath, JSON.stringify(style, null, 2), 'utf8');
console.log('Saved maximized road widths to casamomo_lucknow_style.json');
