import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function captureGalleryExact() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Gallery Image 1"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(600);

  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_reviewer_m1_1/audit_proofs/exact_gallery_image_1.png'
  });

  await browser.close();
  console.log('Exact Gallery Image 1 captured.');
}

captureGalleryExact().catch(console.error);
