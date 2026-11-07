const sharp = require('sharp');

async function inspect(p) {
  const meta = await sharp(p).metadata();
  console.log(p, meta.width, 'x', meta.height);
}

inspect('C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3/.user_uploaded/media_1793773981497_e110ffad.png');
inspect('C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3/.user_uploaded/media_1793774001552_952b7ed4.png');
