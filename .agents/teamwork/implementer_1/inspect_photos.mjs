import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkPhotoPositions() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const info = await page.evaluate(() => {
    // Check height of sections and gallery items
    const headerSec = document.querySelector('section#apartment-header, .framer-151qtkn');
    const headerRect = headerSec ? headerSec.getBoundingClientRect() : null;
    const headerHeight = headerSec ? headerSec.offsetHeight : null;

    // Check all photos or gallery items
    const photos = Array.from(document.querySelectorAll('[data-framer-name="Photo"], [data-framer-name="Photos"] > div, .framer-lanjrj, .framer-p8p269'));
    const photoRects = photos.map((p, i) => {
      const r = p.getBoundingClientRect();
      return {
        i,
        className: p.className,
        offsetTop: p.offsetTop,
        offsetHeight: p.offsetHeight,
        top: r.top + window.scrollY
      };
    });

    return {
      totalScrollHeight: document.documentElement.scrollHeight,
      headerHeight,
      photoRects
    };
  });

  console.log('Page layout info:', JSON.stringify(info, null, 2));

  await browser.close();
}

checkPhotoPositions().catch(console.error);
