import sharp from 'sharp';

async function verifyMatchedMap() {
  const gmapsPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793960448682_f7d1928c.jpg';
  const newMapPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map_1920.png';

  // Resize our new map to 1024x541 to match GMaps exactly
  const newMap1024 = await sharp(newMapPath)
    .resize(1024, 541, { fit: 'fill' })
    .png()
    .toBuffer();

  // Side-by-side comparison: GMaps on left, Our Vector Map on right
  await sharp({
    create: {
      width: 1024 * 2,
      height: 541,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    { input: gmapsPath, left: 0, top: 0 },
    { input: newMap1024, left: 1024, top: 0 }
  ])
  .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_gmaps_vs_matched_vector.png');

  console.log('Saved proof_gmaps_vs_matched_vector.png');

  // Let's also crop the 3 most crucial regions:
  // 1. Center: The Grand and Bindaua village loop
  await sharp(newMapPath)
    .extract({ left: Math.round(1920 * 0.35), top: Math.round(1200 * 0.2), width: Math.round(1920 * 0.32), height: Math.round(1200 * 0.55) })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_crop_center_matched.png');

  // 2. Northeast: Ahmadpur Khalsa and Badan Khera Road
  await sharp(newMapPath)
    .extract({ left: Math.round(1920 * 0.6), top: 0, width: Math.round(1920 * 0.38), height: Math.round(1200 * 0.5) })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_crop_ne_matched.png');

  // 3. West: Gaura
  await sharp(newMapPath)
    .extract({ left: 0, top: Math.round(1200 * 0.1), width: Math.round(1920 * 0.35), height: Math.round(1200 * 0.55) })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_crop_gaura_matched.png');

  console.log('Saved detailed verification crops!');
}

verifyMatchedMap().catch(console.error);
