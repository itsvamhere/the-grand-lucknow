import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://casamomo.at', { waitUntil: 'networkidle' });
  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(300);
  }
  const rect = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    const r = l.getBoundingClientRect();
    const style = window.getComputedStyle(l);
    return {
      x: r.x, y: r.y, w: r.width, h: r.height,
      opacity: style.opacity,
      html: l.outerHTML.slice(0, 300)
    };
  });
  console.log('Casa Momo logo rect:\n', JSON.stringify(rect, null, 2));
  
  if (rect.w > 0 && rect.h > 0) {
    await page.screenshot({
      path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/casamomo_true_logo_clip.png',
      clip: { x: rect.x, y: rect.y, width: rect.w, height: rect.h }
    });
    console.log('Saved casamomo_true_logo_clip.png');
  }
  await browser.close();
}

run();
