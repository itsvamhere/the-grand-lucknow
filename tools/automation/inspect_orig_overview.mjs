import sharp from 'sharp';

async function inspectOrig() {
  const meta = await sharp('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/casamomo_map_orig.png').metadata();
  console.log('Original map dimensions:', meta.width, 'x', meta.height);

  // Let's create an overview thumbnail of casamomo_map_orig.png (960x600)
  await sharp('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/casamomo_map_orig.png')
    .resize(960, 600)
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/casamomo_orig_overview.png');
  console.log('Saved casamomo_orig_overview.png');
}

inspectOrig().catch(console.error);
