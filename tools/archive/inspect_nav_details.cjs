const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

// Find where the logo is located in the HTML
const logoIndex = html.indexOf('AR2Rq8AO90zXACnVeViCZnmOhw.svg');
console.log('logoIndex:', logoIndex);
if (logoIndex !== -1) {
  console.log('Surrounding HTML (500 chars before and after):');
  console.log(html.substring(logoIndex - 300, logoIndex + 400));
}

// Find where "Navbar Menu" is
const navIndex = html.indexOf('name="Navbar Menu"');
console.log('navIndex:', navIndex);
if (navIndex !== -1) {
  console.log('Nav HTML (first 500 chars):');
  console.log(html.substring(navIndex - 100, navIndex + 600));
}
