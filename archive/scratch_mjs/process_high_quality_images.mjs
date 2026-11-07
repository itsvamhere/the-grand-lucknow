import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rawDir = path.join(process.cwd(), 'raw_photos');
const imagesDir = path.join(process.cwd(), 'images');

// Mapping of web image destination -> source photo in raw_photos + crop target dimensions
const imagePlans = [
  {
    dest: 'hero_bg.webp',
    src: 'venue-ClaDiqWh.jpeg',
    width: 1920,
    height: 1080,
    position: sharp.position.center
  },
  {
    dest: 'card_1_open_earth.webp',
    src: 'openEarthLawn-T84778UT.png',
    width: 1500,
    height: 1500,
    position: sharp.position.center
  },
  {
    dest: 'card_2_grassland_gala.webp',
    src: 'grasslandGala-CfKbaOcr.jpg',
    width: 1500,
    height: 1050,
    position: sharp.position.center
  },
  {
    dest: 'card_3_ballroom.webp',
    src: 'BanquetHall-DW5fa5BN.jpeg',
    width: 1500,
    height: 1050,
    position: sharp.position.center
  },
  {
    dest: 'card_4_courtyard.webp',
    src: 'courtyard1-CZYhzkmY.jpeg',
    width: 1500,
    height: 1500,
    position: sharp.position.center
  },
  {
    dest: 'card_5_garden_pavilion.webp',
    src: 'gardengalaxy1-WiWr7-QZ.jpeg',
    width: 1500,
    height: 1500,
    position: sharp.position.center
  },
  {
    dest: 'card_6_mandap_lawn.webp',
    src: 'eleganteventspace-CzAQOqQ1.jpg',
    width: 1500,
    height: 1050,
    position: sharp.position.center
  },
  {
    dest: 'card_7_dining_expanse.webp',
    src: 'frame-04.jpg',
    width: 1500,
    height: 1050,
    position: sharp.position.center
  },
  {
    dest: 'card_8_courtyard_day.webp',
    src: 'IMG_8900-JV6nzzM7.jpeg',
    width: 1500,
    height: 1500,
    position: sharp.position.center
  },
  {
    dest: 'card_9_vip_suite.webp',
    src: 'IMG_8758-DTraJLvx.jpg',
    width: 1500,
    height: 1500,
    position: sharp.position.center
  },
  {
    dest: 'craft_feature_1.webp',
    src: 'spaciousOutdoorLawns-DxoBeCfD.jpg',
    width: 1200,
    height: 1600,
    position: sharp.position.center
  },
  {
    dest: 'craft_feature_2.webp',
    src: 'IMG_7705-taP6SS-1.jpg',
    width: 1200,
    height: 900,
    position: sharp.position.center
  },
  {
    dest: 'host_portrait.webp',
    src: 'IMG_7699-CDjE9rIn.jpg',
    width: 1200,
    height: 1500,
    position: sharp.position.center
  },
  {
    dest: 'thumb_1.webp',
    src: 'frame-01.jpg',
    width: 900,
    height: 600,
    position: sharp.position.center
  },
  {
    dest: 'thumb_2.webp',
    src: 'BanquetHall-DW5fa5BN.jpeg',
    width: 900,
    height: 600,
    position: sharp.position.center
  },
  {
    dest: 'thumb_3.webp',
    src: 'grasslandGala-CfKbaOcr.jpg',
    width: 900,
    height: 600,
    position: sharp.position.center
  },
  {
    dest: 'thumb_4.webp',
    src: 'courtyard1-CZYhzkmY.jpeg',
    width: 900,
    height: 600,
    position: sharp.position.center
  },
  {
    dest: 'thumb_5.webp',
    src: 'IMG_8759-BtbqGV07.jpg',
    width: 900,
    height: 600,
    position: sharp.position.center
  },
  {
    dest: 'thumb_6.webp',
    src: 'openEarthLawn-T84778UT.png',
    width: 900,
    height: 600,
    position: sharp.position.center
  },
  {
    dest: 'prefooter_1.webp',
    src: 'IMG_9002-BJweJ-4g.jpg',
    width: 1920,
    height: 1080,
    position: sharp.position.center
  },
  {
    dest: 'prefooter_2.webp',
    src: 'frame-09.jpg',
    width: 1200,
    height: 800,
    position: sharp.position.center
  }
];

async function processImages() {
  console.log(`Processing ${imagePlans.length} high-quality images with sharp trim & crop...`);

  for (const item of imagePlans) {
    const srcPath = path.join(rawDir, item.src);
    const destPath = path.join(imagesDir, item.dest);

    if (!fs.existsSync(srcPath)) {
      console.warn(`Source missing: ${item.src}`);
      continue;
    }

    // Step 1: Read source with sharp, apply trim with background threshold
    // First try trimming any white border with threshold
    let pipeline = sharp(srcPath);

    // Trim outer white/near-white border if present
    pipeline = pipeline.trim({
      background: '#ffffff',
      threshold: 25
    });

    // Step 2: Resize with cover and center position (strictly NO letterbox, NO white borders)
    pipeline = pipeline.resize({
      width: item.width,
      height: item.height,
      fit: 'cover',
      position: item.position
    });

    // Step 3: WebP export at high quality
    await pipeline
      .webp({ quality: 90, effort: 6 })
      .toFile(destPath);

    const stats = fs.statSync(destPath);
    console.log(`✓ ${item.dest} (${item.width}x${item.height}) from ${item.src} [${Math.round(stats.size / 1024)} KB]`);
  }

  console.log('All images successfully processed and deployed to /images/');
}

processImages().catch(console.error);
