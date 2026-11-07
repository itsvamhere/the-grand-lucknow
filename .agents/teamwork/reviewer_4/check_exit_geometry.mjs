import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();

  const viewports = [
    { width: 1440, height: 900, name: 'Desktop Large' },
    { width: 1366, height: 768, name: '1366x768' },
    { width: 1024, height: 768, name: 'Tablet Landscape / Small Desktop' },
    { width: 810, height: 1080, name: 'iPad Portrait' },
    { width: 390, height: 844, name: 'Mobile iPhone' }
  ];

  for (let vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
    await page.waitForTimeout(50);

    const data = await page.evaluate(() => {
      const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
      const secH = sec ? sec.offsetHeight : 8000;
      const vh = window.innerHeight;
      const scrollMax = Math.max(1000, secH - vh);
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const rect = p6 ? p6.getBoundingClientRect() : null;
      const p6DocBottom = rect ? Math.round(rect.bottom + window.scrollY) : 0;
      return { secH, scrollMax, p6DocBottom, vh };
    });

    console.log(`\nViewport ${vp.name} (${vp.width}x${vp.height}):`);
    console.log(`  scrollMax: ${data.scrollMax}, p6DocBottom: ${data.p6DocBottom}`);
    console.log(`  scrollMax * 0.91: ${Math.round(data.scrollMax * 0.91)}`);
    console.log(`  p6DocBottom - 233: ${data.p6DocBottom - 233}`);
    console.log(`  p6DocBottom - vh * 0.3: ${Math.round(data.p6DocBottom - data.vh * 0.3)}`);

    // Let's check Photo 6 bottom at scrollMax * 0.91:
    const targetY = Math.round(data.scrollMax * 0.91);
    await page.evaluate(sc => window.scrollTo(0, sc), targetY);
    await page.waitForTimeout(20);
    const atTarget = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const rect = p6 ? p6.getBoundingClientRect() : null;
      return { p6Bottom: rect ? Math.round(rect.bottom) : null };
    });
    console.log(`  At Y=${targetY}: p6Bottom = ${atTarget.p6Bottom}px`);
  }

  await browser.close();
}

run().catch(console.error);
