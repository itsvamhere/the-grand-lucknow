import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/venues/venue-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const opacityReport = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    const zeroOpacity = all.filter(el => {
      const s = window.getComputedStyle(el);
      return (s.opacity === '0' || s.opacity === '0.001') && el.offsetWidth > 100;
    }).map(el => ({
      tag: el.tagName,
      className: el.className,
      id: el.id,
      text: el.textContent.substring(0, 40)
    }));
    return {
      totalElements: all.length,
      zeroOpacityCount: zeroOpacity.length,
      zeroOpacitySample: zeroOpacity.slice(0, 10)
    };
  });

  console.log(JSON.stringify(opacityReport, null, 2));
  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
