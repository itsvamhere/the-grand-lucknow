import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');

const gridStart = idx.indexOf('<section class="framer-mefgjz" data-framer-name="Venues Grid"');
const gridEnd = idx.indexOf('</section>', gridStart);
const gridContent = idx.slice(gridStart, gridEnd);
const items = gridContent.split(/(?=<div class="framer-fdgjuz" data-framer-name="Venue Item">)/);

console.log('Item 5 snippet end:');
console.log(items[5].slice(-300));

console.log('Item 9 snippet end:');
console.log(items[9].slice(-300));
