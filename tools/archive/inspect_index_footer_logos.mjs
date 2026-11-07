import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const fStart = idx.indexOf('<footer');
const fEnd = idx.indexOf('</footer>') + 9;
const footer = idx.slice(fStart, fEnd);

const logoMatches = [...footer.matchAll(/data-framer-name="Footer Logo"[^>]*>([\s\S]*?)<\/div>/g)];
console.log('Found', logoMatches.length, 'Footer Logo divs:');
logoMatches.forEach((m, i) => {
  console.log(`Logo ${i}:`, m[0].slice(0, 300));
});
