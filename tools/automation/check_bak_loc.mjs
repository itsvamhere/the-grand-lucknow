import fs from 'node:fs';

const bak = fs.readFileSync('venues/open-earth-lawn.html.bak_loc', 'utf8');

// Find map img tag in backup
const match = bak.match(/<div id="subpage-vector-map"[\s\S]*?<\/div>/);
console.log('Map img tag in bak_loc:');
console.log(match ? match[0].slice(0, 500) : 'not found');

// Check if casa-momo-location-color-harmony exists in bak_loc
console.log('Has harmony style in bak_loc:', bak.includes('casa-momo-location-color-harmony'));
