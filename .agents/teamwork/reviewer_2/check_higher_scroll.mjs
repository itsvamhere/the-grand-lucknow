import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkHigherScroll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'networkidle' });

  for (let y = 7200; y <= 8200; y += 100) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(50);

    const data = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const p6Rect = p6 ? p6.getBoundingClientRect() : null;
      const el = document.elementFromPoint(200, 200);
      return {
        p6Rect: p6Rect ? { top: Math.round(p6Rect.top), bottom: Math.round(p6Rect.bottom), right: Math.round(p6Rect.right) } : null,
        bgAtPoint: el ? window.getComputedStyle(el).backgroundColor : null,
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        elAtPoint: el ? el.tagName + '.' + el.className : null
      };
    });

    console.log(`y=${y}: p6=${JSON.stringify(data.p6Rect)}, pointBg=${data.bgAtPoint}, bodyBg=${data.bodyBg}, el=${data.elAtPoint}`);
  }

  await browser.close();
}

checkHigherScroll().catch(console.error);
