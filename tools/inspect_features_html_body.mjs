import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const fIdx = html.indexOf('<div class="framer-paq6hv"');
console.log('Features wrapper HTML at:', fIdx);
console.log(html.slice(fIdx, fIdx + 4500));
