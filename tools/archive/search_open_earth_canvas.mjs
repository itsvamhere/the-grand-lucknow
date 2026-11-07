import fs from 'fs';
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const matches = subHtml.match(/.{0,50}OPEN EARTH LAWN.{0,50}/gi);
console.log('OPEN EARTH LAWN matches in subpage:', matches);
