import sharp from 'sharp';

async function buildFinalComparison() {
  const cmPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793962642651_6bb7a7fd.jpg';
  const tgPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_thegrand_matched_map.png';

  const cmBuf = await sharp(cmPath).resize(1024, 576, { fit: 'fill' }).png().toBuffer();
  const tgBuf = await sharp(tgPath).resize(1024, 576, { fit: 'fill' }).png().toBuffer();

  await sharp({
    create: {
      width: 2048,
      height: 576,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    { input: cmBuf, left: 0, top: 0 },
    { input: tgBuf, left: 1024, top: 0 }
  ])
  .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_casamomo_vs_thegrand_final.png');

  console.log('Saved proof_casamomo_vs_thegrand_final.png');
}

buildFinalComparison();
