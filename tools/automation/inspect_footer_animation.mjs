import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // Check what script/library controls footer animation on home page
  const animDetails = await page.evaluate(async () => {
    const f = document.querySelector('footer');
    const container = f.querySelector('.framer-192t1bg-container');
    const initialStyle = container ? container.getAttribute('style') : null;

    // Scroll by steps towards footer
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const steps = [];
    for (let s = maxScroll - 600; s <= maxScroll; s += 100) {
      window.scrollTo(0, s);
      await new Promise(r => setTimeout(r, 50));
      steps.push({
        scrollY: s,
        style: container ? container.getAttribute('style') : null,
        computedOpacity: container ? window.getComputedStyle(container).opacity : null,
        computedTransform: container ? window.getComputedStyle(container).transform : null
      });
    }

    return { initialStyle, steps };
  });

  console.log(JSON.stringify(animDetails, null, 2));
  await browser.close();
})();
