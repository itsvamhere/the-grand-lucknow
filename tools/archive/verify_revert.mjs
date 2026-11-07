import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

async function verifyPristineHome() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to live production: https://the-grand-lucknow.vercel.app ...');
  await page.goto('https://the-grand-lucknow.vercel.app', { waitUntil: 'networkidle' });

  // 1. Verify Navbar
  const navData = await page.evaluate(() => {
    const nav = document.querySelector('header[data-framer-name="Navbar Wrapper"]') || document.querySelector('header');
    return {
      hasNav: !!nav,
      rect: nav ? nav.getBoundingClientRect() : null,
      visible: nav ? window.getComputedStyle(nav).display !== 'none' && window.getComputedStyle(nav).visibility !== 'hidden' : false,
      links: nav ? Array.from(nav.querySelectorAll('a')).map(a => ({ href: a.getAttribute('href'), text: a.innerText.trim() })) : []
    };
  });
  console.log('Live Navbar Data:', JSON.stringify(navData, null, 2));

  // Take top screenshot
  await page.screenshot({ path: path.join(ROOT, 'tools', 'revert_live_home_top.png') });

  // 2. Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  const footerData = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    const ticker = footer ? footer.querySelector('[data-framer-name="Footer Logo"]') : null;
    return {
      hasFooter: !!footer,
      footerText: footer ? footer.innerText.slice(0, 200).replace(/\s+/g, ' ') : null,
      hasTicker: !!ticker
    };
  });
  console.log('Live Footer Data:', JSON.stringify(footerData, null, 2));

  // Take footer screenshot
  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({ path: path.join(ROOT, 'tools', 'revert_live_home_footer.png') });
  }

  await browser.close();
}

verifyPristineHome().catch(console.error);
