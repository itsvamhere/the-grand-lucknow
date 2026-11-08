import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const locIdx = html.indexOf('id="bigtext-1"');
console.log(html.slice(locIdx - 200, locIdx + 2500));
