import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkOrig() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'networkidle' });

  console.log('--- SCROLLING ORIG ---');
  for (let y = 5000; y <= 7500; y += 300) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(50);
    const info = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const p6Bottom = p6 ? Math.round(p6.getBoundingClientRect().bottom) : null;
      const cc = document.querySelector('[data-framer-name="Color Change"] .framer-uo2c0');
      const ccBg = cc ? window.getComputedStyle(cc).backgroundColor : null;
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      return { p6Bottom, ccBg, bodyBg };
    });
    console.log(`y=${y}: p6Bottom=${info.p6Bottom}, bodyBg=${info.bodyBg}, ccBg=${info.ccBg}`);
  }

  await browser.close();
}

checkOrig().catch(console.error);
