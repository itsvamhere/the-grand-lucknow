import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const h1Idx = html.indexOf('<h1');
console.log('H1 snippet:\n', html.slice(h1Idx - 200, h1Idx + 1200));
