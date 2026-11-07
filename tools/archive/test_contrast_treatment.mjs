import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = "C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3";

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  
  // Wait for Variant 3 animation
  await page.waitForTimeout(4500);

  // Apply test contrast style
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.id = 'test-hero-subtitle-contrast';
    style.innerHTML = `
      .framer-1o6x5q9-container {
        background-color: rgba(26, 36, 30, 0.85) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border-radius: 4px !important;
        padding: 14px 20px !important;
        box-sizing: border-box !important;
        width: fit-content !important;
        max-width: calc(100vw - 96px) !important;
        border: 1px solid rgba(255, 240, 202, 0.12) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35) !important;
      }
    `;
    document.head.appendChild(style);
  });

  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(artifactsDir, "test_contrast_treatment_desktop.png")
  });
  console.log('Saved test_contrast_treatment_desktop.png');

  // Also test mobile viewport
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(4500);

  await mobilePage.evaluate(() => {
    const style = document.createElement('style');
    style.id = 'test-hero-subtitle-contrast';
    style.innerHTML = `
      .framer-1o6x5q9-container {
        background-color: rgba(26, 36, 30, 0.85) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border-radius: 4px !important;
        padding: 12px 16px !important;
        box-sizing: border-box !important;
        width: fit-content !important;
        max-width: calc(100vw - 24px) !important;
        border: 1px solid rgba(255, 240, 202, 0.12) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35) !important;
      }
    `;
    document.head.appendChild(style);
  });

  await mobilePage.waitForTimeout(500);

  await mobilePage.screenshot({
    path: path.join(artifactsDir, "test_contrast_treatment_mobile.png")
  });
  console.log('Saved test_contrast_treatment_mobile.png');

  await browser.close();
}

main().catch(console.error);
