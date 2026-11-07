import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function inspectHero() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const heroDetails = await page.evaluate(() => {
    const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
    const photos = Array.from(document.querySelectorAll('[data-framer-name*="Photo"], [data-framer-name*="Gallery"]'));
    return {
      secHeight: sec?.offsetHeight,
      photosCount: photos.length,
      photos: photos.map(p => ({
        name: p.getAttribute('data-framer-name'),
        class: p.className,
        rect: p.getBoundingClientRect()
      }))
    };
  });

  console.log('Hero details:', JSON.stringify(heroDetails, null, 2));
  await browser.close();
}

inspectHero().catch(console.error);
