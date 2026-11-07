import fs from 'fs';
const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Check footer content
const fStart = html.indexOf('<footer');
const fEnd = html.indexOf('</footer>', fStart) + 9;
const footerChunk = html.slice(fStart, fEnd);

console.log('Footer length:', footerChunk.length);
console.log('Contains grand-marquee-full-parity:', html.includes('grand-marquee-full-parity'));
console.log('Contains grand-ticker-motion:', html.includes('grand-ticker-motion'));
console.log('Footer starts with:', footerChunk.slice(0, 300));
console.log('Footer ends with:', footerChunk.slice(-300));
