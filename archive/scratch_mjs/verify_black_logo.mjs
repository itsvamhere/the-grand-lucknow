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

server.listen(4126, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4126/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Dark background
  const darkLogo = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
    return el ? window.getComputedStyle(el).fill : null;
  });
  console.log('1. Dark BG Logo Fill:', darkLogo);

  // 2. Simulate light background (like the user screenshot background #F3ECDD)
  await page.evaluate(() => {
    const light = document.createElement('div');
    light.id = 'cream-bg';
    light.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:120px; background:#F3ECDD; z-index:1;';
    document.body.appendChild(light);
    // trigger check
    window.dispatchEvent(new Event('scroll'));
  });
  await page.waitForTimeout(500);

  const lightLogo = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
    return el ? window.getComputedStyle(el).fill : null;
  });
  console.log('2. Light BG (#F3ECDD) Logo Fill:', lightLogo);

  // Capture screenshot of the black logo over cream background (#F3ECDD)
  await page.screenshot({
    path: path.join(artifactsDir, 'proof_black_logo_cream_bg.png'),
    clip: { x: 30, y: 15, width: 300, height: 70 }
  });

  await browser.close();
  server.close();
});
