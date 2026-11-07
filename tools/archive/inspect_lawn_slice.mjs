import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const footer = html.match(/<footer[\s\S]*?<\/footer>/i)[0];

const idx = footer.indexOf('data:image/svg+xml');
if (idx !== -1) {
  console.log(footer.slice(idx - 50, idx + 400));
}
