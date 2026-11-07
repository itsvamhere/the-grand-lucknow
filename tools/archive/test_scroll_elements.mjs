import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testScroll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // Let's scroll using wheel or evaluate with window.dispatchEvent(new Event('scroll'))
  const testPoints = [0, 800, 1500, 2500, 3500, 5000];
  for (const sy of testPoints) {
    await page.evaluate(y => {
      window.scrollTo(0, y);
      window.dispatchEvent(new Event('scroll'));
    }, sy);
    await page.waitForTimeout(200);

    const data = await page.evaluate(() => {
      const els = document.elementsFromPoint(110, 50) || [];
      const tagList = Array.from(els).map(e => ({
        tag: e.tagName,
        cls: e.className,
        bg: window.getComputedStyle(e).backgroundColor
      }));
      const logoColor = window.getComputedStyle(document.documentElement).getPropertyValue('--grand-logo-color');
      const hasDarkClass = document.documentElement.classList.contains('logo-dark-text');
      return { tagList: tagList.slice(0, 5), logoColor, hasDarkClass };
    });
    console.log(`\n=== Scroll y=${sy} ===`);
    console.log('logoColor:', data.logoColor, 'hasDarkClass:', data.hasDarkClass);
    console.log('Top elements under (110, 50):', data.tagList);
  }
  await browser.close();
}
testScroll().catch(console.error);
