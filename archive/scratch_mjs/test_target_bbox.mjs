import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  const fontBuf = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/fonts/el_pacre_regular.woff2');
  const fontBase64 = fontBuf.toString('base64');
  
  const html = `
    <style>
      @font-face { font-family: 'EL PACRE Regular'; src: url('data:font/woff2;base64,${fontBase64}') format('woff2'); }
    </style>
    <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
      <text id="t" x="0" y="23" font-family="'EL PACRE Regular', serif" font-size="30.5" stroke="#FFF0CA" stroke-width="0.95" paint-order="stroke fill" letter-spacing="0.14em" fill="#FFF0CA">THE GRAND</text>
    </svg>
  `;
  await page.setContent(html);
  await page.waitForTimeout(500);
  const bbox = await page.evaluate(() => {
    const b = document.querySelector('#t').getBBox();
    return { width: b.width, height: b.height, x: b.x, y: b.y };
  });
  console.log('Target BBox:\n', bbox);
  await browser.close();
}
run();
