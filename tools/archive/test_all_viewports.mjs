import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  const viewports = [
    { name: 'desktop-1920', width: 1920, height: 1080 },
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'tablet-1024', width: 1024, height: 768 },
    { name: 'tablet-810', width: 810, height: 1080 },
    { name: 'mobile-375', width: 375, height: 812 }
  ];
  
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
    
    // Scroll to map
    await page.evaluate(() => {
      const map = document.querySelector('#location') || document.querySelector('[data-framer-name="Location"]');
      if (map) map.scrollIntoView();
    });
    await page.waitForTimeout(500);
    
    const clearance = await page.evaluate(() => {
      const pin = document.querySelector('#grand-live-pointer');
      const btn = document.querySelector('[data-framer-name="Sticky Button"]') || document.querySelector('.framer-vO7O2');
      if (!pin) return { error: 'No pin' };
      const pRect = pin.getBoundingClientRect();
      const bRect = btn ? btn.getBoundingClientRect() : null;
      return {
        pinTop: pRect.top,
        pinBottom: pRect.bottom,
        pinLeft: pRect.left,
        pinRight: pRect.right,
        btnTop: bRect ? bRect.top : null,
        btnBottom: bRect ? bRect.bottom : null,
        btnLeft: bRect ? bRect.left : null,
        btnRight: bRect ? bRect.right : null,
        verticalClearance: bRect ? (bRect.top - pRect.bottom) : null
      };
    });
    
    console.log(`[${vp.name}] Clearance:`, clearance.verticalClearance, 'px. Pin Top:', clearance.pinTop, 'Btn Top:', clearance.btnTop);
    await page.screenshot({ path: `tools/map_test_${vp.name}.png` });
    await page.close();
  }
  
  await browser.close();
})();
