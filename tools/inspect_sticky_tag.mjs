import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
console.log(html.slice(241800, 244500));
