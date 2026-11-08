import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
console.log(html.slice(280000, 284000));
