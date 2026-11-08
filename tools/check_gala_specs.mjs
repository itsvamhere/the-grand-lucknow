import fs from 'fs';

const h = fs.readFileSync('venues/grassland-gala.html', 'utf8');

const sIdx = h.indexOf('rotate(8deg)">25,000');
console.log('grassland-gala.html has 25,000 at:', sIdx);

const cIdx = h.indexOf('rotate(8deg)">2,500');
console.log('grassland-gala.html has 2,500 at:', cIdx);
