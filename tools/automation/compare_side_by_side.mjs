import sharp from 'sharp';

async function alignAndCompare() {
  const gmaps = sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793960448682_f7d1928c.jpg');
  const gmeta = await gmaps.metadata();

  // Resize our current 3840x2400 map to 1024x541 (or 1024x640)
  // Let's see how our current map aligns with GMaps
  const curResized = await sharp('images/the_grand_lucknow_master_map.png')
    .resize(1024, 541, { fit: 'fill' })
    .png()
    .toBuffer();

  // Create a 50/50 blend / difference overlay
  await sharp(curResized)
    .composite([{
      input: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793960448682_f7d1928c.jpg',
      blend: 'difference'
    }])
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/map_diff_overlay.png');

  // Also create a side-by-side comparison
  const sideBySide = await sharp({
    create: {
      width: 1024 * 2,
      height: 541,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    { input: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793960448682_f7d1928c.jpg', left: 0, top: 0 },
    { input: curResized, left: 1024, top: 0 }
  ])
  .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/map_side_by_side_comparison.png');

  console.log('Saved map_diff_overlay.png and map_side_by_side_comparison.png');
}

alignAndCompare().catch(console.error);
