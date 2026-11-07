import sharp from 'sharp';

async function extractRoadMask() {
  const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793960448682_f7d1928c.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const mask = Buffer.alloc(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // 1. Highway (bluish grey)
      const isHighway = (r >= 195 && r <= 225 && g >= 210 && g <= 238 && b >= 220 && b <= 248);
      // 2. White village roads
      const isWhiteRoad = (r >= 242 && g >= 238 && b >= 235 && Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && (r + g + b) > 715);
      // 3. Road casing / grey field lines
      const isRoadCasing = (r >= 215 && r <= 235 && g >= 215 && g <= 235 && b >= 205 && b <= 225 && Math.abs(r - g) < 8);

      if (isHighway || isWhiteRoad || isRoadCasing) {
        mask[y * width + x] = 255;
      }
    }
  }

  await sharp(mask, { raw: { width, height, channels: 1 } })
    .png()
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/extracted_road_mask.png');

  console.log('Saved extracted_road_mask.png');
}

extractRoadMask();
