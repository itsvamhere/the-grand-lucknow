import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function findLightSections() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  const sections = await page.evaluate(() => {
    const all = document.querySelectorAll('*');
    const matches = [];
    for (const el of all) {
      const bg = window.getComputedStyle(el).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const p = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (p) {
          const lum = 0.299 * (+p[1]) + 0.587 * (+p[2]) + 0.114 * (+p[3]);
          if (lum > 150) {
            const rect = el.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const height = rect.height;
            if (height > 50 && rect.width > 200) {
              matches.push({
                tag: el.tagName,
                cls: el.className ? (typeof el.className === 'string' ? el.className.slice(0, 40) : 'svg') : '',
                bg,
                lum: lum.toFixed(1),
                top: Math.round(top),
                height: Math.round(height)
              });
            }
          }
        }
      }
    }
    return matches;
  });
  console.log('Light sections on page:');
  console.table(sections);
  await browser.close();
}
findLightSections().catch(console.error);
