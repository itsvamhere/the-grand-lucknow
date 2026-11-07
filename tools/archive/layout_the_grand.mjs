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

const text = 'THE GRAND';
let x = 0;
const glyphs = font.stringToGlyphs(text);
for (let i = 0; i < glyphs.length; i++) {
  const g = glyphs[i];
  const kern = (i < glyphs.length - 1) ? font.getKerningValue(g, glyphs[i+1]) : 0;
  console.log(`[${i}] '${text[i]}': x=${x.toFixed(2)}, adv=${(g.advanceWidth * fontSize / 1000).toFixed(2)}, kern=${(kern * fontSize / 1000).toFixed(2)}`);
  x += (g.advanceWidth + kern) * fontSize / 1000;
}
console.log('Total unadjusted width for THE GRAND:', x.toFixed(2));
const p = font.getPath(text, 0, baseline, fontSize, { kerning: true });
console.log('Path bounding box for THE GRAND:', p.getBoundingBox());
