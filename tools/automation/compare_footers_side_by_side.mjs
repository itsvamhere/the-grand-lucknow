import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import sharp from 'sharp';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Home page footer
  const pageHome = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageHome.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await pageHome.evaluate(() => { window.scrollTo({ top: 16420, left: 0, behavior: 'instant' }); });
  await pageHome.waitForTimeout(600);
  const homeFooter = pageHome.locator('footer');
  await homeFooter.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/direct_home_footer.png' });

  // 2. Subpage (Open Earth Lawn) footer
  const pageLawn = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageLawn.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await pageLawn.evaluate(() => { window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'instant' }); });
  await pageLawn.waitForTimeout(600);
  const lawnFooter = pageLawn.locator('footer');
  await lawnFooter.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/direct_lawn_footer.png' });

  await browser.close();

  // Create side-by-side comparison
  const bHome = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/direct_home_footer.png')
    .resize(700, null)
    .toBuffer();

  const bLawn = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/direct_lawn_footer.png')
    .resize(700, null)
    .toBuffer();

  const metaBHome = await sharp(bHome).metadata();
  const metaBLawn = await sharp(bLawn).metadata();
  const maxH = Math.max(metaBHome.height, metaBLawn.height);

  await sharp({
    create: {
      width: 1440,
      height: maxH + 40,
      channels: 3,
      background: { r: 18, g: 18, b: 18 }
    }
  })
  .composite([
    { input: bHome, left: 15, top: 20 },
    { input: bLawn, left: 725, top: 20 }
  ])
  .png()
  .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_home_vs_subpage_footer_exact_match.png');

  console.log('Saved proof_home_vs_subpage_footer_exact_match.png!');
})();
