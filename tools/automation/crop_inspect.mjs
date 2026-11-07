import sharp from 'sharp';

async function cropInspection() {
  const p1 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964181211_728d4783.jpg';
  const p2 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964183324_30c56cec.jpg';
  const p3 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793964185681_ffebafd0.jpg';

  // Crop top-left 350x200 from each
  await sharp(p1).extract({ left: 30, top: 70, width: 320, height: 140 }).png().toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_user_frame1.png');
  await sharp(p2).extract({ left: 30, top: 70, width: 320, height: 140 }).png().toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_user_frame2.png');
  await sharp(p3).extract({ left: 30, top: 70, width: 320, height: 140 }).png().toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_user_frame3.png');
  console.log('Saved crops');
}

cropInspection().catch(console.error);
