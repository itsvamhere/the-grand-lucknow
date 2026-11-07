import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Let's check the 6 photos
  const photoDetails = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('.framer-1rjv5m9 img'));
    return imgs.map((img, i) => {
      const rect = img.getBoundingClientRect();
      const parent = img.closest('.framer-18k7fzy') || img.parentElement;
      const pRect = parent.getBoundingClientRect();
      return {
        i,
        src: img.src.slice(-30),
        top: rect.top + window.scrollY,
        height: rect.height,
        bottom: rect.bottom + window.scrollY
      };
    });
  });

  console.log('Photos:', JSON.stringify(photoDetails, null, 2));

  await browser.close();
}

test().catch(console.error);
