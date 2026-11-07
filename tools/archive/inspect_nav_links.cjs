const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

// Find all buttons or links inside nav
const navMatch = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
if (navMatch) {
  const nav = navMatch[0];
  // Find the button (usually the last <a> tag in nav)
  const aTags = Array.from(nav.matchAll(/<a[^>]*>[\s\S]*?<\/a>/gi));
  console.log('Total <a> in nav:', aTags.length);
  aTags.forEach((a, i) => {
    console.log(`\n--- Link ${i} ---`);
    console.log(a[0].substring(0, 300));
  });
}
