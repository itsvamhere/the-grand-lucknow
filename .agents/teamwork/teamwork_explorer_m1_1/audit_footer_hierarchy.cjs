const fs = require('fs');
const path = require('path');
const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const idxHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

// 1. Footer HTML outline
const footerStart = idxHtml.indexOf('<footer');
const footerEnd = idxHtml.indexOf('</footer>', footerStart) + 9;
const footerHtml = idxHtml.substring(footerStart, footerEnd);

console.log('=== FOOTER HTML OUTLINE (TAGS & CLASSES) ===');
// print opening tags of major divs
const tagRegex = /<([a-z0-9]+)([^>]*)>/gi;
let match;
let depth = 0;
while ((match = tagRegex.exec(footerHtml)) !== null) {
  const tagName = match[1];
  const attrs = match[2];
  if (['div', 'header', 'nav', 'ul', 'li', 'a', 'p', 'footer'].includes(tagName)) {
    const classMatch = attrs.match(/class="([^"]+)"/);
    const nameMatch = attrs.match(/data-framer-name="([^"]+)"/);
    const styleMatch = attrs.match(/style="([^"]+)"/);
    if (classMatch || nameMatch) {
      console.log(`${tagName}: class="${classMatch ? classMatch[1] : ''}" name="${nameMatch ? nameMatch[1] : ''}"`);
    }
  }
}
