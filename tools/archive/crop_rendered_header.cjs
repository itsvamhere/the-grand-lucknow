const sharp = require('sharp');

async function main() {
  const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';
  
  // Crop the rendered header to compare directly with user Image 2
  // Let's crop from x: 48, y: 0, width: 1344, height: 92
  await sharp(`${ARTIFACTS}/venue_n1_header_applied.png`)
    .extract({ left: 30, top: 10, width: 1380, height: 80 })
    .toFile(`${ARTIFACTS}/header_comparison_render.png`);

  console.log('Saved header_comparison_render.png');
}

main().catch(console.error);
