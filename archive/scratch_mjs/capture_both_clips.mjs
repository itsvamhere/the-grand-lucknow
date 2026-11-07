import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const baseDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const artifactsDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\89415e6f-6b69-4c32-8653-44f2041dd566';

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(baseDir, reqPath.replace(/^\//, ''));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200);
    res.end(fs.readFileSync(filePath));
    return;
  }
  res.writeHead(404);
  res.end();
});

server.listen(4128, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 1. Capture Casa Momo Dark & Light
  const cmPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await cmPage.goto('https://casamomo.at', { waitUntil: 'networkidle' });
  
  // Wheel scroll to dark section ("Moritz")
  for (let i = 0; i < 4; i++) {
    await cmPage.mouse.wheel(0, 500);
    await cmPage.waitForTimeout(200);
  }
  await cmPage.waitForTimeout(500);
  await cmPage.screenshot({
    path: path.join(artifactsDir, 'cm_logo_dark.png'),
    clip: { x: 40, y: 35, width: 235, height: 40 }
  });

  // Wheel scroll further to light section ("historic old town")
  for (let i = 0; i < 12; i++) {
    await cmPage.mouse.wheel(0, 600);
    await cmPage.waitForTimeout(150);
  }
  await cmPage.waitForTimeout(600);
  await cmPage.screenshot({
    path: path.join(artifactsDir, 'cm_logo_light.png'),
    clip: { x: 40, y: 35, width: 235, height: 40 }
  });

  // 2. Capture Local The Grand Dark & Light
  const tgPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await tgPage.goto('http://localhost:4128/', { waitUntil: 'domcontentloaded' });
  await tgPage.waitForTimeout(1000);

  // Wheel scroll to dark section
  for (let i = 0; i < 4; i++) {
    await tgPage.mouse.wheel(0, 500);
    await tgPage.waitForTimeout(200);
  }
  await tgPage.waitForTimeout(500);
  await tgPage.screenshot({
    path: path.join(artifactsDir, 'tg_logo_dark.png'),
    clip: { x: 40, y: 35, width: 235, height: 40 }
  });

  // Wheel scroll to light section
  for (let i = 0; i < 30; i++) {
    await tgPage.mouse.wheel(0, 600);
    await tgPage.waitForTimeout(100);
  }
  await tgPage.waitForTimeout(600);
  await tgPage.screenshot({
    path: path.join(artifactsDir, 'tg_logo_light.png'),
    clip: { x: 40, y: 35, width: 235, height: 40 }
  });

  // 3. Build side-by-side composite
  const compPage = await browser.newPage({ viewport: { width: 600, height: 400 } });
  const compHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin:0; padding:20px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#0B0F0C; color:#FFF; }
        .grid { display:grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .card { background:#161D18; border:1px solid #2A362E; border-radius:8px; padding:12px; }
        .title { font-size:12px; text-transform:uppercase; letter-spacing:0.06em; color:#8FA596; margin-bottom:10px; font-weight:600; }
        img { display:block; width:100%; height:auto; border-radius:4px; border:1px solid #334438; }
      </style>
    </head>
    <body>
      <h2 style="font-size:16px; margin:0 0 16px; font-weight:500;">Sticky Logo Optical Comparison: Reference vs Current</h2>
      <div class="grid">
        <div class="card">
          <div class="title">Casa Momo (Dark Bg)</div>
          <img src="file:///${artifactsDir.replace(/\\/g, '/')}/cm_logo_dark.png"/>
        </div>
        <div class="card">
          <div class="title">Casa Momo (Light Cream Bg)</div>
          <img src="file:///${artifactsDir.replace(/\\/g, '/')}/cm_logo_light.png"/>
        </div>
        <div class="card">
          <div class="title">The Grand (Dark Bg)</div>
          <img src="file:///${artifactsDir.replace(/\\/g, '/')}/tg_logo_dark.png"/>
        </div>
        <div class="card">
          <div class="title">The Grand (Light Cream Bg)</div>
          <img src="file:///${artifactsDir.replace(/\\/g, '/')}/tg_logo_light.png"/>
        </div>
      </div>
    </body>
    </html>
  `;
  await compPage.setContent(compHtml);
  await compPage.waitForTimeout(600);
  await compPage.screenshot({
    path: path.join(artifactsDir, 'logo_2x2_comparison.png')
  });

  console.log('Saved logo_2x2_comparison.png successfully.');

  await browser.close();
  server.close();
  process.exit(0);
});
