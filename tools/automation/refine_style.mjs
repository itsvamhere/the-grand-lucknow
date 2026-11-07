import fs from 'node:fs';

const stylePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json';
const style = JSON.parse(fs.readFileSync(stylePath, 'utf8'));

// 1. Remove fill-pattern from wetland
const wet = style.layers.find(l => l.id === 'landcover_wetland');
if (wet && wet.paint) {
  delete wet.paint['fill-pattern'];
  wet.paint['fill-color'] = '#F2E6C6';
  wet.paint['fill-opacity'] = 0.8;
  console.log('Cleaned wetland fill-pattern');
}

// 2. Remove fill-pattern from road_area_pattern
const rap = style.layers.find(l => l.id === 'road_area_pattern');
if (rap && rap.paint) {
  delete rap.paint['fill-pattern'];
  rap.paint['fill-color'] = '#F0E2BD';
  console.log('Cleaned road_area_pattern');
}

// 3. Ensure building layer has crisp fill and stroke
const bld = style.layers.find(l => l.id === 'building');
if (bld) {
  bld.minzoom = 11;
  delete bld.maxzoom;
  bld.paint = {
    'fill-color': '#E8DCBD',
    'fill-outline-color': '#D6C8A4',
    'fill-opacity': 0.95
  };
  console.log('Enhanced building layer');
}

// 4. Ensure landuse_residential is clean
const res = style.layers.find(l => l.id === 'landuse_residential');
if (res) {
  res.minzoom = 9;
  delete res.maxzoom;
  res.paint = {
    'fill-color': '#F0E2BD',
    'fill-opacity': 0.88
  };
  console.log('Enhanced landuse_residential');
}

// 5. Add general landuse layer (commercial, industrial, agricultural parcels)
const existingGen = style.layers.find(l => l.id === 'landuse_commercial_other');
if (!existingGen) {
  const insertIdx = style.layers.findIndex(l => l.id === 'landuse_residential');
  const genLayer = {
    id: 'landuse_commercial_other',
    type: 'fill',
    source: 'openmaptiles',
    'source-layer': 'landuse',
    minzoom: 10,
    filter: [
      'match',
      ['get', 'class'],
      ['commercial', 'industrial', 'retail', 'railway', 'institutional'],
      true,
      false
    ],
    paint: {
      'fill-color': '#EFE0B8',
      'fill-opacity': 0.85
    }
  };
  style.layers.splice(insertIdx + 1, 0, genLayer);
  console.log('Added landuse_commercial_other layer');
}

fs.writeFileSync(stylePath, JSON.stringify(style, null, 2), 'utf8');
console.log('Saved updated style!');
