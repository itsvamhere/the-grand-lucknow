import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function captureBigMapProofs() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop 1440x900
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  await page.evaluate(() => {
    const loc = document.querySelector('[data-framer-name="Location"]');
    if (loc) loc.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(600);

  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_big_map_desktop.png'
  });
  console.log('Saved proof_big_map_desktop.png');

  // Also full-bleed screenshot of the map element itself
  const mapEl = await page.$('[data-framer-name="Location"]');
  if (mapEl) {
    await mapEl.screenshot({
      path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_big_map_element.png'
    });
    console.log('Saved proof_big_map_element.png');
  }

  // 2. Mobile 390x844
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2
  });
  await mobilePage.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);
  await mobilePage.evaluate(() => {
    const loc = document.querySelector('[data-framer-name="Location"]');
    if (loc) loc.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await mobilePage.waitForTimeout(600);

  await mobilePage.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_big_map_mobile.png'
  });
  console.log('Saved proof_big_map_mobile.png');

  await browser.close();
}

captureBigMapProofs().catch(console.error);
