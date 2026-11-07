import sharp from 'sharp';

async function findRedPin() {
  const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793960448682_f7d1928c.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  let redPixels = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Red pin in Google Maps is saturated red (r > 180, g < 70, b < 70)
      if (r > 180 && g < 70 && b < 70) {
        redPixels.push({ x, y });
      }
    }
  }

  if (redPixels.length > 0) {
    const avgX = redPixels.reduce((sum, p) => sum + p.x, 0) / redPixels.length;
    const avgY = redPixels.reduce((sum, p) => sum + p.y, 0) / redPixels.length;
    console.log(`Red pin center in GMaps 1024x541: x=${avgX.toFixed(1)}, y=${avgY.toFixed(1)} (${(avgX / width * 100).toFixed(1)}%, ${(avgY / height * 100).toFixed(1)}%)`);
  } else {
    console.log('No red pin found');
  }
}

findRedPin();
