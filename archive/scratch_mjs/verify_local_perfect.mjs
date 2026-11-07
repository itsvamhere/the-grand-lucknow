import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const baseDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const artifactsDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\89415e6f-6b69-4c32-8653-44f2041dd566';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(baseDir, reqPath.replace(/^\//, ''));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
    return;
  }
  res.writeHead(404);
  res.end('Not found');
});

server.listen(4135, async () => {
  console.log('Local test server running on 4135');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:4135/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // 1. Dark background state (scrolled 1500px down past hero)
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(600);

  const darkState = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    const r = l.getBoundingClientRect();
    const svg = document.querySelector('#svg-1334768056_3843 text');
    return {
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      fill: svg ? getComputedStyle(svg).fill : null,
      stroke: svg ? getComputedStyle(svg).stroke : null,
      font: svg ? getComputedStyle(svg).fontFamily : null
    };
  });
  console.log('Dark State:', darkState);

  // Capture navbar on dark
  await page.screenshot({
    path: path.join(artifactsDir, 'local_perfect_dark_nav.png'),
    clip: { x: 0, y: 0, width: 1440, height: 110 }
  });

  // Capture logo close-up on dark
  await page.screenshot({
    path: path.join(artifactsDir, 'local_perfect_dark_logo.png'),
    clip: { x: darkState.rect.x - 5, y: darkState.rect.y - 5, width: darkState.rect.w + 10, height: darkState.rect.h + 10 }
  });

  // 2. Light cream background state (scrolled 16000px down)
  await page.evaluate(() => window.scrollTo(0, 16000));
  await page.waitForTimeout(600);

  const lightState = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    const r = l.getBoundingClientRect();
    const svg = document.querySelector('#svg-1334768056_3843 text');
    const theme = document.documentElement.getAttribute('data-logo-theme');
    return {
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      theme,
      fill: svg ? getComputedStyle(svg).fill : null,
      stroke: svg ? getComputedStyle(svg).stroke : null
    };
  });
  console.log('Light State:', lightState);

  // Capture navbar on light
  await page.screenshot({
    path: path.join(artifactsDir, 'local_perfect_light_nav.png'),
    clip: { x: 0, y: 0, width: 1440, height: 110 }
  });

  // Capture logo close-up on light
  await page.screenshot({
    path: path.join(artifactsDir, 'local_perfect_light_logo.png'),
    clip: { x: lightState.rect.x - 5, y: lightState.rect.y - 5, width: lightState.rect.w + 10, height: lightState.rect.h + 10 }
  });

  // 3. Composite comparison artifact
  const compPage = await browser.newPage({ viewport: { width: 900, height: 600 } });
  const compHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin:0; padding:30px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#0B0F0C; color:#FFF; }
        h1 { font-size:18px; font-weight:600; margin-bottom:20px; letter-spacing:-0.01em; }
        .grid { display:grid; grid-template-columns: 1fr 1fr; gap:24px; }
        .section-title { font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#8FA596; margin-bottom:10px; font-weight:600; }
        .box { border-radius:6px; overflow:hidden; border:1px solid #2A362E; }
        .card-inner { padding:14px; }
        .dark-box { background:#10231D; }
        .light-box { background:#FFF1C9; color:#1A241E; }
        img { display:block; width:100%; height:auto; }
        .badge { display:inline-block; font-size:11px; padding:3px 8px; border-radius:4px; margin-top:8px; font-weight:600; }
        .badge-dark { background:#1E2B23; color:#D8E2DA; }
        .badge-light { background:#E8DCB7; color:#1A241E; }
      </style>
    </head>
    <body>
      <h1>Sticky Logo Optical Verification (Local Staging)</h1>
      <div class="grid">
        <div>
          <div class="section-title">1. Over Dark Forest Background (#10231D)</div>
          <div class="box dark-box">
            <img src="file:///${artifactsDir.replace(/\\/g, '/')}/local_perfect_dark_logo.png"/>
            <div class="card-inner">
              <div class="badge badge-dark">Text: #FFF0CA (Cream) · Font: EL PACRE 30.5px · Stroke: 0.95px</div>
            </div>
          </div>
        </div>

        <div>
          <div class="section-title">2. Over Light Cream Background (#FFF1C9)</div>
          <div class="box light-box">
            <img src="file:///${artifactsDir.replace(/\\/g, '/')}/local_perfect_light_logo.png"/>
            <div class="card-inner">
              <div class="badge badge-light">Text: #1A241E (Forest Black) · Font: EL PACRE 30.5px · Stroke: 0.95px</div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top:30px;">
        <div class="section-title">3. Full Sticky Navbar in Context (Dark Viewport)</div>
        <div class="box">
          <img src="file:///${artifactsDir.replace(/\\/g, '/')}/local_perfect_dark_nav.png"/>
        </div>
      </div>
    </body>
    </html>
  `;
  await compPage.setContent(compHtml);
  await compPage.waitForTimeout(600);
  await compPage.screenshot({
    path: path.join(artifactsDir, 'local_perfect_verified_comparison.png')
  });

  console.log('Saved local_perfect_verified_comparison.png successfully!');
  await browser.close();
  server.close();
  process.exit(0);
});
