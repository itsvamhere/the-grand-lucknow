import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
let pos = 0;
while ((pos = subHtml.indexOf('Footer Link', pos)) !== -1) {
  console.log('Pos:', pos);
  console.log(subHtml.slice(Math.max(0, pos - 50), pos + 200));
  console.log('----------------');
  pos += 11;
}
