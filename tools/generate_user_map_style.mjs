import fs from 'node:fs';

const baseStyle = JSON.parse(fs.readFileSync('tools/openfreemap_positron_base.json', 'utf8'));

const userColors = {
  bg: '#FFF0CA',
  roadFill: '#FFFAEC',
  roadStroke: '#DFD4BE',
  arterialStroke: '#D7CBB0',
  highwayStroke: '#D7CBB0',
  localFill: '#FFF0CA',
  localStroke: '#E6D7B6',
  transit: '#D2C4A6',
  waterFill: '#F4E5C0',
  waterStroke: '#EADBBD',
  waterText: '#8C7E6A',
  localityText: '#7D6F5B',
  neighborhoodText: '#9B8D78',
  roadText: '#9B8D78',
  textHalo: '#FFF0CA'
};

const style = JSON.parse(JSON.stringify(baseStyle));
style.name = "The Grand Lucknow - User Design";

style.layers.forEach(layer => {
  const id = layer.id;
  const p = layer.paint || (layer.paint = {});
  const l = layer.layout || (layer.layout = {});

  // 1. Background
  if (id === 'background') {
    p['background-color'] = userColors.bg;
  }

  // 2. Landscapes, parks, residential landuse -> merge seamlessly into #FFF0CA
  else if (id.includes('park') || id.includes('landcover') || id.includes('landuse') || id.includes('aeroway-area')) {
    if (layer.type === 'fill') {
      p['fill-color'] = userColors.bg;
      p['fill-opacity'] = 1;
    }
  }

  // 3. Buildings & man-made -> off per user styler
  else if (id.includes('building') || id.includes('pier') || id.includes('aeroway')) {
    l['visibility'] = 'none';
  }

  // 4. Water & Waterways
  else if (id === 'water') {
    p['fill-color'] = userColors.waterFill;
    p['fill-outline-color'] = userColors.waterStroke;
  }
  else if (id === 'waterway') {
    p['line-color'] = userColors.waterFill;
    p['line-width'] = ['interpolate', ['linear'], ['zoom'], 10, 2, 14, 5];
  }

  // 5. Highways (NH30, NH230, etc.)
  else if (id.includes('highway_motorway_casing') || id.includes('tunnel_motorway_casing') || id.includes('highway_motorway_bridge_casing')) {
    p['line-color'] = userColors.highwayStroke;
    // Boost casing slightly for crisp cartography
    p['line-width'] = ['interpolate', ['linear'], ['zoom'], 10, 4, 13, 7, 15, 12];
  }
  else if (id.includes('highway_motorway_inner') || id.includes('tunnel_motorway_inner') || id.includes('highway_motorway_bridge_inner')) {
    p['line-color'] = userColors.roadFill;
    p['line-width'] = ['interpolate', ['linear'], ['zoom'], 10, 2.5, 13, 5, 15, 9];
  }
  else if (id.includes('highway_motorway_subtle')) {
    p['line-color'] = userColors.highwayStroke;
  }

  // 6. Major Roads / Arterials (SH52C, Kisan Path, etc.)
  else if (id.includes('highway_major_casing')) {
    p['line-color'] = userColors.arterialStroke;
    p['line-width'] = ['interpolate', ['linear'], ['zoom'], 10, 3, 13, 5.5, 15, 9];
  }
  else if (id.includes('highway_major_inner')) {
    p['line-color'] = userColors.roadFill;
    p['line-width'] = ['interpolate', ['linear'], ['zoom'], 10, 2, 13, 4, 15, 7];
  }
  else if (id.includes('highway_major_subtle')) {
    p['line-color'] = userColors.roadStroke;
  }

  // 7. Minor & Local Roads
  else if (id === 'highway_minor') {
    p['line-color'] = userColors.localStroke;
    p['line-width'] = ['interpolate', ['linear'], ['zoom'], 10, 1.2, 13, 2.5, 15, 5];
  }
  else if (id === 'highway_path') {
    p['line-color'] = userColors.roadStroke;
    p['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 1, 14, 2];
  }

  // 8. Railway & Transit lines
  else if (id.includes('railway_transit') || id.includes('railway_service') || id === 'railway') {
    p['line-color'] = userColors.transit;
    p['line-width'] = 2.0;
  }
  else if (id.includes('dashline')) {
    p['line-color'] = userColors.bg;
    p['line-dasharray'] = [3, 3];
  }

  // 9. Administrative Boundaries (off per user styler)
  else if (id.includes('boundary')) {
    l['visibility'] = 'none';
  }

  // 10. Shields and Icons (off per user styler)
  else if (id.includes('shield') || id.includes('airport')) {
    l['visibility'] = 'none';
  }

  // 11. Labels: Text
  else if (id.includes('waterway_line_label') || id.includes('water_name')) {
    p['text-color'] = userColors.waterText;
    p['text-halo-color'] = userColors.textHalo;
    p['text-halo-width'] = 3;
  }
  else if (id === 'label_town' || id === 'label_city' || id === 'label_city_capital') {
    p['text-color'] = userColors.localityText;
    p['text-halo-color'] = userColors.textHalo;
    p['text-halo-width'] = 3;
    p['text-halo-blur'] = 1;
  }
  else if (id === 'label_village' || id === 'label_other') {
    p['text-color'] = userColors.neighborhoodText;
    p['text-halo-color'] = userColors.textHalo;
    p['text-halo-width'] = 3;
    p['text-halo-blur'] = 1;
  }
  else if (id.includes('highway-name')) {
    p['text-color'] = userColors.roadText;
    p['text-halo-color'] = userColors.textHalo;
    p['text-halo-width'] = 2;
  }
  else if (id.includes('label_country') || id.includes('label_state')) {
    l['visibility'] = 'none';
  }
});

fs.writeFileSync('tools/the_grand_lucknow_user_map_style.json', JSON.stringify(style, null, 2), 'utf8');
console.log('Successfully written tools/the_grand_lucknow_user_map_style.json with exact user styler colors!');
