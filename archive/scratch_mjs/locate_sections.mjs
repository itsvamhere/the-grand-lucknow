import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function locateSections() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const locations = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    const results = [];
    for (const el of all) {
      const text = el.innerText || '';
      if (text.includes('believe') || text.includes('envisioned') || text.includes('head and heart') || text.includes('temporary home') || text.includes('Feel at')) {
        const rect = el.getBoundingClientRect();
        results.push({
          tag: el.tagName,
          text: text.slice(0, 80).replace(/\n/g, ' '),
          top: Math.round(rect.top + window.scrollY),
          height: Math.round(rect.height)
        });
      }
    }
    return results;
  });

  console.log('Section locations:', JSON.stringify(locations, null, 2));

  // Also check if "Feel at Home" appears in scripts and can be updated to estate context: e.g. "Celebrate in Grand Style." or "Grand Spaces. Beautifully."
  await browser.close();
}

locateSections().catch(console.error);
