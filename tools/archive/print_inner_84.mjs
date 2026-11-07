import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const pos = 316593;
const nextDiv = subHtml.indexOf('</div>', pos);
const close84 = subHtml.indexOf('</div>', subHtml.indexOf('framer-84xumc', pos) + 20);
console.log('Snippet from pos to close84:\n', subHtml.slice(pos - 100, close84 + 100));
