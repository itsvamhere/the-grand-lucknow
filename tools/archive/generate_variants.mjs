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

function generateTheGrandPath(tracking = 0, wordSpaceBonus = 0) {
  const text = 'THE GRAND';
  const glyphs = font.stringToGlyphs(text);
  let curX = 0;
  const fullPath = new opentype.Path();

  for (let i = 0; i < glyphs.length; i++) {
    const g = glyphs[i];
    const ch = text[i];
    if (ch === ' ') {
      curX += (g.advanceWidth * fontSize / 1000) + wordSpaceBonus;
      continue;
    }
    const glyphPath = g.getPath(curX, baseline, fontSize);
    for (const cmd of glyphPath.commands) {
      fullPath.commands.push(cmd);
    }
    const kern = (i < glyphs.length - 1 && text[i+1] !== ' ') ? font.getKerningValue(g, glyphs[i+1]) : 0;
    curX += (g.advanceWidth + kern) * fontSize / 1000 + tracking;
  }
  return { path: fullPath, width: curX };
}

// Let's test a few variants:
// 1. Natural kerning + word space bonus 4px (natural tracking)
const var1 = generateTheGrandPath(0, 4.5);
const bb1 = var1.path.getBoundingBox();
console.log('Var 1 (Natural):', bb1, 'width:', bb1.x2 - bb1.x1);

// 2. Slight tracking (1.2px) so it fills ~212px exactly like CASA MOMO
const var2 = generateTheGrandPath(1.2, 5.0);
const bb2 = var2.path.getBoundingBox();
console.log('Var 2 (Matched 212px):', bb2, 'width:', bb2.x2 - bb2.x1);

// Let's also check shifting so x1 = 0
function toSvgPathString(pathObj, shiftX = 0) {
  return pathObj.commands.map(cmd => {
    switch (cmd.type) {
      case 'M': return `M ${(cmd.x + shiftX).toFixed(3)} ${cmd.y.toFixed(3)}`;
      case 'L': return `L ${(cmd.x + shiftX).toFixed(3)} ${cmd.y.toFixed(3)}`;
      case 'C': return `C ${(cmd.x1 + shiftX).toFixed(3)} ${cmd.y1.toFixed(3)} ${(cmd.x2 + shiftX).toFixed(3)} ${(cmd.y2.toFixed(3))} ${(cmd.x + shiftX).toFixed(3)} ${cmd.y.toFixed(3)}`;
      case 'Q': return `Q ${(cmd.x1 + shiftX).toFixed(3)} ${cmd.y1.toFixed(3)} ${(cmd.x + shiftX).toFixed(3)} ${cmd.y.toFixed(3)}`;
      case 'Z': return 'Z';
      default: return '';
    }
  }).join(' ');
}

const shift1 = -bb1.x1;
const d1 = toSvgPathString(var1.path, shift1);

const shift2 = -bb2.x1;
const d2 = toSvgPathString(var2.path, shift2);

fs.writeFileSync(path.join(root, 'tools', 'the_grand_var1.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216.285" height="27"><path d="${d1}" fill="#FFF0CA"/></svg>`);
fs.writeFileSync(path.join(root, 'tools', 'the_grand_var2.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216.285" height="27"><path d="${d2}" fill="#FFF0CA"/></svg>`);
console.log('Saved the_grand_var1.svg and the_grand_var2.svg');
