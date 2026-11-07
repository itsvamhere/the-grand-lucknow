import fs from 'fs';

const indexHtml = fs.readFileSync('index.html', 'utf8');
const logoIdx = indexHtml.indexOf('data-framer-name="Footer Logo"');
const endUl = indexHtml.indexOf('</ul>', logoIdx);
console.log('Inside index.html Footer Logo ul:');
console.log(indexHtml.substring(logoIdx, endUl + 5));
