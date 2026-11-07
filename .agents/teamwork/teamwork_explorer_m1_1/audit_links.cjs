const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const idxHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const subHtml = fs.readFileSync(path.join(baseDir, 'venues/open-earth-lawn.html'), 'utf8');

function getFooter(html) {
  const start = html.indexOf('<footer');
  const end = html.indexOf('</footer>', start) + 9;
  return html.substring(start, end);
}

const fIdx = getFooter(idxHtml);
const fSub = getFooter(subHtml);

// Inspect all <a> links inside fIdx and fSub
function inspectLinks(fHtml, name) {
  console.log(`=== LINKS IN ${name} ===`);
  const linkRegex = /<a[\s\S]*?<\/a>/gi;
  let match;
  let count = 0;
  while ((match = linkRegex.exec(fHtml)) !== null) {
    count++;
    const linkStr = match[0];
    const textOnly = linkStr.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`Link ${count}: text="${textOnly}"`);
    console.log('Snippet:', linkStr.substring(0, 300));
    console.log('---');
  }
}

inspectLinks(fIdx, 'INDEX FOOTER');
inspectLinks(fSub, 'SUBPAGE FOOTER');
