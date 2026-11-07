import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all occurrences of "The Grand" in map section
const mapSecIdx = subHtml.indexOf('id="subpage-vector-map"');
console.log('id="subpage-vector-map" index:', mapSecIdx);
if (mapSecIdx !== -1) {
  console.log('HTML of subpage map:\n', subHtml.slice(mapSecIdx, mapSecIdx + 1500));
} else {
  const mapIdx2 = subHtml.indexOf('casa-map-pulse');
  console.log('casa-map-pulse snippet:\n', subHtml.slice(mapIdx2 - 100, mapIdx2 + 1000));
}
