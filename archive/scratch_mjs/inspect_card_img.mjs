import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('https://the-grand-lucknow.vercel.app/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(1000);

  // Decode all images in view
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(imgs.map(i => i.decode().catch(() => {})));
  });
  await page.waitForTimeout(500);

  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a/verified_decoded_cards.png' });
  console.log('Saved verified_decoded_cards.png');
  await browser.close();
}

main().catch(console.error);
