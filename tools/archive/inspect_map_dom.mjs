import fs from 'fs';
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const sIdx = subHtml.indexOf('id="subpage-vector-map"');
console.log('subpage-vector-map markup at:', sIdx);
if (sIdx !== -1) {
  console.log(subHtml.slice(sIdx - 100, sIdx + 1500));
}
