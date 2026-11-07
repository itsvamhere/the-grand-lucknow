import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

const idx = html.indexOf('grand-gap');
console.log('grand-gap index:', idx);
if (idx !== -1) {
  console.log(html.slice(idx - 200, idx + 400));
}
