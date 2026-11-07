import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a';

async function verifyBoth() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('1. Verifying Home Page: http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  const homePath = path.join(artifactDir, 'verified_home_live_restored.png');
  await page.screenshot({ path: homePath });
  console.log(`Saved: ${homePath}`);

  console.log('2. Verifying Venue Page: http://localhost:3003/venues/venue-n2 ...');
  await page.goto('http://localhost:3003/venues/venue-n2', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  const venuePath = path.join(artifactDir, 'verified_venue_live_restored.png');
  await page.screenshot({ path: venuePath });
  console.log(`Saved: ${venuePath}`);

  await browser.close();
  console.log('Both pages verified successfully!');
}

verifyBoth();
