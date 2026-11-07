import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testIndex() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  // Take screenshot at scroll 0
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/index_shot_0.png' });

  // Check hero letters/words in index.html at different scrolls
  for (const scrollY of [0, 50, 100, 200, 300, 500, 800, 1200]) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(300);
    const heroWords = await page.evaluate(() => {
      // Find words/letters in hero
      const wordEls = document.querySelectorAll('[data-framer-name="Hero Word"], .framer-127143z, .framer-gx6kn9');
      return Array.from(wordEls).map(w => {
        const spans = Array.from(w.querySelectorAll('span'));
        return {
          text: w.innerText,
          style: w.getAttribute('style'),
          firstLetter: spans[1] ? {
            text: spans[1].innerText,
            style: spans[1].getAttribute('style'),
            computedOpacity: window.getComputedStyle(spans[1]).opacity,
            computedTransform: window.getComputedStyle(spans[1]).transform
          } : null
        };
      });
    });
    console.log(`Index ScrollY ${scrollY}:`, JSON.stringify(heroWords));
  }

  await browser.close();
}

testIndex().catch(console.error);
