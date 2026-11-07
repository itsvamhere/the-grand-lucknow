import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const heroDetails = await page.evaluate(() => {
    // Find elements containing 'Boutique' or 'Historic' or within Hero
    const hero = document.querySelector('[data-framer-name="Hero"]') || document.querySelector('section');
    return {
      heroOuterHTML: hero ? hero.outerHTML.substring(0, 4000) : 'none',
      allHeroHTML: hero ? hero.innerHTML : 'none'
    };
  });

  console.log('Hero outerHTML length:', heroDetails.allHeroHTML.length);

  // Let's find elements in hero with text
  const heroEls = await page.evaluate(() => {
    const hero = document.querySelector('[data-framer-name="Hero"]') || document.querySelector('section');
    if (!hero) return [];
    const res = [];
    hero.querySelectorAll('*').forEach(el => {
      if (el.textContent.includes('Boutique') || el.textContent.includes('Graz') || el.textContent.includes('Book')) {
        res.push({
          tag: el.tagName,
          className: el.className,
          dataFramerName: el.getAttribute('data-framer-name'),
          text: el.textContent.trim(),
          html: el.outerHTML.substring(0, 500),
          rect: el.getBoundingClientRect(),
          styles: {
            color: window.getComputedStyle(el).color,
            fontSize: window.getComputedStyle(el).fontSize,
            position: window.getComputedStyle(el).position,
            bottom: window.getComputedStyle(el).bottom,
            left: window.getComputedStyle(el).left,
            zIndex: window.getComputedStyle(el).zIndex
          }
        });
      }
    });
    return res;
  });

  console.log('Hero specific elements on casamomo.at:');
  console.log(JSON.stringify(heroEls, null, 2));

  await browser.close();
}

main().catch(console.error);
