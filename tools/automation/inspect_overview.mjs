import sharp from 'sharp';

async function inspectOverview() {
  const baseImg = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_carto_base.png';
  
  // Resize whole base to 1920x1200 for inspection
  await sharp(baseImg)
    .resize(1920, 1200)
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_zoom_base_overview.png');

  console.log('Saved overview to artifacts');
}

inspectOverview().catch(console.error);
