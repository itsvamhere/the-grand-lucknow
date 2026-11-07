import fs from 'fs';

const filePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix broken `image:{src:'/images/UayMv2I16UbQQBQkbI90HsJMv5o.webp'}i`
content = content.replace("image:{src:'/images/UayMv2I16UbQQBQkbI90HsJMv5o.webp'}i", "image:i");

// 2. Locate Location Map call
const targetStr = "id:`MVzHjK9Di`,image:";
const idx = content.indexOf(targetStr);
console.log('Location Map targetStr at:', idx);
if (idx !== -1) {
  const after = content.slice(idx);
  const endImage = after.indexOf(",lat:");
  console.log('Original image prop:', after.slice(0, endImage));
  const replaced = `id:\`MVzHjK9Di\`,image:{src:'/images/UayMv2I16UbQQBQkbI90HsJMv5o.webp'}`;
  content = content.slice(0, idx) + replaced + after.slice(endImage);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('fix_qfj.mjs completed successfully!');
