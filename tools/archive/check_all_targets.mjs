import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('=== 1. MAP POINTER ===');
const pMatch = subHtml.match(/id="grand-live-pointer"[\s\S]{0,400}/);
console.log(pMatch ? pMatch[0] : 'None');

console.log('=== 2. HERO BADGES (AREA & CAPACITY) ===');
const hMatch = subHtml.match(/data-framer-name="Size"[\s\S]{0,600}/);
console.log(hMatch ? hMatch[0] : 'None');

console.log('=== 3. OTHER VENUES CARDS ===');
const cMatch = subHtml.match(/alt="Grassland Gala"[\s\S]{0,1200}/);
console.log(cMatch ? cMatch[0] : 'None');

console.log('=== 4. FOOTER TICKER CSS & HTML ===');
const fMatch = subHtml.match(/grand-ticker-container[\s\S]{0,400}/);
console.log(fMatch ? fMatch[0] : 'None');
