import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');

// Find the grid container that holds the cards
const gridIdx = idx.indexOf('data-framer-name="Venues Grid"');
console.log('Grid container at:', gridIdx);
console.log(idx.slice(gridIdx, gridIdx + 1000));
