import path from 'path';
import sharp from 'sharp';

const rawDir = path.join(process.cwd(), 'raw_photos');
const imagesDir = path.join(process.cwd(), 'images');

async function updateDining() {
  const srcPath = path.join(rawDir, 'IMG_7705-taP6SS-1.jpg');
  const destPath = path.join(imagesDir, 'card_7_dining_expanse.webp');

  await sharp(srcPath)
    .trim({ background: '#ffffff', threshold: 25 })
    .resize({
      width: 1500,
      height: 1050,
      fit: 'cover',
      position: sharp.position.center
    })
    .webp({ quality: 90, effort: 6 })
    .toFile(destPath);

  console.log('Updated card_7_dining_expanse.webp with high-res aerial dining hall & lawn view.');
}

updateDining().catch(console.error);
