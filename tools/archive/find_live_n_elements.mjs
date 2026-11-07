import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const nElements = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    return all.filter(el => {
      const t = el.textContent.trim();
      return (t.startsWith('N°') || t === 'Venue N°1' || t === 'N°01' || t === 'N°02' || t === 'N°03') && el.children.length === 0;
    }).map(el => ({
      tag: el.tagName,
      className: el.className,
      text: el.textContent.trim(),
      parentTag: el.parentElement ? el.parentElement.tagName : null,
      parentClass: el.parentElement ? el.parentElement.className : null,
      rect: el.getBoundingClientRect()
    }));
  });

  console.log('N° Elements in live DOM:', JSON.stringify(nElements, null, 2));

  await browser.close();
}

main().catch(console.error);
