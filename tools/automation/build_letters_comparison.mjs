import sharp from 'sharp';

async function buildComparison() {
  const pHome = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793971870615_9c35d546.png';
  const pBroken = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793971879629_6941dc59.png';
  const pFixed = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_subpage_fixed_columns.png';

  // Crop fixed to the columns section (top 350px)
  const metaFixed = await sharp(pFixed).metadata();
  console.log('Fixed screenshot meta:', metaFixed.width, 'x', metaFixed.height);

  const bFixed = await sharp(pFixed)
    .extract({ left: 0, top: 0, width: metaFixed.width, height: Math.min(380, metaFixed.height) })
    .resize(1000, null)
    .toBuffer();

  const bHome = await sharp(pHome)
    .resize(1000, null)
    .toBuffer();

  const bBroken = await sharp(pBroken)
    .resize(1000, null)
    .toBuffer();

  // Combine into a 3-stack vertical comparison
  const hHome = (await sharp(bHome).metadata()).height;
  const hBroken = (await sharp(bBroken).metadata()).height;
  const hFixed = (await sharp(bFixed).metadata()).height;

  await sharp({
    create: {
      width: 1040,
      height: hHome + hBroken + hFixed + 80,
      channels: 3,
      background: { r: 18, g: 18, b: 18 }
    }
  })
  .composite([
    { input: bHome, left: 20, top: 20 },
    { input: bBroken, left: 20, top: 20 + hHome + 20 },
    { input: bFixed, left: 20, top: 20 + hHome + 20 + hBroken + 20 }
  ])
  .png()
  .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_letters_fixed_comparison.png');

  console.log('Saved proof_letters_fixed_comparison.png!');
}

buildComparison().catch(console.error);
