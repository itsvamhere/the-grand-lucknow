import sharp from 'sharp';

async function inspectNewBase() {
  const imgPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_carto_base.png';
  const meta = await sharp(imgPath).metadata();
  console.log('Metadata:', meta.width, 'x', meta.height, meta.format);

  // Crop 1200x800 center
  await sharp(imgPath)
    .extract({ left: 1320, top: 800, width: 1200, height: 800 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_new_carto_center.png');

  // Sample colors
  const { data } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_new_carto_center.png').raw().toBuffer({ resolveWithObject: true });
  const colorMap = new Map();
  for (let i = 0; i < data.length; i += 3 * 10) {
    const r = data[i], g = data[i+1], b = data[i+2];
    const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
    colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
  }
  const sorted = [...colorMap.entries()].sort((a, b) => b[1] - a[1]);
  console.log('Top colors in new base crop:');
  sorted.slice(0, 8).forEach(([hex, count]) => {
    console.log(hex, count);
  });
}

inspectNewBase().catch(console.error);
