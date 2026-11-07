import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('https://the-grand-lucknow.vercel.app/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(1000);

  const cardDetails = await page.evaluate(() => {
    const card = document.querySelector('a.framer-prpyo3');
    if (!card) return 'no card';
    const children = Array.from(card.querySelectorAll('*'));
    return children.map(c => ({
      tag: c.tagName,
      class: c.className,
      style: c.getAttribute('style'),
      bg: window.getComputedStyle(c).backgroundColor,
      opacity: window.getComputedStyle(c).opacity,
      rect: c.getBoundingClientRect()
    }));
  });
  console.log('Card details:', JSON.stringify(cardDetails, null, 2));
  await browser.close();
}

main().catch(console.error);
