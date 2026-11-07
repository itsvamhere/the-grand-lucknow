import sharp from 'sharp';

async function analyzeOrig() {
  const imgPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/casamomo_map_orig.png';
  const meta = await sharp(imgPath).metadata();
  console.log('Original metadata:', meta);

  // Let's crop a 600x400 patch around the center to see the details
  await sharp(imgPath)
    .extract({ left: 1600, top: 1000, width: 800, height: 600 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/casamomo_orig_crop.png');
  console.log('Saved casamomo_orig_crop.png');

  // Also crop the same area from our SVG generated map
  await sharp('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_vector_map@2x.png')
    .extract({ left: 1200, top: 600, width: 800, height: 600 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/our_map_crop.png');
  console.log('Saved our_map_crop.png');
}

analyzeOrig().catch(console.error);
