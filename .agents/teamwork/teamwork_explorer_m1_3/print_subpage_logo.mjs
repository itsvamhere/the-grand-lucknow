import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const logoIdx = subHtml.indexOf('data-framer-name="Footer Logo"');
console.log('Subpage Footer Logo snippet (500 chars):');
console.log(subHtml.substring(logoIdx - 50, logoIdx + 450));
