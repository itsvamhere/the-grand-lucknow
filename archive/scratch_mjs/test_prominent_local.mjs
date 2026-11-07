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

server.listen(4118, async () => {
  console.log('Server running on 4118');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // Desktop
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4118/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Initial desktop logo shot (hero dark bg)
  const logo = page.locator('[data-framer-name="Logo"]').first();
  await logo.screenshot({
    path: path.join(artifactsDir, 'prominent_logo_hero_dark.png')
  });

  // 2. Full navbar over hero
  const nav = page.locator('[data-framer-name="Navbar Wrapper"]').first();
  await nav.screenshot({
    path: path.join(artifactsDir, 'prominent_nav_hero_dark.png')
  });

  // 3. Scroll to light section
  await page.evaluate(() => window.scrollTo(0, 2200));
  await page.waitForTimeout(600);

  await logo.screenshot({
    path: path.join(artifactsDir, 'prominent_logo_light_bg.png')
  });

  await nav.screenshot({
    path: path.join(artifactsDir, 'prominent_nav_light_bg.png')
  });

  console.log('Captured local desktop shots.');
  await browser.close();
  server.close();
  process.exit(0);
});
