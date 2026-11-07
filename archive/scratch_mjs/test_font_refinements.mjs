import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testFontVariants() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 800, height: 900 } });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      @font-face {
        font-family: "EL PACRE Regular";
        src: url("https://framerusercontent.com/assets/borEE9veyD0zs6Cs5ThKJI0LcKU.woff2");
        font-weight: 400;
        font-style: normal;
      }
      body {
        background: #1A241E;
        color: #FFF0CA;
        font-family: sans-serif;
        padding: 40px;
      }
      .row {
        margin-bottom: 24px;
        padding: 16px;
        background: rgba(255,255,255,0.05);
      }
      .label {
        font-size: 13px;
        color: #888;
        margin-bottom: 8px;
      }
      .nav-box {
        width: 216px;
        height: 27px;
        background: rgba(0,0,0,0.4);
      }
      .light-bg {
        background: #FFF1C9;
        color: #1A241E;
        padding: 16px;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <div class="row">
      <div class="label">Option A: font-size 24, font-weight 600, letter-spacing 0.07em, y 21.5</div>
      <div class="nav-box">
        <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
          <text x="50%" y="21.5" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="24" font-weight="600" letter-spacing="0.07em" fill="#FFF0CA">THE GRAND</text>
        </svg>
      </div>
      <div class="light-bg">
        <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
          <text x="50%" y="21.5" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="24" font-weight="600" letter-spacing="0.07em" fill="#1A241E">THE GRAND</text>
        </svg>
      </div>
    </div>

    <div class="row">
      <div class="label">Option B: font-size 25, stroke 0.35px, letter-spacing 0.08em, y 22</div>
      <div class="nav-box">
        <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
          <text x="50%" y="22" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="25" font-weight="600" stroke="#FFF0CA" stroke-width="0.35" letter-spacing="0.08em" fill="#FFF0CA">THE GRAND</text>
        </svg>
      </div>
      <div class="light-bg">
        <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
          <text x="50%" y="22" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="25" font-weight="600" stroke="#1A241E" stroke-width="0.35" letter-spacing="0.08em" fill="#1A241E">THE GRAND</text>
        </svg>
      </div>
    </div>

    <div class="row">
      <div class="label">Option C: font-size 25, letter-spacing 0.075em, y 22 (no stroke, pure synthetic 600)</div>
      <div class="nav-box">
        <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
          <text x="50%" y="22" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="25" font-weight="600" letter-spacing="0.075em" fill="#FFF0CA">THE GRAND</text>
        </svg>
      </div>
      <div class="light-bg">
        <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
          <text x="50%" y="22" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="25" font-weight="600" letter-spacing="0.075em" fill="#1A241E">THE GRAND</text>
        </svg>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/test_logo_refinements.png', fullPage: true });
  console.log('Saved test_logo_refinements.png');

  // Measure Option B and C bounding box
  const bbox = await page.evaluate(() => {
    const texts = Array.from(document.querySelectorAll('text'));
    return texts.map(t => {
      const b = t.getBBox();
      return { width: Math.round(b.width), height: Math.round(b.height), text: t.textContent };
    });
  });
  console.log('BBoxes:', bbox);

  await browser.close();
}

testFontVariants().catch(console.error);
