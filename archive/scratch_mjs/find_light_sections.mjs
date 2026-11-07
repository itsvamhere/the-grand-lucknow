import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function findLightSections() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://the-grand-lucknow.vercel.app/', { waitUntil: 'networkidle' });

  const lightEls = await page.evaluate(() => {
    function getLuminance(rgbStr) {
      const m = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return null;
      const r = parseInt(m[1]) / 255;
      const g = parseInt(m[2]) / 255;
      const b = parseInt(m[3]) / 255;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    const all = Array.from(document.querySelectorAll('*'));
    const results = [];
    for (const el of all) {
      const bg = window.getComputedStyle(el).backgroundColor;
      const lum = getLuminance(bg);
      if (lum !== null && lum > 0.6) {
        // High luminance (light background)
        const rect = el.getBoundingClientRect();
        if (rect.width > 200 && rect.height > 100) {
          results.push({
            tag: el.tagName,
            name: el.getAttribute('data-framer-name') || el.className.split(' ')[0],
            top: Math.round(rect.top + window.scrollY),
            bottom: Math.round(rect.bottom + window.scrollY),
            height: Math.round(rect.height),
            bg,
            lum: Math.round(lum * 100) / 100
          });
        }
      }
    }
    return results;
  });

  console.log('Light elements on page:', JSON.stringify(lightEls, null, 2));
  await browser.close();
}

findLightSections().catch(console.error);
