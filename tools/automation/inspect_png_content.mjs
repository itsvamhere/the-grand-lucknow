import sharp from 'sharp';

async function inspectMasterMapPng() {
  const meta = await sharp('images/the_grand_lucknow_master_map_1920.png').metadata();
  console.log('Master map 1920 dimensions:', meta.width, meta.height);

  // Let's sample colors across the map:
  const { data, info } = await sharp('images/the_grand_lucknow_master_map_1920.png')
    .raw().toBuffer({ resolveWithObject: true });

  // How many white road pixels are there?
  let whitePixels = 0;
  let beigePixels = 0;
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i+1], b = data[i+2];
    if (r > 245 && g > 240 && b > 230) whitePixels++;
    if (r >= 220 && r <= 240 && g >= 205 && g <= 225 && b >= 180 && b <= 200) beigePixels++;
  }
  console.log('Total pixels:', info.width * info.height);
  console.log('White road pixels:', whitePixels, `(${(whitePixels / (info.width * info.height) * 100).toFixed(2)}%)`);
  console.log('Beige settlement pixels:', beigePixels, `(${(beigePixels / (info.width * info.height) * 100).toFixed(2)}%)`);
}

inspectMasterMapPng();
