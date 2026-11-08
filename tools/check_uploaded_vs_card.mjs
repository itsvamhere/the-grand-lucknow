import fs from 'fs';
import path from 'path';

const userImgPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/638b99fe-ea95-4ed2-88eb-ad4caad31b4c/.user_uploaded/media_1794055101607_a3b0ce30.jpg';
console.log('User image exists:', fs.existsSync(userImgPath));
if (fs.existsSync(userImgPath)) {
  const stat = fs.statSync(userImgPath);
  console.log('User image size:', stat.size);
}

const card2Path = './images/card_2_grassland_gala.webp';
console.log('Card 2 size:', fs.statSync(card2Path).size);
