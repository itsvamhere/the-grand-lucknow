import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkTitleLayout() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const h1 = document.querySelector('[data-framer-name="Sticky Header Text"] h1');
    const words = Array.from(h1.querySelectorAll('.grand-hero-word'));
    const p6 = document.querySelector('[data-framer-name="Gallery Image 6"]');
    
    return {
      h1Rect: h1 ? h1.getBoundingClientRect() : null,
      h1ComputedStyle: h1 ? {
        fontSize: window.getComputedStyle(h1).fontSize,
        lineHeight: window.getComputedStyle(h1).lineHeight,
        display: window.getComputedStyle(h1).display,
        flexDirection: window.getComputedStyle(h1).flexDirection,
        flexWrap: window.getComputedStyle(h1).flexWrap,
        justifyContent: window.getComputedStyle(h1).justifyContent,
        width: window.getComputedStyle(h1).width,
        maxWidth: window.getComputedStyle(h1).maxWidth
      } : null,
      words: words.map(w => ({
        text: w.innerText,
        rect: w.getBoundingClientRect(),
        parentRect: w.parentElement.getBoundingClientRect(),
        grandParentRect: w.parentElement.parentElement ? w.parentElement.parentElement.getBoundingClientRect() : null
      })),
      p6Rect: p6 ? p6.getBoundingClientRect() : null
    };
  });

  console.log(JSON.stringify(data, null, 2));

  await browser.close();
}

checkTitleLayout().catch(console.error);
