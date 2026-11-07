import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Locate #bigtext-1
  const locInfo = await page.evaluate(() => {
    const el = document.getElementById('bigtext-1');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      top: r.top,
      absTop: r.top + window.scrollY,
      text: el.innerText
    };
  });
  console.log('Local Location info:', locInfo);

  if (!locInfo) {
    console.error('bigtext-1 not found!');
    await browser.close();
    return;
  }

  // Target 1: rect.top = 135px (Location below navbar)
  const y1 = locInfo.absTop - 135;
  await page.evaluate((y) => window.scrollTo(0, y), y1);
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/local_frame1.png' });

  // Target 2: rect.top = 75px (Location partially reaching navbar)
  const y2 = locInfo.absTop - 75;
  await page.evaluate((y) => window.scrollTo(0, y), y2);
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/local_frame2.png' });

  // Target 3: rect.top = 38px (Location directly under The Grand logo)
  const y3 = locInfo.absTop - 38;
  await page.evaluate((y) => window.scrollTo(0, y), y3);
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/local_frame3.png' });

  // Check computed opacity at each
  const opacities = await page.evaluate((positions) => {
    const el = document.getElementById('bigtext-1');
    return positions.map(p => {
      window.scrollTo(0, p);
      const r = el.getBoundingClientRect();
      return { scrollY: p, rectTop: r.top, opacity: window.getComputedStyle(el).opacity };
    });
  }, [y1, y2, y3]);

  console.log('Measured opacities:', opacities);

  await browser.close();
})();
