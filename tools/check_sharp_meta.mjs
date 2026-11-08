import sharp from 'sharp';

async function check() {
  for (let i = 1; i <= 6; i++) {
    const meta = await sharp(`images/thumb_${i}.webp`).metadata();
    console.log(`thumb_${i}.webp: ${meta.width}x${meta.height}, format: ${meta.format}`);
  }
  const gala = await sharp(`images/card_2_grassland_gala.webp`).metadata();
  console.log(`card_2_grassland_gala.webp: ${gala.width}x${gala.height}`);
}

check().catch(console.error);
