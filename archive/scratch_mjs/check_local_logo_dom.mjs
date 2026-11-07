import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const baseDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

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

server.listen(4129, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4129/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const logoDetails = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    if (!l) return 'Logo element not found';
    const svg = l.querySelector('svg');
    const use = svg ? svg.querySelector('use') : null;
    const sym = document.querySelector('#svg-1334768056_3843');
    return {
      logoHtml: l.outerHTML,
      useHref: use ? use.getAttribute('href') : null,
      symExists: !!sym,
      symHtml: sym ? sym.outerHTML : null
    };
  });
  console.log('Logo details on localhost:\n', JSON.stringify(logoDetails, null, 2));

  await browser.close();
  server.close();
  process.exit(0);
});
