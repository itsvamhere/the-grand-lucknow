import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function scrollTest() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues', { waitUntil: 'networkidle' });

  // Scroll through the page
  for (let y = 0; y <= 6000; y += 1000) {
    await page.evaluate(top => window.scrollTo(0, top), y);
    await page.waitForTimeout(400);
  }

  const loadedImgs = await page.$$eval('img', els => {
    return els.map(i => ({ src: i.src.replace('http://localhost:3003', ''), width: i.naturalWidth, height: i.naturalHeight }));
  });
  console.log('Loaded images count:', loadedImgs.filter(i => i.width > 0).length, 'out of', loadedImgs.length);
  console.log(loadedImgs.slice(0, 12));

  await browser.close();
}
scrollTest().catch(console.error);
