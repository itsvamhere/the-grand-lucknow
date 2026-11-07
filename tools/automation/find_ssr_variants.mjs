import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const mapIdx = html.lastIndexOf('hidden-1azqig2 hidden-1l94oxb');
console.log(html.slice(mapIdx - 1200, mapIdx + 200));
