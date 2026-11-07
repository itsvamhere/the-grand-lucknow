import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const fIdx = homeHtml.indexOf('<footer');
const footerContent = homeHtml.slice(fIdx);

const xjIdx = footerContent.indexOf('class="framer-xj8hz2"');
console.log('=== framer-xj8hz2 in index.html footer ===');
console.log(footerContent.slice(xjIdx, xjIdx + 2000));
