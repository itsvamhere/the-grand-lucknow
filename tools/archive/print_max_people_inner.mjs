import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const pIdx = 282521;
console.log('Snippet inside Maximum People:\n', subHtml.slice(pIdx + 500, pIdx + 2000));
