import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const pos = 442570;
console.log('Snippet of Location scroll fade script:\n', subHtml.slice(pos - 100, pos + 800));
