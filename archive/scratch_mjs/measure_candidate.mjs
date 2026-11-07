import fs from 'fs';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function measureBbox() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  const fontBuf = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/fonts/el_pacre_regular.woff2');
  const fontB64 = fontBuf.toString('base64');
  await page.setContent(`
    <style>
      @font-face {
        font-family: "EL PACRE Regular";
        src: url("data:font/woff2;base64,${fontB64}") format("woff2");
      }
    </style>
    <svg id="s" viewBox="0 0 216.285 27" width="216.285" height="27">
      <text id="t" x="50%" y="22.5" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="27" font-weight="700" stroke="#000" stroke-width="0.75" paint-order="stroke fill" letter-spacing="0.14em" fill="#000">THE GRAND</text>
    </svg>
  `);
  await page.waitForTimeout(500);

  const box = await page.evaluate(() => {
    const b = document.getElementById('t').getBBox();
    return { x: Math.round(b.x), y: Math.round(b.y), width: Math.round(b.width), height: Math.round(b.height) };
  });

  console.log('Candidate 2 Box:', box);
  await browser.close();
}

measureBbox().catch(console.error);
