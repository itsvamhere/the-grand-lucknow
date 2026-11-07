import sharp from 'sharp';

async function inspectBase() {
  const baseImg = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_carto_base.png';
  
  // Crop 1200x800 around center
  await sharp(baseImg)
    .extract({ left: 1320, top: 800, width: 1200, height: 800 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_zoom_detail_center.png');

  console.log('Saved center crop proof to artifacts');
}

inspectBase().catch(console.error);
