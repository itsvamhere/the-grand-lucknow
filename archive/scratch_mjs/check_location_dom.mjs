import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkDOM() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3003/venues/venue-n2', { waitUntil: 'networkidle' });

  const locationSection = await page.evaluate(() => {
    // Look for headings or sections mentioning Location
    const elements = Array.from(document.querySelectorAll('h2, h3, section, [data-framer-name]'));
    const matches = elements.filter(el => (el.innerText || '').includes('Location')).map(el => ({
      tag: el.tagName,
      name: el.getAttribute('data-framer-name'),
      className: el.className,
      childCount: el.children.length
    }));
    return matches;
  });
  console.log('Location matches in DOM:', locationSection);
  await browser.close();
}

checkDOM();
