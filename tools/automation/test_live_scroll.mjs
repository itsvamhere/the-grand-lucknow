import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testScroll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Get gallery photo positions
  const photos = await page.evaluate(() => {
    const list = [];
    for (let i = 1; i <= 6; i++) {
      const el = document.querySelector(`[data-framer-name="Gallery Image ${i}"]`) || document.querySelector(`.framer-10thn2s-container`);
      if (el) {
        const r = el.getBoundingClientRect();
        list.push({
          idx: i,
          top: r.top + window.scrollY,
          bottom: r.bottom + window.scrollY,
          height: r.height
        });
      }
    }
    const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
    const secH = sec ? sec.offsetHeight : 0;
    return { photos: list, sectionHeight: secH, docHeight: document.body.scrollHeight };
  });

  console.log('Scroll metrics on live page:', photos);
  await browser.close();
}

testScroll().catch(console.error);
