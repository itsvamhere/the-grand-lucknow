import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const fIdx = subHtml.indexOf('<footer');
console.log('=== FOOTER IN venues/open-earth-lawn.html ===');
console.log(subHtml.slice(fIdx, fIdx + 2500));
