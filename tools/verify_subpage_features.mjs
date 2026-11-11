import { chromium } from 'playwright-core';
import http from 'http';
import fs from 'fs';
import path from 'path';

// Simple static server for testing local files
function createServer(port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.mjs': 'text/javascript',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.json': 'application/json'
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';
    
    // Support URLs without .html
    let filePath = path.join(process.cwd(), reqPath);
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end('Not Found: ' + reqPath);
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function runTests() {
  const PORT = 3009;
  const server = await createServer(PORT);
  console.log(`Local test server running at http://localhost:${PORT}`);

  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--ignore-certificate-errors', '--no-sandbox']
  });

  try {
    // === TEST 1: Mobile Viewport (375 x 812) ===
    console.log('\n--- 1. Testing Mobile Viewport (375x812) ---');
    const pageM = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await pageM.goto(`http://localhost:${PORT}/venues/open-earth-lawn`, { waitUntil: 'domcontentloaded' });
    await pageM.waitForTimeout(500);

    // Check gallery image border radius on mobile
    const galleryBorderRadiusM = await pageM.evaluate(() => {
      const imgCont = document.querySelector('.framer-jhveby-container > div, [data-framer-name="Image"] > div');
      const cs = imgCont ? window.getComputedStyle(imgCont) : null;
      return {
        borderRadius: cs ? cs.borderRadius : null,
        overflow: cs ? cs.overflow : null
      };
    });
    console.log('Mobile Gallery Container Styles:', galleryBorderRadiusM);

    // Check gallery image parallax on scroll
    const parallaxInitial = await pageM.evaluate(() => {
      const wrap = document.querySelector('[data-framer-name="Gallery"] div[style*="translateY"]');
      return wrap ? wrap.style.transform : null;
    });
    console.log('Mobile Gallery Parallax Initial:', parallaxInitial);

    await pageM.evaluate(() => window.scrollTo(0, 400));
    await pageM.waitForTimeout(200);

    const parallaxScrolled = await pageM.evaluate(() => {
      const wrap = document.querySelector('[data-framer-name="Gallery"] div[style*="translateY"]');
      return wrap ? wrap.style.transform : null;
    });
    console.log('Mobile Gallery Parallax at Scroll 400:', parallaxScrolled);

    // Scroll back to top to match user screenshot position
    await pageM.evaluate(() => window.scrollTo(0, 240));
    await pageM.waitForTimeout(200);
    await pageM.screenshot({ path: 'tools/proof_subpage_gallery_scrolled_matching.png' });
    console.log('Saved tools/proof_subpage_gallery_scrolled_matching.png');

    // Scroll back to top and test Mobile Menu opening and stagger
    await pageM.evaluate(() => window.scrollTo(0, 0));
    await pageM.waitForTimeout(200);

    // Click mobile menu button
    const menuBtn = pageM.locator('.framer-1s5ig4a, [data-framer-name="Menu Button"]').last();
    await menuBtn.click();
    await pageM.waitForTimeout(300);

    const menuState = await pageM.evaluate(() => {
      const overlay = document.querySelector('[data-framer-name="Menu Overlay"], .framer-1763xqs');
      const links = Array.from(document.querySelectorAll('[data-framer-name="Menu Overlay"] a'));
      return {
        overlayOpacity: overlay ? window.getComputedStyle(overlay).opacity : null,
        linksCount: links.length,
        links: links.map(a => {
          const char = a.querySelector('[data-rolling-label] > span[aria-hidden="true"] > span:last-of-type');
          return {
            text: a.innerText.trim().split('\n')[0],
            opacity: window.getComputedStyle(a).opacity,
            transform: window.getComputedStyle(a).transform,
            transitionDelay: window.getComputedStyle(a).transitionDelay,
            charTransform: char ? window.getComputedStyle(char).transform : null
          };
        })
      };
    });
    console.log('Mobile Menu Open State:', JSON.stringify(menuState, null, 2));

    await pageM.screenshot({ path: 'tools/proof_subpage_menu_stagger.png' });
    console.log('Saved tools/proof_subpage_menu_stagger.png');

    await pageM.close();

    // === TEST 2: Desktop Viewport (1440 x 900) ===
    console.log('\n--- 2. Testing Desktop Viewport (1440x900) ---');
    const pageD = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageD.goto(`http://localhost:${PORT}/venues/open-earth-lawn`, { waitUntil: 'domcontentloaded' });
    await pageD.waitForTimeout(500);

    // Check desktop gallery border-radius
    const galleryBorderRadiusD = await pageD.evaluate(() => {
      const imgCont = document.querySelector('.framer-jhveby-container > div, [data-framer-name="Image"] > div');
      const cs = imgCont ? window.getComputedStyle(imgCont) : null;
      return {
        borderRadius: cs ? cs.borderRadius : null,
        overflow: cs ? cs.overflow : null
      };
    });
    console.log('Desktop Gallery Container Styles:', galleryBorderRadiusD);

    // Check Footer scrolled to bottom
    await pageD.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await pageD.waitForTimeout(300);

    const footerCheck = await pageD.evaluate(() => {
      const f = document.querySelector('footer.framer-18na9ah');
      const reviews = f ? f.querySelectorAll('[data-framer-name="Review Card"]') : [];
      return {
        hasFooter: !!f,
        reviewsCount: reviews.length,
        footerBg: f ? window.getComputedStyle(f).backgroundColor : null
      };
    });
    console.log('Desktop Footer Check:', footerCheck);

    await pageD.screenshot({ path: 'tools/proof_subpage_canonical_footer.png' });
    console.log('Saved tools/proof_subpage_canonical_footer.png');

    await pageD.close();

  } finally {
    await browser.close();
    server.close();
    console.log('Testing completed and server closed.');
  }
}

runTests().catch(console.error);
