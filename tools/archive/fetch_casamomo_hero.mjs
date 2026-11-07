import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    console.log('Navigating to https://www.casamomo.at/ ...');
    await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2000);

    const info = await page.evaluate(() => {
      // Find all text elements in the first 1000px
      const list = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while (n = walker.nextNode()) {
        const txt = n.textContent.trim();
        if (txt) {
          const el = n.parentElement;
          const rect = el.getBoundingClientRect();
          if (rect.top < 1200) {
            const cs = window.getComputedStyle(el);
            list.push({
              text: txt,
              tag: el.tagName,
              rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
              color: cs.color,
              backgroundColor: cs.backgroundColor,
              fontSize: cs.fontSize,
              fontFamily: cs.fontFamily,
              fontWeight: cs.fontWeight,
              classes: el.className
            });
          }
        }
      }
      return list;
    });

    console.log('Casa Momo Elements in top 1200px:');
    console.log(JSON.stringify(info, null, 2));

    await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3/casamomo_hero_actual.png' });
    console.log('Screenshot saved to casamomo_hero_actual.png');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
}

main();
