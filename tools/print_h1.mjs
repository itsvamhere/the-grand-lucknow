import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const h1Idx = html.indexOf('<h1');
const h1End = html.indexOf('</h1>', h1Idx) + 5;
console.log(html.substring(h1Idx, h1End));
