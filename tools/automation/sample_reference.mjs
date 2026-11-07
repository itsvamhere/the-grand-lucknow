import sharp from 'sharp';

async function sample() {
  const imgPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793945877683_6754ae3a.jpg';
  const meta = await sharp(imgPath).metadata();
  console.log('Image dimensions:', meta.width, 'x', meta.height);

  const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });

  function getPixel(x, y) {
    const idx = (y * info.width + x) * info.channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
    return { r, g, b, hex };
  }

  // Let's sample key areas:
  // 1. Top left background:
  console.log('Background top-left (100, 200):', getPixel(100, 200));
  console.log('Background top (500, 150):', getPixel(500, 150));
  
  // 2. Around the Boutique N°1 marker:
  // In the image (approx 1024x576 or 1280x720), let's find the terracotta color
  let terracottaPixels = [];
  for (let y = 300; y < 450; y += 5) {
    for (let x = 300; x < 500; x += 5) {
      const p = getPixel(x, y);
      // Terracotta is reddish-brown: r > 160, g around 90-130, b around 60-90
      if (p.r > 160 && p.g > 90 && p.g < 135 && p.b > 50 && p.b < 95) {
        terracottaPixels.push({ x, y, ...p });
      }
    }
  }
  console.log('Found terracotta pixels sample:', terracottaPixels.slice(0, 5));

  // 3. Building / urban block color
  // Around Schlossberg (x: 600-750, y: 350-450)
  console.log('Schlossberg terrain (650, 390):', getPixel(650, 390));
  console.log('Schlossberg terrain (630, 380):', getPixel(630, 380));

  // 4. Road color (sample thin white lines)
  let whiteRoadPixels = [];
  for (let y = 200; y < 400; y += 4) {
    for (let x = 400; x < 600; x += 4) {
      const p = getPixel(x, y);
      if (p.r > 248 && p.g > 245 && p.b > 230) {
        whiteRoadPixels.push({ x, y, ...p });
      }
    }
  }
  console.log('White road pixels sample:', whiteRoadPixels.slice(0, 5));
}

sample().catch(console.error);
