import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testOrig() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  // Check H1 and its styles/transform
  const getH1State = async () => {
    return await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      if (!h1) return null;
      const spans = Array.from(h1.querySelectorAll('span'));
      return spans.map(s => ({
        text: s.innerText,
        opacity: window.getComputedStyle(s).opacity,
        transform: window.getComputedStyle(s).transform,
        display: window.getComputedStyle(s).display
      }));
    });
  };

  for (const scrollY of [0, 50, 100, 200, 500, 1000, 2000, 4000, 6000, 7000]) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(200);
    const spans = await getH1State();
    console.log(`ScrollY ${scrollY}:`, JSON.stringify(spans ? spans.slice(0, 4) : null));
  }

  await browser.close();
}

testOrig().catch(console.error);
