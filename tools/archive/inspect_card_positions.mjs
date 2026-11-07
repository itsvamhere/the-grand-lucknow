import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const venueCards = await page.evaluate(() => {
    // Find all elements around y: 3500 to 6000
    const cards = Array.from(document.querySelectorAll('.framer-ysBPc, [data-framer-name="Square"], [data-framer-name="Venue Item"]')).map(c => {
      const h2 = c.querySelector('h2');
      const spans = Array.from(c.querySelectorAll('span')).map(s => s.innerText.trim()).filter(Boolean);
      return {
        tag: c.tagName,
        className: c.className,
        rect: c.getBoundingClientRect(),
        h2: h2 ? h2.innerText.trim() : null,
        spans: spans.slice(0, 10)
      };
    });
    return cards;
  });

  console.log('Cards found:', JSON.stringify(venueCards, null, 2));

  await browser.close();
}

main().catch(console.error);
