import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = "C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3";

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1000, height: 800 } });
  
  await page.goto('http://localhost:3003/tools/test_vector_map.html', { waitUntil: 'networkidle' });
  
  // Wait for map idle
  await page.waitForFunction(() => window.__mapLoaded === true, { timeout: 15000 }).catch(() => console.log('Timeout waiting for idle'));
  await page.waitForTimeout(2000);

  const mapWrapper = await page.$('#map-wrapper');
  if (mapWrapper) {
    await mapWrapper.screenshot({
      path: path.join(artifactsDir, "test_vector_map_screenshot.png")
    });
    console.log('Saved test_vector_map_screenshot.png');
  }

  await browser.close();
}

main().catch(console.error);
