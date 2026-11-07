import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  const tickerInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer.framer-18na9ah');
    const ticker = footer.querySelector('[data-framer-name="Footer Logo"]');
    return {
      outerHtml: ticker ? ticker.outerHTML : null
    };
  });

  console.log('HYDRATED TICKER IN INDEX.HTML:');
  console.log(tickerInfo.outerHtml);

  await browser.close();
}

main().catch(console.error);
