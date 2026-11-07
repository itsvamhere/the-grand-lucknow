import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function listDOM() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3003/venues/venue-n2', { waitUntil: 'networkidle' });

  const structure = await page.evaluate(() => {
    const main = document.getElementById('main') || document.body;
    const names = Array.from(main.querySelectorAll('[data-framer-name]')).map(el => el.getAttribute('data-framer-name'));
    const unique = [...new Set(names)];
    return {
      title: document.title,
      textLength: document.body.innerText.length,
      sampleText: document.body.innerText.substring(0, 300),
      uniqueFramerNames: unique.slice(0, 30)
    };
  });
  console.log('Structure:', structure);
  await browser.close();
}

listDOM();
