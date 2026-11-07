import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import sharp from 'sharp';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const absTop = await page.evaluate(() => {
    const el = document.getElementById('bigtext-1');
    return el.getBoundingClientRect().top + window.scrollY;
  });

  console.log('Location absTop:', absTop);

  // Target positions:
  // 1. Frame 1: rect.top = 145px
  // 2. Frame 2: rect.top = 85px
  // 3. Frame 3: rect.top = 40px
  const frames = [
    { name: 'thegrand_frame1.png', scrollY: absTop - 145, expectedTop: 145 },
    { name: 'thegrand_frame2.png', scrollY: absTop - 85, expectedTop: 85 },
    { name: 'thegrand_frame3.png', scrollY: absTop - 40, expectedTop: 40 }
  ];

  const results = [];
  for (const f of frames) {
    await page.evaluate((y) => window.scrollTo(0, y), f.scrollY);
    await page.waitForTimeout(100);
    const info = await page.evaluate(() => {
      const el = document.getElementById('bigtext-1');
      const r = el.getBoundingClientRect();
      return {
        top: r.top,
        opacity: window.getComputedStyle(el).opacity
      };
    });
    console.log(`Frame ${f.name}: target scroll=${f.scrollY}, rect.top=${info.top}, opacity=${info.opacity}`);
    results.push(info);
    await page.screenshot({ path: `C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/${f.name}` });
  }

  await browser.close();

  // Create side-by-side comparison artifact of User Casa Momo vs The Grand for all 3 frames!
  const userFrame1 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964181211_728d4783.jpg';
  const userFrame2 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964183324_30c56cec.jpg';
  const userFrame3 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964185681_ffebafd0.jpg';

  const tgFrame1 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/thegrand_frame1.png';
  const tgFrame2 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/thegrand_frame2.png';
  const tgFrame3 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/thegrand_frame3.png';

  const cropH = 400;
  const colW = 600;

  // Process user frames (resize to colW width and crop top cropH)
  const u1 = await sharp(userFrame1).resize(colW).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();
  const u2 = await sharp(userFrame2).resize(colW).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();
  const u3 = await sharp(userFrame3).resize(colW).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();

  // Process the grand frames
  const t1 = await sharp(tgFrame1).resize(colW).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();
  const t2 = await sharp(tgFrame2).resize(colW).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();
  const t3 = await sharp(tgFrame3).resize(colW).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();

  // Create a 2x3 grid:
  // Row 1: Casa Momo Frame 1 | Frame 2 | Frame 3
  // Row 2: The Grand Frame 1 | Frame 2 | Frame 3
  const gridW = colW * 3;
  const gridH = cropH * 2;

  await sharp({
    create: {
      width: gridW,
      height: gridH,
      channels: 4,
      background: { r: 255, g: 240, b: 202, alpha: 1 }
    }
  }).composite([
    { input: u1, left: 0, top: 0 },
    { input: u2, left: colW, top: 0 },
    { input: u3, left: colW * 2, top: 0 },
    { input: t1, left: 0, top: cropH },
    { input: t2, left: colW, top: cropH },
    { input: t3, left: colW * 2, top: cropH }
  ]).png().toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_casamomo_vs_thegrand_fade_grid.png');

  console.log('Generated proof_casamomo_vs_thegrand_fade_grid.png successfully!');
})();
