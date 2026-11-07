import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import wawoff2 from 'wawoff2';
import opentype from 'opentype.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const fontPath = path.join(root, 'fonts', 'el_pacre_regular.woff2');
const woff2Buf = fs.readFileSync(fontPath);
const ttfBuf = await wawoff2.decompress(woff2Buf);
const ab = ttfBuf.buffer.slice(ttfBuf.byteOffset, ttfBuf.byteOffset + ttfBuf.byteLength);
const font = opentype.parse(ab);

// The original wordmark path has subpaths for each letter.
// Let's inspect the original subpaths in images/wordmark.svg
const svgContent = fs.readFileSync(path.join(root, 'images', 'wordmark.svg'), 'utf8');
const d = svgContent.match(/d="([^"]+)"/)[1];
const subpaths = d.split(/(?=M\s)/);
console.log('Subpaths count:', subpaths.length);

for (let i = 0; i < subpaths.length; i++) {
  const sp = subpaths[i];
  const coords = sp.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number);
  const xs = [];
  const ys = [];
  for (let j = 0; j < coords.length; j += 2) {
    xs.push(coords[j]);
    ys.push(coords[j+1]);
  }
  console.log(`Subpath ${i}: x=[${Math.min(...xs).toFixed(2)}, ${Math.max(...xs).toFixed(2)}] y=[${Math.min(...ys).toFixed(2)}, ${Math.max(...ys).toFixed(2)}]`);
}
