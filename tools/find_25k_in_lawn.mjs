import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find where 25,000 or 2,500 is in open-earth-lawn.html
const p25k = html.indexOf('25,000');
console.log('25,000 at:', p25k);
if (p25k !== -1) {
  console.log(html.slice(p25k - 200, p25k + 300));
}

const p2500 = html.indexOf('2,500');
console.log('2,500 at:', p2500);
if (p2500 !== -1) {
  console.log(html.slice(p2500 - 200, p2500 + 300));
}
