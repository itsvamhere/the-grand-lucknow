import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  const logoInfo = await page.evaluate(() => {
    const logos = Array.from(document.querySelectorAll('[data-framer-name="Logo"], header a, header')).map(el => ({
      tag: el.tagName,
      name: el.getAttribute('data-framer-name'),
      className: el.className,
      rect: el.getBoundingClientRect(),
      style: el.getAttribute('style'),
      offsetParent: el.offsetParent !== null
    }));
    return logos;
  });
  console.log('Mobile Logo Info in open-earth-lawn:', JSON.stringify(logoInfo, null, 2));

  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'load' });
  const origLogoInfo = await page.evaluate(() => {
    const logos = Array.from(document.querySelectorAll('[data-framer-name="Logo"], header a, header')).map(el => ({
      tag: el.tagName,
      name: el.getAttribute('data-framer-name'),
      className: el.className,
      rect: el.getBoundingClientRect(),
      style: el.getAttribute('style'),
      offsetParent: el.offsetParent !== null
    }));
    return logos;
  });
  console.log('Mobile Logo Info in casamomo original:', JSON.stringify(origLogoInfo, null, 2));

  await browser.close();
}

main().catch(console.error);
