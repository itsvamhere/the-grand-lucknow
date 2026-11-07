import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkCasaElementsAt5380() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  await page.evaluate(() => { window.scrollTo(0, 5380); });
  await page.waitForTimeout(200);

  const els = await page.evaluate(() => {
    // Find all visible text on screen
    const all = Array.from(document.querySelectorAll('*'));
    const visible = [];
    for (const el of all) {
      if (el.children.length === 0 && el.innerText && el.innerText.trim()) {
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < 576 && r.right > 0 && r.left < 1024) {
          visible.push({
            tag: el.tagName,
            text: el.innerText.trim(),
            classes: el.className,
            rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) },
            style: {
              opacity: window.getComputedStyle(el).opacity,
              transform: window.getComputedStyle(el).transform,
              color: window.getComputedStyle(el).color
            },
            parentTag: el.parentElement.tagName,
            parentClass: el.parentElement.className
          });
        }
      }
    }
    return visible;
  });

  console.log(JSON.stringify(els, null, 2));

  await browser.close();
}

checkCasaElementsAt5380().catch(console.error);
