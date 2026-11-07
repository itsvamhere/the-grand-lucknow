import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function verifyVisuals() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const stats = await page.evaluate(() => {
    const heroH1 = document.querySelector('h1') || document.querySelector('[data-framer-name="Big Text"]');
    const header = document.querySelector('header');
    return {
      h1Visible: heroH1 ? window.getComputedStyle(heroH1).opacity : 'null',
      headerVisible: header ? window.getComputedStyle(header).opacity : 'null',
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      windowScrollY: window.scrollY
    };
  });
  console.log('Visual stats:', stats);
  await browser.close();
}

verifyVisuals();
