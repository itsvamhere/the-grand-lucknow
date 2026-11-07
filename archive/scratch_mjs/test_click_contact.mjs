import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function clickContact() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Click Contact link in nav
  await page.click('a[href="./contact"], a[href="/contact"]');
  await page.waitForTimeout(1500);

  const text = await page.evaluate(() => document.body.innerText);
  console.log('--- Text after clicking Contact nav link: ---');
  console.log(text.slice(0, 1500));
  await browser.close();
}

clickContact().catch(console.error);
