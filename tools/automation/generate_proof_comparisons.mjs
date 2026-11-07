import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import sharp from 'sharp';

async function generateSideBySide(width, height, filename) {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Home
  const pageHome = await browser.newPage({ viewport: { width, height } });
  await pageHome.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await pageHome.evaluate(() => { window.scrollTo({ top: 16420, left: 0, behavior: 'instant' }); });
  await pageHome.waitForTimeout(600);
  const homeFooter = pageHome.locator('footer');
  const bufHome = await homeFooter.screenshot();

  // 2. Lawn
  const pageLawn = await browser.newPage({ viewport: { width, height } });
  await pageLawn.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await pageLawn.evaluate(() => { window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'instant' }); });
  await pageLawn.waitForTimeout(600);
  const lawnFooter = pageLawn.locator('footer');
  const bufLawn = await lawnFooter.screenshot();

  await browser.close();

  // Combine side by side
  const targetHalfW = Math.round(width / 2);
  const bHomeResized = await sharp(bufHome).resize(targetHalfW, null).toBuffer();
  const bLawnResized = await sharp(bufLawn).resize(targetHalfW, null).toBuffer();

  const metaHome = await sharp(bHomeResized).metadata();
  const metaLawn = await sharp(bLawnResized).metadata();
  const maxH = Math.max(metaHome.height, metaLawn.height);

  await sharp({
    create: {
      width: targetHalfW * 2 + 20,
      height: maxH + 40,
      channels: 3,
      background: { r: 18, g: 18, b: 18 }
    }
  })
  .composite([
    { input: bHomeResized, left: 5, top: 20 },
    { input: bLawnResized, left: targetHalfW + 15, top: 20 }
  ])
  .png()
  .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/' + filename);

  console.log(`Saved ${filename}! Size: ${targetHalfW * 2 + 20}x${maxH + 40}`);
}

(async () => {
  await generateSideBySide(1440, 900, 'proof_home_vs_subpage_footer_exact_match.png');
  await generateSideBySide(1024, 768, 'proof_home_vs_subpage_footer_1024.png');
})();
