import fs from 'node:fs';

const idxHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const sIdx = idxHtml.indexOf('id="svg870196829_4253"');
console.log('Found svg870196829_4253 at:', sIdx);
// Find the enclosing <svg> tag
const tagStart = idxHtml.lastIndexOf('<svg', sIdx);
const tagEnd = idxHtml.indexOf('</svg>', sIdx) + 6;
const svgTag = idxHtml.slice(tagStart, tagEnd);
console.log('SVG tag length:', svgTag.length);
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/footer_logo_svg.html', svgTag, 'utf8');
console.log('Saved footer_logo_svg.html');
