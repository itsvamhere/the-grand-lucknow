import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
let pos = 0;
while ((pos = html.indexOf('55,000', pos)) !== -1) {
  console.log('--- At pos', pos, '---');
  console.log(html.slice(Math.max(0, pos - 150), Math.min(html.length, pos + 150)));
  pos += 6;
}
