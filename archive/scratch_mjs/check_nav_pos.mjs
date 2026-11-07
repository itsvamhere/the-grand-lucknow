import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://the-grand-lucknow.vercel.app', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const navInfo = await page.evaluate(() => {
    const navs = Array.from(document.querySelectorAll('header, [data-framer-name*="Navbar"]'));
    return navs.map(n => {
      const r = n.getBoundingClientRect();
      const style = window.getComputedStyle(n);
      return {
        tag: n.tagName,
        className: n.className,
        name: n.getAttribute('data-framer-name'),
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        position: style.position,
        opacity: style.opacity,
        visibility: style.visibility,
        zIndex: style.zIndex,
        top: style.top
      };
    });
  });
  console.log('Navbars on page:\n', JSON.stringify(navInfo, null, 2));

  // Also check the Logo element specifically
  const logoInfo = await page.evaluate(() => {
    const logos = Array.from(document.querySelectorAll('[data-framer-name="Logo"]'));
    return logos.map(l => {
      const r = l.getBoundingClientRect();
      const style = window.getComputedStyle(l);
      return {
        tag: l.tagName,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        opacity: style.opacity,
        visibility: style.visibility,
        parentTag: l.parentElement ? l.parentElement.tagName : null,
        parentClass: l.parentElement ? l.parentElement.className : null
      };
    });
  });
  console.log('Logos on page:\n', JSON.stringify(logoInfo, null, 2));

  // Take a full viewport screenshot of the top 300px
  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/full_viewport_top.png',
    clip: { x: 0, y: 0, width: 1440, height: 300 }
  });

  await browser.close();
}

run();
