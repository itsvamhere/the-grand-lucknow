import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const ggIdx = html.indexOf('Garden Galaxy');
console.log('Garden Galaxy at:', ggIdx);
console.log(html.slice(ggIdx - 1500, ggIdx + 200));
