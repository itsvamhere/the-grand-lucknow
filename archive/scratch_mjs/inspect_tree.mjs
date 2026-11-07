import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const pageDesk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesk.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  const tree = await pageDesk.evaluate(() => {
    let el = document.querySelector('.framer-xj8hz2');
    const path = [];
    while (el && el !== document.documentElement) {
      path.push({
        tag: el.tagName,
        class: el.className,
        rect: el.getBoundingClientRect(),
        computed: {
          width: getComputedStyle(el).width,
          overflow: getComputedStyle(el).overflow,
          position: getComputedStyle(el).position,
          display: getComputedStyle(el).display,
          transform: getComputedStyle(el).transform,
          left: getComputedStyle(el).left
        }
      });
      el = el.parentElement;
    }
    return path;
  });
  console.log('Ancestry Tree:', JSON.stringify(tree, null, 2));
  await browser.close();
}

main().catch(console.error);
