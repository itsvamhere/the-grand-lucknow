import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000/venues/venue-n1 ...');
  await page.goto('http://localhost:3000/venues/venue-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const title = await page.title();
  const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 300));
  console.log('Page Title:', title);
  console.log('Body Text:', bodyText);

  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3/test_current_venue_n1.png', fullPage: false });
  console.log('Screenshot saved to test_current_venue_n1.png');

  await browser.close();
}

main().catch(console.error);
