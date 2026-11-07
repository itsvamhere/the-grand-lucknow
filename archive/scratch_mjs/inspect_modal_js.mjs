import fs from 'fs';

const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

const sIdx = v.indexOf('window.openGrandBooking');
console.log(v.substring(sIdx - 100, sIdx + 400));
