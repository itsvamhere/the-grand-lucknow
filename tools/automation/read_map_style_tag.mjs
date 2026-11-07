import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const mapStyleIdx = html.indexOf('id="grand-subpage-map-styles"');
const endStyle = html.indexOf('</style>', mapStyleIdx);
console.log(html.slice(mapStyleIdx, endStyle + 8));
