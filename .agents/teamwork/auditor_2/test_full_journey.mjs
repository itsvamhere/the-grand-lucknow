import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testFullJourney() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  await page.waitForTimeout(200);

  // Check state at Y = 0
  const state0 = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('.grand-hero-letter'));
    const opacities = letters.map(l => parseFloat(window.getComputedStyle(l).opacity));
    const allOne = opacities.every(op => op === 1);
    const bg = window.getComputedStyle(document.body).backgroundColor;
    return { count: letters.length, allOne, bg, opacities };
  });

  console.log('--- At Y = 0 ---');
  console.log(`Letters count: ${state0.count}, all opacity 1: ${state0.allOne}, body bg: ${state0.bg}`);

  // Find Photo 6 and observe its position as we scroll
  // Find where Photo 6 bottom matches user reference screenshot (bottom ~233px)
  let photo6ExitY = null;
  for (let y = 5000; y <= 7500; y += 25) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    const p6Bottom = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const r = p6 ? p6.getBoundingClientRect() : null;
      return r ? Math.round(r.bottom) : null;
    });

    if (p6Bottom !== null && p6Bottom <= 240 && p6Bottom >= 225) {
      photo6ExitY = y;
      console.log(`Photo 6 bottom reached ${p6Bottom}px at scroll Y = ${y}`);
      break;
    }
  }

  // Let's test from Y=0 up to Y=7200 in increments of 100 to observe letter fade progression
  console.log('\n--- Letter fade progression ---');
  const scrollSamples = [0, 2000, 4000, 5000, 5800, 6000, 6200, 6400, 6650, 7000];
  for (const y of scrollSamples) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(20);
    const sample = await page.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('.grand-hero-letter'));
      const activeLetters = letters
        .map(l => ({ text: l.innerText, opacity: parseFloat(window.getComputedStyle(l).opacity) }))
        .filter(l => l.opacity > 0);
      const bg = window.getComputedStyle(document.body).backgroundColor;
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const p6Bottom = p6 ? Math.round(p6.getBoundingClientRect().bottom) : null;
      return { activeCount: activeLetters.length, activeLetters, bg, p6Bottom };
    });
    console.log(`Y = ${y.toString().padStart(4)}: active letters = ${sample.activeCount}, bg = ${sample.bg}, p6Bottom = ${sample.p6Bottom}px`);
  }

  // Check state precisely at Photo 6 exit position (Y = 6650, where bottom = 233px)
  console.log('\n--- State at Photo 6 exit position (Y = 6650) ---');
  await page.evaluate(() => window.scrollTo(0, 6650));
  await page.waitForTimeout(50);

  const exitState = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('.grand-hero-letter'));
    const lingering = letters
      .map(l => ({ text: l.innerText, opacity: parseFloat(window.getComputedStyle(l).opacity) }))
      .filter(l => l.opacity > 0.001);
    const bg = window.getComputedStyle(document.body).backgroundColor;
    const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
    const p6Rect = p6 ? p6.getBoundingClientRect() : null;
    return {
      lingeringCount: lingering.length,
      lingeringText: lingering.map(l => l.text).join(''),
      bodyBg: bg,
      p6Bottom: p6Rect ? Math.round(p6Rect.bottom) : null
    };
  });

  console.log('Metrics at Photo 6 exit (Y=6650):', exitState);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/auditor_2/independent_photo6_exit.png' });
  console.log('Saved independent_photo6_exit.png');

  // Reverse scroll test: scroll back up to Y = 0
  console.log('\n--- Reverse Scroll Test ---');
  for (let y = 6650; y >= 0; y -= 1000) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(20);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(50);

  const reverseState = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('.grand-hero-letter'));
    const opacities = letters.map(l => parseFloat(window.getComputedStyle(l).opacity));
    const allOne = opacities.every(op => op === 1);
    const bg = window.getComputedStyle(document.body).backgroundColor;
    return { count: letters.length, allOne, bg, opacities };
  });

  console.log('After reverse scroll to Y = 0:');
  console.log(`Letters count: ${reverseState.count}, all opacity 1: ${reverseState.allOne}, body bg: ${reverseState.bg}`);

  await browser.close();
}

testFullJourney().catch(console.error);
