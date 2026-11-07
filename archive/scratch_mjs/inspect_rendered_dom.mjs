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

server.listen(4115, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:4115/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const result = await page.evaluate(() => {
    // Check all text tags in document
    const texts = Array.from(document.querySelectorAll('text')).map(t => ({
      id: t.closest('svg')?.id,
      text: t.textContent,
      fontFamily: window.getComputedStyle(t).fontFamily,
      fontSize: window.getComputedStyle(t).fontSize,
      parent: t.closest('[data-framer-name]')?.getAttribute('data-framer-name')
    }));

    // Check header logo
    const header = document.querySelector('header');
    const headerHtml = header ? header.innerHTML.substring(0, 500) : 'no header';

    // Check footer
    const footer = document.querySelector('footer');
    const footerHtml = footer ? footer.innerHTML.substring(footer.innerHTML.length - 800) : 'no footer';

    return { texts, headerHtml, footerHtml };
  });

  console.log('Texts in DOM:', JSON.stringify(result.texts, null, 2));
  console.log('Header sample:', result.headerHtml);
  console.log('Footer sample:', result.footerHtml);

  await browser.close();
  server.close();
});
