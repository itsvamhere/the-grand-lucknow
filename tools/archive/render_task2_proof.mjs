import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = "C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3";

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4500);

  // Apply refined staging dark contrast treatment
  await page.evaluate(() => {
    let style = document.getElementById('hero-subtitle-contrast-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'hero-subtitle-contrast-style';
      document.head.appendChild(style);
    }
    style.innerHTML = `
      /* Staging dark contrast treatment for Hero Subtitle (#1A241E wrapper) */
      .framer-1o6x5q9-container {
        background-color: rgba(26, 36, 30, 0.88) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        border-radius: 6px !important;
        padding: 12px 18px !important;
        margin-left: -18px !important;
        box-sizing: border-box !important;
        width: fit-content !important;
        max-width: calc(100% + 36px) !important;
        border: 1px solid rgba(255, 240, 202, 0.15) !important;
        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 240, 202, 0.08) !important;
      }
      .framer-1o6x5q9-container p {
        color: #FFF0CA !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
      }
      @media (max-width: 809.98px) {
        .framer-1o6x5q9-container {
          padding: 10px 14px !important;
          margin-left: -14px !important;
          max-width: calc(100% + 28px) !important;
        }
      }
    `;
  });

  await page.waitForTimeout(500);

  // Take full screenshot and cropped hero zoom screenshot
  await page.screenshot({
    path: path.join(artifactsDir, "task2_hero_subtitle_desktop.png")
  });

  const taglineEl = await page.$('.framer-1mzmlpu');
  if (taglineEl) {
    const box = await taglineEl.boundingBox();
    if (box) {
      await page.screenshot({
        path: path.join(artifactsDir, "task2_hero_subtitle_zoom.png"),
        clip: {
          x: Math.max(0, box.x - 30),
          y: Math.max(0, box.y - 30),
          width: Math.min(1440, box.width + 60),
          height: Math.min(900, box.height + 60)
        }
      });
    }
  }

  // Mobile screenshot
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(4500);

  await mobilePage.evaluate(() => {
    let style = document.getElementById('hero-subtitle-contrast-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'hero-subtitle-contrast-style';
      document.head.appendChild(style);
    }
    style.innerHTML = `
      .framer-1o6x5q9-container {
        background-color: rgba(26, 36, 30, 0.88) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        border-radius: 6px !important;
        padding: 10px 14px !important;
        margin-left: -14px !important;
        box-sizing: border-box !important;
        width: fit-content !important;
        max-width: calc(100% + 28px) !important;
        border: 1px solid rgba(255, 240, 202, 0.15) !important;
        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5) !important;
      }
      .framer-1o6x5q9-container p {
        color: #FFF0CA !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
      }
    `;
  });

  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: path.join(artifactsDir, "task2_hero_subtitle_mobile.png")
  });

  console.log('Saved all Task 2 proof screenshots!');
  await browser.close();
}

main().catch(console.error);
