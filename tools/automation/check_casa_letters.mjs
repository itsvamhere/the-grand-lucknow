import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkAllLetters() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });

  for (let y of [5120, 5160, 5200, 5240, 5280, 5320, 5360, 5400]) {
    await page.evaluate((scrollY) => { window.scrollTo(0, scrollY); }, y);
    await page.waitForTimeout(50);
    
    const snap = await page.evaluate(() => {
      const h1 = document.querySelector('[data-framer-name="Sticky Header Text"] h1');
      const spans = h1 ? Array.from(h1.querySelectorAll('span')).filter(s => s.children.length === 0 && s.innerText.trim()) : [];
      return spans.map(s => ({
        letter: s.innerText,
        style: s.getAttribute('style')
      }));
    });
    console.log(`scrollY: ${y}`, JSON.stringify(snap));
  }

  await browser.close();
}

checkAllLetters().catch(console.error);
