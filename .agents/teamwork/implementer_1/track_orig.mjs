import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function trackOrigH1() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Monitor H1 spans style attributes across scroll
  const scrollSteps = [];
  for (let y = 0; y <= 8000; y += 200) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(50);
    const data = await page.evaluate(() => {
      const h1 = document.querySelector('.ssr-variant.hidden-u6hac7 h1') || document.querySelector('h1');
      if (!h1) return null;
      const spans = Array.from(h1.querySelectorAll('span'));
      return spans.map(s => ({
        text: s.innerText,
        style: s.getAttribute('style'),
        opacity: window.getComputedStyle(s).opacity,
        transform: window.getComputedStyle(s).transform
      }));
    });
    // Check if any span changed from initial
    scrollSteps.push({ y, data });
  }

  // Filter steps where changes occurred
  let lastStr = '';
  for (const step of scrollSteps) {
    const curStr = JSON.stringify(step.data);
    if (curStr !== lastStr) {
      console.log(`\n=== Change at y = ${step.y} ===`);
      if (step.data) {
        step.data.forEach((d, i) => console.log(`  Span ${i} ("${d.text}"): opacity=${d.opacity}, transform=${d.transform}, style="${d.style}"`));
      }
      lastStr = curStr;
    }
  }

  await browser.close();
}

trackOrigH1().catch(console.error);
