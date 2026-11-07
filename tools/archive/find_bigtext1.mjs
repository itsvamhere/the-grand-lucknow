import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

let pos = 0;
while ((pos = subHtml.indexOf('bigtext-1', pos)) !== -1) {
  console.log('Pos:', pos);
  console.log(subHtml.slice(Math.max(0, pos - 100), pos + 300));
  console.log('---');
  pos += 9;
}
