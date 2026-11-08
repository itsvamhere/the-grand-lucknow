import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const fStart = lawn.indexOf('<footer');
const fEnd = lawn.indexOf('</footer>') + 9;
const footer = lawn.slice(fStart, fEnd);

console.log('Lawn footer length:', footer.length);
console.log('Has Desktop variant?', footer.includes('data-framer-name="Desktop"'));
console.log('Has Mobile variant?', footer.includes('data-framer-name="Mobile"'));
