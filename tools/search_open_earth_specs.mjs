import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const searchTerms = ['25,000', '55,000', '2,500', 'Venue N°1', 'Open Earth Lawn'];

searchTerms.forEach(term => {
  let count = 0;
  let pos = 0;
  while ((pos = html.indexOf(term, pos)) !== -1) {
    count++;
    pos += term.length;
  }
  console.log(`"${term}": count=${count}`);
});
