const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

const navMatch = html.match(/<nav[\s\S]*?<\/nav>/);
if (navMatch) {
  console.log('=== NAV in venue-n1.html ===');
  console.log(navMatch[0]);
} else {
  console.log('No <nav> found in venue-n1.html');
}
