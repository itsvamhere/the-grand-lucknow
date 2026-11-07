import sharp from 'sharp';

async function inspectMapCrop() {
  const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/crop_new_map.png')
    .raw().toBuffer({ resolveWithObject: true });

  let whiteRoads = 0;
  let beigeBuildings = 0;
  let canalWater = 0;
  let terracotta = 0;

  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i+1], b = data[i+2];
    if (r > 245 && g > 240 && b > 230) whiteRoads++;
    if (r >= 225 && r <= 240 && g >= 210 && g <= 228 && b >= 180 && b <= 200) beigeBuildings++;
    if (r >= 235 && r <= 245 && g >= 220 && g <= 235 && b >= 190 && b <= 205) canalWater++;
    if (r >= 170 && r <= 200 && g >= 100 && g <= 130 && b >= 60 && b <= 85) terracotta++;
  }

  console.log('Map crop size:', info.width, 'x', info.height);
  console.log('White roads:', whiteRoads);
  console.log('Beige buildings:', beigeBuildings);
  console.log('Canal water:', canalWater);
  console.log('Terracotta marker:', terracotta);
}

inspectMapCrop();
