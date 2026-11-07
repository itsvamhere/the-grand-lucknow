import sharp from 'sharp';

async function inspectProof() {
  const desk = sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_matched_map_desktop.png');
  const meta = await desk.metadata();
  console.log('Desktop proof dimensions:', meta.width, 'x', meta.height);

  // 1. Center crop showing The Grand pulsing pointer and Bindaua
  await desk.clone().extract({
    left: Math.round(meta.width * 0.35),
    top: Math.round(meta.height * 0.2),
    width: Math.round(meta.width * 0.3),
    height: Math.round(meta.height * 0.6)
  }).toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_center_crop.png');

  // 2. Full map side-by-side with original Google Maps reference
  const gmapsResized = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793960448682_f7d1928c.jpg')
    .resize(Math.round(meta.width / 2), meta.height, { fit: 'fill' })
    .png()
    .toBuffer();

  const deskHalf = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_matched_map_desktop.png')
    .resize(Math.round(meta.width / 2), meta.height, { fit: 'fill' })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: Math.round(meta.width / 2) * 2,
      height: meta.height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    { input: gmapsResized, left: 0, top: 0 },
    { input: deskHalf, left: Math.round(meta.width / 2), top: 0 }
  ])
  .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_gmaps_vs_live_rendered_desktop.png');

  console.log('Saved proof_live_center_crop.png and proof_gmaps_vs_live_rendered_desktop.png');
}

inspectProof().catch(console.error);
