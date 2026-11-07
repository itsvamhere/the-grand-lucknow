import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const mapIdx = html.indexOf('Open in Maps');
console.log(html.slice(mapIdx - 600, mapIdx + 600));
