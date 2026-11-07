import sharp from 'sharp';

async function findStub() {
  const imgPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map_1920.png';
  
  // Crop several areas on the left and center to match Image 2
  await sharp(imgPath)
    .extract({ left: 300, top: 400, width: 600, height: 400 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_check_left.png');

  await sharp(imgPath)
    .extract({ left: 800, top: 800, width: 600, height: 400 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_check_center.png');

  await sharp(imgPath)
    .extract({ left: 400, top: 800, width: 600, height: 400 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_check_gaura.png');

  console.log('Saved crops for inspection');
}

findStub().catch(console.error);
