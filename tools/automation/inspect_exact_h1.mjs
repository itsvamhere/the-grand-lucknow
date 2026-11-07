import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const h1Idx = html.indexOf('<h1');
const endH1 = html.indexOf('</h1>', h1Idx);

console.log(html.slice(h1Idx, endH1 + 5));
