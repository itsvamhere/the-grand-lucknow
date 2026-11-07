import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const pos = 292337;
console.log('Location section before H2:\n', subHtml.slice(pos - 1500, pos));
