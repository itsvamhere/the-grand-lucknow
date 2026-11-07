import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import sharp from 'sharp';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const h2AbsTop = await page.evaluate(() => {
    const el = document.querySelector('#bigtext-1 h2');
    return el.getBoundingClientRect().top + window.scrollY;
  });

  console.log('h2AbsTop:', h2AbsTop);

  // Targets:
  // 1. Frame 1: h2.top = 180px
  // 2. Frame 2: h2.top = 105px
  // 3. Frame 3: h2.top = 41.5px (EXACT OVERLAP WITH "THE GRAND" LOGO!)
  const frames = [
    { name: 'thegrand_exact_f1.png', scrollY: h2AbsTop - 180, targetTop: 180 },
    { name: 'thegrand_exact_f2.png', scrollY: h2AbsTop - 105, targetTop: 105 },
    { name: 'thegrand_exact_f3.png', scrollY: h2AbsTop - 41.5, targetTop: 41.5 }
  ];

  for (const f of frames) {
    await page.evaluate((y) => window.scrollTo(0, y), f.scrollY);
    await page.waitForTimeout(100);
    const measured = await page.evaluate(() => {
      const h2 = document.querySelector('#bigtext-1 h2');
      const sec = document.getElementById('bigtext-1');
      const logo = document.querySelector('header a, header [data-framer-name="Logo"], header .framer-1ngqbpf');
      return {
        h2Top: h2.getBoundingClientRect().top,
        logoTop: logo ? logo.getBoundingClientRect().top : null,
        opacity: window.getComputedStyle(sec).opacity
      };
    });
    console.log(f.name, measured);
    await page.screenshot({ path: `C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/${f.name}` });
  }

  await browser.close();

  // Create close-up overlap comparison:
  // Left: User Casa Momo Frame 3 (where Location overlaps CASA MOMO very dim)
  // Right: The Grand Frame 3 (where Location overlaps THE GRAND very dim)
  const userF3 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_user_frame3.png';
  const tgF3 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/thegrand_exact_f3.png';

  const tgCrop = await sharp(tgF3)
    .extract({ left: 30, top: 25, width: 450, height: 160 })
    .toBuffer();

  const userCrop = await sharp(userF3)
    .resize(450, 160, { fit: 'cover' })
    .toBuffer();

  await sharp({
    create: {
      width: 900,
      height: 160,
      channels: 4,
      background: { r: 255, g: 240, b: 202, alpha: 1 }
    }
  }).composite([
    { input: userCrop, left: 0, top: 0 },
    { input: tgCrop, left: 450, top: 0 }
  ]).png().toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_dim_overlap_exact_match.png');

  console.log('Saved proof_dim_overlap_exact_match.png');

  // Full 3-stage comparison grid
  const userF1 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964181211_728d4783.jpg';
  const userF2 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964183324_30c56cec.jpg';
  const userF3_full = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964185681_ffebafd0.jpg';

  const tgF1 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/thegrand_exact_f1.png';
  const tgF2 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/thegrand_exact_f2.png';

  const colW = 640;
  const cropH = 340;

  const u1 = await sharp(userF1).resize(colW, null, { fit: 'cover' }).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();
  const u2 = await sharp(userF2).resize(colW, null, { fit: 'cover' }).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();
  const u3 = await sharp(userF3_full).resize(colW, null, { fit: 'cover' }).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();

  const t1 = await sharp(tgF1).resize(colW, null, { fit: 'cover' }).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();
  const t2 = await sharp(tgF2).resize(colW, null, { fit: 'cover' }).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();
  const t3 = await sharp(tgF3).resize(colW, null, { fit: 'cover' }).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();

  await sharp({
    create: {
      width: colW * 3,
      height: cropH * 2,
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
  ]).png().toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_dim_overlap_exact_3grid.png');

  console.log('Saved proof_dim_overlap_exact_3grid.png');
})();
