import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

const fStart = html.indexOf('<footer');
const fEnd = html.indexOf('</footer>', fStart) + 9;
const footerChunk = html.slice(fStart, fEnd);

console.log('index.html Footer length:', footerChunk.length);
console.log('index.html Footer starts with:', footerChunk.slice(0, 300));
console.log('index.html Footer ends with:', footerChunk.slice(-300));
