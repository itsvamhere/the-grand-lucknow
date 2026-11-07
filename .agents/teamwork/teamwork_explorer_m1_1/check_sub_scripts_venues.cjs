const fs = require('fs');
const subHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const scripts = subHtml.match(/<script[\s\S]*?<\/script>/gi) || [];
scripts.forEach((s, idx) => {
  if (s.includes('grassland') || s.includes('garden-galaxy') || s.includes('Venue Item') || s.includes('Other Venues') || s.includes('syncOtherVenues') || s.includes('venue-')) {
    console.log(`Script ${idx} touches other venues!`);
    console.log(s.substring(0, 500));
    console.log('---');
  }
});
