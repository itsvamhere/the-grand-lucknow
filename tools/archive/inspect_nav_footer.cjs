const fs = require('fs');

const oel = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

// Find navigation header block
const navMatch = oel.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
console.log('Nav found:', !!navMatch);
if (navMatch) {
  console.log('Nav length:', navMatch[0].length);
  console.log('Nav preview:', navMatch[0].substring(0, 300));
}

// Find footer block
const footerMatch = oel.match(/<footer[^>]*>[\s\S]*?<\/footer>/i);
console.log('Footer found:', !!footerMatch);
if (footerMatch) {
  console.log('Footer length:', footerMatch[0].length);
  console.log('Footer preview:', footerMatch[0].substring(0, 300));
}
