import fs from 'fs';

const indexHtml = fs.readFileSync('index.html', 'utf8');
const logoIdx = indexHtml.indexOf('data-framer-name="Footer Logo"');
console.log('Index.html Footer Logo snippet (500 chars):');
console.log(indexHtml.substring(logoIdx - 50, logoIdx + 450));
