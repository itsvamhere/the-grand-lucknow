import sharp from 'sharp';

async function inspectHeaderCrop() {
  const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_new_header.png')
    .raw().toBuffer({ resolveWithObject: true });

  const colors = {};
  for (let i = 0; i < data.length; i += 3) {
    const hex = '#' + [data[i], data[i+1], data[i+2]].map(c => c.toString(16).padStart(2, '0')).join('');
    colors[hex] = (colors[hex] || 0) + 1;
  }

  // Sort colors by frequency
  const sorted = Object.entries(colors).sort((a, b) => b[1] - a[1]);
  console.log('Top 10 colors in header crop:', sorted.slice(0, 10));
}

inspectHeaderCrop();
