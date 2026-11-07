import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function shotHome() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://the-grand-lucknow.vercel.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Screenshot hero
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_home_hero.png' });

  // Scroll to map
  const mapSec = await page.$('#location, [data-framer-name="Map"], canvas.maplibregl-canvas');
  if (mapSec) {
    await mapSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_home_map.png' });
  }

  await browser.close();
  console.log('Screenshots captured successfully!');
}

shotHome().catch(console.error);
