import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec';

async function captureAccurate() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // Evaluate scroll position directly
  const mapElement = await page.$('#subpage-vector-map');
  if (mapElement) {
    const box = await mapElement.boundingBox();
    console.log('Map bounding box:', box);
    if (box) {
      await page.evaluate((y) => window.scrollTo(0, y - 100), box.y);
      await page.waitForTimeout(800);
      await page.screenshot({ path: `${ARTIFACTS}/proof_live_venue_map_viewport.png` });
      console.log('Saved proof_live_venue_map_viewport.png');

      await mapElement.screenshot({ path: `${ARTIFACTS}/proof_live_venue_map_element.png` });
      console.log('Saved proof_live_venue_map_element.png');
    }
  } else {
    console.log('#subpage-vector-map NOT FOUND in DOM!');
  }

  // Mobile
  const mPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mPage.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'domcontentloaded' });
  await mPage.waitForTimeout(1500);
  const mobMap = await mPage.$('#subpage-vector-map');
  if (mobMap) {
    const mBox = await mobMap.boundingBox();
    console.log('Mobile map bounding box:', mBox);
    if (mBox) {
      await mPage.evaluate((y) => window.scrollTo(0, y - 80), mBox.y);
      await mPage.waitForTimeout(800);
      await mPage.screenshot({ path: `${ARTIFACTS}/proof_live_venue_map_mobile_viewport.png` });
      console.log('Saved proof_live_venue_map_mobile_viewport.png');
    }
  }

  await browser.close();
}

captureAccurate().catch(console.error);
