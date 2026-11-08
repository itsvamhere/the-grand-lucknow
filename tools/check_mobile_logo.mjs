import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const fStart = idx.indexOf('<footer');
const fEnd = idx.indexOf('</footer>') + 9;
const footer = idx.slice(fStart, fEnd);

// Find second Footer Logo
const pos1 = footer.indexOf('data-framer-name="Footer Logo"');
const pos2 = footer.indexOf('data-framer-name="Footer Logo"', pos1 + 1);
const pos3 = footer.indexOf('data-framer-name="Footer Logo"', pos2 + 1);
const pos4 = footer.indexOf('data-framer-name="Footer Logo"', pos3 + 1);

console.log('pos1:', pos1, 'pos2:', pos2, 'pos3:', pos3, 'pos4:', pos4);
if (pos3 !== -1) {
  console.log('Mobile logo snippet:');
  console.log(footer.slice(pos3 - 50, pos3 + 2000));
}
