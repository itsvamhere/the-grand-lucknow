import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const sIdx = subHtml.indexOf("var locSec = document.getElementById('bigtext-1');");
console.log('Snippet of onLocScroll in subHtml:\n', subHtml.slice(sIdx - 50, sIdx + 1200));
