import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testPage() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  // Take screenshot at scroll 0
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/shot_0.png' });

  // Evaluate hero headline elements
  const heroInfo = await page.evaluate(() => {
    const h1s = Array.from(document.querySelectorAll('h1'));
    return h1s.map(h => ({
      tagName: h.tagName,
      className: h.className,
      text: h.innerText,
      lettersCount: h.querySelectorAll('.grand-hero-letter').length,
      html: h.innerHTML.slice(0, 300)
    }));
  });
  console.log('H1 Info:', JSON.stringify(heroInfo, null, 2));

  // Check scroll behavior at several points
  for (const scrollY of [100, 500, 1000, 2000, 4000, 6800, 7000, 7200]) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(300);
    const state = await page.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('.grand-hero-letter')).map(l => ({
        char: l.innerText,
        opacity: l.style.opacity,
        transform: l.style.transform
      }));
      return {
        scrollY: window.scrollY,
        letters: letters.slice(0, 6)
      };
    });
    console.log(`At scrollY ${scrollY}:`, JSON.stringify(state));
  }

  await browser.close();
}

testPage().catch(console.error);
