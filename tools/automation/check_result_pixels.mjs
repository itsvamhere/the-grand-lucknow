import sharp from 'sharp';

async function checkResultPixels() {
  const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_thegrand_matched_color.png')
    .raw().toBuffer({ resolveWithObject: true });

  function hex(x, y) {
    const idx = (y * info.width + x) * 3;
    return '#' + [data[idx], data[idx+1], data[idx+2]].map(c => c.toString(16).padStart(2, '0')).join('');
  }

  console.log('Location text color (sample at 120, 50):', hex(120, 50));
  console.log('Open in Maps button bg (sample at 280, 50):', hex(280, 50));
  console.log('Map area background (sample at 300, 300):', hex(300, 300));
}

checkResultPixels();
