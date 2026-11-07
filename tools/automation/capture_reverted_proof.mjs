import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function captureRevertedProof() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop 1024x576 matching user's exact screenshot viewport
  const page = await browser.newPage({
    viewport: { width: 1024, height: 576 },
    deviceScaleFactor: 1
  });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Scroll to location map section
  const mapElem = page.locator('#subpage-vector-map');
  await mapElem.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // Capture full viewport
  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_reverted_viewport.png'
  });

  // Capture map element
  await mapElem.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_reverted_map_element.png'
  });

  console.log('Saved proof_reverted_viewport.png and proof_reverted_map_element.png');

  await browser.close();
}

captureRevertedProof().catch(console.error);
