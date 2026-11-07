import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Check what image source is used for the vector map
const imgMatch = html.match(/<div id="subpage-vector-map"[\s\S]*?<\/div>/);
console.log('Map container snippet:');
console.log(imgMatch ? imgMatch[0].slice(0, 500) : 'Not found');

// Check the overlapping "Location" and wordmark/logo in the header
const headerSection = html.slice(html.indexOf('data-framer-name="Location"'), html.indexOf('data-framer-name="Location"') + 1500);
console.log('\nLocation container snippet:');
console.log(headerSection.slice(0, 800));
