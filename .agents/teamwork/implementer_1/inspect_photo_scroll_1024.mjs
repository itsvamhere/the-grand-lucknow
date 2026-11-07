import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Let's check the 6 photos
  const photoDetails = await page.evaluate(() => {
    const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
    const scrollMax = sec.offsetHeight - window.innerHeight;
    const imgs = Array.from(document.querySelectorAll('.framer-1rjv5m9 img'));
    return {
      scrollMax,
      photos: imgs.map((img, i) => {
        const rect = img.getBoundingClientRect();
        return {
          i,
          top: rect.top + window.scrollY,
          height: rect.height,
          bottom: rect.bottom + window.scrollY
        };
      })
    };
  });

  console.log('Photos at 1024x768:', JSON.stringify(photoDetails, null, 2));

  await browser.close();
}

test().catch(console.error);
