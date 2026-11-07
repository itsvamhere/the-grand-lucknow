const fs = require('fs');
const subHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const lines = subHtml.split('\n');
console.log('Total lines in open-earth-lawn.html:', lines.length);

lines.forEach((l, idx) => {
  if (l.includes('<footer')) console.log(`Footer start at line ${idx + 1}`);
  if (l.includes('</footer>')) console.log(`Footer end at line ${idx + 1}`);
  if (l.includes('initGrandFooterMotions')) console.log(`initGrandFooterMotions at line ${idx + 1}`);
  if (l.includes('grandInfiniteScrollFluid')) console.log(`grandInfiniteScrollFluid at line ${idx + 1}`);
  if (l.includes('card_2') || l.includes('data:image/svg+xml;utf8,<svg')) console.log(`SVG placeholder at line ${idx + 1}`);
  if (l.includes('UayMv2I16UbQQBQkbI90HsJMv5o')) console.log(`Casamomo card image at line ${idx + 1}`);
});
