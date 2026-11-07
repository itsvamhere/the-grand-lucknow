import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all occurrences of <img> in the gallery carousel
const gIdx = subHtml.indexOf('data-framer-name="Gallery"');
console.log('Gallery index:', gIdx);
if (gIdx !== -1) {
  const gSnippet = subHtml.slice(gIdx, gIdx + 4000);
  const imgs = [...gSnippet.matchAll(/src="([^"]+)"/g)];
  console.log('Gallery image sources:');
  imgs.forEach(m => console.log('  ', m[1]));
}
