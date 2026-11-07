const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

// Find navbar menu
const navMatch = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
if (navMatch) {
  fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/current_venue_nav.html', navMatch[0], 'utf8');
  console.log('Saved current_venue_nav.html, length:', navMatch[0].length);
} else {
  console.log('No nav found');
}
