import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

// Find all occurrences of ticker in index.html
const matches = html.match(/.{0,50}ticker.{0,50}/gi);
console.log('Ticker matches in index.html:', matches ? matches.slice(0, 10) : 'none');

// Find references to svg in footer of index.html
const fStart = html.indexOf('<footer');
const fEnd = html.indexOf('</footer>', fStart) + 9;
const fChunk = html.slice(fStart, fEnd);
console.log('SVGs in footer:', fChunk.match(/<svg[^>]*>.*?<\/svg>/g)?.length || 0);
console.log('Classes in footer:', [...new Set(fChunk.match(/framer-[a-zA-Z0-9_-]+/g))].slice(0, 20));
