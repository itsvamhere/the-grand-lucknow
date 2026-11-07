import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function capture() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  await page.waitForTimeout(500);

  // 1. Capture Book Now button detail
  const btn = page.locator('.framer-18mvsw1-container a').first();
  await btn.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/auditor_1/audit_book_now_button.png' });

  // 2. Capture y=0 full hero
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/auditor_1/audit_hero_y0.png' });

  // 3. Scroll to Photo 6 exit position
  // In user reference, Photo 6 bottom is around 180-250px
  let exitY = 6650;
  for (let y = 6200; y <= 7200; y += 25) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(10);
    const p6Bottom = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      return p6 ? Math.round(p6.getBoundingClientRect().bottom) : null;
    });
    if (p6Bottom !== null && p6Bottom <= 240) {
      exitY = y;
      console.log(`Matched Photo 6 bottom = ${p6Bottom}px at Y = ${y}`);
      break;
    }
  }

  await page.evaluate(sc => window.scrollTo(0, sc), exitY);
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/auditor_1/audit_photo6_exit.png' });

  const metricsAtExit = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    const lingeringLetters = letters.filter(l => parseFloat(l.style.opacity || '1') > 0);
    return {
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      lingeringCount: lingeringLetters.length,
      lingeringText: lingeringLetters.map(l => l.innerText).join('')
    };
  });
  console.log('Metrics at Photo 6 exit:', metricsAtExit);

  await browser.close();
}

capture().catch(console.error);
