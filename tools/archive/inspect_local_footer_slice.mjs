import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const idx = html.indexOf('<footer');
const endIdx = html.indexOf('</footer>', idx);
console.log('Footer length:', endIdx - idx);
const footerSlice = html.slice(idx, endIdx + 9);

// Search for 'Footer Logo' or SVG or text in this slice
const logoIdx = footerSlice.indexOf('Footer Logo');
console.log('Index of Footer Logo inside footerSlice:', logoIdx);
if (logoIdx !== -1) {
  console.log(footerSlice.slice(logoIdx - 200, logoIdx + 1500));
} else {
  console.log('No Footer Logo found in footerSlice!');
  // Let's see what is inside the bottom of footerSlice
  console.log('Bottom of footerSlice:', footerSlice.slice(-2000));
}
