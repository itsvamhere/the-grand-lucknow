import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkCardStyles() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 2600));
  await page.waitForTimeout(1000);

  // Check card border and image styles
  const styles = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[data-framer-name="Venue Card"], .framer-ysBPc'));
    return cards.map(c => {
      const img = c.querySelector('img');
      const cs = window.getComputedStyle(c);
      const is = img ? window.getComputedStyle(img) : null;
      return {
        cardBorder: cs.border,
        cardBg: cs.backgroundColor,
        imgBorder: is ? is.border : null,
        imgObjectFit: is ? is.objectFit : null,
        imgSrc: img ? img.src : null
      };
    });
  });

  console.log('Card styles:', JSON.stringify(styles, null, 2));
  await browser.close();
}

checkCardStyles().catch(console.error);
