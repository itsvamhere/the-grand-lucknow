import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const fStart = idx.indexOf('<footer');
const fEnd = idx.indexOf('</footer>') + 9;
const idxFooter = idx.slice(fStart, fEnd);

// Find email and phone blocks in index footer
const emailPos = idxFooter.indexOf('office@thegrandlucknow.in');
console.log('Email block in index footer:');
console.log(idxFooter.slice(emailPos - 100, emailPos + 300));

const phonePos = idxFooter.indexOf('+91 9129127091');
console.log('Phone block in index footer:');
console.log(idxFooter.slice(phonePos - 100, phonePos + 300));
