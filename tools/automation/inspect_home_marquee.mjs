import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  // Check the big letters at the bottom of the home page footer!
  const marqueeInfo = await page.evaluate(async () => {
    const f = document.querySelector('footer');
    if (!f) return { error: 'no footer' };

    // Find the marquee container or large SVG container
    const svgContainer = f.querySelector('.framer-1f1481b, [class*="1f1481b"], svg[id*="870196829"]')?.closest('div') || f.querySelector('svg')?.parentElement;
    
    // Look at all animated elements in footer:
    // Check computed styles at t=0, t=200ms, t=400ms, t=600ms to see what is moving!
    const elements = Array.from(f.querySelectorAll('*'));
    
    // Let's sample transforms of all elements in footer over 500ms
    const track = [];
    for (let i = 0; i < 4; i++) {
      const snap = elements.map(el => ({
        tag: el.tagName,
        class: typeof el.className === 'string' ? el.className.slice(0, 30) : '',
        transform: window.getComputedStyle(el).transform,
        style: el.getAttribute('style')
      })).filter(x => x.transform !== 'none' && !x.transform.includes('translateY(100%)'));
      track.push(snap);
      await new Promise(r => setTimeout(r, 200));
    }

    return {
      svgContainerClass: svgContainer ? svgContainer.className : null,
      svgContainerStyle: svgContainer ? svgContainer.getAttribute('style') : null,
      movingElements: track
    };
  });

  console.log(JSON.stringify(marqueeInfo, null, 2));
  await browser.close();
})();
