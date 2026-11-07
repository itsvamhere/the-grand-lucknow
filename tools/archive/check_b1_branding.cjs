const fs = require('fs');

const b1 = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n1.html', 'utf8');

console.log('Includes THE GRAND:', b1.includes('THE GRAND'));
console.log('Includes CASA MOMO:', b1.includes('CASA MOMO'));
console.log('Includes Casa Momo:', b1.includes('Casa Momo'));
console.log('Includes Inquire Now:', b1.includes('Inquire Now'));
console.log('Includes Book Now:', b1.includes('Book Now'));
console.log('Includes Graz:', b1.includes('Graz'));
console.log('Includes script_main:', b1.includes('script_main'));
