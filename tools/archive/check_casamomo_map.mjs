import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const data = await page.evaluate(() => {
    const locSection = document.querySelector('[data-framer-name="Location"]');
    const mapContainer = document.querySelector('[data-framer-name="Location Map"]');
    const canvas = document.querySelector('canvas');
    const mapboxOrGl = !!window.mapboxgl || !!window.maplibregl;
    
    // Check all scripts on page
    const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src).filter(Boolean);
    
    return {
      hasLocSection: !!locSection,
      locSectionHTML: locSection ? locSection.outerHTML.substring(0, 2000) : null,
      hasMapContainer: !!mapContainer,
      hasCanvas: !!canvas,
      canvasRect: canvas ? canvas.getBoundingClientRect() : null,
      mapboxOrGl,
      scripts: scripts.filter(s => s.includes('map') || s.includes('chunk') || s.includes('app'))
    };
  });

  console.log('Apartment N1 Map info:');
  console.log(JSON.stringify(data, null, 2));

  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3/casamomo_apartment_map.png' });
  console.log('Saved casamomo_apartment_map.png');

  await browser.close();
}

main().catch(console.error);
