const sharp = require('sharp');

async function main() {
  const p1 = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3/.user_uploaded/media_1793773981497_e110ffad.png';
  const p2 = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3/.user_uploaded/media_1793774001552_952b7ed4.png';
  const outDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

  // Crop p1 logo (left 300px)
  await sharp(p1).extract({ left: 0, top: 0, width: 350, height: 91 }).toFile(`${outDir}/crop_p1_logo.png`);
  // Crop p1 nav (right 450px)
  await sharp(p1).extract({ left: 1024 - 450, top: 0, width: 450, height: 91 }).toFile(`${outDir}/crop_p1_nav.png`);

  // Crop p2 logo (left 350px)
  await sharp(p2).extract({ left: 0, top: 0, width: 350, height: 92 }).toFile(`${outDir}/crop_p2_logo.png`);
  // Crop p2 nav (right 450px)
  await sharp(p2).extract({ left: 1024 - 450, top: 0, width: 450, height: 92 }).toFile(`${outDir}/crop_p2_nav.png`);

  console.log('Cropped successfully');
}

main().catch(console.error);
