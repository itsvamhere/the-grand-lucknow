import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rawDir = path.join(process.cwd(), 'raw_photos');
const files = fs.readdirSync(rawDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

async function analyzeAll() {
  for (const file of files) {
    const filePath = path.join(rawDir, file);
    const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    // Check row by row from top
    let topWhiteRows = 0;
    for (let y = 0; y < height; y++) {
      let whiteCount = 0;
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r > 235 && g > 235 && b > 235) whiteCount++;
      }
      if (whiteCount / width > 0.95) {
        topWhiteRows++;
      } else {
        break;
      }
    }

    // Check row by row from bottom
    let bottomWhiteRows = 0;
    for (let y = height - 1; y >= 0; y--) {
      let whiteCount = 0;
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r > 235 && g > 235 && b > 235) whiteCount++;
      }
      if (whiteCount / width > 0.95) {
        bottomWhiteRows++;
      } else {
        break;
      }
    }

    // Check col by col from left
    let leftWhiteCols = 0;
    for (let x = 0; x < width; x++) {
      let whiteCount = 0;
      for (let y = 0; y < height; y++) {
        const idx = (y * width + x) * channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r > 235 && g > 235 && b > 235) whiteCount++;
      }
      if (whiteCount / height > 0.95) {
        leftWhiteCols++;
      } else {
        break;
      }
    }

    // Check col by col from right
    let rightWhiteCols = 0;
    for (let x = width - 1; x >= 0; x--) {
      let whiteCount = 0;
      for (let y = 0; y < height; y++) {
        const idx = (y * width + x) * channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r > 235 && g > 235 && b > 235) whiteCount++;
      }
      if (whiteCount / height > 0.95) {
        rightWhiteCols++;
      } else {
        break;
      }
    }

    if (topWhiteRows > 0 || bottomWhiteRows > 0 || leftWhiteCols > 0 || rightWhiteCols > 0) {
      console.log(`[WHITE BORDER] ${file}: top=${topWhiteRows}, bottom=${bottomWhiteRows}, left=${leftWhiteCols}, right=${rightWhiteCols}`);
    } else {
      console.log(`[CLEAN] ${file} (${width}x${height})`);
    }
  }
}

analyzeAll().catch(console.error);
