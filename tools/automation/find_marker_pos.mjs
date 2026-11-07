import sharp from 'sharp';

async function findMarker() {
  const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_thegrand_matched_color.png')
    .raw().toBuffer({ resolveWithObject: true });

  let terracotta = [];
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 3;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r >= 160 && r <= 205 && g >= 90 && g <= 135 && b >= 50 && b <= 85) {
        terracotta.push({ x, y });
      }
    }
  }

  console.log('Terracotta pixels count:', terracotta.length);
  if (terracotta.length > 0) {
    const minX = Math.min(...terracotta.map(p => p.x));
    const maxX = Math.max(...terracotta.map(p => p.x));
    const minY = Math.min(...terracotta.map(p => p.y));
    const maxY = Math.max(...terracotta.map(p => p.y));
    console.log(`Terracotta marker bounds in viewport: x=[${minX}, ${maxX}], y=[${minY}, ${maxY}]`);
  }
}

findMarker();
