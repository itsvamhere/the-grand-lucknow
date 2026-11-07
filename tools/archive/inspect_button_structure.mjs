import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const info = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a')).filter(a => a.href.includes('maps.app.goo.gl'));
    return links.map(a => {
      // get container 2 levels up
      const p1 = a.parentElement;
      const p2 = p1 ? p1.parentElement : null;
      return {
        aHTML: a.outerHTML,
        p1HTML: p1 ? p1.outerHTML.substring(0, 300) : null,
        p2Class: p2 ? p2.className : null,
        aRect: a.getBoundingClientRect(),
        p1Rect: p1 ? p1.getBoundingClientRect() : null
      };
    });
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

main().catch(console.error);
