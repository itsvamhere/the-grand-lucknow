import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
    return;
  }
  
  res.writeHead(404);
  res.end('Not found');
});

server.listen(4114, async () => {
  console.log('Local test server running on http://localhost:4114');

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 1. Mobile verification (iPhone 14 / standard 390x844)
  console.log('\n--- Mobile Verification ---');
  const mobContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const mobPage = await mobContext.newPage();
  await mobPage.goto('http://localhost:4114/', { waitUntil: 'networkidle' });
  await mobPage.waitForTimeout(2000);

  // Capture Mobile Navbar & Hero
  await mobPage.screenshot({ path: path.join(artifactsDir, 'task1_mobile_navbar_hero.png') });
  console.log('Saved task1_mobile_navbar_hero.png');

  // Inspect Navbar Logo rendered font in DOM
  const navFontInfo = await mobPage.evaluate(() => {
    const logoEl = document.querySelector('[data-framer-name="Logo"] text') || document.querySelector('header text');
    if (!logoEl) return null;
    const computed = window.getComputedStyle(logoEl);
    return {
      text: logoEl.textContent,
      fontFamily: computed.fontFamily,
      fontWeight: computed.fontWeight,
      letterSpacing: computed.letterSpacing,
      fontSize: computed.fontSize,
      fill: computed.fill
    };
  });
  console.log('Mobile Navbar Logo computed style:', navFontInfo);

  // Scroll to Footer
  await mobPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobPage.waitForTimeout(1500);

  // Capture Mobile Footer
  await mobPage.screenshot({ path: path.join(artifactsDir, 'task1_mobile_footer.png') });
  console.log('Saved task1_mobile_footer.png');

  // Inspect Footer Wordmark rendered font in DOM
  const footerFontInfo = await mobPage.evaluate(() => {
    const footerText = document.querySelector('footer text') || document.querySelector('[data-framer-name="Footer"] text');
    if (!footerText) return null;
    const computed = window.getComputedStyle(footerText);
    return {
      text: footerText.textContent,
      fontFamily: computed.fontFamily,
      fontWeight: computed.fontWeight,
      letterSpacing: computed.letterSpacing,
      fontSize: computed.fontSize,
      fill: computed.fill
    };
  });
  console.log('Mobile Footer Logo computed style:', footerFontInfo);

  // Also capture Desktop
  console.log('\n--- Desktop Verification ---');
  const deskContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const deskPage = await deskContext.newPage();
  await deskPage.goto('http://localhost:4114/', { waitUntil: 'networkidle' });
  await deskPage.waitForTimeout(2000);

  await deskPage.screenshot({ path: path.join(artifactsDir, 'task1_desktop_navbar_hero.png') });
  console.log('Saved task1_desktop_navbar_hero.png');

  await deskPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await deskPage.waitForTimeout(1500);
  await deskPage.screenshot({ path: path.join(artifactsDir, 'task1_desktop_footer.png') });
  console.log('Saved task1_desktop_footer.png');

  await browser.close();
  server.close();
  console.log('Verification finished successfully!');
});
