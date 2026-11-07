import sharp from 'sharp';

async function cropHeaders() {
  const cm = sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/page_casamomo.png');
  const tg = sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/page_thegrand.png');

  await cm.extract({ left: 20, top: 10, width: 350, height: 80 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/header_casamomo.png');

  await tg.extract({ left: 20, top: 10, width: 350, height: 80 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/header_thegrand.png');

  console.log('Saved header_casamomo.png and header_thegrand.png');
}

cropHeaders();
