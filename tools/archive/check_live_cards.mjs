import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Find all cards in #mefgjz or .framer-cbil4k
  const cardsInfo = await page.evaluate(() => {
    const grid = document.getElementById('mefgjz') || document.querySelector('[data-framer-name="Venues Grid"]');
    if (!grid) return { error: 'grid not found' };
    const items = Array.from(grid.querySelectorAll('[data-framer-name="Venue Item"]'));
    return items.map((it, idx) => {
      const h2 = it.querySelector('h2');
      const a = it.querySelector('a');
      const allText = it.innerText.replace(/\s+/g, ' ').trim();
      return {
        idx,
        href: a ? a.href : null,
        h2Text: h2 ? h2.innerText.trim() : null,
        h2Html: h2 ? h2.innerHTML : null,
        allText: allText.substring(0, 100)
      };
    });
  });

  console.log('Cards Info in live DOM:', JSON.stringify(cardsInfo, null, 2));

  await browser.close();
}

main().catch(console.error);
