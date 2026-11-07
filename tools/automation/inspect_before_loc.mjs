import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const locIdx = html.indexOf('data-framer-name="Location"');
console.log('locIdx:', locIdx);
console.log('1000 chars before locIdx:');
console.log(html.slice(locIdx - 1000, locIdx));
