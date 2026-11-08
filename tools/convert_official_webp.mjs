import fs from 'fs';
import sharp from 'sharp';

async function convert() {
  const list = [
    { in: 'images/venues/open-earth-lawn-official.png', out: 'images/venues/open_earth_lawn_official.webp' },
    { in: 'images/venues/grassland-gala-official.jpg', out: 'images/venues/grassland_gala_official.webp' },
    { in: 'images/venues/garden-galaxy-official.jpeg', out: 'images/venues/garden_galaxy_official.webp' },
    { in: 'images/venues/the-grand-courtyard-official.jpg', out: 'images/venues/the_grand_courtyard_official.webp' },
    { in: 'images/venues/royal-legacy-banquet-official.jpeg', out: 'images/venues/royal_legacy_banquet_official.webp' }
  ];

  for (const item of list) {
    if (fs.existsSync(item.in)) {
      await sharp(item.in)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(item.out);
      console.log(`Converted ${item.in} -> ${item.out} (${fs.statSync(item.out).size} bytes)`);
    }
  }
}

convert().catch(console.error);
