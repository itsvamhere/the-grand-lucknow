const fs = require('fs');
const subHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const m = subHtml.match(/data-framer-hydrate-v2="[^"]*"/);
console.log('Hydrate data in subpage:', m ? m[0] : 'None');

// Check script main or bundles
const scripts = subHtml.match(/<script[^>]*src="[^"]*"[^>]*>/g);
console.log('Script tags with src in subpage:', scripts);
