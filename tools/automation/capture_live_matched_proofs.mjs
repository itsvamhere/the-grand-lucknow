import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function captureMapProofs() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop Viewport (1440x900)
  const contextDesk = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const pageDesk = await contextDesk.newPage();
  await pageDesk.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Scroll to vector map
  const mapElem = pageDesk.locator('#subpage-vector-map');
  await mapElem.scrollIntoViewIfNeeded();
  await pageDesk.waitForTimeout(1000);

  // Capture map section
  await mapElem.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_matched_map_desktop.png'
  });
  console.log('Saved proof_live_matched_map_desktop.png');

  // Also capture full screen showing context
  await pageDesk.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_matched_subpage_desktop.png'
  });

  // 2. Mobile Viewport (390x844)
  const contextMob = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  const pageMob = await contextMob.newPage();
  await pageMob.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const mapElemMob = pageMob.locator('#subpage-vector-map');
  await mapElemMob.scrollIntoViewIfNeeded();
  await pageMob.waitForTimeout(1000);

  await mapElemMob.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_matched_map_mobile.png'
  });
  console.log('Saved proof_live_matched_map_mobile.png');

  await browser.close();
  console.log('All live proofs captured successfully!');
}

captureMapProofs().catch(console.error);
