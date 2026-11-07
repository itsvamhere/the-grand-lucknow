import fs from 'fs';

// Check the resolutions and aspect ratios of images in images/
import sharp from 'sharp';

async function checkImages() {
  const files = ['card_1_open_earth.webp', 'card_2_grassland_gala.webp', 'card_3_ballroom.webp', 'hero_bg.webp', 'prefooter_1.webp', 'prefooter_2.webp', 'thumb_1.webp'];
  for (const f of files) {
    if (fs.existsSync('images/' + f)) {
      const meta = await sharp('images/' + f).metadata();
      console.log(`${f}: ${meta.width}x${meta.height}, format: ${meta.format}, size: ${(fs.statSync('images/' + f).size / 1024).toFixed(1)} KB`);
    }
  }
}

checkImages();
