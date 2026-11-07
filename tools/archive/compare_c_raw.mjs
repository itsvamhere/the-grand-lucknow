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

// Original C subpath from wordmark.svg:
// "M 20.944 20.547 L 21.629 24.945 C 19.322 26.027 15.825 27 12.148 27 C 5.443 27 0 21.449 0 13.482 C 0 5.551 5.479 0.324 12.761 0 L 13.41 0 C 16.222 0 19.141 0.829 21.268 1.874 L 21.304 7.57 C 18.889 4.578 15.681 2.812 12.401 2.812 C 11.391 2.812 10.418 2.956 9.409 3.316 C 6.056 4.47 4.182 7.426 4.182 11.463 C 4.182 12.761 4.362 14.167 4.758 15.645 C 6.164 20.872 9.228 24.188 13.518 24.188 C 16.366 24.188 18.853 22.998 20.944 20.547 Z"

const rawPathC = font.charToGlyph('C').getPath(0, baseline, fontSize);
const rawSvgC = rawPathC.toPathData(3);
console.log('Raw SVG C:');
console.log(rawSvgC);
