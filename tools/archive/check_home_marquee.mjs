import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const xjIdx = homeHtml.indexOf('framer-xj8hz2');
console.log('framer-xj8hz2 in index.html:');
if (xjIdx !== -1) {
  console.log(homeHtml.slice(xjIdx - 200, xjIdx + 1200));
}

// And check how SVG paths are drawn in index.html
const svgMatch = homeHtml.match(/<svg[^>]*>[\s\S]*?THE GRAND[\s\S]*?<\/svg>/i) || homeHtml.match(/THE GRAND[\s\S]{0,300}/i);
console.log('SVG / text in index.html:\n', svgMatch ? svgMatch[0].slice(0, 500) : 'None');
