import sharp from 'sharp';

const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793859231371_192783ce.png')
  .extract({ left: 50, top: 20, width: 20, height: 20 })
  .raw()
  .toBuffer({ resolveWithObject: true });

console.log('Sample pixel in reference button:', data[0], data[1], data[2]);
