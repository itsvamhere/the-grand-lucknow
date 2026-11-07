import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // Check hrefs of other venues
  const cardsInfo = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[data-framer-name="Venue Item"] a')).map(a => ({
      href: a.getAttribute('href'),
      imgSrc: a.querySelector('img') ? a.querySelector('img').getAttribute('src') : null,
      title: a.querySelector('h2') ? a.querySelector('h2').innerText.trim() : null
    }));
    return cards;
  });

  console.log('OTHER VENUES CARDS INFO:', JSON.stringify(cardsInfo, null, 2));

  await browser.close();
}

main().catch(console.error);
