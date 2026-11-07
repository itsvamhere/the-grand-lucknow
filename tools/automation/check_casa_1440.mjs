import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkCasaAt1440() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const p6 = document.querySelector('[data-framer-name="Gallery Image 6"]');
    const rect = p6 ? p6.getBoundingClientRect() : null;
    return {
      p6Top: rect ? Math.round(rect.top + window.scrollY) : null,
      p6Bottom: rect ? Math.round(rect.bottom + window.scrollY) : null,
      vh: window.innerHeight
    };
  });
  console.log('Casa at 1440x900 info:', info);

  // Let's find exact rollout start and end at 1440x900
  for (let y = info.p6Top - 200; y <= info.p6Bottom + 400; y += 100) {
    await page.evaluate((scrollY) => { window.scrollTo(0, scrollY); }, y);
    await page.waitForTimeout(50);
    
    const snap = await page.evaluate(() => {
      const h1 = document.querySelector('[data-framer-name="Sticky Header Text"] h1');
      const spans = h1 ? Array.from(h1.querySelectorAll('span')).filter(s => s.children.length === 0 && s.innerText.trim()) : [];
      return {
        scrollY: window.scrollY,
        firstWord: spans[0] ? {
          text: spans[0].innerText,
          style: spans[0].getAttribute('style')
        } : null
      };
    });
    console.log(`scrollY: ${y}`, JSON.stringify(snap));
  }

  await browser.close();
}

checkCasaAt1440().catch(console.error);
