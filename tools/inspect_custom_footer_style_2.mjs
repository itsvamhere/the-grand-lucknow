import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const sStart = lawn.indexOf('<style id="universal-grand-footer-styles">');
const sEnd = lawn.indexOf('</style>', sStart) + 8;
const customStyle = lawn.slice(sStart, sEnd);
console.log(customStyle.slice(1000, 3000));
