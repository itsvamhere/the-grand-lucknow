import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const pIdx = subHtml.indexOf('id="grand-live-pointer"');
console.log('Snippet of grand-live-pointer:\n', subHtml.slice(pIdx - 100, pIdx + 600));
