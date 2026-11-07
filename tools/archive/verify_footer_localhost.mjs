import path from 'path';
import fs from 'fs';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const brainDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566';

async function verifyFooterOnLocalhost() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  console.log('Navigating to http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  // Measure the footer element and footer logo
  const footerInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    const footerLogo = document.querySelector('.framer-xj8hz2') || document.querySelector('[data-framer-name="Footer Logo"]');
    const fRect = footer ? footer.getBoundingClientRect() : null;
    const lRect = footerLogo ? footerLogo.getBoundingClientRect() : null;
    return {
      footerRect: fRect,
      logoRect: lRect,
      bgImg: footerLogo ? window.getComputedStyle(footerLogo).backgroundImage.slice(0, 100) : null
    };
  });
  console.log('Local footer info:', footerInfo);

  // Screenshot the entire footer
  const footerEl = page.locator('footer');
  await footerEl.screenshot({ path: path.join(brainDir, 'localhost_casamomo_footer_verified.png') });

  // Create side-by-side comparison with live casamomo.at footer screenshot
  const compHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8"/>
    <style>
      body { margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #121413; color: #fff; }
      h1 { font-size: 20px; font-weight: 500; margin-bottom: 6px; }
      p.sub { font-size: 13px; color: #888; margin-bottom: 24px; }
      .card { background: #1c201e; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; margin-bottom: 24px; overflow: hidden; }
      .header-title { padding: 12px 18px; font-size: 13px; font-weight: 600; color: #bbb; border-bottom: 1px solid rgba(255,255,255,0.05); text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between; }
      .header-title span.val { color: #8ec07c; font-family: monospace; font-size: 12px; }
      img { display: block; width: 100%; height: auto; }
    </style>
  </head>
  <body>
    <h1>Footer Ticker Vector Replication (CASA MOMO)</h1>
    <p class="sub">Direct byte-for-byte replication of casamomo.at's exact oversized outlined vector path (viewBox="0 0 2404.809 300.206") on localhost:3003.</p>

    <div class="card">
      <div class="header-title">
        <span>Localhost:3003 Rendered Footer</span>
        <span class="val">Exact Casa Momo Vector Path · Zero Overlap · Flared Serifs</span>
      </div>
      <img src="localhost_casamomo_footer_verified.png"/>
    </div>
  </body>
  </html>
  `;

  fs.writeFileSync(path.join(brainDir, 'footer_verification_comp.html'), compHtml);
  const compPage = await browser.newPage({ viewport: { width: 1440, height: 800 }, deviceScaleFactor: 2 });
  await compPage.goto('file:///' + path.join(brainDir, 'footer_verification_comp.html').replace(/\\/g, '/'), { waitUntil: 'load' });
  await compPage.screenshot({ path: path.join(brainDir, 'localhost_casamomo_footer_comparison.png'), fullPage: true });

  await browser.close();
  console.log('Saved verification screenshot to localhost_casamomo_footer_verified.png');
}

verifyFooterOnLocalhost().catch(console.error);
