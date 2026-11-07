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

server.listen(4124, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4124/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const offsets = [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000];
  const bgs = [];
  for (const y of offsets) {
    await page.evaluate(val => window.scrollTo(0, val), y);
    await page.waitForTimeout(300);
    const bgInfo = await page.evaluate(() => {
      // Find what element is visually directly under (110, 50)
      const els = document.elementsFromPoint(110, 50) || [];
      const colors = [];
      for (const el of els) {
        if (el.closest('header, [data-framer-name="Navbar Wrapper"]')) continue;
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          colors.push({ tag: el.tagName, name: el.getAttribute('data-framer-name'), bg });
        }
      }
      const rootTheme = document.documentElement.getAttribute('data-logo-theme');
      return { colors: colors.slice(0, 3), rootTheme };
    });
    bgs.push({ y, ...bgInfo });
  }
  console.log('Scroll background changes:\n', JSON.stringify(bgs, null, 2));

  await browser.close();
  server.close();
  process.exit(0);
});
