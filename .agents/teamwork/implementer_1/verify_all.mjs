import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function verifyAll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  console.log('\n--- VERIFYING AT VIEWPORT 1440x900 ---');
  const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page1440.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page1440.waitForTimeout(600);

  // 1. Check Desktop Nav Links
  const navLinks = await page1440.evaluate(() => {
    const links = Array.from(document.querySelectorAll('header nav a, header .framer-18mvsw1-container a'));
    return links.map(a => {
      const cs = window.getComputedStyle(a);
      return {
        text: a.innerText.trim(),
        href: a.getAttribute('href'),
        className: a.className,
        bgColor: cs.backgroundColor,
        color: cs.color,
        opacity: cs.opacity
      };
    });
  });
  console.log('Desktop Nav Links:', JSON.stringify(navLinks, null, 2));

  // Screenshot navbar & button
  const btnEl = await page1440.$('.framer-18mvsw1-container a');
  if (btnEl) {
    await btnEl.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/verified_book_now_btn.png' });
    console.log('Saved button screenshot to verified_book_now_btn.png');
  }

  // 2. Check Letter Animation at 1440x900
  const m1440 = await page1440.evaluate(() => {
    const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
    return {
      secHeight: sec.offsetHeight,
      scrollMax: sec.offsetHeight - window.innerHeight
    };
  });
  console.log('1440x900 metrics:', m1440);

  // Test y=0, y=rolloutStart, y=rolloutMid, y=scrollMax
  const rSpan1440 = Math.min(650, Math.max(380, m1440.scrollMax * 0.1));
  const rStart1440 = m1440.scrollMax - rSpan1440;
  const testPoints1440 = [
    0,
    rStart1440 - 200,
    rStart1440 + 50,
    rStart1440 + Math.round(rSpan1440 * 0.4),
    rStart1440 + Math.round(rSpan1440 * 0.7),
    m1440.scrollMax
  ];

  for (const y of testPoints1440) {
    await page1440.evaluate(sc => window.scrollTo(0, sc), y);
    await page1440.waitForTimeout(60);
    const letterState = await page1440.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('.hidden-u6hac7 .grand-hero-letter'));
      return letters.map(l => ({
        c: l.innerText,
        o: window.getComputedStyle(l).opacity,
        t: window.getComputedStyle(l).transform
      }));
    });
    const nonOne = letterState.filter(l => l.o !== '1');
    console.log(`Scroll y=${y}: Total letters=${letterState.length}, letters animating/faded=${nonOne.length}`);
    if (nonOne.length > 0) {
      console.log('   Sample state:', letterState.map(l => `${l.c}:${l.o}`).join(' '));
    }
  }

  // Also capture screenshot at y=0
  await page1440.evaluate(() => window.scrollTo(0, 0));
  await page1440.waitForTimeout(100);
  await page1440.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/verified_lawn_hero_1440.png' });

  await page1440.close();

  console.log('\n--- VERIFYING AT VIEWPORT 1024x768 ---');
  const page1024 = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page1024.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page1024.waitForTimeout(600);

  const m1024 = await page1024.evaluate(() => {
    const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
    return {
      secHeight: sec.offsetHeight,
      scrollMax: sec.offsetHeight - window.innerHeight
    };
  });
  console.log('1024x768 metrics:', m1024);

  const rSpan1024 = Math.min(650, Math.max(380, m1024.scrollMax * 0.1));
  const rStart1024 = m1024.scrollMax - rSpan1024;
  const testPoints1024 = [
    0,
    rStart1024 - 100,
    rStart1024 + 50,
    rStart1024 + Math.round(rSpan1024 * 0.4),
    rStart1024 + Math.round(rSpan1024 * 0.7),
    m1024.scrollMax
  ];

  for (const y of testPoints1024) {
    await page1024.evaluate(sc => window.scrollTo(0, sc), y);
    await page1024.waitForTimeout(60);
    const letterState = await page1024.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('.hidden-u6hac7 .grand-hero-letter'));
      return letters.map(l => ({
        c: l.innerText,
        o: window.getComputedStyle(l).opacity
      }));
    });
    const nonOne = letterState.filter(l => l.o !== '1');
    console.log(`Scroll y=${y}: Total letters=${letterState.length}, letters animating/faded=${nonOne.length}`);
    if (nonOne.length > 0) {
      console.log('   Sample state:', letterState.map(l => `${l.c}:${l.o}`).join(' '));
    }
  }

  // Capture screenshot at y=0 at 1024x768 (matching reference screenshot)
  await page1024.evaluate(() => window.scrollTo(0, 0));
  await page1024.waitForTimeout(100);
  await page1024.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/verified_lawn_hero_1024.png' });

  // 3. Check Mobile Nav
  console.log('\n--- VERIFYING AT MOBILE VIEWPORT 390x844 ---');
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(500);

  const mobileNavLinks = await pageMobile.evaluate(() => {
    const links = Array.from(document.querySelectorAll('.framer-keuai4-container nav a'));
    return links.map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href')
    }));
  });
  console.log('Mobile Nav Links:', JSON.stringify(mobileNavLinks, null, 2));

  await pageMobile.close();
  await page1024.close();
  await browser.close();
}

verifyAll().catch(console.error);
