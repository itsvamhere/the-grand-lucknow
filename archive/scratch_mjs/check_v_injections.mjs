import fs from 'fs';

const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

console.log('Includes grand-booking-modal:', v.includes('grand-booking-modal'));
console.log('Includes map_cutout:', v.includes('map_cutout'));
console.log('Includes Edifice:', v.includes('Edifice'));
console.log('Includes Nexene:', v.includes('Nexene'));
console.log('Includes openGrandModal:', v.includes('openGrandModal'));
