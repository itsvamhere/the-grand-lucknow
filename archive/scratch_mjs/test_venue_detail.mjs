import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testDetail() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3003/venues/boutique-n2 ...');
  const res = await page.goto('http://localhost:3003/venues/boutique-n2', { waitUntil: 'networkidle' });
  console.log('Response status:', res.status());
  await page.waitForTimeout(2000);

  const title = await page.title();
  console.log('Page title:', title);

  const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 1000));
  console.log('Body text preview:\n', bodyText);

  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a/venue_detail_current.png' });
  console.log('Screenshot saved to venue_detail_current.png');

  await browser.close();
}

testDetail().catch(console.error);
