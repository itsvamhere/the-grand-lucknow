import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const footerEndIdx = html.indexOf('</footer>');
const afterFooter = html.slice(footerEndIdx + 9);

const svgs = afterFooter.match(/<svg[\s\S]*?<\/svg>/g) || [];
console.log('SVGs after footer in index.html:', svgs.length);
svgs.forEach((s, i) => {
  const idMatch = s.match(/id="([^"]+)"/);
  console.log(`SVG ${i}: id=${idMatch ? idMatch[1] : 'none'}, length=${s.length}`);
});
