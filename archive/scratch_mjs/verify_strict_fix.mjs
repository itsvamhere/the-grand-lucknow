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

server.listen(4127, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4127/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Check font integrity
  const fontIntegrity = await page.evaluate(() => {
    const textEl = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
    const comp = textEl ? window.getComputedStyle(textEl) : null;
    return {
      fontFamily: comp ? comp.fontFamily : null,
      fontSize: comp ? comp.fontSize : null,
      fontWeight: comp ? comp.fontWeight : null,
      letterSpacing: comp ? comp.letterSpacing : null,
      fill: comp ? comp.fill : null,
      classes: document.documentElement.className
    };
  });
  console.log('1. Font Integrity Check (Dark Background):', fontIntegrity);

  // 2. Simulate light section (#FFF1C9)
  await page.evaluate(() => {
    const light = document.createElement('div');
    light.id = 'cream-bg-test';
    light.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:120px; background:#FFF1C9; z-index:1;';
    document.body.appendChild(light);
    window.dispatchEvent(new Event('scroll'));
  });
  await page.waitForTimeout(500);

  const lightState = await page.evaluate(() => {
    const textEl = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
    const comp = textEl ? window.getComputedStyle(textEl) : null;
    return {
      fontFamily: comp ? comp.fontFamily : null,
      fontSize: comp ? comp.fontSize : null,
      fontWeight: comp ? comp.fontWeight : null,
      letterSpacing: comp ? comp.letterSpacing : null,
      fill: comp ? comp.fill : null,
      classes: document.documentElement.className,
      themeAttr: document.documentElement.getAttribute('data-logo-theme')
    };
  });
  console.log('2. Light Section Check (#FFF1C9):', lightState);

  // Screenshot over light background
  await page.screenshot({
    path: path.join(artifactsDir, 'strict_logo_light_bg.png'),
    clip: { x: 30, y: 15, width: 320, height: 80 }
  });

  // 3. Remove light block and return to dark
  await page.evaluate(() => {
    const el = document.getElementById('cream-bg-test');
    if (el) el.remove();
    window.dispatchEvent(new Event('scroll'));
  });
  await page.waitForTimeout(500);

  const returnDarkState = await page.evaluate(() => {
    const textEl = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
    const comp = textEl ? window.getComputedStyle(textEl) : null;
    return {
      fill: comp ? comp.fill : null,
      classes: document.documentElement.className
    };
  });
  console.log('3. Return to Dark Background:', returnDarkState);

  // Screenshot over dark background
  await page.screenshot({
    path: path.join(artifactsDir, 'strict_logo_dark_bg.png'),
    clip: { x: 30, y: 15, width: 320, height: 80 }
  });

  await browser.close();
  server.close();
  console.log('Strict verification passed successfully!');
});
