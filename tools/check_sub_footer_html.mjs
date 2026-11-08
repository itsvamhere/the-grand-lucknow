import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const subFStart = subHtml.indexOf('<footer');
const subFEnd = subHtml.indexOf('</footer>', subFStart) + 9;
const subFooter = subHtml.slice(subFStart, subFEnd);

console.log('Subpage footer HTML length:', subFooter.length);
console.log('Subpage footer first 500 chars:');
console.log(subFooter.slice(0, 500));
console.log('...\nSubpage footer last 500 chars:');
console.log(subFooter.slice(-500));
