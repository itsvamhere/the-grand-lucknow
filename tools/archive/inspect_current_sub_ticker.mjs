import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find where grand-ticker-container is in subHtml
const tIdx = subHtml.indexOf('grand-ticker-container');
console.log('Snippet of grand-ticker-container:\n', subHtml.slice(tIdx - 100, tIdx + 1500));
