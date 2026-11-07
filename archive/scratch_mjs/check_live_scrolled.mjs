import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://the-grand-lucknow.vercel.app', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const heroStatus = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    const r = l.getBoundingClientRect();
    const theme = document.documentElement.getAttribute('data-logo-theme');
    const rootVar = getComputedStyle(document.documentElement).getPropertyValue('--grand-logo-color');
    const svg = document.querySelector('#svg-1334768056_3843 text');
    return {
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      theme,
      rootVar,
      svgFill: svg ? getComputedStyle(svg).fill : null,
      svgStroke: svg ? getComputedStyle(svg).stroke : null
    };
  });
  console.log('Hero logo status:\n', JSON.stringify(heroStatus, null, 2));

  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/live_logo_hero_exact_rect.png',
    clip: {
      x: Math.max(0, heroStatus.rect.x - 10),
      y: Math.max(0, heroStatus.rect.y - 10),
      width: heroStatus.rect.w + 20,
      height: heroStatus.rect.h + 20
    }
  });

  await page.evaluate(() => window.scrollTo(0, 16000));
  await page.waitForTimeout(800);

  const logoRect = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    if (!l) return 'none';
    const r = l.getBoundingClientRect();
    const style = window.getComputedStyle(l);
    const theme = document.documentElement.getAttribute('data-logo-theme');
    const rootVar = getComputedStyle(document.documentElement).getPropertyValue('--grand-logo-color');
    const svg = document.querySelector('#svg-1334768056_3843 text');
    return {
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      theme,
      rootVar,
      svgFill: svg ? getComputedStyle(svg).fill : null,
      svgStroke: svg ? getComputedStyle(svg).stroke : null,
      opacity: style.opacity,
      visibility: style.visibility
    };
  });
  console.log('Logo status on live scrolled:\n', JSON.stringify(logoRect, null, 2));

  // Take screenshot of the exact logo bounding box
  if (logoRect.rect) {
    await page.screenshot({
      path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/live_logo_exact_rect.png',
      clip: {
        x: Math.max(0, logoRect.rect.x - 10),
        y: Math.max(0, logoRect.rect.y - 10),
        width: logoRect.rect.w + 20,
        height: logoRect.rect.h + 20
      }
    });
  }

  await browser.close();
}

run().catch(console.error);
