import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Search for `120</p>`
const idx = subHtml.indexOf('120</p>');
console.log('120</p> index:', idx);
if (idx !== -1) {
  console.log('Snippet around 120</p>:\n', subHtml.slice(Math.max(0, idx - 400), idx + 400));
}
