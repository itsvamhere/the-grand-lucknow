import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkMap() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  
  // Scroll to location/map
  await page.evaluate(() => {
    const map = document.getElementById('subpage-vector-map') || document.querySelector('[data-framer-name="Location"]');
    if (map) map.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(1000);
  
  const mapData = await page.evaluate(() => {
    const pointer = document.getElementById('grand-live-pointer');
    const mapContainer = document.getElementById('subpage-vector-map');
    const locSection = document.querySelector('[data-framer-name="Location"]');
    const stickyBtn = document.querySelector('[data-framer-name="Sticky Button"] a') || document.querySelector('[data-framer-name="Sticky Button"]');
    
    const pRect = pointer ? pointer.getBoundingClientRect() : null;
    const cRect = mapContainer ? mapContainer.getBoundingClientRect() : null;
    const lRect = locSection ? locSection.getBoundingClientRect() : null;
    const bRect = stickyBtn ? stickyBtn.getBoundingClientRect() : null;
    
    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      pointerRect: pRect,
      pointerViewportPercent: pRect ? {
        x: (pRect.left + pRect.width / 2) / window.innerWidth * 100,
        y: (pRect.top + pRect.height / 2) / window.innerHeight * 100
      } : null,
      stickyBtnRect: bRect,
      clearanceFromButton: (pRect && bRect) ? (bRect.top - pRect.bottom) : null
    };
  });
  
  console.log('Map Data:', JSON.stringify(mapData, null, 2));
  
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/current_subpage_map_test.png' });
  console.log('Screenshot saved to current_subpage_map_test.png');
  
  await browser.close();
}

checkMap().catch(console.error);
