import sharp from 'sharp';

async function cropDebug() {
  await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_debug_overlap.png')
    .extract({ left: 0, top: 0, width: 450, height: 120 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_debug_top.png');

  console.log('Saved crop_debug_top.png');
}

cropDebug();
