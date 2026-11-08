import fs from 'fs';

const venueImages = [
  '/images/card_1_open_earth.webp',
  '/images/card_2_grassland_gala.webp',
  '/images/card_3_ballroom.webp',
  '/images/card_4_courtyard.webp',
  '/images/card_5_garden_pavilion.webp',
  '/images/card_6_mandap_lawn.webp',
  '/images/card_7_dining_expanse.webp',
  '/images/card_8_courtyard_day.webp',
  '/images/card_9_vip_suite.webp'
];

venueImages.forEach(img => {
  const localPath = '.' + img;
  const exists = fs.existsSync(localPath);
  const size = exists ? fs.statSync(localPath).size : 0;
  console.log(`${img}: exists=${exists}, size=${size} bytes`);
});
