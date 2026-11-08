import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find universal-grand-footer-styles
const sStart = lawn.indexOf('<style id="universal-grand-footer-styles">');
const sEnd = lawn.indexOf('</style>', sStart) + 8;
const customStyle = lawn.slice(sStart, sEnd);
console.log('universal-grand-footer-styles length:', customStyle.length);
console.log(customStyle.slice(0, 1000));
