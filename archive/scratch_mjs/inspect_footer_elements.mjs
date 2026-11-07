import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function inspectFooterElements() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);

  const footerElements = await page.evaluate(() => {
    // Look at footer area (last 1000px of page)
    const elements = Array.from(document.querySelectorAll('footer, [data-framer-name*="Footer"], div[style*="rgb(194, 101, 58)"], div[style*="rgb(188, 111, 69)"], div[style*="rgb(16, 35, 29)"], svg, img'));
    return elements.map(el => {
      const rect = el.getBoundingClientRect();
      const absTop = rect.top + window.scrollY;
      if (absTop > document.body.scrollHeight - 1500) {
        return {
          tag: el.tagName,
          className: el.className,
          name: el.getAttribute('data-framer-name'),
          rect: { width: Math.round(rect.width), height: Math.round(rect.height), top: Math.round(absTop) },
          text: (el.innerText || '').slice(0, 50).replace(/\n/g, ' '),
          innerHTML: el.tagName === 'SVG' ? el.outerHTML : null,
          src: el.getAttribute('src') || el.getAttribute('href')
        };
      }
      return null;
    }).filter(Boolean);
  });

  console.log('Footer Elements found in DOM:');
  console.log(JSON.stringify(footerElements, null, 2));

  await browser.close();
}

inspectFooterElements().catch(console.error);
