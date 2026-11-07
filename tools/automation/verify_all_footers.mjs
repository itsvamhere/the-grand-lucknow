import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import sharp from 'sharp';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const testRoutes = [
    { url: 'http://localhost:3003/venues/open-earth-lawn', name: 'footer_verify_open_earth_lawn.png' },
    { url: 'http://localhost:3003/venues', name: 'footer_verify_venues.png' },
    { url: 'http://localhost:3003/about', name: 'footer_verify_about.png' },
    { url: 'http://localhost:3003/contact', name: 'footer_verify_contact.png' }
  ];

  for (const t of testRoutes) {
    console.log(`Testing route: ${t.url}`);
    await page.goto(t.url, { waitUntil: 'networkidle' });
    
    // Scroll to footer
    const footer = await page.$('footer');
    if (!footer) {
      console.error(`No footer on ${t.url}`);
      continue;
    }
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const fInfo = await page.evaluate(() => {
      const f = document.querySelector('footer');
      const r = f.getBoundingClientRect();
      const cs = window.getComputedStyle(f);
      return {
        height: r.height,
        bg: cs.backgroundColor,
        textStart: f.innerText.slice(0, 100).replace(/\n/g, ' ')
      };
    });
    console.log(`${t.name}:`, fInfo);

    await page.screenshot({ path: `C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/${t.name}` });
  }

  await browser.close();

  // Create a 2x2 comparison grid proving universal footer works across all tested routes!
  const colW = 720;
  const rowH = 450;

  const f1 = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/footer_verify_open_earth_lawn.png')
    .resize(colW, rowH, { fit: 'cover' }).toBuffer();
  const f2 = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/footer_verify_venues.png')
    .resize(colW, rowH, { fit: 'cover' }).toBuffer();
  const f3 = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/footer_verify_about.png')
    .resize(colW, rowH, { fit: 'cover' }).toBuffer();
  const f4 = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/footer_verify_contact.png')
    .resize(colW, rowH, { fit: 'cover' }).toBuffer();

  await sharp({
    create: {
      width: colW * 2,
      height: rowH * 2,
      channels: 4,
      background: { r: 188, g: 111, b: 69, alpha: 1 }
    }
  }).composite([
    { input: f1, left: 0, top: 0 },
    { input: f2, left: colW, top: 0 },
    { input: f3, left: 0, top: rowH },
    { input: f4, left: colW, top: rowH }
  ]).png().toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_universal_footer_grid.png');

  console.log('Saved proof_universal_footer_grid.png');
})();
