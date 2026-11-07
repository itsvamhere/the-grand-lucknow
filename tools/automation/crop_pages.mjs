import sharp from 'sharp';

async function cropPage() {
  const cm = sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793962642651_6bb7a7fd.jpg');
  const tg = sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793962672297_fc726559.jpg');

  // Browser chrome ends around y=80. Viewport is 1024 x 496.
  await cm.extract({ left: 0, top: 80, width: 1024, height: 496 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/page_casamomo.png');

  await tg.extract({ left: 0, top: 80, width: 1024, height: 496 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/page_thegrand.png');

  console.log('Saved page_casamomo.png and page_thegrand.png');
}

cropPage();
