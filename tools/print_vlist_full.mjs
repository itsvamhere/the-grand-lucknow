import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const vListIdx = html.indexOf('data-framer-name="Venue Lists"');
const footerIdx = html.indexOf('data-framer-name="Footer"');
console.log('Venue lists snippet:\n', html.slice(vListIdx, vListIdx + 6000));
