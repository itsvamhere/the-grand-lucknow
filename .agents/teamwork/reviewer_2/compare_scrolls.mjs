import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function compareScrolls() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const pOrig = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pLawn = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await pOrig.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'networkidle' });
  await pLawn.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const scrollPoints = [0, 6000, 6600, 6800, 7000, 7150, 7400];
  for (const y of scrollPoints) {
    await pOrig.evaluate(s => window.scrollTo(0, s), y);
    await pLawn.evaluate(s => window.scrollTo(0, s), y);
    await pOrig.waitForTimeout(100);
    await pLawn.waitForTimeout(100);

    const origState = await pOrig.evaluate(() => {
      const h1 = document.querySelector('.hidden-u6hac7 h1') || document.querySelector('h1');
      const spans = Array.from(h1 ? h1.querySelectorAll('span') : []);
      const visibleLetters = spans.filter(s => s.innerText && s.innerText.length === 1 && !s.style.clipPath);
      return visibleLetters.map(s => ({
        c: s.innerText,
        tr: s.style.translate || s.style.transform || window.getComputedStyle(s).transform,
        rot: s.style.rotate || '',
        op: s.style.opacity || window.getComputedStyle(s).opacity
      }));
    });

    const lawnState = await pLawn.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('.hidden-u6hac7 .grand-hero-letter, h1 .grand-hero-letter'));
      return letters.map(s => ({
        c: s.innerText,
        tr: s.style.transform,
        op: s.style.opacity
      }));
    });

    console.log(`\n--- Scroll Y = ${y} ---`);
    console.log('Orig letters count:', origState.length);
    if (origState.length > 0) {
      console.log('Orig sample:', origState[0], origState[Math.floor(origState.length / 2)], origState[origState.length - 1]);
    }
    console.log('Lawn letters count:', lawnState.length);
    if (lawnState.length > 0) {
      console.log('Lawn sample:', lawnState[0], lawnState[Math.floor(lawnState.length / 2)], lawnState[lawnState.length - 1]);
    }

    await pOrig.screenshot({ path: `C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_2/orig_${y}.png` });
    await pLawn.screenshot({ path: `C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_2/lawn_${y}.png` });
  }

  await browser.close();
}

compareScrolls().catch(console.error);
