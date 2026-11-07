import sharp from 'sharp';

async function inspectComparison() {
  const comp = sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/map_side_by_side_comparison.png');

  // Let's crop 3 key areas of comparison:
  // 1. Center: The Grand and Bindaua
  await comp.clone().extract({ left: 300, top: 100, width: 900, height: 350 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/comp_center_grand.png');

  // 2. North/Northeast: Bindaua to Ahmadpur Khalsa & Badan Khera Rd
  await comp.clone().extract({ left: 500, top: 0, width: 1000, height: 280 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/comp_ne_ahmadpur.png');

  // 3. West: Gaura and Sardar Patel
  await comp.clone().extract({ left: 0, top: 100, width: 800, height: 400 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/comp_west_gaura_sardar.png');

  console.log('Saved comparison crops');
}

inspectComparison().catch(console.error);
