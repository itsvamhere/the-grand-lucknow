import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('https://the-grand-lucknow.vercel.app/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(1000);

  const card = await page.evaluate(() => {
    const img = document.querySelector('img[src*="card_1"]');
    if (!img) return 'no img';
    let el = img;
    const hierarchy = [];
    while (el && el !== document.body) {
      hierarchy.push({
        tag: el.tagName,
        class: el.className,
        bg: window.getComputedStyle(el).backgroundColor,
        zIndex: window.getComputedStyle(el).zIndex,
        opacity: window.getComputedStyle(el).opacity,
        overflow: window.getComputedStyle(el).overflow
      });
      el = el.parentElement;
    }
    return hierarchy;
  });
  console.log('Card hierarchy:', JSON.stringify(card, null, 2));
  await browser.close();
}

main().catch(console.error);
