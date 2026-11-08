import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const sIdx = h.indexOf('grand-location-contrast-css');
const endIdx = h.indexOf('</style>', sIdx);
console.log(h.slice(sIdx - 10, endIdx + 8));
