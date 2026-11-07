import sharp from 'sharp';
import fs from 'node:fs';

const svg = fs.readFileSync('scripts/footer_logo_svg.html', 'utf8');
// replace fill with clean color
const cleanSvg = svg.replace(/fill="[^"]*"/, 'fill="#FFF0CA"');

const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1202" height="150" viewBox="0 0 1202.351 150.096" style="background:#bc6f45;">
${cleanSvg}
</svg>`;

sharp(Buffer.from(fullSvg))
  .png()
  .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_svg_letters.png')
  .then(() => console.log('Successfully rendered proof_svg_letters.png!'))
  .catch(console.error);
