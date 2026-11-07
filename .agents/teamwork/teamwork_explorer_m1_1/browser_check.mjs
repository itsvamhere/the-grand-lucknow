import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Inspect index footer
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const homeFooterInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer.framer-18na9ah');
    if (!footer) return { error: 'no footer' };
    const rect = footer.getBoundingClientRect();
    const logo = footer.querySelector('[data-framer-name="Footer Logo"]');
    const links = Array.from(footer.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href'),
      fontSize: window.getComputedStyle(a).fontSize
    }));
    return {
      rect: { width: rect.width, height: rect.height, top: rect.top },
      logoHtml: logo ? logo.outerHTML.substring(0, 300) : null,
      links: links.slice(0, 5)
    };
  });
  console.log('HOME FOOTER INFO:', JSON.stringify(homeFooterInfo, null, 2));

  // 2. Inspect subpage footer
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const subFooterInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer.framer-18na9ah');
    if (!footer) return { error: 'no footer' };
    const rect = footer.getBoundingClientRect();
    const logo = footer.querySelector('[data-framer-name="Footer Logo"]');
    const links = Array.from(footer.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href'),
      fontSize: window.getComputedStyle(a).fontSize
    }));
    return {
      rect: { width: rect.width, height: rect.height, top: rect.top },
      logoHtml: logo ? logo.outerHTML.substring(0, 300) : null,
      links: links.slice(0, 5)
    };
  });
  console.log('SUBPAGE FOOTER INFO:', JSON.stringify(subFooterInfo, null, 2));

  await browser.close();
}

test().catch(console.error);
