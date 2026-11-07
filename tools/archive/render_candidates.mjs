import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import wawoff2 from 'wawoff2';
import opentype from 'opentype.js';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const brainDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566';

const fontPath = path.join(root, 'fonts', 'el_pacre_regular.woff2');
const woff2Buf = fs.readFileSync(fontPath);
const ttfBuf = await wawoff2.decompress(woff2Buf);
const ab = ttfBuf.buffer.slice(ttfBuf.byteOffset, ttfBuf.byteOffset + ttfBuf.byteLength);
const font = opentype.parse(ab);

const fontSize = 36.048;
const baseline = 26.567;

function buildPathData(text, tracking, wordSpace, targetWidth = 216.285) {
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
  const actualW = bb.x2 - bb.x1;
  const shiftX = -bb.x1 + (targetWidth - actualW) / 2;

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

  return { d, width: actualW, height: bb.y2 - bb.y1 };
}

const optMatched = buildPathData('THE GRAND', 1.15, 14.0, 216.285);
const optNatural = buildPathData('THE GRAND', 0, 12.5, 216.285);

// Let's create an HTML comparison test page
const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
  body { margin: 0; padding: 40px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #222; color: #fff; }
  h2 { margin: 0 0 25px 0; font-size: 22px; font-weight: 500; }
  .section-title { font-size: 15px; margin: 25px 0 10px 0; color: #aaa; text-transform: uppercase; letter-spacing: 0.05em; }
  .row { display: flex; gap: 20px; margin-bottom: 25px; }
  .card { padding: 24px 28px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
  .card.dark { background: #1A241E; }
  .card.light { background: #FFF1C9; }
  .card.terra { background: #B86C46; }
  .label { font-size: 12px; margin-bottom: 14px; opacity: 0.7; }
  svg { display: block; }
</style>
</head>
<body>
  <h2>THE GRAND - Vector Logo Precision Rendering</h2>
  
  <div class="section-title">Matched Span (Tracking +1.15px, Width: 215px / 216px Container)</div>
  <div class="row">
    <div class="card dark">
      <div class="label">Over Dark Hero (#1A241E)</div>
      <svg viewBox="0 0 216.285 27" width="216.285" height="27">
        <path d="${optMatched.d}" fill="#FFF0CA"/>
      </svg>
    </div>
    <div class="card light">
      <div class="label" style="color:#1A241E">Over Cream Section (#FFF1C9)</div>
      <svg viewBox="0 0 216.285 27" width="216.285" height="27">
        <path d="${optMatched.d}" fill="#1A241E"/>
      </svg>
    </div>
    <div class="card terra">
      <div class="label">Over Terracotta (#B86C46)</div>
      <svg viewBox="0 0 216.285 27" width="216.285" height="27">
        <path d="${optMatched.d}" fill="#1A241E"/>
      </svg>
    </div>
  </div>

  <div class="section-title">Natural Kerning (Zero Extra Tracking, Width: 205px)</div>
  <div class="row">
    <div class="card dark">
      <div class="label">Over Dark Hero (#1A241E)</div>
      <svg viewBox="0 0 216.285 27" width="216.285" height="27">
        <path d="${optNatural.d}" fill="#FFF0CA"/>
      </svg>
    </div>
    <div class="card light">
      <div class="label" style="color:#1A241E">Over Cream Section (#FFF1C9)</div>
      <svg viewBox="0 0 216.285 27" width="216.285" height="27">
        <path d="${optNatural.d}" fill="#1A241E"/>
      </svg>
    </div>
    <div class="card terra">
      <div class="label">Over Terracotta (#B86C46)</div>
      <svg viewBox="0 0 216.285 27" width="216.285" height="27">
        <path d="${optNatural.d}" fill="#1A241E"/>
      </svg>
    </div>
  </div>
</body>
</html>
`;

const htmlPath = path.join(root, 'tools', 'compare_candidates.html');
fs.writeFileSync(htmlPath, html);

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1100, height: 600 } });
await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'load' });
await page.screenshot({ path: path.join(brainDir, 'the_grand_candidates_preview.png') });
await browser.close();

console.log('Saved comparison preview to brain/the_grand_candidates_preview.png');
fs.writeFileSync(path.join(root, 'tools', 'the_grand_matched_d.txt'), optMatched.d);
