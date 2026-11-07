import sharp from 'sharp';

async function sampleRender() {
  const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_maplibre_center_crop.png').raw().toBuffer({ resolveWithObject: true });
  
  const colorMap = new Map();
  for (let i = 0; i < data.length; i += 3 * 10) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
    colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
  }

  const sorted = [...colorMap.entries()].sort((a, b) => b[1] - a[1]);
  console.log('Top 10 colors in MapLibre center crop:');
  sorted.slice(0, 10).forEach(([hex, count]) => {
    console.log(hex, count, `(${(count / (data.length / (3 * 10)) * 100).toFixed(1)}%)`);
  });
}

sampleRender().catch(console.error);
