import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkMobileScroll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });

  for (let y of [0, 100, 300, 600, 1000, 2500]) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(100);
    const btn = await page.evaluate(() => {
      const el = document.querySelector('[data-framer-name="Menu Button"], .framer-1s5ig4a');
      if (!el) return null;
      const s = window.getComputedStyle(el);
      const parentS = window.getComputedStyle(el.parentElement);
      const grandParentS = window.getComputedStyle(el.parentElement.parentElement);
      return {
        display: s.display,
        visibility: s.visibility,
        opacity: s.opacity,
        rect: el.getBoundingClientRect(),
        parentOpacity: parentS.opacity,
        grandParentOpacity: grandParentS.opacity
      };
    });
    console.log(`y=${y} Menu Button:`, btn);
  }

  await browser.close();
}

checkMobileScroll().catch(console.error);
