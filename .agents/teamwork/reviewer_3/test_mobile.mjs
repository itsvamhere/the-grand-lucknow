import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testMobile() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  await page.waitForTimeout(500);

  // Take screenshot at mobile y=0
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/mobile_y0.png' });

  const mobileNav = await page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll('header *')).filter(el => {
      const s = window.getComputedStyle(el);
      return el.offsetParent !== null && s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0';
    });
    return visibleElements.map(el => ({
      tag: el.tagName,
      text: el.innerText ? el.innerText.trim() : '',
      box: el.getBoundingClientRect()
    })).filter(x => x.text && x.text.length < 50);
  });
  console.log('Mobile nav visible elements:', mobileNav);

  // Mobile scroll test
  const secMetrics = await page.evaluate(() => {
    const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
    const secH = sec ? sec.offsetHeight : 8000;
    const vh = window.innerHeight;
    const scrollMax = secH - vh;
    return {
      rolloutStart: Math.round(scrollMax * 0.91) - Math.min(550, Math.max(300, scrollMax * 0.08)),
      rolloutEnd: Math.round(scrollMax * 0.91),
      scrollMax
    };
  });
  console.log('Mobile metrics:', secMetrics);

  // Scroll to midpoint
  const midY = Math.round((secMetrics.rolloutStart + secMetrics.rolloutEnd) / 2);
  await page.evaluate(sc => window.scrollTo(0, sc), midY);
  await page.waitForTimeout(100);

  const midState = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    return {
      lettersCount: letters.length,
      letters: letters.map(l => ({ char: l.innerText, op: l.style.opacity, tr: l.style.transform })),
      bg: window.getComputedStyle(document.body).backgroundColor,
      isLight: document.body.classList.contains('is-light-theme')
    };
  });
  console.log('Mobile mid scroll state (y=' + midY + '):', midState);

  // Scroll to rolloutEnd
  await page.evaluate(sc => window.scrollTo(0, sc), secMetrics.rolloutEnd + 50);
  await page.waitForTimeout(100);

  const endState = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    return {
      allGone: letters.every(l => l.style.opacity === '0'),
      bg: window.getComputedStyle(document.body).backgroundColor,
      isLight: document.body.classList.contains('is-light-theme')
    };
  });
  console.log('Mobile end scroll state:', endState);

  // Take screenshot at mobile exit
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/mobile_exit.png' });

  await browser.close();
}

testMobile().catch(console.error);
