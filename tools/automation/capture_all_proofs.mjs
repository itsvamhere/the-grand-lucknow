import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function captureAllProofs() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Proof: Photo 6 in view (y = 6600) - words intact, dark bg, NO pre-triggering
  await page.evaluate(() => window.scrollTo(0, 6600));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_photo6_no_pretrigger.png'
  });
  console.log('1. Saved proof_photo6_no_pretrigger.png');

  // 2. Proof: Mid-transition rollout (y = 7400) - cohesive word roll up into cream
  await page.evaluate(() => window.scrollTo(0, 7400));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_mid_transition_rollout.png'
  });
  console.log('2. Saved proof_mid_transition_rollout.png');

  // 3. Proof: Location Map section in full view
  await page.evaluate(() => {
    const loc = document.querySelector('[data-framer-name="Location"]');
    if (loc) loc.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_location_map_desktop.png'
  });
  console.log('3. Saved proof_location_map_desktop.png');

  // 4. Proof: Mobile viewport (390x844)
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2
  });
  await mobilePage.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.evaluate(() => {
    const loc = document.querySelector('[data-framer-name="Location"]');
    if (loc) loc.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_location_map_mobile.png'
  });
  console.log('4. Saved proof_location_map_mobile.png');

  await browser.close();
}

captureAllProofs().catch(console.error);
