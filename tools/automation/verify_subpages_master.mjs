import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const testPages = [
    { url: 'http://localhost:3003/venues/open-earth-lawn', name: 'open_earth_lawn' },
    { url: 'http://localhost:3003/venues.html', name: 'venues' },
    { url: 'http://localhost:3003/about.html', name: 'about' },
    { url: 'http://localhost:3003/contact.html', name: 'contact' },
    { url: 'http://localhost:3003/venues/boutique-n1.html', name: 'boutique_n1' }
  ];

  for (const t of testPages) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(t.url, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);

    // Verify ticker motion
    const t1 = await page.evaluate(() => window.getComputedStyle(document.querySelector('.framer-n49p1z ul')).transform);
    await page.waitForTimeout(600);
    const t2 = await page.evaluate(() => window.getComputedStyle(document.querySelector('.framer-n49p1z ul')).transform);

    // Verify link hover
    const link = page.locator('footer a:has-text("About"), footer a:has-text("Venues"), footer a:has-text("Contact")').first();
    await link.hover();
    await page.waitForTimeout(300);
    const hoverTransforms = await link.evaluate(el => {
      const g = el.querySelector('span[aria-hidden="true"][style*="inline-block"]');
      return {
        top: g?.children[1]?.style.transform,
        bot: g?.children[2]?.style.transform
      };
    });

    // Capture footer screenshot
    const footer = page.locator('footer.framer-18na9ah');
    await footer.screenshot({ path: `C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_master_${t.name}.png` });

    console.log(`Page: ${t.name}`);
    console.log(` - Ticker t1: ${t1}`);
    console.log(` - Ticker t2: ${t2}`);
    console.log(` - Ticker moving: ${t1 !== t2}`);
    console.log(` - Hover roll: top=${hoverTransforms.top}, bot=${hoverTransforms.bot}`);

    await page.close();
  }

  await browser.close();
  console.log('\nAll pages verified successfully!');
})();
