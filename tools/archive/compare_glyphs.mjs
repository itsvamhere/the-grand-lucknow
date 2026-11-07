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

// In raw font, let's see glyphs C, A, S, A,  , M, O, M, O
const glyphs = font.stringToGlyphs('CASA MOMO');
console.log('Glyphs:', glyphs.map(g => g.name));

// Let's find what fontSize gives height 27 for 'C' or 'O'
// In OpenType, unitsPerEm is typically 1000
console.log('unitsPerEm:', font.unitsPerEm);
console.log('ascender:', font.ascender, 'descender:', font.descender);

// Let's test font size:
// If height = 27 in viewBox, let's find the scale
const glyphC = font.charToGlyph('C');
const bboxC = glyphC.getBoundingBox();
console.log('Glyph C bbox:', bboxC);
const glyphHeight = bboxC.y2 - bboxC.y1;
console.log('Glyph C height in font units:', glyphHeight);
// fontSize * (glyphHeight / unitsPerEm) = 27
const targetFontSize = 27 / (glyphHeight / font.unitsPerEm);
console.log('Target font size for height 27:', targetFontSize);
