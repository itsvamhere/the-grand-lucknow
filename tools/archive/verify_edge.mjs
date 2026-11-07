import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('--- 1. Testing /venues/boutique-n1 ---');
  await page.goto('http://localhost:3000/venues/boutique-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  console.log('Final URL after visiting boutique-n1:', page.url());
  console.log('Title:', await page.title());
  await page.screenshot({ path: `${ARTIFACTS}/test_redirect_boutique.png` });

  console.log('--- 2. Testing /venues/venue-n1 ---');
  await page.goto('http://localhost:3000/venues/venue-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  console.log('Final URL after visiting venue-n1:', page.url());
  console.log('Title:', await page.title());
  const bodyText = await page.innerText('body');
  console.log('Contains 404 text:', bodyText.includes("doesn't exist"));
  console.log('Contains "Sorry":', bodyText.includes("Sorry"));
  console.log('First 300 chars:', bodyText.substring(0, 300).replace(/\s+/g, ' '));
  await page.screenshot({ path: `${ARTIFACTS}/test_venue_n1_latest.png` });

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
