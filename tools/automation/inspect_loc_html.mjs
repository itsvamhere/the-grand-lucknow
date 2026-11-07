import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const locIdx = html.indexOf('data-framer-name="Location"');
console.log(html.slice(locIdx - 1500, locIdx + 500));
