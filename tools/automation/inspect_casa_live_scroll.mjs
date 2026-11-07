import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function inspectCasaLive() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  const info = await page.evaluate(() => {
    const p6 = document.querySelector('[data-framer-name="Gallery Image 6"]');
    const p6Rect = p6 ? p6.getBoundingClientRect() : null;
    const h1 = document.querySelector('[data-framer-name="Sticky Header Text"] h1');
    const h1Spans = Array.from(h1 ? h1.querySelectorAll('span') : []).map(s => ({
      text: s.innerText,
      style: s.getAttribute('style'),
      rect: s.getBoundingClientRect()
    }));
    
    return {
      docHeight: document.documentElement.scrollHeight,
      p6Top: p6Rect ? Math.round(p6Rect.top + window.scrollY) : null,
      p6Bottom: p6Rect ? Math.round(p6Rect.bottom + window.scrollY) : null,
      h1Html: h1 ? h1.outerHTML : null,
      h1Spans
    };
  });
  console.log('Live Casamomo info:', info);

  // Let's scroll step by step from p6Top - 600 to p6Bottom + 1000
  const start = (info.p6Top || 6000) - 600;
  const end = (info.p6Bottom || 7500) + 800;
  const step = 200;

  for (let y = start; y <= end; y += step) {
    await page.evaluate((scrollY) => { window.scrollTo(0, scrollY); }, y);
    await page.waitForTimeout(100);
    
    const snap = await page.evaluate(() => {
      const h1 = document.querySelector('[data-framer-name="Sticky Header Text"] h1');
      const stickyHeader = document.querySelector('[data-framer-name="Sticky Header Text"]');
      const spans = h1 ? Array.from(h1.querySelectorAll('span')).filter(s => s.children.length === 0 && s.innerText.trim()) : [];
      return {
        scrollY: window.scrollY,
        stickyHeaderStyle: stickyHeader ? {
          opacity: window.getComputedStyle(stickyHeader).opacity,
          transform: window.getComputedStyle(stickyHeader).transform,
          display: window.getComputedStyle(stickyHeader).display
        } : null,
        words: spans.map(s => ({
          text: s.innerText.trim(),
          opacity: window.getComputedStyle(s).opacity,
          transform: window.getComputedStyle(s).transform,
          rect: s.getBoundingClientRect()
        }))
      };
    });
    console.log(`scrollY: ${y}`, JSON.stringify(snap));
    await page.screenshot({ path: `scripts/casa_live_y${y}.png` });
  }

  await browser.close();
}

inspectCasaLive().catch(console.error);
