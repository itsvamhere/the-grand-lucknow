import sharp from 'sharp';

async function inspectCasaMomoDensity() {
  const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/page_casamomo.png')
    .raw().toBuffer({ resolveWithObject: true });

  // Map area is roughly y from 100 to 450
  let totalMapPixels = 0;
  let whiteRoadPixels = 0;
  let beigeBuildingPixels = 0;

  for (let y = 100; y < 450; y++) {
    for (let x = 0; x < info.width; x++) {
      totalMapPixels++;
      const idx = (y * info.width + x) * 3;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // White road: r > 245, g > 235, b > 215
      if (r > 245 && g > 235 && b > 215) whiteRoadPixels++;
      // Beige/tan building/terrain: r between 220..245, g between 210..235, b between 180..210
      if (r >= 220 && r <= 245 && g >= 200 && g <= 235 && b >= 170 && b <= 210) beigeBuildingPixels++;
    }
  }

  console.log('Casa Momo map area pixels:', totalMapPixels);
  console.log('Casa Momo white road pixels:', whiteRoadPixels, `(${(whiteRoadPixels / totalMapPixels * 100).toFixed(2)}%)`);
  console.log('Casa Momo beige building pixels:', beigeBuildingPixels, `(${(beigeBuildingPixels / totalMapPixels * 100).toFixed(2)}%)`);
}

inspectCasaMomoDensity();
