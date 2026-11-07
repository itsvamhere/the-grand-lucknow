import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

async function captureGallery() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Find gallery slider
  const slider = await page.$('.framer-6rg8a');
  if (slider) {
    await slider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_reviewer_m1_1/audit_proofs/actual_gallery_slider.png'
    });
  }

  // Also capture other venues cards
  const otherVenues = await page.$('#bigtext-2');
  if (otherVenues) {
    await otherVenues.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_reviewer_m1_1/audit_proofs/actual_other_venues.png'
    });
  }

  await browser.close();
  console.log('Gallery and Other Venues captured.');
}

captureGallery().catch(console.error);
