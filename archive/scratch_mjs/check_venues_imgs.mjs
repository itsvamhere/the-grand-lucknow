import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function check() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const imgs = await page.$$eval('img', els => els.map(i => ({ src: i.src, naturalWidth: i.naturalWidth })));
  console.log('All images on /venues (total ' + imgs.length + '):');
  console.log(imgs);
  await browser.close();
}
check().catch(console.error);
