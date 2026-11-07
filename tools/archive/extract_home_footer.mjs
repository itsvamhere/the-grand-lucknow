import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const fStart = homeHtml.indexOf('<footer');
const fEnd = homeHtml.indexOf('</footer>', fStart) + 9;
const homeFooterHtml = homeHtml.slice(fStart, fEnd);

console.log('Home footer length:', homeFooterHtml.length);
console.log('First 500 chars of home footer:\n', homeFooterHtml.slice(0, 500));
console.log('Last 500 chars of home footer:\n', homeFooterHtml.slice(-500));
