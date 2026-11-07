import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const loc = 305970;
console.log(html.slice(loc - 1200, loc));
