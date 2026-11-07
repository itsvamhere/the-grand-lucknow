import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const svgContent = fs.readFileSync(path.join(root, 'images', 'wordmark.svg'), 'utf8');
const dMatch = svgContent.match(/d="([^"]+)"/);
if (!dMatch) {
  console.error('No d found');
  process.exit(1);
}

const d = dMatch[1];
// Extract all coordinates
const coords = d.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number);
const xs = [];
const ys = [];
for (let i = 0; i < coords.length; i += 2) {
  xs.push(coords[i]);
  ys.push(coords[i + 1]);
}

console.log('Original CASA MOMO metrics:');
console.log('xMin:', Math.min(...xs), 'xMax:', Math.max(...xs), 'width:', Math.max(...xs) - Math.min(...xs));
console.log('yMin:', Math.min(...ys), 'yMax:', Math.max(...ys), 'height:', Math.max(...ys) - Math.min(...ys));
