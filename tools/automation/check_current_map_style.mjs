import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const mapStyleIdx = html.indexOf('id="grand-subpage-map-styles"');
console.log(html.slice(mapStyleIdx, mapStyleIdx + 800));
