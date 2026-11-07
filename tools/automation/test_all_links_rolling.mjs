import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const allLinks = await page.evaluate(() => {
    const footer = document.querySelector('footer.framer-18na9ah');
    const links = footer.querySelectorAll('a');
    return Array.from(links).map(a => {
      const groups = a.querySelectorAll('span[data-rolling-label] > span[aria-hidden="true"]');
      const href = a.getAttribute('href');
      const text = Array.from(groups).map(g => g.children[1]?.textContent).join('');
      return {
        href,
        charCount: groups.length,
        assembledText: text
      };
    });
  });

  console.log('All footer links assembled:', JSON.stringify(allLinks, null, 2));
  await browser.close();
})();
