const fs = require('fs');

const orig = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/casamomo_boutique_n1_original.html', 'utf8');

const navMatch = orig.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
console.log('Orig Nav found:', !!navMatch);
if (navMatch) {
  console.log('Orig Nav length:', navMatch[0].length);
  console.log('Orig Nav preview:', navMatch[0].substring(0, 300));
}

const footerMatch = orig.match(/<footer[^>]*>[\s\S]*?<\/footer>/i);
console.log('Orig Footer found:', !!footerMatch);
if (footerMatch) {
  console.log('Orig Footer length:', footerMatch[0].length);
}
