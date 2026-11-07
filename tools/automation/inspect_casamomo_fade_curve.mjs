import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  const scrollEffect = await page.evaluate(async () => {
    const locH = Array.from(document.querySelectorAll('*')).find(el => el.textContent.trim() === 'Location' && el.children.length === 0);
    const parentContainer = document.querySelector('.framer-3msmtm-container');
    
    // Look at scroll values around 9000 to 9800
    const trace = [];
    for (let y = 9200; y <= 9800; y += 25) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 20));
      const locR = locH.getBoundingClientRect();
      trace.push({
        scrollY: y,
        locTop: Math.round(locR.top),
        containerOpacity: window.getComputedStyle(parentContainer).opacity,
        containerTransform: window.getComputedStyle(parentContainer).transform
      });
    }
    return trace;
  });

  console.log(JSON.stringify(scrollEffect, null, 2));
  await browser.close();
})();
