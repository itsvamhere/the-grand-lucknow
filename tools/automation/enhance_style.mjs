import fs from 'node:fs';

const stylePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json';
const style = JSON.parse(fs.readFileSync(stylePath, 'utf8'));

// 1. Update building layer
const bLayer = style.layers.find(l => l.id === 'building');
if (bLayer) {
  bLayer.minzoom = 12;
  delete bLayer.maxzoom;
  bLayer.paint = {
    'fill-color': '#E9DDBE',
    'fill-outline-color': '#DFD3B2',
    'fill-opacity': 0.92
  };
  console.log('Updated building layer');
}

// 2. Disable 3D building extrusion so it does not conflict with clean 2D vector footprints
const b3dLayer = style.layers.find(l => l.id === 'building-3d');
if (b3dLayer) {
  b3dLayer.layout = { visibility: 'none' };
  console.log('Disabled building-3d layer');
}

// 3. Update residential landuse
const resLayer = style.layers.find(l => l.id === 'landuse_residential');
if (resLayer) {
  resLayer.minzoom = 10;
  delete resLayer.maxzoom;
  resLayer.paint = {
    'fill-color': '#F0E2BD',
    'fill-opacity': 0.85
  };
  console.log('Updated landuse_residential layer');
}

// 4. Update park and grass layers
const parkLayer = style.layers.find(l => l.id === 'park');
if (parkLayer) {
  parkLayer.paint = {
    'fill-color': '#F3E8C8',
    'fill-opacity': 0.85
  };
}

// 5. Update road casings and fills for zoom 14+ crispness
style.layers.forEach(l => {
  if (l.id === 'road_minor_casing') {
    l.paint['line-color'] = '#EADBBD';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 3, 14, 6, 16, 10];
  }
  if (l.id === 'road_minor') {
    l.paint['line-color'] = '#FFFAEC';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 2, 14, 4.5, 16, 7.5];
  }
  if (l.id === 'road_service_track_casing') {
    l.paint['line-color'] = '#EADBBD';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 2, 14, 4, 16, 7];
  }
  if (l.id === 'road_service_track') {
    l.paint['line-color'] = '#FFFAEC';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 1.4, 14, 2.8, 16, 5];
  }
  if (l.id === 'road_secondary_tertiary_casing') {
    l.paint['line-color'] = '#EADBBD';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 5, 14, 9, 16, 14];
  }
  if (l.id === 'road_secondary_tertiary') {
    l.paint['line-color'] = '#FFFAEC';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 3.5, 14, 6.5, 16, 10.5];
  }
  if (l.id === 'road_trunk_primary_casing') {
    l.paint['line-color'] = '#EADBBD';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 7, 14, 13, 16, 18];
  }
  if (l.id === 'road_trunk_primary') {
    l.paint['line-color'] = '#FFFAEC';
    l.paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 11, 5, 14, 9.5, 16, 14];
  }
});

fs.writeFileSync(stylePath, JSON.stringify(style, null, 2), 'utf8');
console.log('Saved enhanced casamomo_lucknow_style.json');
