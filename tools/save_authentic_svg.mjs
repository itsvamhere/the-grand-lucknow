import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const idx = homeHtml.indexOf('id="svg870196829_4253"');
const endSvg = homeHtml.indexOf('</svg>', idx) + 6;
const svgContent = homeHtml.substring(idx - 5, endSvg);
console.log('svgContent length:', svgContent.length);
fs.writeFileSync('tools/authentic_grand_svg.svg', '<svg ' + svgContent, 'utf8');
console.log('Saved tools/authentic_grand_svg.svg');
