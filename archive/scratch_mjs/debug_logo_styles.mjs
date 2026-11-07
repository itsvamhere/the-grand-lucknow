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

server.listen(4119, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4119/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const debug = await page.evaluate(() => {
    const root = document.documentElement;
    const logo = document.querySelector('[data-framer-name="Logo"]');
    const svg = logo ? (logo.querySelector('svg') || document.querySelector('#svg-1334768056_3843')) : null;
    const text = svg ? svg.querySelector('text') : null;
    const use = svg ? svg.querySelector('use') : null;
    return {
      rootTheme: root.getAttribute('data-logo-theme'),
      rootClass: root.className,
      logoHtml: logo ? logo.outerHTML.slice(0, 300) : null,
      svgHtml: svg ? svg.outerHTML.slice(0, 300) : null,
      textFound: !!text,
      useFound: !!use,
      useHref: use ? use.getAttribute('href') : null,
      symbolContent: document.querySelector('#svg-1334768056_3843') ? document.querySelector('#svg-1334768056_3843').outerHTML.slice(0, 300) : null,
      textComputedFill: text ? window.getComputedStyle(text).fill : null,
      textComputedStroke: text ? window.getComputedStyle(text).stroke : null,
    };
  });
  console.log('Debug on page load:\n', JSON.stringify(debug, null, 2));

  await browser.close();
  server.close();
  process.exit(0);
});
