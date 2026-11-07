import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://casamomo.at', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Position 1: Scrolled to "Hi, I'm Moritz" (around scrollY ~ 1500-2500)
  // Let's find element containing "Hi, I'm Moritz"
  const pos1 = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('*')).find(e => e.innerText && e.innerText.includes("Hi, I'm Moritz"));
    if (el) {
      el.scrollIntoView({ block: 'center' });
      return { found: true, y: window.scrollY };
    }
    return { found: false };
  });
  await page.waitForTimeout(1000);

  const state1 = await page.evaluate(() => {
    const nav = document.querySelector('header, [data-framer-name*="Navbar"]');
    const logo = document.querySelector('[data-framer-name="Logo"]');
    const svg = logo ? logo.querySelector('svg') : null;
    const path = svg ? svg.querySelector('path') : document.querySelector('#svg-1334768056_3843 path');
    const navClass = nav ? nav.className : '';
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    const pathFill = path ? window.getComputedStyle(path).fill : '';
    return { navClass, bodyBg, pathFill, navHtml: nav ? nav.outerHTML.slice(0, 300) : '' };
  });
  console.log('Position 1 (Moritz - Dark):', state1);

  // Position 2: Scrolled to "historic old town" (Light cream background)
  const pos2 = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('*')).find(e => e.innerText && e.innerText.includes("historic old town"));
    if (el) {
      el.scrollIntoView({ block: 'center' });
      return { found: true, y: window.scrollY };
    }
    return { found: false };
  });
  await page.waitForTimeout(1000);

  const state2 = await page.evaluate(() => {
    const nav = document.querySelector('header, [data-framer-name*="Navbar"]');
    const logo = document.querySelector('[data-framer-name="Logo"]');
    const svg = logo ? logo.querySelector('svg') : null;
    const path = svg ? svg.querySelector('path') : document.querySelector('#svg-1334768056_3843 path');
    const navClass = nav ? nav.className : '';
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    const pathFill = path ? window.getComputedStyle(path).fill : '';
    return { navClass, bodyBg, pathFill, navHtml: nav ? nav.outerHTML.slice(0, 300) : '' };
  });
  console.log('Position 2 (Old Town - Light):', state2);

  await browser.close();
}

run();
