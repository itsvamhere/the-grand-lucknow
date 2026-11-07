import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkThemeSwitch() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'networkidle' });

  for (let y = 6000; y <= 7500; y += 100) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(30);
    const info = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const p6Bottom = p6 ? Math.round(p6.getBoundingClientRect().bottom) : null;
      const stickyBtn = document.querySelector('[data-framer-name="Sticky Button"] a');
      const stickyBtnBg = stickyBtn ? window.getComputedStyle(stickyBtn).backgroundColor : null;
      const stickyBtnColor = stickyBtn ? window.getComputedStyle(stickyBtn).color : null;
      const h1FirstLet = document.querySelector('h1 span');
      const h1Op = h1FirstLet ? window.getComputedStyle(h1FirstLet).opacity : null;
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      return { p6Bottom, stickyBtnBg, stickyBtnColor, h1Op, bodyBg };
    });
    console.log(`y=${y}: p6Bottom=${info.p6Bottom}, bodyBg=${info.bodyBg}, stickyBtnBg=${info.stickyBtnBg}, h1Op=${info.h1Op}`);
  }

  await browser.close();
}

checkThemeSwitch().catch(console.error);
