import sharp from 'sharp';

async function checkFeatures() {
  const imgPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/casamomo_map_orig.png';
  const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
  
  // Count unique colors in sample
  const colorMap = new Map();
  for (let i = 0; i < data.length; i += 3 * 20) { // sample every 20th pixel
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
    colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
  }

  const sorted = [...colorMap.entries()].sort((a, b) => b[1] - a[1]);
  console.log('Top 15 colors in original map:');
  sorted.slice(0, 15).forEach(([hex, count]) => {
    console.log(hex, count, `(${(count / (data.length / (3 * 20)) * 100).toFixed(1)}%)`);
  });
}

checkFeatures().catch(console.error);
