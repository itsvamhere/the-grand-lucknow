import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = "C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3";

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Scroll to #locations-1
  const locEl = await page.$('#locations-1');
  if (locEl) {
    await locEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const box = await locEl.boundingBox();
    if (box) {
      await page.screenshot({
        path: path.join(artifactsDir, "current_locations_section.png"),
        clip: {
          x: 0,
          y: Math.max(0, box.y - 50),
          width: 1440,
          height: Math.min(1600, box.height + 100)
        }
      });
      console.log('Saved current_locations_section.png');
    }
  } else {
    console.log('#locations-1 not found');
  }

  await browser.close();
}

main().catch(console.error);
