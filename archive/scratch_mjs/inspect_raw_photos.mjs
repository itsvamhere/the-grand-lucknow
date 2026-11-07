import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rawDir = path.join(process.cwd(), 'raw_photos');
const files = fs.readdirSync(rawDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

async function inspect() {
  const infoList = [];
  for (const f of files) {
    const fullPath = path.join(rawDir, f);
    const meta = await sharp(fullPath).metadata();
    
    // Read raw pixel data to detect white border
    const { data, info } = await sharp(fullPath).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    function isWhite(r, g, b) {
      return r > 240 && g > 240 && b > 240;
    }

    let topWhite = 0;
    for (let y = 0; y < Math.min(height, 300); y++) {
      let rowAllWhite = true;
      for (let x = 0; x < width; x += 10) {
        const idx = (y * width + x) * channels;
        if (!isWhite(data[idx], data[idx+1], data[idx+2])) {
          rowAllWhite = false;
          break;
        }
      }
      if (rowAllWhite) topWhite++;
      else break;
    }

    let bottomWhite = 0;
    for (let y = height - 1; y >= Math.max(0, height - 300); y--) {
      let rowAllWhite = true;
      for (let x = 0; x < width; x += 10) {
        const idx = (y * width + x) * channels;
        if (!isWhite(data[idx], data[idx+1], data[idx+2])) {
          rowAllWhite = false;
          break;
        }
      }
      if (rowAllWhite) bottomWhite++;
      else break;
    }

    let leftWhite = 0;
    for (let x = 0; x < Math.min(width, 300); x++) {
      let colAllWhite = true;
      for (let y = 0; y < height; y += 10) {
        const idx = (y * width + x) * channels;
        if (!isWhite(data[idx], data[idx+1], data[idx+2])) {
          colAllWhite = false;
          break;
        }
      }
      if (colAllWhite) leftWhite++;
      else break;
    }

    let rightWhite = 0;
    for (let x = width - 1; x >= Math.max(0, width - 300); x--) {
      let colAllWhite = true;
      for (let y = 0; y < height; y += 10) {
        const idx = (y * width + x) * channels;
        if (!isWhite(data[idx], data[idx+1], data[idx+2])) {
          colAllWhite = false;
          break;
        }
      }
      if (colAllWhite) rightWhite++;
      else break;
    }

    infoList.push({
      file: f,
      width,
      height,
      aspectRatio: (width / height).toFixed(3),
      whiteBorders: { top: topWhite, bottom: bottomWhite, left: leftWhite, right: rightWhite }
    });
  }

  console.log(JSON.stringify(infoList, null, 2));
}

inspect().catch(console.error);
