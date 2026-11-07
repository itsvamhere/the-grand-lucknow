import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/venues/venue-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const buttonInfo = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('Open in Maps'));
    if (!btn) return null;
    return {
      href: btn.href,
      target: btn.target,
      text: btn.innerText.replace(/\s+/g, ' ').trim(),
      rect: btn.getBoundingClientRect()
    };
  });

  console.log('Button Info:', JSON.stringify(buttonInfo, null, 2));

  const logoInfo = await page.evaluate(() => {
    const logo = document.querySelector('a[data-framer-name="Logo"], a[href="/"]');
    if (!logo) return null;
    return {
      href: logo.href,
      ariaLabel: logo.getAttribute('aria-label'),
      rect: logo.getBoundingClientRect()
    };
  });

  console.log('Logo Info:', JSON.stringify(logoInfo, null, 2));

  await browser.close();
}

main().catch(console.error);
