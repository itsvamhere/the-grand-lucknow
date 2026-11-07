import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rawDir = path.join(process.cwd(), 'raw_photos');
const files = fs.readdirSync(rawDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

async function checkBorders() {
  for (const f of files) {
    const fullPath = path.join(rawDir, f);
    const { data, info } = await sharp(fullPath).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    // Check corners and 10px from edge
    const topLeft = [data[0], data[1], data[2]];
    const topRight = [data[(width - 1) * channels], data[(width - 1) * channels + 1], data[(width - 1) * channels + 2]];
    const bottomLeft = [data[((height - 1) * width) * channels], data[((height - 1) * width) * channels + 1], data[((height - 1) * width) * channels + 2]];
    const bottomRight = [data[((height - 1) * width + width - 1) * channels], data[((height - 1) * width + width - 1) * channels + 1], data[((height - 1) * width + width - 1) * channels + 2]];

    // Check if sharp.trim() detects anything!
    // sharp().trim() trims pixels matching the outer background color
    try {
      const trimmed = await sharp(fullPath).trim().toBuffer({ resolveWithObject: true });
      if (trimmed.info.width !== width || trimmed.info.height !== height) {
        console.log(`[TRIM DETECTED] ${f}: ${width}x${height} -> ${trimmed.info.width}x${trimmed.info.height} (delta: ${width - trimmed.info.width}x${height - trimmed.info.height})`);
      } else {
        // Try trimming with background threshold
        const trimmedWhite = await sharp(fullPath).trim({
          background: '#ffffff',
          threshold: 20
        }).toBuffer({ resolveWithObject: true });
        if (trimmedWhite.info.width !== width || trimmedWhite.info.height !== height) {
          console.log(`[WHITE TRIM DETECTED (thresh 20)] ${f}: ${width}x${height} -> ${trimmedWhite.info.width}x${trimmedWhite.info.height} (delta: ${width - trimmedWhite.info.width}x${height - trimmedWhite.info.height})`);
        }
      }
    } catch (e) {
      console.log(`Error checking trim on ${f}:`, e.message);
    }
  }
}

checkBorders().catch(console.error);
