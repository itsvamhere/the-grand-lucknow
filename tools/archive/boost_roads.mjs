import fs from 'fs';

const p = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/grand_detailed_style.json';
const style = JSON.parse(fs.readFileSync(p, 'utf8'));

style.layers.forEach(l => {
  // 1. Service tracks and rural lanes
  if (l.id === 'road_service_track') {
    l.paint['line-color'] = '#FFFFFF';
    l.paint['line-width'] = [
      'interpolate', ['linear'], ['zoom'],
      11, 0.8,
      13, 1.8,
      15, 3.5,
      18, 7
    ];
  }
  if (l.id === 'road_service_track_casing') {
    l.paint['line-color'] = '#D2C3AA';
    l.paint['line-width'] = [
      'interpolate', ['linear'], ['zoom'],
      11, 1.4,
      13, 2.8,
      15, 5,
      18, 9
    ];
  }

  // 2. Pedestrian & village paths
  if (l.id === 'road_path_pedestrian') {
    l.paint['line-color'] = '#EDE2D0';
    delete l.paint['line-dasharray']; // solid visible line
    l.paint['line-width'] = [
      'interpolate', ['linear'], ['zoom'],
      12, 1,
      14, 2,
      16, 4
    ];
  }

  // 3. Minor roads
  if (l.id === 'road_minor') {
    l.paint['line-color'] = '#FFFFFF';
    l.paint['line-width'] = [
      'interpolate', ['linear'], ['zoom'],
      11, 1.2,
      13, 2.5,
      15, 5,
      18, 9
    ];
  }
  if (l.id === 'road_minor_casing') {
    l.paint['line-color'] = '#C8B89E';
    l.paint['line-width'] = [
      'interpolate', ['linear'], ['zoom'],
      11, 2.2,
      13, 3.8,
      15, 7,
      18, 11
    ];
  }
});

fs.writeFileSync(p, JSON.stringify(style, null, 2), 'utf8');
console.log('Successfully boosted rural and village road layers!');
