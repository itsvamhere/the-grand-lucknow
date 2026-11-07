import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const baseDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(baseDir, reqPath.replace(/^\//, ''));
  if (fs.existsSync(filePath)) {
    res.writeHead(200);
    res.end(fs.readFileSync(filePath));
    return;
  }
  res.writeHead(404);
  res.end();
});

server.listen(4123, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4123/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const sections = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll('*').forEach(s => {
      const bg = window.getComputedStyle(s).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (m) {
          const lum = 0.299 * (+m[1]) + 0.587 * (+m[2]) + 0.114 * (+m[3]);
          const rect = s.getBoundingClientRect();
          if (rect.height > 200 && rect.width > 500) {
            list.push({
              tag: s.tagName,
              className: s.className.toString().slice(0, 50),
              name: s.getAttribute('data-framer-name'),
              top: Math.round(rect.top + window.scrollY),
              height: Math.round(rect.height),
              bg,
              lum: Math.round(lum)
            });
          }
        }
      }
    });
    return list;
  });
  console.log('Sections with distinct backgrounds:\n', JSON.stringify(sections, null, 2));

  await browser.close();
  server.close();
  process.exit(0);
});
