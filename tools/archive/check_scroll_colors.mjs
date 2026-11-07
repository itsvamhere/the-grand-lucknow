import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkScroll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  for (let y = 0; y <= 5000; y += 500) {
    await page.evaluate(y => window.scrollTo(0, y), y);
    await page.waitForTimeout(100);
    const info = await page.evaluate(() => {
      const el = document.elementFromPoint(100, 50);
      const style = el ? window.getComputedStyle(el) : null;
      const logoColor = window.getComputedStyle(document.documentElement).getPropertyValue('--grand-logo-color');
      return {
        bg: style ? style.backgroundColor : 'none',
        logoColor,
        tag: el ? el.tagName : 'none',
        cls: el ? el.className : ''
      };
    });
    console.log(`Scroll y=${y}: bg=${info.bg}, logoColor=${info.logoColor}`);
  }
  await browser.close();
}
checkScroll().catch(console.error);
