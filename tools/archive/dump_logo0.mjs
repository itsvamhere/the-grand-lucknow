import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const fStart = idx.indexOf('<footer');
const fEnd = idx.indexOf('</footer>') + 9;
const footer = idx.slice(fStart, fEnd);

const logo0Start = footer.indexOf('data-framer-name="Footer Logo"');
console.log('Logo 0 full snippet:');
console.log(footer.slice(logo0Start - 20, logo0Start + 2500));
