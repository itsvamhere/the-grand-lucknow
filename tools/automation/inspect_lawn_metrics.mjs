import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.evaluate(() => { window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'instant' }); });
  await page.waitForTimeout(600);

  const lawnMetrics = await page.evaluate(() => {
    const f = document.querySelector('footer');
    const logoContainer = f.querySelector('.framer-n49p1z');
    const logoEl = f.querySelector('.framer-xj8hz2');
    const tickerItem = f.querySelector('.grand-ticker-item');
    const tickerTrack = f.querySelector('ul.grand-ticker-track');
    const colContainer = f.querySelector('.framer-1h4yz5c');
    
    // Find all elements with text 'Check Availability'
    const allEls = Array.from(document.querySelectorAll('*'));
    const checkAvail = allEls.find(e => e.innerText && e.innerText.trim() === 'Check Availability' && e.children.length === 0);
    const checkAvailRect = checkAvail ? checkAvail.getBoundingClientRect() : null;

    return {
      viewport: { w: window.innerWidth, h: window.innerHeight },
      footerRect: f.getBoundingClientRect(),
      innerRect: f.querySelector('.framer-1aamxx2')?.getBoundingClientRect(),
      colContainerRect: colContainer?.getBoundingClientRect(),
      logoContainerRect: logoContainer?.getBoundingClientRect(),
      tickerTrackRect: tickerTrack?.getBoundingClientRect(),
      tickerItemRect: tickerItem?.getBoundingClientRect(),
      logoElRect: logoEl?.getBoundingClientRect(),
      logoElStyle: {
        width: window.getComputedStyle(logoEl).width,
        height: window.getComputedStyle(logoEl).height
      },
      logoSvgStyle: {
        width: window.getComputedStyle(logoEl.querySelector('svg')).width,
        height: window.getComputedStyle(logoEl.querySelector('svg')).height
      },
      checkAvail: checkAvail ? {
        text: checkAvail.innerText,
        rect: checkAvailRect,
        position: window.getComputedStyle(checkAvail).position,
        parentTag: checkAvail.parentElement?.tagName,
        parentClass: checkAvail.parentElement?.className
      } : null
    };
  });

  console.log('LAWN METRICS:\n', JSON.stringify(lawnMetrics, null, 2));
  await browser.close();
})();
