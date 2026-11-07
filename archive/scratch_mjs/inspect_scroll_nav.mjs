import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const baseDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

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

server.listen(4120, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4120/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const scrollPositions = [0, 400, 1000, 1800, 2600, 3400, 4200, 5000];
  for (const scrollY of scrollPositions) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(500);

    const navInfo = await page.evaluate(() => {
      // Find all logos and headers
      const headers = Array.from(document.querySelectorAll('header, [data-framer-name="Navbar Wrapper"], [data-framer-name="Top"]'));
      const logos = Array.from(document.querySelectorAll('[data-framer-name="Logo"]')).map(el => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const text = el.querySelector('text');
        const img = el.querySelector('img');
        return {
          rect: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) },
          opacity: style.opacity,
          display: style.display,
          visibility: style.visibility,
          imgSrc: img ? img.src : null,
          textFill: text ? window.getComputedStyle(text).fill : null,
          textContent: text ? text.textContent : null
        };
      });

      // Background color under header
      const headerEl = document.querySelector('header');
      const headerRect = headerEl ? headerEl.getBoundingClientRect() : null;

      return {
        scrollY: window.scrollY,
        logos
      };
    });

    console.log(`\n--- Scroll Y: ${scrollY} ---`);
    console.log(JSON.stringify(navInfo, null, 2));
  }

  await browser.close();
  server.close();
});
