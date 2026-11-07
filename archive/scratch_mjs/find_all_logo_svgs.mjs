import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

let idx = 0;
while ((idx = html.indexOf('216.285 27', idx)) !== -1) {
  console.log('at ' + idx + ':\n' + html.substring(Math.max(0, idx - 40), Math.min(html.length, idx + 350)));
  idx += 10;
}
