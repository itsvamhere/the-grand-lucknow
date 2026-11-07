import sharp from 'sharp';

async function cropHero() {
  const meta = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793859280171_e667e7a9.png').metadata();
  console.log('Image dimensions:', meta.width, meta.height);

  // Crop the hero text area
  await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793859280171_e667e7a9.png')
    .extract({ left: 100, top: 150, width: 800, height: 400 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/cropped_hero_reference.png');

  // Also crop the navbar area
  await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793859280171_e667e7a9.png')
    .extract({ left: 0, top: 50, width: meta.width, height: 120 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/cropped_navbar_reference.png');

  console.log('Cropped successfully!');
}

cropHero().catch(console.error);
