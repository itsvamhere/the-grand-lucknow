import sharp from 'sharp';

async function measureOpacity() {
  const p3 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964185681_ffebafd0.jpg';
  
  // Crop the region around 'Location' heading in frame 3
  // In 1024x576 image, CASA MOMO is around x: 40-200, y: 80-150
  const meta = await sharp(p3).metadata();
  console.log('Frame 3 size:', meta.width, meta.height);

  const region = await sharp(p3)
    .extract({ left: 30, top: 70, width: 300, height: 100 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = region;
  // Let's sample pixels
  // Background color around (x: 280, y: 10) in this crop
  let minR = 255, minG = 255, minB = 255;
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i], g = data[i+1], b = data[i+2];
    if (r < minR) { minR = r; minG = g; minB = b; }
  }

  console.log('Darkest pixel in region (CASA MOMO / black):', minR, minG, minB);

  // Now find the color of the 'Location' letters outside CASA MOMO (e.g. x: 180 to 260)
  const locCrop = await sharp(p3)
    .extract({ left: 160, top: 100, width: 90, height: 50 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  let lMinR = 255, lMinG = 255, lMinB = 255;
  for (let i = 0; i < locCrop.data.length; i += locCrop.info.channels) {
    const r = locCrop.data[i], g = locCrop.data[i+1], b = locCrop.data[i+2];
    if (r < lMinR) { lMinR = r; lMinG = g; lMinB = b; }
  }
  console.log('Darkest pixel in "tion" of Location:', lMinR, lMinG, lMinB);

  // Background is around (255, 240, 202)
  // Text color is (14, 18, 1)
  // If text has opacity O:
  // Pixel = (1 - O) * 255 + O * 14 = 255 - 241 * O
  // So O = (255 - Pixel) / 241
  const estimatedOpacity = (255 - lMinR) / (255 - 14);
  console.log('Estimated visual opacity of Location in Frame 3:', estimatedOpacity);
}

measureOpacity().catch(console.error);
