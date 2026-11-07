import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function inspectNavStyles() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const btnInfo = await page.evaluate(() => {
    // Find all links in header
    const links = Array.from(document.querySelectorAll('header a, nav a'));
    return links.map(a => {
      const cs = window.getComputedStyle(a);
      return {
        text: a.innerText.trim(),
        href: a.getAttribute('href'),
        classes: a.className,
        bgColor: cs.backgroundColor,
        color: cs.color,
        display: cs.display,
        borderRadius: cs.borderRadius,
        outerHtml: a.outerHTML.slice(0, 200)
      };
    });
  });

  console.log('Nav Links Info:', JSON.stringify(btnInfo, null, 2));

  await browser.close();
}

inspectNavStyles().catch(console.error);
