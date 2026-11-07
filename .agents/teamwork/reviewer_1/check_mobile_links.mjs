import fs from 'fs';

const lawnHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const idxHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

function showMatch(html, pattern, name) {
  const m = html.match(pattern);
  console.log(`\n--- ${name} ---`);
  console.log(m ? m[0] : 'NOT FOUND');
}

showMatch(idxHtml, /<a[^>]*framer-1gyxj21[\s\S]*?<\/a>/, 'INDEX MOBILE ABOUT');
showMatch(lawnHtml, /<a[^>]*framer-1gyxj21[\s\S]*?<\/a>/, 'LAWN MOBILE ABOUT');

showMatch(idxHtml, /<a[^>]*framer-14hjx1z[\s\S]*?<\/a>/, 'INDEX MOBILE CONTACT');
showMatch(lawnHtml, /<a[^>]*framer-14hjx1z[\s\S]*?<\/a>/, 'LAWN MOBILE CONTACT');
