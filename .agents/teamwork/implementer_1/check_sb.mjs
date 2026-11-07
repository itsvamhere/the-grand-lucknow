import sharp from 'sharp';

async function checkScrollbar() {
  const meta = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793859280171_e667e7a9.png').metadata();
  
  // Crop right 30px to see scrollbar
  await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793859280171_e667e7a9.png')
    .extract({ left: meta.width - 25, top: 0, width: 25, height: meta.height })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/cropped_scrollbar.png');

  console.log('Scrollbar cropped');
}

checkScrollbar().catch(console.error);
