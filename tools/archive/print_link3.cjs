const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

const navMatch = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
if (navMatch) {
  const aTags = Array.from(navMatch[0].matchAll(/<a[^>]*>[\s\S]*?<\/a>/gi));
  console.log(aTags[3][0]);
}
