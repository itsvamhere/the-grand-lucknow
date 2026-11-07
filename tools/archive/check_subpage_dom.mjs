import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const heroInfo = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const navBtn = document.querySelector('.grand-nav-maps-btn');
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;

    return {
      bodyBg,
      h1: h1 ? {
        text: h1.innerText,
        rect: h1.getBoundingClientRect(),
        color: window.getComputedStyle(h1).color,
        opacity: window.getComputedStyle(h1).opacity
      } : null,
      header: header ? {
        rect: header.getBoundingClientRect(),
        opacity: window.getComputedStyle(header).opacity
      } : null,
      navBtn: navBtn ? {
        text: navBtn.innerText,
        rect: navBtn.getBoundingClientRect(),
        color: window.getComputedStyle(navBtn).color,
        bgColor: window.getComputedStyle(navBtn).backgroundColor
      } : null
    };
  });

  console.log('Hero & Subpage DOM info:', JSON.stringify(heroInfo, null, 2));
  await browser.close();
}

main().catch(console.error);
