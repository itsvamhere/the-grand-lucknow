import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

let idx = -1;
while ((idx = html.indexOf('data-framer-name="Location"', idx + 1)) !== -1) {
  console.log(`Match at ${idx}:`);
  console.log(html.slice(Math.max(0, idx - 100), Math.min(html.length, idx + 200)));
}
