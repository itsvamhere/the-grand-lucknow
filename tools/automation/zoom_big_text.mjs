import sharp from 'sharp';

async function zoomBigText() {
  const p = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_lawn_new_footer.png';
  
  // Crop the big letters area: bottom 300px
  const meta = await sharp(p).metadata();
  console.log('Size:', meta.width, meta.height);

  await sharp(p)
    .extract({ left: 0, top: meta.height - 350, width: meta.width, height: 350 })
    .png()
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_footer_big_text.png');

  console.log('Saved crop_footer_big_text.png');
}

zoomBigText().catch(console.error);
