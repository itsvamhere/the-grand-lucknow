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

const fontSize = 36.048;
const baseline = 26.567;

const chars = ['T', 'H', 'E', ' ', 'G', 'R', 'A', 'N', 'D'];
for (const ch of chars) {
  if (ch === ' ') {
    console.log(`Char ' ': space`);
    continue;
  }
  const glyph = font.charToGlyph(ch);
  const p = glyph.getPath(0, baseline, fontSize);
  const b = p.getBoundingBox();
  console.log(`Char '${ch}': width = ${(b.x2 - b.x1).toFixed(2)}, y1 = ${b.y1.toFixed(2)}, y2 = ${b.y2.toFixed(2)}, adv = ${(glyph.advanceWidth * fontSize / font.unitsPerEm).toFixed(2)}`);
}
