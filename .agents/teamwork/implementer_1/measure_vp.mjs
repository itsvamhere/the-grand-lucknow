import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function measureViewports() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  for (const [w, h] of [[1024, 768], [1280, 800], [1440, 900], [1600, 900]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const data = await page.evaluate(() => {
      const header = document.querySelector('section#apartment-header, .framer-151qtkn');
      const photos = Array.from(document.querySelectorAll('.framer-lanjrj, .framer-p8p269, [data-framer-name="Photo"]'));
      const lastPhoto = photos[photos.length - 1];
      return {
        headerHeight: header ? header.offsetHeight : null,
        headerTop: header ? header.offsetTop : null,
        lastPhotoTop: lastPhoto ? lastPhoto.offsetTop : null,
        lastPhotoHeight: lastPhoto ? lastPhoto.offsetHeight : null,
        scrollHeight: document.documentElement.scrollHeight
      };
    });
    console.log(`Viewport ${w}x${h}:`, JSON.stringify(data));
    await page.close();
  }

  await browser.close();
}

measureViewports().catch(console.error);
