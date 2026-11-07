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

// 1. Inspect ticker in index.html vs subpage
console.log('=== TICKER INSPECTION IN INDEX.HTML ===');
let idxTicker = fIdx.indexOf('ticker');
while (idxTicker !== -1) {
  console.log('Index ticker snippet:', fIdx.substring(Math.max(0, idxTicker - 150), idxTicker + 250));
  console.log('---');
  idxTicker = fIdx.indexOf('ticker', idxTicker + 1);
}

console.log('=== TICKER INSPECTION IN SUBPAGE ===');
let subTicker = fSub.indexOf('ticker');
while (subTicker !== -1) {
  console.log('Subpage ticker snippet:', fSub.substring(Math.max(0, subTicker - 150), subTicker + 250));
  console.log('---');
  subTicker = fSub.indexOf('ticker', subTicker + 1);
}

// 2. Check CSS styles for footer and ticker in index.html
console.log('=== FOOTER & TICKER CSS IN INDEX.HTML ===');
// Search for style tags or rules related to 1aamxx2, 18na9ah, ticker, 192t1bg
['1aamxx2', '18na9ah', '192t1bg', 'ticker', 'zHQwT'].forEach(cls => {
  let idx = 0;
  while ((idx = idxHtml.indexOf(cls, idx)) !== -1) {
    // print surrounding style if inside <style>
    const styleStart = idxHtml.lastIndexOf('<style', idx);
    const styleEnd = idxHtml.indexOf('</style>', idx);
    if (styleStart !== -1 && styleEnd !== -1 && idx > styleStart && idx < styleEnd) {
      console.log(`Class "${cls}" in <style>:`, idxHtml.substring(Math.max(styleStart, idx - 100), Math.min(styleEnd, idx + 200)));
    } else {
      console.log(`Class "${cls}" outside <style> at pos ${idx}`);
    }
    idx += cls.length;
    break; // just first match per class for now
  }
});
