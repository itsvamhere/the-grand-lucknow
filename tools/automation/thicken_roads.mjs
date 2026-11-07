import fs from 'node:fs';

const stylePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json';
const style = JSON.parse(fs.readFileSync(stylePath, 'utf8'));

// Thicken and scale all road ribbons for high visual impact and prominence
style.layers.forEach(l => {
  // Motorway / Trunk / Primary (NH30 Raibareli Road)
  if (l.id === 'road_trunk_primary_casing' || l.id === 'road_motorway_casing') {
    l.paint['line-color'] = '#E8DABB';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 10, 14, 18, 15, 24, 16, 30];
  }
  if (l.id === 'road_trunk_primary' || l.id === 'road_motorway') {
    l.paint['line-color'] = '#FFFAEC';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 7, 14, 13, 15, 18, 16, 23];
  }

  // Secondary & Tertiary roads
  if (l.id === 'road_secondary_tertiary_casing') {
    l.paint['line-color'] = '#E8DABB';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 7, 14, 13, 15, 17, 16, 22];
  }
  if (l.id === 'road_secondary_tertiary') {
    l.paint['line-color'] = '#FFFAEC';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 5, 14, 9, 15, 12.5, 16, 17];
  }

  // Minor roads (village connections)
  if (l.id === 'road_minor_casing') {
    l.paint['line-color'] = '#E8DABB';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 4.5, 14, 8.5, 15, 12, 16, 16];
  }
  if (l.id === 'road_minor') {
    l.paint['line-color'] = '#FFFAEC';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 3, 14, 6, 15, 8.5, 16, 12];
  }

  // Service tracks & lanes
  if (l.id === 'road_service_track_casing') {
    l.paint['line-color'] = '#E8DABB';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 3.5, 14, 6, 15, 9, 16, 12];
  }
  if (l.id === 'road_service_track' || l.id === 'road_path_pedestrian') {
    l.paint['line-color'] = '#FFFAEC';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 2, 14, 4, 15, 6, 16, 8.5];
  }

  // Railway
  if (l.id === 'road_major_rail' || l.id === 'road_transit_rail') {
    l.paint['line-width'] = 3.5;
  }
  if (l.id === 'road_major_rail_hatching' || l.id === 'road_transit_rail_hatching') {
    l.paint['line-width'] = 3.5;
  }

  // Waterways
  if (l.id.includes('waterway')) {
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 3, 14, 7, 15, 11, 16, 15];
  }
});

fs.writeFileSync(stylePath, JSON.stringify(style, null, 2), 'utf8');
console.log('Saved bold, thick road styling to casamomo_lucknow_style.json');
