import fs from 'fs';

const h = fs.readFileSync('index.html', 'utf8');

const c1Idx = h.indexOf('card_1_open_earth');
console.log(h.slice(c1Idx + 10000, c1Idx + 11500));
