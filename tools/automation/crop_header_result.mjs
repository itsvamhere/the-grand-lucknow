import sharp from 'sharp';

async function cropHeaderResult() {
  await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_thegrand_matched_color.png')
    .extract({ left: 30, top: 10, width: 420, height: 110 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_new_header.png');

  await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_thegrand_matched_color.png')
    .extract({ left: 200, top: 200, width: 600, height: 350 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_new_map.png');

  console.log('Saved crop_new_header.png and crop_new_map.png');
}

cropHeaderResult();
