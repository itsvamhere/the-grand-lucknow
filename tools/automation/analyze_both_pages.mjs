import sharp from 'sharp';

async function analyzeBothPages() {
  const cm = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/page_casamomo.png')
    .raw().toBuffer({ resolveWithObject: true });
  const tg = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/page_thegrand.png')
    .raw().toBuffer({ resolveWithObject: true });

  function hex(buf, info, x, y) {
    const idx = (y * info.width + x) * 3;
    return '#' + [buf[idx], buf[idx+1], buf[idx+2]].map(v => v.toString(16).padStart(2, '0')).join('');
  }

  console.log('--- Casa Momo Samples ---');
  console.log('Top header bg (500, 20):', hex(cm.data, cm.info, 500, 20));
  console.log('Location text color (100, 30):', hex(cm.data, cm.info, 100, 30));
  console.log('Open in Maps button bg (280, 30):', hex(cm.data, cm.info, 280, 30));
  console.log('Map background (200, 250):', hex(cm.data, cm.info, 200, 250));
  console.log('Road color (200, 280):', hex(cm.data, cm.info, 200, 280));
  console.log('Building/terrain mass (630, 400 - Schlossberg):', hex(cm.data, cm.info, 630, 400));
  console.log('Boutique N°1 chip bg (380, 395):', hex(cm.data, cm.info, 380, 395));
  console.log('Boutique N°1 chip text (380, 395):', hex(cm.data, cm.info, 380, 395));
  console.log('Check Availability button bg (490, 420):', hex(cm.data, cm.info, 490, 420));

  console.log('\n--- The Grand Samples ---');
  console.log('Top header bg (500, 20):', hex(tg.data, tg.info, 500, 20));
  console.log('Location text color (100, 30):', hex(tg.data, tg.info, 100, 30));
  console.log('Open in Maps button bg (280, 30):', hex(tg.data, tg.info, 280, 30));
  console.log('Map background (200, 250):', hex(tg.data, tg.info, 200, 250));
  console.log('The Grand chip bg (450, 390):', hex(tg.data, tg.info, 450, 390));
}

analyzeBothPages();
