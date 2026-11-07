import sharp from 'sharp';
import fs from 'node:fs';

async function exportImages() {
  const svgPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_vector_map.svg';
  const svgBuf = fs.readFileSync(svgPath);

  console.log('Rendering 1x PNG (1600x900)...');
  await sharp(svgBuf)
    .resize(1600, 900)
    .png({ quality: 100 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_vector_map@1x.png');

  console.log('Rendering 2x High-Res PNG (3200x1800)...');
  await sharp(svgBuf)
    .resize(3200, 1800)
    .png({ quality: 100 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_vector_map@2x.png');

  console.log('Rendering WebP format for fast web delivery...');
  await sharp(svgBuf)
    .resize(1920, 1080)
    .webp({ quality: 95 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_vector_map.webp');

  console.log('Done exporting raster assets!');
}

exportImages().catch(console.error);
