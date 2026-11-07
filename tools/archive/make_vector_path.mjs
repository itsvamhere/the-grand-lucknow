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

console.log('Font names:', font.names);
console.log('Num glyphs:', font.numGlyphs);
const text = "THE GRAND";
const pathObj = font.getPath(text, 0, 100, 72);
console.log('Path commands length:', pathObj.commands.length);
