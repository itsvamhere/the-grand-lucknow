import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  for (const vp of [{ width: 1440, height: 900 }, { width: 1024, height: 768 }]) {
    const page = await browser.newPage({ viewport: vp });
    await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    const info = await page.evaluate(() => {
      const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
      const photos = Array.from(document.querySelectorAll('.framer-1rjv5m9 > div'));
      const secH = sec ? sec.offsetHeight : 0;
      const scrollMax = secH - window.innerHeight;
      
      const photoOffsets = photos.map((p, i) => {
        const top = p.offsetTop;
        const h = p.offsetHeight;
        return { index: i + 1, top, h, bottom: top + h };
      });

      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        secHeight: secH,
        scrollMax,
        photoCount: photos.length,
        photoOffsets
      };
    });

    console.log(`\n=== Viewport ${vp.width}x${vp.height} ===`);
    console.log('secHeight:', info.secHeight, 'scrollMax:', info.scrollMax);
    console.log('Photos:', JSON.stringify(info.photoOffsets, null, 2));
    await page.close();
  }
  await browser.close();
}

test().catch(console.error);
