import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/venues/venue-n1 ...');
  await page.goto('http://localhost:3000/venues/venue-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Inspect the header
  const headerData = await page.evaluate(() => {
    const header = document.querySelector('header');
    if (!header) return { error: 'No header found' };
    const logoLink = header.querySelector('a[data-framer-name="Logo"], a[href="/"]');
    const navLinks = Array.from(header.querySelectorAll('nav a')).map(a => ({
      text: a.innerText.replace(/\s+/g, ' ').trim(),
      href: a.href,
      target: a.target
    }));
    return {
      logoHref: logoLink ? logoLink.href : null,
      logoAria: logoLink ? logoLink.getAttribute('aria-label') : null,
      navLinks
    };
  });

  console.log('Header Data:', JSON.stringify(headerData, null, 2));

  // Capture header screenshot (top 120px)
  await page.screenshot({
    path: `${ARTIFACTS}/venue_n1_header_applied.png`,
    clip: { x: 0, y: 0, width: 1440, height: 120 }
  });
  console.log('✓ Captured venue_n1_header_applied.png');

  // Also capture hero view with header
  await page.screenshot({
    path: `${ARTIFACTS}/venue_n1_hero_with_new_header.png`
  });
  console.log('✓ Captured venue_n1_hero_with_new_header.png');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
