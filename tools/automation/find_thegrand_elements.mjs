import sharp from 'sharp';

async function findElementsInTheGrand() {
  const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/page_thegrand.png')
    .raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  let blackPixels = [];
  let terracottaPixels = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Black button (r < 30, g < 30, b < 30)
      if (r < 30 && g < 30 && b < 30) {
        blackPixels.push({ x, y });
      }

      // Terracotta
      if (r >= 160 && r <= 210 && g >= 85 && g <= 135 && b >= 50 && b <= 95) {
        terracottaPixels.push({ x, y, r, g, b });
      }
    }
  }

  console.log('TG Black pixels count:', blackPixels.length);
  if (blackPixels.length > 0) {
    const minX = Math.min(...blackPixels.map(p => p.x));
    const maxX = Math.max(...blackPixels.map(p => p.x));
    const minY = Math.min(...blackPixels.map(p => p.y));
    const maxY = Math.max(...blackPixels.map(p => p.y));
    console.log(`TG Black buttons bounds: x=[${minX}, ${maxX}] y=[${minY}, ${maxY}]`);
  }

  console.log('TG Terracotta pixels count:', terracottaPixels.length);
  if (terracottaPixels.length > 0) {
    const minX = Math.min(...terracottaPixels.map(p => p.x));
    const maxX = Math.max(...terracottaPixels.map(p => p.x));
    const minY = Math.min(...terracottaPixels.map(p => p.y));
    const maxY = Math.max(...terracottaPixels.map(p => p.y));
    console.log(`TG Terracotta bounds: x=[${minX}, ${maxX}] y=[${minY}, ${maxY}]`);
    console.log('Sample TG terracotta color:', terracottaPixels[0]);
  }
}

findElementsInTheGrand();
