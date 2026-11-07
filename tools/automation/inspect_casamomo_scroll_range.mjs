import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  const report = await page.evaluate(async () => {
    const loc = Array.from(document.querySelectorAll('*')).find(el => el.textContent.trim() === 'Location' && el.children.length === 0);
    const bigtext = document.getElementById('bigtext-1');
    const logs = [];

    for (let sy = 9400; sy <= 9900; sy += 50) {
      window.scrollTo(0, sy);
      await new Promise(r => setTimeout(r, 40));
      const r = loc.getBoundingClientRect();
      const btr = bigtext ? bigtext.getBoundingClientRect() : null;
      
      // Look at all elements inside bigtext
      const items = Array.from(bigtext.querySelectorAll('*')).map(el => {
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          class: el.className,
          opacity: cs.opacity,
          transform: cs.transform
        };
      }).filter(x => parseFloat(x.opacity) < 0.99 || x.transform !== 'none');

      logs.push({
        scrollY: sy,
        locTop: r.top,
        bigtextTop: btr ? btr.top : null,
        bigtextOpacity: window.getComputedStyle(bigtext).opacity,
        itemsWithChange: items
      });
    }
    return logs;
  });

  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})();
