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

server.listen(4116, async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // Mobile
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  await page.goto('http://localhost:4116/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Mobile Navbar Logo Element Shot
  const navLogo = page.locator('[data-framer-name="Mobile Navbar"] [data-framer-name="Logo"]').first();
  if (await navLogo.count()) {
    await navLogo.screenshot({ path: path.join(artifactsDir, 'proof_mobile_nav_logo.png') });
    console.log('Saved proof_mobile_nav_logo.png');
  }

  // 2. Mobile Hero Split Text Element Shot
  const heroWords = page.locator('[data-framer-name="Hero Word"]').first();
  if (await heroWords.count()) {
    await heroWords.screenshot({ path: path.join(artifactsDir, 'proof_mobile_hero_word.png') });
    console.log('Saved proof_mobile_hero_word.png');
  }

  // 3. Mobile Header Bar (Navbar top view)
  const mobileHeader = page.locator('[data-framer-name="Mobile Navbar"]').first();
  if (await mobileHeader.count()) {
    await mobileHeader.screenshot({ path: path.join(artifactsDir, 'proof_mobile_navbar_bar.png') });
    console.log('Saved proof_mobile_navbar_bar.png');
  }

  // 4. Mobile Footer Wordmark
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  // Locate the footer marquee / logo
  const footerSvg = page.locator('footer [data-framer-name="Footer Logo"]').first();
  if (await footerSvg.count()) {
    await footerSvg.screenshot({ path: path.join(artifactsDir, 'proof_mobile_footer_logo.png') });
    console.log('Saved proof_mobile_footer_logo.png');
  }

  // Entire Footer section
  const footerSection = page.locator('footer').first();
  if (await footerSection.count()) {
    await footerSection.screenshot({ path: path.join(artifactsDir, 'proof_mobile_footer_full.png') });
    console.log('Saved proof_mobile_footer_full.png');
  }

  // 5. Desktop Navbar & Footer
  const deskPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  await deskPage.goto('http://localhost:4116/', { waitUntil: 'networkidle' });
  await deskPage.waitForTimeout(2000);

  const deskNav = deskPage.locator('header [data-framer-name="Logo"]').first();
  if (await deskNav.count()) {
    await deskNav.screenshot({ path: path.join(artifactsDir, 'proof_desktop_nav_logo.png') });
    console.log('Saved proof_desktop_nav_logo.png');
  }

  await deskPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await deskPage.waitForTimeout(1500);

  const deskFooter = deskPage.locator('footer [data-framer-name="Footer Logo"]').first();
  if (await deskFooter.count()) {
    await deskFooter.screenshot({ path: path.join(artifactsDir, 'proof_desktop_footer_logo.png') });
    console.log('Saved proof_desktop_footer_logo.png');
  }

  await browser.close();
  server.close();
  console.log('All element proofs saved successfully!');
});
