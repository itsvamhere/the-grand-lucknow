import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkLiveMap() {
  console.log('Inspecting live map on casamomo.at ...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const mapData = await page.evaluate(() => {
    const map = document.querySelector('[data-framer-name="Location Map"]');
    if (!map) return { found: false };
    const imgs = Array.from(map.querySelectorAll('img')).map(img => ({
      src: img.src,
      currentSrc: img.currentSrc,
      className: img.className,
      style: img.getAttribute('style')
    }));
    const canvases = Array.from(map.querySelectorAll('canvas')).map(c => ({
      width: c.width,
      height: c.height
    }));
    return {
      found: true,
      htmlPrefix: map.innerHTML.substring(0, 400),
      imgs,
      canvases
    };
  });

  console.log('Live map data on casamomo.at:', JSON.stringify(mapData, null, 2));
  await browser.close();
}

checkLiveMap();
