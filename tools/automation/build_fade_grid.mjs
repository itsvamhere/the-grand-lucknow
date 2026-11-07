import sharp from 'sharp';

async function buildGrid() {
  const userFrame1 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964181211_728d4783.jpg';
  const userFrame2 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964183324_30c56cec.jpg';
  const userFrame3 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964185681_ffebafd0.jpg';

  const tgFrame1 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/thegrand_frame1.png';
  const tgFrame2 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/thegrand_frame2.png';
  const tgFrame3 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/thegrand_frame3.png';

  const colW = 640;
  const cropH = 340;

  // Process user frames
  const u1 = await sharp(userFrame1).resize(colW, null, { fit: 'cover' }).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();
  const u2 = await sharp(userFrame2).resize(colW, null, { fit: 'cover' }).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();
  const u3 = await sharp(userFrame3).resize(colW, null, { fit: 'cover' }).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();

  // Process the grand frames
  const t1 = await sharp(tgFrame1).resize(colW, null, { fit: 'cover' }).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();
  const t2 = await sharp(tgFrame2).resize(colW, null, { fit: 'cover' }).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();
  const t3 = await sharp(tgFrame3).resize(colW, null, { fit: 'cover' }).extract({ left: 0, top: 0, width: colW, height: cropH }).toBuffer();

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

  console.log('Successfully generated proof_casamomo_vs_thegrand_fade_grid.png!');
}

buildGrid().catch(console.error);
