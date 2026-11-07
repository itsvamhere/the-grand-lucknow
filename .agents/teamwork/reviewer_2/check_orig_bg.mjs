import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkOrigBg() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'networkidle' });

  for (let y = 6000; y <= 7200; y += 100) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(50);

    const bgs = await page.evaluate(() => {
      // Find all elements that have non-transparent background
      const candidates = [
        document.body,
        document.querySelector('.framer-eIM4l'),
        document.querySelector('[data-framer-name="Color Change"]'),
        document.querySelector('.framer-uo2c0'),
        document.querySelector('section#apartment-header, .framer-151qtkn'),
        document.querySelector('.framer-vlhqek-container')
      ];
      return candidates.filter(Boolean).map(el => ({
        tag: el.tagName,
        class: el.className,
        name: el.getAttribute('data-framer-name'),
        bg: window.getComputedStyle(el).backgroundColor,
        op: window.getComputedStyle(el).opacity
      }));
    });

    console.log(`\ny=${y}:`);
    bgs.forEach(b => console.log(`  ${b.tag}.${b.class} [${b.name}]: bg=${b.bg}, op=${b.op}`));
  }

  await browser.close();
}

checkOrigBg().catch(console.error);
