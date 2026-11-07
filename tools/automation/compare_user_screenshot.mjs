import sharp from 'sharp';

async function compareWithUserScreenshot() {
  const userShot = sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793962672297_fc726559.jpg');
  const masterMap = sharp('images/the_grand_lucknow_master_map_1920.png');

  // Crop the map area from user screenshot (x: 0, y: 110, width: 1024, height: 466)
  await userShot.extract({ left: 0, top: 110, width: 1024, height: 466 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/user_map_crop.png');

  console.log('Saved user_map_crop.png');
}

compareWithUserScreenshot();
