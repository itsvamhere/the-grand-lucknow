import sharp from 'sharp';

async function probeColors() {
  const { data, info } = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/page_casamomo.png')
    .raw().toBuffer({ resolveWithObject: true });

  const width = info.width;

  function getHex(x, y) {
    const idx = (y * width + x) * 3;
    return '#' + [data[idx], data[idx+1], data[idx+2]].map(c => c.toString(16).padStart(2, '0')).join('');
  }

  // Probe Casa Momo:
  console.log('1. Page Background (very top-center 500, 15):', getHex(500, 15));
  console.log('2. Wordmark CASA MOMO text (80, 20):', getHex(80, 20));
  console.log('3. Location heading text (80, 30):', getHex(80, 30));
  console.log('4. Open in Maps button bg (290, 25):', getHex(290, 25));
  console.log('5. Open in Maps button text (290, 25):', getHex(280, 25));
  console.log('6. Map base yellow (100, 200):', getHex(100, 200));
  console.log('7. Road white line (120, 230):', getHex(120, 230));
  console.log('8. Building footprint beige (150, 250):', getHex(150, 250));
  console.log('9. River Mur ribbon (450, 200):', getHex(450, 200));
  console.log('10. Schlossberg hill patch (630, 350):', getHex(630, 350));
  console.log('11. Stadtpark park patch (780, 370):', getHex(780, 370));
  console.log('12. Terracotta chip Boutique N°1 (380, 350):', getHex(380, 350));
  console.log('13. Terracotta pin dot (434, 372):', getHex(434, 372));
  console.log('14. Check Availability button bg (490, 420):', getHex(490, 420));
  console.log('15. Check Availability button text (490, 420):', getHex(480, 420));
}

probeColors();
