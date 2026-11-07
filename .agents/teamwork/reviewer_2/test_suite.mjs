import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';

async function runTests() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = {
    errors: [],
    warnings: [],
    passed: []
  };

  // Test 1: Console errors check
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const consoleMessages = [];
  page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => results.errors.push(`Page error: ${err.message}`));

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check console logs for serious errors
  const errLogs = consoleMessages.filter(m => m.type === 'error');
  if (errLogs.length > 0) {
    results.warnings.push(`Console errors found: ${JSON.stringify(errLogs)}`);
  } else {
    results.passed.push('Zero console errors on initial load');
  }

  // Test 2: Compare Desktop Nav Links and structure with index.html
  const pageIndex = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageIndex.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await pageIndex.waitForTimeout(1000);

  const indexNavData = await pageIndex.evaluate(() => {
    // Links in navbar pill
    const links = Array.from(document.querySelectorAll('header a, [data-framer-name="Navigation"] a, nav a')).map(a => ({
      href: a.getAttribute('href'),
      text: a.innerText.trim().replace(/\s+/g, ' '),
      class: a.className,
      rect: { width: a.offsetWidth, height: a.offsetHeight }
    }));
    // Book now button computed style
    const bookNow = document.querySelector('.framer-18mvsw1-container a, [data-framer-name="White"]');
    let btnStyle = null;
    if (bookNow) {
      const cs = window.getComputedStyle(bookNow);
      btnStyle = {
        bg: cs.backgroundColor,
        color: cs.color,
        borderRadius: cs.borderRadius,
        display: cs.display,
        opacity: cs.opacity,
        height: cs.height,
        padding: cs.padding
      };
    }
    return { links, btnStyle };
  });

  const lawnNavData = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('header a, [data-framer-name="Navigation"] a, nav a')).map(a => ({
      href: a.getAttribute('href'),
      text: a.innerText.trim().replace(/\s+/g, ' '),
      class: a.className,
      rect: { width: a.offsetWidth, height: a.offsetHeight }
    }));
    const bookNow = document.querySelector('.framer-18mvsw1-container a, [data-framer-name="White"]');
    let btnStyle = null;
    if (bookNow) {
      const cs = window.getComputedStyle(bookNow);
      btnStyle = {
        bg: cs.backgroundColor,
        color: cs.color,
        borderRadius: cs.borderRadius,
        display: cs.display,
        opacity: cs.opacity,
        height: cs.height,
        padding: cs.padding
      };
    }
    return { links, btnStyle };
  });

  console.log('Index Nav Data:', JSON.stringify(indexNavData, null, 2));
  console.log('Lawn Nav Data:', JSON.stringify(lawnNavData, null, 2));

  // Check Book Now button styling match
  if (lawnNavData.btnStyle && indexNavData.btnStyle) {
    if (lawnNavData.btnStyle.bg === indexNavData.btnStyle.bg &&
        lawnNavData.btnStyle.color === indexNavData.btnStyle.color &&
        lawnNavData.btnStyle.borderRadius === indexNavData.btnStyle.borderRadius) {
      results.passed.push('Book Now button styling matches index.html exactly');
    } else {
      results.errors.push(`Book Now button styling mismatch: Lawn=${JSON.stringify(lawnNavData.btnStyle)} vs Index=${JSON.stringify(indexNavData.btnStyle)}`);
    }
  } else {
    results.errors.push('Book Now button not found in one of the pages');
  }

  await pageIndex.close();
  await page.close();
  await browser.close();

  console.log('\n--- RESULTS ---');
  console.log('Passed:', results.passed);
  console.log('Warnings:', results.warnings);
  console.log('Errors:', results.errors);
}

runTests().catch(console.error);
