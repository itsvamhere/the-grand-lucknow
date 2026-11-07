const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

const navMatch = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
if (navMatch) {
  const a0 = navMatch[0].match(/<a[^>]*href="[^"]*venues[^"]*"[^>]*>[\s\S]*?<\/a>/i);
  if (a0) {
    console.log(a0[0]);
  }
}
