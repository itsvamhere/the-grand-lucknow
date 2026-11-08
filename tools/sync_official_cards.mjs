import fs from 'fs';

fs.copyFileSync('images/venues/open_earth_lawn_official.webp', 'images/card_1_open_earth.webp');
fs.copyFileSync('images/venues/grassland_gala_official.webp', 'images/card_2_grassland_gala.webp');
fs.copyFileSync('images/venues/garden_galaxy_official.webp', 'images/card_3_ballroom.webp');
fs.copyFileSync('images/venues/the_grand_courtyard_official.webp', 'images/card_4_courtyard.webp');
fs.copyFileSync('images/venues/royal_legacy_banquet_official.webp', 'images/card_5_garden_pavilion.webp');

console.log('Synchronized card images with official images from thegrandlucknow.in!');
