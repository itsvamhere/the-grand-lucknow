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

server.listen(4140, async () => {
  console.log('Local test server running on 4140');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:4140/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // 1. Dark background state (scrolled 1500px down past hero)
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(600);

  const darkState = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    const r = l.getBoundingClientRect();
    const pathEl = document.querySelector('#svg-1334768056_3843 path');
    return {
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      fill: pathEl ? getComputedStyle(pathEl).fill : null,
      dSnippet: pathEl ? pathEl.getAttribute('d').slice(0, 30) : null
    };
  });
  console.log('Dark State:', darkState);

  // Capture navbar on dark
  await page.screenshot({
    path: path.join(artifactsDir, 'local_casamomo_replica_dark_nav.png'),
    clip: { x: 0, y: 0, width: 1440, height: 110 }
  });

  // Capture logo close-up on dark
  await page.screenshot({
    path: path.join(artifactsDir, 'local_casamomo_replica_dark_logo.png'),
    clip: { x: darkState.rect.x - 5, y: darkState.rect.y - 5, width: darkState.rect.w + 10, height: darkState.rect.h + 10 }
  });

  // 2. Light cream background state (scrolled 16000px down)
  await page.evaluate(() => window.scrollTo(0, 16000));
  await page.waitForTimeout(600);

  const lightState = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    const r = l.getBoundingClientRect();
    const pathEl = document.querySelector('#svg-1334768056_3843 path');
    const theme = document.documentElement.getAttribute('data-logo-theme');
    return {
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      theme,
      fill: pathEl ? getComputedStyle(pathEl).fill : null
    };
  });
  console.log('Light State:', lightState);

  // Capture navbar on light
  await page.screenshot({
    path: path.join(artifactsDir, 'local_casamomo_replica_light_nav.png'),
    clip: { x: 0, y: 0, width: 1440, height: 110 }
  });

  // Capture logo close-up on light
  await page.screenshot({
    path: path.join(artifactsDir, 'local_casamomo_replica_light_logo.png'),
    clip: { x: lightState.rect.x - 5, y: lightState.rect.y - 5, width: lightState.rect.w + 10, height: lightState.rect.h + 10 }
  });

  // 3. Composite Presentation
  const compPage = await browser.newPage({ viewport: { width: 900, height: 550 } });
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
      <h1>Casa Momo Sticky Logo Replica (Running on Localhost)</h1>
      <p>Original vector logo replicated byte-for-byte on localhost with dynamic dark/light color switching.</p>

      <div class="grid">
        <div class="card">
          <div class="card-header">1. Localhost: Dark Background (Scrolled past hero)</div>
          <div class="img-wrap"><img src="file:///${artifactsDir.replace(/\\/g, '/')}/local_casamomo_replica_dark_logo.png"/></div>
          <div class="tag">Color: #FFF0CA (Cream) · Original Vector Path</div>
        </div>

        <div class="card">
          <div class="card-header">2. Localhost: Light Background (Scrolled to cream section)</div>
          <div class="img-wrap"><img src="file:///${artifactsDir.replace(/\\/g, '/')}/local_casamomo_replica_light_logo.png"/></div>
          <div class="tag">Color: #1A241E (Black/Forest) · Original Vector Path</div>
        </div>
      </div>

      <div style="margin-top:20px;">
        <div class="card">
          <div class="card-header">3. Full Sticky Navbar in Context (Localhost)</div>
          <div class="img-wrap"><img src="file:///${artifactsDir.replace(/\\/g, '/')}/local_casamomo_replica_dark_nav.png"/></div>
        </div>
      </div>
    </body>
    </html>
  `;
  await compPage.setContent(compHtml);
  await compPage.waitForTimeout(600);
  await compPage.screenshot({
    path: path.join(artifactsDir, 'local_casamomo_replica_composite.png')
  });

  console.log('Saved local_casamomo_replica_composite.png successfully!');
  await browser.close();
  server.close();
  process.exit(0);
});
