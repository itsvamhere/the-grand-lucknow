import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = "C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3";

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Navigating to http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  
  // Wait for Variant 3 animation (approx 4s)
  await page.waitForTimeout(4500);

  // Take desktop screenshot
  await page.screenshot({
    path: path.join(artifactsDir, "task2_verified_desktop.png")
  });
  console.log('Saved task2_verified_desktop.png');

  // Zoomed screenshot of the hero tagline block
  const taglineEl = await page.$('.framer-1mzmlpu');
  if (taglineEl) {
    const box = await taglineEl.boundingBox();
    if (box) {
      await page.screenshot({
        path: path.join(artifactsDir, "task2_verified_zoom.png"),
        clip: {
          x: Math.max(0, box.x - 20),
          y: Math.max(0, box.y - 20),
          width: Math.min(1440, box.width + 40),
          height: Math.min(900, box.height + 40)
        }
      });
      console.log('Saved task2_verified_zoom.png');
    }
  }

  // Inspect computed properties
  const metrics = await page.evaluate(() => {
    const el = document.querySelector('.framer-1o6x5q9-container');
    const p = el?.querySelector('p');
    const cs = el ? window.getComputedStyle(el) : null;
    const pcs = p ? window.getComputedStyle(p) : null;
    return {
      text: el?.textContent?.trim(),
      backgroundColor: cs?.backgroundColor,
      backdropFilter: cs?.backdropFilter,
      borderRadius: cs?.borderRadius,
      padding: cs?.padding,
      boxShadow: cs?.boxShadow,
      color: pcs?.color,
      fontSize: pcs?.fontSize,
      fontFamily: pcs?.fontFamily,
      rect: el?.getBoundingClientRect()
    };
  });
  console.log('Verified metrics:', JSON.stringify(metrics, null, 2));

  // Mobile verification
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(4500);

  await mobilePage.screenshot({
    path: path.join(artifactsDir, "task2_verified_mobile.png")
  });
  console.log('Saved task2_verified_mobile.png');

  await browser.close();
  console.log('Verification successful!');
}

main().catch(console.error);
