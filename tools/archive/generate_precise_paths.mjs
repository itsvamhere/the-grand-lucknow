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

function buildPathData(text, tracking, wordSpace) {
  const glyphs = font.stringToGlyphs(text);
  let curX = 0;
  const p = new opentype.Path();

  for (let i = 0; i < glyphs.length; i++) {
    const g = glyphs[i];
    const ch = text[i];
    if (ch === ' ') {
      curX += wordSpace;
      continue;
    }
    const glyphPath = g.getPath(curX, baseline, fontSize);
    for (const cmd of glyphPath.commands) {
      p.commands.push(cmd);
    }
    const kern = (i < glyphs.length - 1 && text[i+1] !== ' ') ? font.getKerningValue(g, glyphs[i+1]) : 0;
    curX += (g.advanceWidth + kern) * fontSize / 1000 + tracking;
  }

  const bb = p.getBoundingBox();
  const shiftX = -bb.x1; // flush to x=0

  const d = p.commands.map(cmd => {
    switch (cmd.type) {
      case 'M': return `M ${(cmd.x + shiftX).toFixed(3)} ${cmd.y.toFixed(3)}`;
      case 'L': return `L ${(cmd.x + shiftX).toFixed(3)} ${cmd.y.toFixed(3)}`;
      case 'C': return `C ${(cmd.x1 + shiftX).toFixed(3)} ${cmd.y1.toFixed(3)} ${(cmd.x2 + shiftX).toFixed(3)} ${(cmd.y2.toFixed(3))} ${(cmd.x + shiftX).toFixed(3)} ${cmd.y.toFixed(3)}`;
      case 'Q': return `Q ${(cmd.x1 + shiftX).toFixed(3)} ${cmd.y1.toFixed(3)} ${(cmd.x + shiftX).toFixed(3)} ${cmd.y.toFixed(3)}`;
      case 'Z': return 'Z';
      default: return '';
    }
  }).join(' ');

  return { d, width: bb.x2 - bb.x1, height: bb.y2 - bb.y1, xMin: bb.x1 + shiftX, xMax: bb.x2 + shiftX };
}

// 1. Natural kerning + 12.5px word space
const opt1 = buildPathData('THE GRAND', 0, 12.5);
console.log('Opt 1 (Natural):', opt1.width.toFixed(2), 'x', opt1.height.toFixed(2));

// 2. Tracking 1.15px so total width is 216.0px (exact match to CASA MOMO's 216.285)
const opt2 = buildPathData('THE GRAND', 1.15, 14.0);
console.log('Opt 2 (Matched 216px):', opt2.width.toFixed(2), 'x', opt2.height.toFixed(2));

fs.writeFileSync(path.join(root, 'tools', 'path_opt1.json'), JSON.stringify(opt1));
fs.writeFileSync(path.join(root, 'tools', 'path_opt2.json'), JSON.stringify(opt2));
