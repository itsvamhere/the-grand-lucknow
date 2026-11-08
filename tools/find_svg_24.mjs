import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const idx = homeHtml.indexOf('2404.809%20300.206');
console.log('Found 2404.809%20300.206 at', idx);
if (idx !== -1) {
  console.log(homeHtml.substring(idx - 100, idx + 400));
}
