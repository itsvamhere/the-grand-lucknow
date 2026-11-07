import sharp from 'sharp';

async function cropAlignmentProof() {
  const img = sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_road_alignment_overlay.png');

  // 1. Bindaua loop
  await img.clone().extract({ left: 380, top: 40, width: 220, height: 200 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/align_crop_bindaua.png');

  // 2. Ahmadpur Khalsa
  await img.clone().extract({ left: 650, top: 0, width: 250, height: 250 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/align_crop_ahmadpur.png');

  // 3. Gaura
  await img.clone().extract({ left: 0, top: 50, width: 250, height: 250 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/align_crop_gaura.png');

  // 4. Sardar Patel Institute
  await img.clone().extract({ left: 350, top: 400, width: 220, height: 140 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/align_crop_sardar.png');

  console.log('Saved alignment crops');
}

cropAlignmentProof();
