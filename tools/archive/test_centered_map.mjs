import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testMapCentering() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  
  // Try centering the map and the pointer
  await page.evaluate(() => {
    const map = document.getElementById('subpage-vector-map');
    if (map) {
      map.style.width = '100%';
      map.style.left = '0';
      map.style.height = '100%';
      const img = map.querySelector('img');
      if (img) {
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.objectPosition = 'center center';
      }
    }
    const pointer = document.getElementById('grand-live-pointer');
    if (pointer) {
      pointer.style.left = '50%';
      pointer.style.top = '40%';
    }
  });
  
  await page.evaluate(() => {
    const map = document.getElementById('subpage-vector-map');
    if (map) map.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/test_centered_map.png' });
  console.log('Saved test_centered_map.png to artifacts');
  
  const stats = await page.evaluate(() => {
    const pointer = document.getElementById('grand-live-pointer');
    const pRect = pointer ? pointer.getBoundingClientRect() : null;
    const btn = document.querySelector('[data-framer-name="Sticky Button"]');
    const bRect = btn ? btn.getBoundingClientRect() : null;
    return {
      pointerX: pRect ? (pRect.left + pRect.width / 2) : 0,
      pointerXPercent: pRect ? ((pRect.left + pRect.width / 2) / window.innerWidth * 100) : 0,
      pointerY: pRect ? pRect.top : 0,
      btnTop: bRect ? bRect.top : 0,
      clearance: (pRect && bRect) ? (bRect.top - pRect.bottom) : 0
    };
  });
  console.log('Stats:', stats);
  
  await browser.close();
}

testMapCentering().catch(console.error);
