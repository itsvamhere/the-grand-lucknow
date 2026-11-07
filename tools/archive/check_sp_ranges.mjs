import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const svgContent = fs.readFileSync(path.join(root, 'images', 'wordmark.svg'), 'utf8');
const d = svgContent.match(/d="([^"]+)"/)[1];
const subpaths = d.split(/(?=M\s)/);

const letterBounds = [];
for (const sp of subpaths) {
  const coords = sp.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number);
  const xs = [];
  for (let j = 0; j < coords.length; j += 2) xs.push(coords[j]);
  letterBounds.push({ xMin: Math.min(...xs), xMax: Math.max(...xs) });
}

// Group into the 8 letters
letterBounds.sort((a,b) => a.xMin - b.xMin);
console.log('Sorted subpath x ranges:', letterBounds);
