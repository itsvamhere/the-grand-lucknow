import sharp from 'sharp';

async function cropAndCombine() {
  const p1 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964181211_728d4783.jpg';
  const p2 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964183324_30c56cec.jpg';
  const p3 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964185681_ffebafd0.jpg';

  const m1 = await sharp(p1).metadata();
  console.log('Image dimensions:', m1.width, m1.height);

  // Crop top 250px from each image
  const cropH = 260;
  const b1 = await sharp(p1).extract({ left: 0, top: 0, width: m1.width, height: cropH }).toBuffer();
  const b2 = await sharp(p2).extract({ left: 0, top: 0, width: m1.width, height: cropH }).toBuffer();
  const b3 = await sharp(p3).extract({ left: 0, top: 0, width: m1.width, height: cropH }).toBuffer();

  // Combine horizontally
  const combined = await sharp({
    create: {
      width: m1.width * 3,
      height: cropH,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  }).composite([
    { input: b1, left: 0, top: 0 },
    { input: b2, left: m1.width, top: 0 },
    { input: b3, left: m1.width * 2, top: 0 }
  ]).png().toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_user_3frames_top.png');

  console.log('Combined user frames saved to proof_user_3frames_top.png');
}

cropAndCombine().catch(console.error);
