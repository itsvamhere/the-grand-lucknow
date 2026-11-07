import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const idx = 322476;
console.log('Snippet 1000 chars before 120</p>:\n', subHtml.slice(idx - 1000, idx));
