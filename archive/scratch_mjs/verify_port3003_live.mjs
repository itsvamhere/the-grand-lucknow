import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\89415e6f-6b69-4c32-8653-44f2041dd566';
const url = 'http://localhost:3003/';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // 1. Dark background (scroll to 1500px)
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(500);

  const darkLogo = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    const r = l.getBoundingClientRect();
    const pathEl = document.querySelector('#svg-1334768056_3843 path');
    return {
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      fill: pathEl ? getComputedStyle(pathEl).fill : null,
      d: pathEl ? pathEl.getAttribute('d').slice(0, 40) : null
    };
  });
  console.log('Localhost 3003 Dark:', darkLogo);

  await page.screenshot({
    path: path.join(artifactsDir, 'port3003_casamomo_dark_logo.png'),
    clip: { x: darkLogo.rect.x - 5, y: darkLogo.rect.y - 5, width: darkLogo.rect.w + 10, height: darkLogo.rect.h + 10 }
  });

  await page.screenshot({
    path: path.join(artifactsDir, 'port3003_casamomo_dark_navbar.png'),
    clip: { x: 0, y: 0, width: 1440, height: 110 }
  });

  // 2. Light cream background (scroll to 16000px)
  await page.evaluate(() => window.scrollTo(0, 16000));
  await page.waitForTimeout(500);

  const lightLogo = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    const r = l.getBoundingClientRect();
    const pathEl = document.querySelector('#svg-1334768056_3843 path');
    return {
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      fill: pathEl ? getComputedStyle(pathEl).fill : null
    };
  });
  console.log('Localhost 3003 Light:', lightLogo);

  await page.screenshot({
    path: path.join(artifactsDir, 'port3003_casamomo_light_logo.png'),
    clip: { x: lightLogo.rect.x - 5, y: lightLogo.rect.y - 5, width: lightLogo.rect.w + 10, height: lightLogo.rect.h + 10 }
  });

  await page.screenshot({
    path: path.join(artifactsDir, 'port3003_casamomo_light_navbar.png'),
    clip: { x: 0, y: 0, width: 1440, height: 110 }
  });

  // 3. Composite Side-by-Side Presentation
  const compPage = await browser.newPage({ viewport: { width: 920, height: 560 } });
  const compHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin:0; padding:28px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#0B0F0C; color:#FFF; }
        h1 { font-size:18px; font-weight:600; margin:0 0 6px; }
        p { font-size:13px; color:#8FA596; margin:0 0 20px; }
        .grid { display:grid; grid-template-columns: 1fr 1fr; gap:20px; }
        .card { background:#161D18; border:1px solid #2A362E; border-radius:8px; padding:14px; }
        .card-header { font-size:11px; text-transform:uppercase; letter-spacing:0.08em; font-weight:700; margin-bottom:10px; color:#DDB59F; }
        .img-wrap { border-radius:6px; overflow:hidden; border:1px solid #334438; }
        img { display:block; width:100%; height:auto; }
        .tag { font-size:11px; color:#A4B29E; margin-top:8px; font-family:monospace; }
      </style>
    </head>
    <body>
      <h1>Casa Momo Sticky Logo Replica (Live on http://localhost:3003)</h1>
      <p>Original Casa Momo vector path ("CASA MOMO") running directly on localhost with responsive dynamic contrast switching.</p>

      <div class="grid">
        <div class="card">
          <div class="card-header">1. Localhost 3003: Dark Section (Over Forest)</div>
          <div class="img-wrap"><img src="file:///${artifactsDir.replace(/\\/g, '/')}/port3003_casamomo_dark_logo.png"/></div>
          <div class="tag">Text: #FFF0CA Cream · Original CASA MOMO Vector</div>
        </div>

        <div class="card">
          <div class="card-header">2. Localhost 3003: Light Section (Over Cream)</div>
          <div class="img-wrap"><img src="file:///${artifactsDir.replace(/\\/g, '/')}/port3003_casamomo_light_logo.png"/></div>
          <div class="tag">Text: #1A241E Forest Black · Original CASA MOMO Vector</div>
        </div>
      </div>

      <div style="margin-top:20px;">
        <div class="card">
          <div class="card-header">3. Sticky Navbar in Full Context (http://localhost:3003)</div>
          <div class="img-wrap"><img src="file:///${artifactsDir.replace(/\\/g, '/')}/port3003_casamomo_dark_navbar.png"/></div>
        </div>
      </div>
    </body>
    </html>
  `;
  await compPage.setContent(compHtml);
  await compPage.waitForTimeout(600);
  await compPage.screenshot({
    path: path.join(artifactsDir, 'localhost_3003_casamomo_verified.png')
  });

  console.log('Saved localhost_3003_casamomo_verified.png successfully!');
  await browser.close();
}

run();
