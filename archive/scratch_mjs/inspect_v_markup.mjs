import fs from 'fs';

const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

const mapIdx = v.indexOf('map_cutout');
if (mapIdx !== -1) {
  console.log('--- Map markup ---');
  console.log(v.substring(Math.max(0, mapIdx - 150), Math.min(v.length, mapIdx + 300)));
}

const modalIdx = v.indexOf('grand-booking-modal');
if (modalIdx !== -1) {
  console.log('--- Modal markup ---');
  console.log(v.substring(Math.max(0, modalIdx - 50), Math.min(v.length, modalIdx + 300)));
}
