import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkRange() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });

  for (let y = 4900; y <= 5600; y += 50) {
    await page.evaluate((scrollY) => { window.scrollTo(0, scrollY); }, y);
    await page.waitForTimeout(50);
    
    const snap = await page.evaluate(() => {
      const h1 = document.querySelector('[data-framer-name="Sticky Header Text"] h1');
      const stickyHeader = document.querySelector('[data-framer-name="Sticky Header Text"]');
      const spans = h1 ? Array.from(h1.querySelectorAll('span')).filter(s => s.children.length === 0 && s.innerText.trim()) : [];
      return {
        scrollY: window.scrollY,
        firstWord: spans[0] ? {
          text: spans[0].innerText,
          style: spans[0].getAttribute('style'),
          rect: spans[0].getBoundingClientRect()
        } : null
      };
    });
    console.log(`scrollY: ${y}`, JSON.stringify(snap));
  }

  await browser.close();
}

checkRange().catch(console.error);
