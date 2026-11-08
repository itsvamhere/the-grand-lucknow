import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/book/venue?venue=open-earth-lawn', { waitUntil: 'networkidle' });

  const calData = await page.evaluate(() => {
    const el = document.getElementById('casa-bk-rb-dates') || document.querySelector('[role="dialog"]');
    if (!el) return { error: 'Not found' };
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return {
      id: el.id,
      display: style.display,
      visibility: style.visibility,
      opacity: style.opacity,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      innerTextSnippet: el.innerText.slice(0, 200)
    };
  });

  console.log('Calendar Data:', calData);
  await browser.close();
})();
