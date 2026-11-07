import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function findIndexBtn() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const pIndex = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pIndex.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  const btn = await pIndex.evaluate(() => {
    const allA = Array.from(document.querySelectorAll('a'));
    const bookNowA = allA.filter(a => a.innerText.includes('Book Now'));
    return bookNowA.map(a => ({
      class: a.className,
      parentClass: a.parentElement ? a.parentElement.className : '',
      grandParentClass: a.parentElement && a.parentElement.parentElement ? a.parentElement.parentElement.className : '',
      outerHTML: a.outerHTML.slice(0, 300),
      rect: a.getBoundingClientRect()
    }));
  });

  console.log('Index Book Now buttons:', JSON.stringify(btn, null, 2));
  await browser.close();
}

findIndexBtn().catch(console.error);
