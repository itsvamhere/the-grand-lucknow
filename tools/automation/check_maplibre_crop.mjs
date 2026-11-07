import sharp from 'sharp';

async function checkMaplibreRender() {
  const meta = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_maplibre_lucknow_render.png').metadata();
  console.log('MapLibre render metadata:', meta.width, 'x', meta.height);

  // Crop a patch around the center [960, 540]
  await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_maplibre_lucknow_render.png')
    .extract({ left: 560, top: 240, width: 800, height: 600 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_maplibre_center_crop.png');
  console.log('Saved proof_maplibre_center_crop.png');
}

checkMaplibreRender().catch(console.error);
