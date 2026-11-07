import fs from 'node:fs';

const html = fs.readFileSync('upstream_boutique-n1.html', 'utf8');

const mapIdx = html.indexOf('name="Location Map"');
console.log('Location Map snippet in upstream:');
console.log(html.slice(mapIdx - 400, mapIdx + 1500));
