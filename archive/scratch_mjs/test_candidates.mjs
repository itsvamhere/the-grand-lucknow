import fs from 'fs';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testStrokeAndScaling() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });

  const refPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/.user_uploaded/media_1793688950883_91597112.png';
  const refB64 = fs.readFileSync(refPath).toString('base64');

  const fontBuf = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/fonts/el_pacre_regular.woff2');
  const fontB64 = fontBuf.toString('base64');

  const testHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      @font-face {
        font-family: "EL PACRE Regular";
        src: url("data:font/woff2;base64,${fontB64}") format("woff2");
        font-weight: 400;
        font-style: normal;
      }
      body {
        margin: 0;
        background: #964317; /* Reference footer terrace background */
        color: #fff;
        padding: 30px;
        font-family: sans-serif;
      }
      .ref-crop {
        width: 300px;
        height: 60px;
        background: url("data:image/png;base64,${refB64}") no-repeat 0px -40px;
        background-size: 1024px auto;
        border: 1px dashed yellow;
        margin-bottom: 20px;
      }
      .test-box {
        width: 216.285px;
        height: 27px;
        border: 1px dashed cyan;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
      }
    </style>
  </head>
  <body>
    <h3>Reference Navbar Logo (Casa Momo):</h3>
    <div class="ref-crop"></div>

    <h3>Candidate 1: font-size 26, stroke 0.6, tracking 0.12em</h3>
    <div class="test-box">
      <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
        <text x="50%" y="22" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="26" font-weight="600" stroke="#000" stroke-width="0.6" paint-order="stroke fill" letter-spacing="0.12em" fill="#000">THE GRAND</text>
      </svg>
    </div>

    <h3>Candidate 2: font-size 27, stroke 0.75, tracking 0.14em</h3>
    <div class="test-box">
      <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
        <text x="50%" y="22.5" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="27" font-weight="700" stroke="#000" stroke-width="0.75" paint-order="stroke fill" letter-spacing="0.14em" fill="#000">THE GRAND</text>
      </svg>
    </div>

    <h3>Candidate 3: font-size 28, stroke 0.85, tracking 0.12em</h3>
    <div class="test-box">
      <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
        <text x="50%" y="23" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="28" font-weight="700" stroke="#000" stroke-width="0.85" paint-order="stroke fill" letter-spacing="0.12em" fill="#000">THE GRAND</text>
      </svg>
    </div>

    <h3>Candidate 4: Light Background State (#FFF1C9)</h3>
    <div style="background: #FFF1C9; padding: 15px; width: 300px;">
      <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
        <text x="50%" y="22.5" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="27" font-weight="700" stroke="#1A241E" stroke-width="0.75" paint-order="stroke fill" letter-spacing="0.14em" fill="#1A241E">THE GRAND</text>
      </svg>
    </div>

    <h3>Candidate 5: Dark Hero State (#FFF0CA)</h3>
    <div style="background: #1A241E; padding: 15px; width: 300px;">
      <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
        <text x="50%" y="22.5" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="27" font-weight="700" stroke="#FFF0CA" stroke-width="0.75" paint-order="stroke fill" letter-spacing="0.14em" fill="#FFF0CA">THE GRAND</text>
      </svg>
    </div>
  </body>
  </html>
  `;

  await page.setContent(testHtml, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/compare_candidates.png', fullPage: true });
  console.log('Saved compare_candidates.png');

  await browser.close();
}

testStrokeAndScaling().catch(console.error);
