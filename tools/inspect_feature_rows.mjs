import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
console.log(html.slice(281500, 284500));
