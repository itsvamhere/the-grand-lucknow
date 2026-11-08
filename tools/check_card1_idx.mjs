import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const card1 = idx.slice(239735, 256383);

console.log('Card 1 in index.html:');
console.log('Size:', card1.match(/<p class="framer-text[^>]*>([\d,]+)<\/p>/g));
console.log('Snippet around size:');
const sIdx = card1.indexOf('Squaremeter');
console.log(card1.slice(sIdx - 300, sIdx + 400));
