import sharp from 'sharp';

async function analyzeFeatures() {
  const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/ref_center_schlossberg.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log('Patch dimensions:', info.width, 'x', info.height);

  // Measure street line widths in pixels:
  // Scan a horizontal line across a street (where color changes from background to road to background)
  const transitions = [];
  const y = 400; // middle of patch
  let inRoad = false;
  let startX = 0;
  for (let x = 0; x < info.width; x++) {
    const idx = (y * info.width + x) * info.channels;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    const isRoad = (r > 250 && g > 245 && b > 230); // off-white
    if (isRoad && !inRoad) {
      inRoad = true;
      startX = x;
    } else if (!isRoad && inRoad) {
      inRoad = false;
      transitions.push({ x: startX, width: x - startX });
    }
  }

  console.log(`Found ${transitions.length} road crossings along horizontal line y=400:`);
  console.log('Road widths in pixels (at 3840x2400):', transitions.map(t => t.width));
}

analyzeFeatures().catch(console.error);
