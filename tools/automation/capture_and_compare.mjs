import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import sharp from 'sharp';

async function captureAndCompare() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({
    viewport: { width: 1024, height: 576 },
    deviceScaleFactor: 1
  });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Scroll to location section matching the user's screenshot
  await page.evaluate(() => {
    const sec = document.querySelector('#bigtext-1');
    if (sec) {
      const top = sec.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top - 40); // Align with header
    }
  });
  await page.waitForTimeout(1000);

  const shotPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_thegrand_matched_color.png';
  await page.screenshot({ path: shotPath });
  console.log('Saved proof_thegrand_matched_color.png');

  // Also capture when scrolled slightly further so map is prominent
  await page.evaluate(() => {
    window.scrollBy(0, 100);
  });
  await page.waitForTimeout(500);
  const shotPathMap = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_thegrand_matched_map.png';
  await page.screenshot({ path: shotPathMap });
  console.log('Saved proof_thegrand_matched_map.png');

  await browser.close();

  // Now create a 2-panel side-by-side comparison:
  // Panel 1: Casa Momo (user uploaded media_1793962642651_6bb7a7fd.jpg)
  // Panel 2: The Grand (new proof_thegrand_matched_color.png)
  const cmBuf = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793962642651_6bb7a7fd.jpg')
    .resize(1024, 576, { fit: 'fill' })
    .png()
    .toBuffer();

  const tgBuf = await sharp(shotPath)
    .resize(1024, 576, { fit: 'fill' })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 2048,
      height: 576,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    { input: cmBuf, left: 0, top: 0 },
    { input: tgBuf, left: 1024, top: 0 }
  ])
  .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_casamomo_vs_thegrand_side_by_side.png');

  console.log('Saved proof_casamomo_vs_thegrand_side_by_side.png');
}

captureAndCompare().catch(console.error);
