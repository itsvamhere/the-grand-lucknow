import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const locData = await page.evaluate(() => {
    // Look for Location heading and text
    const all = [];
    document.querySelectorAll('*').forEach(el => {
      if (el.textContent.includes('Location') || el.textContent.includes('Open in Maps') || el.textContent.includes('Sackstraße') || el.textContent.includes('Schönaugasse')) {
        if (el.children.length === 0) {
          all.push({
            tag: el.tagName,
            text: el.textContent.trim(),
            rect: el.getBoundingClientRect(),
            parentClass: el.parentElement?.className,
            grandParentClass: el.parentElement?.parentElement?.className
          });
        }
      }
    });

    // Check Location section and Location Map container
    const sec = document.querySelector('[data-framer-name="Location"]') || document.getElementById('location');
    const map = document.querySelector('[data-framer-name="Location Map"]');
    
    return {
      all: all.slice(0, 15),
      secHTML: sec ? sec.outerHTML.substring(0, 3000) : 'none',
      mapHTML: map ? map.outerHTML.substring(0, 3000) : 'none',
      secRect: sec ? sec.getBoundingClientRect() : null,
      mapRect: map ? map.getBoundingClientRect() : null
    };
  });

  console.log('Location text matches:', JSON.stringify(locData.all, null, 2));
  console.log('Location secRect:', locData.secRect);
  console.log('Location mapRect:', locData.mapRect);

  await browser.close();
}

main().catch(console.error);
