import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';

async function verify() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });

  console.log('=== TEST 1: Initial Load at y=0 (1366x768) ===');
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  // Verify immediate visibility of nav links with zero delay
  const t0Nav = await page.evaluate(() => {
    const pill = document.querySelector('.framer-gaygr9');
    const bookNow = document.querySelector('.framer-18mvsw1-container a');
    return {
      pillOpacity: window.getComputedStyle(pill).opacity,
      pillAnims: pill.getAnimations().length,
      bookNowOpacity: window.getComputedStyle(bookNow).opacity,
      bookNowBorder: window.getComputedStyle(bookNow).border,
      bookNowHeight: window.getComputedStyle(bookNow).height
    };
  });
  console.log('Immediate load t=0 nav state:', t0Nav);

  await page.waitForTimeout(500);

  // Take screenshot of hero at y=0
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_2/lawn_y0_1366.png' });

  console.log('\n=== TEST 2: User Feedback Scenario (Photo 6 at upper right exit) ===');
  // In user image 1 & 2, Photo 6 bottom is around 180px - 250px from top
  // Let's scroll until Photo 6 bottom is around 200px
  let targetY = 6600;
  for (let y = 6200; y <= 6900; y += 50) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(20);
    const p6Bottom = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      return p6 ? Math.round(p6.getBoundingClientRect().bottom) : null;
    });
    if (p6Bottom !== null && p6Bottom <= 250 && p6Bottom >= 150) {
      targetY = y;
      console.log(`Found target scroll Y = ${y} with Photo 6 bottom = ${p6Bottom}px`);
      break;
    }
  }

  await page.evaluate(sc => window.scrollTo(0, sc), targetY);
  await page.waitForTimeout(100);

  // Take screenshot at the user feedback position
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_2/lawn_photo6_exit.png' });

  const exitState = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('.hidden-u6hac7 .grand-hero-letter, h1 .grand-hero-letter'));
    const letterStats = letters.map(l => ({
      char: l.innerText,
      op: l.style.opacity,
      tr: l.style.transform
    }));
    const visibleLetters = letterStats.filter(l => l.op !== '0');

    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    const isLightTheme = document.body.classList.contains('is-light-theme');
    const stickyBtn = document.querySelector('[data-framer-name="Sticky Button"] a');
    const stickyBtnVariant = stickyBtn ? stickyBtn.getAttribute('data-framer-name') : null;

    return {
      totalLetters: letterStats.length,
      visibleLettersCount: visibleLetters.length,
      visibleLetters,
      bodyBg,
      isLightTheme,
      stickyBtnVariant
    };
  });

  console.log('Exit state at Photo 6:', JSON.stringify(exitState, null, 2));

  console.log('\n=== TEST 3: Multi-viewport verification ===');
  const viewports = [
    { width: 1440, height: 900, name: 'Desktop Large' },
    { width: 1024, height: 768, name: 'Tablet Landscape / Small Desktop' },
    { width: 810, height: 1080, name: 'iPad Portrait' },
    { width: 390, height: 844, name: 'Mobile iPhone' }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);

    // Initial load check
    const initLetters = await page.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
      return {
        count: letters.length,
        allVisible: letters.every(l => l.style.opacity === '' || l.style.opacity === '1')
      };
    });

    // Check rolloutEnd scroll
    const secMetrics = await page.evaluate(() => {
      const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
      const secH = sec ? sec.offsetHeight : 8000;
      const vh = window.innerHeight;
      const scrollMax = secH - vh;
      return {
        rolloutEnd: Math.round(scrollMax * 0.91),
        scrollMax
      };
    });

    await page.evaluate(sc => window.scrollTo(0, sc), secMetrics.rolloutEnd + 50);
    await page.waitForTimeout(100);

    const endState = await page.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      return {
        lettersCount: letters.length,
        allRolledOut: letters.every(l => l.style.opacity === '0'),
        bodyBg,
        isLight: document.body.classList.contains('is-light-theme')
      };
    });

    console.log(`Viewport ${vp.name} (${vp.width}x${vp.height}):`);
    console.log(`  y=0 letters count=${initLetters.count}, allVisible=${initLetters.allVisible}`);
    console.log(`  y=${secMetrics.rolloutEnd + 50} allRolledOut=${endState.allRolledOut}, bg=${endState.bodyBg}, isLight=${endState.isLight}`);
  }

  console.log('\n=== TEST 4: index.html Integrity Check ===');
  const indexStat = fs.statSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html');
  console.log('index.html size:', indexStat.size);
  console.log('index.html last modified:', indexStat.mtime);

  await browser.close();
}

verify().catch(console.error);
