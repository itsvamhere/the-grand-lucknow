const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

// Find all occurrences of "Navbar"
const navbars = html.match(/.{0,100}Navbar.{0,100}/gi) || [];
console.log('Navbar references:', navbars.length);
navbars.slice(0, 10).forEach((n, i) => console.log(`Nav ${i}:`, n.replace(/\s+/g, ' ')));
