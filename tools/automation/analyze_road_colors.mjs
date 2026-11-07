import sharp from 'sharp';

async function analyzeRoadColors() {
  const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793960448682_f7d1928c.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // Let's sample colors at known road locations:
  // 1. Padera-Raebareli Rd at (425, 200)
  // 2. Village road in Bindaua at (480, 140)
  // 3. Road to Ahmadpur Khalsa at (600, 125)
  // 4. Background terrain at (200, 200)
  // 5. Green field at (150, 100)
  // 6. Railway at (470, 200)

  function getPixel(x, y) {
    const idx = (y * width + x) * 3;
    return [data[idx], data[idx + 1], data[idx + 2]];
  }

  console.log('Padera-Raebareli Rd (425, 200):', getPixel(425, 200));
  console.log('Bindaua road (480, 140):', getPixel(480, 140));
  console.log('Ahmadpur road (600, 125):', getPixel(600, 125));
  console.log('Background terrain (200, 200):', getPixel(200, 200));
  console.log('Green field (150, 100):', getPixel(150, 100));
  console.log('Railway (470, 200):', getPixel(470, 200));
}

analyzeRoadColors();
