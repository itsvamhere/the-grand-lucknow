import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const btnIdx = h.indexOf('data-framer-name="Button Overlay"');
console.log('--- Button Overlay ---');
console.log(h.slice(btnIdx - 200, btnIdx + 800));

// Also let's check the map pin and map chip markup
const mapIdx = h.indexOf('casa-map-chip');
console.log('--- Map Chip / Pin around ---');
console.log(h.slice(mapIdx - 200, mapIdx + 800));
