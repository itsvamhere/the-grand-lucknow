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

// In the original wordmark, baseline:
// Notice y runs from 0 to 27 (SVG coordinate system: y=0 is top, y=27 is bottom).
// In OpenType, y goes UP from baseline.
// So in SVG, y_svg = baseline_y - y_font.
// When y_svg = 27 (bottom of O / C / S) and y_font = -12 (at fontSize 36.048: -12 * 36.048 / 1000 = -0.43),
// baseline_y is around 26.57.
const glyphC = font.charToGlyph('C');
const pC = glyphC.getPath(0, 26.567, 36.048);
const bC = pC.getBoundingBox();
console.log('Font generated C bbox:', bC);
