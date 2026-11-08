import { chromium } from 'playwright-core';

async function extractHomeFooterRules() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return null;

    // Get all elements inside footer
    const els = [footer, ...Array.from(footer.querySelectorAll('*'))];
    const styles = [];

    // Check relevant elements: footer, ssr-variant, 192t1bg-container, framer-zHQwT, framer-1h4yz5c, framer-n49p1z, framer-xj8hz2, ul, li
    const targets = [
      'footer',
      '.framer-192t1bg-container',
      '.framer-zHQwT',
      '.framer-1h4yz5c',
      '.framer-n49p1z',
      '.framer-xj8hz2',
      '.framer-n49p1z ul',
      '.framer-n49p1z li',
      '.framer-j9pwx'
    ];

    return targets.map(sel => {
      const el = footer.querySelector(sel) || (footer.matches(sel) ? footer : null);
      if (!el) return { selector: sel, found: false };
      const cs = window.getComputedStyle(el);
      return {
        selector: sel,
        found: true,
        className: el.className,
        tagName: el.tagName,
        width: cs.width,
        height: cs.height,
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        display: cs.display,
        position: cs.position,
        transform: cs.transform,
        opacity: cs.opacity,
        overflow: cs.overflow,
        margin: cs.margin,
        padding: cs.padding
      };
    });
  });

  console.log('Homepage exact computed styles:', JSON.stringify(data, null, 2));
  await browser.close();
}

extractHomeFooterRules().catch(console.error);
