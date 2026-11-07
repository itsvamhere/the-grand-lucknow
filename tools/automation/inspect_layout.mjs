import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function inspectLayout() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Evaluate bounding rects when scrolled
  const info = await page.evaluate(() => {
    const sec = document.querySelector('#bigtext-1');
    if (sec) sec.scrollIntoView();

    const logo = document.querySelector('a[data-framer-name="Logo"]');
    const h2 = document.querySelector('#bigtext-1 h2');
    const btn = document.querySelector('#bigtext-1 a');

    return {
      scrollY: window.scrollY,
      logoRect: logo ? logo.getBoundingClientRect() : null,
      logoComputed: logo ? {
        position: window.getComputedStyle(logo).position,
        top: window.getComputedStyle(logo).top,
        left: window.getComputedStyle(logo).left,
        zIndex: window.getComputedStyle(logo).zIndex
      } : null,
      h2Rect: h2 ? h2.getBoundingClientRect() : null,
      h2Computed: h2 ? {
        position: window.getComputedStyle(h2).position,
        zIndex: window.getComputedStyle(h2).zIndex,
        color: window.getComputedStyle(h2).color
      } : null,
      btnRect: btn ? btn.getBoundingClientRect() : null,
      btnComputed: btn ? {
        backgroundColor: window.getComputedStyle(btn).backgroundColor,
        color: window.getComputedStyle(btn).color
      } : null
    };
  });

  console.log('Layout info:', JSON.stringify(info, null, 2));

  // Take screenshot of the exact state
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_scrolled_to_location.png' });

  await browser.close();
}

inspectLayout().catch(console.error);
