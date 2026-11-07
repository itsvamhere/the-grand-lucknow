import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n1.html', 'utf8');
const idx = html.indexOf('Open in Maps');

// Look backwards for <section or container
const sectionStart = html.lastIndexOf('<section', idx);
const sectionEnd = html.indexOf('</section>', idx);
console.log('Location section bounds:', sectionStart, sectionEnd);
const sectionHTML = html.substring(sectionStart, sectionEnd + 10);

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/venue_location_section.html', sectionHTML);
console.log('Saved venue_location_section.html, length:', sectionHTML.length);

// Also check index.html to see if index.html has a map or if the user wants Location section on index.html or across both
const idxLocation = html.indexOf('data-framer-name="Location"');
console.log('data-framer-name="Location" at:', idxLocation);
