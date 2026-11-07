const fs = require('fs');
const path = require('path');
const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const idxHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

function getFooter(html) {
  const start = html.indexOf('<footer');
  const end = html.indexOf('</footer>', start) + 9;
  return html.substring(start, end);
}

const fIdx = getFooter(idxHtml);

// Find all top-level divs inside footer
const reTopDivs = /<footer[^>]*>([\s\S]*?)<\/footer>/i;
const footerContent = fIdx.match(reTopDivs)[1];

console.log('--- DIRECT CHILDREN OF FOOTER IN INDEX.HTML ---');
const reDirect = /<div class="([^"]+)"/g;
let m;
while ((m = reDirect.exec(footerContent)) !== null) {
  if (m[1].includes('ssr-variant')) {
    console.log('SSR Variant class:', m[1]);
    const startIdx = m.index;
    console.log(footerContent.substring(startIdx, startIdx + 300));
    console.log('===');
  }
}
