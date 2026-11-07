import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkSticky() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });

  for (let y = 5100; y <= 6200; y += 100) {
    await page.evaluate((scrollY) => { window.scrollTo(0, scrollY); }, y);
    await page.waitForTimeout(50);
    
    const snap = await page.evaluate(() => {
      const headerSec = document.querySelector('section#apartment-header, .framer-151qtkn');
      const stickyHeader = document.querySelector('[data-framer-name="Sticky Header Text"]');
      const stickyWrap = stickyHeader ? stickyHeader.parentElement : null;
      const colorChange = document.querySelector('[data-framer-name="Color Change"]');
      const mapSec = document.querySelector('#location, [data-framer-name="Map"]');
      
      return {
        scrollY: window.scrollY,
        stickyHeader: stickyHeader ? {
          position: window.getComputedStyle(stickyHeader).position,
          opacity: window.getComputedStyle(stickyHeader).opacity,
          rect: stickyHeader.getBoundingClientRect()
        } : null,
        stickyWrap: stickyWrap ? {
          position: window.getComputedStyle(stickyWrap).position,
          rect: stickyWrap.getBoundingClientRect()
        } : null,
        colorChange: colorChange ? {
          opacity: window.getComputedStyle(colorChange).opacity,
          rect: colorChange.getBoundingClientRect()
        } : null
      };
    });
    console.log(`scrollY: ${y}`, JSON.stringify(snap));
  }

  await browser.close();
}

checkSticky().catch(console.error);
