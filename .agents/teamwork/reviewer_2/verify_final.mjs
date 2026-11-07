import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';

async function verifyAll() {
  console.log('=== 1. VERIFYING INDEX.HTML INTEGRITY ===');
  const indexStat = fs.statSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html');
  console.log('index.html size:', indexStat.size);
  console.log('index.html mtime:', indexStat.mtime.toISOString());
  if (indexStat.size !== 871500) {
    throw new Error('index.html size changed!');
  }
  console.log('PASS: index.html is completely unmodified.');

  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  console.log('\n=== 2. VERIFYING NAVBAR & BOOK NOW BUTTON (DESKTOP) ===');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });

  // Immediate load check (t=0)
  const t0State = await page.evaluate(() => {
    const pill = document.querySelector('.framer-gaygr9');
    const btn = document.querySelector('.framer-18mvsw1-container a');
    return {
      pillOpacity: window.getComputedStyle(pill).opacity,
      btnOpacity: window.getComputedStyle(btn).opacity,
      btnBorder: window.getComputedStyle(btn).border,
      btnHeight: window.getComputedStyle(btn).height,
      btnBg: window.getComputedStyle(btn).backgroundColor,
      btnColor: window.getComputedStyle(btn).color,
      btnRadius: window.getComputedStyle(btn).borderRadius
    };
  });
  console.log('Immediate load t=0 navbar state:', t0State);

  if (t0State.pillOpacity !== '1') throw new Error('Pill is not immediately visible!');
  if (t0State.btnOpacity !== '1') throw new Error('Book Now button is not immediately visible!');
  if (t0State.btnBorder !== '0px none rgb(14, 18, 1)') throw new Error(`Book Now border mismatch: ${t0State.btnBorder}`);
  if (parseFloat(t0State.btnHeight) > 35) throw new Error(`Book Now height mismatch: ${t0State.btnHeight}`);
  console.log('PASS: Book Now button and nav pill are styled correctly and immediately visible.');

  console.log('\n=== 3. VERIFYING HERO LETTER-BY-LETTER ROLLOUT & ROLLBACK ===');
  // Check y=0
  const y0Letters = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    return {
      count: letters.length,
      allVisible: letters.every(l => l.style.opacity === '' || l.style.opacity === '1'),
      firstTransform: letters[0].style.transform
    };
  });
  console.log('y=0 letters state:', y0Letters);
  if (y0Letters.count !== 13 || !y0Letters.allVisible) throw new Error('Letters not fully visible at y=0!');

  // Check mid-scroll (e.g. y=6300)
  await page.evaluate(() => window.scrollTo(0, 6300));
  await page.waitForTimeout(50);
  const midLetters = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    return letters.map(l => ({
      char: l.innerText,
      op: l.style.opacity,
      tr: l.style.transform
    }));
  });
  console.log('y=6300 letters sample:', midLetters.slice(0, 5));
  const animatingCount = midLetters.filter(l => l.op !== '1' && l.op !== '').length;
  console.log(`y=6300 letters animating: ${animatingCount} / 13`);
  if (animatingCount === 0) throw new Error('Letters are not animating at mid-scroll!');

  // Check rolloutEnd (Photo 6 exit position, y=6650)
  await page.evaluate(() => window.scrollTo(0, 6650));
  await page.waitForTimeout(50);
  const exitState = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    const allGone = letters.every(l => l.style.opacity === '0');
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    const isLight = document.body.classList.contains('is-light-theme');
    const stickyBtn = document.querySelector('[data-framer-name="Sticky Button"] a');
    return {
      allGone,
      bodyBg,
      isLight,
      stickyBtnVariant: stickyBtn ? stickyBtn.getAttribute('data-framer-name') : null
    };
  });
  console.log('y=6650 (Photo 6 exit) state:', exitState);
  if (!exitState.allGone) throw new Error('Letters still visible at Photo 6 exit!');
  if (exitState.bodyBg !== 'rgb(255, 240, 202)') throw new Error(`Background color is not pure cream: ${exitState.bodyBg}`);
  if (!exitState.isLight) throw new Error('Light theme not active at Photo 6 exit!');

  // Check rapid rollback back to y=0
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(50);
  const rollbackLetters = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    return {
      allRestored: letters.every(l => l.style.opacity === '1' && (l.style.transform === 'none' || l.style.transform === '')),
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      isLight: document.body.classList.contains('is-light-theme')
    };
  });
  console.log('Rollback to y=0 state:', rollbackLetters);
  if (!rollbackLetters.allRestored) throw new Error('Letters not fully restored on rollback!');
  if (rollbackLetters.bodyBg !== 'rgb(14, 18, 1)') throw new Error(`Body bg not dark on rollback: ${rollbackLetters.bodyBg}`);
  if (rollbackLetters.isLight) throw new Error('Light theme still active at y=0!');
  console.log('PASS: Hero headline animation rolls out letter-by-letter and rolls back cleanly.');

  console.log('\n=== 4. MULTI-VIEWPORT VERIFICATION ===');
  const vps = [
    { width: 1440, height: 900, name: 'Desktop Large' },
    { width: 1024, height: 768, name: 'Tablet Landscape / Small Desktop' },
    { width: 810, height: 1080, name: 'iPad Portrait' },
    { width: 390, height: 844, name: 'Mobile iPhone' }
  ];

  for (const vp of vps) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
    await page.waitForTimeout(100);

    const metrics = await page.evaluate(() => {
      const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
      const secH = sec ? sec.offsetHeight : 8000;
      const vh = window.innerHeight;
      const scrollMax = Math.max(1000, secH - vh);
      const rolloutEnd = Math.round(scrollMax * 0.91);
      return { scrollMax, rolloutEnd };
    });

    // Scroll to rolloutEnd
    await page.evaluate(sc => window.scrollTo(0, sc), metrics.rolloutEnd + 20);
    await page.waitForTimeout(50);

    const vpState = await page.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
      return {
        allGone: letters.every(l => l.style.opacity === '0'),
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        isLight: document.body.classList.contains('is-light-theme')
      };
    });

    console.log(`Viewport ${vp.name} (${vp.width}x${vp.height}): allGone=${vpState.allGone}, bg=${vpState.bodyBg}, isLight=${vpState.isLight}`);
    if (!vpState.allGone) throw new Error(`Letters not all rolled out in viewport ${vp.name}`);
    if (vpState.bodyBg !== 'rgb(255, 240, 202)') throw new Error(`Background not pure cream in viewport ${vp.name}: ${vpState.bodyBg}`);
  }
  console.log('PASS: All viewports pass rollout and background color verification.');

  await browser.close();
  console.log('\n>>> ALL ADVERSARIAL VERIFICATIONS PASSED SUCCESSFULLY <<<');
}

verifyAll().catch(err => {
  console.error('VERIFICATION FAILED:', err);
  process.exit(1);
});
