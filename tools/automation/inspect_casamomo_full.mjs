import sharp from 'sharp';

async function inspectDetails() {
  const meta = await sharp('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/casamomo_map_orig.png').metadata();
  console.log('Original map format:', meta);

  // Let's crop a few 1200x800 sections:
  // 1. Center around Schlossberg
  await sharp('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/casamomo_map_orig.png')
    .extract({ left: 1400, top: 800, width: 1200, height: 800 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/ref_center_schlossberg.png');

  // 2. City streets and river
  await sharp('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/casamomo_map_orig.png')
    .extract({ left: 800, top: 1000, width: 1200, height: 800 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/ref_river_streets.png');

  console.log('Saved ref_center_schlossberg.png and ref_river_streets.png to artifacts');
}

inspectDetails().catch(console.error);
