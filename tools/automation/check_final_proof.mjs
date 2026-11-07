import sharp from 'sharp';

async function checkFinalProof() {
  const meta = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_venue_map_element.png').metadata();
  console.log('Proof element dimensions:', meta.width, 'x', meta.height);

  // Check top colors
  const { data } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_venue_map_element.png').raw().toBuffer({ resolveWithObject: true });
  const colorMap = new Map();
  for (let i = 0; i < data.length; i += 3 * 20) {
    const r = data[i], g = data[i+1], b = data[i+2];
    const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
    colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
  }
  const sorted = [...colorMap.entries()].sort((a, b) => b[1] - a[1]);
  console.log('Top colors in rendered proof:');
  sorted.slice(0, 10).forEach(([hex, count]) => {
    console.log(hex, count);
  });
}

checkFinalProof().catch(console.error);
