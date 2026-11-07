import sharp from 'sharp';

async function generateGrid() {
  const p1 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_master_open_earth_lawn.png';
  const p2 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_master_venues.png';
  const p3 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_master_about.png';
  const p4 = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_master_contact.png';

  // Resize each to 700w
  const b1 = await sharp(p1).resize(700, 450, { fit: 'cover', position: 'bottom' }).toBuffer();
  const b2 = await sharp(p2).resize(700, 450, { fit: 'cover', position: 'bottom' }).toBuffer();
  const b3 = await sharp(p3).resize(700, 450, { fit: 'cover', position: 'bottom' }).toBuffer();
  const b4 = await sharp(p4).resize(700, 450, { fit: 'cover', position: 'bottom' }).toBuffer();

  // Create 2x2 grid (1420 x 920 with 20px padding)
  await sharp({
    create: {
      width: 1420,
      height: 920,
      channels: 3,
      background: { r: 18, g: 18, b: 18 }
    }
  })
  .composite([
    { input: b1, left: 10, top: 10 },
    { input: b2, left: 710, top: 10 },
    { input: b3, left: 10, top: 460 },
    { input: b4, left: 710, top: 460 }
  ])
  .png()
  .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_universal_footer_master_grid.png');

  console.log('Saved proof_universal_footer_master_grid.png!');
}

generateGrid().catch(console.error);
