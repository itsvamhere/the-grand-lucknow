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

server.listen(4124, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4124/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check what background color is at (60, 50) at various scroll positions
  const testScrolls = [0, 400, 800, 1200, 1800, 2500, 3200, 4000, 5000, 6000, 7000, 8000, 10000, 14000, 16000];
  const results = [];

  for (const sy of testScrolls) {
    await page.evaluate((y) => window.scrollTo(0, y), sy);
    await page.waitForTimeout(300);

    const bgData = await page.evaluate(() => {
      // Find element behind the header
      const els = document.elementsFromPoint(60, 50);
      // Filter out header and fixed navbar elements
      const nonNavEls = els.filter(el => !el.closest('header') && !el.closest('[data-framer-name="Navbar Wrapper"]') && !el.closest('[data-framer-name="Mobile Navbar"]'));
      
      let foundBg = 'rgba(0, 0, 0, 0)';
      let targetEl = null;
      for (const el of nonNavEls) {
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          foundBg = bg;
          targetEl = el.tagName + '.' + el.className.split(' ')[0] + ' ' + (el.getAttribute('data-framer-name') || '');
          break;
        }
      }

      // Check section name
      const section = nonNavEls.find(el => el.tagName === 'SECTION' || el.tagName === 'FOOTER' || el.getAttribute('data-framer-name'));
      const sectionName = section ? (section.getAttribute('data-framer-name') || section.tagName) : 'unknown';

      return {
        scrollY: window.scrollY,
        foundBg,
        targetEl,
        sectionName
      };
    });

    results.push(bgData);
  }

  console.log('Scroll sampling:', JSON.stringify(results, null, 2));

  await browser.close();
  server.close();
});
