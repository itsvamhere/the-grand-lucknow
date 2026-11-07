import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';

async function captureMapProofs() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });

  const svgContent = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_vector_map.svg', 'utf8');

  // Load HTML embedding the SVG
  await page.setContent(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #FFF0CA;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    }
    .map-container {
      width: 100%;
      height: 100%;
      display: flex;
    }
    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  </style>
</head>
<body>
  <div class="map-container">
    ${svgContent}
  </div>
</body>
</html>`);

  await page.waitForTimeout(1000);

  // Capture desktop 1600x900
  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_svg_map_desktop_1600.png',
    fullPage: false
  });
  console.log('Saved proof_svg_map_desktop_1600.png');

  // Capture mobile viewport (390x650)
  await page.setViewportSize({ width: 390, height: 650 });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_svg_map_mobile_390.png',
    fullPage: false
  });
  console.log('Saved proof_svg_map_mobile_390.png');

  await browser.close();
}

captureMapProofs().catch(console.error);
