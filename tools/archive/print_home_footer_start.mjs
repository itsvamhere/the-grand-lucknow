import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const fIdx = homeHtml.indexOf('<footer');
console.log('=== FIRST 1000 CHARS OF HOME FOOTER ===');
console.log(homeHtml.slice(fIdx, fIdx + 1000));
