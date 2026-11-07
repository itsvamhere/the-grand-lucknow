import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop
  const pageDesk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesk.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  const deskData = await pageDesk.evaluate(() => {
    const el = document.querySelector('.framer-xj8hz2');
    if (!el) return 'Not found';
    const svg = el.querySelector('svg');
    const text = svg ? svg.querySelector('text') : null;
    return {
      elRect: el.getBoundingClientRect(),
      elComputed: {
        width: getComputedStyle(el).width,
        height: getComputedStyle(el).height,
        left: getComputedStyle(el).left,
        transform: getComputedStyle(el).transform
      },
      parentRect: el.parentElement ? el.parentElement.getBoundingClientRect() : null,
      parentComputed: el.parentElement ? {
        width: getComputedStyle(el.parentElement).width,
        overflow: getComputedStyle(el.parentElement).overflow,
        display: getComputedStyle(el.parentElement).display,
        justifyContent: getComputedStyle(el.parentElement).justifyContent
      } : null,
      svgRect: svg ? svg.getBoundingClientRect() : null,
      svgViewBox: svg ? svg.getAttribute('viewBox') : null,
      textBBox: text ? text.getBBox() : null
    };
  });
  console.log('Desktop Layout:', JSON.stringify(deskData, null, 2));
  await pageDesk.close();

  // 2. Mobile
  const pageMob = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await pageMob.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  const mobData = await pageMob.evaluate(() => {
    const el = document.querySelector('.framer-xj8hz2');
    if (!el) return 'Not found';
    const svg = el.querySelector('svg');
    const text = svg ? svg.querySelector('text') : null;
    return {
      elRect: el.getBoundingClientRect(),
      elComputed: {
        width: getComputedStyle(el).width,
        height: getComputedStyle(el).height,
        left: getComputedStyle(el).left,
        transform: getComputedStyle(el).transform
      },
      parentRect: el.parentElement ? el.parentElement.getBoundingClientRect() : null,
      parentComputed: el.parentElement ? {
        width: getComputedStyle(el.parentElement).width,
        overflow: getComputedStyle(el.parentElement).overflow
      } : null,
      svgRect: svg ? svg.getBoundingClientRect() : null,
      svgViewBox: svg ? svg.getAttribute('viewBox') : null,
      textBBox: text ? text.getBBox() : null
    };
  });
  console.log('Mobile Layout:', JSON.stringify(mobData, null, 2));
  await pageMob.close();

  await browser.close();
}

main().catch(console.error);
