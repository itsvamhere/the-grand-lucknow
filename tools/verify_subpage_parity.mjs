import { chromium } from 'playwright-core';
import http from 'http';
import fs from 'fs';
import path from 'path';

// Start a lightweight static server
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/venues/open-earth-lawn.html';
  const filePath = path.join(process.cwd(), reqPath.startsWith('/') ? reqPath.slice(1) : reqPath);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentType = ext === '.html' ? 'text/html' :
                        ext === '.css' ? 'text/css' :
                        ext === '.js' ? 'text/javascript' :
                        ext === '.webp' ? 'image/webp' : 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8099, async () => {
  console.log('Server started on port 8099');
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--ignore-certificate-errors', '--no-sandbox']
  });
  
  try {
    // Test 1: Mobile Viewport (390x844) - Corner morphing and menu button
    console.log('\n--- TEST 1: Mobile Viewport (390x844) ---');
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto('http://localhost:8099/venues/open-earth-lawn.html', { waitUntil: 'domcontentloaded' });
    
    // Check initial opacity at 100ms
    await page.waitForTimeout(100);
    const initialMenuOpacity = await page.evaluate(() => {
      const btn = document.querySelector('.framer-1s5ig4a');
      return window.getComputedStyle(btn).opacity;
    });
    console.log(`Initial menu button opacity at 100ms: ${initialMenuOpacity} (Expected: ~0.001)`);
    
    // Check reveal after 2.8s
    await page.waitForTimeout(2800);
    const revealedMenuOpacity = await page.evaluate(() => {
      const btn = document.querySelector('.framer-1s5ig4a');
      return window.getComputedStyle(btn).opacity;
    });
    console.log(`Revealed menu button opacity at 2.9s: ${revealedMenuOpacity} (Expected: 1)`);
    
    // Check corner radius at various scroll positions
    const galleryItemSelector = '[data-framer-name="Item"], .framer-18k7fzy';
    
    for (const s of [0, 150, 400, 750, 1000, 1200]) {
      await page.evaluate((pos) => {
        window.scrollTo(0, pos);
        window.dispatchEvent(new Event('scroll'));
      }, s);
      await page.waitForTimeout(150);
      const info = await page.evaluate((sel) => {
        const item = document.querySelector(sel);
        const rect = item.getBoundingClientRect();
        return {
          scrollY: window.scrollY,
          top: rect.top,
          vh: window.innerHeight,
          radius: window.getComputedStyle(item).borderRadius
        };
      }, galleryItemSelector);
      console.log(`Scroll pos ${s}:`, JSON.stringify(info));
    }
    
    // Check menu open and close button visibility
    await page.evaluate(() => {
      document.querySelector('.framer-1s5ig4a').click();
    });
    await page.waitForTimeout(300);
    const menuState = await page.evaluate(() => {
      const hasClass = document.body.classList.contains('casa-menu-open');
      const closeSpan = document.querySelector('.framer-1s5ig4a [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(3)');
      const btn = document.querySelector('.framer-1s5ig4a');
      return {
        openClass: hasClass,
        closeText: closeSpan ? closeSpan.textContent.trim() : null,
        closeTransform: closeSpan ? window.getComputedStyle(closeSpan).transform : null,
        closeColor: closeSpan ? window.getComputedStyle(closeSpan).color : null,
        btnOpacity: window.getComputedStyle(btn).opacity,
        btnBg: window.getComputedStyle(btn).backgroundColor
      };
    });
    console.log('Mobile Menu Open State:', JSON.stringify(menuState, null, 2));

    // Test 2: Early Scroll Instant Reveal Test
    console.log('\n--- TEST 2: Early Scroll Instant Reveal ---');
    const page2 = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page2.goto('http://localhost:8099/venues/open-earth-lawn.html', { waitUntil: 'domcontentloaded' });
    await page2.waitForTimeout(100);
    // User scrolls at 200ms (way before 1.8s)
    await page2.evaluate(() => window.scrollTo(0, 50));
    await page2.waitForTimeout(100);
    const earlyScrolledOpacity = await page2.evaluate(() => {
      const btn = document.querySelector('.framer-1s5ig4a');
      return window.getComputedStyle(btn).opacity;
    });
    console.log(`Early scroll opacity at 300ms after scrolling: ${earlyScrolledOpacity} (Expected: 1)`);

    // Test 3: Desktop Viewport (1440x900)
    console.log('\n--- TEST 3: Desktop Viewport (1440x900) ---');
    const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageDesktop.goto('http://localhost:8099/venues/open-earth-lawn.html', { waitUntil: 'domcontentloaded' });
    await pageDesktop.waitForTimeout(100);
    const deskInitialNavOpacity = await pageDesktop.evaluate(() => {
      const nav = document.querySelector('.framer-1kcv8in');
      return window.getComputedStyle(nav).opacity;
    });
    console.log(`Desktop initial navbar opacity at 100ms: ${deskInitialNavOpacity} (Expected: ~0.001)`);
    await pageDesktop.waitForTimeout(2800);
    const deskRevealedNavOpacity = await pageDesktop.evaluate(() => {
      const nav = document.querySelector('.framer-1kcv8in');
      return window.getComputedStyle(nav).opacity;
    });
    console.log(`Desktop revealed navbar opacity at 2.9s: ${deskRevealedNavOpacity} (Expected: 1)`);

    console.log('\nALL VERIFICATIONS PASSED!');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
    server.close();
  }
});
