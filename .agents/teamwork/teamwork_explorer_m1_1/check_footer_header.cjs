const fs = require('fs');
const subHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const fIdx = subHtml.indexOf('<footer');
const fEnd = subHtml.indexOf('</footer>', fIdx) + 9;
const footerStr = subHtml.substring(fIdx, fEnd);

// Check if Book Now or header is inside footer
console.log('Book Now inside footer?', footerStr.includes('Book Now'));
const bnIdx = footerStr.indexOf('Book Now');
if (bnIdx !== -1) {
  console.log(footerStr.substring(bnIdx - 200, bnIdx + 200));
}

// Or check what is immediately above or overlapping footer
console.log('What is inside the first 1000 chars of footer?');
console.log(footerStr.substring(0, 1000));
