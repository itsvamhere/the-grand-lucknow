import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  // Find location heading absolute top
  const absTop = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, div, span, p'));
    const loc = headings.find(el => el.textContent.trim() === 'Location' && el.children.length === 0);
    return loc.getBoundingClientRect().top + window.scrollY;
  });

  console.log('absTop:', absTop);

  // Capture 3 positions matching user's 3 screenshots:
  // 1. Location below navbar: rect.top ~ 130px
  // 2. Location moving up partially overlapping CASA MOMO: rect.top ~ 75px
  // 3. Location directly under CASA MOMO: rect.top ~ 38px

  const targets = [
    { name: 'casamomo_frame1.png', scrollY: absTop - 130 },
    { name: 'casamomo_frame2.png', scrollY: absTop - 75 },
    { name: 'casamomo_frame3.png', scrollY: absTop - 38 }
  ];

  for (const t of targets) {
    await page.evaluate((y) => window.scrollTo(0, y), t.scrollY);
    await page.waitForTimeout(100);
    await page.screenshot({ path: `C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/${t.name}` });
    const info = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, div, span, p'));
      const loc = headings.find(el => el.textContent.trim() === 'Location' && el.children.length === 0);
      const r = loc.getBoundingClientRect();
      const parent = loc.closest('.framer-3msmtm-container') || loc.parentElement;
      return { top: r.top, opacity: window.getComputedStyle(parent).opacity, locOpacity: window.getComputedStyle(loc).opacity };
    });
    console.log(t.name, info);
  }

  await browser.close();
})();
