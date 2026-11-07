import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const data = await page.evaluate(() => {
    const sections = [];
    document.querySelectorAll('section').forEach((s, i) => {
      sections.push({
        i,
        id: s.id,
        name: s.getAttribute('data-framer-name'),
        className: s.className,
        textSnippet: s.textContent.trim().substring(0, 100),
        hasCanvas: !!s.querySelector('canvas'),
        hasMap: !!s.querySelector('[data-framer-name*="Map"], [class*="map"], canvas, iframe')
      });
    });
    return sections;
  });

  console.log('Casa Momo Homepage Sections:');
  console.log(JSON.stringify(data, null, 2));

  await browser.close();
}

main().catch(console.error);
