import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkCasaLayout() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });

  for (let y of [0, 500, 1500, 3000, 4500, 5000]) {
    await page.evaluate((scrollY) => { window.scrollTo(0, scrollY); }, y);
    await page.waitForTimeout(50);
    
    const snap = await page.evaluate(() => {
      const h1 = document.querySelector('[data-framer-name="Sticky Header Text"] h1');
      const p1 = document.querySelector('[data-framer-name="Gallery Image 1"]');
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"]');
      const gallery = document.querySelector('[data-framer-name="Gallery"]');
      
      return {
        scrollY: window.scrollY,
        h1Rect: h1 ? h1.getBoundingClientRect() : null,
        p1Rect: p1 ? p1.getBoundingClientRect() : null,
        p6Rect: p6 ? p6.getBoundingClientRect() : null,
        galleryRect: gallery ? gallery.getBoundingClientRect() : null
      };
    });
    console.log(`scrollY: ${y}`, JSON.stringify(snap, null, 2));
    await page.screenshot({ path: `scripts/casa_layout_y${y}.png` });
  }

  await browser.close();
}

checkCasaLayout().catch(console.error);
