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

server.listen(4125, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 1. Desktop Verification
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4125/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // State 1: Over Dark Hero
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(500);

  const darkState = await page.evaluate(() => {
    const textEl = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
    const comp = textEl ? window.getComputedStyle(textEl) : null;
    return {
      colorVar: document.documentElement.style.getPropertyValue('--grand-logo-color'),
      themeAttr: document.documentElement.getAttribute('data-logo-theme'),
      fill: comp ? comp.fill : null,
      fontSize: comp ? comp.fontSize : null,
      fontWeight: comp ? comp.fontWeight : null,
      letterSpacing: comp ? comp.letterSpacing : null
    };
  });
  console.log('1. Logo over Dark Hero:', darkState);

  // Capture screenshot of sticky logo over dark hero
  await page.screenshot({
    path: path.join(artifactsDir, 'refinement_logo_dark_bg.png'),
    clip: { x: 0, y: 0, width: 350, height: 120 }
  });

  // State 2: Over a Light Section (inject a light test section into DOM at 1500px or scroll over it)
  await page.evaluate(() => {
    const lightSec = document.createElement('div');
    lightSec.id = 'test-light-block';
    lightSec.setAttribute('data-theme', 'light');
    lightSec.style.cssText = 'position: absolute; top: 1200px; left: 0; width: 100%; height: 800px; background-color: #FFF1C9; z-index: 10;';
    document.body.appendChild(lightSec);
    window.scrollTo(0, 1300);
  });
  await page.waitForTimeout(600);

  const lightState = await page.evaluate(() => {
    const textEl = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
    const comp = textEl ? window.getComputedStyle(textEl) : null;
    return {
      colorVar: document.documentElement.style.getPropertyValue('--grand-logo-color'),
      themeAttr: document.documentElement.getAttribute('data-logo-theme'),
      fill: comp ? comp.fill : null
    };
  });
  console.log('2. Logo over Light Section (#FFF1C9):', lightState);

  // Capture screenshot of sticky logo over light section
  await page.screenshot({
    path: path.join(artifactsDir, 'refinement_logo_light_bg.png'),
    clip: { x: 0, y: 0, width: 350, height: 120 }
  });

  // State 3: Scroll back to Dark Hero
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(600);

  const returnState = await page.evaluate(() => {
    const textEl = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
    const comp = textEl ? window.getComputedStyle(textEl) : null;
    return {
      colorVar: document.documentElement.style.getPropertyValue('--grand-logo-color'),
      themeAttr: document.documentElement.getAttribute('data-logo-theme'),
      fill: comp ? comp.fill : null
    };
  });
  console.log('3. Logo returned to Dark Hero:', returnState);

  // Clean test element
  await page.evaluate(() => {
    const el = document.getElementById('test-light-block');
    if (el) el.remove();
  });

  // 2. Mobile Verification
  const mobPage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  await mobPage.goto('http://localhost:4125/', { waitUntil: 'networkidle' });
  await mobPage.waitForTimeout(1000);

  await mobPage.evaluate(() => window.scrollTo(0, 400));
  await mobPage.waitForTimeout(500);

  await mobPage.screenshot({
    path: path.join(artifactsDir, 'refinement_mobile_logo_dark.png'),
    clip: { x: 0, y: 0, width: 390, height: 90 }
  });

  // Over light section on mobile
  await mobPage.evaluate(() => {
    const lightSec = document.createElement('div');
    lightSec.id = 'test-mob-light-block';
    lightSec.setAttribute('data-theme', 'light');
    lightSec.style.cssText = 'position: absolute; top: 1200px; left: 0; width: 100%; height: 800px; background-color: #FFF1C9; z-index: 10;';
    document.body.appendChild(lightSec);
    window.scrollTo(0, 1300);
  });
  await mobPage.waitForTimeout(600);

  await mobPage.screenshot({
    path: path.join(artifactsDir, 'refinement_mobile_logo_light.png'),
    clip: { x: 0, y: 0, width: 390, height: 90 }
  });

  console.log('Verification finished successfully!');
  await browser.close();
  server.close();
});
