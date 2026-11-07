import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const mapIdx = html.lastIndexOf('sform:none">Location</span>');
console.log(html.slice(mapIdx - 1500, mapIdx + 200));
