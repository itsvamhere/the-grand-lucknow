import sharp from 'sharp';

async function inspectHeaderImages() {
  const metaTg = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/header_thegrand.png').metadata();
  const metaCm = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/header_casamomo.png').metadata();

  console.log('TG header:', metaTg.width, metaTg.height);
  console.log('CM header:', metaCm.width, metaCm.height);
}

inspectHeaderImages();
