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

// Look for framer-n49p1z or any Footer Logo or ticker in fIdx
console.log('framer-n49p1z in fIdx:', fIdx.indexOf('framer-n49p1z'));
const logoIdx = fIdx.indexOf('Footer Logo');
console.log('Footer Logo index in fIdx:', logoIdx);
if (logoIdx !== -1) {
  console.log(fIdx.substring(logoIdx - 200, logoIdx + 1000));
}

// Check scripts in index.html that might animate the ticker
const scripts = idxHtml.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('Total scripts in index.html:', scripts.length);
scripts.forEach((s, i) => {
  if (s.includes('ticker') || s.includes('Footer') || s.includes('n49p1z') || s.includes('18na9ah')) {
    console.log(`Script ${i} matches! Length: ${s.length}`);
    console.log(s.substring(0, 500));
  }
});
