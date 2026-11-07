import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const pos = subHtml.indexOf('Footer Link');
console.log('=== FOOTER LINK SNIPPET ===');
console.log(subHtml.slice(pos, pos + 1500));
