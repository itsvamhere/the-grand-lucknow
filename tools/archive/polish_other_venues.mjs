import fs from 'fs';

const htmlPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Update carousel cards from generic labels to actual venue names
html = html.replaceAll('Open Earth Lawn  N°2', 'Grassland Gala');
html = html.replaceAll('Open Earth Lawn  N°3', 'Garden Galaxy');
html = html.replaceAll('Open Earth Lawn N°2', 'Grassland Gala');
html = html.replaceAll('Open Earth Lawn N°3', 'Garden Galaxy');

// Ensure the section heading says "Other Venues to Explore"
html = html.replaceAll('Other Places to Stay', 'Other Venues to Explore');
html = html.replaceAll('Other  Places  to  Stay', 'Other  Venues  to  Explore');

// Wire the links on the cards
html = html.replaceAll('href="./boutique-n2"', 'href="/venues/grassland-gala"');
html = html.replaceAll('href="./boutique-n3"', 'href="/venues/garden-galaxy"');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Polished Other Venues carousel on open-earth-lawn.html!');
