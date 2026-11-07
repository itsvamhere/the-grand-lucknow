import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Scroll to grid
  const grid = await page.$('#mefgjz, [data-framer-name="Venues Grid"]');
  if (grid) {
    await grid.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
  }

  // Click first card
  const card = await page.$('[data-framer-name="Venue Item"] a');
  if (card) {
    console.log('Card href before click:', await card.getAttribute('href'));
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await card.click();
    await page.waitForTimeout(2500);

    const title = await page.title();
    const url = page.url();
    const body = await page.evaluate(() => document.body.innerText.substring(0, 300));
    console.log('Current URL after click:', url);
    console.log('Page Title:', title);
    console.log('Page Body preview:\n', body);
  }

  await browser.close();
}

main().catch(console.error);
