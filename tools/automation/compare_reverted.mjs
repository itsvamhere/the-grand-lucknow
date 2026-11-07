import sharp from 'sharp';

async function compareReverted() {
  const userShot = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793962672297_fc726559.jpg';
  const newShot = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_reverted_viewport.png';

  const userBuf = await sharp(userShot).resize(1024, 576, { fit: 'fill' }).png().toBuffer();
  const newBuf = await sharp(newShot).resize(1024, 576, { fit: 'fill' }).png().toBuffer();

  await sharp({
    create: {
      width: 2048,
      height: 576,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    { input: userBuf, left: 0, top: 0 },
    { input: newBuf, left: 1024, top: 0 }
  ])
  .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_user_shot_vs_reverted.png');

  console.log('Saved proof_user_shot_vs_reverted.png');
}

compareReverted();
