import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const idx = html.indexOf('Boutique N°1');
console.log('Boutique N°1 snippet:\n', html.slice(idx - 300, idx + 400));
