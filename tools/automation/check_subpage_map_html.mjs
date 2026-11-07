import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find the map section in HTML
const mapIdx = html.indexOf('id="subpage-vector-map"');
if (mapIdx !== -1) {
  console.log(html.slice(mapIdx - 200, mapIdx + 1200));
} else {
  console.log('id="subpage-vector-map" not found');
}
