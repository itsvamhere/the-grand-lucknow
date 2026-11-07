import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const fStart = idx.indexOf('<footer');
const fEnd = idx.indexOf('</footer>') + 9;
const footer = idx.slice(fStart, fEnd);

console.log('Index footer length:', footer.length);
console.log('Index footer start:', footer.slice(0, 300));
console.log('Index footer end:', footer.slice(-300));

// Find all elements with data-framer-name inside footer
const names = [...footer.matchAll(/data-framer-name="([^"]+)"/g)].map(m => m[1]);
console.log('Names in footer:', names);
