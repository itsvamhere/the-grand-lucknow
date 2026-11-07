import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://casamomo.at', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Wheel scroll
  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(300);
  }

  const logoState = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    const off = document.querySelector('[data-framer-name="Off"]');
    return {
      logoOpacity: l ? window.getComputedStyle(l).opacity : null,
      offOpacity: off ? window.getComputedStyle(off).opacity : null,
      scrollY: window.scrollY
    };
  });
  console.log('After wheel scroll on casamomo:', logoState);

  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/casamomo_scrolled_proof.png',
    clip: { x: 0, y: 0, width: 1440, height: 250 }
  });

  await browser.close();
}

run();
