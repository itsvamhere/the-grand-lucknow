import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkColors1024() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const colors = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('header nav a, [data-framer-name="Navigation"] a'));
    return links.map(a => {
      const span = a.querySelector('[data-rolling-label]') || a;
      const cs = window.getComputedStyle(span);
      return {
        text: a.innerText.replace(/\s+/g, ' ').trim(),
        color: cs.color,
        opacity: cs.opacity,
        visibility: cs.visibility,
        rect: a.getBoundingClientRect()
      };
    });
  });

  console.log('Colors at 1024:', JSON.stringify(colors, null, 2));

  // Compare with 1440
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(200);
  const colors1440 = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('header nav a, [data-framer-name="Navigation"] a'));
    return links.map(a => {
      const span = a.querySelector('[data-rolling-label]') || a;
      const cs = window.getComputedStyle(span);
      return {
        text: a.innerText.replace(/\s+/g, ' ').trim(),
        color: cs.color,
        opacity: cs.opacity,
        visibility: cs.visibility,
        rect: a.getBoundingClientRect()
      };
    });
  });
  console.log('Colors at 1440:', JSON.stringify(colors1440, null, 2));

  await browser.close();
}

checkColors1024().catch(console.error);
