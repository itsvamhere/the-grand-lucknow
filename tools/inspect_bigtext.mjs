import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('--- bigtext-1 content ---');
console.log(h.slice(289310, 289310 + 1200));

console.log('--- bigtext-2 content ---');
console.log(h.slice(301289, 301289 + 1200));
