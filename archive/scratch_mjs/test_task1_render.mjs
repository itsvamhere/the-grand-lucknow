import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testFontRender() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  // Create test HTML with EL PACRE Regular font loaded and both navbar and footer SVGs
  const testHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      @font-face {
        font-family: "EL PACRE Regular";
        src: url("https://framerusercontent.com/assets/borEE9veyD0zs6Cs5ThKJI0LcKU.woff2");
        font-style: normal;
        font-weight: 400;
      }
      body {
        margin: 0;
        background: #1A241E;
        padding: 40px;
        color: #FFF0CA;
        font-family: sans-serif;
      }
      .box {
        background: #233129;
        margin-bottom: 30px;
        padding: 20px;
        border-radius: 8px;
      }
      .nav-container {
        width: 216px;
        height: 27px;
        background: rgba(0,0,0,0.3);
      }
      .footer-mobile {
        width: 350px;
        background: #BC6F45;
        padding: 20px 0;
      }
      .footer-desktop {
        width: 1200px;
        background: #BC6F45;
        padding: 40px 0;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h2>1A: Navbar Brand Test (216 x 27)</h2>
      <div class="nav-container">
        <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
          <text x="50%" y="20" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="20" font-weight="400" letter-spacing="0.04em" fill="#FFF0CA">THE GRAND</text>
        </svg>
      </div>
      <div class="nav-container" style="margin-top:10px">
        <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
          <text x="50%" y="20.5" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="21" font-weight="400" letter-spacing="0.03em" fill="#FFF0CA">THE GRAND</text>
        </svg>
      </div>
      <div class="nav-container" style="margin-top:10px">
        <svg viewBox="0 0 216.285 27" width="216.285" height="27" overflow="visible">
          <text x="50%" y="21" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="22" font-weight="400" letter-spacing="0.02em" fill="#FFF0CA">THE GRAND</text>
        </svg>
      </div>
    </div>

    <div class="box">
      <h2>1B: Mobile Footer (1202.351 x 150.096 scaled to 350px width)</h2>
      <div class="footer-mobile">
        <svg viewBox="0 0 1202.351 150.096" style="width:100%; height:auto; display:block;" overflow="visible">
          <text x="50%" y="112" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="120" font-weight="400" letter-spacing="0.02em" fill="#FFF0CA">THE GRAND</text>
        </svg>
      </div>
    </div>

    <div class="box">
      <h2>1B: Desktop Footer (2404.809 x 300.206 scaled to 1200px width)</h2>
      <div class="footer-desktop">
        <svg viewBox="0 0 2404.809 300.206" style="width:100%; height:auto; display:block;" overflow="visible">
          <text x="50%" y="225" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="240" font-weight="400" letter-spacing="0.02em" fill="#FFF0CA">THE GRAND</text>
        </svg>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(testHtml, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/test_task1_render.png', fullPage: true });
  console.log('Test screenshot saved: test_task1_render.png');
  await browser.close();
}

testFontRender().catch(console.error);
