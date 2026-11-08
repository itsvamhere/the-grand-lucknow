import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const h1Idx = html.indexOf('<h1');
console.log(html.slice(h1Idx + 500, h1Idx + 2000));
