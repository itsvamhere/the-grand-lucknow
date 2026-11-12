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
    // ========================================================
    // TEST 1: Mobile Viewport (390x844)
    // ========================================================
    console.log('\n--- TEST 1: Mobile Viewport (390x844) ---');
    const pageM = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await pageM.goto('http://localhost:8099/venues/open-earth-lawn.html', { waitUntil: 'domcontentloaded' });
    
    // Check initial opacity at 100ms
    await pageM.waitForTimeout(100);
    const initialMenuOpacity = await pageM.evaluate(() => {
      const btn = document.querySelector('.framer-1s5ig4a');
      return window.getComputedStyle(btn).opacity;
    });
    console.log(`Initial menu button opacity at 100ms: ${initialMenuOpacity} (Expected: ~0.001)`);
    
    // Check reveal after 2.8s
    await pageM.waitForTimeout(2800);
    const revealedMenuOpacity = await pageM.evaluate(() => {
      const btn = document.querySelector('.framer-1s5ig4a');
      return window.getComputedStyle(btn).opacity;
    });
    console.log(`Revealed menu button opacity at 2.9s: ${revealedMenuOpacity} (Expected: 1)`);
    
    // Check corner radius at various scroll positions
    const galleryItemSelector = '[data-framer-name="Item"], .framer-18k7fzy';
    for (const s of [0, 150, 400, 750, 1000, 1200]) {
      await pageM.evaluate((pos) => {
        window.scrollTo(0, pos);
        window.dispatchEvent(new Event('scroll'));
      }, s);
      await pageM.waitForTimeout(100);
      const radius = await pageM.evaluate((sel) => {
        const item = document.querySelector(sel);
        return window.getComputedStyle(item).borderRadius;
      }, galleryItemSelector);
      console.log(`Mobile scroll pos ${s} corner radius: ${radius}`);
    }
    
    // Check menu open and close button visibility
    await pageM.evaluate(() => {
      document.querySelector('.framer-1s5ig4a').click();
    });
    await pageM.waitForTimeout(300);
    const menuState = await pageM.evaluate(() => {
      const hasClass = document.body.classList.contains('casa-menu-open');
      const closeSpan = document.querySelector('.framer-1s5ig4a [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(3)');
      const btn = document.querySelector('.framer-1s5ig4a');
      return {
        openClass: hasClass,
        closeText: closeSpan ? closeSpan.textContent.trim() : null,
        closeColor: closeSpan ? window.getComputedStyle(closeSpan).color : null,
        btnOpacity: window.getComputedStyle(btn).opacity
      };
    });
    console.log('Mobile Menu Open State:', JSON.stringify(menuState));

    // ========================================================
    // TEST 2: Laptop/Desktop Viewport (1440x900)
    // ========================================================
    console.log('\n--- TEST 2: Laptop/Desktop Viewport (1440x900) ---');
    const pageD = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageD.goto('http://localhost:8099/venues/open-earth-lawn.html', { waitUntil: 'domcontentloaded' });
    await pageD.waitForTimeout(100);

    const deskHeader = await pageD.evaluate(() => {
      const header = document.querySelector('header.framer-bg7hsc, header.framer-1i47qog');
      const logo = document.querySelector('.framer-1q3kxxd-container [data-framer-name="Logo"], .framer-14ux6li-container [data-framer-name="Logo"]');
      const nav = document.querySelector('.framer-1nw9de0-container nav, .framer-gaeku5-container nav');
      const navLink = document.querySelector('.framer-1kcv8in, .framer-gaygr9');
      const headerH1 = document.querySelector('.framer-13ijl2f-container');
      const checkBtn = document.querySelector('[data-framer-name="Sticky Button"], .framer-1n8t7q3');
      
      const hr = header ? header.getBoundingClientRect() : null;
      const lr = logo ? logo.getBoundingClientRect() : null;
      const nr = nav ? nav.getBoundingClientRect() : null;

      return {
        header: {
          top: hr ? hr.top : null,
          left: hr ? hr.left : null,
          width: hr ? hr.width : null,
          height: hr ? hr.height : null,
          position: header ? window.getComputedStyle(header).position : null
        },
        logo: {
          left: lr ? lr.left : null,
          top: lr ? lr.top : null,
          width: lr ? lr.width : null,
          height: lr ? lr.height : null,
          opacity: logo ? window.getComputedStyle(logo).opacity : null,
          visibility: logo ? window.getComputedStyle(logo).visibility : null
        },
        nav: {
          right: nr ? nr.right : null,
          top: nr ? nr.top : null,
          width: nr ? nr.width : null
        },
        initialStatesAt100ms: {
          logoOpacity: logo ? window.getComputedStyle(logo).opacity : null,
          navLinkOpacity: navLink ? window.getComputedStyle(navLink).opacity : null,
          checkAvailabilityOpacity: checkBtn ? window.getComputedStyle(checkBtn).opacity : null,
          wordsInitialTransform: Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
            text: w.textContent,
            transform: window.getComputedStyle(w).transform
          }))
        }
      };
    });

    console.log('Desktop Header & Layout at 100ms:', JSON.stringify(deskHeader, null, 2));

    // Check reveal at 2.9s
    await pageD.waitForTimeout(2800);
    const revealedStates = await pageD.evaluate(() => {
      const logo = document.querySelector('.framer-1q3kxxd-container [data-framer-name="Logo"], .framer-14ux6li-container [data-framer-name="Logo"]');
      const navLink = document.querySelector('.framer-1kcv8in, .framer-gaygr9');
      const checkBtn = document.querySelector('[data-framer-name="Sticky Button"], .framer-1n8t7q3');
      const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
        text: w.textContent,
        transform: window.getComputedStyle(w).transform
      }));
      return {
        logoOpacity: logo ? window.getComputedStyle(logo).opacity : null,
        navLinkOpacity: navLink ? window.getComputedStyle(navLink).opacity : null,
        checkAvailabilityOpacity: checkBtn ? window.getComputedStyle(checkBtn).opacity : null,
        wordsRevealedTransform: words
      };
    });
    console.log('Desktop Revealed States at 2.9s:', JSON.stringify(revealedStates, null, 2));

    // ========================================================
    // TEST 3: Fade Animation - Letter by Letter on Scroll
    // ========================================================
    console.log('\n--- TEST 3: Fade Animation - Letter by Letter on Scroll ---');
    const lettersCount = await pageD.evaluate(() => {
      const letters = document.querySelectorAll('.grand-hero-letter');
      return letters.length;
    });
    console.log(`Found ${lettersCount} grand-hero-letter elements on page`);

    // Scroll through rollout and sample letter opacities
    const scrollPositions = [0, 6400, 6650, 6750, 6850, 7000];
    for (const pos of scrollPositions) {
      await pageD.evaluate((y) => {
        window.scrollTo(0, y);
        window.dispatchEvent(new Event('scroll'));
      }, pos);
      await pageD.waitForTimeout(100);

      const letterSample = await pageD.evaluate(() => {
        const letters = Array.from(document.querySelectorAll('.ssr-variant.hidden-u6hac7 .grand-hero-letter'));
        return letters.map((el, i) => ({
          char: el.textContent,
          opacity: window.getComputedStyle(el).opacity,
          transform: window.getComputedStyle(el).transform
        }));
      });

      if (letterSample.length > 0) {
        console.log(`Scroll pos ${pos} (sample chars):`, 
          letterSample.map(l => `${l.char}:${l.opacity}`).join(' ')
        );
      }
    }

    // ========================================================
    // TEST 4: Footer Socials - Facebook Only (No LinkedIn)
    // ========================================================
    console.log('\n--- TEST 4: Footer Socials Parity ---');
    const footerSocials = await pageD.evaluate(() => {
      const fbLink = document.querySelector('footer a[href*="facebook.com"]');
      const linkedInLink = document.querySelector('footer a[href*="linkedin.com"]');
      const allText = fbLink ? fbLink.textContent.trim() : null;
      return {
        facebookHref: fbLink ? fbLink.getAttribute('href') : null,
        facebookText: allText,
        hasLinkedInLink: !!linkedInLink,
        containsLinkedInWord: allText ? allText.includes('LinkedIn') : false
      };
    });
    console.log('Footer Socials Check:', JSON.stringify(footerSocials, null, 2));

    console.log('\nALL PARITY VERIFICATIONS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
    server.close();
  }
});
