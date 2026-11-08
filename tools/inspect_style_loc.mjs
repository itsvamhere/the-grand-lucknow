import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const sIdx = h.indexOf('id="grand-location-contrast-css"');
const eIdx = h.indexOf('</style>', sIdx);
console.log(h.slice(sIdx - 10, eIdx + 8));
