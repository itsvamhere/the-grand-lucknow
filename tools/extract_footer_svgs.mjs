import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

// Find all SVG paths in footer
const fStart = homeHtml.indexOf('<footer');
const fEnd = homeHtml.indexOf('</footer>', fStart) + 9;
const footer = homeHtml.slice(fStart, fEnd);

const svgMatches = footer.match(/data:image\/svg\+xml,[^"'\)]+/g) || [];
console.log('Footer SVGs count:', svgMatches.length);
svgMatches.forEach((s, idx) => {
  const decoded = decodeURIComponent(s);
  console.log(`SVG ${idx} length: ${decoded.length}`);
  console.log(decoded.slice(0, 200));
  fs.writeFileSync(`tools/footer_svg_${idx}.svg`, decoded.replace(/^data:image\/svg\+xml,/, ''), 'utf8');
});
