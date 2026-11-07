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

server.listen(4121, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4121/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll 1000px
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(1000);

  const navDom = await page.evaluate(() => {
    // Look at all fixed or sticky elements
    const fixedEls = Array.from(document.querySelectorAll('*')).filter(el => {
      const pos = window.getComputedStyle(el).position;
      return pos === 'fixed' || pos === 'sticky';
    });

    return fixedEls.map(el => {
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        class: el.className,
        id: el.id,
        framerName: el.getAttribute('data-framer-name'),
        rect: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) },
        html: el.outerHTML.substring(0, 250)
      };
    });
  });

  console.log('Fixed/Sticky elements on desktop when scrolled:', JSON.stringify(navDom, null, 2));

  await browser.close();
  server.close();
});
