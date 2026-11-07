import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/venues/venue-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const evalData = await page.evaluate(() => {
    const mainEl = document.getElementById('main') || document.body;
    return {
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      bodyColor: window.getComputedStyle(document.body).color,
      mainChildren: document.querySelectorAll('#main > *').length,
      visibleH1: Array.from(document.querySelectorAll('h1')).map(h => ({
        text: h.textContent.trim(),
        rect: h.getBoundingClientRect()
      })),
      imgs: Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src.substring(0, 60),
        width: img.width,
        height: img.height,
        displayed: window.getComputedStyle(img).display
      })).slice(0, 5)
    };
  });

  console.log(JSON.stringify(evalData, null, 2));
  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
