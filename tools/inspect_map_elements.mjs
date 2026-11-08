import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all occurrences of casa-map-chip or active-venue-chip
let idx = 0;
while ((idx = h.indexOf('casa-map-chip', idx)) !== -1) {
  console.log('Found casa-map-chip at', idx);
  console.log(h.slice(idx - 50, idx + 200));
  idx += 13;
}

// Search for SVG map or map pin
const mapIdx = h.indexOf('data-framer-name="Map"');
if (mapIdx !== -1) {
  console.log('Found Map at', mapIdx);
  console.log(h.slice(mapIdx - 100, mapIdx + 800));
}
