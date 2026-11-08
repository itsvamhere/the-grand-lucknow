import { chromium } from 'playwright-core';

async function inspectHeaderAtBottom() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1000);

  const headerInfo = await page.evaluate(() => {
    const h = document.querySelector('header');
    if (!h) return null;
    const cs = window.getComputedStyle(h);
    const links = Array.from(h.querySelectorAll('*')).filter(el => el.innerText && el.innerText.trim().length > 0).map(el => ({
      tag: el.tagName,
      class: el.className,
      text: el.innerText.slice(0, 100),
      display: window.getComputedStyle(el).display,
      visibility: window.getComputedStyle(el).visibility,
      opacity: window.getComputedStyle(el).opacity,
      position: window.getComputedStyle(el).position,
      top: el.getBoundingClientRect().top,
      left: el.getBoundingClientRect().left
    }));
    return {
      headerPos: cs.position,
      headerTop: cs.top,
      headerZIndex: cs.zIndex,
      headerDisplay: cs.display,
      headerVisibility: cs.visibility,
      headerOpacity: cs.opacity,
      elements: links.slice(0, 10)
    };
  });

  console.log('Header at bottom on index.html:', JSON.stringify(headerInfo, null, 2));
  await browser.close();
}

inspectHeaderAtBottom().catch(console.error);
